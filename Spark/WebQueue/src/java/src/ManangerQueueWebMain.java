/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package src;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Enumeration;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Queue;
import javax.jms.JMSException;
import javax.jms.QueueBrowser;
import javax.jms.QueueConnection;
import javax.jms.QueueConnectionFactory;
import javax.jms.QueueReceiver;
import javax.jms.QueueSender;
import javax.jms.QueueSession;
import javax.jms.TextMessage;
import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.rmi.PortableRemoteObject;

/**
 *
 * @author Joel
 */
public class ManangerQueueWebMain {
	
	private QueueConnectionFactory queueConnectionFactory = null;
	private QueueConnection queueConnection = null;
	private Queue queue = null;
	private QueueSender queueSender = null;
	private QueueSession queueSession = null;
	private String connectionFactoryName = null;
	private String queueName = null;
	private QueueReceiver receiver = null;

	/**
	 * Envia a mensagem para a fila
         * @param asyncXml
         * @return 
     * @throws src.MQException 
	 * @see createContextMessage()
	 * 
	 * */
	public boolean sendToQueue(final String asyncXml) throws MQException{
		TextMessage msg = null;
		boolean msgSend = false;
		
		try {
			/* Cria o contexto para o envio da mensagem */
			this.createContextMessage();
			
			/* Prepara a mensagem para ser enviada como BytesMessage */
			msg = queueSession.createTextMessage();
			msg.setText(asyncXml);
			
			if (findMessage(msg) == null) {
				queueSender.send(msg);
				System.out.println("Mensagem enviada!");
			} else {
				System.err.println("Mensagem nao enviada! Ja existe na fila!:" + asyncXml);
			}
		} catch (JMSException e) {
			throw new src.MQException(e);
		} catch (NamingException e) {
			throw new src.MQException(e);
		} catch (Exception e) {
			System.out.println(""+e);
		}finally{
			if(queueSession != null){
				try {
					queueSession.close();
				} catch (JMSException e1) {
					throw new MQException(e1);
				}
			}
			if(queueConnection != null){
				try {
					queueConnection.close();
				} catch (JMSException e1) {
					throw new MQException(e1);
				}
			}
		}
		return msgSend;
	}
	
	private void createContextMessage() throws NamingException, JMSException {
		Context ctx = new InitialContext();
		queueConnectionFactory = (QueueConnectionFactory) PortableRemoteObject.narrow(ctx.lookup(connectionFactoryName), QueueConnectionFactory.class);
		queueConnection = queueConnectionFactory.createQueueConnection();

		this.connectionFactoryName = "jms/QueueConnectionFactory";
		this.queueName = "jms/MFQueue";

		boolean transacted = false;
		queueSession = queueConnection.createQueueSession(transacted,QueueSession.AUTO_ACKNOWLEDGE);
		queue =	(Queue) PortableRemoteObject.narrow(ctx.lookup(queueName),	Queue.class);
		queueSender = queueSession.createSender((javax.jms.Queue) queue);
		receiver = queueSession.createReceiver((javax.jms.Queue) queue);
		queueConnection.start();
	}
	
	private TextMessage findMessage(TextMessage message) { 
		
		TextMessage msgFound = null;
		
		try {
			QueueBrowser browser = queueSession.createBrowser((Queue)queueSender.getDestination());
			Enumeration enumeration = browser.getEnumeration();
			while (enumeration.hasMoreElements()) {
				TextMessage messageOnQueue = (TextMessage)enumeration.nextElement();
				if (messageOnQueue.getText().equals(message.getText())) {
					msgFound = messageOnQueue;
					break;
				}
			}
		} catch (JMSException e) {
			/*
			 * Exceção ignorada para não comprometer 
			 * a inclusão de mensagens na fila
			 */
		}
		return msgFound;
	}

	private void removeMessageFromQueue(TextMessage textMessage) throws QueueException {
		
		try {
			if (textMessage == null) {
				receiver = queueSession.createReceiver((javax.jms.Queue) queue);
			} else {
				textMessage = findMessage(textMessage);
				receiver = queueSession.createReceiver((javax.jms.Queue) queue, "JMSMessageID='" + textMessage.getJMSMessageID() + "'");
			}
			
			while (receiver.receiveNoWait() != null) {
				receiver.receiveNoWait();
			}
			
		} catch (JMSException e) {
			System.err.println("Erro ao tentar remover os itens da fila." + e);
			throw new QueueException("Erro ao tentar remover os itens da fila." + e, e);
		}
	}
	
	public void removeMessageFromQueue(String message) throws QueueException {
		try {
			this.createContextMessage();
			TextMessage msg = null;
			
			if (message != null) {
				msg = queueSession.createTextMessage();
				msg.setText(message);
			}
			
			removeMessageFromQueue(msg);
		} catch (JMSException e) {
			System.err.println("Erro ao tentar remover os itens da fila." + e);
			throw new QueueException("Erro ao tentar remover os itens da fila." + e, e);
		} catch (NamingException e) {
			System.err.println("Erro ao inicializar context na remoção das mensagens da fila: " + e);
			throw new QueueException("Erro ao inicializar context na remoção das mensagens da fila: " + e, e);
		}
	}
	
	public Collection<TextMessage> listMessage(String message) throws QueueException { 
		
		List<TextMessage> listaMensagens = new ArrayList<>();
		TextMessage msg = null;
		
		try {
			this.createContextMessage();
			
			if (message != null) {
				msg = queueSession.createTextMessage(message);
			} else {
				msg = queueSession.createTextMessage();
			}
			
			QueueBrowser browser = queueSession.createBrowser((Queue)queueSender.getDestination());
			Enumeration enumeration = browser.getEnumeration();
			
			while (enumeration.hasMoreElements()) {
				try {
					TextMessage messageOnQueue = (TextMessage)enumeration.nextElement();
					if (message == null || message.equals("")) {
						listaMensagens.add((TextMessage)enumeration.nextElement());
					} else if (messageOnQueue.getText().indexOf(msg.getText()) > -1) {
						listaMensagens.add((TextMessage)enumeration.nextElement());
					}
				} catch (NoSuchElementException e) {
					/*
					 * Exceção que pode ser disparada caso a mensagem seja 
					 * processada e retirada da fila antes do término da iteração da lista.
					 * Exceção será ignorada para que a iteração nas 
					 * mensagens possa prosseguir 
					 */
				}
			}
		} catch (JMSException e) {
			System.err.println("Erro ao listar mensagens na da fila: " + e);
			throw new QueueException("Erro ao listar mensagens na da fila: " + e, e);
		} catch (NamingException e) {
			System.err.println("Erro ao inicializar context na listagem das mensagens da fila: " + e);
			throw new QueueException("Erro ao inicializar context na listagem das mensagens da fila: " + e, e);
		}

		return listaMensagens;
	}
}