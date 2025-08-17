import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DateComponent } from 'src/app/shared/components/date.component';
import { Functions } from 'src/app/core/functions';
import { DiaryService } from 'src/app/core/services';
import { ITbEintrag } from 'src/app/core/models';

@Component({
  selector: 'app-tb100',
  standalone: true,
  imports: [CommonModule, FormsModule, DateComponent],
  template: `
  <p class="subtitle">Diary</p>
  <div class="columns">
    <div class="column">
      <div class="field">
        <label class="label" for="entrydate">Date</label>
        <app-date [date]="date" title="Date of entry" id="entrydate" (dateChange)="onDateChange($event)"></app-date>
      </div>
    </div>
    <div class="column">
      <div class="field">
        <label class="label" *ngIf="errormsg">Error</label>
        <p class="control" title="Error message">{{errormsg}}</p>
      </div>
    </div>
  </div>
  <div class="columns">
    <div class="column is-hidden-mobile">
      <div class="field">
        <label class="label" for="entryb1">1 day before</label>
        <div class="control">
          <textarea class="texarea" title="Diary entry one day before" placeholder="Diary entry one day before" id="entryb1" name="entry" [(ngModel)]="entryb1" rows="8" disabled="disabled"></textarea>
        </div>
      </div>
    </div>
    <div class="column">
      <div class="field">
        <label class="label" for="entry">Eintrag</label>
        <div class="control">
          <textarea class="texarea" title="Tagebuch-Eintrag" placeholder="Diary entry" id="entry" name="entry" [(ngModel)]="entry" rows="8"></textarea>
        </div>
      </div>
    </div>
    <div class="column is-hidden-mobile">
      <div class="field">
        <label class="label" for="entrya1">1 day after</label>
        <div class="control">
          <textarea class="texarea" title="Diary entry one day after" placeholder="Diary entry one day after" id="entrya1" name="entrya1" [(ngModel)]="entrya1" rows="8" disabled="disabled"></textarea>
        </div>
      </div>
    </div>
  </div>
  <div class="columns">
    <div class="column">
    <button type="button" class="button is-primary" title="Save entry" (click)="save()"><img src="assets/icons/ic_save_white_24dp.png"/></button>&nbsp;
    <button type="button" class="button is-secondary" title="Undo last save action" (click)="undo()"><img src="assets/icons/edit-undo.png"/></button>&nbsp;
    <button type="button" class="button is-secondary" title="Redo last undo action" (click)="redo()"><img src="assets/icons/edit-redo.png"/></button>&nbsp;
    </div>
    <div class="column">
      <div class="field">
        <label class="label" for="created" *ngIf="angelegt">Angelegt</label>
        <p class="control" id="created" title="Angelegt">{{angelegt}}</p>
      </div>
    </div>
    <div class="column">
      <div class="field">
        <label class="label" for="changed" *ngIf="geaendert">Geändert</label>
        <p class="control" id="changed" title="Geändert">{{geaendert}}</p>
      </div>
    </div>
  </div>
  `,
  styles: [
  ]
})
export class Tb100Component implements OnInit {
  date: Date = Functions.today();
  entryb1: string | null = null;
  entry: string | null = null;
  entrya1: string | null = null;
  angelegt: string | null = null;
  geaendert: string | null = null;
  errormsg: string | null = null;
  private datumAlt: Date | null = null;
  private eintragAlt: string | null = null;
  private geladen: boolean = false;
  private entries: Array<ITbEintrag> = [];

  constructor(private diaryService: DiaryService) {}

  ngOnInit() {
    // console.log("tb100 init")
    this.handleEntries(false, true); // Only load.
  }

  public onDateChange(datum: Date) {
    this.date = datum;
    //this.tbservice.setDatum(datum);
    // console.log('Datum: ' + this.datum + ' Eintrag: ' + this.eintrag + ' Alt: ' + this.datumAlt + ' Eintrag: ' + this.eintragAlt);
    this.handleEntries(true, true);
  }

  /**
   * Loads the entries for a given date.
   * @param {Date} datum - The date for which to load entries.
   */
  private loadEntries(datum: Date) {
    if (datum != null) {
      this.date = datum;
      this.diaryService.list(this.date, 3).subscribe((response) => {
        const { data, error } = response;
        if (data) {
          this.entries = data; // as Array<ITbEintrag>;
          this.entryb1 = this.entries?.[0]?.eintrag;
          const e = this.entries?.[1];
          if (e == null) {
            this.eintragAlt = null;
            this.entry = null;
            this.angelegt = null;
            this.geaendert = null;
          } else {
            // this.geaendert = JSON.stringify(data, null, 2);
            this.eintragAlt = e.eintrag;
            this.entry = e.eintrag;
            e.datum = Functions.convertJsonDate(e.datum);
            e.angelegt_am = Functions.convertJsonDate(e.angelegt_am);
            e.geaendert_am = Functions.convertJsonDate(e.geaendert_am);
            this.angelegt = Functions.formatDateUser(e.angelegt_am, e.angelegt_von, ' (', e.replikation_uid, ')');
            this.geaendert = Functions.formatDateUser(e.geaendert_am, e.geaendert_von, null, null, null);
          }
          this.datumAlt = new Date(this.date.getTime());
          this.entrya1 = this.entries?.[2]?.eintrag;
        }
        if (error) {
          this.entryb1 = null;
          this.entry = null;
          this.entrya1 = null;
          this.angelegt = JSON.stringify(error, null, 2);
          this.geaendert = null;
          this.geladen = false;
        }
      });
    }
  }

  /**
   * Saves the current state by calling the handleEntries function.
   */
  save() {
    this.handleEntries(true, true);
  }

  /**
   * Undoes the last database action and reloads the current state by calling the handleEntries function.
   */
  undo() {
    this.diaryService.undo().subscribe((response) => {
      const { data, error } = response;
      if (error) {
        this.errormsg = JSON.stringify(error, null, 2);
      } else {
        this.handleEntries(false, true);
      }
    });
  }

  /**
   * Redoes the last undo action and reloads the current state by calling the handleEntries function.
   */
  redo() {
    this.diaryService.redo().subscribe((response) => {
      const { data, error } = response;
      if (error) {
        this.errormsg = JSON.stringify(error, null, 2);
      } else {
        this.handleEntries(false, true);
      }
    });
  }

  /**
   * This function handles the processing of entries based on the current date.
   * It may save the current entry beforehand and load entries if requested.
   * @param speichern - True, if the current entry should be saved beforehand.
   * @param laden - True, if entries should be loaded.
   */
  private handleEntries(speichern: boolean, laden: boolean) {
    // Avoid recursion
    if (speichern && this.geladen) {
      // Save the previous entry
      this.errormsg = null;
      let alt = Functions.trim(this.eintragAlt);
      let neu = Functions.trim(this.entry);
      // Only save if there are changes
      if ((Functions.nes(alt) !== Functions.nes(neu)) || alt !== neu) {
        this.diaryService.save(this.datumAlt ?? Functions.today(), this.entry ?? '').subscribe((response) => {
          const { data, error } = response;
          if (error) {
            this.errormsg = JSON.stringify(error, null, 2);
            if (laden) {
              laden = false;
              this.date = this.datumAlt ?? Functions.today();
              // this.loadEntries(this.datumAlt ?? Functions.today());
            }
          } else {
            // if (data) {
            // Response is null
            if (laden) {
              laden = false;
              this.loadEntries(this.date);
            }
          }
        });
        return;
      }
    }
    if (laden) {
      this.loadEntries(this.date);
      this.geladen = true;
    }
  }
}
