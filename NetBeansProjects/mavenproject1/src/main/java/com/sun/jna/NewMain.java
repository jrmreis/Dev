/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sun.jna;

/**
 *
 * @author Joel
 */

import java.io.UnsupportedEncodingException;

import com.sun.jna.Library;
import com.sun.jna.Native;
import com.sun.jna.NativeLong;
import com.sun.jna.Structure;
public class NewMain {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) throws UnsupportedEncodingException {

        String messageToSend = "Deu certo, Tosta";

        final int IPC_CREAT = 0001000;
        final int IPC_NOWAIT = 0x00000800;

        // Get Queue-Id
        int msqId = CLibrary.INSTANCE.msgget(0x0a0001c2, IPC_CREAT);
        if (msqId < 0) {
            System.out.println("Error creating queue: " + Native.getLastError());
            return;
        }

        System.out.println("Fila criada ou obtida com sucesso! id = " + msqId);

        // Send Message
        CLibrary.MsgBuf sndBuf = Structure.newInstance(CLibrary.MsgBuf.class);
        sndBuf.mtype = new NativeLong(5);
        sndBuf.data = messageToSend.getBytes("UTF-8");
        if (CLibrary.INSTANCE.msgsnd(msqId, sndBuf, sndBuf.data.length, IPC_NOWAIT) < 0) {
            System.out.println("Erro ao enviar mensagem à fila: " + Native.getLastError());
            return;
        }

        System.out.println("Mensagem enviada à fila com sucesso!");

        // Receive Message
        CLibrary.MsgBuf rcvBuf = Structure.newInstance(CLibrary.MsgBuf.class);
        rcvBuf.mtype = new NativeLong(-99); // rcv all
        rcvBuf.data = new byte[1024];
        int receivedBytes = CLibrary.INSTANCE.msgrcv(msqId, rcvBuf, rcvBuf.data.length, rcvBuf.mtype, IPC_NOWAIT);
        if (receivedBytes < 0) {
            System.out.println("Erro recebendo mensagem: " + Native.getLastError());
            return;
        }

        String receivedMessage = new String(rcvBuf.data, 0, receivedBytes, "UTF-8");
        System.out.println("Mensagem lida da fila com successo!");
        System.out.println("A mensagem é: '" + receivedMessage + "'");

    }

    public interface CLibrary extends Library {

        PosixQueueTest.CLibrary INSTANCE = Native.loadLibrary("c", PosixQueueTest.CLibrary.class);

        // JNA mapping
        int msgsnd(int msqid, Structure msgp, int msgsz, int msgflg);

        int msgget(int msqid, int msgflg);

        int msgrcv(int msqid, final Structure msgp, int msgsz, NativeLong msgtyp, int msgflg);

        // Structure definition
        @Structure.FieldOrder({ "mtype", "data" })
        class MsgBuf extends Structure {
            public NativeLong mtype;
            public byte[] data;
        }

    }

}
