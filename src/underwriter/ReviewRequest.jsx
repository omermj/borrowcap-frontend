import { Container, Row, Col } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BorrowcapApi from "../api/api";
import LoadingSpinner from "../common/LoadingSpinner";
import { formatCurrency, formatDate, formatPercent } from "../helpers/format";
import { Formik } from "formik";
import { Form, Button } from "react-bootstrap";
import UserContext from "../auth/UserContext";

/** Displays a single Available Investment */

const ReviewRequest = ({ terms }) => {
  const { currentUser } = useContext(UserContext);
  const { id } = useParams();
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getReviewRequest = async () => {
      const result = await BorrowcapApi.getActiveRequest(id);
      if (result) {
        setData(result);
      }
    };
    getReviewRequest();
  }, [id]);

  if (!data) return <LoadingSpinner />;

  const handleReject = async () => {
    const res = await BorrowcapApi.rejectRequest(id);
    if (!!res) navigate("/underwriter");
  };

  return (
    <div>
      {console.log(data)}
      <h3>Loan Request Details</h3>
      <Container>
        <Row>
          <Col>
            <div>Amount Requested: {formatCurrency(data.amtRequested)}</div>
            <div>Loan Purpose: {data.purpose} </div>
            <div>Application Open Date: {formatDate(data.appOpenDate)}</div>
            <div>Term: {data.term} months </div>
            <div>Interest Rate: {formatPercent(data.interestRate)} </div>
            <div>Installment Amount: {formatCurrency(data.installmentAmt)}</div>
          </Col>
          <Col>
            <div>Username: {data.username}</div>
            <div>First Name: {data.firstName}</div>
            <div>Last Name: {data.lastName}</div>
            <div>Email: {data.email}</div>
            <div>Account Balance: {data.accountBalance}</div>
            <div>
              Borrower&apos;s Income: {formatCurrency(data.annualIncome)}
            </div>
            <div>
              Other Monthly Debt: {formatCurrency(data.otherMonthlyDebt)}
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <Formik
              initialValues={{
                amtApproved: "",
                interestRate: "",
                term: "",
              }}
              onSubmit={async (values, { setSubmitting, setErrors }) => {
                const res = await BorrowcapApi.approveRequest(id, values);
                if (!!res) navigate("/underwriter");
              }}
            >
              {({
                values,
                errors,
                handleChange,
                handleSubmit,
                isSubmitting,
              }) => (
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="approvalFormAmount">
                    <Form.Label>Approved Amount</Form.Label>
                    <Form.Control
                      type="number"
                      name="amtApproved"
                      min={0}
                      value={values.amtApproved}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="approvalFormInterest">
                    <Form.Label>Interest Rate</Form.Label>
                    <Form.Control
                      type="number"
                      name="interestRate"
                      min={0}
                      max={1}
                      step={0.001}
                      value={values.interestRate}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="approvalFormTerm">
                    <Form.Label>Term</Form.Label>
                    <Form.Select
                      aria-label="Term Select"
                      name="term"
                      onChange={handleChange}
                    >
                      <option>Select loan term</option>
                      {terms.map((term, idx) => (
                        <option key={idx} value={term.months}>
                          {term.months} months
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  <Button
                    variant="success"
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-4"
                  >
                    Approve
                  </Button>
                  <Button
                    variant="danger"
                    disabled={isSubmitting}
                    className="mt-4"
                    onClick={handleReject}
                  >
                    Reject
                  </Button>
                </Form>
              )}
            </Formik>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ReviewRequest;
