import math

Ponto1X = float(input("digite o X do Ponto 1: "))
Ponto1Y = float(input("digite o Y do Ponto 1: "))
Ponto2X = float(input("digite o X do Ponto 2: "))
Ponto2Y = float(input("digite o Y do Ponto 2: "))
distancia = math.sqrt(math.pow((Ponto1X-Ponto2X), 2)+math.pow((Ponto1Y-Ponto2Y), 2))
print (distancia)
if int(distancia) > int(10):
    print("longe")
else:
    print("perto")