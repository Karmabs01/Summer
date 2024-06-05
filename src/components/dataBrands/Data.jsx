import { useEffect, useState, useRef } from "react";
import OtherBrands from "../otherBrands/otherBrands";
import TopBrands from "../topBrands/topBrands";
import AnotherBrands from "../AnotherBrands/AnotherBrands";
import { useTranslation } from "react-i18next";
import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function ChildComponent() {
  const [ipData, setIpData] = useState(null);
  const [ipDataCode, setIpDataCode] = useState(null);
  const [newUrl, setNewUrl] = useState("");
  const [source, setSource] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");

  const { t, i18n } = useTranslation();
  const selectRef = useRef(null);

  const countryOptions = [
    { code: "au", name: "Australia", flag: "🇦🇺" },
    { code: "at", name: "Austria", flag: "🇦🇹" },
    { code: "be", name: "Belgium", flag: "🇧🇪" },
    { code: "ca", name: "Canada", flag: "🇨🇦" },
    { code: "ch", name: "Switzerland", flag: "🇨🇭" },
    { code: "cz", name: "The Czech Republic", flag: "🇨🇿" },
    { code: "de", name: "Germany", flag: "🇩🇪" },
    { code: "dk", name: "Denmark", flag: "🇩🇰" },
    { code: "es", name: "Spain", flag: "🇪🇸" },
    { code: "fi", name: "Finland", flag: "🇫🇮" },
    { code: "fr", name: "France", flag: "🇫🇷" },
    { code: "gr", name: "Greece", flag: "🇬🇷" },
    { code: "hu", name: "Hungary", flag: "🇭🇺" },
    { code: "ie", name: "Ireland", flag: "🇮🇪" },
    { code: "it", name: "Italy", flag: "🇮🇹" },
    { code: "nl", name: "Netherlands", flag: "🇳🇱" },
    { code: "no", name: "Norway", flag: "🇳🇴" },
    { code: "nz", name: "New Zealand", flag: "🇳🇿" },
    { code: "pl", name: "Poland", flag: "🇵🇱" },
    { code: "se", name: "Sweden", flag: "🇸🇪" },
    { code: "sk", name: "Slovakia", flag: "🇸🇰" },
    { code: "all", name: "World", flag: "🌍" },
  ];
  const countryOptions1043 = [
    { code: "all", name: "World", flag: "🌍" }, 
    { code: "ca", name: "Canada", flag: "🇨🇦" },
  ];

  const countryOptions1044 = [
    { code: "au", name: "Australia", flag: "🇦🇺" },
    { code: "at", name: "Austria", flag: "🇦🇹" },
    { code: "be", name: "Belgium", flag: "🇧🇪" },
    { code: "ca", name: "Canada", flag: "🇨🇦" },
    { code: "fi", name: "Finland", flag: "🇫🇮" },
    { code: "fr", name: "France", flag: "🇫🇷" },
    { code: "de", name: "Germany", flag: "🇩🇪" },
    { code: "ie", name: "Ireland", flag: "🇮🇪" },
    { code: "no", name: "Norway", flag: "🇳🇴" },
    { code: "nz", name: "New Zealand", flag: "🇳🇿" },
    { code: "pl", name: "Poland", flag: "🇵🇱" },
    { code: "se", name: "Sweden", flag: "🇸🇪" },
    { code: "ch", name: "Switzerland", flag: "🇨🇭" },
    { code: "all", name: "World", flag: "🌍" },
  ];

  const countryOptions1039 = [
    { code: "au", name: "Australia", flag: "🇦🇺" },
    { code: "at", name: "Austria", flag: "🇦🇹" },
    { code: "be", name: "Belgium", flag: "🇧🇪" },
    { code: "ca", name: "Canada", flag: "🇨🇦" },
    { code: "ch", name: "Switzerland", flag: "🇨🇭" },
    { code: "cz", name: "The Czech Republic", flag: "🇨🇿" },
    { code: "de", name: "Germany", flag: "🇩🇪" },
    { code: "dk", name: "Denmark", flag: "🇩🇰" },
    { code: "es", name: "Spain", flag: "🇪🇸" },
    { code: "fi", name: "Finland", flag: "🇫🇮" },
    { code: "fr", name: "France", flag: "🇫🇷" },
    { code: "gb", name: "Great Britain", flag: "🇬🇧" },
    { code: "gr", name: "Greece", flag: "🇬🇷" },
    { code: "hu", name: "Hungary", flag: "🇭🇺" },
    { code: "ie", name: "Ireland", flag: "🇮🇪" },
    { code: "it", name: "Italy", flag: "🇮🇹" },
    { code: "nl", name: "Netherlands", flag: "🇳🇱" },
    { code: "no", name: "Norway", flag: "🇳🇴" },
    { code: "nz", name: "New Zealand", flag: "🇳🇿" },
    { code: "pl", name: "Poland", flag: "🇵🇱" },
    { code: "pt", name: "Portugal", flag: "🇵🇹" },
    { code: "se", name: "Sweden", flag: "🇸🇪" },
    { code: "sk", name: "Slovakia", flag: "🇸🇰" },
    { code: "all", name: "World", flag: "🌍" },
  ];


  useEffect(() => {
    fetch(
      "https://ipapi.co/json/?key=YD0x5VtXrPJkOcFQMjEyQgqjfM6jUcwS4J54b3DI8ztyrFpHzW"
    )
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
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.delete("brand");
    const currentSource = searchParams.get("keyword");
    let sourceValue = "0";

    if (currentSource) {
      const match = currentSource.match(/partner(_)?\d+/);
      if (match) {
        sourceValue = match[0];
        setSource(sourceValue);
      } else {
        setSource("0");
      }
    } else {
      setSource("0");
    }
    searchParams.set("source", sourceValue);
    searchParams.set("creative_id", "");
    const queryString = `?${searchParams.toString()}`;
    setNewUrl(queryString);
  }, []);

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    localStorage.setItem("selectedCountry", country);
    document.documentElement.classList.remove("fixed-position");
    console.log("handleCountryChange")

  };

  const handleMouseDown = () => {
    document.documentElement.classList.add("fixed-position");
    console.log("handleMouseDown")

  };

  const handleClickOutside = (event) => {
    if (selectRef.current && !selectRef.current.contains(event.target)) {
      document.documentElement.classList.remove("fixed-position");
      console.log("handleClickOutside")
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <AnotherBrands
        newUrl={newUrl}
        ipDataCode={ipDataCode}
        currentLanguage={i18n.language}
        source={source}
        selectedCountry={selectedCountry}
      />
      {source === "partner1043" && (
        <div className="select-brand container">
        <Box sx={{ m: 1, minWidth: 300 }}>
          <FormControl fullWidth>
            <InputLabel>{t("select")}</InputLabel>
            <Select
              id="countrySelect"
              value={selectedCountry}
              label={t("select")}
              ref={selectRef}
              onMouseDown={handleMouseDown}
              onChange={(e) => handleCountryChange(e.target.value)}
            >
              {countryOptions1043.map((country, index) => (
                <MenuItem
                  key={index}
                  value={country.code}
                  selected={country.code === ipDataCode}
                >
                  <div className={country.code}></div>
                  {country.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </div>
      )}
      {source === "partner1044" && (
        <div className="select-brand container">
        <Box sx={{ m: 1, minWidth: 300 }}>
          <FormControl fullWidth>
            <InputLabel>{t("select")}</InputLabel>
            <Select
              id="countrySelect"
              value={selectedCountry}
              label={t("select")}
              ref={selectRef}
              onMouseDown={handleMouseDown}
              onChange={(e) => handleCountryChange(e.target.value)}
            >
              {countryOptions1044.map((country, index) => (
                <MenuItem
                  key={index}
                  value={country.code}
                  selected={country.code === ipDataCode}
                >
                  <div className={country.code}></div>
                  {country.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </div>
      )}
       {source === "partner1039" && (
        <div className="select-brand container">
        <Box sx={{ m: 1, minWidth: 300 }}>
          <FormControl fullWidth>
            <InputLabel>{t("select")}</InputLabel>
            <Select
              id="countrySelect"
              value={selectedCountry}
              label={t("select")}
              ref={selectRef}
              onMouseDown={handleMouseDown}
              onChange={(e) => handleCountryChange(e.target.value)}
            >
              {countryOptions1039.map((country, index) => (
                <MenuItem
                  key={index}
                  value={country.code}
                  selected={country.code === ipDataCode}
                >
                  <div className={country.code}></div>
                  {country.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </div>
      )}
      {source !== "partner1044" && source !== "partner1043" && source !== "partner1039" &&  (
        <div className="select-brand container">
          <Box sx={{ m: 1, minWidth: 300 }}>
            <FormControl fullWidth>
              <InputLabel>{t("select")}</InputLabel>
              <Select
                id="countrySelect"
                value={selectedCountry}
                label={t("select")}
                ref={selectRef}
                onMouseDown={handleMouseDown}
                onChange={(e) => handleCountryChange(e.target.value)}
              >
                {countryOptions.map((country, index) => (
                  <MenuItem
                    key={index}
                    value={country.code}
                    selected={country.code === ipDataCode}
                  >
                    <div className={country.code}></div>
                    {country.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </div>
      )}

      <TopBrands
        newUrl={newUrl}
        ipDataCode={ipDataCode}
        currentLanguage={i18n.language}
        source={source}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
      />

      <OtherBrands
        newUrl={newUrl}
        ipData={ipData}
        ipDataCode={ipDataCode}
        currentLanguage={i18n.language}
        source={source}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
      />
    </div>
  );
}

export default ChildComponent;
