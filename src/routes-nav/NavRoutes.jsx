import { Route, Routes } from "react-router-dom";
import BorrowerMain from "../borrower/BorrowerMain";
import Homepage from "../homepage/Homepage";

/** Site-wide routes */

function NavRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/borrower" element={<BorrowerMain />} />
      </Routes>
    </div>
  );
}

export default NavRoutes;
