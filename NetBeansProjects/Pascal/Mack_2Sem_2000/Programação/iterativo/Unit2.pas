unit Unit2;

interface

uses
  Windows, Messages, math, SysUtils, Classes, Graphics, Controls, Forms, Dialogs,
  StdCtrls;

type
  TForm1 = class(TForm)
    Label1: TLabel;
    Edit1: TEdit;
    Label2: TLabel;
    Edit2: TEdit;
    Label3: TLabel;
    Edit3: TEdit;
    Label4: TLabel;
    Edit4: TEdit;
    Button1: TButton;
    Edit5: TEdit;
    Label5: TLabel;
    Label6: TLabel;
    Edit6: TEdit;
    Label7: TLabel;
    Edit7: TEdit;
    Button2: TButton;
    Button3: TButton;
    procedure Button1Click(Sender: TObject);
    procedure Button2Click(Sender: TObject);
    procedure Button3Click(Sender: TObject);
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
var
d, c, i, r, a, v,f ,ff, z: double;
begin
d:=strtofloat(edit3.text);
z:=strtofloat(edit1.text);
f:=strtofloat(edit2.text);
c:=strtofloat(edit4.text);
a:=(d/2)*(d/2)*pi;

repeat

v:=sqr((2*9.81*z)/(f*(c/a))+1);
edit5.text:=floattostr(v);

r:=(1000*v*d)/0.001 ;
edit6.text:=floattostr(r);

ff:=1.325/(power((ln((0.005/3.7)+(5.74/(power(r,0.9))))),2));

i:=((abs(ff-f))/f)*100 ;

f:=0;
f:=ff;


until i<=0.01;

edit7.text:=floattostr(f);

end;

procedure TForm1.Button2Click(Sender: TObject);
begin
edit1.text:='24,384';
edit2.text:='0,03';
edit3.text:='0,1016';
edit4.text:='208,0768';
end;

procedure TForm1.Button3Click(Sender: TObject);
begin
edit1.Clear;
edit2.Clear;
edit3.Clear;
edit4.Clear;
edit5.Clear;
edit6.Clear;
edit7.Clear;

end;

end.
