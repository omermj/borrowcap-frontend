/** Main Landing Page for Underwriter */

import ApprovalRequests from "./ApprovalRequests";
import ApprovedRequests from "./ApprovedRequests";

const UnderwriterMain = () => {
  return (
    <div>
      {/* Approval Requests */}
      <ApprovalRequests />

      {/* Approved Requests which are unfunded */}
      <ApprovedRequests />
    </div>
  );
};

export default UnderwriterMain;
