import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Formik } from "formik";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import FormError from "../common/FormError";
import * as Yup from "yup";
import BorrowcapApi from "../api/api";

/** Loan Application Form */

const LoanApplicationForm = () => {
  const currentUser = useSelector((state) => state.userState.user);
  const [purposes, setPurposes] = useState([]);
  const [terms, setTerms] = useState([]);
  const navigate = useNavigate();

  const notifySuccess = () =>
    toast.success("Loan application created successfully.");

  // validation schema
  const loanApplicationSchema = Yup.object().shape({
    amtRequested: Yup.number()
      .min(1, "Can't be negative or zero")
      .required("Required"),
    purposeId: Yup.number().min(0, "Required").required("Required"),
    term: Yup.string().required("Required"),
  });

  // Get purposes and terms
  useEffect(() => {
    const getPurposesAndTerms = async () => {
      try {
        BorrowcapApi.token = currentUser.token;
        const purposes = await BorrowcapApi.getPurposes();
        const terms = await BorrowcapApi.getTerms();
        setPurposes(purposes);
        setTerms(terms);
      } catch (e) {
        console.error("Error: ", e);
      }
    };
    getPurposesAndTerms();
  }, [currentUser.token]);

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
            console.log(values);
            try {
              values.purposeId = +values.purposeId;
              values.borrowerId = currentUser.id;
              BorrowcapApi.token = currentUser.token;
              const result = await BorrowcapApi.submitLoanApplication(values);
              if (!!result) {
                navigate("/borrower");
                notifySuccess();
              }
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
              <Form.Group className="mb-3" controlId="loanFormPurpose">
                <Form.Label>Purpose</Form.Label>
                <Form.Select
                  aria-label="Purpose Select"
                  name="purposeId"
                  onChange={handleChange}
                >
                  <option>Select loan purpose</option>
                  {Object.entries(purposes).map(([purpose, id]) => (
                    <option key={id} value={id}>
                      {purpose}
                    </option>
                  ))}
                </Form.Select>
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
