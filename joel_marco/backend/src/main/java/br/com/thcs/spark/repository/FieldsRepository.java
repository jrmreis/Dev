package br.com.thcs.spark.repository;
import br.com.thcs.spark.model.Fields;
import br.com.thcs.spark.model.FieldsId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface FieldsRepository extends JpaRepository<Fields, FieldsId> {

    List<Fields> findAllByOrderByPositionAsc();

}
