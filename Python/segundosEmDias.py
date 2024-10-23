segundos_str = input("Por favor, entre com o número de segundos que deseja converter: ")
total_segs = int(segundos_str)

dias = total_segs // (3600*24)
segundos_restantes_dias = total_segs % (3600*24)
horas = segundos_restantes_dias // 3600
segs_restantes_horas = segundos_restantes_dias % 3600
minutos = segs_restantes_horas // 60
segs_restantes_final = segs_restantes_horas % 60

print(dias,"dias,",horas, "horas,", minutos, "minutos e", segs_restantes_final, "segundos.")