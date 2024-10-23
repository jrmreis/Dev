package br.com.thcs.spark.repository;
import br.com.thcs.spark.model.Audit;
import br.com.thcs.spark.model.SparkId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AuditRepository extends JpaRepository<Audit, SparkId> {
    /*
    Pageable: Obrigatório, formattedDatetime: obrigatório, system: opcinal (null), status opcional (-1), pan opcional (null)
    Este endpoint filtra a trilha de auditoria a partir de uma data e devolve os resultados paginados.
    Aceita campos para filtrar, como o nome do sistema / servidor, número do status e a busca do
    PAN (parcial com 6 dígitos ou total com 19).
    Para a busca parcial do PAN, os 6 dígitos só serão buscados no início do campo (BIN). Por medidas de segurança,
    a busca só será realizada se a string tiver 6 ou 19 caracteres.

    Testes realizados em ambiente de desenvolvimento demonstraram que utilizar a query nativa tem uma perda considerável
    de performance. Algumas queries grandes que levaram pouco mais de 3s pelo ORM, levaram 96 segundos com query nativa.
     */
    @Query(value= "SELECT * FROM SPK_AUDIT aud " +
            " WHERE aud.AUD_DT_TRAN >= TO_TIMESTAMP(?1, 'yyyy-mm-dd hh24:mi:ss') " +
            " AND ((?2 IS NULL) OR (NOT ?2 IS NULL AND aud.AUD_SYSTEM = ?2)) " +
            " AND ((?3 = -1) OR (?3 <> -1 AND aud.AUD_STATUS = ?3)) " +
            " AND ((?4 IS NULL) OR (NOT ?4 IS NULL AND ((LENGTH(?4) = 6 AND SUBSTR(aud.AUD_PAN, 1, 6) = ?4)) OR (LENGTH(?4) = 19 AND aud.AUD_PAN = ?4)))",
            nativeQuery = true)
    Page<Audit> filter(
            Pageable pageable,
            String formattedDatetime,
            String system,
            Integer status,
            String pan
    );
    @Query(value = "SELECT DISTINCT AUD_SYSTEM FROM SPK_AUDIT", nativeQuery = true)
    List<String> getDistinctSystems();

    @Query(value = "SELECT DISTINCT AUD_STATUS FROM SPK_AUDIT", nativeQuery = true)
    List<String> getDistinctStatus();

    @Query(value = "SELECT DISTINCT AUD_DT_TRAN FROM SPK_AUDIT", nativeQuery = true)
    List<String> getTps();

    Page<Audit> findAll(Pageable pageable);
    Audit findFirstBySystem(String system);
    Audit findTopByOrderByTransactionDatetimeDesc();
    Page<Audit> findByTransactionDatetimeAfter(Pageable pageable, LocalDateTime date);
    Page<Audit> findByTransactionDatetimeAfterOrderByTransactionDatetime(Pageable pageable, LocalDateTime date);
    Page<Audit> findByTransactionDatetimeBefore(Pageable pageable, LocalDateTime date);
    Page<Audit> findByTransactionDatetimeAfterAndSystem(Pageable pageable, LocalDateTime date, String system);
    Page<Audit> findByTransactionDatetimeBeforeAndSystem(Pageable pageable, LocalDateTime date, String system);
    Page<Audit> findByTransactionDatetimeAfterAndStatus(Pageable pageable, LocalDateTime date, Integer status);
    Page<Audit> findByTransactionDatetimeBeforeAndStatus(Pageable pageable, LocalDateTime date, Integer status);
    Page<Audit> findByTransactionDatetimeAfterAndPan(Pageable pageable, LocalDateTime date, String pan);
    Page<Audit> findByTransactionDatetimeBeforeAndPan(Pageable pageable, LocalDateTime date, String pan);
    Page<Audit> findByTransactionDatetimeAfterAndPanStartsWith(Pageable pageable, LocalDateTime date, String pan);
    Page<Audit> findByTransactionDatetimeBeforeAndPanStartsWith(Pageable pageable, LocalDateTime date, String pan);
    Page<Audit> findByTransactionDatetimeAfterAndSystemAndStatus(Pageable pageable, LocalDateTime date, String system, Integer status);
    Page<Audit> findByTransactionDatetimeBeforeAndSystemAndStatus(Pageable pageable, LocalDateTime date, String system, Integer status);
    Page<Audit> findByTransactionDatetimeAfterAndSystemAndPan(Pageable pageable, LocalDateTime date, String system, String pan);
    Page<Audit> findByTransactionDatetimeBeforeAndSystemAndPan(Pageable pageable, LocalDateTime date, String system, String pan);
    Page<Audit> findByTransactionDatetimeAfterAndSystemAndPanStartsWith(Pageable pageable, LocalDateTime date, String system, String pan);
    Page<Audit> findByTransactionDatetimeBeforeAndSystemAndPanStartsWith(Pageable pageable, LocalDateTime date, String system, String pan);
    Page<Audit> findByTransactionDatetimeAfterAndStatusAndPan(Pageable pageable, LocalDateTime date, Integer status, String pan);
    Page<Audit> findByTransactionDatetimeBeforeAndStatusAndPan(Pageable pageable, LocalDateTime date, Integer status, String pan);
    Page<Audit> findByTransactionDatetimeAfterAndStatusAndPanStartsWith(Pageable pageable, LocalDateTime date, Integer status, String pan);
    Page<Audit> findByTransactionDatetimeBeforeAndStatusAndPanStartsWith(Pageable pageable, LocalDateTime date, Integer status, String pan);
    Page<Audit> findByTransactionDatetimeAfterAndSystemAndStatusAndPan(Pageable pageable, LocalDateTime date, String system, Integer status, String pan);
    Page<Audit> findByTransactionDatetimeBeforeAndSystemAndStatusAndPan(Pageable pageable, LocalDateTime date, String system, Integer status, String pan);
    Page<Audit> findByTransactionDatetimeAfterAndSystemAndStatusAndPanStartsWith(Pageable pageable, LocalDateTime date, String system, Integer status, String pan);
    Page<Audit> findByTransactionDatetimeBeforeAndSystemAndStatusAndPanStartsWith(Pageable pageable, LocalDateTime date, String system, Integer status, String pan);


}
