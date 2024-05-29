import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../dataBrands/Header";
import Footer from "../dataBrands/Footer";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Unsubscribed = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Header />
      <div className="unsubscribed">
        <h2>You are unsubscribed</h2>
      </div>

      <Footer />
    </div>
  );
};

export default Unsubscribed;
