import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css";
import { connect } from "react-redux";
import { AppState, Record } from "../types";

const ScheduleGrid: React.FC<{ data: Record[] }> = ({ data }) => {
  console.log(data);
  // Define column definitions and row data
  const columnDefs = [
    { field: "date", filter: true },
    { field: "property", filter: true },
    { field: "service", filter: true },
    { field: "cleaner", filter: true },
    { field: "cost", filter: true },
    { field: "arrival", filter: true },
    { field: "key", filter: true },
    { field: "ownerStay", filter: true },
  ];

  const rowData = [
    {
      date: "4/24/23",
      property: "438 Capri Court",
      service: "Regular Cleaning",
      cleaner: "Wendy",
      arrival: "4/27/23",
      key: "693",
      ownerStay: "",
    },
    {
      date: "4/24/23",
      property: "921 Tulip Court",
      service: "Regular Cleaning",
      cleaner: "Thomas",
      arrival: "SHUT WATER",
      key: "968",
      ownerStay: "",
    },
    {
      date: "4/27/23",
      property: "670 West Palm Ave",
      service: "Deep Cleaning",
      cleaner: "Wendy",
      arrival: "4/27/23",
      key: "874",
      ownerStay: "",
    },
  ];

  return (
    <div
      className="ag-grid ag-theme-alpine"
      style={{ height: "90vh", width: "100%" }}
    >
      <AgGridReact columnDefs={columnDefs} rowData={data} />
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  data: state.data,
});

//@ts-ignore
export default connect(mapStateToProps, null, null, { pure: false })(
  ScheduleGrid
);
