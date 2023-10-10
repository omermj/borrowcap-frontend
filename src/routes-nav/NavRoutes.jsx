import { Route, Routes } from "react-router-dom";
import BorrowerMain from "../borrower/BorrowerMain";
import Homepage from "../homepage/Homepage";
import InvestorMain from "../investor/InvestorMain";
import UnderwriterMain from "../underwriter/UnderwriterMain";
import LoginForm from "../auth/LoginForm";
import SignupForm from "../auth/SignupForm";
import ProtectedRoute from "./ProtectedRoute";

/** Site-wide routes */

function NavRoutes({ login, signup, roles }) {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route element={<ProtectedRoute allowedRoles={["borrower"]} />}>
          <Route path="/borrower" element={<BorrowerMain />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={["investor"]} />}>
          <Route path="/investor" element={<InvestorMain />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={["underwriter"]} />}>
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
