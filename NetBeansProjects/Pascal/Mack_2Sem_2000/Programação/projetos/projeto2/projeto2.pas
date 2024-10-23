unit projeto1;

interface

uses
  Windows, Messages, SysUtils, Classes, Graphics, Controls, Forms, Dialogs,
  Grids, ComCtrls, Tabnotbk, StdCtrls, Spin;

type
  TForm1 = class(TForm)
    TabbedNotebook1: TTabbedNotebook;
    StringGrid1: TStringGrid;
    Button1: TButton;
    SpinEdit1: TSpinEdit;
    label1: TLabel;
    StringGrid2: TStringGrid;
    StringGrid3: TStringGrid;
    procedure SpinEdit1Change(Sender: TObject);
    procedure Button1Click(Sender: TObject);
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
 var x,j,n : integer;

 begin
n:=spinedit1.value;

if n>1 then
stringgrid1.colcount:=n+1;
stringGrid1.rowcount:=n+1;
stringGrid1.fixedcols:=0;
stringGrid1.fixedrows:=1;
//preencher a linha fixada 1
   for j:=0 to n do
      stringGrid1.Cells[j,0]:='x'+('1'+1);



end;


procedure TForm1.Button1Click(Sender: TObject);

var i,j :integer;
     xi : double;
a: array [1..n,1..n] : double;

begin

//colocando do stringGrid na matriz

for j:=0 to n do
   for i:=1 to n do
      a[i,j]:=StringToFloat(StringGrid1.Cells[j,i]);

//iniciando algoritimo

   for i:=1 to n do
      for j:=0 to n do
   if i<n and  j<=n them
      if a[i,j]<>0 them
      begin
         for a[i,j]=0;
         xi:=xi+1;

      if a[xi,i] <> 0 and xi>i them
      i:=xi;

i:=i+1;
j:=j+1;

  if a[xi,j]=0 and xi>i them
  j:=j+i;

end;

end;

end.
      


end;

end.
