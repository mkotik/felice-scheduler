import { Dayjs } from "dayjs";

export interface Record {
  date: string;
  property: string;
  service: string;
  cleaner: string;
  arrival: string | Dayjs;
  departure: string | Dayjs;
  key: string;
  ownerStay: "OWNER STAY" | "";
  cost: string;
}

export interface AppState {
  data: Record[];
}

export interface Property {
  label: string;
  name: string;
  cleaner: string;
  service: string;
  cost: string;
  key: string;
}
