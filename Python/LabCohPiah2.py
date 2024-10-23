import re

def le_assinatura():
    '''A funcao le os valores dos tracos linguisticos do modelo e devolve uma assinatura a ser comparada com os textos fornecidos'''
    print("Bem-vindo ao detector automático de COH-PIAH.")
    print("Informe a assinatura típica de um aluno infectado:")

    wal = float(input("Entre o tamanho médio de palavra:"))
    ttr = float(input("Entre a relação Type-Token:"))
    hlr = float(input("Entre a Razão Hapax Legomana:"))
    sal = float(input("Entre o tamanho médio de sentença:"))
    sac = float(input("Entre a complexidade média da sentença:"))
    pal = float(input("Entre o tamanho medio de frase:"))
    
    # wal = 4.51   
    # ttr = 0.693  
    # hlr = 0.55   
    # sal = 70.82  
    # sac = 1.82   
    # pal = 38.5   

    return [wal, ttr, hlr, sal, sac, pal]

def le_textos():
    '''A funcao le todos os textos a serem comparados e devolve uma lista contendo cada texto como um elemento'''
    i = 1
    textos = []
    texto = input("Digite o texto " + str(i) +" (aperte enter para sair):")
    while texto:
        textos.append(texto)
        i += 1
        texto = input("Digite o texto " + str(i) +" (aperte enter para sair):")
    # textos = ['Num fabulário ainda por encontrar será um dia lida esta fábula: A uma bordadora dum país longínquo foi encomendado pela sua rainha que bordasse, sobre seda ou cetim, entre folhas, uma rosa branca. A bordadora, como era muito jovem, foi procurar por toda a parte aquela rosa branca perfeitíssima, em cuja semelhança bordasse a sua. Mas sucedia que umas rosas eram menos belas do que lhe convinha, e que outras não eram brancas como deviam ser. Gastou dias sobre dias, chorosas horas, buscando a rosa que imitasse com seda, e, como nos países longínquos nunca deixa de haver pena de morte, ela sabia bem que, pelas leis dos contos como este, não podiam deixar de a matar se ela não bordasse a rosa branca. Por fim, não tendo melhor remédio, bordou de memória a rosa que lhe haviam exigido. Depois de a bordar foi compará-la com as rosas brancas que existem realmente nas roseiras. Sucedeu que todas as rosas brancas se pareciam exactamente com a rosa que ela bordara, que cada uma delas era exactamente aquela. Ela levou o trabalho ao palácio e é de supor que casasse com o príncipe. No fabulário, onde vem, esta fábula não traz moralidade. Mesmo porque, na idade de ouro, as fábulas não tinham moralidade nenhuma.', 'Voltei-me para ela; Capitu tinha os olhos no chão. Ergueu-os logo, devagar, e ficamos a olhar um para o outro... Confissão de crianças, tu valias bem duas ou três páginas, mas quero ser poupado. Em verdade, não falamos nada; o muro falou por nós. Não nos movemos, as mãos é que se estenderam pouco a pouco, todas quatro, pegando-se, apertando-se, fundindo-se. Não marquei a hora exata daquele gesto. Devia tê-la marcado; sinto a falta de uma nota escrita naquela mesma noite, e que eu poria aqui com os erros de ortografia que trouxesse, mas não traria nenhum, tal era a diferença entre o estudante e o adolescente. Conhecia as regras do escrever, sem suspeitar as do amar; tinha orgias de latim e era virgem de mulheres.', 'Senão quando, estando eu ocupado em preparar e apurar a minha invenção, recebi em cheio um golpe de ar; adoeci logo, e não me tratei. Tinha o emplasto no cérebro; trazia comigo a idéia fixa dos doidos e dos fortes. Via-me, ao longe, ascender do chão das turbas, e remontar ao Céu, como uma águia imortal, e não é diante de tão excelso espetáculo que um homem pode sentir a dor que o punge. No outro dia estava pior; tratei-me enfim, mas incompletamente, sem método, nem cuidado, nem persistência; tal foi a origem do mal que me trouxe à eternidade. Sabem já que morri numa sexta-feira, dia aziago, e creio haver provado que foi a minha invenção que me matou. Há demonstrações menos lúcidas e não menos triunfantes. Não era impossível, entretanto, que eu chegasse a galgar o cimo de um século, e a figurar nas folhas públicas, entre macróbios. Tinha saúde e robustez. Suponha-se que, em vez de estar lançando os alicerces de uma invenção farmacêutica, tratava de coligir os elementos de uma instituição política, ou de uma reforma religiosa. Vinha a corrente de ar, que vence em eficácia o cálculo humano, e lá se ia tudo. Assim corre a sorte dos homens.']
    return textos

def separa_sentencas(texto):
    '''A funcao recebe um texto e devolve uma lista das sentencas dentro do texto'''
    sentencas = re.split(r'[.!?]+',texto)
    if sentencas[-1] == '':
        del sentencas[-1]
    return sentencas

def separa_frases(sentenca):
    '''A funcao recebe uma sentenca e devolve uma lista das frases dentro da sentenca'''
    return re.split(r'[,:;]+',sentenca)

def separa_palavras(frase):
    '''A funcao recebe uma frase e devolve uma lista das palavras dentro da frase'''
    return frase.split()

def n_palavras_unicas(lista_palavras):
    '''Essa funcao recebe uma lista de palavras e devolve o numero de palavras que aparecem uma unica vez'''
    freq = dict()
    unicas = 0
    for palavra in lista_palavras:
        p = palavra.lower()
        if p in freq:
            if freq[p] == 1:
                unicas -= 1
            freq[p] += 1
        else:
            freq[p] = 1
            unicas += 1

    return unicas

def n_palavras_diferentes(lista_palavras):
    '''Essa funcao recebe uma lista de palavras e devolve o numero de palavras diferentes utilizadas'''
    freq = dict()
    for palavra in lista_palavras:
        p = palavra.lower()
        if p in freq:
            freq[p] += 1
        else:
            freq[p] = 1

    return len(freq)

def compara_assinatura(as_a, as_b):
    '''IMPLEMENTADO! Essa funcao recebe duas assinaturas de texto e deve devolver o grau de similaridade nas assinaturas.'''
    
    p = 0
    soma_dif = 0
    similaridade = 0
    
    while p <= 5:
        soma_dif  += (as_a[p]-as_b[p])
        p += 1
    similaridade = abs(soma_dif)/6

    #print(similaridade)
    #print(soma_dif)
    return similaridade

def calcula_assinatura(texto):
    '''IMPLEMENTADO! Essa funcao recebe um texto e deve devolver a assinatura do texto.'''
    
    lista_palavras = []
    lista_frases = []
    lista_sentencas = separa_sentencas(texto)
    sentencas = separa_sentencas(texto)
    for sentenca in sentencas:
        frases = separa_frases(sentenca)
        lista_frases.extend(frases)
        for frase in frases:
            palavras = separa_palavras(frase)
            lista_palavras.extend(palavras)
    wal_calc = tamanho_médio_de_palavra(letras_texto(lista_palavras), lista_palavras)
    ttr_calc = relação_Type_Token(lista_palavras, n_palavras_diferentes)
    hlr_calc = razão_Hapax_Legomana(lista_palavras, n_palavras_unicas)
    sal_calc = tamanho_médio_de_sentença(numero_caracteres(sentencas), lista_sentencas)
    sac_calc = complexidade_de_sentença(lista_frases, lista_sentencas)
    pal_calc = tamanho_médio_de_frase(numero_caracteres_frase(lista_frases), lista_frases)
    lista = [wal_calc, ttr_calc, hlr_calc, sal_calc, sac_calc, pal_calc]
    #print(lista)
    return lista

def letras_texto(lista_palavras):
    soma_letras_palavras = 0
    for letras in lista_palavras:
        soma_letras_palavras += len(letras)
        #print(soma_letras_palavras)
    return soma_letras_palavras

def numero_caracteres(sentencas):
    soma_caracteres_sentencas = 0
    for caracter in sentencas:
        soma_caracteres_sentencas += len(caracter)
        #print(soma_caracteres_sentencas)
    return soma_caracteres_sentencas

def numero_caracteres_frase(lista_frases):
    soma_caracteres_frases = 0
    for caracter in lista_frases:
        soma_caracteres_frases += len(caracter)
        #print(soma_caracteres_frases)
    return soma_caracteres_frases

def tamanho_médio_de_palavra(letras_texto, lista_palavras):
    return letras_texto / len(lista_palavras)    

def relação_Type_Token(lista_palavras, n_palavras_diferentes):
    return n_palavras_diferentes(lista_palavras) / len(lista_palavras)

def razão_Hapax_Legomana(lista_palavras, n_palavras_unicas):
    return n_palavras_unicas(lista_palavras) / len(lista_palavras)

def tamanho_médio_de_sentença(numero_caracteres, lista_sentencas):
    #print(len(lista_sentencas))
    #print(len(texto))
    return numero_caracteres / len(lista_sentencas) #numeros de caracteres à menor

def complexidade_de_sentença(lista_frases, lista_sentencas):
    return len(lista_frases) / len(lista_sentencas)

def tamanho_médio_de_frase(numero_caracteres, lista_frases):
    #print(numero_caracteres)
    #print(separa_frases)
    #print(numero_caracteres_frase(lista_frases))
    #print(len(lista_frases) )
    #print(lista_frases)
    return numero_caracteres_frase(lista_frases) / len(lista_frases)

def avalia_textos(textos, ass_cp):
    '''IMPLEMENTADO! Essa funcao recebe uma lista de textos e uma assinatura ass_cp e deve devolver o numero (1 a n) do texto com maior probabilidade de ter sido infectado por COH-PIAH.'''
    
    lista_similaridade_assinaturas = []
    for texto in textos:
        assinatura = calcula_assinatura(texto)
        lista_similaridade_assinaturas.append(compara_assinatura(assinatura, ass_cp))
    # print (lista_similaridade_assinaturas)
    # return (lista_similaridade_assinaturas)
    menor_valor = min(lista_similaridade_assinaturas)
    texto_maior_chance_plagio = lista_similaridade_assinaturas.index(menor_valor) + 1   
    print("O autor do texto", texto_maior_chance_plagio ,"está infectado com COH-PIAH")
    return texto_maior_chance_plagio

def main():
    #le_assinatura()
    #le_textos()
    # texto = "Então resolveu ir brincar com a Máquina pra ser também imperador dos filhos da mandioca. Mas as três cunhas deram muitas risadas e falaram que isso de deuses era gorda mentira antiga, que não tinha deus não e que com a máquina ninguém não brinca porque ela mata. A máquina não era deus não, nem possuía os distintivos femininos de que o herói gostava tanto. Era feita pelos homens. Se mexia com eletricidade com fogo com água com vento com fumo, os homens aproveitando as forças da natureza. Porém jacaré acreditou? nem o herói! Se levantou na cama e com um gesto, esse sim! bem guaçu de desdém, tó! batendo o antebraço esquerdo dentro do outro dobrado, mexeu com energia a munheca direita pras três cunhas e partiu. Nesse instante, falam, ele inventou o gesto famanado de ofensa: a pacova."
    
    # texto = "Num fabulário ainda por encontrar será um dia lida esta fábula: A uma bordadora dum país longínquo foi encomendado pela sua rainha que bordasse, sobre seda ou cetim, entre folhas, uma rosa branca. A bordadora, como era muito jovem, foi procurar por toda a parte aquela rosa branca perfeitíssima, em cuja semelhança bordasse a sua. Mas sucedia que umas rosas eram menos belas do que lhe convinha, e que outras não eram brancas como deviam ser. Gastou dias sobre dias, chorosas horas, buscando a rosa que imitasse com seda, e, como nos países longínquos nunca deixa de haver pena de morte, ela sabia bem que, pelas leis dos contos como este, não podiam deixar de a matar se ela não bordasse a rosa branca. Por fim, não tendo melhor remédio, bordou de memória a rosa que lhe haviam exigido. Depois de a bordar foi compará-la com as rosas brancas que existem realmente nas roseiras. Sucedeu que todas as rosas brancas se pareciam exactamente com a rosa que ela bordara, que cada uma delas era exactamente aquela. Ela levou o trabalho ao palácio e é de supor que casasse com o príncipe. No fabulário, onde vem, esta fábula não traz moralidade. Mesmo porque, na idade de ouro, as fábulas não tinham moralidade nenhuma."
    # texto = "Voltei-me para ela; Capitu tinha os olhos no chão. Ergueu-os logo, devagar, e ficamos a olhar um para o outro... Confissão de crianças, tu valias bem duas ou três páginas, mas quero ser poupado. Em verdade, não falamos nada; o muro falou por nós. Não nos movemos, as mãos é que se estenderam pouco a pouco, todas quatro, pegando-se, apertando-se, fundindo-se. Não marquei a hora exata daquele gesto. Devia tê-la marcado; sinto a falta de uma nota escrita naquela mesma noite, e que eu poria aqui com os erros de ortografia que trouxesse, mas não traria nenhum, tal era a diferença entre o estudante e o adolescente. Conhecia as regras do escrever, sem suspeitar as do amar; tinha orgias de latim e era virgem de mulheres."
    # texto = "Senão quando, estando eu ocupado em preparar e apurar a minha invenção, recebi em cheio um golpe de ar; adoeci logo, e não me tratei. Tinha o emplasto no cérebro; trazia comigo a idéia fixa dos doidos e dos fortes. Via-me, ao longe, ascender do chão das turbas, e remontar ao Céu, como uma águia imortal, e não é diante de tão excelso espetáculo que um homem pode sentir a dor que o punge. No outro dia estava pior; tratei-me enfim, mas incompletamente, sem método, nem cuidado, nem persistência; tal foi a origem do mal que me trouxe à eternidade. Sabem já que morri numa sexta-feira, dia aziago, e creio haver provado que foi a minha invenção que me matou. Há demonstrações menos lúcidas e não menos triunfantes. Não era impossível, entretanto, que eu chegasse a galgar o cimo de um século, e a figurar nas folhas públicas, entre macróbios. Tinha saúde e robustez. Suponha-se que, em vez de estar lançando os alicerces de uma invenção farmacêutica, tratava de coligir os elementos de uma instituição política, ou de uma reforma religiosa. Vinha a corrente de ar, que vence em eficácia o cálculo humano, e lá se ia tudo. Assim corre a sorte dos homens."
    
    # texto = "Alô, mundo. Aqui quem fala é o Frio! Bug ou não?"
    
    # calcula_assinatura(texto)

# teste função avalia_texto(textos,ass_cp)
    
    ass_cp = le_assinatura()
    textos = (le_textos())
    # print(len(textos)) 
    # print(ass_cp)
    avalia_textos(textos,ass_cp)


# teste função compara_assinatura(as_a, as_b)

    # as_a = le_assinatura()
    # as_b = [4.570754716981132, 0.6273584905660378, 0.4716981132075472, 120.2, 3.2, 36.875]
    # as_b = [4.507936507936508, 0.7777777777777778, 0.6666666666666666, 88.875, 3.25, 26.653846153846153]
    # compara_assinatura(as_a, as_b)


main()

