import { useContext } from "react";
import { Formik } from "formik";
import { Form, Button } from "react-bootstrap";
import UserContext from "../auth/UserContext";
import { useNavigate } from "react-router-dom";
import FormError from "../common/FormError";
import * as Yup from "yup";

/** Loan Application Form */

const LoanApplicationForm = ({ purposes, terms }) => {
  const { currentUser, BorrowcapApi } = useContext(UserContext);
  const navigate = useNavigate();

  // validation schema
  const loanApplicationSchema = Yup.object().shape({
    amtRequested: Yup.number()
      .min(1, "Can't be negative or zero")
      .required("Required"),
    purposeId: Yup.number().min(0, "Required").required("Required"),
    term: Yup.string().required("Required"),
  });

  return (
    <div className="form-wrapper">
      <div className="form-inner">
        <h3 className="mb-4 text-center">Loan Application</h3>
        <Formik
          initialValues={{
            amtRequested: "",
            purposeId: "",
            term: "",
          }}
          validationSchema={loanApplicationSchema}
          onSubmit={async (values, { setSubmitting, setStatus }) => {
            try {
              values.purposeId = +values.purposeId;
              values.borrowerId = currentUser.id;
              const result = await BorrowcapApi.submitLoanApplication(values);
              if (!!result) navigate("/borrower");
            } catch (e) {
              console.log("Error:", e);
              setStatus({
                error: e,
              });
            }
            setSubmitting(false);
          }}
        >
          {({
            values,
            errors,
            touched,
            status,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="loanFormAmount">
                <Form.Label>Amount</Form.Label>
                <Form.Control
                  type="number"
                  name="amtRequested"
                  placeholder=""
                  value={values.amtRequested}
                  onChange={handleChange}
                  required
                />
                {errors.amtRequested && touched.amtRequested ? (
                  <FormError msg={errors.amtRequested} field />
                ) : null}
              </Form.Group>
              <Form.Group className="mb-3" controlId="loanFormTerm">
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
              <Form.Group>
                <Form.Label>Purpose</Form.Label>
                <div>
                  {Object.entries(purposes).map(([purpose, id]) => (
                    <Form.Check
                      key={id}
                      inline
                      label={purpose}
                      name="purposeId"
                      type="radio"
                      id={`purpose-${purpose}`}
                      value={id}
                      onChange={handleChange}
                    />
                  ))}
                </div>
                {errors.purposeId && touched.purposeId ? (
                  <FormError msg={errors.purposeId} field />
                ) : null}
              </Form.Group>

              {/* Display server error message */}
              {status && status.error && <FormError msg={status.error} />}

              <div className="d-grid">
                <Button
                  variant="primary"
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-4 btn-dark"
                >
                  Apply
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoanApplicationForm;
