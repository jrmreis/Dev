unit Unit1;

interface

uses
  Windows, Messages, SysUtils, Classes, Graphics, Controls, Forms, Dialogs,
  Menus, ComCtrls, Tabnotbk, StdCtrls, ExtCtrls, jpeg, Buttons, Spin,
  ActnList, StdActns, math, ExtDlgs;

type
  TMESHcalculator = class(TForm)
    MainMenu1: TMainMenu;
    File1: TMenuItem;
    Salvar1: TMenuItem;
    Salvar2: TMenuItem;
    Sair1: TMenuItem;
    Crditos1: TMenuItem;
    Indice1: TMenuItem;
    Crdito1: TMenuItem;
    TabbedNotebook1: TTabbedNotebook;
    Label1: TLabel;
    Label2: TLabel;
    Image1: TImage;
    Image2: TImage;
    Label9: TLabel;
    Label10: TLabel;
    SpeedButton2: TSpeedButton;
    SpeedButton1: TSpeedButton;
    Edit1: TEdit;
    ComboBox1: TComboBox;
    RadioGroup1: TRadioGroup;
    RadioButton1: TRadioButton;
    RadioButton2: TRadioButton;
    RadioButton3: TRadioButton;
    ComboBox2: TComboBox;
    ComboBox3: TComboBox;
    Button2: TButton;
    GroupBox1: TGroupBox;
    Label11: TLabel;
    Label12: TLabel;
    Edit8: TEdit;
    Edit7: TEdit;
    GroupBox2: TGroupBox;
    Label13: TLabel;
    Label14: TLabel;
    Edit9: TEdit;
    SpinEdit1: TSpinEdit;
    Button4: TButton;
    Label3: TLabel;
    Label4: TLabel;
    Label5: TLabel;
    Label6: TLabel;
    Label7: TLabel;
    Label8: TLabel;
    Edit2: TEdit;
    Edit3: TEdit;
    Edit4: TEdit;
    Edit5: TEdit;
    Edit6: TEdit;
    SaveDialog1: TSaveDialog;
    Memo1: TMemo;
    Abrir1: TMenuItem;
    OpenDialog1: TOpenDialog;
    Image3: TImage;
    Image4: TImage;
    Image5: TImage;
    Image6: TImage;
    Image7: TImage;
    procedure Cbox1Click(Sender: TObject);
    procedure Sair1Click(Sender: TObject);
    procedure RadioButton1Click(Sender: TObject);
    procedure RadioButton2Click(Sender: TObject);
    procedure RadioButton3Click(Sender: TObject);
    procedure SpeedButton1Click(Sender: TObject);
    procedure SpeedButton2Click(Sender: TObject);
    procedure Salvar2Click(Sender: TObject);
    procedure Abrir1Click(Sender: TObject);
    procedure Button4Click(Sender: TObject);
    procedure Button2Click(Sender: TObject);
    procedure Edit1Change(Sender: TObject);

  




  private
    { Private declarations }
  public
    { Public declarations }
  end;

var
  MESHcalculator: TMESHcalculator;


implementation

{$R *.DFM}

procedure TMESHcalculator.Cbox1Click(Sender: TObject);
var
Cbox_1: string;


begin
Cbox_1:=combobox1.text;


if (Cbox_1 = 'Corpo de Válvula') or (Cbox_1 = 'Body Valve') then begin
Image1.visible:=true;
Edit7.Text:=FormatFloat('0.00',45);  //condição da geometria
Edit8.Text:=FormatFloat('0.00',0);
end
else image1.visible:=false;

if (Cbox_1 = 'Bloco de Motor') or (Cbox_1 = 'Crankcase') then begin
Image2.visible:=true;
Edit7.Text:=FormatFloat('0.00',90);  //condição da geometria
Edit8.Text:=FormatFloat('0.00',90);
end
else image2.visible:=false;

if (Cbox_1 = 'Disco de Freio') or (Cbox_1 = 'Break Disk') then begin
Image4.visible:=true;
Edit7.Text:=FormatFloat('0.00',45);  //condição da geometria
Edit8.Text:=FormatFloat('0.00',180);
end
else image4.visible:=false;

if (Cbox_1 = 'Manto para Mineração') or (Cbox_1 = 'Cone Crasher') then begin
Image5.visible:=true;
Edit7.Text:=FormatFloat('0.00',45);  //condição da geometria
Edit8.Text:=FormatFloat('0.00',45);
end
else image5.visible:=false;

if (Cbox_1 = 'Roda Guia') or (Cbox_1 = 'Idle Wheel') then begin
Image6.visible:=true;
Edit7.Text:=FormatFloat('0.00',90);  //condição da geometria
Edit8.Text:=FormatFloat('0.00',45);
end
else image6.visible:=false;

if (Cbox_1 = 'Rotor') or (Cbox_1 = 'Turbo Rotor') then begin
Image7.visible:=true;
Edit7.Text:=FormatFloat('0.00',54.7356);  //condição da geometria
Edit8.Text:=FormatFloat('0.00',45);
end
else image7.visible:=false;

end;

procedure TMESHcalculator.Sair1Click(Sender: TObject);
begin
close;
end;

procedure TMESHcalculator.RadioButton1Click(Sender: TObject);

begin

ComboBox1.visible := True;
ComboBox2.visible := False;
ComboBox3.visible := False;
Label1.visible := True;
Label9.Visible := False;
Label10.Visible := False;
Label2.Visible := True;
Edit1.visible := True;


end;




procedure TMESHcalculator.RadioButton2Click(Sender: TObject);

begin

ComboBox1.visible := False;
ComboBox2.visible := True;
ComboBox3.visible := False;
Label1.visible := False;
Label9.Visible := True;
Label10.Visible := False;
Label2.Visible := True;
Edit1.visible := True;

end;



procedure TMESHcalculator.RadioButton3Click(Sender: TObject);
begin

ComboBox1.visible := False;
ComboBox2.visible := False;
ComboBox3.visible := True;
Label1.visible := False;
Label9.Visible := False;
Label10.Visible := True;
Label2.Visible := True;
Edit1.visible := True;

end;



procedure TMESHcalculator.SpeedButton1Click(Sender: TObject);
begin

Label1.Caption := 'Foundry Geometry';
Label9.Caption := 'Ingate Geometry';
Label10.Caption := 'Down Sprue Geometry';
Label2.Caption := 'Alpha Tickness (mm)';
RadioButton1.Caption := 'Casting';
RadioButton2.Caption := 'Gating';
RadioButton3.Caption := 'Ingate';
RadioGroup1.Caption := 'Critical Geometry';
Combobox1.text := 'Select the geometry';
Combobox2.text := 'Select the geometry';
Combobox3.text := 'Select the geometry';
TabbedNotebook1.pages[0] := 'Typical User';
TabbedNotebook1.pages[1] := 'Advanced User';
TabbedNotebook1.pages[2] := 'Results';
MESHcalculator.Caption := 'MESHcalculator Beta by Joel Reis';
File1.caption := '&File';
Abrir1.caption := '&Open';
Salvar1.caption := '&New';
Salvar2.caption := '&Save';
Sair1.caption := '&Exit';
Crditos1.Caption := '&Help';
Indice1.Caption := '&Summario';
Crdito1.Caption := '&Credit';
ComboBox1.Items[0] := 'Crankcase';
ComboBox1.Items[1] := 'Body Valve';
ComboBox1.Items[2] := 'Break Disk';
ComboBox1.Items[3] := 'Cone Crasher';
ComboBox1.Items[4] := 'Idle Wheel';
ComboBox1.Items[5] := 'Turbo Rotor';
ComboBox2.Items[0] := 'Round Section';
ComboBox2.Items[1] := 'Square Section';
ComboBox3.Items[0] := 'Hybrid';
ComboBox3.Items[1] := 'Round Section';
ComboBox3.Items[2] := 'Rectangular Section';
GroupBox1.Caption:='Orientation by Espherical Coordinate';
Label11.Caption := 'Phi Angle';
Label12.Caption := 'Theta Angle';
GroupBox2.Caption:='Critical Dimension';
Label13.Caption := 'Alpha Tickness';
Label14.Caption := 'Elements in the Alpha Tickness';
Label8.Caption := 'Method: Standard';

end;

procedure TMESHcalculator.SpeedButton2Click(Sender: TObject);
begin


Label1.Caption := 'Geometria do Fundido';
Label9.Caption := 'Geometria do(s) ataque(s)';
Label10.Caption := 'Geometria do(s) Canal(is)';
Label2.Caption := 'Espessura Alpha (mm)';
RadioButton1.Caption := 'Fundido';
RadioButton2.Caption := 'Canais';
RadioButton3.Caption := 'Ataque';
RadioGroup1.Caption := 'Geometria Crítica';
Combobox1.text := 'Selecione a geometria';
Combobox2.text := 'Selecione a geometria';
Combobox3.text := 'Selecione a geometria';
TabbedNotebook1.pages[0] := 'Usuário Típico';
TabbedNotebook1.pages[1] := 'Usuário Avançado';
TabbedNotebook1.pages[2] := 'Resultados';
MESHcalculator.Caption := 'MESHcalculator Beta por Joel Reis';
File1.caption := '&Arquivo';
Salvar1.caption := '&Novo';
Abrir1.caption := '&Abrir';
Salvar2.caption := '&Salvar';
Sair1.caption := '&Sair';
Crditos1.Caption := 'A&juda';
Indice1.Caption := '&Indice';
Crdito1.Caption := '&Crédito';
ComboBox1.Items[0] := 'Bloco de Motor';
ComboBox1.Items[1] := 'Corpo de Válvula';
ComboBox1.Items[2] := 'Disco de Freio';
ComboBox1.Items[3] := 'Manto para Mineração';
ComboBox1.Items[4] := 'Roda Guia';
ComboBox1.Items[5] := 'Rotor';
ComboBox2.Items[0] := 'Seção Circular';
ComboBox2.Items[1] := 'Seção Quadrada';
ComboBox3.Items[0] := 'Hibrido';
ComboBox3.Items[1] := 'Seção Circular';
ComboBox3.Items[2] := 'Seção Retangular';
GroupBox1.Caption:='Orientação em Coordenadas Esféricas';
Label11.Caption := 'Ângulo Fi';
Label12.Caption := 'Ângulo Teta';
GroupBox2.Caption:='Dimensão Crítica';
Label13.Caption := 'Espessura Alpha';
Label8.Caption := 'Método: Standard';


end;



procedure TMESHcalculator.Salvar2Click(Sender: TObject);
begin
 if SaveDialog1.Execute
   then Memo1.Lines.SaveToFile (SaveDialog1.FileName);
end;

procedure TMESHcalculator.Abrir1Click(Sender: TObject);
begin
  if openDialog1.Execute
     then Memo1.lines.LoadFromFile (openDialog1.filename);
end;


//botão calcular avançado

procedure TMESHcalculator.Button4Click(Sender: TObject);
var
 smt, r: Integer;
  t, wt, acc, es, teta, phi, px, py, pz : double;


begin
t := StrToFloat(Edit9.Text);
acc := SpinEdit1.Value;
smt := 1;
r:= 1;
phi:= DegToRad(StrToFloat(Edit7.Text));
teta:= DegToRad(StrToFloat(Edit8.Text));

//Calculando as Projeções da Diagonal Principal f(phi,teta)

px:=abs((t*sin(phi))*(cos(teta)));    //projeção no eixo x
//Edit3.Text:=FormatFloat('0.00',px);


py:=abs((t*sin(phi))*(sin(teta)));    //projeção no eixo y
//Edit4.Text:=FormatFloat('0.00',py);


pz:=abs(t*cos(phi));                  //projeção no eixo z
//Edit5.Text:=FormatFloat('0.00',pz);


//Calculando a menor projeção diferente de zero


      if (px>0.001) and (px<=py) and (px<=pz) then               //menores números
  wt:=px else
      if (py>0.001) and (py<=px) and (py<=pz) then
  wt:=py else
      if (pz>0.001) and (pz<=py) and (pz<=px) then
  wt:=pz else


      if ((px>0.001) and (px>py) and (px<pz)) or ((px>0.001) and (px<py) and (px>pz)) then    //números intermediários
  wt:=px else
      if ((py>0.001) and (py>px) and (py<pz)) or ((py>0.001) and (py<px) and (py>pz)) then
  wt:=py else
      if ((pz>0.001) and (pz>px) and (pz<py)) or ((pz>0.001) and (pz<px) and (pz>py)) then
  wt:=pz else


     if (px>0.001) and (px>=py) and (px>=pz) then              //números maiores
  wt:=px else
     if (py>0.001) and (py>=px) and (py>=pz) then
  wt:=py else
     if (pz>0.001) and (pz>=py) and (pz>=px) then
  wt:=pz else


wt:=999;                                                      //caso haja erro


     Edit2.Text:=FormatFloat('0.00',wt);                      //wall thickness

     Edit3.Text:=FormatFloat('0.00',acc);                     //Accuracy

     es:=wt/acc;
     Edit4.Text:=FormatFloat('0.00',es);                      //Element Size

     Edit5.Text:=FormatFloat('0.00',smt);                     //Smothing

     Edit6.Text:=FormatFloat('0.00',r);                       //Ratio

     if (TabbedNotebook1.ActivePage='Usuário Avançado') then
     TabbedNotebook1.activepage:='Resultados'
     else
     TabbedNotebook1.activepage:='Results';


     end;


procedure TMESHcalculator.Button2Click(Sender: TObject);



var
 smt, r: Integer;
  t, wt, acc, es, teta, phi, px, py, pz : double;


begin

Edit9.Text:=FormatFloat('0.00',StrToFloat(Edit1.text)); //preechendo espessura da primeira aba
t := StrToFloat(Edit9.Text);
acc := SpinEdit1.Value;
smt := 1;
r:= 1;
phi:= DegToRad(StrToFloat(Edit7.Text));
teta:= DegToRad(StrToFloat(Edit8.Text));


//Calculando as Projeções da Diagonal Principal f(phi,teta)

px:=abs((t*sin(phi))*(cos(teta)));    //projeção no eixo x
//Edit3.Text:=FormatFloat('0.00',px);


py:=abs((t*sin(phi))*(sin(teta)));    //projeção no eixo y
//Edit4.Text:=FormatFloat('0.00',py);


pz:=abs(t*cos(phi));                  //projeção no eixo z
//Edit5.Text:=FormatFloat('0.00',pz);


//Calculando a menor projeção diferente de zero


      if (px>0.001) and (px<=py) and (px<=pz) then               //menores números
  wt:=px else
      if (py>0.001) and (py<=px) and (py<=pz) then
  wt:=py else
      if (pz>0.001) and (pz<=py) and (pz<=px) then
  wt:=pz else


      if ((px>0.001) and (px>py) and (px<pz)) or ((px>0.001) and (px<py) and (px>pz)) then    //números intermediários
  wt:=px else
      if ((py>0.001) and (py>px) and (py<pz)) or ((py>0.001) and (py<px) and (py>pz)) then
  wt:=py else
      if ((pz>0.001) and (pz>px) and (pz<py)) or ((pz>0.001) and (pz<px) and (pz>py)) then
  wt:=pz else


     if (px>0.001) and (px>=py) and (px>=pz) then              //números maiores
  wt:=px else
     if (py>0.001) and (py>=px) and (py>=pz) then
  wt:=py else
     if (pz>0.001) and (pz>=py) and (pz>=px) then
  wt:=pz else


wt:=999;                                                      //caso haja erro


     Edit2.Text:=FormatFloat('0.00',wt);                      //wall thickness

     Edit3.Text:=FormatFloat('0.00',acc);                     //Accuracy

     es:=wt/acc;
     Edit4.Text:=FormatFloat('0.00',es);                      //Element Size

     Edit5.Text:=FormatFloat('0.00',smt);                     //Smothing

     Edit6.Text:=FormatFloat('0.00',r);

     if (TabbedNotebook1.ActivePage='Usuário Típico') then
     TabbedNotebook1.activepage:='Resultados'
     else
     TabbedNotebook1.activepage:='Results';
     end;




procedure TMESHcalculator.Edit1Change(Sender: TObject);
begin
Button2.Visible:=true;
//Button2.setfocus;
end;



end.

