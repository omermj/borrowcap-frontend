import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { Form, Button } from "react-bootstrap";
import FormError from "../common/FormError";
import * as Yup from "yup";

/** Signup Form */

const SignupForm = ({ signup, roles }) => {
  const navigate = useNavigate();

  // validation schema
  const signupSchema = Yup.object().shape({
    username: Yup.string()
      .min(4, "Too short!")
      .max(25, "Too long!")
      .required("Required"),
    password: Yup.string()
      .min(6, "Too short!")
      .max(255, "Too long!")
      .required("Required"),
    firstName: Yup.string()
      .min(4, "Too short!")
      .max(255, "Too long!")
      .required("Required"),
    lastName: Yup.string()
      .min(4, "Too short!")
      .max(255, "Too long!")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    annualIncome: Yup.number().min(0, "Can't be negative"),
    otherMonthlyDebt: Yup.number().min(0, "Can't be negative"),
    userType: Yup.string().required("Required"),
  });

  // remove admin from signup roles
  if (roles.indexOf("admin") !== -1) {
    roles.splice(roles.indexOf("admin"), 1);
  }

  // Validate roles checkbox
  const validate = (values) => {
    const errors = {};
    // Check if at least one role is selected
    if (!values.roles || values.roles.length === 0) {
      errors.roles = "Select at least one role";
    }
    return errors;
  };

  return (
    <div className="form-wrapper">
      <div className="form-inner">
        <h3 className="mb-4 text-center">Signup</h3>
        <Formik
          initialValues={{
            username: "",
            password: "",
            firstName: "",
            lastName: "",
            email: "",
            annualIncome: "",
            otherMonthlyDebt: "",
            userType: "",
          }}
          validationSchema={signupSchema}
          onSubmit={async (values, { setSubmitting, setStatus }) => {
            values.roles = [values.userType];
            const result = await signup(values);
            if (result.success) navigate("/");
            else {
              setStatus({ error: result.errors });
            }
            setSubmitting(false);
          }}
        >
          {({
            values,
            touched,
            errors,
            status,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="signupUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  placeholder="Enter username"
                  value={values.username}
                  onChange={handleChange}
                  autoComplete="username"
                  required
                />
                {errors.username && touched.username ? (
                  <FormError msg={errors.username} field />
                ) : null}
              </Form.Group>
              <Form.Group className="mb-3" controlId="signupPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  onChange={handleChange}
                  value={values.password}
                  autoComplete="current-password"
                  required
                />
                {errors.password && touched.password ? (
                  <FormError msg={errors.password} field />
                ) : null}
              </Form.Group>
              <Form.Group className="mb-3" controlId="signupFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  placeholder="Enter first name"
                  value={values.firstName}
                  onChange={handleChange}
                  autoComplete="given-name"
                  required
                />
                {errors.firstName && touched.firstName ? (
                  <FormError msg={errors.firstName} field />
                ) : null}
              </Form.Group>
              <Form.Group className="mb-3" controlId="signupLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  placeholder="Enter last name"
                  value={values.lastName}
                  onChange={handleChange}
                  autoComplete="family-name"
                  required
                />
                {errors.lastName && touched.lastName ? (
                  <FormError msg={errors.lastName} field />
                ) : null}
              </Form.Group>
              <Form.Group className="mb-3" controlId="signupEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={values.email}
                  onChange={handleChange}
                  autoComplete="email"
                  required
                />
                {errors.email && touched.email ? (
                  <FormError msg={errors.email} field />
                ) : null}
              </Form.Group>
              <Form.Group className="mb-3" controlId="signupAnnualIncome">
                <Form.Label>Annual Income</Form.Label>
                <Form.Control
                  type="number"
                  name="annualIncome"
                  placeholder="Enter annual income"
                  value={values.annualIncome}
                  onChange={handleChange}
                  required
                />
                {errors.annualIncome && touched.annualIncome ? (
                  <FormError msg={errors.annualIncome} field />
                ) : null}
              </Form.Group>
              <Form.Group className="mb-3" controlId="signupOtherMonthlyDebt">
                <Form.Label>Other Monthly Debt</Form.Label>
                <Form.Control
                  type="number"
                  name="otherMonthlyDebt"
                  placeholder="Enter other monthly debt"
                  value={values.otherMonthlyDebt}
                  onChange={handleChange}
                  required
                />
                {errors.otherMonthlyDebt && touched.otherMonthlyDebt ? (
                  <FormError msg={errors.otherMonthlyDebt} field />
                ) : null}
              </Form.Group>
              <Form.Group>
                <Form.Label>User Type</Form.Label>
                <div>
                  {roles.map((role, idx) => (
                    <Form.Check
                      key={idx}
                      inline
                      label={role}
                      name="userType"
                      type="radio"
                      id={`roles-${role}`}
                      value={role}
                      onChange={handleChange}
                    />
                  ))}
                </div>
                {errors.userType && touched.userType ? (
                  <FormError msg={errors.userType} field />
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
                  Submit
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
export default SignupForm;
