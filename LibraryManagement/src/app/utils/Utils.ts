import { formatDate } from "@angular/common";

export default class Utils 
{
   static dateFormat = "yyyy-MM-dd";
   static language = "en";
   static formatFormDate(date: Date) {
    return formatDate(date, this.dateFormat, this.language);
  }

  static addMinusOneMonthFromDate(date1: Date): string {
    const newDate = new Date(date1); 
    newDate.setMonth(newDate.getMonth() - 1); 
    return formatDate(newDate, this.dateFormat, this.language);
  }

}


