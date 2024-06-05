import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function LanguageSelector({ ipDataCode, source }) {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Set the default language based on user's IP when the component mounts
    if (ipDataCode) {
      i18n.changeLanguage(ipDataCode.toLowerCase());
    }
  }, [ipDataCode, i18n]);

  const changeLanguage = (event) => {
    const selectedLanguage = event.target.value;
    i18n.changeLanguage(selectedLanguage);
  };

  const languageOptions = [
    { value: "all", label: "English" },
    { value: "be", label: "Belgian" },
    { value: "bg", label: "Bulgarian" },
    { value: "cz", label: "Czech" },
    { value: "de", label: "German" },
    { value: "dk", label: "Danish" },
    { value: "es", label: "Spanish" },
    { value: "fi", label: "Finnish" },
    { value: "fr", label: "French" },
    { value: "gr", label: "Greek" },
    { value: "hu", label: "Hungarian" },
    { value: "it", label: "Italian" },
    { value: "nl", label: "Dutch" },
    { value: "no", label: "Norwegian" },
    { value: "pl", label: "Polish" },
    { value: "pt", label: "Portuguese" },
    { value: "se", label: "Swedish" },
    { value: "sk", label: "Slovak" },
    { value: "tr", label: "Turkey" },
  ];
  const languageOptions1043 = [{ value: "all", label: "🌍 English" }];

  return (
    <div>
      {/* {source === "partner1043" && (
        <select value={"all"} onChange={changeLanguage}>
          {languageOptions1043.map((option) => (
            <option key={option.value} value="all">
              {option.label}
            </option>
          ))}
        </select>
      )} */}
      {/* {source !== "partner1043" && (
        <select value={i18n.language} onChange={changeLanguage}>
          {languageOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )} */}
      {source !== "partner1043" && (
        <Box sx={{ minWidth: 150 }}>
          <FormControl fullWidth>
            <Select
              id="languageSelect"
              value={i18n.language}
              onChange={changeLanguage}
            >
              {languageOptions.map((option) => (
                <MenuItem
                  key={option.value}
                  value={option.value}>
                  <div className={option.value}></div>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      )}
    </div>
  );
}

export default LanguageSelector;
