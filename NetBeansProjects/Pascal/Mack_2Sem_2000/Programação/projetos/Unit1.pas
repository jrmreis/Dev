unit Unit1;

interface

uses
  Windows, Messages, SysUtils, Classes, Graphics, Controls, Forms, Dialogs,
  StdCtrls, Grids;

type
  TForm1 = class(TForm)
    StringGrid1: TStringGrid;
    Button1: TButton;
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

procedure TForm1.Button1Click(Sender: TObject);
var i,j, lm, cm :integer;
    xi : double;
array A[1..lm,1..cm]:double;

begin
A[i,j];
i:=1;
j:=1;

   for i:=1 to lm do
      for j:=1 to cm do
   if i<lm and  j<=cm them
      if A<>0 them
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
