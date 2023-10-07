import { Route, Routes } from "react-router-dom";
import BorrowerMain from "../borrower/BorrowerMain";
import Homepage from "../homepage/Homepage";
import InvestorMain from "../investor/InvestorMain";
import UnderwriterMain from "../underwriter/UnderwriterMain";

/** Site-wide routes */

function NavRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/borrower" element={<BorrowerMain />} />
        <Route path="/investor" element={<InvestorMain />} />
        <Route path="/underwriter" element={<UnderwriterMain />} />
      </Routes>
    </div>
  );
}

export default NavRoutes;
