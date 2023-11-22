import { Container, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BorrowcapApi from "../api/api";
import LoadingSpinner from "../common/LoadingSpinner";
import { formatCurrency, formatDate, formatPercent } from "../helpers/format";
import { Formik } from "formik";
import { Form, Button } from "react-bootstrap";
import FormError from "../common/FormError";
import * as Yup from "yup";

/** Displays a single Available Investment */

const ReviewRequest = ({ terms }) => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  const reviewSchema = Yup.object().shape({
    amtApproved: Yup.number()
      .min(1, "Can't be negative or zero")
      .required("Required"),
    interestRate: Yup.number()
      .min(0.0001, "Can't be less than 0.01% or zero")
      .max(1, "Can't be greater than 100%")
      .required("Required"),
    term: Yup.string().required("Required"),
  });

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
      <h3 className="mb-4">Loan Request Details</h3>
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
            <div>Account Balance: {formatCurrency(data.accountBalance)}</div>
            <div>
              Borrower&apos;s Income: {formatCurrency(data.annualIncome)}
            </div>
            <div>
              Other Monthly Debt: {formatCurrency(data.otherMonthlyDebt)}
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="form-wrapper mt-3">
            <div className="form-inner">
              <Formik
                initialValues={{
                  amtApproved: "",
                  interestRate: "",
                  term: "",
                }}
                validationSchema={reviewSchema}
                onSubmit={async (values, { setSubmitting, setStatus }) => {
                  try {
                    const res = await BorrowcapApi.approveRequest(id, values);
                    if (!!res) navigate("/underwriter");
                  } catch (e) {
                    setStatus({ error: e });
                  }
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  status,
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
                        value={values.amtApproved}
                        onChange={handleChange}
                      />
                      {errors.amtApproved && touched.amtApproved ? (
                        <FormError msg={errors.amtApproved} field />
                      ) : null}
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="approvalFormInterest"
                    >
                      <Form.Label>Interest Rate</Form.Label>
                      <Form.Control
                        type="number"
                        name="interestRate"
                        step={0.001}
                        value={values.interestRate}
                        onChange={handleChange}
                      />
                      {errors.interestRate && touched.interestRate ? (
                        <FormError msg={errors.interestRate} field />
                      ) : null}
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
                      {errors.term && touched.term ? (
                        <FormError msg={errors.term} field />
                      ) : null}
                    </Form.Group>

                    {/* Display server error message */}
                    {status && status.error && <FormError msg={status.error} />}

                    <div className="mt-4 text-center">
                      <Button
                        variant="success"
                        type="submit"
                        disabled={isSubmitting}
                        className="me-3 px-3"
                      >
                        Approve
                      </Button>
                      <Button
                        variant="danger"
                        disabled={isSubmitting}
                        className="me-3 px-4"
                        onClick={handleReject}
                      >
                        Reject
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

export default ReviewRequest;
