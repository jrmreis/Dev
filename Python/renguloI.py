linha = 1
coluna = 1

coluna = int(input("Digite a largura: "))
linha = int(input("Digite a altura: "))
n = 0
while n < linha:
    m = 0
    m1 = 0
    if n < 1 or n == (linha - 1):
        while m < (coluna -1 ):
            print("#",end='')
            m = m + 1
    elif  n >= 1 or n <= (linha - 1):
        while m < 3 and m <= 1 :
            print(" ",end='')
            m = m + 1

    print("@",end='\n')
    n = n + 1
