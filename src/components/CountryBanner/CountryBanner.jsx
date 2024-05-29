import React, { useEffect, useState } from "react";
import Au from "../../../public/AU.png";
import Ca from "../../../public/CA.png";
import Nz from "../../../public/NZ.png";
import { useTranslation } from "react-i18next";

const CountryBanner = ({
  newUrl,
  ipDataCode,
  currentLanguage,
  source,
  selectedCountry,
}) => {
  const { t } = useTranslation();
  // Передаем проп selectedCountry
  const [language, setLanguage] = useState(selectedCountry);

  useEffect(() => {
    setLanguage(selectedCountry);
  }, [selectedCountry]);
  console.log("LANGU", language)

  const allImages = {
    au: Au,
    ca: Ca,
    nz: Nz,
  };
  const allTitle = {
    au: "HOT AUSSIE BONUSES",
    ca: "HOT CANADIAN BONUSES",
    nz: "HOT KIWI BONUSES",
  };
  const allVideo = {
    au: "https://tracker.xxxcasinoguru.com/video_australia",
    ca: "https://tracker.xxxcasinoguru.com/video_newzealand",
    nz: "https://tracker.xxxcasinoguru.com/video_canada",
  };
  const allImageSrc = allImages[language] || allImages["au"];
  const allTitleDone = allTitle[language] || allTitle["au"];
  const allVideoDone = allVideo[language] || allVideo["au"];

  const bannerStyle = {
    backgroundImage: `url(.${allImageSrc})`,
  };

  const [iframeWidth, setIframeWidth] = useState(1200);
  const [iframeHeight, setIframeHeight] = useState(675);

  const updateIframeSize = () => {
    const screenWidth = window.innerWidth;

    // Определите свои собственные условия для изменения размеров iframe
    if (screenWidth <= 767) {
      setIframeWidth("100%");
      setIframeHeight("100%");
    } else {
      setIframeWidth("100%");
      setIframeHeight(675);
    }
  };
  useEffect(() => {
    updateIframeSize();

    window.addEventListener("resize", updateIframeSize);

    return () => {
      window.removeEventListener("resize", updateIframeSize);
    };
  }, []);

  //////////////////////get brands////////////////////////

  const [data, setData] = useState([]);
  const [visibleBrands, setVisibleBrands] = useState(5);

  const handleShowMore2 = () => {
    setVisibleBrands((prevVisibleBrands) => prevVisibleBrands + 5);
  };

  const apiOld = "https://pickbonus.myawardwallet.com/api/brands/read.php";
  const apiNew = "https://pickbonus.myawardwallet.com/api/brands/read2.php";


  useEffect(() => {
    const geo = selectedCountry.toUpperCase();

    const fetchData = async () => {
      try {
        const url = source === "partner1039" ? apiNew : apiOld;

        const res = await fetch(url);
        if (res.ok) {
          const responseData = await res.json();
          // const dataArray = Object.values(responseData);

          let filteredData = [];

          if (geo) {
            filteredData = responseData.brands.filter(
              (rowData) =>
                rowData.GEO === geo &&
                rowData["CurrentStatus"] === "Ongoing" &&
                rowData["Video"] === "1"
            );
          } else {
            filteredData = responseData.brands.filter(
              (rowData) =>
                rowData.GEO === ipDataCode &&
                rowData["CurrentStatus"] === "Ongoing" &&
                rowData["Video"] === "1"
            );
          }

          console.log("Filtered Data: ", filteredData);
        

    
          setData(filteredData);
        } else {
          console.error("Failed to fetch data:", res.status);
        }
      } catch (error) {
        console.error("An error occurred:", error);
        setLoading(false);
      }
    };

    if ((ipDataCode && currentLanguage) || (geo && currentLanguage)) {
      fetchData();
    }
  }, [ipDataCode, currentLanguage, selectedCountry, source]);


  ///////////////////////////////////////////////////////

  console.log("DADADADA", data);

  

  return (
    <div className="container flex flex-col banner-container-slider">
      <div className="banner-slider" style={bannerStyle}>
        <h2 className="h2style">{allTitleDone}</h2>
      </div>
      <div className="text-loc">
        <p>
          Check out the video for the 5 hottest and newest bonuses of the week,
          handpicked just for you!
        </p>
      </div>
      <div className="iframeVideo">
        <iframe
          id="myIframe22"
          width={iframeWidth}
          height={iframeHeight}
          src={allVideoDone}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </div>
      <div className="all-brands">
        {data.length > 0 ? (
          data.map((rowData, index) => (
            <div className="one-brand" key={index}>
              <div>
                <a
                  id="hottestBonus"
                  target="_blank"
                  href={rowData["GoBig"] + newUrl + "L_enchanted-forest_Video"}
                >
                  <img src={rowData["LinkImg"]} alt="" />
                </a>
                <p>{rowData["OurOfferContent"]}</p>
              </div>
              <a
                id="hottestBonus"
                className="cmn--btn2"
                target="_blank"
                href={rowData["GoBig"] + newUrl + "L_enchanted-forest_Video"}
              >
                {t("getBonus")}
              </a>
            </div>
          ))
        ) : (
          <p className="ti">{t("No brands available for your country")}</p>
        )}
      </div>
    </div>
  );
};

export default CountryBanner;
