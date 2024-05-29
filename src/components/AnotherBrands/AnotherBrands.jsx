import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import image from "../../../src/img/joker2.png";




// import fwb from "../../images/fwb.png";

function AnotherBrands({
  newUrl,
  ipDataCode,
  currentLanguage,
  source,
  selectedCountry,
}) {
  const { t } = useTranslation();

  const [loading, setLoading] = useState(true);
  const [otherData, setOtherData] = useState([]);
  const [visibleBrands, setVisibleBrands] = useState(8);

  const handleShowMore = () => {
    setVisibleBrands((prevVisibleBrands) => prevVisibleBrands + 8);
  };

  const apiOld = "https://pickbonus.myawardwallet.com/api/brandsNew/read.php";
  const apiNew = "https://pickbonus.myawardwallet.com/api/brandsNew2/read.php";
  const api1043 = "https://pickbonus.myawardwallet.com/api/brandsNew3/read.php";
  const api1044 = "https://pickbonus.myawardwallet.com/api/brandsNew4/read.php";

  function shuffleArray(array) {
    const shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  }

  useEffect(() => {
    const geo = selectedCountry.toUpperCase();

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
          // const dataArray = Object.values(responseData);

          let filteredDataOther = [];

          if (geo) {
            filteredDataOther = responseData.brandsNew.filter(
              (rowData) =>
                rowData.GEO === geo &&
                rowData["CurrentStatus"] === "Ongoing" &&
                rowData["CasinoBrand"] !== "Mirax (FS)" &&
                rowData["CasinoBrand"] !== "Katsubet (FS)" &&
                rowData["CasinoBrand"] !== "7Bit (FS)" &&
                rowData["Networks"] === "1"
            );
          } else {
            filteredDataOther = responseData.brandsNew.filter(
              (rowData) =>
                rowData.GEO === ipDataCode &&
                rowData["Current Status"] === "Ongoing" &&
                rowData["CasinoBrand"] !== "Mirax (FS)" &&
                rowData["CasinoBrand"] !== "Katsubet (FS)" &&
                rowData["CasinoBrand"] !== "7Bit (FS)" &&
                rowData["Networks"] === "1"
            );
          }

          // Перемешиваем данные перед отображением
          setOtherData(shuffleArray(filteredDataOther));
          setLoading(false);

          // Если нет брендов, вызывать setSelectedCountry
          // if (filteredDataOther.length === 0) {
          //   setSelectedCountry("all");
          // }
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

  // ...

  return (

    <section id="home" class="hero-section go-zoom-1">
    <div class="container">
        <div class="row align-items-center">
            <div class="col-lg-12">
                <div class="hero-content top-greadient">
                    <h1 class="wow fadeInLeft mb-20" data-wow-delay=".2s"> {t("Hello, summer!")}</h1>
                    <h4 class="wow fadeInUp" data-wow-delay=".4s">
                      {t("We've handpicked the most exclusive and jaw-dropping bonuses from top-tier online casinos just for you. The Joker's treasure trove of rewards is just a click away!")}
                    </h4>
                    
                </div>
                {otherData.length > 0 ? (
                      otherData.slice(0, 1).map((rowData, index) => (
                            <a key={index} target="_blank" href={rowData["GoBig"] + newUrl + "L_enchanted-forest_random"} className="main-btn btn-hover wow fadeInUp" >
                                <span>{t("TRY YOUR LUCK")}</span>
                            </a>
                               ))
                               ) : (
                                 <p className="ti">{t("No brands available for your country")}</p>
                               )}
            </div>
            {/* <div class="col-lg-6">
                <div class="hero-img wow fadeInRight" data-wow-delay=".5s">
                <img src={`.${image}`} alt={`.${image}`} />
                </div>
            </div> */}
        </div>
    </div>
</section>

  );
}

export default AnotherBrands;
