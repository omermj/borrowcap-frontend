import { Route, Routes } from "react-router-dom";
import BorrowerMain from "../borrower/BorrowerMain";
import Homepage from "../homepage/Homepage";
import InvestorMain from "../investor/InvestorMain";
import UnderwriterMain from "../underwriter/UnderwriterMain";
import LoginForm from "../auth/LoginForm";
import SignupForm from "../auth/SignupForm";
import ProtectedRoute from "./ProtectedRoute";
import LoanApplicationForm from "../borrower/LoanApplication";
import AvailableInvestment from "../investor/AvailableInvestment";
import ReviewRequest from "../underwriter/ReviewRequest";
import UserContext from "../auth/UserContext";
import { useContext } from "react";
import ApprovedLoan from "../borrower/ApprovedLoan";

/** Site-wide routes */

function NavRoutes({ login, signup, roles, purposes }) {
  const { currentUser } = useContext(UserContext);

  const homepage = () => {
    if (currentUser) {
      if (currentUser.roles.includes("admin")) {
        return <UnderwriterMain />;
      } else if (currentUser.roles.includes("borrower")) {
        return <BorrowerMain />;
      } else if (currentUser.roles.includes("investor")) {
        return <InvestorMain />;
      }
    }
    return <Homepage />;
  };

  return (
    <div>
      <Routes>
        <Route path="/" element={homepage()} />
        <Route element={<ProtectedRoute allowedRoles={["borrower"]} />}>
          <Route path="/borrower" element={<BorrowerMain />} />
          <Route
            path="/borrower/apply"
            element={<LoanApplicationForm purposes={purposes} />}
          />
          <Route
            path="/borrower/approvedrequests/:id"
            element={<ApprovedLoan />}
          />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={["investor"]} />}>
          <Route path="/investor" element={<InvestorMain />} />
          <Route
            path="/investor/availableinvestment/:id"
            element={<AvailableInvestment />}
          />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/underwriter" element={<UnderwriterMain />} />
          <Route
            path="/underwriter/reviewrequest/:id"
            element={<ReviewRequest />}
          />
        </Route>
        <Route path="/login" element={<LoginForm login={login} />} />
        <Route
          path="/signup"
          element={<SignupForm signup={signup} roles={roles} />}
        />
      </Routes>
    </div>
  );
}

export default NavRoutes;
