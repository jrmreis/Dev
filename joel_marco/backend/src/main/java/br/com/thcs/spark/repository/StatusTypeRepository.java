package br.com.thcs.spark.repository;

import br.com.thcs.spark.model.StatusType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StatusTypeRepository extends JpaRepository<StatusType, Integer> {

}
