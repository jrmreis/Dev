<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
    </head><pre>
    <body>
        <?php
        require_once 'Pessoa.php';
        require_once 'Aluno.php';
        require_once 'Professores.php';
        require_once 'Funcionario.php';
        //Programa Principal
        
        $p1 = new Pessoa();
        $p2 = new Aluno();
        $p3 = new Professores();
        $p4 = new Funcionario();
        
        $p1->setNome("Pedro");
        $p2->setNome("Maria");
        $p3->setNome("Cláudio");
        $p4->setNome("Fabiana");
        
        $p1->setSexo("M");
        $p4->setSexo("F");
        
        $p2->setCurso("Informática");
        $p3->setSalario(2500.75);
        $p4->setSetor("Estoque");
        
        //$p1->receberAum(550.20);
        //$p2->mudarTrabalho();
        //$p4->cancelarMatr();
        
        $p3->receberAum(550.20);
        $p4->mudarTrabalho();
        $p2->cancelarMatr();
        
        
        print_r($p1);
        print_r($p2);
        print_r($p3);
        print_r($p4);
        
        ?>
    </pre></body>
</html>
