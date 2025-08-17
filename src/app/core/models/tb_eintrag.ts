export interface ITbEintrag {
  mandant_nr: number,
  datum: Date | null,
  eintrag: string,
  angelegt_von: string | null,
  angelegt_am: Date | null,
  geaendert_von: string | null,
  geaendert_am: Date | null,
  replikation_uid: string | null,
}
