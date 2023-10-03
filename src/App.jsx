import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import NavRoutes from "./routes-nav/NavRoutes";

function App() {
  return (
    <BrowserRouter>
      <>
        <NavRoutes />
      </>
    </BrowserRouter>
  );
}

export default App;
