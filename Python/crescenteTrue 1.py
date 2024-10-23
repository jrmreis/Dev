inteiroDigitado1 = list(input("Digite 3 valores inteiros: "))

if (inteiroDigitado1[0] < inteiroDigitado1[1]) and (inteiroDigitado1[1] < inteiroDigitado1[2]):
    print("crescente")
else:
    #print(inteiroDigitado1)
    print("não está em ordem crescente")