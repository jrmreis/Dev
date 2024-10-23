linha = 1
coluna = 1

coluna = int(input("Digite a largura: "))
linha = int(input("Digite a altura: "))
n = 0
while n < linha:
    m = 0
    m1 = 0
    if n < (linha - 1):
        while m <= (coluna - 1 ):
            print("#",end='')
            m = m + 1
            m1=1
            while m1 <= (coluna - 2 ) :
                print(" ",end='')
                m1 = m1 + 1
    #if  n>2 and n <= 3 :


    print("@",end='\n')
    n = n + 1



    

