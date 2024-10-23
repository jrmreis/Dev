def maior_primo(n):
    while n > 0:
        if all(n%j!=0 for j in range(2,n)):
            return n
        n -= 1

n=int(input("Digite o valor de ref para maior número primo: "))
print(maior_primo(n))
