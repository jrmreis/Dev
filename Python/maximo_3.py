def maximo(a,b,c):
    if (a > b and a > c):
        return a
    else:
        if (b > a and b > c):
            return b
        else:
            return c

a = int(input("entre com a: "))
b = int(input("entre com b: "))
c = int(input("entre com c: "))

print (maximo(a,b,c))
#print(a,b)