/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package kafka261020;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Properties;
import java.util.concurrent.CountDownLatch;
import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.common.serialization.Serdes;
import org.apache.kafka.streams.KafkaStreams;
import org.apache.kafka.streams.StreamsBuilder;
import org.apache.kafka.streams.StreamsConfig;
import org.apache.kafka.streams.Topology;
import org.apache.kafka.streams.errors.StreamsException;
import org.apache.kafka.streams.kstream.KStream;

/**
 *
 * @author Joel
 */
public class Kafka261020 {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
       //BasicConfigurator.configure();
        Properties props = new Properties();
        props.put(StreamsConfig.APPLICATION_ID_CONFIG, "joel_consumer"); //identificador para o meu consumer "joel_consumer"
        props.put(StreamsConfig.BOOTSTRAP_SERVERS_CONFIG, "13.68.0.42:9092"); //13.68.0.42:9092
        props.put(ConsumerConfig.AUTO_OFFSET_RESET_CONFIG, "earliest"); //politica ("earliest" consome o primeiro stream)
        props.put(StreamsConfig.DEFAULT_KEY_SERDE_CLASS_CONFIG, Serdes.String().getClass());
        props.put(StreamsConfig.DEFAULT_VALUE_SERDE_CLASS_CONFIG, Serdes.String().getClass());
        props.put(ConsumerConfig.MAX_POLL_RECORDS_CONFIG, "1"); //pegar mensagem de 1 em 1 - nÃ£o perde nenhuma mensagem (Default commit 5 segundos)

        final StreamsBuilder builder = new StreamsBuilder();

        KStream<String, String> source = builder.stream("verna-stream");  //topico de origem "verna-stream"

        KStream<String, HashMap<String, String>> hashmapStream = source.mapValues( //revisar a partir daqui - funcao lambda - revisado!  08/10/2020
                value -> {
                    HashMap<String, String> transactionHash = new HashMap<>();
                    transactionHash.put("Campo1", value.substring(1, 15));
                    transactionHash.put("Campo2", value.substring(35, 51));
                    transactionHash.put("Campo3", value.substring(87, 89));
                    transactionHash.put("Campo4", value.substring(199, 207));
                    transactionHash.put("Campo5", value.substring(214, 223));
                    transactionHash.put("Campo6", value.substring(416, 655));
                    transactionHash.put("Campo7", value.substring(660, 671));
                    transactionHash.put("Campo8", value.substring(673, 686));
                    transactionHash.put("Campo9", value.substring(689, 712));
                    transactionHash.put("Campo10", value.substring(732, 747));
                    transactionHash.put("ID", value.substring(804, 824));
                    transactionHash.put("Campo12", value.substring(860, 868));
                    transactionHash.put("Campo13", value.substring(870, 879));
                    transactionHash.put("Campo14", value.substring(901, 911));
                    transactionHash.put("Campo15", value.substring(913, 927));
                    transactionHash.put("Campo16", value.substring(928, 943));
                    transactionHash.put("Campo17", value.substring(944, 974));
                    transactionHash.put("Campo18", value.substring(975, 977));
                    System.out.println(transactionHash);
                    return transactionHash;
                });
        hashmapStream.to("joel_stream_20out2020");


        source.flatMapValues(value -> Arrays.asList(value.split("\\W+")));
        source.to("joel-teste-out_20out2020");
        final Topology topology = builder.build();
        final KafkaStreams streams = new KafkaStreams(topology, props);
        streams.cleanUp();
        final CountDownLatch latch = new CountDownLatch(1);
        Runtime.getRuntime().addShutdownHook(new Thread(() -> {
            streams.close();
            latch.countDown();
        }));

        try {
            streams.start();
            latch.await();
        } catch (IllegalStateException | InterruptedException | StreamsException e) {
            System.exit(1);
        }
        System.exit(0);
    }
}
