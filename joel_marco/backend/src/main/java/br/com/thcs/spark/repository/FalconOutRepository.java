package br.com.thcs.spark.repository;
import br.com.thcs.spark.model.FalconOut;
import br.com.thcs.spark.model.SparkId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface FalconOutRepository extends JpaRepository<FalconOut, SparkId> {

}
