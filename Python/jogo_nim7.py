def main(r,h,c):
    n = int(input("Quantas peças? "))
    m = int(input("Limite de peças por jogada? "))
    if (n > m):
        if (n % (m+1) == 0):
            print("\nVocê começa!\n")
            usuario(n,m,r,h,c)
        else:
            print("\nComputador começa!\n")
            computador(n,m,r,h,c)
    else:
        print("\nOps! Houve um erro de digitação!\n")
        main(r,h,c)
        
def computador(n,m,r,h,c):
        if ((n - m) > 0):
            n = computador_escolhe_jogada(n,m)
            return usuario(n,m,r,h,c)
        else:
            print("\nFim do jogo! O Computador Venceu!\n")
            r = r + 1
            c = c + 1 
            if (r <= 4 ):
                return campeonato(r,h,c)
            
def computador_escolhe_jogada(n,m):
    n = n - m
    print("O computador tirou", m ,"peça(s).\nAgora restam",n,"peças no tabuleiro\n")
    return n

def usuario(n,m,r,h,c):
    n1 = usuario_escolhe_jogada(n,m)
    if (( n - m ) > 0) or (m != 0):
        n = n - n1
        print("\nVocê tirou", n1,"peça(s).\nAgora restam", n ,"peças no tabuleiro\n")
        return computador(n,m,r,h,c)
    else:
        print("\nFim do jogo! O Usuário Venceu!\n")
        r = r + 1
        h = h + 1
        if (r <= 4 ):
            return campeonato(r,h,c)

def usuario_escolhe_jogada(n,m):
    j = int(input("Quantas peças você vai tirar? "))
    if (j > m) and (n <= 0):
        print("jogada inválida!")
        return usuario_escolhe_jogada(n,m)
    else:
        if(j <= n):
            n = j
            return(n)
   
def partida():
    print("\n**** Partida Única ****\n")
    r = 3
    h = 0
    c = 0
    main(r,h,c)

def campeonato(r,h,c):
    if (r <= 3):
        print("**** Rodada",r,"****\n")
        main(r,h,c)
    else:
        print("**** Final do campeonato! ****\n\nPlacar: Você",h,"X",c,"Computador\n\n")       

def inicio():
    modo = int(input(" 1 - para jogar uma partida isolada \n 2 - para jogar um campeonato: "))
    if(modo == 1):
        print("\nVoce escolheu uma partida!\n")
        partida()
    else:
        if (modo == 2):
            print("Voce escolheu um campeonato!\n")
            r = 1
            h = 0
            c = 0
            campeonato(r,h,c)
        else:
            print("\n\nEscolha uma opção válida!\n")
            inicio()

print("Bem-vindo ao jogo do NIM! Escolha:\n")
inicio()
