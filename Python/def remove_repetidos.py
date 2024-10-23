def remove_repetidos(l):
    
    i=0
    b=i+1


    for i in range(len(l)):
        if l[i] == l[b]:
            
            print(l[i])
            #l.remove(l[i])
            #del l[i]
            if i+2 < len(l):
                #del l[i]
                #i=i+1
            #else:
                print("bug!")
                print(len(l))
                print(i+2)
        #if (l[i] == l[i+1]) in l:
        #    del l[i]
        #    i=i+1
        else:
            print("fim")
    print(l.sort())

lista=[2, 2, 2, 1, 3, 4, 5]

remove_repetidos(lista)

print(lista)