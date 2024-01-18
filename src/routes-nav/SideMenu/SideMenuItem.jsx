import { MenuItem, menuClasses } from "react-pro-sidebar";
import { Link } from "react-router-dom";

const SideMenuItem = ({ title, to, icon }) => {
  return (
    <MenuItem
      className="mt-0 ms-1"
      icon={icon}
      component={<Link to={to} />}
      rootStyles={{
        ["." + menuClasses.button]: {
          "&:hover": {
            color: "grey !important",
            backgroundColor: "rgb(46,46,46) !important",
          },
        },
      }}
    >
      {title}
    </MenuItem>
  );
};
export default SideMenuItem;
