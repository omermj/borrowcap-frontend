import { Container, Row, Col } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BorrowcapApi from "../api/api";
import LoadingSpinner from "../common/LoadingSpinner";
import { formatCurrency, formatDate, formatPercent } from "../helpers/format";
import { Form, Button } from "react-bootstrap";
import UserContext from "../auth/UserContext";

/** Displays a single Available Investment */

const ApprovedLoan = () => {
  const { currentUser } = useContext(UserContext);
  const { id } = useParams();
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getApprovedRequest = async () => {
      const result = await BorrowcapApi.getApprovedRequest(id);
      if (result) {
        setData(result);
      }
    };
    getApprovedRequest();
  }, [id]);

  const handleEnableFunding = async () => {
    const result = await BorrowcapApi.enableFundingForApprovedRequest(id);
    if (result) setData({ ...data, availableForFunding: true });
  };

  const handleCancelRequest = async () => {
    const result = await BorrowcapApi.cancelApprovedRequest(id);
    if (result) navigate("/borrower");
  };

  if (!data) return <LoadingSpinner />;

  return (
    <div>
      <h3>Approved Request Details</h3>
      <Container>
        <Row>
          <Col>
            <div>Amount Requested: {formatCurrency(data.amtRequested)}</div>
            <div>Amount Approved: {formatCurrency(data.amtApproved)}</div>
            <div>Amount Funded: {formatCurrency(data.amtFunded)}</div>
            <div>Loan Purpose: {data.purpose} </div>
            <div>Application Open Date: {formatDate(data.appOpenDate)}</div>
          </Col>
          <Col>
            <div>
              Application Approval Date: {formatDate(data.appApprovedDate)}
            </div>
            <div>Funding Deadline: {formatDate(data.fundingDeadline)} </div>
            <div>Term: {data.term} months </div>
            <div>Installment Amount: {formatCurrency(data.installmentAmt)}</div>
            <div>
              Funding Enabled: {data.availableForFunding ? "Yes" : "No"}
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button
              onClick={handleEnableFunding}
              disabled={data.availableForFunding}
              variant="success"
              className="me-3"
            >
              Enable Funding
            </Button>
            <Button onClick={handleCancelRequest} variant="danger">
              Cancel Request
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ApprovedLoan;
