import { Outlet } from "react-router-dom";

import ChildComponent from "../dataBrands/Data";
import Header from "../dataBrands/Header";
import Footer from "../dataBrands/Footer";
// import softswiss from "../../../src/softswiss.png";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function Home() {
  const { t } = useTranslation();

  return (
    <>
      <div className="App">
        <Header />

        <div className="wrapper">
          <ChildComponent />
        </div>
        {/* <div className="container mobile-cont">
          <div className="banner">
            <p>
              Get Paid <span>Real Cash</span> for Your Daily Activities!
            </p>
            <Link
              className="btn btn-primary"
              target="_blank"
              to={`https://myawardwallet.com/`}
            >
              Ask support
            </Link>
          </div>
        </div> */}
        <Footer />
      </div>
      <Outlet />
    </>
  );
}

export default { Home };
