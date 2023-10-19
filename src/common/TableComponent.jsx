import { Table, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import "./TableComponent.css";

const TableComponent = ({ headers, tableData }) => {
  const [data, setData] = useState(tableData);

  const TableButton = ({ link, label, onClick, icon }) => (
    <Button
      className="btn-dark"
      href={onClick ? null : link}
      size="sm"
      onClick={onClick ? onClick : null}
    >
      {icon ? icon() : label}
    </Button>
  );

  useEffect(() => {
    if (tableData) {
      setData(tableData);
    }
  }, [tableData]);

  return (
    <div>
      <Table className="table" striped hover borderless>
        <thead>
          <tr className="align-middle">
            {Object.keys(headers).map((headerKey, idx) => (
              <th key={idx}>{headers[headerKey].label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIdx) => (
            <tr key={rowIdx} className="align-middle">
              {Object.keys(headers).map((headerKey, cellIdx) => {
                const formatter = headers[headerKey].formatter;
                const cellValue = row[headerKey];
                return (
                  <td key={cellIdx}>
                    {formatter === "button" ? (
                      <TableButton
                        label={
                          headers[headerKey].icon
                            ? headers[headerKey].icon()
                            : headers[headerKey].label
                        }
                        link={`${headers[headerKey].link}/${row.id}`}
                        onClick={
                          headers[headerKey].onClick
                            ? async () =>
                                await headers[headerKey].onClick(row.id)
                            : null
                        }
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
