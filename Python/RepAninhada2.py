# n = int(input("Digite um número inteiro: "))
# while n >= 0:
#     fatorial = 1
#     while n > 1:
#         fatorial = fatorial * n
#         n = n - 1
#     print (fatorial)
#     n = int(input("Digite um número inteiro: "))

##Refatorado, com função executando o fatorial.

def fat(n):   
    fatorial = 1
    while n > 1:
        fatorial = fatorial * n
        n = n - 1
    print (fatorial)
    return(n)

n = int(input("Digite um número inteiro: "))
while n >= 0:
    fat(n)
    n = int(input("Digite um número inteiro: "))