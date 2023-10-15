import { Col, Container, Row } from "react-bootstrap";
import { Formik } from "formik";
import { Form, Button } from "react-bootstrap";
import BorrowcapApi from "../api/api";
import { formatCurrency } from "../helpers/format";
import { useState, useContext } from "react";
import UserContext from "../auth/UserContext";

/** Component for Wallet for Borrowers and Investors */

const Wallet = () => {
  const { currentUser } = useContext(UserContext);
  const [accountBalance, setAccountBalance] = useState(
    currentUser.accountBalance
  );

  return (
    <div>
      <Container>
        <Row>
          <Col>
            <h3>Account Balance: {formatCurrency(accountBalance)}</h3>
          </Col>
        </Row>
        <Row>
          <Col>
            <h4>Deposit Funds</h4>
            <Formik
              initialValues={{
                amount: "",
              }}
              onSubmit={async (values, { setSubmitting, setErrors }) => {
                values.id = currentUser.id;
                const res = await BorrowcapApi.depositFunds(
                  currentUser.id,
                  values
                );
                if (!!res) {
                  setAccountBalance(res.accountBalance);
                  values.amount = "";
                }
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
                  <Form.Group className="mb-0" controlId="depositFormAmount">
                    <Form.Control
                      type="number"
                      name="amount"
                      min={0}
                      value={values.amount}
                      onChange={handleChange}
                      placeholder="Enter deposit amount"
                      required
                    />
                  </Form.Group>
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-3"
                  >
                    Deposit
                  </Button>
                </Form>
              )}
            </Formik>
          </Col>
          <Col>
            {" "}
            <h4>Withdraw Funds</h4>
            <Formik
              initialValues={{
                amount: "",
              }}
              onSubmit={async (values, { setSubmitting, setErrors }) => {
                values.id = currentUser.id;
                const res = await BorrowcapApi.withdrawFunds(
                  currentUser.id,
                  values
                );
                if (!!res) {
                  setAccountBalance(res.accountBalance);
                  values.amount = "";
                }
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
                  <Form.Group className="mb-0" controlId="withdrawFormAmount">
                    <Form.Control
                      type="number"
                      name="amount"
                      min={0}
                      value={values.amount}
                      onChange={handleChange}
                      placeholder="Enter withdrawal amount"
                      required
                    />
                  </Form.Group>
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-3"
                  >
                    Withdraw
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

export default Wallet;
