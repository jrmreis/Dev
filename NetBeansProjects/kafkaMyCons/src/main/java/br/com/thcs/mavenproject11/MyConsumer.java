package br.com.thcs.mavenproject11;

import java.util.List;
import java.util.Map;
import org.apache.kafka.clients.consumer.KafkaConsumer;
import org.apache.kafka.common.serialization.StringDeserializer;

public class MyConsumer {
    public static void main(String[] args) throws Exception {
        final KafkaConsumer<String, String> consumer = new KafkaConsumer<>(
                Map.of(BOOTSTRAP_SERVERS, System.getenv(BOOTSTRAP_SERVERS),
                        GROUP_ID, System.getenv(GROUP_ID),
                        AUTO_OFFSET_RESET, "earliest"),
                new StringDeserializer(), new StringDeserializer());

        consumer.subscribe(List.of(TOPIC));
        while (true) {
            consumer.poll(1000).spliterator().forEachRemaining(System.out::println);
        }
    }

    static final String BOOTSTRAP_SERVERS = "localhost:9092"; //localhost:9092,another.host:9092  bootstrap.servers is a comma-separated list of host and port pairs that are the addresses of the Kafka brokers in a "bootstrap" Kafka cluster that a Kafka client connects to initially to bootstrap itself.
    static final String TOPIC = System.getenv("verna-stream");  // joel-stream; gatr-stream
    static final String AUTO_OFFSET_RESET = "auto.offset.reset";
    static final String GROUP_ID = "br.com.thcs"; //group.id
}
