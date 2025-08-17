import { v4 as uuid } from 'uuid';
import { HttpErrorResponse } from '@angular/common/http';

/** Global functions */
export class Functions {

  constructor() { }

  // Globale Konstanten
  public static SU_MAXX: number = 9; // 6
  public static SU_MAXXW: number = 3; // 3
  public static SU_MAXYW: number = 3; // 2

  /** Macht nichts. */
  public static machNichts(): number {
    return 0;
  }

  /**
   * Liefert UTC-Datum aus Einzeldaten.
   * @param tag
   * @param monat
   * @param jahr
   */
  public static date(tag: number, monat: number, jahr: number): Date {
    //let d = new Date(jahr, monat - 1, tag);
    //return this.clearTime(d);
    var d = new Date(Date.UTC(jahr, monat - 1, tag, 0, 0, 0, 0));
    return d;
  }

  /**
   * Liefert UTC-Datum aus Datum.
   * @param tag
   * @param monat
   * @param jahr
   */
  public static date2(date: Date): Date {
    var d = Functions.date(date.getDate(), date.getMonth() + 1, date.getFullYear());
    return d;
  }

  /**
   * Liefert Datum aus String im Format yyyy-MM-dd.
   * @param s Umzuwandelnder String.
   */
  public static toDate(s: string): Date {
    let d = Functions.today();
    if (Functions.nes(s))
      return d;
    var parts = s.split('-');
    if (parts.length > 0)
      d.setFullYear(parseInt(parts[0]));
    if (parts.length > 1)
      d.setMonth(parseInt(parts[1]) - 1);
    if (parts.length > 2)
      d.setDate(parseInt(parts[2]));
    return d;
  }

  /**
   * Returns a string representation of the given date in the format yyyy-MM-dd.
   * @param {Date} d - The date to convert to a string.
   * @return {string} The string representation of the date in the format yyyy-MM-dd.
   */
  public static toString(d: Date | null): string {
    if (d == null) {
      return '';
    }
    let m = d.getMonth() + 1;
    let mm = (m < 10 ? '0' : '') + m.toString();
    let d0 = d.getDate();
    let dd = (d0 < 10 ? '0' : '') + d0.toString();
    let s = `${d.getFullYear()}-${mm}-${dd}`;
    //let s = d.toISOString(); // geht nicht wegen Local Date mit 00:00
    //s = s.substring(0, 10);
    return s;
  }

  public static today(): Date {
    let d = new Date();
    //d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0));
    d.setHours(0);
    d.setMinutes(0);
    d.setSeconds(0);
    d.setMilliseconds(0);
    //d.setTime(d.getTime() - d.getTimezoneOffset()*60*1000);
    return d;
  }

  public static clearTime(d: Date): Date {
    d.setHours(0);
    d.setMinutes(0);
    d.setSeconds(0);
    d.setMilliseconds(0);
    //d.setTime(d.getTime() - d.getTimezoneOffset()*60*1000);
    return d;
  }

  public static now(): Date {
    let d = new Date();
    d.setMilliseconds(0);
    return d;
  }

  public static nes(str: string | null): boolean {
    return str == null ? true : str === '' ? true : false;
  }

  public static trim(str: string | null): string {
    return str == null ? '' : str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
  }

  public static trimNull(str: string | null): string | null {
    var t = Functions.trim(str);
    return t.length <= 0 ? null : t;
  }

  /**
   * Wandelt einen Wert in einen Integer.
   * @param s Betroffener Wert.
   * @returns Umgewandelter Integer.
   */
  public static toInt(s: any): number {
    if (s == null) {
      return 0;
    }
    if (typeof s === 'number') {
      return s;
    }
    if (typeof s === 'string') {
      let i = parseInt(s, 10);
      if (!isNaN(i))
        return i;
    }
    return 0;
  }

  /**
   * Wandelt einen Wert in eine Zahl.
   * @param s Betroffener Wert.
   * @param de Ist es eine deutsche Zahl mit Komma?
   * @returns Umgewandelte Zahl.
   */
  public static toNumber(s: any, de: boolean = true): number {
    if (s == null) {
      return 0;
    }
    if (typeof s === 'number') {
      return s;
    }
    if (typeof s === 'string') {
      let s1 = de ? s.replace('.', '').replace(',', '.') : s.replace(',', '');
      let i = parseFloat(s1);
      if (!isNaN(i))
        return i;
    }
    return 0;
  }

  /**
   * Rundet eine Zahl.
   * @param s Betroffene Zahl.
   * @param digits Anzahl Nachkommastellen.
   * @returns Gerundete Zahl.
   */
  public static round(n: number, digits: number = 2): number {
    if (digits <= 0)
      return Math.round(n);
    var p10 = Math.pow(10, digits);
    return Math.round(n * p10) / p10;
  }

  public static getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  public static getNumberArray(anzahl: number): number[] {
    if (anzahl < 0) {
      return [];
    }
    let a = [];
    for (let i = anzahl - 1; i >= 0; i--) {
      a[i] = 0;
    }
    return a;
  }

  /**
   * Formats date and user id.
   * @param {Date} date - Affected date. If null, an empty string is returned.
   * @param {string} user - Affected user can be empty. If empty, it is not added to the result.
   * @return {string} - The formatted date and time combined with the provided string.
   */
  public static formatDateUser(date: Date | null, user: string | null, extb: string | null, ext: string | null, exte: string | null): string {
    if (date == null && Functions.nes(user)) {
      return '';
    }
    let s = '';
    if (date != null) {
      //s = datum.toLocaleDateString() + ' ' + datum.toLocaleTimeString();
      let d = new Date(date.getTime());
      d.setTime(d.getTime() - d.getTimezoneOffset() * 60 * 1000);
      s = d.toISOString();
      s = s.substring(0, 10) + ' ' + s.substring(11, 19);
    }
    if (!Functions.nes(user)) {
      s += ' of ' + user;
    }
    if (!Functions.nes(ext)) {
      if (!Functions.nes(extb)) {
        s += extb;
      }
      s += ext;
      if (!Functions.nes(exte)) {
        s += exte;
      }
    }
    return s;
  }

  /**
   * Formats date and user id.
   * @param {Date} date - Affected date. If null, an empty string is returned.
   * @param {string} user - Affected user can be empty. If empty, it is not added to the result.
   * @return {string} - The formatted date and time combined with the provided string.
   */
  public static formatDateUser2(date: string | null, user: string | null, extb: string | null, ext: string | null, exte: string | null): string {
    if (date == null && Functions.nes(user)) {
      return '';
    }
    let s = '';
    if (date != null) {
      s += date;
    }
    if (!Functions.nes(user)) {
      s += ' of ' + user;
    }
    if (!Functions.nes(ext)) {
      if (!Functions.nes(extb)) {
        s += extb;
      }
      s += ext;
      if (!Functions.nes(exte)) {
        s += exte;
      }
    }
    return s;
  }

  /**
   * Converts JSON data (always string) to Date.
   * @param {Date} date - Affected date. If null, null is returned.
   */
  public static convertJsonDate(date: Date | null): Date | null {
    var aa = date as unknown as string;
    if (Functions.nes(aa)) {
      return null;
    }
    return new Date(aa);
  }

  /**
   * Generates a unique identifier.
   * @return {string} The generated unique identifier.
   */
  public static getUID(): string {
    var s = uuid();
    if (s.length > 35)
      s = s.substring(0, 8) + s.substring(9); // Erstes - entfernen.
    return s;
  }

  public static handleError(err: HttpErrorResponse): string {
    //var errortype: string = err.error.constructor.toString().match(/\w+/g)[1];
    //var errorstring: string = (err.error instanceof ProgressEvent) ? 'PE' : err.error.toString();
    var msg: string = err.error.error ? err.error.error.message
      : (err.message + ((err.error instanceof ProgressEvent) ? '' : ` (${err.error})`));
    var msg2 = `Server error: ${err.statusText} (${err.status})  Details: ${msg}`;
    return msg2;
  }
}