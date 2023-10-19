import { Formik } from "formik";
import { Form, Button } from "react-bootstrap";
import { useContext } from "react";
import UserContext from "../auth/UserContext";
import BorrowcapApi from "../api/api";

/** Profile Update Form */

const ProfileUpdateForm = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  return (
    <div className="form-wrapper">
      <div className="form-inner">
        <h3 className="text-center mb-4">Profile Update Form</h3>
        <Formik
          initialValues={{
            username: currentUser.username,
            firstName: currentUser.firstName,
            lastName: currentUser.lastName,
            email: currentUser.email,
            annualIncome: currentUser.annualIncome,
            otherMonthlyDebt: currentUser.otherMonthlyDebt,
          }}
          onSubmit={async (values, { setSubmitting, setErrors }) => {
            let updatedUser;
            try {
              updatedUser = await BorrowcapApi.updateUser(
                currentUser.username,
                values
              );
            } catch (e) {
              console.log(e);
              return;
            }
            setCurrentUser({ ...currentUser, ...updatedUser });
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
                  disabled
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="signupFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
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
                  value={values.otherMonthlyDebt}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
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

export default ProfileUpdateForm;
