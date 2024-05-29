import { useEffect, useState } from "react";

import OtherBrands from "../otherBrands/otherBrands";
import TopBrands from "../topBrands/topBrands";
import ModalWindow from "../components/modalWindow/ModalWindow";
import { useTranslation } from "react-i18next";

function ChildComponent() {
  const [ipData, setIpData] = useState(null);
  const [ipDataCode, setIpDataCode] = useState(null);
  const [newUrl, setNewUrl] = useState("");
  const [source, setSource] = useState("");

  const [selectedCountry, setSelectedCountry] = useState("");

  const { t, i18n } = useTranslation();

  const countryOptions = [
    { code: "all", name: "World", flag: "🌍" },
    { code: "pl", name: "Poland", flag: "🇵🇱" },
    { code: "ca", name: "Canada", flag: "🇨🇦" },
    { code: "nz", name: "New Zealand", flag: "🇳🇿" },
    { code: "es", name: "Spain", flag: "🇪🇸" },
    { code: "at", name: "Austria", flag: "🇦🇹" },
    { code: "be", name: "Belgium", flag: "🇧🇪" },
    { code: "bg", name: "Bulgaria", flag: "🇧🇬" },
    { code: "ch", name: "Switzerland", flag: "🇨🇭" },
    { code: "cz", name: "Czech", flag: "🇨🇿" },
    { code: "de", name: "Germany", flag: "🇩🇪" },
    { code: "dk", name: "Denmark", flag: "🇩🇰" },
    { code: "fi", name: "Finland", flag: "🇫🇮" },
    { code: "fr", name: "France", flag: "🇫🇷" },
    { code: "gr", name: "Greece", flag: "🇬🇷" },
    { code: "hu", name: "Hungary", flag: "🇭🇺" },
    { code: "ie", name: "Ireland", flag: "🇮🇪" },
    { code: "it", name: "Italy", flag: "🇮🇹" },
    { code: "nl", name: "Netherlands", flag: "🇳🇱" },
    { code: "no", name: "Norway", flag: "🇳🇴" },
    { code: "pt", name: "Portugal", flag: "🇵🇹" },
    { code: "se", name: "Sweden", flag: "🇸🇪" },
    { code: "sk", name: "Slovakia", flag: "🇸🇰" },
  ];

  useEffect(() => {
    // Запрос к API с использованием fetch
    fetch("https://ipapi.co/json/")
      .then((response) => response.json())
      .then((data) => {
        setIpData(data.country_name);
        setIpDataCode(data.country);
         setSelectedCountry(data.country.toLowerCase()); 
      })
      .catch((error) => {
        console.error("Ошибка при запросе к API:", error);
      });
  }, []);

  useEffect(() => {
    const url = window.location.href;
    const urlObj = new URL(url);
    const searchParams = new URLSearchParams(urlObj.search);
    searchParams.delete("brand");
  
    const currentSource = searchParams.get("source");
    if (currentSource !== null) {
      setSource(currentSource);
    }
  
    searchParams.delete("source");
  
    // Добавить source в новый URL только если он существует
    const newUrl =
      "?" +
      (currentSource !== null ? "source=" + currentSource : "") +
      (searchParams.toString() ? "&" + searchParams.toString() : "") +
      "&creative_id=MAW";
  
    setNewUrl(newUrl);
  
    console.log("url", newUrl);
  }, []);
  
  
  console.log(source, "-------------------");
  return (
    <div>
      <TopBrands
        newUrl={newUrl}
        ipDataCode={ipDataCode}
        currentLanguage={i18n.language}
        source={source}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
      />
      <div className="select-brand container">
        <h2>{t("consider")}</h2>
        <p>{t("select")}</p>
        <select
          id="countrySelect"
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
        >
          {countryOptions.map((country, index) => (
            <option
              key={index}
              value={country.code}
              selected={country.code === ipDataCode}
            >
              {country.flag}{" "}
              {country.name}
            </option>
          ))}
        </select>
      </div>
      <OtherBrands
        newUrl={newUrl}
        ipData={ipData}
        ipDataCode={ipDataCode}
        currentLanguage={i18n.language}
        source={source}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
      />
      {/* <ModalWindow newUrl={newUrl} ipDataCode={ipDataCode} /> */}
    </div>
  );
}

export default ChildComponent;
