import { useNavigate } from "react-router-dom";
import { Formik, ErrorMessage } from "formik";
import { Form, Button } from "react-bootstrap";

/** Login Form */

const SignupForm = ({ signup, roles }) => {
  const navigate = useNavigate();

  // Validate roles checkbox
  const validate = (values) => {
    const errors = {};
    // Check if at least one role is selected
    if (!values.roles || values.roles.length === 0) {
      errors.roles = "Select at least one role";
    }
    return errors;
  };

  const errMsg = () => (
    <div>
      <small className="text-danger">Incorrect Username/Password</small>
    </div>
  );

  return (
    <div>
      <h3>Signup</h3>
      <Formik
        initialValues={{
          username: "",
          password: "",
          firstName: "",
          lastName: "",
          email: "",
          annualIncome: "",
          otherMonthlyDebt: "",
          roles: [],
        }}
        validate={validate}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          const result = await signup(values);
          if (result.success) {
            navigate("/");
          } else {
            setErrors({
              username: "Incorrect Username",
              password: "Incorrect Password",
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
            </Form.Group>
            <Form.Group>
              <Form.Label>User Type</Form.Label>
              <div>
                {roles.map((role, idx) => (
                  <Form.Check
                    key={idx}
                    inline
                    label={role}
                    name="roles"
                    type="checkbox"
                    id={`roles-${role}`}
                    value={role}
                    onChange={handleChange}
                  />
                ))}
              </div>
              {/* Display error message for roles */}
              {errors.roles && (
                <div className="text-danger">{errors.roles}</div>
              )}
            </Form.Group>
            <ErrorMessage name="username" component={errMsg} className="mt-3" />
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
export default SignupForm;