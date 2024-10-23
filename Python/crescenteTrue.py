inteiroDigitado1 = int(input("Digite o valor1 inteiro: "))
inteiroDigitado2 = int(input("Digite o valor2 inteiro: "))
inteiroDigitado3 = int(input("Digite o valor3 inteiro: "))
if (inteiroDigitado1 < inteiroDigitado2) and (inteiroDigitado2 < inteiroDigitado3):
    print("crescente")
else:
    print("não está em ordem crescente")