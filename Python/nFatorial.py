nFatorial = int(input("Digite o valor de n: "))
i = nFatorial
n = nFatorial
#print(nFatorial)
if (nFatorial==0 or nFatorial==1):
    print(1)
else:
    while (i >= 1):
        #print (i)
        i = i - 1
        n = (n) * (i)
        #print(n)
        if (i == 1):
            print(n)
    