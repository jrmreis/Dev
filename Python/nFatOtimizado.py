def fatorial(n):
    fat = 1
    while (n>1):
        fat = fat * n
        n = n -1
    return fat

n = int(input("entre com n!: "))
print (fatorial(n))