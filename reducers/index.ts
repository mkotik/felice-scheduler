import { Action } from "redux";
import { AppState, Record } from "../types";
import { ADD_RECORD } from "../actions";

interface ReducerAction extends Action {
  payload: Record;
}

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  day: "2-digit",
  month: "2-digit",
  year: "2-digit",
});

const initialState: AppState = {
  data: [
    {
      date: dateFormatter.format(new Date()),
      property: "438 Capri Court",
      service: "Regular Cleaning",
      cleaner: "Wendy",
      arrival: "4/27/23",
      departure: "4/29/23",
      key: "4280",
      ownerStay: "",
      cost: "375",
    },
    {
      date: dateFormatter.format(new Date()),
      property: "921 Tulip Court",
      arrival: "SHUT WATER",
      departure: "",
      ownerStay: "",
      cleaner: "Wendy",
      service: "Light Cleaning",
      cost: "350",
      key: "9832",
    },
    {
      date: dateFormatter.format(new Date()),
      property: "670 West Palm Ave",
      service: "Light Cleaning",
      cleaner: "Thomas",
      arrival: "4/27/23",
      departure: "5/1/23",
      ownerStay: "OWNER STAY",
      cost: "350",
      key: "0011",
    },
  ],
};

const reducer = (state = initialState, action: ReducerAction) => {
  switch (action.type) {
    case ADD_RECORD:
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    default:
      return state;
  }
};

export default reducer;
