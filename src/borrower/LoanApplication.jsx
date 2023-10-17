import { useContext } from "react";
import { Formik, ErrorMessage } from "formik";
import { Form, Button } from "react-bootstrap";
import UserContext from "../auth/UserContext";
import { useNavigate } from "react-router-dom";

/** Loan Application Form */

const LoanApplicationForm = ({ purposes, terms }) => {
  const { currentUser, BorrowcapApi } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <div>
      <h3>Loan Application</h3>
      <Formik
        initialValues={{
          amtRequested: "",
          purposeId: "",
          term: "",
        }}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          try {
            values.purposeId = +values.purposeId;
            values.borrowerId = currentUser.id;
            const result = await BorrowcapApi.submitLoanApplication(values);
            if (!!result) navigate("/borrower");
          } catch (e) {
            console.log("Error:", e);
            setErrors({
              submission: e,
            });
          }
          setSubmitting(false);
        }}
      >
        {({
          values,
          errors,
          touched,
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
            </Form.Group>

            {/* Display error message for submission */}
            {errors.submission &&
              errors.submission.map((error, idx) => (
                <div key={idx} className="text-danger">
                  {error}
                </div>
              ))}
            <Button
              variant="primary"
              type="submit"
              disabled={isSubmitting}
              className="mt-4"
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoanApplicationForm;
