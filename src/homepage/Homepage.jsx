import { useContext } from "react";
import UserContext from "../auth/UserContext";
import { useNavigate } from "react-router-dom";
import UnderwriterMain from "../underwriter/UnderwriterMain";
import BorrowerMain from "../borrower/BorrowerMain";
import InvestorMain from "../investor/InvestorMain";

/** Homepage of the app
 *
 * Shows welcome message or login/register buttons
 *
 * Routed at /
 *
 * Routes -> Homepage
 */

const Homepage = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);

  // if (currentUser) {
  //   if (currentUser.roles.includes("admin")) navigate ("/underwriter");
  //   else if (currentUser.roles.includes("borrower")) return <BorrowerMain />;
  //   else if (currentUser.roles.includes("investor")) return <InvestorMain />;
  // }

  return (
    <div>
      <h1>Welcome to BorrowCap!</h1>
    </div>
  );
};

export default Homepage;
