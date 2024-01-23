import { DataGrid } from "@mui/x-data-grid";

const MUITable = ({ headers, tableData }) => {
  return (
    <div>
      <DataGrid
        columns={headers}
        rows={tableData}
        sx={{
          minWidth: "800px",
          width: "100%",
          overflowX: "scroll",
          marginTop: "10px",
          border: 0,
          "& .MuiDataGrid-columnHeadersInner": {
            backgroundColor: "#4f4f4f",
            color: "white !important",
            fontWeight: "bold",
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: "#d6d6d6",
          },
          ".MuiTablePagination-displayedRows, .MuiTablePagination-selectLabel":
            {
              marginTop: "1em",
              marginBottom: "1em",
            },
          "& .MuiDataGrid-columnSeparator, .MuiDataGrid-menuIcon, .MuiButtonBase-root":
            {
              color: "white",
            },
        }}
      />
    </div>
  );
};
export default MUITable;
