def fizzbuzz(inteiroDigitado):
    teste3 = inteiroDigitado % 3
    teste5 = inteiroDigitado % 5
    if (teste3 == 0) and (teste5 == 0):
        return "FizzBuzz"
    else:
        if (teste3 == 0) and (teste5 != 0):
            return "Fizz"
        else:
            if (teste3 != 0) and (teste5 == 0):
                return "Buzz"
            else:
                return inteiroDigitado

inteiroDigitado = int(input("Digite um valor inteiro: "))
print(fizzbuzz(inteiroDigitado))