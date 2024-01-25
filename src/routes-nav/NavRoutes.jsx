import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
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
import ApprovedLoan from "../borrower/ApprovedRequest";
import ActiveRequests from "../borrower/ActiveRequests";
import ApprovedLoans from "../borrower/ApprovedRequests";
import FundedLoans from "../borrower/FundedLoans";
import AvailableInvestments from "../investor/AvailableInvestments";
import PledgedInvestments from "../investor/PledgedInvestments";
import ActiveInvestments from "../investor/ActiveInvestments";
import ApprovalRequests from "../underwriter/ApprovalRequests";
import ApprovedRequests from "../underwriter/ApprovedRequests";
import Wallet from "../common/Wallet";
import ProfileUpdateForm from "../common/ProfileUpdateForm";
import ChangePasswordForm from "../common/ChangePassword";
import NotFound from "../common/NotFound";

/** Site-wide routes */

function NavRoutes({ signup, roles }) {
  const currentUser = useSelector((state) => state.userState.user);

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

        {/* --------------- */}
        {/* Borrower Routes */}
        {/* --------------- */}
        <Route element={<ProtectedRoute allowedRoles={["borrower"]} />}>
          <Route path="/borrower" element={<BorrowerMain />} />
          <Route path="/borrower/apply" element={<LoanApplicationForm />} />
          <Route
            path="/borrower/approvedrequests/:id"
            element={<ApprovedLoan />}
          />
          <Route path="/borrower/activerequests" element={<ActiveRequests />} />
          <Route path="/borrower/approvedloans" element={<ApprovedLoans />} />
          <Route path="/borrower/fundedloans" element={<FundedLoans />} />
          <Route path="/borrower/wallet" element={<Wallet />} />
          <Route path="/borrower/profile" element={<ProfileUpdateForm />} />
        </Route>

        {/* --------------- */}
        {/* Investor Routes */}
        {/* --------------- */}
        <Route element={<ProtectedRoute allowedRoles={["investor"]} />}>
          <Route path="/investor" element={<InvestorMain />} />
          <Route
            path="/investor/availableinvestment/:id"
            element={<AvailableInvestment />}
          />
          <Route
            path="/investor/availableinvestments"
            element={<AvailableInvestments />}
          />
          <Route path="/investor/pledges" element={<PledgedInvestments />} />
          <Route
            path="/investor/activeinvestments"
            element={<ActiveInvestments />}
          />
          <Route path="/investor/wallet" element={<Wallet />} />
          <Route path="/investor/profile" element={<ProfileUpdateForm />} />
        </Route>

        {/* ------------------------ */}
        {/* Underwriter/Admin Routes */}
        {/* ------------------------ */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/underwriter" element={<UnderwriterMain />} />
          <Route
            path="/underwriter/reviewrequest/:id"
            element={<ReviewRequest />}
          />
          <Route path="/underwriter/requests" element={<ApprovalRequests />} />
          <Route path="/underwriter/approved" element={<ApprovedRequests />} />
        </Route>

        {/* ------------------------ */}
        {/* Common User Routes */}
        {/* ------------------------ */}
        <Route
          element={
            <ProtectedRoute allowedRoles={["admin", "borrower", "investor"]} />
          }
        >
          <Route path="/user/profile" element={<ProfileUpdateForm />} />
          <Route path="/user/changepassword" element={<ChangePasswordForm />} />
        </Route>

        {/* ----------- */}
        {/* Auth Routes */}
        {/* ----------- */}
        <Route path="/login" element={<LoginForm />} />
        <Route
          path="/signup"
          element={<SignupForm signup={signup} roles={roles} />}
        />

        {/* 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default NavRoutes;
