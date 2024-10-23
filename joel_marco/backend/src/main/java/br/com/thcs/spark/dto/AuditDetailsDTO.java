package br.com.thcs.spark.dto;

import br.com.thcs.spark.model.Audit;
import org.apache.commons.lang3.ArrayUtils;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.stream.IntStream;

/*
Se o status do audit for 41, 42, 43 ou 44 - calcula tempo de falcon
Se o status do audit for 2, 3, 422, 23 ou 24 - calcula tempo de LSDB
Se o status do audit for 41, 42, 43, ou 44 - calcula tempo de Score
Se o status do audit for 41, 42, 43, ou 44 - calcula tempo de reasons


- Duração total: Clock10 - Clock1                       // pegar do trip
- Duração Spark: (Clock2 - Clock1) + (clock10 - clock3)
- Duração Falcon: Clock3 - Clock2
- Duração LSDB: Clock4 - Clock3
- Duração Scores: Clock4 - Clock3
- Duração Reasons: Clock5 - Clock4
 */

public class AuditDetailsDTO extends AuditGridDTO {
  private Duration totalDuration;
  private Duration sparkDuration;
  private Duration falconDuration;
  private Duration lsdbDuration;
  private Duration scoresDuration;
  private Duration reasonsDuration;

  public void setDurations(Audit audit) {
    this.setTotalDuration(audit.getClock1(), audit.getClock10());
    this.setSparkDuration(audit.getClock1(), audit.getClock2(), audit.getClock3(), audit.getClock10());

    int [] falconStatuses = IntStream.of(41, 42, 43, 44).toArray();
    int [] lsdbStatuses = IntStream.of(2, 3, 422, 23, 24).toArray();
    int [] scoreStatuses = IntStream.of(41, 42, 43, 44).toArray();
    int [] reasonsStatuses = IntStream.of(41, 42, 43, 44).toArray();

    if (ArrayUtils.contains((falconStatuses), audit.getStatus())) {
      this.setFalconDuration(audit.getClock2(), audit.getClock3());
    }

    if (ArrayUtils.contains((lsdbStatuses), audit.getStatus())) {
      this.setLsdbDuration(audit.getClock3(), audit.getClock4());
    }

    if (ArrayUtils.contains((scoreStatuses), audit.getStatus())) {
      this.setScoresDuration(audit.getClock3(), audit.getClock4());
    }

    if (ArrayUtils.contains((reasonsStatuses), audit.getStatus())) {
      this.setReasonsDuration(audit.getClock4(), audit.getClock5());
    }

  }

  public void setTotalDuration(LocalDateTime clock1, LocalDateTime clock10) {
    this.totalDuration = Duration.between(clock1, clock10);
  }

  public void setSparkDuration(LocalDateTime clock1, LocalDateTime clock2, LocalDateTime clock3, LocalDateTime clock10) {
    this.sparkDuration = Duration.between(clock1, clock2).plus(Duration.between(clock3, clock10));
  }

  public void setFalconDuration(LocalDateTime clock2, LocalDateTime clock3) {
    this.falconDuration = Duration.between(clock2, clock3);
  }

  public void setLsdbDuration(LocalDateTime clock3, LocalDateTime clock4) {
    this.lsdbDuration = Duration.between(clock3, clock4);
  }

  public void setScoresDuration(LocalDateTime clock3, LocalDateTime clock4) {
    this.scoresDuration = Duration.between(clock3, clock4);
  }

  public void setReasonsDuration(LocalDateTime clock4, LocalDateTime clock5) {
    this.reasonsDuration = Duration.between(clock4, clock5);
  }

  public Duration getTotalDuration() {
    return this.totalDuration;
  }

  public Duration getSparkDuration() {
    return this.sparkDuration;
  }

  public Duration getFalconDuration() {
    return this.falconDuration;
  }

  public Duration getLsdbDuration() {
    return this.lsdbDuration;
  }

  public Duration getScoresDuration() {
    return this.scoresDuration;
  }

  public Duration getReasonsDuration() {
    return this.reasonsDuration;
  }

}
