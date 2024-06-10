import { useEffect, useState, useRef } from "react";

import logo from "../../../src/img/logo2.png";

import plus from "../../../src/img/18plus.png";
import gamblers from "../../../src/img/gamblers.png";
import layer from "../../../src/img/layer.png";
import { useTranslation } from "react-i18next";

function ChildComponent() {

    const { t } = useTranslation();

    return (
        <footer>
          <div className="wrapper">
            <div className="container flex-column">
              <div className="top-footer">
                <img className="logo" src={`.${logo}`} />
              
              </div>
              <div className="center-footer">
                <div className="images">
                  <img src={`.${plus}`} alt="" />
                  {/* <img src={`.${gamblers}`} alt="" /> */}
                  <img src={`.${layer}`} alt="" />
                  {/* <img src={`.${softswiss}`} alt="" /> */}
                </div>

                <p>{t("footerText")}</p>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="bottom-footer">{t("copyright")} <a target="_blank" href="https://topbon.us/">topbon.us</a> {t("copyright2")}</div>
          </div>
        </footer>
    );
}

export default ChildComponent;
