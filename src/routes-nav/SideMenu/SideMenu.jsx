import { Sidebar, Menu, sidebarClasses } from "react-pro-sidebar";
import Logo from "../../assets/Logo.jpeg";
import { useEffect, useState } from "react";
import SideMenuItem from "./SideMenuItem";
import UserContext from "../../auth/UserContext";
import { useContext } from "react";
import NavigationLogo from "../../common/NavigationLogo";

const SideMenu = () => {
  const { currentUser } = useContext(UserContext);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Collapse SideMenu when screen size is below 768px
  useEffect(() => {
    const handleResize = () => {
      setIsCollapsed(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const borrowerMenu = () => {
    return (
      <>
        <SideMenuItem
          icon={<i className="bi bi-house h4 m-0" />}
          title="Dashboard"
          to="/"
        />
        <SideMenuItem
          icon={<i className="bi bi-coin h4 m-0" />}
          title="Apply for Loan"
          to="/borrower/apply"
        />
        <SideMenuItem
          icon={<i className="bi bi-calculator h4 m-0" />}
          title="Loan Requests"
          to="/borrower/activerequests"
        />
        <SideMenuItem
          icon={<i className="bi bi-card-checklist h4 m-0" />}
          title="Approved Requests"
          to="/borrower/approvedloans"
        />
        <SideMenuItem
          icon={<i className="bi bi-cash-coin h4 m-0" />}
          title="Active Loans"
          to="/borrower/fundedloans"
        />
        <SideMenuItem
          icon={<i className="bi bi-wallet-fill h4 m-0" />}
          title="Wallet"
          to="/borrower/wallet"
        />
      </>
    );
  };

  const investorMenu = () => {
    return (
      <>
        <SideMenuItem
          icon={<i className="bi bi-house h4 m-0" />}
          title="Dashboard"
          to="/"
        />
        <SideMenuItem
          icon={<i className="bi bi-coin h4 m-0" />}
          title="Invest"
          to="/investor/availableinvestments"
        />
        <SideMenuItem
          icon={<i className="bi bi-clipboard-check-fill h4 m-0" />}
          title="Pledges"
          to="/investor/pledges"
        />
        <SideMenuItem
          icon={<i className="bi bi-cash-coin h4 m-0" />}
          title="Investments"
          to="/investor/activeinvestments"
        />
        <SideMenuItem
          icon={<i className="bi bi-wallet-fill h4 m-0" />}
          title="Wallet"
          to="/investor/wallet"
        />
      </>
    );
  };

  const underwriterMenu = () => {
    return (
      <>
        <SideMenuItem
          icon={<i className="bi bi-house h4 m-0" />}
          title="Dashboard"
          to="/"
        />
        <SideMenuItem
          icon={<i className="bi bi-cash h4 m-0" />}
          title="Requests"
          to="/underwriter/requests"
        />
        <SideMenuItem
          icon={<i className="bi bi-clipboard-check-fill h4 m-0" />}
          title="Approved"
          to="/underwriter/approved"
        />
      </>
    );
  };

  return (
    <div className="d-flex" style={{ height: "100%", backgroundColor: "red" }}>
      <Sidebar
        width="250px"
        collapsed={isCollapsed}
        rootStyles={{
          [`.${sidebarClasses.container}`]: {
            backgroundColor: "rgb(46,46,46)",
            color: "white",
            height: "100%",
          },
        }}
      >
        <Menu>
          {/* LOGO AND TOGGLE BUTTON */}
          {isCollapsed ? (
            <div className="my-3 ms-4">
              <button
                className="btn btn-secondary btn-sm m-0"
                style={{
                  border: "none",
                }}
                onClick={() => setIsCollapsed(!isCollapsed)}
              >
                <i className="bi bi-list h4"></i>
              </button>
            </div>
          ) : (
            <div className="m-3">
              <div className="d-flex justify-content-between align-items-center">
                <a
                  href="/"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div className="d-flex align-items-center">
                    <NavigationLogo />
                    <h5 className="m-0">BorrowCap</h5>
                  </div>
                </a>
                <button
                  className="btn btn-secondary btn-sm m-0"
                  style={{
                    border: "none",
                  }}
                  onClick={() => setIsCollapsed(!isCollapsed)}
                >
                  <i className="bi bi-list h4"></i>
                </button>
              </div>
            </div>
          )}

          {/* MENU ITEMS */}

          {currentUser.roles.includes("admin") && underwriterMenu()}
          {currentUser.roles.includes("borrower") && borrowerMenu()}
          {currentUser.roles.includes("investor") && investorMenu()}
        </Menu>
      </Sidebar>
    </div>
  );
};
export default SideMenu;
