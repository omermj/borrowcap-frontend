import { Col, Container, Row } from "react-bootstrap";
import { Formik } from "formik";
import { Form, Button } from "react-bootstrap";
import BorrowcapApi from "../api/api";
import { formatCurrency } from "../helpers/format";
import { useState, useContext } from "react";
import UserContext from "../auth/UserContext";
import FormError from "./FormError";
import * as Yup from "yup";

/** Component for Wallet for Borrowers and Investors */

const Wallet = () => {
  const { currentUser } = useContext(UserContext);
  const [accountBalance, setAccountBalance] = useState(
    currentUser.accountBalance
  );

  const amountSchema = Yup.object().shape({
    amount: Yup.number().min(1, "Can't be less than 0").required("Required"),
  });

  return (
    <div className="form-wrapper mx-4">
      <Container>
        <Row>
          <Col>
            <h3 className="mb-4 text-center">
              Account Balance: {formatCurrency(accountBalance)}
            </h3>
          </Col>
        </Row>
        <Row>
          <Col className="form-inner">
            <h6 className="mb-3 text-center">Deposit Funds</h6>
            <Formik
              initialValues={{
                amount: "",
              }}
              validationSchema={amountSchema}
              onSubmit={async (values, { setSubmitting, setStatus }) => {
                try {
                  values.id = currentUser.id;
                  const res = await BorrowcapApi.depositFunds(
                    currentUser.id,
                    values
                  );
                  if (!!res) {
                    setAccountBalance(res.accountBalance);
                    values.amount = "";
                    setStatus({ error: null });
                  }
                } catch (e) {
                  setStatus({ error: e });
                }
              }}
            >
              {({
                values,
                errors,
                status,
                touched,
                handleChange,
                handleSubmit,
                isSubmitting,
              }) => (
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-2" controlId="depositFormAmount">
                    <Form.Control
                      type="number"
                      name="amount"
                      value={values.amount}
                      onChange={handleChange}
                      placeholder="Enter deposit amount"
                    />
                    {errors.amount && touched.amount ? (
                      <FormError msg={errors.amount} field />
                    ) : null}
                  </Form.Group>

                  {/* Display server error message */}
                  {status && status.error && <FormError msg={status.error} />}

                  <div className="text-center">
                    <Button
                      variant="primary"
                      type="submit"
                      disabled={isSubmitting}
                      className="mt-3 px-4 btn-dark"
                    >
                      Deposit
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </Col>
          <Col className="form-inner mx-4">
            <h6 className="mb-3 text-center">Withdraw Funds</h6>
            <Formik
              initialValues={{
                amount: "",
              }}
              validationSchema={amountSchema}
              onSubmit={async (values, { setSubmitting, setStatus }) => {
                try {
                  values.id = currentUser.id;
                  const res = await BorrowcapApi.withdrawFunds(
                    currentUser.id,
                    values
                  );
                  if (!!res) {
                    setAccountBalance(res.accountBalance);
                    values.amount = "";
                    setStatus({ error: null });
                  }
                } catch (e) {
                  setStatus({ error: e });
                }
              }}
            >
              {({
                values,
                errors,
                status,
                touched,
                handleChange,
                handleSubmit,
                isSubmitting,
              }) => (
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-2" controlId="withdrawFormAmount">
                    <Form.Control
                      type="number"
                      name="amount"
                      value={values.amount}
                      onChange={handleChange}
                      placeholder="Enter withdrawal amount"
                    />
                    {errors.amount && touched.amount ? (
                      <FormError msg={errors.amount} field />
                    ) : null}
                  </Form.Group>

                  {/* Display server error message */}
                  {status && status.error && <FormError msg={status.error} />}

                  <div className="text-center">
                    <Button
                      variant="primary"
                      type="submit"
                      disabled={isSubmitting}
                      className="mt-3 px-4 btn-dark"
                    >
                      Withdraw
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Wallet;
