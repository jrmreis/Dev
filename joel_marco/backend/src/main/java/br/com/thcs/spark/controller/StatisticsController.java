package br.com.thcs.spark.controller;

import br.com.thcs.spark.repository.StatisticRepository;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;


@RestController
@RequestMapping("/statistics")
public class StatisticsController {
    private StatisticRepository repository;
    StatisticsController(StatisticRepository statisticRepository) {
        this.repository = statisticRepository;
    }

    @GetMapping
    @ResponseBody
    public List<String> findAll(
        @RequestParam("interval") String interval,
        @RequestParam(value = "from", required = false) @DateTimeFormat(pattern="yyyy-MM-dd'T'HH:mm:ss") LocalDateTime startDate,
        @RequestParam(value = "to", required = false) @DateTimeFormat(pattern="yyyy-MM-dd'T'HH:mm:ss") LocalDateTime endDate)
    {

        endDate = endDate == null ? repository.findTopByOrderByDateDesc().getDate() : endDate;
        startDate = startDate == null ? endDate.minusMinutes(10) : startDate;
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String formattedEndDate = endDate.format(formatter);
        String formattedStartDate = startDate.format(formatter);
        String format;
        int range;

        switch (interval) {
            case "seconds":
                format = "yyyy-mm-dd hh24:mi:ss";
                range = 86400;
                break;
            case "hours":
                format = "yyyy-mm-dd hh24:mi:ss";
                range = 24;
                break;
            case "days":
                format = "yyyy-mm-dd hh24:mi:ss";
                range = 1;
                break;
            case "months":
                return repository.getStatisticsInMonthsRange(formattedStartDate, formattedEndDate);
            case "years":
                return repository.getStatisticsInYearsRange(formattedStartDate, formattedEndDate);
            default:
                format = "yyyy-mm-dd hh24:mi:ss";
                range = 1440;
                break;
        }
        List<String> stats = repository.getStatisticsInRange(formattedStartDate, formattedEndDate, format, range);
        return stats;
    }
}
