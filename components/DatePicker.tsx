import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const DatePickerComponent: React.FC<any> = (props) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker {...props} />
    </LocalizationProvider>
  );
};

export default DatePickerComponent;
