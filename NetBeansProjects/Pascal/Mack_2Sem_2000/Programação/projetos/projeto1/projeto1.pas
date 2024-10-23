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
x:=0;
  for j:=1 to n do
  stringgrid1.cells[X,0]:='X';
  stringGrid1.cells[j,0]:=inttostr(j);
  stringGrid1.cells[N,0]:='N';

end;


procedure TForm1.Button1Click(Sender: TObject);
array [1..n,1..x] : double;

var i,j :integer;
    n,m :double;
begin
  i=1;
  j=1;
      for i:1 to x do
         for j:1 to n


end;

end.
