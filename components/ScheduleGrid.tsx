import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css";
import { connect } from "react-redux";
import { RefObject } from "react";
import { AppState, Record } from "../types";

const ScheduleGrid: React.FC<{
  data: Record[];
  gridRef: RefObject<AgGridReact<Record>>;
}> = ({ data, gridRef }) => {
  // Define column definitions and row data
  const columnDefs = [
    { field: "date", filter: true },
    { field: "property", filter: true },
    { field: "service", filter: true },
    { field: "cleaner", filter: true },
    { field: "cost", filter: true },
    { field: "arrival", filter: true },
    { field: "departure", filter: true },
    { field: "key", filter: true },
    { field: "ownerStay", filter: true },
  ];

  return (
    <div
      className="ag-grid ag-theme-alpine"
      style={{ height: "90vh", width: "100%" }}
    >
      <AgGridReact columnDefs={columnDefs} rowData={data} ref={gridRef} />
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  data: state.data,
});

ScheduleGrid.displayName = "ScheduleGrid";

//@ts-ignore
export default connect(mapStateToProps, null, null, { pure: false })(
  ScheduleGrid
);
