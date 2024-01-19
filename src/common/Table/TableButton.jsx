import { Link } from "react-router-dom";

const TableButton = ({ link, label, onClick, icon, testId }) => (
  <Link
    data-testid={testId ? testId : null}
    className="btn btn-dark btn-sm"
    to={onClick ? null : link}
    size="sm"
    onClick={onClick ? onClick : null}
  >
    {icon ? icon() : label}
  </Link>
);
export default TableButton;
