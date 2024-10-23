def remove_repetidos(l):
    #print(len(l))
    i=0
    #lista[:] = (value for value in l if value != l[i+2])
    #print(lista.sort())
    lista=[]
    l.sort()
    for i in range(len(l)):
        if l[i] != l[(i-1)]:
        #    print(i,i+1)
            lista.append(l[i])
        #else:
        #    print("sem repetição")
        #    t.append(l[i])
        i+=1    
    #lista[:] = (value for value in l if value != l[0])
    #print(lista)
    return(lista)

#lista=[2, 2, 2, 2, 3, 3, 4, 1, 7, 4, 5]

#remove_repetidos(lista)

#print(lista)