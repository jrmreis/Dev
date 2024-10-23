unit UnitConsWeb;

interface

uses
  Windows, Messages, SysUtils, Variants, Classes, Graphics, Controls, Forms,
  Dialogs, StdCtrls, IdBaseComponent, IdComponent, IdTCPConnection,
  IdTCPClient, IdHTTP, ComCtrls, TabNotBk, ExtCtrls;

type
  TForm1 = class(TForm)
    IdHTTP1: TIdHTTP;
    TabbedNotebook1: TTabbedNotebook;
    RadioGroup1: TRadioGroup;
    CheckBox1: TCheckBox;
    RadioGroup3: TRadioGroup;
    GroupBox1: TGroupBox;
    CheckBox2: TCheckBox;
    Edit12: TEdit;
    CheckBox3: TCheckBox;
    CheckBox4: TCheckBox;
    Edit13: TEdit;
    ComboBox1: TComboBox;
    GroupBox2: TGroupBox;
    Edit14: TEdit;
    Label13: TLabel;
    Edit15: TEdit;
    Label14: TLabel;
    Edit16: TEdit;
    CheckBox5: TCheckBox;
    CheckBox6: TCheckBox;
    CheckBox7: TCheckBox;
    GroupBox3: TGroupBox;
    Label15: TLabel;
    Edit17: TEdit;
    Label16: TLabel;
    Edit18: TEdit;
    RadioGroup4: TRadioGroup;
    Memo1: TMemo;
    GroupBox4: TGroupBox;
    Label17: TLabel;
    ComboBox6: TComboBox;
    Edit19: TEdit;
    Label18: TLabel;
    CheckBox11: TCheckBox;
    Edit20: TEdit;
    Label19: TLabel;
    Label20: TLabel;
    Edit21: TEdit;
    Edit22: TEdit;
    Edit23: TEdit;
    Label21: TLabel;
    Label22: TLabel;
    Edit24: TEdit;
    Edit25: TEdit;
    Edit26: TEdit;
    Edit27: TEdit;
    ComboBox7: TComboBox;
    CheckBox12: TCheckBox;
    CheckBox13: TCheckBox;
    CheckBox14: TCheckBox;
    CheckBox15: TCheckBox;
    ComboBox8: TComboBox;
    Label23: TLabel;
    Edit28: TEdit;
    Label24: TLabel;
    ComboBox9: TComboBox;
    ComboBox10: TComboBox;
    CheckBox16: TCheckBox;
    CheckBox17: TCheckBox;
    ComboBox12: TComboBox;
    CheckBox18: TCheckBox;
    GroupBox5: TGroupBox;
    ComboBox13: TComboBox;
    RadioButton1: TRadioButton;
    RadioButton2: TRadioButton;
    Label27: TLabel;
    Edit30: TEdit;
    Label28: TLabel;
    Edit31: TEdit;
    Label29: TLabel;
    Edit32: TEdit;
    Edit33: TEdit;
    CheckBox19: TCheckBox;
    CheckBox20: TCheckBox;
    GroupBox6: TGroupBox;
    ComboBox3: TComboBox;
    ComboBox4: TComboBox;
    ComboBox2: TComboBox;
    ComboBox5: TComboBox;
    CheckBox8: TCheckBox;
    CheckBox9: TCheckBox;
    CheckBox10: TCheckBox;
    GroupBox7: TGroupBox;
    CheckBox21: TCheckBox;
    CheckBox22: TCheckBox;
    CheckBox23: TCheckBox;
    GroupBox8: TGroupBox;
    RadioButton3: TRadioButton;
    RadioButton4: TRadioButton;
    RadioButton5: TRadioButton;
    Edit39: TEdit;
    GroupBox9: TGroupBox;
    Label1: TLabel;
    Label2: TLabel;
    Label6: TLabel;
    Label7: TLabel;
    Edit1: TEdit;
    Button1: TButton;
    Edit2: TEdit;
    Edit6: TEdit;
    Edit7: TEdit;
    Label3: TLabel;
    Edit3: TEdit;
    Label4: TLabel;
    Edit4: TEdit;
    Label5: TLabel;
    Edit5: TEdit;
    GroupBox10: TGroupBox;
    Label8: TLabel;
    Edit8: TEdit;
    Label10: TLabel;
    Edit10: TEdit;
    Label31: TLabel;
    Edit42: TEdit;
    ComboBox11: TComboBox;
    ComboBox14: TComboBox;
    ComboBox15: TComboBox;
    ComboBox16: TComboBox;
    Edit34: TEdit;
    Edit35: TEdit;
    CheckBox24: TCheckBox;
    CheckBox25: TCheckBox;
    GroupBox11: TGroupBox;
    GroupBox12: TGroupBox;
    Label35: TLabel;
    Edit37: TEdit;
    Label36: TLabel;
    Label37: TLabel;
    Edit45: TEdit;
    Label38: TLabel;
    GroupBox13: TGroupBox;
    Label34: TLabel;
    Label39: TLabel;
    Edit36: TEdit;
    Label40: TLabel;
    Edit46: TEdit;
    Label41: TLabel;
    Edit47: TEdit;
    Label42: TLabel;
    Edit48: TEdit;
    Label43: TLabel;
    Edit49: TEdit;
    Edit50: TEdit;
    Edit51: TEdit;
    GroupBox14: TGroupBox;
    Label44: TLabel;
    ComboBox17: TComboBox;
    Label45: TLabel;
    Label46: TLabel;
    Edit52: TEdit;
    Label47: TLabel;
    Label48: TLabel;
    Edit53: TEdit;
    Edit54: TEdit;
    Edit55: TEdit;
    Edit56: TEdit;
    Label49: TLabel;
    Edit57: TEdit;
    Edit58: TEdit;
    Edit59: TEdit;
    Label50: TLabel;
    Edit60: TEdit;
    Edit61: TEdit;
    Edit62: TEdit;
    Label51: TLabel;
    Edit63: TEdit;
    Edit64: TEdit;
    Edit65: TEdit;
    Label52: TLabel;
    Edit66: TEdit;
    Edit67: TEdit;
    Edit68: TEdit;
    Label53: TLabel;
    Edit69: TEdit;
    Edit70: TEdit;
    Edit71: TEdit;
    Label54: TLabel;
    Label55: TLabel;
    Edit72: TEdit;
    Edit73: TEdit;
    Label56: TLabel;
    Edit74: TEdit;
    Edit75: TEdit;
    Edit76: TEdit;
    Edit77: TEdit;
    Edit78: TEdit;
    Label57: TLabel;
    Edit79: TEdit;
    Label58: TLabel;
    Edit80: TEdit;
    GroupBox15: TGroupBox;
    Button2: TButton;
    LabeledEdit1: TLabeledEdit;
    LabeledEdit2: TLabeledEdit;
    LabeledEdit3: TLabeledEdit;
    Memo2: TMemo;
    CheckBox26: TCheckBox;
    Edit44: TEdit;
    Edit38: TEdit;
    Edit9: TEdit;
    Label9: TLabel;
    Label11: TLabel;
    Label12: TLabel;
    Edit11: TEdit;
    Edit29: TEdit;
    Label25: TLabel;
    Edit40: TEdit;
    Edit41: TEdit;
    ComboBox18: TComboBox;
    ComboBox19: TComboBox;
    CheckBox27: TCheckBox;
    CheckBox28: TCheckBox;
    CheckBox29: TCheckBox;
    ComboBox20: TComboBox;
    LabeledEdit4: TLabeledEdit;
    Label26: TLabel;
    Edit43: TEdit;
    Label30: TLabel;
    Edit81: TEdit;
    procedure Button1Click(Sender: TObject);
    procedure RadioGroup4Click(Sender: TObject);
    procedure ComboBox1Change(Sender: TObject);
    procedure Label15Click(Sender: TObject);
    procedure Label28Click(Sender: TObject);

   






  private
    { Private declarations }
  public
    { Public declarations }
  end;

var
  Form1: TForm1;

implementation

{$R *.dfm}

procedure TForm1.Button1Click(Sender: TObject);
var
  lodados: TStringList;
begin
  //Cria-se uma string List
  lodados:=TStringList.Create;
  //Nesta linha busca-se a informação através da url indicada
  //StrinReplace eh utilizada para substituir os caracteres & por CR
  //UrlDecode eh para eliminar caracteres de código html para acentos
  //&formato=query_string ou xml javascript
  //ele retorna para o componente em qualquer um dos formatos acima
  //Mais detalhes entre na pagina http://republicavirtual.com.br

   lodados.text:=stringreplace(idhttp1.URL.URLDecode(idhttp1.Get('http://republicavirtual.com.br/web_cep.php?cep='+edit1.text+'&formato=query_string')),'&',#13#10,[rfreplaceAll]);
  //lodados vira uma matriz e fazemos o acesso aos dados...
  edit2.text:=lodados.Values['TIPO_LOGRADOURO']+' '+lodados.Values['LOGRADOURO'];
  edit3.text:=lodados.Values['BAIRRO'];
  edit4.text:=lodados.Values['CIDADE'];
  edit5.text:=lodados.Values['UF']
  //acredito que ficou bem mais simples dessa forma consultar a rua pelo cep
  //Obrigado
end;



//Leia mais em: Consultando um endereço pelo cep usando delphi 7 sem consumir webservice, usando o componente idhttp da paleta Indy Clients... http://www.devmedia.com.br/consultando-um-endereco-pelo-cep-usando-delphi-7-sem-consumir-webservice-usando-o-componente-idhttp-da-paleta-indy-clients-/7823#ixzz1y54mnlnw



procedure TForm1.RadioGroup4Click(Sender: TObject);
begin

Case RadioGroup4.ItemIndex of

0: begin
     ComboBox2.visible := True;
     ComboBox3.visible := False;
     ComboBox4.visible := False;
     end;

1: begin
     ComboBox2.visible := False;
     ComboBox3.visible := True;
     ComboBox4.visible := False;
     end;

2: begin
     ComboBox2.visible := False;
     ComboBox3.visible := False;
     ComboBox4.visible := True;
     end;

end;

end;

procedure TForm1.ComboBox1Change(Sender: TObject);
var
T_peca: String;

begin

T_peca:=combobox1.text;

if (T_peca = 'Barras')
   then begin
   Label11.visible:=True;  //1.Label
   Label13.visible:=True;  //2.Label
   Label14.visible:=True; //3.Label
   Label11.caption:='Diâmetro';  //1.Label
   Label13.caption:='Comprimento';  //2.Label
   Label14.visible:=False; //3.Label
   Edit16.visible:=False;   //3.edit
   CheckBox7.visible:=False; //3.checkbox
   Edit14.Visible:=True;    //1.edit
   CheckBox5.Visible:=True; //1.checkbox
   Edit15.Visible:=True;    //2.edit
   CheckBox6.Visible:=True; //2.checkbox


     end;

if (T_peca = 'Chapas')
   then begin
   Label11.visible:=True;  //1.Label
   Label13.visible:=True;  //2.Label
   Label14.visible:=True; //3.Label
   Label11.caption:='Espessura';  //1.Label
   Label13.caption:='Largura';  //2.Label
   Label14.caption:='Comprimento'; //3.Label
   Edit16.visible:=True;   //3.edit
   CheckBox7.visible:=True; //3.checkbox
   Edit14.Visible:=True;    //1.edit
   CheckBox5.Visible:=True; //1.checkbox
   Edit15.Visible:=True;    //2.edit
   CheckBox6.Visible:=True; //2.checkbox

     end;

if (T_peca = 'Peças Seriadas')
   then begin
   Label11.visible:=True;  //diâmetro
   Label11.caption:='Peso por Peça (kg)';
   Label13.visible:=False;  //comprimento
   Label14.visible:=False; //largura
   Edit16.visible:=False;   //3.edit
   CheckBox7.visible:=False; //3.checkbox
   Edit14.Visible:=True;    //1.edit
   CheckBox5.Visible:=False; //1.checkbox
   Edit15.Visible:=False;    //2.edit
   CheckBox6.Visible:=False; //2.checkbox

   end;

if (T_peca = 'Estruturas Soldadas')
   then begin
   Label11.visible:=True;  //1.Label
   Label13.visible:=True;  //2.Label
   Label14.visible:=True; //3.Label
   Label11.caption:='Altura';  //1.label
   Label13.caption:='Largura';  //2.label
   Label14.caption:='Comprimento'; //3.label
   Edit16.visible:=True;   //3.edit
   CheckBox7.visible:=True; //3.checkbox
   Edit14.Visible:=True;    //1.edit
   CheckBox5.Visible:=True; //1.checkbox
   Edit15.Visible:=True;    //2.edit
   CheckBox6.Visible:=True; //2.checkbox



end;

if (T_peca = 'Tubos')
   then begin
   Label11.visible:=True;  //1.Label
   Label13.visible:=True;  //2.Label
   Label14.visible:=True; //3.Label
   Label11.caption:='Diâmetro Externo';  //1.label
   Label13.caption:='Diâmetro Interno';  //2.label
   Label14.caption:='Comprimento'; //3.label
   Edit16.visible:=True;   //3.edit
   CheckBox7.visible:=True; //3.checkbox
   Edit14.Visible:=True;    //1.edit
   CheckBox5.Visible:=True; //1.checkbox
   Edit15.Visible:=True;    //2.edit
   CheckBox6.Visible:=True; //2.checkbox



end;

  end;
procedure TForm1.Label15Click(Sender: TObject);
var
P_peca, v1, v2, v3: Double;
T_peca: String;

begin

T_peca:=combobox1.text;
If (T_peca = 'Barras')
   then If CheckBox5.Checked and CheckBox6.checked
      then begin
      v1:= StrToFloat (Edit14.text);
      v2:= StrToFloat (Edit15.text);
      P_peca:= pi*(((v1*25.4)/2)*((v1*25.4)/2))*v2*0.00000786*25.4;
      Edit17.Text:=FloatToStr(Round(P_peca));
      end
      else If CheckBox5.Checked
      then begin
      v1:= StrToFloat (Edit14.text);
      v2:= StrToFloat (Edit15.text);
      P_peca:= pi*(((v1*25.4)/2)*((v1*25.4)/2))*v2*0.00000786;
      Edit17.Text:=FloatToStr(Round(P_peca));
      end
      else If CheckBox6.Checked
      then begin
      v1:= StrToFloat (Edit14.text);
      v2:= StrToFloat (Edit15.text);
      P_peca:= pi*((v1/2)*(v1/2))*v2*0.00000786*25.4;
      Edit17.Text:=FloatToStr(Round(P_peca));
      end
      else
      begin
      v1:= StrToFloat (Edit14.text);
      v2:= StrToFloat (Edit15.text);
      P_peca:= pi*((v1/2)*(v1/2))*v2*0.00000786;
      Edit17.Text:=FloatToStr(Round(P_peca));
      end ;

If (T_peca = 'Chapas')
   then If CheckBox5.Checked and CheckBox6.checked and CheckBox7.Checked
      then begin
      v1:= StrToFloat (Edit14.text);
      v2:= StrToFloat (Edit15.text);
      v3:= StrToFloat (Edit16.text);
      P_peca:=(v1*25.4)*(v2*25.4)*(v3*25.4)*0.00000786;
      Edit17.Text:=FloatToStr(Round(P_peca));
      end
      else If CheckBox5.Checked and CheckBox6.Checked
      then begin
      v1:= StrToFloat (Edit14.text);
      v2:= StrToFloat (Edit15.text);
      v3:= StrToFloat (Edit16.text);
      P_peca:=(v1*25.4)*(v2*25.4)*(v3)*0.00000786;
      Edit17.Text:=FloatToStr(Round(P_peca));
      end
      else If CheckBox5.Checked
      then begin
      v1:= StrToFloat (Edit14.text);
      v2:= StrToFloat (Edit15.text);
      v3:= StrToFloat (Edit16.text);
      P_peca:=(v1*25.4)*(v2)*(v3)*0.00000786;
      Edit17.Text:=FloatToStr(Round(P_peca));
      end
      else If CheckBox6.Checked and CheckBox7.Checked
      then begin
      v1:= StrToFloat (Edit14.text);
      v2:= StrToFloat (Edit15.text);
      v3:= StrToFloat (Edit16.text);
      P_peca:=(v1)*(v2*25.4)*(v3*25.4)*0.00000786;
      Edit17.Text:=FloatToStr(Round(P_peca));
      end
      else If CheckBox6.Checked
      then begin
      v1:= StrToFloat (Edit14.text);
      v2:= StrToFloat (Edit15.text);
      v3:= StrToFloat (Edit16.text);
      P_peca:=(v1)*(v2*25.4)*(v3)*0.00000786;
      Edit17.Text:=FloatToStr(Round(P_peca));
      end
      else If CheckBox7.Checked
      then begin
      v1:= StrToFloat (Edit14.text);
      v2:= StrToFloat (Edit15.text);
      v3:= StrToFloat (Edit16.text);
      P_peca:=(v1)*(v2)*(v3*25.4)*0.00000786;
      Edit17.Text:=FloatToStr(Round(P_peca));
      end
      else
      begin
      v1:= StrToFloat (Edit14.text);
      v2:= StrToFloat (Edit15.text);
      v3:= StrToFloat (Edit16.text);
      P_peca:=(v1)*(v2)*(v3)*0.00000786;
      Edit17.Text:=FloatToStr(Round(P_peca));

   end;

If (T_peca = 'Estruturas Soldadas')
   then If CheckBox5.Checked and CheckBox6.checked and CheckBox7.Checked
      then begin
      v1:= StrToFloat (Edit14.text);
      v2:= StrToFloat (Edit15.text);
      v3:= StrToFloat (Edit16.text);
      P_peca:=(((v1*25.4)*(v2*25.4)*(v3*25.4))-(((v1*25.4)-25.4)*((v2*25.4)-25.4)*((v3*25.4)-25.4)))*0.00000786;
      Edit17.Text:=FloatToStr(Round(P_peca));
      end
      else If CheckBox5.Checked and CheckBox6.Checked
      then begin
      v1:= StrToFloat (Edit14.text);
      v2:= StrToFloat (Edit15.text);
      v3:= StrToFloat (Edit16.text);
      P_peca:=(((v1*25.4)*(v2*25.4)*(v3))-(((v1*25.4)-25.4)*((v2*25.4)-25.4)*((v3)-25.4)))*0.00000786;
      Edit17.Text:=FloatToStr(Round(P_peca));
      end
      else If CheckBox5.Checked
      then begin
      v1:= StrToFloat (Edit14.text);
      v2:= StrToFloat (Edit15.text);
      v3:= StrToFloat (Edit16.text);
      P_peca:=(((v1*25.4)*(v2)*(v3))-(((v1*25.4)-25.4)*((v2)-25.4)*((v3)-25.4)))*0.00000786;
      Edit17.Text:=FloatToStr(Round(P_peca));
      end
      else If CheckBox6.Checked and CheckBox7.Checked
      then begin
      v1:= StrToFloat (Edit14.text);
      v2:= StrToFloat (Edit15.text);
      v3:= StrToFloat (Edit16.text);
      P_peca:=(((v1)*(v2*25.4)*(v3*25.4))-(((v1)-25.4)*((v2*25.4)-25.4)*((v3*25.4)-25.4)))*0.00000786;
      Edit17.Text:=FloatToStr(Round(P_peca));
      end
      else If CheckBox6.Checked
      then begin
      v1:= StrToFloat (Edit14.text);
      v2:= StrToFloat (Edit15.text);
      v3:= StrToFloat (Edit16.text);
      P_peca:=(((v1)*(v2*25.4)*(v3))-(((v1)-25.4)*((v2*25.4)-25.4)*((v3)-25.4)))*0.00000786;
      Edit17.Text:=FloatToStr(Round(P_peca));
      end
      else If CheckBox7.Checked
      then begin
      v1:= StrToFloat (Edit14.text);
      v2:= StrToFloat (Edit15.text);
      v3:= StrToFloat (Edit16.text);
      P_peca:=(((v1)*(v2)*(v3*25.4))-(((v1)-25.4)*((v2)-25.4)*((v3*25.4)-25.4)))*0.00000786;
      Edit17.Text:=FloatToStr(Round(P_peca));
      end
      else
      begin
      v1:= StrToFloat (Edit14.text);
      v2:= StrToFloat (Edit15.text);
      v3:= StrToFloat (Edit16.text);
      P_peca:=(((v1)*(v2)*(v3))-(((v1)-25.4)*((v2)-25.4)*((v3)-25.4)))*0.00000786;
      Edit17.Text:=FloatToStr(Round(P_peca));
   end;

If (T_peca = 'Tubos')
   then If CheckBox5.Checked and CheckBox6.Checked and CheckBox7.Checked
      then begin
      v1:= StrToFloat (Edit14.text);
      v2:= StrToFloat (Edit15.text);
      v3:= StrToFloat (Edit16.text);
      P_peca:= ((pi*(((v1*25.4)/2)*((v1*25.4)/2)))-(pi*(((v2*25.4)/2)*((v2*25.4)/2))))*v3*0.00000786*25.4;
      Edit17.Text:=FloatToStr(Round(P_peca));
      end
      else If CheckBox5.Checked and CheckBox6.Checked
      then begin
      v1:= StrToFloat (Edit14.text);
      v2:= StrToFloat (Edit15.text);
      v3:= StrToFloat (Edit16.text);
      P_peca:= ((pi*(((v1*25.4)/2)*((v1*25.4)/2)))-(pi*(((v2*25.4)/2)*((v2*25.4)/2))))*v3*0.00000786;
      Edit17.Text:=FloatToStr(Round(P_peca));
      end
      else If CheckBox5.Checked
      then begin
      v1:= StrToFloat (Edit14.text);
      v2:= StrToFloat (Edit15.text);
      v3:= StrToFloat (Edit16.text);
      P_peca:= ((pi*(((v1*25.4)/2)*((v1*25.4)/2)))-(pi*(((v2)/2)*((v2)/2))))*v3*0.00000786;
      Edit17.Text:=FloatToStr(Round(P_peca));
      end
      else If CheckBox6.Checked and CheckBox7.Checked
      then begin
      v1:= StrToFloat (Edit14.text);
      v2:= StrToFloat (Edit15.text);
      v3:= StrToFloat (Edit16.text);
      P_peca:= ((pi*(((v1)/2)*((v1)/2)))-(pi*(((v2*25.4)/2)*((v2*25.4)/2))))*v3*0.00000786*25.4;
      Edit17.Text:=FloatToStr(Round(P_peca));
      end
      else If CheckBox6.Checked
      then begin
      v1:= StrToFloat (Edit14.text);
      v2:= StrToFloat (Edit15.text);
      v3:= StrToFloat (Edit16.text);
      P_peca:= ((pi*(((v1)/2)*((v1)/2)))-(pi*(((v2*25.4)/2)*((v2*25.4)/2))))*v3*0.00000786;
      Edit17.Text:=FloatToStr(Round(P_peca));
      end
      else If CheckBox7.Checked
      then begin
      v1:= StrToFloat (Edit14.text);
      v2:= StrToFloat (Edit15.text);
      v3:= StrToFloat (Edit16.text);
      P_peca:= ((pi*(((v1)/2)*((v1)/2)))-(pi*(((v2)/2)*((v2)/2))))*v3*0.00000786*25.4;
      Edit17.Text:=FloatToStr(Round(P_peca));
      end
      else
      begin
      v1:= StrToFloat (Edit14.text);
      v2:= StrToFloat (Edit15.text);
      v3:= StrToFloat (Edit16.text);
      P_peca:= ((pi*(((v1)/2)*((v1)/2)))-(pi*(((v2)/2)*((v2)/2))))*v3*0.00000786;
      Edit17.Text:=FloatToStr(Round(P_peca));
      end;

If (T_peca = 'Peças Seriadas')
      then
      Edit17.Text:=(Edit14.text);

      end;


procedure TForm1.Label28Click(Sender: TObject);
var
G_red, D_ling, D_barra: double;
T_ling: string;

begin
T_ling:=comboBox13.text;
    If RadioButton1.Checked and ((T_ling='Lingotamento Convencional')or(T_ling='Lingotamento Contínuo'))
        then begin
        If
        CheckBox5.Checked and
        CheckBox29.Checked
        then begin
        D_ling:=StrToFloat(Edit30.text);
        D_barra:=StrToFloat(Edit14.text);
        G_red:=((D_ling*25.4)*(D_ling*25.4))/(pi*((D_barra*25.4)/2)*((D_barra*25.4)/2));
        Edit31.Text:=FloatToStr(Round(G_red))+(':1');
        end
        else If
        CheckBox5.Checked
        then begin
        D_ling:=StrToFloat(Edit30.text);
        D_barra:=StrToFloat(Edit14.text);
        G_red:=((D_ling)*(D_ling))/(pi*((D_barra*25.4)/2)*((D_barra*25.4)/2));
        Edit31.Text:=FloatToStr(Round(G_red))+(':1');
        end
        else If
        CheckBox29.Checked
        then begin
        D_ling:=StrToFloat(Edit30.text);
        D_barra:=StrToFloat(Edit14.text);
        G_red:=((D_ling*25.4)*(D_ling*25.4))/(pi*((D_barra)/2)*((D_barra)/2));
        Edit31.Text:=FloatToStr(Round(G_red))+(':1');
        end
        else 
         begin
        D_ling:=StrToFloat(Edit30.text);
        D_barra:=StrToFloat(Edit14.text);
        G_red:=((D_ling)*(D_ling))/(pi*((D_barra)/2)*((D_barra)/2));
        Edit31.Text:=FloatToStr(Round(G_red))+(':1');

        end;
    end
else if RadioButton2.Checked and ((T_ling='Lingotamento Convencional')or(T_ling='Lingotamento Contínuo'))
        then begin
        If CheckBox5.Checked and
        CheckBox29.Checked
        then begin
        D_ling:=StrToFloat(Edit30.text);
        D_barra:=StrToFloat(Edit14.text);
        G_red:=(pi*((D_ling*25.4)/2)*((D_ling*25.4)/2))/(pi*((D_barra*25.4)/2)*((D_barra*25.4)/2));
        Edit31.Text:=FloatToStr(Round(G_red))+(':1');
        end
        else If
        CheckBox5.Checked
        then begin
        D_ling:=StrToFloat(Edit30.text);
        D_barra:=StrToFloat(Edit14.text);
        G_red:=(pi*((D_ling)/2)*((D_ling)/2))/(pi*((D_barra*25.4)/2)*((D_barra*25.4)/2));
        Edit31.Text:=FloatToStr(Round(G_red))+(':1');
        end

        else If
        CheckBox29.Checked
        then begin
        D_ling:=StrToFloat(Edit30.text);
        D_barra:=StrToFloat(Edit14.text);
        G_red:=(pi*((D_ling*25.4)/2)*((D_ling*25.4)/2))/(pi*((D_barra)/2)*((D_barra)/2));
        Edit31.Text:=FloatToStr(Round(G_red))+(':1');
        end
        
        else
        begin
        D_ling:=StrToFloat(Edit30.text);
        D_barra:=StrToFloat(Edit14.text);
        G_red:=(pi*((D_ling)/2)*((D_ling)/2))/(pi*((D_barra)/2)*((D_barra)/2));
        Edit31.Text:=FloatToStr(Round(G_red))+(':1');
        end
     end;

end;



end.
