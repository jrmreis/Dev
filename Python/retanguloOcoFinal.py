linha = 1
coluna = 1

coluna = int(input("Digite a largura: "))
linha = int(input("Digite a altura: "))


n = 0
while n < linha :
    m = 0
    while m <= 0:
        print("#",end='')
        m = m + 1
        m1=0
        if n < 1 or n == (linha-1):
            while m1 <= (coluna - 3 ) :
                print("#",end='')
                m1 = m1 + 1
        elif n > 1 or n < (linha - 1):
            m2 =0
            while m2 <= coluna - 3 :
                print(" ",end='')
                m2 = m2 + 1
          
        
    print("#",end='\n')
    n = n + 1


            


    




    

