import { Container, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { formatCurrency, formatDate } from "../helpers/format";
import BorrowcapApi from "../api/api";
import LoadingSpinner from "../common/LoadingSpinner";
import { useSelector } from "react-redux";

/** Displays a single Available Investment */

const ApprovedRequest = () => {
  const currentUser = useSelector((state) => state.userState.user);
  const { id } = useParams();
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  const notifyEnableFunding = () =>
    toast.success("Funding has been enabled on the approved request.");
  const notifyCancelRequest = () =>
    toast.info("Approved request has been cancelled.");

  useEffect(() => {
    const getApprovedRequest = async () => {
      BorrowcapApi.token = currentUser.token;
      const result = await BorrowcapApi.getApprovedRequest(id);
      if (result) {
        setData(result);
      }
    };
    getApprovedRequest();
  }, [id]);

  const handleEnableFunding = async () => {
    BorrowcapApi.token = currentUser.token;
    const result = await BorrowcapApi.enableFundingForApprovedRequest(id);
    if (result) {
      setData((prevData) => ({
        ...prevData,
        availableForFunding: true,
      }));
    }
    notifyEnableFunding();
  };

  const handleCancelRequest = async () => {
    BorrowcapApi.token = currentUser.token;
    const result = await BorrowcapApi.cancelApprovedRequest(id);
    if (result) navigate("/borrower");
    notifyCancelRequest();
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
        <Row className="mt-4">
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

export default ApprovedRequest;
