linha = 1
coluna = 1

coluna = int(input("Digite a largura: "))
linha = int(input("Digite a altura: "))
n = 0
while n < linha:
    m = 0
    while m < (coluna -1):
        print("#",end='')
        m = m + 1
    print("#",end='\n')
    n = n + 1