unit projeto12;

interface

uses
  Windows, Messages, SysUtils, Classes, Graphics, Controls, Forms, Dialogs,
  Grids, ComCtrls, Tabnotbk, StdCtrls, Spin, math;

type
  TForm1 = class(TForm)
    TabbedNotebook1: TTabbedNotebook;
    StringGrid1: TStringGrid;
    Button1: TButton;
    SpinEdit1: TSpinEdit;
    label1: TLabel;
    StringGrid2: TStringGrid;
    StringGrid3: TStringGrid;
    Button2: TButton;
    Button3: TButton;
    Button5: TButton;
    Button4: TButton;
    Button6: TButton;
    Button7: TButton;
    procedure SpinEdit1Change(Sender: TObject);
    procedure Button3Click(Sender: TObject);
    procedure Button2Click(Sender: TObject);
    procedure Button1Click(Sender: TObject);
    procedure FormCreate(Sender: TObject);
    procedure Button4Click(Sender: TObject);
    procedure Button6Click(Sender: TObject);
    procedure Button7Click(Sender: TObject);

    private
    { Private declarations }
  public
    { Public declarations }
  end;

var
  Form1: TForm1;

implementation

{$R *.DFM}



procedure TForm1.SpinEdit1Change(Sender: TObject);
var j:integer;
begin
Stringgrid1.colcount:=spinedit1.value+2;    // Modifica a ordem do Stringgrid1
stringgrid1.rowcount:=spinedit1.value+1;
for j:=1 to ((spinedit1.value)) do stringgrid1.cells[j,0]:='X'+ inttostr(j);
stringgrid1.cells[spinedit1.value+1,0]:='i';
for j:=1 to ((spinedit1.value)) do stringgrid1.cells[0,j]:='Eq. '+ inttostr(j);

Stringgrid2.colcount:=spinedit1.value+2;    // Modifica a ordem do Stringgrid2
stringgrid2.rowcount:=spinedit1.value+1;
for j:=1 to ((spinedit1.value)) do stringgrid2.cells[j,0]:='X'+ inttostr(j);
stringgrid2.cells[spinedit1.value+1,0]:='i';
for j:=1 to ((spinedit1.value)) do stringgrid2.cells[0,j]:='Eq. '+ inttostr(j);

Stringgrid3.colcount:=spinedit1.value+1;    // Modifica a ordem do Stringgrid2
stringgrid3.rowcount:=2;
for j:=1 to ((spinedit1.value)) do stringgrid3.cells[j,0]:='X'+ inttostr(j);

end;

procedure TForm1.FormCreate(Sender: TObject);
var j:integer;
begin
Stringgrid1.colcount:=spinedit1.value+2;    // Modifica a ordem do Stringgrid1
stringgrid1.rowcount:=spinedit1.value+1;
for j:=1 to ((spinedit1.value)) do stringgrid1.cells[j,0]:='X'+ inttostr(j);
stringgrid1.cells[spinedit1.value+1,0]:='i';
for j:=1 to ((spinedit1.value)) do stringgrid1.cells[0,j]:='Eq. '+ inttostr(j);
stringgrid1.cells[0,0]:='S. L. ';

Stringgrid2.colcount:=spinedit1.value+2;    // Modifica a ordem do Stringgrid2
stringgrid2.rowcount:=spinedit1.value+1;
for j:=1 to ((spinedit1.value)) do stringgrid2.cells[j,0]:='X'+ inttostr(j);
stringgrid2.cells[spinedit1.value+1,0]:='i';
for j:=1 to ((spinedit1.value)) do stringgrid2.cells[0,j]:='Eq. '+ inttostr(j);
stringgrid2.cells[0,0]:='S. L. ';
Stringgrid3.colcount:=spinedit1.value+1;    // Modifica a ordem do Stringgrid2
stringgrid3.rowcount:=2;
for j:=1 to ((spinedit1.value)) do stringgrid3.cells[j,0]:='X'+ inttostr(j);

end;
procedure TForm1.Button3Click(Sender: TObject);
begin
CLOSE;
end;

procedure TForm1.Button2Click(Sender: TObject);
var j, i:integer;
begin
for j:=1 to spinedit1.value+1 do      // Limpa Stringgrid1
  for i:=1 to spinedit1.value do
    stringgrid1.cells[j,i]:='';
for j:=1 to spinedit1.value+1 do      // Limpa Stringgrid2
  for i:=1 to spinedit1.value do
    stringgrid2.cells[j,i]:='';
for j:=1 to spinedit1.value do      // Limpa Stringgrid3
    stringgrid3.cells[j,1]:='';
end;
procedure TForm1.Button1Click(Sender: TObject);
var
matriz1: array[1..20,1..21] of Double;
x: array[1..20] of Double;
i, j, l, k,linhas, colunas, erro, c, d: integer;
pivot , soma, s1: Double;
begin
linhas:=spinedit1.value;
colunas:=spinedit1.value+1;
for i:=1 to 20 do for j:=1 to 21 do matriz1[i,j]:=0;
for i:=1 to linhas do for j:=1 to colunas do  //percorre a matriz
matriz1[i,j]:=strtofloat(stringgrid1.cells[j,i]); //armazena coeficientes na matriz1
i:=1;
j:=1;erro:=0;
while (i<linhas) and (j<=colunas) do
      begin

      for c:=1 to linhas do

    begin
    s1:=0;
    for d:=1 to colunas do
    s1:=s1+abs(matriz1[c,d]);
    
    if s1=0 then
       begin
       erro:=1;
       showmessage('Sistema Indeterminado');
       end;
    end;
    if (erro<>1) then
      begin
      for l:=i+1 to linhas do
          for k:=j+1 to colunas do
          begin
          if matriz1[i,j]=0 then showmessage('Verifique suas equações...')
           else matriz1[l,k]:=matriz1[l,k]-((matriz1[l,j]*matriz1[i,k])/matriz1[i,j]);
          end;
      for l:=i+1 to linhas do
          matriz1[l,j]:=0;
      end;
      i:=i+1;
      j:=j+1;
    end;
if erro<>1 then
begin
for i:=1 to linhas do
for j:=1 to colunas do
stringgrid2.cells[j,i]:=floattostr(matriz1[i,j]);
x[linhas]:=matriz1[linhas,colunas-1]/matriz1[linhas,colunas];
   for i:=linhas downto 1 do
       begin
       soma:=0;
       for j:=i+1 to linhas do
           soma:=soma+(matriz1[i,j]*x[j]);
       x[i]:=(matriz1[i,colunas]-soma)/matriz1[i,i];
       stringgrid3.cells[i,1]:=floattostr(x[i]);
    end;
end;
end;
    




procedure TForm1.Button4Click(Sender: TObject);
var
j:integer;
begin
spinedit1.value:=10;
stringgrid1.colcount:=12;
stringgrid1.rowcount:=11;
for j:=1 to 10 do stringgrid1.cells[j,0]:='X'+ inttostr(j);
stringgrid1.cells[11,0]:='i';


Stringgrid2.colcount:=12;
stringgrid2.rowcount:=11;
for j:=1 to 10 do stringgrid2.cells[j,0]:='X'+ inttostr(j);
stringgrid2.cells[11,0]:='i';
for j:=1 to 10 do stringgrid2.cells[0,j]:='Eq. '+ inttostr(j);

stringgrid1.cells[1,1]:=floattostr(3);
stringgrid1.cells[1,2]:=floattostr(4);
stringgrid1.cells[1,3]:=floattostr(5);
stringgrid1.cells[1,4]:=floattostr(6);
stringgrid1.cells[1,5]:=floattostr(10);
stringgrid1.cells[1,6]:=floattostr(4);
stringgrid1.cells[1,7]:=floattostr(30);
stringgrid1.cells[1,8]:=floattostr(1);
stringgrid1.cells[1,9]:=floattostr(1);
stringgrid1.cells[1,10]:=floattostr(-1);
stringgrid1.cells[2,1]:=floattostr(2);
stringgrid1.cells[2,2]:=floattostr(-2);
stringgrid1.cells[2,3]:=floattostr(1);
stringgrid1.cells[2,4]:=floattostr(-1);
stringgrid1.cells[2,5]:=floattostr(7);
stringgrid1.cells[2,6]:=floattostr(20);
stringgrid1.cells[2,7]:=floattostr(3);
stringgrid1.cells[2,8]:=floattostr(2);
stringgrid1.cells[2,9]:=floattostr(30);
stringgrid1.cells[2,10]:=floattostr(7);
stringgrid1.cells[3,1]:=floattostr(2);
stringgrid1.cells[3,2]:=floattostr(7);
stringgrid1.cells[3,3]:=floattostr(8);
stringgrid1.cells[3,4]:=floattostr(3);
stringgrid1.cells[3,5]:=floattostr(-2);
stringgrid1.cells[3,6]:=floattostr(-3);
stringgrid1.cells[3,7]:=floattostr(-2);
stringgrid1.cells[3,8]:=floattostr(12);
stringgrid1.cells[3,9]:=floattostr(3);
stringgrid1.cells[3,10]:=floattostr(2);
stringgrid1.cells[4,1]:=floattostr(2);
stringgrid1.cells[4,2]:=floattostr(-2);
stringgrid1.cells[4,3]:=floattostr(-4);
stringgrid1.cells[4,4]:=floattostr(4);
stringgrid1.cells[4,5]:=floattostr(1);
stringgrid1.cells[4,6]:=floattostr(2);
stringgrid1.cells[4,7]:=floattostr(12);
stringgrid1.cells[4,8]:=floattostr(5);
stringgrid1.cells[4,9]:=floattostr(3);
stringgrid1.cells[4,10]:=floattostr(1);
stringgrid1.cells[5,1]:=floattostr(-6);
stringgrid1.cells[5,2]:=floattostr(-4);
stringgrid1.cells[5,3]:=floattostr(-1);
stringgrid1.cells[5,4]:=floattostr(7);
stringgrid1.cells[5,5]:=floattostr(6);
stringgrid1.cells[5,6]:=floattostr(8);
stringgrid1.cells[5,7]:=floattostr(3);
stringgrid1.cells[5,8]:=floattostr(12);
stringgrid1.cells[5,9]:=floattostr(5);
stringgrid1.cells[5,10]:=floattostr(1);
stringgrid1.cells[6,1]:=floattostr(-3);
stringgrid1.cells[6,2]:=floattostr(7);
stringgrid1.cells[6,3]:=floattostr(5);
stringgrid1.cells[6,4]:=floattostr(4);
stringgrid1.cells[6,5]:=floattostr(12);
stringgrid1.cells[6,6]:=floattostr(7);
stringgrid1.cells[6,7]:=floattostr(-10);
stringgrid1.cells[6,8]:=floattostr(11);
stringgrid1.cells[6,9]:=floattostr(12);
stringgrid1.cells[6,10]:=floattostr(9);
stringgrid1.cells[7,1]:=floattostr(3);
stringgrid1.cells[7,2]:=floattostr(2);
stringgrid1.cells[7,3]:=floattostr(4);
stringgrid1.cells[7,4]:=floattostr(4);
stringgrid1.cells[7,5]:=floattostr(9);
stringgrid1.cells[7,6]:=floattostr(12);
stringgrid1.cells[7,7]:=floattostr(8);
stringgrid1.cells[7,8]:=floattostr(7);
stringgrid1.cells[7,9]:=floattostr(12);
stringgrid1.cells[7,10]:=floattostr(5);
stringgrid1.cells[8,1]:=floattostr(1);
stringgrid1.cells[8,2]:=floattostr(3);
stringgrid1.cells[8,3]:=floattostr(-1);
stringgrid1.cells[8,4]:=floattostr(-1);
stringgrid1.cells[8,5]:=floattostr(1);
stringgrid1.cells[8,6]:=floattostr(2);
stringgrid1.cells[8,7]:=floattostr(12);
stringgrid1.cells[8,8]:=floattostr(12);
stringgrid1.cells[8,9]:=floattostr(12);
stringgrid1.cells[8,10]:=floattostr(-1);
stringgrid1.cells[9,1]:=floattostr(3);
stringgrid1.cells[9,2]:=floattostr(1);
stringgrid1.cells[9,3]:=floattostr(2);
stringgrid1.cells[9,4]:=floattostr(-1);
stringgrid1.cells[9,5]:=floattostr(-1);
stringgrid1.cells[9,6]:=floattostr(1);
stringgrid1.cells[9,7]:=floattostr(23);
stringgrid1.cells[9,8]:=floattostr(23);
stringgrid1.cells[9,9]:=floattostr(23);
stringgrid1.cells[9,10]:=floattostr(0);
stringgrid1.cells[10,1]:=floattostr(4);
stringgrid1.cells[10,2]:=floattostr(2);
stringgrid1.cells[10,3]:=floattostr(1);
stringgrid1.cells[10,4]:=floattostr(2);
stringgrid1.cells[10,5]:=floattostr(-1);
stringgrid1.cells[10,6]:=floattostr(-1);
stringgrid1.cells[10,7]:=floattostr(1);
stringgrid1.cells[10,8]:=floattostr(34);
stringgrid1.cells[10,9]:=floattostr(34);
stringgrid1.cells[10,10]:=floattostr(23);
stringgrid1.cells[11,1]:=floattostr(10);
stringgrid1.cells[11,2]:=floattostr(20);
stringgrid1.cells[11,3]:=floattostr(18);
stringgrid1.cells[11,4]:=floattostr(13);
stringgrid1.cells[11,5]:=floattostr(14);
stringgrid1.cells[11,6]:=floattostr(15);
stringgrid1.cells[11,7]:=floattostr(5);
stringgrid1.cells[11,8]:=floattostr(4);
stringgrid1.cells[11,9]:=floattostr(6);
stringgrid1.cells[11,10]:=floattostr(-1);


end;

procedure TForm1.Button6Click(Sender: TObject);
var
j:integer;
begin
spinedit1.value:=10;
Stringgrid1.colcount:=12;
stringgrid1.rowcount:=11;
for j:=1 to 10 do stringgrid1.cells[j,0]:='X'+ inttostr(j);
stringgrid1.cells[11,0]:='i';
for j:=1 to 10 do stringgrid1.cells[0,j]:='Eq. '+ inttostr(j);

Stringgrid2.colcount:=12;
stringgrid2.rowcount:=11;
for j:=1 to 10 do stringgrid2.cells[j,0]:='X'+ inttostr(j);
stringgrid2.cells[11,0]:='i';
for j:=1 to 10 do stringgrid2.cells[0,j]:='Eq. '+ inttostr(j);

stringgrid1.cells[1,1]:=floattostr(3);
stringgrid1.cells[1,2]:=floattostr(4);
stringgrid1.cells[1,3]:=floattostr(5);
stringgrid1.cells[1,4]:=floattostr(6);
stringgrid1.cells[1,5]:=floattostr(3);
stringgrid1.cells[1,6]:=floattostr(4);
stringgrid1.cells[1,7]:=floattostr(7);
stringgrid1.cells[1,8]:=floattostr(1);
stringgrid1.cells[1,9]:=floattostr(1);
stringgrid1.cells[1,10]:=floattostr(-1);
stringgrid1.cells[2,1]:=floattostr(2);
stringgrid1.cells[2,2]:=floattostr(-2);
stringgrid1.cells[2,3]:=floattostr(1);
stringgrid1.cells[2,4]:=floattostr(-1);
stringgrid1.cells[2,5]:=floattostr(7);
stringgrid1.cells[2,6]:=floattostr(5);
stringgrid1.cells[2,7]:=floattostr(3);
stringgrid1.cells[2,8]:=floattostr(2);
stringgrid1.cells[2,9]:=floattostr(1);
stringgrid1.cells[2,10]:=floattostr(7);
stringgrid1.cells[3,1]:=floattostr(2);
stringgrid1.cells[3,2]:=floattostr(7);
stringgrid1.cells[3,3]:=floattostr(8);
stringgrid1.cells[3,4]:=floattostr(3);
stringgrid1.cells[3,5]:=floattostr(-2);
stringgrid1.cells[3,6]:=floattostr(-3);
stringgrid1.cells[3,7]:=floattostr(-2);
stringgrid1.cells[3,8]:=floattostr(5);
stringgrid1.cells[3,9]:=floattostr(3);
stringgrid1.cells[3,10]:=floattostr(2);
stringgrid1.cells[4,1]:=floattostr(2);
stringgrid1.cells[4,2]:=floattostr(-2);
stringgrid1.cells[4,3]:=floattostr(-4);
stringgrid1.cells[4,4]:=floattostr(4);
stringgrid1.cells[4,5]:=floattostr(1);
stringgrid1.cells[4,6]:=floattostr(2);
stringgrid1.cells[4,7]:=floattostr(3);
stringgrid1.cells[4,8]:=floattostr(5);
stringgrid1.cells[4,9]:=floattostr(3);
stringgrid1.cells[4,10]:=floattostr(1);
stringgrid1.cells[5,1]:=floattostr(-6);
stringgrid1.cells[5,2]:=floattostr(-4);
stringgrid1.cells[5,3]:=floattostr(-1);
stringgrid1.cells[5,4]:=floattostr(7);
stringgrid1.cells[5,5]:=floattostr(6);
stringgrid1.cells[5,6]:=floattostr(8);
stringgrid1.cells[5,7]:=floattostr(3);
stringgrid1.cells[5,8]:=floattostr(4);
stringgrid1.cells[5,9]:=floattostr(5);
stringgrid1.cells[5,10]:=floattostr(1);
stringgrid1.cells[6,1]:=floattostr(-3);
stringgrid1.cells[6,2]:=floattostr(7);
stringgrid1.cells[6,3]:=floattostr(5);
stringgrid1.cells[6,4]:=floattostr(4);
stringgrid1.cells[6,5]:=floattostr(6);
stringgrid1.cells[6,6]:=floattostr(7);
stringgrid1.cells[6,7]:=floattostr(-10);
stringgrid1.cells[6,8]:=floattostr(11);
stringgrid1.cells[6,9]:=floattostr(6);
stringgrid1.cells[6,10]:=floattostr(9);
stringgrid1.cells[7,1]:=floattostr(3);
stringgrid1.cells[7,2]:=floattostr(2);
stringgrid1.cells[7,3]:=floattostr(4);
stringgrid1.cells[7,4]:=floattostr(4);
stringgrid1.cells[7,5]:=floattostr(9);
stringgrid1.cells[7,6]:=floattostr(8);
stringgrid1.cells[7,7]:=floattostr(8);
stringgrid1.cells[7,8]:=floattostr(7);
stringgrid1.cells[7,9]:=floattostr(6);
stringgrid1.cells[7,10]:=floattostr(5);
stringgrid1.cells[8,1]:=floattostr(1);
stringgrid1.cells[8,2]:=floattostr(3);
stringgrid1.cells[8,3]:=floattostr(-1);
stringgrid1.cells[8,4]:=floattostr(-1);
stringgrid1.cells[8,5]:=floattostr(1);
stringgrid1.cells[8,6]:=floattostr(2);
stringgrid1.cells[8,7]:=floattostr(-1);
stringgrid1.cells[8,8]:=floattostr(-1);
stringgrid1.cells[8,9]:=floattostr(-1);
stringgrid1.cells[8,10]:=floattostr(-1);
stringgrid1.cells[9,1]:=floattostr(3);
stringgrid1.cells[9,2]:=floattostr(1);
stringgrid1.cells[9,3]:=floattostr(2);
stringgrid1.cells[9,4]:=floattostr(-1);
stringgrid1.cells[9,5]:=floattostr(-1);
stringgrid1.cells[9,6]:=floattostr(1);
stringgrid1.cells[9,7]:=floattostr(2);
stringgrid1.cells[9,8]:=floattostr(-1);
stringgrid1.cells[9,9]:=floattostr(-1);
stringgrid1.cells[9,10]:=floattostr(0);
stringgrid1.cells[10,1]:=floattostr(4);
stringgrid1.cells[10,2]:=floattostr(2);
stringgrid1.cells[10,3]:=floattostr(1);
stringgrid1.cells[10,4]:=floattostr(2);
stringgrid1.cells[10,5]:=floattostr(-1);
stringgrid1.cells[10,6]:=floattostr(-1);
stringgrid1.cells[10,7]:=floattostr(1);
stringgrid1.cells[10,8]:=floattostr(2);
stringgrid1.cells[10,9]:=floattostr(-1);
stringgrid1.cells[10,10]:=floattostr(-1);
stringgrid1.cells[11,1]:=floattostr(10);
stringgrid1.cells[11,2]:=floattostr(20);
stringgrid1.cells[11,3]:=floattostr(18);
stringgrid1.cells[11,4]:=floattostr(13);
stringgrid1.cells[11,5]:=floattostr(14);
stringgrid1.cells[11,6]:=floattostr(15);
stringgrid1.cells[11,7]:=floattostr(5);
stringgrid1.cells[11,8]:=floattostr(4);
stringgrid1.cells[11,9]:=floattostr(6);
stringgrid1.cells[11,10]:=floattostr(-1);
end;
procedure TForm1.Button7Click(Sender: TObject);
var
j:integer;
begin
spinedit1.value:=10;
Stringgrid1.colcount:=12;
stringgrid1.rowcount:=11;
for j:=1 to 10 do stringgrid1.cells[j,0]:='X'+ inttostr(j);
stringgrid1.cells[11,0]:='i';
for j:=1 to 10 do stringgrid1.cells[0,j]:='Eq. '+ inttostr(j);

Stringgrid2.colcount:=12;
stringgrid2.rowcount:=11;
for j:=1 to 10 do stringgrid2.cells[j,0]:='X'+ inttostr(j);
stringgrid2.cells[11,0]:='i';
for j:=1 to 10 do stringgrid2.cells[0,j]:='Eq. '+ inttostr(j);

stringgrid1.cells[1,1]:=floattostr(10);
stringgrid1.cells[1,2]:=floattostr(4);
stringgrid1.cells[1,3]:=floattostr(5);
stringgrid1.cells[1,4]:=floattostr(6);
stringgrid1.cells[1,5]:=floattostr(3);
stringgrid1.cells[1,6]:=floattostr(4);
stringgrid1.cells[1,7]:=floattostr(7);
stringgrid1.cells[1,8]:=floattostr(1);
stringgrid1.cells[1,9]:=floattostr(1);
stringgrid1.cells[1,10]:=floattostr(-1);
stringgrid1.cells[2,1]:=floattostr(2);
stringgrid1.cells[2,2]:=floattostr(10);
stringgrid1.cells[2,3]:=floattostr(1);
stringgrid1.cells[2,4]:=floattostr(-1);
stringgrid1.cells[2,5]:=floattostr(7);
stringgrid1.cells[2,6]:=floattostr(5);
stringgrid1.cells[2,7]:=floattostr(3);
stringgrid1.cells[2,8]:=floattostr(2);
stringgrid1.cells[2,9]:=floattostr(1);
stringgrid1.cells[2,10]:=floattostr(7);
stringgrid1.cells[3,1]:=floattostr(2);
stringgrid1.cells[3,2]:=floattostr(7);
stringgrid1.cells[3,3]:=floattostr(10);
stringgrid1.cells[3,4]:=floattostr(3);
stringgrid1.cells[3,5]:=floattostr(-2);
stringgrid1.cells[3,6]:=floattostr(-3);
stringgrid1.cells[3,7]:=floattostr(-2);
stringgrid1.cells[3,8]:=floattostr(5);
stringgrid1.cells[3,9]:=floattostr(3);
stringgrid1.cells[3,10]:=floattostr(2);
stringgrid1.cells[4,1]:=floattostr(2);
stringgrid1.cells[4,2]:=floattostr(-2);
stringgrid1.cells[4,3]:=floattostr(-4);
stringgrid1.cells[4,4]:=floattostr(10);
stringgrid1.cells[4,5]:=floattostr(1);
stringgrid1.cells[4,6]:=floattostr(2);
stringgrid1.cells[4,7]:=floattostr(3);
stringgrid1.cells[4,8]:=floattostr(5);
stringgrid1.cells[4,9]:=floattostr(3);
stringgrid1.cells[4,10]:=floattostr(1);
stringgrid1.cells[5,1]:=floattostr(-6);
stringgrid1.cells[5,2]:=floattostr(-4);
stringgrid1.cells[5,3]:=floattostr(-1);
stringgrid1.cells[5,4]:=floattostr(7);
stringgrid1.cells[5,5]:=floattostr(10);
stringgrid1.cells[5,6]:=floattostr(8);
stringgrid1.cells[5,7]:=floattostr(3);
stringgrid1.cells[5,8]:=floattostr(4);
stringgrid1.cells[5,9]:=floattostr(5);
stringgrid1.cells[5,10]:=floattostr(1);
stringgrid1.cells[6,1]:=floattostr(-3);
stringgrid1.cells[6,2]:=floattostr(7);
stringgrid1.cells[6,3]:=floattostr(5);
stringgrid1.cells[6,4]:=floattostr(4);
stringgrid1.cells[6,5]:=floattostr(6);
stringgrid1.cells[6,6]:=floattostr(10);
stringgrid1.cells[6,7]:=floattostr(-10);
stringgrid1.cells[6,8]:=floattostr(11);
stringgrid1.cells[6,9]:=floattostr(6);
stringgrid1.cells[6,10]:=floattostr(9);
stringgrid1.cells[7,1]:=floattostr(3);
stringgrid1.cells[7,2]:=floattostr(2);
stringgrid1.cells[7,3]:=floattostr(4);
stringgrid1.cells[7,4]:=floattostr(4);
stringgrid1.cells[7,5]:=floattostr(9);
stringgrid1.cells[7,6]:=floattostr(8);
stringgrid1.cells[7,7]:=floattostr(10);
stringgrid1.cells[7,8]:=floattostr(7);
stringgrid1.cells[7,9]:=floattostr(6);
stringgrid1.cells[7,10]:=floattostr(5);
stringgrid1.cells[8,1]:=floattostr(1);
stringgrid1.cells[8,2]:=floattostr(3);
stringgrid1.cells[8,3]:=floattostr(-1);
stringgrid1.cells[8,4]:=floattostr(-1);
stringgrid1.cells[8,5]:=floattostr(1);
stringgrid1.cells[8,6]:=floattostr(2);
stringgrid1.cells[8,7]:=floattostr(-1);
stringgrid1.cells[8,8]:=floattostr(10);
stringgrid1.cells[8,9]:=floattostr(-1);
stringgrid1.cells[8,10]:=floattostr(-1);
stringgrid1.cells[9,1]:=floattostr(3);
stringgrid1.cells[9,2]:=floattostr(1);
stringgrid1.cells[9,3]:=floattostr(2);
stringgrid1.cells[9,4]:=floattostr(-1);
stringgrid1.cells[9,5]:=floattostr(-1);
stringgrid1.cells[9,6]:=floattostr(1);
stringgrid1.cells[9,7]:=floattostr(2);
stringgrid1.cells[9,8]:=floattostr(-1);
stringgrid1.cells[9,9]:=floattostr(10);
stringgrid1.cells[9,10]:=floattostr(0);
stringgrid1.cells[10,1]:=floattostr(4);
stringgrid1.cells[10,2]:=floattostr(2);
stringgrid1.cells[10,3]:=floattostr(1);
stringgrid1.cells[10,4]:=floattostr(2);
stringgrid1.cells[10,5]:=floattostr(-1);
stringgrid1.cells[10,6]:=floattostr(-1);
stringgrid1.cells[10,7]:=floattostr(1);
stringgrid1.cells[10,8]:=floattostr(2);
stringgrid1.cells[10,9]:=floattostr(-1);
stringgrid1.cells[10,10]:=floattostr(10);
stringgrid1.cells[11,1]:=floattostr(1);
stringgrid1.cells[11,2]:=floattostr(2);
stringgrid1.cells[11,3]:=floattostr(3);
stringgrid1.cells[11,4]:=floattostr(4);
stringgrid1.cells[11,5]:=floattostr(5);
stringgrid1.cells[11,6]:=floattostr(6);
stringgrid1.cells[11,7]:=floattostr(7);
stringgrid1.cells[11,8]:=floattostr(8);
stringgrid1.cells[11,9]:=floattostr(9);
stringgrid1.cells[11,10]:=floattostr(10);

end;

end.


