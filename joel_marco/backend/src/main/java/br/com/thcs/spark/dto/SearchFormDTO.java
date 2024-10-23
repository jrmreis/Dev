package br.com.thcs.spark.dto;

import br.com.thcs.spark.model.Audit;
import br.com.thcs.spark.repository.AuditRepository;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.lang.reflect.InvocationTargetException;
import java.time.LocalDateTime;
import java.lang.reflect.Method;
@NoArgsConstructor
@Getter
@Setter
public class SearchFormDTO {
  private Integer page;
  private Integer size;
  private LocalDateTime date;
  private Boolean sortAsc;
  private String system;
  private Integer status;
  private String pan;


  public SearchFormDTO(Integer page, Integer size, LocalDateTime date, Boolean sortAsc, String system, Integer status, String pan) {
    this.page = page >= 0 ? page : 0;
    this.size = size > 0 ? size : 10;
    this.date = date;
    this.sortAsc = sortAsc;
    this.system = system;
    this.status = status;
    this.pan = pan.length() == 19 ? pan : null;
  }

  public Integer getPage() {
    return this.page;
  }

  public Integer getSize() {
    return this.size;
  }

  public LocalDateTime getDate() {
    return this.date;
  }

  public Boolean getSortAsc() {
    return this.sortAsc;
  }

  public void setPage(Integer page) {
    this.page = page;
  }

  public void setSize(Integer size) {
    this.size = size;
  }

  public void setDate(LocalDateTime date) {
    this.date = date;
  }

  public String getServer() {
    return system;
  }

  public void setServer(String server) {
    this.system = server;
  }

  public Integer getStatus() {
    return status;
  }

  public void setStatus(Integer status) {
    this.status = status;
  }

  public String getPan() {
    return pan;
  }


  public Boolean isValidSystem() {
    return this.system != null && !this.system.isEmpty();
  }

  private Boolean isValidStatus() {
    return this.status != null && this.status >= 0;
  }

  private Boolean isCompletePan() {
    return this.pan != null && this.pan.length() == 19;
  }

  private Boolean isPartialPan() {
    return this.pan != null && this.pan.length() == 6;
  }

  private String getSearchType() {
    String type = "findByTransactionDatetime";
    if (this.getSortAsc()) type = type + "After";
    else type = type + "Before";

    if (isValidSystem()) type = type + "AndSystem";
    if (isValidStatus()) type = type + "AndStatus";
    if (isPartialPan()) type = type + "AndPanStartsWith";
    if (isCompletePan()) type = type + "AndPan";

    return type;
  }

  private int getParamsType() {
    int type = 0;

    if (isValidSystem()) type += 1;
    if (isValidStatus()) type += 2;
    if (isPartialPan()) type += 7;
    if (isCompletePan()) type += 11;

    return type;
  }
  @SuppressWarnings (value="unchecked")
  public Page<Audit> search(AuditRepository repository) throws SecurityException {
    try {
      Method method;
      Object resp;
      Pageable page;
      if (this.getSortAsc()) {
        page = PageRequest.of(this.getPage(), this.getSize(), Sort.by("transactionDatetime"));
      } else {
        page = PageRequest.of(this.getPage(), this.getSize(), Sort.by("transactionDatetime").descending());
      }
      switch (this.getParamsType()) {
        case 1:
          method = repository
                  .getClass()
                  .getMethod(this.getSearchType(), Pageable.class, LocalDateTime.class, String.class);
          resp = method.invoke(repository, page, this.getDate(), this.getServer());
          break;
        case 2:
          method = repository
                  .getClass()
                  .getMethod(this.getSearchType(), Pageable.class, LocalDateTime.class, Integer.class);
          resp = method.invoke(repository, page, this.getDate(), this.getStatus());
          break;
        case 3:
          method = repository
                  .getClass()
                  .getMethod(this.getSearchType(), Pageable.class, LocalDateTime.class, String.class, Integer.class);
          resp = method.invoke(repository, page, this.getDate(), this.getServer(), this.getStatus());
          break;
        case 7:
        case 11:
          method = repository
                  .getClass()
                  .getMethod(this.getSearchType(), Pageable.class, LocalDateTime.class, String.class);
          resp = method.invoke(repository, page, this.getDate(), this.getPan());
          break;
        case 8:
        case 12:
          method = repository
                  .getClass()
                  .getMethod(this.getSearchType(), Pageable.class, LocalDateTime.class, String.class, String.class);
          resp = method.invoke(repository, page, this.getDate(), this.getServer(), this.getPan());
          break;
        case 9:
        case 13:
          method = repository
                  .getClass()
                  .getMethod(this.getSearchType(), Pageable.class, LocalDateTime.class, Integer.class, String.class);
          resp = method.invoke(repository, page, this.getDate(), this.getStatus(), this.getPan());
          break;
        case 10:
        case 14:
          method = repository
                  .getClass()
                  .getMethod(
                          this.getSearchType(),
                          Pageable.class,
                          LocalDateTime.class,
                          String.class,
                          Integer.class,
                          String.class
                  );
          resp = method.invoke(repository, page, this.getDate(), this.getServer(), this.getStatus(), this.getPan());
          break;
        default:
          method = repository.getClass().getMethod(this.getSearchType(), Pageable.class, LocalDateTime.class);
          resp = method.invoke(repository, page, this.getDate());
          break;
      }
      return (Page<Audit>) resp;
    } catch (SecurityException e) {
      System.out.println("Security Exception:");
      e.printStackTrace();
    } catch (NoSuchMethodException e) {
      System.out.println("No Such Method Exception: ");
      e.printStackTrace();
    } catch (IllegalAccessException e) {
      System.out.println("IllegalAccess Exception: ");
      e.printStackTrace();
    } catch (InvocationTargetException e) {
      e.printStackTrace();
    } catch (IllegalArgumentException e) {
      System.out.println("IllegalArgument Exception: ");
      e.printStackTrace();
    }
    return null;
  }
}
