import { RefObject } from "react";
import { AgGridReact } from "ag-grid-react";
import { Record } from "../types";

export const getUniqueColumnValues = (
  columnId: keyof Record,
  gridRef: RefObject<AgGridReact<Record>>
) => {
  // Iterate over all rows in the grid
  if (gridRef.current) {
    const uniqueValues: Set<string> = new Set();

    gridRef.current.api.forEachNodeAfterFilterAndSort((node) => {
      if (node.data) {
        const value: string = node.data[columnId].toString();
        uniqueValues.add(value);
      }
    });

    return uniqueValues;
  } else {
    return [];
  }
};
