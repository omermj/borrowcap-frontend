import { Formik } from "formik";
import { Form, Button } from "react-bootstrap";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import UserContext from "../auth/UserContext";
import BorrowcapApi from "../api/api";

/** Change Password Form */

const ChangePasswordForm = () => {
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();

  const errMsg = (msg) => (
    <div className="mt-3 text-center">
      <small className="text-danger">{msg}</small>
    </div>
  );

  const notifySuccess = () =>
    toast.success("Password has been changed successfully.");

  return (
    <div className="form-wrapper">
      <div className="form-inner">
        <h3 className="text-center mb-4">Change Password</h3>
        <Formik
          initialValues={{
            currentPassword: "",
            newPassword: "",
            newPasswordRetype: "",
          }}
          onSubmit={async (values, { setSubmitting, setStatus }) => {
            try {
              if (values.newPassword !== values.newPasswordRetype) {
                setStatus({ error: "Passwords do not match." });
                return;
              }
              const user = await BorrowcapApi.changePassword(
                currentUser.username,
                values
              );
              if (user) navigate("/");
              notifySuccess();
            } catch (e) {
              setStatus({ error: e });
            }
          }}
        >
          {({
            values,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            status,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="oldPassword">
                <Form.Label>Current Password</Form.Label>
                <Form.Control
                  type="password"
                  name="currentPassword"
                  placeholder="Enter current password"
                  value={values.currentPassword}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="newPassword">
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  type="password"
                  name="newPassword"
                  placeholder="Enter new password"
                  value={values.newPassword}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="newPasswordRetype">
                <Form.Label>Re-type Password</Form.Label>
                <Form.Control
                  type="password"
                  name="newPasswordRetype"
                  placeholder="Re-type password"
                  value={values.newPasswordRetype}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              {status && status.error && errMsg(status.error)}
              <div className="d-grid">
                <Button
                  variant="primary"
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-4 btn-dark"
                >
                  Update
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ChangePasswordForm;
