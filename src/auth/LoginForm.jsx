import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { Form, Button } from "react-bootstrap";
import FormError from "../common/FormError";
import * as Yup from "yup";
import BorrowcapApi from "../api/api";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/user/userSlice";

/** Login Form */

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userState.user);

  // login user
  const login = async (loginData) => {
    try {
      const { user, token } = await BorrowcapApi.login(loginData);
      if (token) {
        dispatch(loginUser({ user, token }));
        return { success: true };
      }
    } catch (e) {
      console.error("Login failed", e);
      return { success: false, e };
    }
  };

  // validation schema
  const loginSchema = Yup.object().shape({
    username: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
  });

  return (
    <div className="form-wrapper">
      <div className="form-inner">
        <h3 className="mb-4 text-center">Login</h3>
        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={loginSchema}
          onSubmit={async (values, { setSubmitting, setStatus }) => {
            const result = await login(values);
            if (result.success) navigate("/");
            else {
              setStatus({ error: "Incorrect Username/Password" });
            }
            setSubmitting(false);
          }}
        >
          {({
            values,
            status,
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
export default LoginForm;
