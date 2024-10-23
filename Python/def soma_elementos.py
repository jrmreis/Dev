def soma_elementos(l):
    #print(len(l))
    i=0
    #lista[:] = (value for value in l if value != l[i+2])
    #print(lista.sort())
    lista=[]
    s=0
    l.sort()
    for i in range(len(l)):
        s = s + l[i]
        #print(i,i+1)
        #print(s)

        #else:
        #    print("sem repetição")
        #    t.append(l[i])
        i+=1    
    #lista[:] = (value for value in l if value != l[0])
    #print(s)
    return(s)

#lista=[2, 2, 2, 2, 3, 3, 4, 1, 7, 4, 5]
#lista=[1,2,3]

#soma_elementos(lista)

#print(lista)