n = int(input("Digite um numero inteiro >1: "))

fator = 2
mutiplicidade = 0

while n > 1:
    while n % fator == 0:
        mutiplicidade = mutiplicidade + 1
        n = n / fator
    if mutiplicidade > 0:
        print ("fator", fator, "multplicidade", mutiplicidade)
    fator = fator + 1
    mutiplicidade = 0