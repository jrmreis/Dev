package br.com.thcs.spark.repository;

import br.com.thcs.spark.model.Statistics;
import br.com.thcs.spark.model.StatisticsId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface StatisticRepository extends JpaRepository<Statistics, StatisticsId> {
    @Query("SELECT s.server FROM SPK_STATISTICS s WHERE s.date >= :startDate AND s.date <= :endDate GROUP BY s.server")
    List<String> findServerNamesByInterval(@Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate);

    List<Statistics> findDistinctServerByDateIsBetween(LocalDateTime startDate, LocalDateTime endDate);
    List<Statistics> findTop20ByOrderByDateDesc();
    Statistics findTopByOrderByDateDesc();

    @Query(value = "SELECT " +
        "    SPK.STA_NM_SERVER AS STA_NM_SERVER, " +
        "    TO_CHAR(TMP.DT_INI, ?3) AS DT_INI, " +
        "    SUM(NVL(SPK.STA_QT_SEND,0)) AS STA_QT_SEND, " +
        "    COUNT(DISTINCT TMP.STA_NM_SERVER) AS STA_QT_SERVER, " +
        "    MAX(DECODE(SPK.STA_ID_AGENT, NULL, 0, SPK.STA_ID_AGENT)) AS STA_QT_AGENT " +
        " FROM ( " +
        "    SELECT " +
        "        TMP_SERVER.STA_NM_SERVER, " +
        "        TMP_INTV.DT_INI, " +
        "        TMP_INTV.DT_FIM " +
        "    FROM ( "+
        " SELECT " +
        "   TO_DATE(?1,'yyyy-mm-dd hh24:mi:ss') + ((LEVEL-1)/ ?4) AS DT_INI, " +
        "   TO_DATE(?1,'yyyy-mm-dd hh24:mi:ss') + ((LEVEL)/ ?4) AS DT_FIM " +
        " FROM DUAL CONNECT BY 1=1 AND TO_DATE(?1,'yyyy-mm-dd hh24:mi:ss')  + (LEVEL-1)/ ?4 < TO_DATE(?2,'yyyy-mm-dd hh24:mi:ss') " +
        " ) TMP_INTV " +
        "    LEFT JOIN ( " +
        "        SELECT SPK_A.STA_NM_SERVER " +
        "        FROM SPK_STATISTICS SPK_A " +
        "        WHERE " +
        "            SPK_A.STA_DT_INSERT >= TO_DATE(?1,'yyyy-mm-dd hh24:mi:ss') " +
        "            AND SPK_A.STA_DT_INSERT < TO_DATE(?2,'yyyy-mm-dd hh24:mi:ss') " +
        "        GROUP BY SPK_A.STA_NM_SERVER " +
        "    ) TMP_SERVER ON ROWNUM = ROWNUM " +
        " ) TMP " +
        " LEFT JOIN SPK_STATISTICS SPK ON " +
        "    TMP.STA_NM_SERVER = SPK.STA_NM_SERVER " +
        "    AND TMP.DT_INI <= STA_DT_INSERT " +
        "    AND TMP.DT_FIM > STA_DT_INSERT " +
        " GROUP BY SPK.STA_NM_SERVER, TMP.DT_INI " +
        " ORDER BY TMP.DT_INI ASC ",
        nativeQuery = true)
    List<String> getStatisticsInRange(String startDate, String endDate, String format, int range);


    @Query(value = "SELECT " +
            "    SPK.STA_NM_SERVER AS STA_NM_SERVER, " +
            "    TO_CHAR(TMP.DT_INI, 'yyyy-mm-dd') AS DT_INI, " +
            "    SUM(NVL(SPK.STA_QT_SEND,0)) AS STA_QT_SEND, " +
            "    COUNT(DISTINCT TMP.STA_NM_SERVER) AS STA_QT_SERVER, " +
            "    MAX(DECODE(SPK.STA_ID_AGENT, NULL, 0, SPK.STA_ID_AGENT)) AS STA_QT_AGENT " +
            " FROM ( " +
            "    SELECT " +
            "        TMP_SERVER.STA_NM_SERVER, " +
            "        TMP_INTV.DT_INI, " +
            "        TMP_INTV.DT_FIM " +
            "    FROM ( " +
            "        SELECT " +
            "            ADD_MONTHS(TO_DATE(?1, 'yyyy-mm-dd hh24:mi:ss'), ((LEVEL-1) * 1)) AS DT_INI, " +
            "            ADD_MONTHS(TO_DATE(?1, 'yyyy-mm-dd hh24:mi:ss'), ((LEVEL) * 1)) AS DT_FIM " +
            "        FROM DUAL " +
            "        CONNECT BY 1=1 AND ADD_MONTHS(TO_DATE(?1, 'yyyy-mm-dd hh24:mi:ss'), (LEVEL-1) * 1) < TO_DATE(?2, 'yyyy-mm-dd hh24:mi:ss') " +
            ") TMP_INTV " +
            "    LEFT JOIN ( " +
            "        SELECT SPK_A.STA_NM_SERVER " +
            "        FROM SPK_STATISTICS SPK_A " +
            "        WHERE " +
            "            SPK_A.STA_DT_INSERT >= TO_DATE(?1,'yyyy-mm-dd hh24:mi:ss') " +
            "            AND SPK_A.STA_DT_INSERT <= TO_DATE(?2,'yyyy-mm-dd hh24:mi:ss') " +
            "        GROUP BY SPK_A.STA_NM_SERVER " +
            "    ) TMP_SERVER ON ROWNUM = ROWNUM " +
            ") TMP " +
            " LEFT JOIN SPK_STATISTICS SPK ON " +
            "    TMP.STA_NM_SERVER = SPK.STA_NM_SERVER " +
            "    AND TMP.DT_INI <= STA_DT_INSERT " +
            "    AND TMP.DT_FIM >= STA_DT_INSERT " +
            " GROUP BY SPK.STA_NM_SERVER, TMP.DT_INI " +
            " ORDER BY TMP.DT_INI ASC",
        nativeQuery = true)
    List<String> getStatisticsInMonthsRange(String startDate, String endDate);

    @Query(value = "SELECT " +
        "    SPK.STA_NM_SERVER AS STA_NM_SERVER, " +
        "    TO_CHAR(TMP.DT_INI, 'yyyy-mm-dd hh24:mi:ss') AS DT_INI, " +
        "    SUM(NVL(SPK.STA_QT_SEND,0)) AS STA_QT_SEND, " +
        "    COUNT(DISTINCT TMP.STA_NM_SERVER) AS STA_QT_SERVER, " +
        "    MAX(DECODE(SPK.STA_ID_AGENT, NULL, 0, SPK.STA_ID_AGENT)) AS STA_QT_AGENT " +
        " FROM ( " +
        "    SELECT " +
        "        TMP_SERVER.STA_NM_SERVER, " +
        "        TMP_INTV.DT_INI, " +
        "        TMP_INTV.DT_FIM " +
        "    FROM ( "+
        " SELECT " +
        "   TO_DATE(TO_CHAR(TO_DATE('01/01/2011','dd/mm/yyyy'), 'dd/mm') || '/' || TO_CHAR(EXTRACT(YEAR FROM TO_DATE(?1, 'yyyy-mm-dd hh24:mi:ss')) + ((LEVEL-1) * 1)) || '','dd/mm/yyyy hh24:mi:ss') AS DT_INI, " +
        "   TO_DATE(TO_CHAR(TO_DATE('01/01/2011','dd/mm/yyyy'), 'dd/mm') || '/' || TO_CHAR(EXTRACT(YEAR FROM TO_DATE(?1, 'yyyy-mm-dd hh24:mi:ss')) + ((LEVEL) * 1)) || '','dd/mm/yyyy hh24:mi:ss') AS DT_FIM " +
        " FROM DUAL CONNECT BY 1=1 AND TO_DATE(TO_CHAR(TO_DATE('01/01/2011','dd/mm/yyyy'), 'dd/mm') || '/' || TO_CHAR(EXTRACT(YEAR FROM TO_DATE(?1, 'yyyy-mm-dd hh24:mi:ss')) + ((LEVEL-1) * 1)) || '','dd/mm/yyyy hh24:mi:ss') < TO_DATE(?2, 'yyyy-mm-dd hh24:mi:ss')  " +
        " ) TMP_INTV " +
        "    LEFT JOIN ( " +
        "        SELECT SPK_A.STA_NM_SERVER " +
        "        FROM SPK_STATISTICS SPK_A " +
        "        WHERE " +
        "            SPK_A.STA_DT_INSERT >= TO_DATE(?1,'yyyy-mm-dd hh24:mi:ss') " +
        "            AND SPK_A.STA_DT_INSERT <= TO_DATE(?2,'yyyy-mm-dd hh24:mi:ss') " +
        "        GROUP BY SPK_A.STA_NM_SERVER " +
        "    ) TMP_SERVER ON ROWNUM = ROWNUM " +
        " ) TMP " +
        " LEFT JOIN SPK_STATISTICS SPK ON " +
        "    TMP.STA_NM_SERVER = SPK.STA_NM_SERVER " +
        "    AND TMP.DT_INI <= STA_DT_INSERT " +
        "    AND TMP.DT_FIM >= STA_DT_INSERT " +
        " GROUP BY SPK.STA_NM_SERVER, TMP.DT_INI " +
        " ORDER BY TMP.DT_INI ASC ",
        nativeQuery = true)
    List<String> getStatisticsInYearsRange(String startDate, String endDate);
}
