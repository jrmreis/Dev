object Form1: TForm1
  Left = 216
  Top = 15
  Width = 808
  Height = 711
  Caption = 'Planilha de Consulta - Joel Reis'
  Color = clBtnFace
  Font.Charset = DEFAULT_CHARSET
  Font.Color = clWindowText
  Font.Height = -11
  Font.Name = 'MS Sans Serif'
  Font.Style = []
  OldCreateOrder = False
  PixelsPerInch = 96
  TextHeight = 13
  object TabbedNotebook1: TTabbedNotebook
    Left = 16
    Top = 8
    Width = 769
    Height = 657
    TabFont.Charset = DEFAULT_CHARSET
    TabFont.Color = clBtnText
    TabFont.Height = -11
    TabFont.Name = 'MS Sans Serif'
    TabFont.Style = []
    TabOrder = 0
    object TTabPage
      Left = 4
      Top = 24
      Caption = 'Cadastro'
      object RadioGroup1: TRadioGroup
        Left = 48
        Top = 480
        Width = 105
        Height = 129
        Caption = 'Transporte'
        Items.Strings = (
          'Maxitrate'
          'Cliente'
          'A combinar')
        TabOrder = 0
      end
      object CheckBox1: TCheckBox
        Left = 64
        Top = 8
        Width = 97
        Height = 17
        Caption = 'Cliente Novo'
        TabOrder = 1
      end
      object RadioGroup3: TRadioGroup
        Left = 352
        Top = 480
        Width = 169
        Height = 129
        Caption = 'Ramo de Atividade'
        Items.Strings = (
          'Automotivo'
          #211'leo e G'#225's'
          'Sucro Alcooleiro'
          'M'#225'quinas e Equipamentos')
        TabOrder = 2
      end
      object GroupBox1: TGroupBox
        Left = 536
        Top = 480
        Width = 169
        Height = 129
        Caption = 'Cond. Comerciais'
        TabOrder = 3
        object CheckBox2: TCheckBox
          Left = 8
          Top = 24
          Width = 105
          Height = 17
          Hint = 'Aplic'#225'vel para pgto faturado.'
          Caption = 'Ad. C.Financeiro'
          ParentShowHint = False
          ShowHint = True
          TabOrder = 0
        end
        object Edit12: TEdit
          Left = 112
          Top = 24
          Width = 41
          Height = 21
          TabOrder = 1
          Text = '%'
        end
        object CheckBox3: TCheckBox
          Left = 8
          Top = 48
          Width = 153
          Height = 17
          Hint = 'Aplic'#225'vel para item com carga inferior '#224' carga m'#237'nima.'
          Caption = 'Cobran'#231'a de O.S. m'#237'nima'
          ParentShowHint = False
          ShowHint = True
          TabOrder = 2
        end
        object CheckBox4: TCheckBox
          Left = 8
          Top = 96
          Width = 97
          Height = 17
          Caption = 'Prazo Especial'
          TabOrder = 3
        end
        object Edit13: TEdit
          Left = 112
          Top = 96
          Width = 41
          Height = 21
          TabOrder = 4
          Text = 'Dias'
        end
        object CheckBox26: TCheckBox
          Left = 8
          Top = 72
          Width = 145
          Height = 17
          Hint = 
            'Taxa aplic'#225'vel para NF do Cliente que contenha mais de 1 O.S. m'#237 +
            'nima.'
          Caption = 'Cobran'#231'a de N.F. m'#237'nima'
          ParentShowHint = False
          ShowHint = True
          TabOrder = 5
        end
      end
      object GroupBox8: TGroupBox
        Left = 160
        Top = 480
        Width = 185
        Height = 129
        Caption = 'Como chegou '#224' Maxitrate?'
        TabOrder = 4
        object RadioButton3: TRadioButton
          Left = 16
          Top = 24
          Width = 113
          Height = 17
          Caption = 'Site'
          TabOrder = 0
        end
        object RadioButton4: TRadioButton
          Left = 16
          Top = 48
          Width = 113
          Height = 17
          Caption = 'Propaganda'
          TabOrder = 1
        end
        object RadioButton5: TRadioButton
          Left = 16
          Top = 72
          Width = 73
          Height = 17
          Caption = 'Indica'#231#227'o'
          TabOrder = 2
        end
        object Edit39: TEdit
          Left = 88
          Top = 68
          Width = 81
          Height = 21
          TabOrder = 3
        end
      end
      object GroupBox9: TGroupBox
        Left = 48
        Top = 328
        Width = 657
        Height = 145
        Caption = 'Endere'#231'o'
        TabOrder = 5
        object Label1: TLabel
          Left = 44
          Top = 28
          Width = 19
          Height = 13
          Caption = 'Cep'
        end
        object Label2: TLabel
          Left = 8
          Top = 68
          Width = 54
          Height = 13
          Caption = 'Logradouro'
        end
        object Label6: TLabel
          Left = 328
          Top = 68
          Width = 37
          Height = 13
          Caption = 'N'#250'mero'
        end
        object Label7: TLabel
          Left = 440
          Top = 68
          Width = 29
          Height = 13
          Caption = 'Compl'
        end
        object Label3: TLabel
          Left = 32
          Top = 100
          Width = 27
          Height = 13
          Caption = 'Bairro'
        end
        object Label4: TLabel
          Left = 208
          Top = 100
          Width = 33
          Height = 13
          Caption = 'Cidade'
        end
        object Label5: TLabel
          Left = 400
          Top = 100
          Width = 33
          Height = 13
          Caption = 'Estado'
        end
        object Edit1: TEdit
          Left = 72
          Top = 28
          Width = 121
          Height = 21
          TabOrder = 0
          Text = 'Apenas N'#250'meros'
        end
        object Button1: TButton
          Left = 208
          Top = 24
          Width = 75
          Height = 25
          Caption = 'Consutar'
          TabOrder = 1
          OnClick = Button1Click
        end
        object Edit2: TEdit
          Left = 72
          Top = 68
          Width = 249
          Height = 21
          TabOrder = 2
        end
        object Edit6: TEdit
          Left = 368
          Top = 68
          Width = 57
          Height = 21
          TabOrder = 3
        end
        object Edit7: TEdit
          Left = 480
          Top = 68
          Width = 57
          Height = 21
          TabOrder = 4
        end
        object Edit3: TEdit
          Left = 72
          Top = 100
          Width = 121
          Height = 21
          TabOrder = 5
        end
        object Edit4: TEdit
          Left = 248
          Top = 100
          Width = 121
          Height = 21
          TabOrder = 6
        end
        object Edit5: TEdit
          Left = 440
          Top = 100
          Width = 41
          Height = 21
          TabOrder = 7
        end
      end
      object GroupBox10: TGroupBox
        Left = 48
        Top = 32
        Width = 657
        Height = 89
        Caption = 'Dados do Cliente'
        TabOrder = 6
        object Label8: TLabel
          Left = 16
          Top = 24
          Width = 41
          Height = 13
          Caption = 'Empresa'
        end
        object Label10: TLabel
          Left = 320
          Top = 24
          Width = 91
          Height = 13
          Caption = 'Telefone Comercial'
        end
        object Label31: TLabel
          Left = 528
          Top = 24
          Width = 17
          Height = 13
          Caption = 'Fax'
        end
        object Label26: TLabel
          Left = 40
          Top = 56
          Width = 22
          Height = 13
          Caption = 'CGC'
        end
        object Label30: TLabel
          Left = 280
          Top = 56
          Width = 16
          Height = 13
          Caption = 'I.E.'
        end
        object Edit8: TEdit
          Left = 72
          Top = 24
          Width = 225
          Height = 21
          TabOrder = 0
        end
        object Edit10: TEdit
          Left = 424
          Top = 24
          Width = 89
          Height = 21
          TabOrder = 1
        end
        object Edit42: TEdit
          Left = 552
          Top = 24
          Width = 89
          Height = 21
          TabOrder = 2
        end
        object Edit43: TEdit
          Left = 72
          Top = 56
          Width = 137
          Height = 21
          TabOrder = 3
        end
        object Edit81: TEdit
          Left = 304
          Top = 56
          Width = 121
          Height = 21
          TabOrder = 4
        end
      end
      object GroupBox15: TGroupBox
        Left = 48
        Top = 120
        Width = 657
        Height = 201
        Caption = 'Contato(s)'
        TabOrder = 7
        object Button2: TButton
          Left = 16
          Top = 158
          Width = 257
          Height = 27
          Caption = 'Adicionar'
          TabOrder = 0
        end
        object LabeledEdit1: TLabeledEdit
          Left = 16
          Top = 40
          Width = 121
          Height = 21
          EditLabel.Width = 28
          EditLabel.Height = 13
          EditLabel.Caption = 'Nome'
          TabOrder = 1
        end
        object LabeledEdit2: TLabeledEdit
          Left = 16
          Top = 80
          Width = 257
          Height = 21
          EditLabel.Width = 28
          EditLabel.Height = 13
          EditLabel.Caption = 'E-mail'
          TabOrder = 2
        end
        object LabeledEdit3: TLabeledEdit
          Left = 152
          Top = 40
          Width = 121
          Height = 21
          EditLabel.Width = 67
          EditLabel.Height = 13
          EditLabel.Caption = 'Departamento'
          TabOrder = 3
        end
        object Memo2: TMemo
          Left = 304
          Top = 24
          Width = 329
          Height = 161
          Lines.Strings = (
            'Memo2')
          TabOrder = 4
        end
        object ComboBox20: TComboBox
          Left = 160
          Top = 120
          Width = 113
          Height = 21
          ItemHeight = 13
          TabOrder = 5
          Text = 'Sel. Tipo Tel.'
          Items.Strings = (
            'Telefone Direto'
            'Ramal'
            'Celular'
            'Id Nextel'
            'Tel. Particular')
        end
        object LabeledEdit4: TLabeledEdit
          Left = 16
          Top = 120
          Width = 121
          Height = 21
          EditLabel.Width = 97
          EditLabel.Height = 13
          EditLabel.Caption = 'N'#250'mero de Telefone'
          TabOrder = 6
        end
      end
    end
    object TTabPage
      Left = 4
      Top = 24
      HelpContext = 1
      Caption = 'Consulta'
      object ComboBox1: TComboBox
        Left = 8
        Top = 8
        Width = 129
        Height = 21
        ItemHeight = 13
        TabOrder = 0
        Text = 'Tipo de Pe'#231'a'
        OnChange = ComboBox1Change
        Items.Strings = (
          'Barras'
          'Chapas'
          'Estruturas Soldadas'
          'Pe'#231'as Seriadas'
          'Tubos')
      end
      object GroupBox2: TGroupBox
        Left = 8
        Top = 280
        Width = 297
        Height = 105
        Caption = 'Dimens'#245'es (mm)'
        TabOrder = 1
        object Label13: TLabel
          Left = 8
          Top = 48
          Width = 61
          Height = 13
          Caption = 'Comprimento'
        end
        object Label14: TLabel
          Left = 8
          Top = 72
          Width = 36
          Height = 13
          Caption = 'Largura'
        end
        object Label11: TLabel
          Left = 8
          Top = 24
          Width = 49
          Height = 13
          Caption = 'Espessura'
        end
        object Edit14: TEdit
          Left = 104
          Top = 24
          Width = 73
          Height = 21
          TabOrder = 0
        end
        object Edit15: TEdit
          Left = 104
          Top = 48
          Width = 73
          Height = 21
          TabOrder = 1
        end
        object Edit16: TEdit
          Left = 104
          Top = 72
          Width = 73
          Height = 21
          TabOrder = 2
        end
        object CheckBox5: TCheckBox
          Left = 192
          Top = 24
          Width = 81
          Height = 17
          Caption = 'Polegadas'
          TabOrder = 3
        end
        object CheckBox6: TCheckBox
          Left = 192
          Top = 48
          Width = 81
          Height = 17
          Caption = 'Polegadas'
          TabOrder = 4
        end
        object CheckBox7: TCheckBox
          Left = 192
          Top = 72
          Width = 81
          Height = 17
          Caption = 'Polegadas'
          TabOrder = 5
        end
      end
      object GroupBox3: TGroupBox
        Left = 320
        Top = 424
        Width = 169
        Height = 129
        Caption = 'Estimativas'
        TabOrder = 2
        object Label15: TLabel
          Left = 8
          Top = 24
          Width = 91
          Height = 13
          Hint = 'Click para calcular o peso.'
          Caption = 'Peso por Pe'#231'a (kg)'
          ParentShowHint = False
          ShowHint = True
          OnClick = Label15Click
        end
        object Label16: TLabel
          Left = 8
          Top = 48
          Width = 67
          Height = 13
          Caption = 'Qtd. p'#231's./m'#234's'
        end
        object Label23: TLabel
          Left = 8
          Top = 96
          Width = 27
          Height = 13
          Caption = 'Prazo'
        end
        object Label29: TLabel
          Left = 8
          Top = 72
          Width = 79
          Height = 13
          Caption = 'Peso Total (Ton)'
        end
        object Edit17: TEdit
          Left = 104
          Top = 24
          Width = 57
          Height = 21
          TabOrder = 0
        end
        object Edit18: TEdit
          Left = 104
          Top = 48
          Width = 57
          Height = 21
          TabOrder = 1
        end
        object Edit28: TEdit
          Left = 104
          Top = 96
          Width = 57
          Height = 21
          TabOrder = 2
        end
        object Edit32: TEdit
          Left = 104
          Top = 72
          Width = 57
          Height = 21
          TabOrder = 3
        end
      end
      object RadioGroup4: TRadioGroup
        Left = 8
        Top = 40
        Width = 137
        Height = 73
        Caption = 'Material'
        Items.Strings = (
          'A'#231'o'
          'Ferro Fundido (FoFo)'
          'Inox')
        TabOrder = 3
        OnClick = RadioGroup4Click
      end
      object GroupBox4: TGroupBox
        Left = 328
        Top = 8
        Width = 409
        Height = 409
        Caption = 'Crit'#233'rios de Aprova'#231#227'o'
        Font.Charset = DEFAULT_CHARSET
        Font.Color = clWindowText
        Font.Height = -11
        Font.Name = 'MS Sans Serif'
        Font.Style = []
        ParentFont = False
        TabOrder = 4
        object Label17: TLabel
          Left = 16
          Top = 24
          Width = 126
          Height = 13
          Caption = 'Dureza na Superf'#237'cie:'
          Font.Charset = DEFAULT_CHARSET
          Font.Color = clWindowText
          Font.Height = -11
          Font.Name = 'MS Sans Serif'
          Font.Style = [fsBold]
          ParentFont = False
        end
        object Label18: TLabel
          Left = 16
          Top = 200
          Width = 144
          Height = 13
          Caption = 'Propriedades Mec'#226'nicas:'
          Font.Charset = DEFAULT_CHARSET
          Font.Color = clWindowText
          Font.Height = -11
          Font.Name = 'MS Sans Serif'
          Font.Style = [fsBold]
          ParentFont = False
        end
        object Label19: TLabel
          Left = 16
          Top = 224
          Width = 68
          Height = 13
          Caption = 'Limite Ruptura'
        end
        object Label20: TLabel
          Left = 16
          Top = 248
          Width = 89
          Height = 13
          Caption = 'Limite Escoamento'
        end
        object Label21: TLabel
          Left = 16
          Top = 272
          Width = 79
          Height = 13
          Caption = 'Alongamento (%)'
        end
        object Label22: TLabel
          Left = 16
          Top = 296
          Width = 61
          Height = 13
          Caption = 'Estric'#231#227'o (%)'
        end
        object Label24: TLabel
          Left = 16
          Top = 328
          Width = 110
          Height = 13
          Caption = 'Ensaio de Impacto:'
          Font.Charset = DEFAULT_CHARSET
          Font.Color = clWindowText
          Font.Height = -11
          Font.Name = 'MS Sans Serif'
          Font.Style = [fsBold]
          ParentFont = False
        end
        object Label12: TLabel
          Left = 16
          Top = 56
          Width = 113
          Height = 13
          Caption = 'Dureza '#224' Meio Raio'
          Font.Charset = DEFAULT_CHARSET
          Font.Color = clWindowText
          Font.Height = -11
          Font.Name = 'MS Sans Serif'
          Font.Style = [fsBold]
          ParentFont = False
        end
        object Label25: TLabel
          Left = 16
          Top = 88
          Width = 106
          Height = 13
          Caption = 'Dureza '#224' 1/4 Raio'
          Font.Charset = DEFAULT_CHARSET
          Font.Color = clWindowText
          Font.Height = -11
          Font.Name = 'MS Sans Serif'
          Font.Style = [fsBold]
          ParentFont = False
        end
        object ComboBox6: TComboBox
          Left = 256
          Top = 24
          Width = 73
          Height = 21
          ItemHeight = 13
          TabOrder = 0
          Text = 'Sel. Un.'
          Items.Strings = (
            'HRC'
            'HB'
            '(Kgf/mm'#178')'
            '(Kgf/cm'#178')'
            '(N/mm'#178')'
            '(MPa)')
        end
        object Edit19: TEdit
          Left = 152
          Top = 24
          Width = 41
          Height = 21
          TabOrder = 1
          Text = 'M'#237'n.'
        end
        object CheckBox11: TCheckBox
          Left = 344
          Top = 24
          Width = 41
          Height = 17
          Caption = 'N.A.'
          TabOrder = 2
        end
        object Edit20: TEdit
          Left = 112
          Top = 224
          Width = 57
          Height = 21
          TabOrder = 3
          Text = 'Min.'
        end
        object Edit21: TEdit
          Left = 176
          Top = 224
          Width = 57
          Height = 21
          TabOrder = 4
          Text = 'M'#225'x.'
        end
        object Edit22: TEdit
          Left = 112
          Top = 248
          Width = 57
          Height = 21
          TabOrder = 5
          Text = 'Min.'
        end
        object Edit23: TEdit
          Left = 176
          Top = 248
          Width = 57
          Height = 21
          TabOrder = 6
          Text = 'M'#225'x.'
        end
        object Edit24: TEdit
          Left = 112
          Top = 272
          Width = 57
          Height = 21
          TabOrder = 7
          Text = 'Min.'
        end
        object Edit25: TEdit
          Left = 176
          Top = 272
          Width = 57
          Height = 21
          TabOrder = 8
          Text = 'M'#225'x.'
        end
        object Edit26: TEdit
          Left = 112
          Top = 296
          Width = 57
          Height = 21
          TabOrder = 9
          Text = 'Min.'
        end
        object Edit27: TEdit
          Left = 176
          Top = 296
          Width = 57
          Height = 21
          TabOrder = 10
          Text = 'M'#225'x.'
        end
        object ComboBox7: TComboBox
          Left = 240
          Top = 224
          Width = 65
          Height = 21
          ItemHeight = 13
          TabOrder = 11
          Text = 'Sel.'
          Items.Strings = (
            'KSI'
            'PSI'
            'MPa'
            'Kgf/mm'#178
            'Kgf/cm'#178
            'N/mm'#178)
        end
        object CheckBox12: TCheckBox
          Left = 320
          Top = 224
          Width = 41
          Height = 17
          Caption = 'N.A.'
          TabOrder = 12
        end
        object CheckBox13: TCheckBox
          Left = 320
          Top = 248
          Width = 41
          Height = 17
          Caption = 'N.A.'
          TabOrder = 13
        end
        object CheckBox14: TCheckBox
          Left = 240
          Top = 272
          Width = 41
          Height = 17
          Caption = 'N.A.'
          TabOrder = 14
        end
        object CheckBox15: TCheckBox
          Left = 240
          Top = 296
          Width = 41
          Height = 17
          Caption = 'N.A.'
          TabOrder = 15
        end
        object ComboBox8: TComboBox
          Left = 240
          Top = 248
          Width = 65
          Height = 21
          ItemHeight = 13
          TabOrder = 16
          Text = 'Sel.'
          Items.Strings = (
            'KSI'
            'PSI'
            'MPa'
            'Kgf/mm'#178
            'Kgf/cm'#178
            'N/mm'#178)
        end
        object ComboBox9: TComboBox
          Left = 16
          Top = 360
          Width = 105
          Height = 21
          ItemHeight = 13
          TabOrder = 17
          Text = 'Tipo de Entalhe'
          Items.Strings = (
            'Charpy A'
            'Charpy B'
            'Charpy C'
            'Izod')
        end
        object ComboBox10: TComboBox
          Left = 136
          Top = 360
          Width = 89
          Height = 21
          ItemHeight = 13
          TabOrder = 18
          Text = 'Temperatura '
          Items.Strings = (
            'Ambiente'
            'at'#233' -60 graus Celsius'
            'entre -61 '#224' -196 graus Celsius')
        end
        object CheckBox16: TCheckBox
          Left = 168
          Top = 200
          Width = 41
          Height = 17
          Caption = 'N.A.'
          TabOrder = 19
        end
        object CheckBox17: TCheckBox
          Left = 136
          Top = 328
          Width = 41
          Height = 17
          Caption = 'N.A.'
          TabOrder = 20
        end
        object ComboBox12: TComboBox
          Left = 16
          Top = 120
          Width = 201
          Height = 21
          ItemHeight = 13
          TabOrder = 21
          Text = 'Microestrutura'
          Items.Strings = (
            'Perlita e Ferrita'
            'Predominantemente Coalecida'
            'Martensita Revenida')
        end
        object CheckBox18: TCheckBox
          Left = 224
          Top = 120
          Width = 41
          Height = 17
          Caption = 'N.A.'
          TabOrder = 22
        end
        object Edit33: TEdit
          Left = 240
          Top = 368
          Width = 65
          Height = 21
          TabOrder = 23
          Text = 'Joules Min.'
        end
        object CheckBox19: TCheckBox
          Left = 16
          Top = 144
          Width = 169
          Height = 17
          Caption = 'Tamanho de Gr'#227'o Auten'#237'tico'
          TabOrder = 24
        end
        object CheckBox20: TCheckBox
          Left = 16
          Top = 168
          Width = 161
          Height = 17
          Caption = 'Tamanho de Gr'#227'o Ferr'#237'tico'
          TabOrder = 25
        end
        object ComboBox11: TComboBox
          Left = 192
          Top = 144
          Width = 49
          Height = 21
          ItemHeight = 13
          TabOrder = 26
          Text = 'Min.'
          Items.Strings = (
            '4'
            '5'
            '6'
            '7'
            '8'
            '9'
            '10')
        end
        object ComboBox14: TComboBox
          Left = 192
          Top = 168
          Width = 49
          Height = 21
          ItemHeight = 13
          TabOrder = 27
          Text = 'Min.'
          Items.Strings = (
            '4'
            '5'
            '6'
            '7'
            '8'
            '9'
            '10')
        end
        object ComboBox15: TComboBox
          Left = 248
          Top = 144
          Width = 49
          Height = 21
          ItemHeight = 13
          TabOrder = 28
          Text = 'Max.'
          Items.Strings = (
            '4'
            '5'
            '6'
            '7'
            '8'
            '9'
            '10')
        end
        object ComboBox16: TComboBox
          Left = 248
          Top = 168
          Width = 49
          Height = 21
          ItemHeight = 13
          TabOrder = 29
          Text = 'Max.'
          Items.Strings = (
            '4'
            '5'
            '6'
            '7'
            '8'
            '9'
            '10')
        end
        object Edit34: TEdit
          Left = 200
          Top = 24
          Width = 41
          Height = 21
          TabOrder = 30
          Text = 'M'#225'x.'
        end
        object Edit35: TEdit
          Left = 240
          Top = 344
          Width = 65
          Height = 21
          TabOrder = 31
          Text = 'Joules Min.'
        end
        object CheckBox24: TCheckBox
          Left = 312
          Top = 344
          Width = 81
          Height = 17
          Caption = 'Longitudinal'
          TabOrder = 32
        end
        object CheckBox25: TCheckBox
          Left = 312
          Top = 368
          Width = 81
          Height = 17
          Caption = 'Transversal'
          TabOrder = 33
        end
        object Edit11: TEdit
          Left = 152
          Top = 56
          Width = 41
          Height = 21
          TabOrder = 34
          Text = 'M'#237'n.'
        end
        object Edit29: TEdit
          Left = 200
          Top = 56
          Width = 41
          Height = 21
          TabOrder = 35
          Text = 'M'#225'x.'
        end
        object Edit40: TEdit
          Left = 152
          Top = 88
          Width = 41
          Height = 21
          TabOrder = 36
          Text = 'M'#237'n.'
        end
        object Edit41: TEdit
          Left = 200
          Top = 88
          Width = 41
          Height = 21
          TabOrder = 37
          Text = 'M'#225'x.'
        end
        object ComboBox18: TComboBox
          Left = 256
          Top = 56
          Width = 73
          Height = 21
          ItemHeight = 13
          TabOrder = 38
          Text = 'Sel. Un.'
          Items.Strings = (
            'HRC'
            'HB'
            '(Kgf/mm'#178')'
            '(Kgf/cm'#178')'
            '(N/mm'#178')'
            '(MPa)')
        end
        object ComboBox19: TComboBox
          Left = 256
          Top = 88
          Width = 73
          Height = 21
          ItemHeight = 13
          TabOrder = 39
          Text = 'Sel. Un.'
          Items.Strings = (
            'HRC'
            'HB'
            '(Kgf/mm'#178')'
            '(Kgf/cm'#178')'
            '(N/mm'#178')'
            '(MPa)')
        end
        object CheckBox27: TCheckBox
          Left = 344
          Top = 56
          Width = 97
          Height = 17
          Caption = 'N.A.'
          TabOrder = 40
        end
        object CheckBox28: TCheckBox
          Left = 344
          Top = 88
          Width = 97
          Height = 17
          Caption = 'N.A.'
          TabOrder = 41
        end
      end
      object GroupBox5: TGroupBox
        Left = 8
        Top = 392
        Width = 297
        Height = 145
        Caption = 'Grau de Redu'#231#227'o'
        TabOrder = 5
        object Label27: TLabel
          Left = 128
          Top = 72
          Width = 42
          Height = 13
          Caption = 'Di'#226'metro'
        end
        object Label28: TLabel
          Left = 16
          Top = 112
          Width = 85
          Height = 13
          Caption = 'Grau de Redu'#231#227'o'
          OnClick = Label28Click
        end
        object ComboBox13: TComboBox
          Left = 16
          Top = 24
          Width = 185
          Height = 21
          ItemHeight = 13
          TabOrder = 0
          Text = 'Tipo de Lingotamento'
          Items.Strings = (
            'Lingotamento Convencional'
            'Lingotamento Cont'#237'nuo')
        end
        object RadioButton1: TRadioButton
          Left = 16
          Top = 56
          Width = 113
          Height = 17
          Caption = 'Lingote Quadrado'
          TabOrder = 1
        end
        object RadioButton2: TRadioButton
          Left = 16
          Top = 80
          Width = 113
          Height = 17
          Caption = 'Lingote Redondo'
          TabOrder = 2
        end
        object Edit30: TEdit
          Left = 176
          Top = 72
          Width = 57
          Height = 21
          TabOrder = 3
          Text = 'mil'#237'metros'
        end
        object Edit31: TEdit
          Left = 120
          Top = 112
          Width = 121
          Height = 21
          TabOrder = 4
        end
        object CheckBox29: TCheckBox
          Left = 176
          Top = 48
          Width = 97
          Height = 17
          Caption = 'Polegadas'
          TabOrder = 5
        end
      end
      object GroupBox6: TGroupBox
        Left = 8
        Top = 120
        Width = 297
        Height = 153
        Caption = 'Descri'#231#227'o do Servi'#231'o'
        TabOrder = 6
        object ComboBox3: TComboBox
          Left = 8
          Top = 24
          Width = 145
          Height = 21
          ItemHeight = 13
          TabOrder = 0
          Text = 'Especificar Ferro'
          Items.Strings = (
            'GG15 (cinzento)'
            'GG20 (cinzento)'
            'GG25 (cinzento)'
            'GG30 (cinzento)'
            'GGG40 (nodular)'
            'GGG50 (nodular)'
            'GGG60 (nodular)'
            'Ferro Branco')
        end
        object ComboBox4: TComboBox
          Left = 8
          Top = 24
          Width = 145
          Height = 21
          ItemHeight = 13
          TabOrder = 1
          Text = 'Especificar Inox'
          Items.Strings = (
            '301 (austen'#237'tico)'
            '304 (austen'#237'tico)'
            '316 (austen'#237'tico)'
            '321 (austen'#237'tico)'
            '409 (ferr'#237'tico)'
            '410 (ferr'#237'tico)'
            '430 (ferr'#237'tico)'
            '439 (ferr'#237'tico)'
            '441 (ferr'#237'tico)'
            '444 (ferr'#237'tico)'
            '420 (martens'#237'tico)'
            '498 (martens'#237'tico)')
        end
        object ComboBox2: TComboBox
          Left = 8
          Top = 24
          Width = 145
          Height = 21
          ItemHeight = 13
          TabOrder = 2
          Text = 'Especificar A'#231'o'
          Items.Strings = (
            '1005'
            '1020'
            '1045'
            '1060'
            '1522'
            '4140'
            '4140H'
            '4340'
            '6150'
            '8620'
            '8640')
        end
        object ComboBox5: TComboBox
          Left = 8
          Top = 56
          Width = 145
          Height = 21
          ItemHeight = 13
          TabOrder = 3
          Text = 'Tratamento T'#233'rmico'
          Items.Strings = (
            'Al'#237'vio de Tens'#245'es'
            'Normaliza'#231#227'o'
            'Norm+T'#234'mp+Rev'
            'Recozimento Subcr'#237'tico'
            'Recozimento Pleno'
            'Recozimento Isot'#233'rmico'
            'Aquecimento'
            'T'#234'mpera'
            'T'#234'mpera + Revenimento'
            'Revenimento')
        end
        object CheckBox8: TCheckBox
          Left = 160
          Top = 56
          Width = 105
          Height = 17
          Caption = 'N'#227'o Especificado'
          TabOrder = 4
        end
        object CheckBox9: TCheckBox
          Left = 8
          Top = 88
          Width = 217
          Height = 17
          Caption = 'Incluir Limpeza por Jato de Granalha'
          TabOrder = 5
        end
        object CheckBox10: TCheckBox
          Left = 8
          Top = 120
          Width = 217
          Height = 17
          Caption = 'Incluir Endireitamento'
          TabOrder = 6
        end
      end
      object GroupBox7: TGroupBox
        Left = 160
        Top = 40
        Width = 145
        Height = 73
        Caption = 'Requisitos Espec'#237'ficos'
        TabOrder = 7
        object CheckBox21: TCheckBox
          Left = 8
          Top = 16
          Width = 57
          Height = 17
          Caption = 'API-6A'
          TabOrder = 0
        end
        object CheckBox22: TCheckBox
          Left = 8
          Top = 32
          Width = 57
          Height = 17
          Caption = 'PPAP'
          TabOrder = 1
        end
        object CheckBox23: TCheckBox
          Left = 8
          Top = 48
          Width = 49
          Height = 17
          Caption = 'CQI-9'
          TabOrder = 2
        end
        object ComboBox17: TComboBox
          Left = 64
          Top = 32
          Width = 73
          Height = 21
          ItemHeight = 13
          TabOrder = 3
          Text = 'N'#237'vel'
          Items.Strings = (
            'N'#237'vel 1'
            'N'#237'vel 2'
            'N'#237'vel 3'
            'N'#237'vel 4'
            'N'#237'vel 5')
        end
      end
      object GroupBox11: TGroupBox
        Left = 504
        Top = 424
        Width = 225
        Height = 129
        Caption = 'Pre'#231'o'
        TabOrder = 8
        object Label9: TLabel
          Left = 16
          Top = 32
          Width = 53
          Height = 13
          Caption = 'Pre'#231'o M'#237'n.'
        end
        object Edit9: TEdit
          Left = 80
          Top = 32
          Width = 121
          Height = 21
          TabOrder = 0
          Text = 'Edit9'
        end
      end
    end
    object TTabPage
      Left = 4
      Top = 24
      HelpContext = 2
      Caption = 'Custos'
      object GroupBox12: TGroupBox
        Left = 24
        Top = 24
        Width = 257
        Height = 321
        Caption = 'Insumos - Custo Vari'#225'vel'
        TabOrder = 0
        object Label35: TLabel
          Left = 16
          Top = 32
          Width = 74
          Height = 13
          Caption = 'Energia El'#233'trica'
        end
        object Label36: TLabel
          Left = 16
          Top = 64
          Width = 56
          Height = 13
          Caption = 'G'#225's Natural'
        end
        object Label37: TLabel
          Left = 16
          Top = 96
          Width = 43
          Height = 13
          Caption = 'G'#225's GLP'
        end
        object Label38: TLabel
          Left = 16
          Top = 128
          Width = 56
          Height = 13
          Caption = 'Dispositivos'
        end
        object Label40: TLabel
          Left = 16
          Top = 160
          Width = 42
          Height = 13
          Caption = 'Impostos'
        end
        object Label41: TLabel
          Left = 16
          Top = 192
          Width = 50
          Height = 13
          Caption = 'Hora Extra'
        end
        object Label42: TLabel
          Left = 17
          Top = 220
          Width = 44
          Height = 13
          Caption = 'Log'#237'stica'
        end
        object Label43: TLabel
          Left = 16
          Top = 248
          Width = 60
          Height = 13
          Caption = 'Manuten'#231#227'o'
        end
        object Label56: TLabel
          Left = 16
          Top = 280
          Width = 44
          Height = 13
          Caption = 'Telefonia'
        end
        object Edit37: TEdit
          Left = 104
          Top = 64
          Width = 121
          Height = 21
          TabOrder = 0
          Text = 'Edit37'
        end
        object Edit45: TEdit
          Left = 104
          Top = 128
          Width = 121
          Height = 21
          TabOrder = 1
          Text = 'Edit45'
        end
        object Edit36: TEdit
          Left = 104
          Top = 32
          Width = 121
          Height = 21
          TabOrder = 2
          Text = 'Edit36'
        end
        object Edit46: TEdit
          Left = 104
          Top = 160
          Width = 121
          Height = 21
          TabOrder = 3
          Text = 'Edit46'
        end
        object Edit47: TEdit
          Left = 104
          Top = 192
          Width = 121
          Height = 21
          TabOrder = 4
          Text = 'Edit47'
        end
        object Edit48: TEdit
          Left = 104
          Top = 220
          Width = 121
          Height = 21
          TabOrder = 5
          Text = 'Edit48'
        end
        object Edit49: TEdit
          Left = 104
          Top = 248
          Width = 121
          Height = 21
          TabOrder = 6
          Text = 'Edit49'
        end
        object Edit74: TEdit
          Left = 104
          Top = 280
          Width = 121
          Height = 21
          TabOrder = 7
          Text = 'Edit74'
        end
        object Edit38: TEdit
          Left = 104
          Top = 96
          Width = 121
          Height = 21
          TabOrder = 8
          Text = 'Edit38'
        end
      end
      object GroupBox13: TGroupBox
        Left = 24
        Top = 352
        Width = 257
        Height = 161
        Caption = 'Infraestrutura - Custo Fixo'
        TabOrder = 1
        object Label34: TLabel
          Left = 16
          Top = 24
          Width = 35
          Height = 13
          Caption = 'Aluguel'
        end
        object Label39: TLabel
          Left = 16
          Top = 56
          Width = 62
          Height = 13
          Caption = 'M'#227'o de Obra'
        end
        object Label57: TLabel
          Left = 16
          Top = 88
          Width = 58
          Height = 13
          Caption = 'Rateio ADM'
        end
        object Label58: TLabel
          Left = 16
          Top = 120
          Width = 108
          Height = 13
          Caption = 'Demanda (Eletropaulo)'
        end
        object Edit50: TEdit
          Left = 152
          Top = 24
          Width = 73
          Height = 21
          TabOrder = 0
          Text = 'Edit50'
        end
        object Edit51: TEdit
          Left = 152
          Top = 56
          Width = 73
          Height = 21
          TabOrder = 1
          Text = 'Edit51'
        end
        object Edit79: TEdit
          Left = 152
          Top = 88
          Width = 73
          Height = 21
          TabOrder = 2
          Text = 'Edit79'
        end
        object Edit80: TEdit
          Left = 152
          Top = 120
          Width = 73
          Height = 21
          TabOrder = 3
          Text = 'Edit80'
        end
      end
      object GroupBox14: TGroupBox
        Left = 320
        Top = 24
        Width = 337
        Height = 345
        Caption = 'Consumo por Equipamento'
        TabOrder = 2
        object Label44: TLabel
          Left = 16
          Top = 48
          Width = 22
          Height = 13
          Caption = 'Flinn'
        end
        object Label45: TLabel
          Left = 240
          Top = 24
          Width = 84
          Height = 13
          Caption = 'Pe'#231'as Reposi'#231#227'o'
        end
        object Label46: TLabel
          Left = 72
          Top = 24
          Width = 39
          Height = 13
          Caption = 'Insumos'
        end
        object Label47: TLabel
          Left = 16
          Top = 80
          Width = 25
          Height = 13
          Caption = 'G'#225's1'
        end
        object Label48: TLabel
          Left = 155
          Top = 23
          Width = 55
          Height = 13
          Caption = 'Operadores'
        end
        object Label49: TLabel
          Left = 16
          Top = 112
          Width = 25
          Height = 13
          Caption = 'G'#225's2'
        end
        object Label50: TLabel
          Left = 16
          Top = 144
          Width = 28
          Height = 13
          Caption = 'Cont1'
        end
        object Label51: TLabel
          Left = 16
          Top = 176
          Width = 28
          Height = 13
          Caption = 'Cont2'
        end
        object Label52: TLabel
          Left = 16
          Top = 208
          Width = 39
          Height = 13
          Caption = 'Prensa1'
        end
        object Label53: TLabel
          Left = 16
          Top = 240
          Width = 39
          Height = 13
          Caption = 'Prensa2'
        end
        object Label54: TLabel
          Left = 16
          Top = 272
          Width = 26
          Height = 13
          Caption = 'Jato1'
        end
        object Label55: TLabel
          Left = 16
          Top = 304
          Width = 26
          Height = 13
          Caption = 'Jato2'
        end
        object Edit52: TEdit
          Left = 160
          Top = 48
          Width = 49
          Height = 21
          TabOrder = 0
          Text = 'Edit52'
        end
        object Edit53: TEdit
          Left = 256
          Top = 48
          Width = 49
          Height = 21
          TabOrder = 1
          Text = 'Edit53'
        end
        object Edit54: TEdit
          Left = 72
          Top = 80
          Width = 49
          Height = 21
          TabOrder = 2
          Text = 'Edit54'
        end
        object Edit55: TEdit
          Left = 160
          Top = 80
          Width = 49
          Height = 21
          TabOrder = 3
          Text = 'Edit55'
        end
        object Edit56: TEdit
          Left = 256
          Top = 80
          Width = 49
          Height = 21
          TabOrder = 4
          Text = 'Edit56'
        end
        object Edit57: TEdit
          Left = 72
          Top = 112
          Width = 49
          Height = 21
          TabOrder = 5
          Text = 'Edit57'
        end
        object Edit58: TEdit
          Left = 160
          Top = 112
          Width = 49
          Height = 21
          TabOrder = 6
          Text = 'Edit58'
        end
        object Edit59: TEdit
          Left = 256
          Top = 112
          Width = 49
          Height = 21
          TabOrder = 7
          Text = 'Edit59'
        end
        object Edit60: TEdit
          Left = 72
          Top = 144
          Width = 49
          Height = 21
          TabOrder = 8
          Text = 'Edit60'
        end
        object Edit61: TEdit
          Left = 160
          Top = 144
          Width = 49
          Height = 21
          TabOrder = 9
          Text = 'Edit61'
        end
        object Edit62: TEdit
          Left = 256
          Top = 144
          Width = 49
          Height = 21
          TabOrder = 10
          Text = 'Edit62'
        end
        object Edit63: TEdit
          Left = 72
          Top = 176
          Width = 49
          Height = 21
          TabOrder = 11
          Text = 'Edit63'
        end
        object Edit64: TEdit
          Left = 160
          Top = 176
          Width = 49
          Height = 21
          TabOrder = 12
          Text = 'Edit64'
        end
        object Edit65: TEdit
          Left = 256
          Top = 176
          Width = 49
          Height = 21
          TabOrder = 13
          Text = 'Edit65'
        end
        object Edit66: TEdit
          Left = 72
          Top = 208
          Width = 49
          Height = 21
          TabOrder = 14
          Text = 'Edit66'
        end
        object Edit67: TEdit
          Left = 160
          Top = 208
          Width = 49
          Height = 21
          TabOrder = 15
          Text = 'Edit67'
        end
        object Edit68: TEdit
          Left = 256
          Top = 208
          Width = 49
          Height = 21
          TabOrder = 16
          Text = 'Edit68'
        end
        object Edit69: TEdit
          Left = 72
          Top = 240
          Width = 49
          Height = 21
          TabOrder = 17
          Text = 'Edit69'
        end
        object Edit70: TEdit
          Left = 160
          Top = 240
          Width = 49
          Height = 21
          TabOrder = 18
          Text = 'Edit70'
        end
        object Edit71: TEdit
          Left = 256
          Top = 240
          Width = 49
          Height = 21
          TabOrder = 19
          Text = 'Edit71'
        end
        object Edit72: TEdit
          Left = 72
          Top = 272
          Width = 49
          Height = 21
          TabOrder = 20
          Text = 'Edit72'
        end
        object Edit73: TEdit
          Left = 160
          Top = 272
          Width = 49
          Height = 21
          TabOrder = 21
          Text = 'Edit73'
        end
        object Edit75: TEdit
          Left = 256
          Top = 272
          Width = 49
          Height = 21
          TabOrder = 22
          Text = 'Edit75'
        end
        object Edit76: TEdit
          Left = 72
          Top = 304
          Width = 49
          Height = 21
          TabOrder = 23
          Text = 'Edit76'
        end
        object Edit77: TEdit
          Left = 160
          Top = 304
          Width = 49
          Height = 21
          TabOrder = 24
          Text = 'Edit77'
        end
        object Edit78: TEdit
          Left = 256
          Top = 304
          Width = 49
          Height = 21
          TabOrder = 25
          Text = 'Edit78'
        end
        object Edit44: TEdit
          Left = 72
          Top = 48
          Width = 49
          Height = 21
          TabOrder = 26
          Text = 'Edit44'
        end
      end
    end
    object TTabPage
      Left = 4
      Top = 24
      HelpContext = 3
      Caption = 'Or'#231'amento'
      object Memo1: TMemo
        Left = 48
        Top = 16
        Width = 457
        Height = 361
        Lines.Strings = (
          'Memo1')
        TabOrder = 0
      end
    end
  end
  object IdHTTP1: TIdHTTP
    MaxLineAction = maException
    ReadTimeout = 0
    AllowCookies = True
    ProxyParams.BasicAuthentication = False
    ProxyParams.ProxyPort = 0
    Request.ContentLength = -1
    Request.ContentRangeEnd = 0
    Request.ContentRangeStart = 0
    Request.ContentType = 'text/html'
    Request.Accept = 'text/html, */*'
    Request.BasicAuthentication = False
    Request.UserAgent = 'Mozilla/3.0 (compatible; Indy Library)'
    HTTPOptions = [hoForceEncodeParams]
    Left = 256
    Top = 8
  end
end
