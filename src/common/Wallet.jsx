import { Col, Container, Row } from "react-bootstrap";
import { Formik } from "formik";
import { Form, Button } from "react-bootstrap";
import { formatCurrency } from "../helpers/format";
import { useState } from "react";
import { toast } from "react-toastify";
import BorrowcapApi from "../api/api";
import { useSelector, useDispatch } from "react-redux";
import { updateAccountBalance } from "../features/user/userSlice";
import FormError from "./FormError";
import * as Yup from "yup";

/** Component for Wallet for Borrowers and Investors */

const Wallet = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.userState.user);

  const amountSchema = Yup.object().shape({
    amount: Yup.number()
      .min(1, "Can't be negative or zero")
      .required("Required"),
  });

  const notifyDeposit = () =>
    toast.success("Amount has been deposited successfully.");
  const notifyWithdraw = () =>
    toast.success("Amount has been withdrawn successfully.");

  return (
    <div className="form-wrapper mx-4">
      <Container>
        <Row>
          <Col>
            <h3 className="mb-4 text-center">
              Account Balance: {formatCurrency(currentUser.accountBalance)}
            </h3>
          </Col>
        </Row>
        <Row className="">
          <div className="col-md-6 form-inner mx-auto my-4">
            <h6 className="mb-3 text-center">Deposit Funds</h6>
            <Formik
              initialValues={{
                amount: "",
              }}
              validationSchema={amountSchema}
              onSubmit={async (values, { setSubmitting, setStatus }) => {
                try {
                  values.id = currentUser.id;
                  BorrowcapApi.token = currentUser.token;
                  const res = await BorrowcapApi.depositFunds(
                    currentUser.id,
                    values
                  );
                  if (!!res) {
                    dispatch(updateAccountBalance(res.accountBalance));
                    values.amount = "";
                    setStatus({ error: null });
                  }
                  notifyDeposit();
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
          </div>
          <div className="col-md-6 form-inner mx-auto my-4">
            <h6 className="mb-3 text-center">Withdraw Funds</h6>
            <Formik
              initialValues={{
                amount: "",
              }}
              validationSchema={amountSchema}
              onSubmit={async (values, { setSubmitting, setStatus }) => {
                try {
                  values.id = currentUser.id;
                  BorrowcapApi.token = currentUser.token;
                  const res = await BorrowcapApi.withdrawFunds(
                    currentUser.id,
                    values
                  );
                  if (!!res) {
                    dispatch(updateAccountBalance(res.accountBalance));
                    values.amount = "";
                    setStatus({ error: null });
                  }
                  notifyWithdraw();
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
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default Wallet;
