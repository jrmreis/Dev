program Project1;

uses
  Forms,
  Unit1 in 'Unit1.pas' {MESHcalculator};

{$R *.RES}

begin
  Application.Initialize;
  Application.CreateForm(TMESHcalculator, MESHcalculator);
  Application.Run;
end.
