import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useTranslation } from "react-i18next";
import Loader from "../Loader/Loader";
import "bootstrap/dist/css/bootstrap.min.css";


function TopBrands({
  newUrl,
  ipDataCode,
  currentLanguage,
  source,
  selectedCountry,
  setSelectedCountry, // Функция для обновления selectedCountry
}) {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [topData, setTopData] = useState([]);
  const [step, setStep] = useState(4);
  const [isAllElements, setAllElements] = useState(false);

  const urlParams = new URLSearchParams(window.location.search);
  const brandValue = urlParams.get("brand");

  const apiOld = "https://pickbonus.myawardwallet.com/api/brandsNew/read.php";
  const apiNew = "https://pickbonus.myawardwallet.com/api/brandsNew2/read.php";
  const api1043 = "https://pickbonus.myawardwallet.com/api/brandsNew3/read.php";
  const api1044 = "https://pickbonus.myawardwallet.com/api/brandsNew4/read.php";

  function showData(array) {
    const showedArray = array.slice(); // Создаем копию массива
    //Обрезка массива до step элементов, чтобы было по шаблону
    if (showedArray.length > step) {
      setAllElements(false)
      return showedArray.slice(0, step);
    } else {
      setAllElements(true)
    }
    return showedArray;
  }

  function loadMoreItems() {
    setStep(prevIndex => prevIndex + 4);
  }

  console.log("source:", source);
  useEffect(() => {
    const geo = selectedCountry.toUpperCase();
    console.log("GEO", geo);
    const fetchData = async () => {
      try {
        let url;
        switch (source) {
          case "partner1039":
            url = apiNew; // Для partner1039
            break;
          case "partner1043":
            url = api1043; // Для partner1043
            break;
          case "partner1044":
            url = api1044; // Для partner1044
            break;
          default:
            url = apiOld; // Для всех остальных случаев
        }

        const res = await fetch(url);
        if (res.ok) {
          const responseData = await res.json();
          // const dataArray = Object.values(responseData.brandsNew);
          let filteredData = [];
          if (geo) {
            filteredData = responseData.brandsNew.filter(
              (rowData) =>
                rowData.GEO === geo &&
                rowData["CurrentStatus"] === "Ongoing" &&
                rowData["CasinoBrand"] !== "Mirax (FS)" &&
                rowData["CasinoBrand"] !== "Katsubet (FS)" &&
                rowData["CasinoBrand"] !== "7Bit (FS)" &&
                rowData["High_hybrid"] === "1"
            );
          } else {
            filteredData = responseData.brandsNew.filter(
              (rowData) =>
                rowData.GEO === ipDataCode &&
                rowData["CurrentStatus"] === "Ongoing" &&
                rowData["CasinoBrand"] !== "Mirax (FS)" &&
                rowData["CasinoBrand"] !== "Katsubet (FS)" &&
                rowData["CasinoBrand"] !== "7Bit (FS)" &&
                rowData["High_hybrid"] === "1"
            );
          }
          if (geo === "ALL") {
            filteredData = responseData.brandsNew.filter(
              (rowData) =>
                rowData.GEO === geo &&
                rowData["CurrentStatus"] === "Ongoing" &&
                rowData["CasinoBrand"] !== "Mirax (FS)" &&
                rowData["CasinoBrand"] !== "Katsubet (FS)" &&
                rowData["CasinoBrand"] !== "7Bit (FS)" &&
                rowData["Trendsetting"] === "1"
            );
          }

          const topData = responseData.brandsNew
            .filter((rowData) => rowData.Tech === brandValue)
            .map((item) => ({
              ...item,
              clas: "topbrand",
            }));

          // Фильтрация объектов в массиве data
          const filteredDataWithTopData = filteredData.filter((dataItem) => {
            // Проверка, есть ли объект с таким же Casino brand в topData
            const existsInTopData = topData.some(
              (topDataItem) =>
                topDataItem["CasinoBrand"] === dataItem["CasinoBrand"]
            );

            // Возвращаем true только для объектов, которые не совпадают
            return !existsInTopData;
          });

          const arrLength = filteredDataWithTopData.length / 2

          if (geo !== "ALL") {
            setData(showData(filteredDataWithTopData.slice(0, arrLength)));
          } else {
            setData(showData(filteredDataWithTopData));
          }

          setTopData([...topData]);

          // Если нет брендов, вызывать setSelectedCountry
          if (filteredDataWithTopData.length === 0) {
            setSelectedCountry("all");
            console.log(filteredDataWithTopData);
          }
        } else {
          console.error("Failed to fetch data:", res.status);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    if ((geo && currentLanguage) || (!geo && ipDataCode && currentLanguage)) {
      fetchData();
    }
  }, [ipDataCode, brandValue, currentLanguage, selectedCountry, source, step, isAllElements]);

  const combinedData = [...topData, ...data];

  return (
    <div>
      {data.length > 0 && (
        <div id="ttsmartblog" className="style2 otherBrands">
          <div className="tt-title d-inline-block float-none w-100 text-center">{t("Summer's Best Casino Bonuses! 🌞✨")}</div>
          <div className="container">
            <div className="smartblog-content row">
              {data.map((rowData, index) => (
                <div className="ttblog  col-xl-3 col-lg-3 col-sm-6">
                  <div className="item">
                    <div className="ttblog_image_holder">
                      <a href={
                        rowData["GoBig"] +
                        newUrl +
                        "L_summer_1"
                      }>
                        <img src={rowData["LinkImg"]} alt={rowData["LinkImg"]} />
                      </a>
                    </div>
                    <div className="blog-content-wrap float-left w-100">
                      <div className="blog_inner">
                        <h4 className="blog-title"><span>{rowData["CasinoBrand"]}</span></h4>
                        <div className="blog-desc">{rowData["OurOfferContent"]}</div>
                        <div className="read-more text-capitalize">
                          <a className="readmore" href={
                            rowData["GoBig"] +
                            newUrl +
                            "L_summer_1"
                          }>
                            {t("Play Now!")}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
              )}
            </div>
          </div>
          {isAllElements ? (
            <a href={`https://topbon.us/${newUrl}L_summer_1`} className="button-drawing type--A" target="_blank">
              <div className="button__line"></div>
              <div className="button__line"></div>
              <span className="button__text">{t("More offers")}</span>
              <div className="button__drow1"></div>
              <div className="button__drow2"></div>
            </a>
          ) : (
            <a className="button-drawing type--A" target="_blank"
              onClick={loadMoreItems}>
              <div className="button__line"></div>
              <div className="button__line"></div>
              <span className="button__text">{t("Show more")}</span>
              <div className="button__drow1"></div>
              <div className="button__drow2"></div>
            </a>
          )}
        </div>
      )}
    </div>
  );
}

export default TopBrands;
