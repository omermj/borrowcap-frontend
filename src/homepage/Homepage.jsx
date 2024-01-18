/** Homepage of the app
 *
 * Shows welcome message or login/register buttons
 *
 * Routed at /
 *
 * Routes -> Homepage
 */

import { Link } from "react-router-dom";
import landingImg from "../assets/landing-page-image.png";

const Homepage = () => {
  return (
    <div className="container text-center">
      <div className="row">
        <h1>Welcome to BorrowCap!</h1>
      </div>
      <div className="row mt-5 align-items-center">
        <div className="col-md-6">
          <p className="">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero
            consequuntur voluptatibus, quod magni ducimus repellendus fuga, sunt
            adipisci corrupti dolores quis! Ipsa impedit voluptates cum incidunt
            reiciendis consequuntur earum placeat! Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Veritatis aperiam nobis quaerat ad
            inventore facere quia distinctio perspiciatis incidunt! Amet ipsum
            totam repellat quod magni mollitia perferendis, unde ab modi!
          </p>
          <Link className="btn btn-dark mt-4" to="/signup">
            Get Started
          </Link>
        </div>
        <div className="col-md-6">
          <img
            src={landingImg}
            width={400}
            className="img-fluid mt-md-0 mt-5"
            alt="Landing"
          />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
