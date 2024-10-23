nImpar = int(input("Digite o valor de n: "))
i = 1
n = 1
p = nImpar + 1
#print(nFatorial)
while (i <= nImpar):
    #print (i)
    if ( n % 2 != 0):
        i = i + 1
        print(n)
        n = (n) + 2
    else:
        i = i + 1
        print(p)
        p = (p) + 2
    