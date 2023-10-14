import { Table, Button } from "react-bootstrap";
import { formatCurrency, formatDate, formatPercent } from "../helpers/format";
import "./TableComponent.css";

const TableComponent = ({ headers, tableData }) => {
  const valueTypes = Object.values(headers);

  const TableButton = ({ link, label }) => (
    <Button href={link} size="sm">
      {label}
    </Button>
  );

  return (
    <div>
      <Table className="table" striped hover bordered>
        <thead>
          <tr>
            {Object.keys(headers).map((headerKey, idx) => (
              <th key={idx}>{headers[headerKey].label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, rowIdx) => (
            <tr key={rowIdx}>
              {Object.keys(headers).map((headerKey, cellIdx) => {
                const formatter = headers[headerKey].formatter;
                const cellValue = row[headerKey];
                return (
                  <td key={cellIdx}>
                    {formatter === "button" ? (
                      <TableButton
                        label={headers[headerKey].label}
                        link={`${headers[headerKey].link}/${row.id}`}
                      />
                    ) : typeof formatter === "function" ? (
                      formatter(cellValue)
                    ) : (
                      cellValue
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TableComponent;
