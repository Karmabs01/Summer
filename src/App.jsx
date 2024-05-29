import { useState, useEffect } from "react";
import { Routes, Route, HashRouter } from "react-router-dom";

import { Home } from "./components/Home/Home";
import { Withdraw } from "./components/Withdraw/Withdraw";
// import { Faq } from "./components/Faq/Faq";
// import Tournament from "./components/Tournament/Tournament";
import Terms from "./components/Terms/Terms";
import Wheel from "./components/Wheel/Wheel";
import Unsubscribed from "./components/Unsubscribed/Unsubscribed.jsx"

import './i18n.js';
// import LanguageSelector from './LanguageSelector.jsx'; 
// import I18nInitializer from './i18n.js'; 





function App() {
  const [isLoading, setIsLoading] = useState(true);
  console.log(isLoading);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);



  return (
  
      <HashRouter>
        {/* <I18nInitializer />  */}
        {/* <LanguageSelector />  */}
            <Routes>
                <Route index path="/" element={<Home />} />
                {/* <Route index path="/withdrawal" element={<Withdrawal />} />
                <Route index path="/my-account" element={<MyAccount />} />
                <Route index path="/faq" element={<Faq />} />
                <Route index path="/tournament" element={<Tournament />} /> */}
                {/* <Route index path="/terms" element={<Terms />} /> */}
                {/* <Route index path="/fortunewheel" element={<Wheel />} />
                <Route index path="/withdrawal" element={<Withdraw />} />
                <Route index path="/unsubscribed" element={<Unsubscribed />} /> */}


            </Routes>
      </HashRouter>
 
  );
}

export default App;
