package br.com.thcs.spark.repository;
import br.com.thcs.spark.model.FalconIn;
import br.com.thcs.spark.model.SparkId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface FalconInRepository extends JpaRepository<FalconIn, SparkId> {

}
