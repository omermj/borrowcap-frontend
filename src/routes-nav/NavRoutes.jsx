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

/** Site-wide routes */

function NavRoutes({ login, signup, roles, purposes }) {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route element={<ProtectedRoute allowedRoles={["borrower"]} />}>
          <Route path="/borrower" element={<BorrowerMain />} />
          <Route
            path="/borrower/apply"
            element={<LoanApplicationForm purposes={purposes} />}
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
