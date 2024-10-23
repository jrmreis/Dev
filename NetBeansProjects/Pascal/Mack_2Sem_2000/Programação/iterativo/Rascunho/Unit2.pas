unit Unit2;

interface

uses
  Windows, Messages, math, SysUtils, Classes, Graphics, Controls, Forms, Dialogs,
  StdCtrls, ExtCtrls;

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
    Edit8: TEdit;
    Label8: TLabel;
    Edit9: TEdit;
    Label9: TLabel;
    Label10: TLabel;
    Edit10: TEdit;
    Edit11: TEdit;
    Label11: TLabel;
    Edit12: TEdit;
    Label12: TLabel;
    Image1: TImage;
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
d,d2,alfa,cd,dp, c, i, r, a,a2, v,f ,ff, z, ed, vm : double;
begin
d:=strtofloat(edit3.text);
z:=strtofloat(edit1.text);
f:=strtofloat(edit2.text);
c:=strtofloat(edit4.text);
a:=(d/2)*(d/2)*pi;
ed:=strtofloat(edit8.text);
d2:=strtofloat(edit10.text);
a2:=(d2/2)*(d2/2)*pi;
cd:=strtofloat(edit12.text);
repeat

v:=power(((2*9.81*z)/((f*(c/d))+(1.47*(a/a2)))),0.5);
edit5.text:=floattostr(v);

r:=((998*v*d)/0.001) ;
edit6.text:=floattostr(r);

ff:=(1.325/(power((ln((ed/3.7)+(5.74/(power(r,0.9))))),2)));

i:=((abs(ff-f))/f)*100 ;


f:=ff;


until i<=0.01;

edit7.text:=floattostr(f);
vm:=a*v;
edit9.text:=floattostr(vm);

alfa:=(cd/(power((1-power((d2/d),4)),0.5)));

dp:=((power((vm/(alfa*a2)),2))*998/2);

edit11.text:=floattostr(dp);

end;

procedure TForm1.Button2Click(Sender: TObject);
begin
edit1.text:='20';
edit2.text:='0,014';
edit3.text:='0,05';
edit4.text:='100';
edit8.text:='0,0002';
edit10.text:='0,03';
edit12.text:='0,607';
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
edit8.Clear;
edit9.Clear;
edit10.Clear;
edit11.Clear;
edit12.Clear;
end;





end.
