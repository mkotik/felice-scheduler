import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css";

const ScheduleGrid: React.FC = () => {
  // Define column definitions and row data
  const columnDefs = [
    { headerName: "Name", field: "name" },
    { headerName: "Age", field: "age" },
    { headerName: "City", field: "city" },
  ];

  const rowData = [
    { name: "John", age: 25, city: "New York" },
    { name: "Jane", age: 28, city: "Los Angeles" },
    { name: "Mark", age: 30, city: "San Francisco" },
  ];

  return (
    <div
      className="ag-theme-alpine"
      style={{ height: "200px", width: "600px" }}
    >
      <AgGridReact columnDefs={columnDefs} rowData={rowData} />
    </div>
  );
};

export default ScheduleGrid;
