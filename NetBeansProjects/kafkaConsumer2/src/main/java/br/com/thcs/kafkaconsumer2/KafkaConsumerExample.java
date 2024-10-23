/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.thcs.kafkaconsumer2;


import org.apache.kafka.clients.consumer.*;
import org.apache.kafka.clients.consumer.Consumer;
import org.apache.kafka.common.serialization.LongDeserializer;
import org.apache.kafka.common.serialization.StringDeserializer;


import java.util.Collections;
import java.util.Properties;
/**
 *
 * @author Joel
 */
public class KafkaConsumerExample {

    /**
     * @param args the command line arguments
     */
    
    private final static String TOPIC = "verna-stream";
    private final static String BOOTSTRAP_SERVERS =
            "localhost:9092";
    
    
    
    private static Consumer<Long, String>  createConsumer() {
      final Properties props = new Properties();
      props.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG,
                                  BOOTSTRAP_SERVERS);
      props.put(ConsumerConfig.GROUP_ID_CONFIG,
                                  "KafkaExampleConsumer");
      props.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG,
              LongDeserializer.class.getName());
      props.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG,
              StringDeserializer.class.getName());

      // Create the consumer using props.
      final Consumer<Long, String> consumer =
                                  new KafkaConsumer<>(props);

      // Subscribe to the topic.
      consumer.subscribe(Collections.singletonList(TOPIC));
      return consumer;
      
  }
 }