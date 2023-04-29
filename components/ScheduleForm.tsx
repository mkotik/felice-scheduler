import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { addRecord } from "../actions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import DatePicker from "./DatePicker";
import { Record } from "../types";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
import { properties } from "../sampleData";
import { Property } from "../types";
import dayjs from "dayjs";

interface ScheduleFormProps {
  addRecord: (record: Record) => {
    type: string;
    payload: Record;
  };
}

const initialFormDataState = {
  date: "",
  property: "",
  service: "",
  cleaner: "",
  arrival: dayjs(new Date()),
  key: "",
  ownerStay: "",
  cost: "",
};
const ScheduleForm: React.FC<ScheduleFormProps> = ({ addRecord }) => {
  const [formData, setFormData] = useState<Record>(initialFormDataState);
  const handleClick = () => {
    console.log(formData);
    if (formData == initialFormDataState || !formData.property) return;
    addRecord(formData);
  };

  const handlePropertyChange = (
    e: React.SyntheticEvent,
    property: Property | null
  ) => {
    console.log(property);
    if (property) {
      const newFormData = { ...formData };
      const formattedDate = new Intl.DateTimeFormat("en-US").format(new Date());
      newFormData.property = property.name;
      newFormData.cost = property.cost;
      newFormData.service = property.service;
      newFormData.cleaner = property.cleaner;
      newFormData.key = property.key;
      newFormData.date = formattedDate;
      newFormData.ownerStay = "";
      setFormData(newFormData);
    } else {
      setFormData({
        ...formData,
        property: "",
        cost: "",
        service: "",
        cleaner: "",
        key: "",
      });
      return;
    }
  };

  const handleDateChange = (date: string) => {
    setFormData({ ...formData, arrival: date });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        width: "100%",
        flexDirection: "column",
      }}
    >
      <Autocomplete
        onChange={handlePropertyChange}
        disablePortal
        options={properties}
        sx={{ marginBottom: 2, width: 300 }}
        // freeSolo
        renderInput={(params) => <TextField {...params} label="Property" />}
        renderOption={(props, option, { inputValue }) => {
          const matches = match(option.label, inputValue, {
            insideWords: true,
          });
          const parts = parse(option.label, matches);

          return (
            <li {...props}>
              <div>
                {parts.map((part, index) => (
                  <span
                    key={index}
                    style={{
                      fontWeight: part.highlight ? 700 : 400,
                    }}
                  >
                    {part.text}
                  </span>
                ))}
              </div>
            </li>
          );
        }}
      />

      <DatePicker
        sx={{ marginBottom: 2, width: 300 }}
        label="Arrival Date"
        onChange={handleDateChange}
        value={formData.arrival}
      />
      <Button
        variant="contained"
        onClick={handleClick}
        sx={{ width: 150, marginBottom: 2 }}
      >
        Add Record
      </Button>
    </div>
  );
};

const mapDispatchToProps = {
  addRecord,
};

export default connect(null, mapDispatchToProps)(ScheduleForm);
