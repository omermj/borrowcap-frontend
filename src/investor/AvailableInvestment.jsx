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

const AvailableInvestment = () => {
  const { currentUser } = useContext(UserContext);
  const { id } = useParams();
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  // const [infoLoaded, setInfoLoaded] = useState(false);

  useEffect(() => {
    const getInvestment = async () => {
      const result = await BorrowcapApi.getApprovedRequest(id);
      if (result) {
        setData(result);
        // setInfoLoaded(true);
      }
    };
    // setInfoLoaded(false);
    getInvestment();
  }, [id]);

  if (!data) return <LoadingSpinner />;

  return (
    <div>
      <h3 className="text-center mb-4">Investment Details</h3>
      <Container>
        <Row className="mb-4">
          <Col>
            <div>Amount Requested: {formatCurrency(data.amtRequested)}</div>
            <div>Amount Approved: {formatCurrency(data.amtApproved)}</div>
            <div>Amount Funded: {formatCurrency(data.amtFunded)}</div>
            <div>Loan Purpose: {data.purpose} </div>
            <div>Application Open Date: {formatDate(data.appOpenDate)}</div>
            <div>
              Application Approval Date: {formatDate(data.appApprovedDate)}
            </div>
          </Col>
          <Col>
            <div>Funding Deadline: {formatDate(data.fundingDeadline)} </div>
            <div>Term: {data.term} months </div>
            <div>Installment Amount: {formatCurrency(data.installmentAmt)}</div>
            <div>
              Borrower&apos;s Income: {formatCurrency(data.annualIncome)}
            </div>
            <div>
              Other Monthly Debt: {formatCurrency(data.otherMonthlyDebt)}
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="form-wrapper">
            <div className="form-inner">
              <Formik
                initialValues={{
                  amount: "",
                }}
                onSubmit={async (values, { setSubmitting, setErrors }) => {
                  values.investorId = currentUser.id;
                  const res = await BorrowcapApi.fundApprovedRequest(
                    id,
                    values
                  );
                  if (!!res) navigate("/investor");
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
                    <Form.Group className="mb-3" controlId="investFormAmount">
                      <Form.Label>Amount</Form.Label>
                      <Form.Control
                        type="number"
                        name="amount"
                        placeholder={`Max amount: ${formatCurrency(
                          data.amtApproved - data.amtFunded
                        )}`}
                        min={0}
                        value={values.amount}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                    <div className="text-center mt-4">
                      <Button
                        variant="primary"
                        type="submit"
                        disabled={isSubmitting}
                        className="px-4 btn-dark"
                      >
                        Invest
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AvailableInvestment;
