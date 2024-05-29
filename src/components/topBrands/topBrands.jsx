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
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(4);
  const [isAllElements, setAllElements] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768, // Порог для мобильных устройств
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      // Дополнительные настройки для других порогов медиа-запросов
    ],
  };

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

  console.log("============", source);
  useEffect(() => {
    const geo = selectedCountry.toUpperCase();
    console.log("GEO", geo);
    const fetchData = async () => {
      setIsLoading(true);
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
          console.log("respons3dData", responseData.brandsNew);
          if (geo) {
            filteredData = responseData.brandsNew.filter(
              (rowData) =>
                rowData.GEO === geo &&
                rowData["CurrentStatus"] === "Ongoing" &&
                rowData["CasinoBrand"] !== "Mirax (FS)" &&
                rowData["CasinoBrand"] !== "Katsubet (FS)" &&
                rowData["CasinoBrand"] !== "7Bit (FS)" &&
                rowData["Networks"] === "1"
            );
          } else {
            filteredData = responseData.brandsNew.filter(
              (rowData) =>
                rowData.GEO === ipDataCode &&
                rowData["CurrentStatus"] === "Ongoing" &&
                rowData["CasinoBrand"] !== "Mirax (FS)" &&
                rowData["CasinoBrand"] !== "Katsubet (FS)" &&
                rowData["CasinoBrand"] !== "7Bit (FS)" &&
                rowData["Networks"] === "1"
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

          // Перемешиваем данные перед отображением
          if (isShuffled) {
          for (let i = filteredDataWithTopData.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [filteredDataWithTopData[i], filteredDataWithTopData[j]] = [
              filteredDataWithTopData[j],
              filteredDataWithTopData[i],
            ];
          }
          setIsShuffled(true);
        }
          setData(showData(filteredDataWithTopData));

          setTopData([...topData]);
          setIsLoading(false);

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
  console.log("combined", combinedData);

  return (
    <div>
      {data.length > 0 && (
        <section id="top-brand" class="game-section pt-30 pb-55">
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-xxl-10 col-xl-10 col-lg-10 col-md-10">
                <div class="section-title text-center right-greadient mb-50">
                  <h2 class="mb-25">{t("Joker's New Favorites: Fresh and Exciting Casinos")}</h2>
                </div>
              </div>
            </div>
            <div class="row">
              {data.map((rowData, index) => (
                <div class="col-xl-3 col-md-6 col-sm-6" key={index}>
                  <div class="single-game box-inner-shadow">
                    <div className="game_thumb">
                      <img src={rowData["LinkImg"]} alt={rowData["LinkImg"]} />

                      <p class="mb-15">{rowData["OurOfferContent"]}</p>

                      <div className="game__overlay">
                        <a class="play-btn btn-hover" href={
                          rowData["GoBig"] +
                          newUrl +
                          "L_enchanted-forest_1"
                        }>
                          {t("Play Now!")}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )
              )}
            </div>
            <div class="view-all-btn text-center pt-30">
              {isAllElements ? (
                <a
                  target="_blank"
                  href={`https://topbon.us/${newUrl}L_enchanted-forest_1`}
                  className="main-btn btn-hover"
                >
                  <span>{t("More offers")}</span>
                </a>
              ) : (
                <a
                  target="_blank"
                  onClick={loadMoreItems}
                  className="main-btn btn-hover"
                >
                  <span>{t("Show more")}</span>
                </a>
              )}

            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default TopBrands;
