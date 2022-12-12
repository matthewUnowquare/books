import { HttpParams } from "@angular/common/http";

export class PricesFilter {
  min: number;
  max?: number;
  constructor({min, max}: Partial<PricesFilter>){
    this.min = Math.max(min || 0);
    this.max = Math.min(max || this.min);
  }

  static fromJSON(json: any): PricesFilter {
    return new PricesFilter({
      min: json.min,
      max: json.max
    })
  }

}
