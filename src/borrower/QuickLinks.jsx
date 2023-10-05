/** Component showing common quick links for Borrower
 *  1. Apply for new loan
 *  2. Pay loan installment
 *  3. Pay loan principal
 *  4. Manage Wallet
 */

const QuickLinks = () => {
  return (
    <div className="border border-primary mt-5 pt-1">
      <h4 className="mb-3">Quick Links</h4>
      <p className="link-primary mb-1">Apply for new loan</p>
      <p className="link-primary mb-1">Pay loan installment</p>
      <p className="link-primary mb-1">Pay loan principal</p>
      <p className="link-primary mb-1">Manage Wallet</p>
    </div>
  );
};

export default QuickLinks;
