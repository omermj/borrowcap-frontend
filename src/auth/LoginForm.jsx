import { useNavigate } from "react-router-dom";
import { Formik, ErrorMessage } from "formik";
import { Form, Button } from "react-bootstrap";

/** Login Form */

const LoginForm = ({ login }) => {
  const navigate = useNavigate();

  const errMsg = () => (
    <div>
      <small className="text-danger">Incorrect Username/Password</small>
    </div>
  );

  return (
    <div>
      <h3>Login</h3>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          const result = await login(values);
          if (result.success) {
            navigate("/");
          } else {
            setErrors({
              username: "Incorrect Username",
              password: "Incorrect Password",
            });
          }
          setSubmitting(false);
          console.log("wrong stuff");
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
            <Form.Group className="mb-3" controlId="loginFormUsername">
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
            <Form.Group className="mb-3" controlId="loginFormPassword">
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
export default LoginForm;
