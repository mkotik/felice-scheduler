import { Action } from "redux";
import { AppState, Record } from "../types";
import { ADD_RECORD } from "../actions";

interface ReducerAction extends Action {
  payload: Record;
}

const initialState: AppState = {
  data: [
    {
      date: "4/24/23",
      property: "438 Capri Court",
      service: "Regular Cleaning",
      cleaner: "Wendy",
      arrival: "4/27/23",
      key: "693",
      ownerStay: "",
      cost: "0",
    },
    {
      date: "4/24/23",
      property: "921 Tulip Court",
      service: "Regular Cleaning",
      cleaner: "Thomas",
      arrival: "SHUT WATER",
      key: "968",
      ownerStay: "",
      cost: "0",
    },
    {
      date: "4/27/23",
      property: "670 West Palm Ave",
      service: "Deep Cleaning",
      cleaner: "Wendy",
      arrival: "4/27/23",
      key: "874",
      ownerStay: "",
      cost: "0",
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
