import { DecimalPipe } from "@angular/common";

export class ApplicationRequest {
    public userName: string;
    public aIs_UIT_Cash_dollar: number;
    public aIs_UIT_Cash_percentage: number;
  public  advisor_Team_Name : string;
  public  advisory_dollar : number;
  public  advisory_percentage : number;
  public  brokerage_dollar : number;
  public  brokerage_percentage : number;
  public  eaum : number;
    public fixed_Annuities_dollar: number;
    public fixed_Annuities_percentage: number;
    public fixed_Income_percentage: number;
  public  fixed_Income_dollar : number;
  public  gdC_ROA : number;
    public general_Securities_dollar: number;
    public general_Securities_percentage: number;
    public mFs_Custodied_dollar: number;
    public mFs_Custodied_percentage: number;
    public mFs_Direct_dollar: number;
    public mFs_Direct_percentage: number;
  public  no_of_Advisors : number;
  public  prior_Firm_Name : string;
  public  prior_Firm_Type : string;
  public  t12_Advisory_GDC : number;
  public  t12_Brokerage_GDC : number;
  public  t12_GDC : string;
  public  vaum : number;
  public  variable_Annuities_dollar : number;
  public  variable_Annuities_percentage : number;
  public  ramp : number;

    public model_Ids: number[];
    public term_Ids: number[];


    public crd: number;
    public osj: string;
}
