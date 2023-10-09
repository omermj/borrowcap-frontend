import { Route, Routes } from "react-router-dom";
import BorrowerMain from "../borrower/BorrowerMain";
import Homepage from "../homepage/Homepage";
import InvestorMain from "../investor/InvestorMain";
import UnderwriterMain from "../underwriter/UnderwriterMain";
import LoginForm from "../auth/LoginForm";

/** Site-wide routes */

function NavRoutes({ login, signup }) {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/borrower" element={<BorrowerMain />} />
        <Route path="/investor" element={<InvestorMain />} />
        <Route path="/underwriter" element={<UnderwriterMain />} />
        <Route path="/login" element={<LoginForm login={login} />} />
      </Routes>
    </div>
  );
}

export default NavRoutes;
