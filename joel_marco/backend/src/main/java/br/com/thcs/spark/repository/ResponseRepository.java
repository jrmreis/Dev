package br.com.thcs.spark.repository;
import br.com.thcs.spark.model.Response;
import br.com.thcs.spark.model.SparkId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ResponseRepository extends JpaRepository<Response, SparkId> {

}
