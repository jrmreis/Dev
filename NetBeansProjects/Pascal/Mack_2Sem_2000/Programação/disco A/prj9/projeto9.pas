unit projeto9;

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
    Button4: TButton;
    Button5: TButton;
    procedure SpinEdit1Change(Sender: TObject);
    procedure Button3Click(Sender: TObject);
    procedure Button2Click(Sender: TObject);
    procedure Button1Click(Sender: TObject);
    procedure Button4Click(Sender: TObject);
    procedure Button5Click(Sender: TObject);
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
 var j,n,y : integer;

      begin

n:=spinedit1.value;

if n>1 then
stringgrid1.colcount:=n+1;
   stringgrid2.colcount:=n+1;
      stringgrid3.colcount:=n;
stringGrid1.rowcount:=n+1;
   stringGrid2.rowcount:=n+1;
stringGrid1.fixedcols:=0;
   stringGrid2.fixedcols:=0;
      stringGrid3.fixedcols:=0;
stringGrid1.fixedrows:=1;
   stringGrid2.fixedrows:=1;
      stringGrid3.fixedrows:=1;
//preencher a linha fixada 1
  y:=1;
  for j:=0 to n-1 do
     begin
     stringgrid1.cells[j,0]:='X'+floatToStr(y);
       stringgrid2.cells[j,0]:='X'+floatToStr(y);
          stringgrid3.cells[j,0]:='X'+floatToStr(y);
     stringGrid1.cells[j+1,0]:='í';
       stringGrid2.cells[j+1,0]:='í';
     y:=y+1;
     end;


     end;



procedure TForm1.Button3Click(Sender: TObject);
begin
CLOSE;
end;

procedure TForm1.Button2Click(Sender: TObject);
var j,i,n : integer;

begin
n:=spinedit1.value;
for i:=1 to n do
   for j:=0 to n do
   begin
stringGrid1.cells[j,i]:=' ';
   stringGrid2.cells[j,i]:=' ';
      stringGrid3.cells[j,1]:=' ';
   end;
end;

procedure TForm1.Button1Click(Sender: TObject);
var
    a: array [1..20,1..20] of double;
       i,j,n,xi,xj:integer;
       f:double;
begin
 n:=spinedit1.value;
for i:=1 to n do
  for j:=0 to n do
   a[i,j+1]:=Strtofloat(stringGrid1.cells[j,i]);
{combinações lineares}
 i:=1; j:=1;
while (i<n) and (j<=n+1)do
begin
if a[i,j]<>0 then
begin

f:=a[i+1,j];    {valor "fixo" (abaixo do pivo)}
for xi:=1 to n do
  for xj:=1 to n+1 do
    begin




 a[xi+1,xj+1]:=a[xi+1,xj+1]-((f*a[xi,xj+1])/a[i,j]);



if  xi>xj then               {zerando a função}
a[xi,xj]:=a[xi,xj]-a[xi,xj];





stringGrid2.cells[xj-1,xi]:=floattostr(a[xi,xj]);
tabbedNotebook1.pageindex:=1;

end;
 
  end;
i:=i+1;
j:=j+1;


  end;

        end;
procedure TForm1.Button4Click(Sender: TObject);
begin
tabbednotebook1.pageindex:=0;
end;

procedure TForm1.Button5Click(Sender: TObject);
var
 r:array [1..20] of double;
 a: array [1..20,1..20] of double;
 i,j,n:integer;
   w,g:double;
begin
n:=spinedit1.value;
i:=1;
j:=0;
for i:=1 to n do
  for j:=0 to n+1 do
  a[i,j+1]:=Strtofloat(stringGrid2.cells[j,i]);
for j:=n downto 1 do
r[j]:=a[i,j];

stringGrid3.cells[j,1]:=floattostr(r[j]);


end;

end.


