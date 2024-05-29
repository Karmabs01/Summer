import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useTranslation } from "react-i18next";
import Loader from "../Loader/Loader";

// import all from "../../all.png";

import allEn from "../../All_top/all_en.png";
import allPl from "../../All_top/all_pl.png";
import allEs from "../../All_top/all_es.png";
import allAll from "../../All_top/all_all.png";
import allBe from "../../All_top/all_be.png";
import allBg from "../../All_top/all_bg.png";
import allCz from "../../All_top/all_cz.png";
import allDe from "../../All_top/all_de.png";
import allDk from "../../All_top/all_dk.png";
import allFi from "../../All_top/all_fi.png";
import allFr from "../../All_top/all_fr.png";
import allGr from "../../All_top/all_gr.png";
import allHu from "../../All_top/all_hu.png";
import allIt from "../../All_top/all_it.png";
import allNl from "../../All_top/all_nl.png";
import allNo from "../../All_top/all_no.png";
import allPt from "../../All_top/all_pt.png";
import allSe from "../../All_top/all_se.png";
import allSk from "../../All_top/all_sk.png";
import allTr from "../../All_top/all_tr.png";

function NewBrands({
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
  const [isLoading, setIsLoading] = useState(false);



  //   const urlParams = new URLSearchParams(window.location.search);
  //   const brandValue = urlParams.get("brand");

  const apiOld = "https://pickbonus.myawardwallet.com/api/brands/read.php";
  const apiNew = "https://pickbonus.myawardwallet.com/api/brands/read2.php";

  function shuffleArray(array) {
    const shuffledArray = array.slice(); // Создаем копию массива
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  }

  console.log("============", source);
  useEffect(() => {
    const geo = selectedCountry.toUpperCase();
    console.log("GEO", geo);
    const fetchData = async () => {
      setIsLoading(true);
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
                rowData["Casino brand"] !== "Mirax (FS)" &&
                rowData["Casino brand"] !== "Katsubet (FS)" &&
                rowData["Casino brand"] !== "7Bit (FS)" &&
                rowData.Segment2 === "Sandbox"
            );
          } else {
            filteredData = responseData.brands.filter(
              (rowData) =>
                rowData.GEO === ipDataCode &&
                rowData["CurrentStatus"] === "Ongoing" &&
                rowData["Casino brand"] !== "Mirax (FS)" &&
                rowData["Casino brand"] !== "Katsubet (FS)" &&
                rowData["Casino brand"] !== "7Bit (FS)" &&
                rowData.Segment2 === "Sandbox"
            );
          }

          // Фильтрация объектов в массиве data
          const filteredDataWithTopData = filteredData.filter((dataItem) => {
            // Проверка, есть ли объект с таким же Casino brand в topData
            const existsInTopData = topData.some(
              (topDataItem) =>
                topDataItem["Casino brand"] === dataItem["Casino brand"]
            );

            // Возвращаем true только для объектов, которые не совпадают
            return !existsInTopData;
          });

          // Перемешиваем данные перед отображением
          setData(shuffleArray(filteredDataWithTopData));
          setTopData([...topData]);
          setIsLoading(false);
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
  }, [ipDataCode, currentLanguage, selectedCountry, source]);



  const combinedData = [...topData, ...data];

  const allImages = {
    en: allEn,
    pl: allPl,
    es: allEs,
    all: allAll,
    be: allBe,
    bg: allBg,
    cz: allCz,
    de: allDe,
    dk: allDk,
    fi: allFi,
    fr: allFr,
    gr: allGr,
    hu: allHu,
    it: allIt,
    nl: allNl,
    no: allNo,
    pt: allPt,
    se: allSe,
    sk: allSk,
    tr: allTr,
    // Добавьте другие языки по необходимости
  };

  const allImageSrc = allImages[currentLanguage] || allImages.en;

  return (
    <section className="games py-5 theme-transparent-bg" id="games">
    {data.length > 0 && (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="text-center">
              <p
                className="mt-5 mb-3 theme-text-secondary fs-4 fw-bold"
                data-aos="fade-up"
              >
                Trusted Online Sports Betting
              </p>
              <h1
                className="display-5 mb-3 theme-text-white font-black max"
                data-aos="fade-up"
              >
                Top Games on ..
              </h1>
              <p className="mb-0 theme-text-white" data-aos="fade-up">
                Explore multiple options for maximum fun
              </p>
            </div>
            <div className="row mt-5">
              {data ? (
                data.slice(0, 6).map((rowData, index) => (
                  <div
                    className="col-12 col-md-6 col-lg-2"
                    data-aos="fade-up"
                    key={index}
                  >
                    <div className="game-card theme-border-radius theme-bg-white text-center py-4 mb-4">
                      <figure className="mb-0 icon-bg">
                        <img
                          src={rowData["LinkImg"]}
                          alt={rowData["LinkImg"]}
                          className="img-fluid rounded-circle"
                        />
                      </figure>
                      <h3 className="h5 fw-bold theme-text-primary mb-0 mt-3">
                        {rowData["OurOfferContent"]}
                      </h3>
                      <a
                        className="rounded-pill btn custom-btn-primary font-small primary-btn-effect mt-3"
                        href={rowData["GoBig"] + newUrl}
                      >
                        Play Now
                      </a>
                    </div>
                  </div>
                ))
              ) : (
                <p>No matching data found.</p>
              )}
            </div>
            <div className="row mt-5">
              <div className="col-12 text-center bbn">
                <a
                  href={`https://pickbonus.myawardwallet.com/${newUrl}`}
                  className="rounded-pill btn custom-btn-primary primary-btn-effect bbn"
                  target="_blank"
                >
                  Play more games
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )}
  </section>
  );
}

export default NewBrands;
