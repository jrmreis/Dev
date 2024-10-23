inteiroDigitado = list(input("Digite 3 valores inteiros: "))
i = 0
n = len(inteiroDigitado)
soma = 0
#print(i)
while (i<n):
    soma = soma + int(inteiroDigitado[i])
    #print(soma)
    i=i+1
    if (i==n):
        print(soma)