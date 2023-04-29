import { Record } from "../types";

export const ADD_RECORD = "ADD_RECORD";

export const addRecord = (record: Record) => {
  return {
    type: ADD_RECORD,
    payload: record,
  };
};
