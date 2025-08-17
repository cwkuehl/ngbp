import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Functions } from '../../core/functions';

@Component({
  selector: 'app-date',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
<div class="field has-addons">
  <div class="control">
    <input class="input" type="date" id="d" name="d"
      [ngModel]="seldate | date:'yyyy-MM-dd'" (ngModelChange)="onSeldateChange($event)"
      #d="ngModel" required pattern="\d{4}-\d{2}-\d{2}" [readonly]="readonly" required>
  </div>
  <div class="control">
    <button class="button is-info" (click)="onChanged(-1)" type="button" title="Vorheriger Tag" [disabled]="readonly">-</button>
  </div>
  <div class="control">
    <button class="button is-info" (click)="onChanged()" type="button" title="Heute" [disabled]="readonly">o</button>
  </div>
  <div class="control">
    <button class="button is-info" (click)="onChanged(1)" type="button" title="Nächster Tag" [disabled]="readonly">+</button>
  </div>
</div>
  `,
  styles: [
  ]
})
export class DateComponent implements OnInit, OnChanges {

  @Output() dateChange = new EventEmitter<Date>();
  @Input('date') date: Date = Functions.today();
  @Input('readonly') readonly: boolean = false;

  seldate: Date;

  constructor() {
    this.seldate = this.date; // new Date();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log('ngOnChanges: ' + this.date);
    if (this.date == null) {
      this.seldate = Functions.today();
    } else
      this.seldate = this.date;
  }

  ngOnInit() {
  }

  onSeldateChange(x: any) {
    if (typeof x === 'string') {
      this.seldate = Functions.toDate(x);
      this.dateChange.next(new Date(this.seldate));
    }
  }

  public onChanged(t: number = 0, m: number = 0, j: number = 0) {
    var d = new Date(this.seldate);
    // var d = Global.date(this.seldate.getDate(), this.seldate.getMonth() + 1, this.seldate.getFullYear());
    if (t != 0) {
      d.setDate(d.getDate() + t);
    }
    if (m != 0) {
      d.setMonth(d.getMonth() + m);
    }
    if (j != 0) {
      d.setFullYear(d.getFullYear() + j);
    }
    if (t == 0 && m == 0 && j == 0)
      d = Functions.today();
    this.seldate = d;
    this.dateChange.next(d);
  }
}
