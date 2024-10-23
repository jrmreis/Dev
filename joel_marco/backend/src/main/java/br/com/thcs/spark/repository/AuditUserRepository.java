package br.com.thcs.spark.repository;
import br.com.thcs.spark.model.SparkId;
import br.com.thcs.spark.model.SpkAuditUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface AuditUserRepository extends JpaRepository<SpkAuditUser, SparkId> {

}
