import Table from "react-bootstrap/Table";
import { formatCurrency, formatDate, formatPercent } from "../helpers/format";
import "./TableComponent.css";

const TableComponent = ({ tableData }) => {
  const headers = Object.keys(tableData[0]);
  return (
    <div>
      <Table className="table" striped hover bordered>
        <thead>
          <tr>
            {headers.map((header, idx) => (
              <th key={idx}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, rowIdx) => (
            <tr key={rowIdx}>
              {Object.values(row).map((cell, cellIdx) => (
                <td key={cellIdx}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TableComponent;
