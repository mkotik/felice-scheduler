import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { addRecord } from "../actions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import DatePicker from "./DatePicker";
import { Record } from "../types";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
import { properties } from "../sampleData";
import { Property } from "../types";
import dayjs, { Dayjs } from "dayjs";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { AgGridReact } from "ag-grid-react";
import { RefObject } from "react";
import { getUniqueColumnValues } from "../utils";

interface ScheduleFormProps {
  addRecord: (record: Record) => {
    type: string;
    payload: Record;
  };

  gridRef: RefObject<AgGridReact<Record>>;
}

const initialFormDataState: Record = {
  date: "",
  property: "",
  service: "",
  cleaner: "",
  arrival: new Intl.DateTimeFormat("en-US").format(new Date()),
  departure: new Intl.DateTimeFormat("en-US").format(new Date()),
  key: "",
  ownerStay: "",
  cost: "",
};
const ScheduleForm: React.FC<ScheduleFormProps> = ({ addRecord, gridRef }) => {
  const [shutWaterEnabled, setShutWaterEnabled] = useState<boolean>(false);
  const [formData, setFormData] = useState<Record>(initialFormDataState);
  const handleClick = () => {
    console.log(formData);
    if (formData == initialFormDataState || !formData.property) return;
    if (shutWaterEnabled) {
      const newFormData = { ...formData };
      newFormData.arrival = "Shut Water";
      newFormData.departure = "";
      addRecord(newFormData);
    } else {
      addRecord(formData);
    }
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

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const handleShutWaterChange = (e: React.SyntheticEvent) => {
    const event = e as React.ChangeEvent<HTMLInputElement>;
    setShutWaterEnabled(event.target.checked);
  };

  const handleOwnerStay = (e: React.SyntheticEvent) => {
    const event = e as React.ChangeEvent<HTMLInputElement>;
    setFormData({
      ...formData,
      ownerStay: event.target.checked ? "OWNER STAY" : "",
    });
  };

  const handleExportCleaners = () => {
    if (gridRef.current) {
      const cleaners = Array.from(getUniqueColumnValues("cleaner", gridRef));
      cleaners.forEach((cleaner) => {
        const params = {
          fileName: `${cleaner}-${new Date().toISOString().slice(0, 10)}`,
        };
        const filterModel = {
          cleaner: { filterType: "set", values: [cleaner] },
        };
        if (gridRef.current) {
          gridRef.current.api.setFilterModel(filterModel);
          gridRef.current.api.exportDataAsExcel(params);
        }
      });
      gridRef.current.api.setFilterModel({});
    }
  };
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

      <Box sx={{ display: "flex" }}>
        <DatePicker
          sx={{ marginBottom: 2, width: 300, marginRight: "20px" }}
          label="Arrival Date"
          onChange={(date: Dayjs) =>
            setFormData({
              ...formData,
              arrival: date.locale("en").format("M/D/YYYY"),
            })
          }
          disabled={shutWaterEnabled}
          value={dayjs(formData.arrival)}
        />
        <p>Or</p>
        <FormControlLabel
          sx={{ marginLeft: "20px", marginBottom: "20px" }}
          control={<Checkbox />}
          label="Shut Water"
          onChange={handleShutWaterChange}
        />
      </Box>
      <DatePicker
        sx={{ marginBottom: 2, width: 300 }}
        label="Departure Date"
        onChange={(date: Dayjs) =>
          setFormData({
            ...formData,
            departure: date.locale("en").format("M/D/YYYY"),
          })
        }
        disabled={shutWaterEnabled}
        value={dayjs(formData.departure)}
      />
      <FormControlLabel
        control={<Checkbox />}
        label="Owner Stay"
        onChange={handleOwnerStay}
      />
      <Box>
        <Button
          variant="contained"
          onClick={handleClick}
          sx={{ width: 150, marginBottom: 2 }}
        >
          Add Record
        </Button>
        <Button
          variant="contained"
          onClick={handleExportCleaners}
          sx={{ width: 200, marginBottom: 2, marginLeft: 2 }}
        >
          Export Cleaners
        </Button>
      </Box>
    </div>
  );
};

const mapDispatchToProps = {
  addRecord,
};

export default connect(null, mapDispatchToProps)(ScheduleForm);
