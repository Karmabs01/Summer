import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../dataBrands/Header";
import Footer from "../dataBrands/Footer";
import LoaderMini from "../LoaderMini/LoaderMini";
import { use } from "i18next";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Select from "react-select";

export function Withdraw() {
  const { t } = useTranslation();
  const location = useLocation();
  const pathname = location.pathname;
  const currentPageName = pathname.replace("/", "");

  const [selectedMenuItem, setSelectedMenuItem] = useState(
    currentPageName || "my-account/"
  );

  const [adressPayment, setAdressPayment] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState([]);
  const [coins, setCoins] = useState(null);
  const [token, setToken] = useState(null);
  const [response, setResponse] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [errorWallet, setErrorWallet] = useState(false);
  // const [minimumAmount, setMinimumAmount] = useState("");
  const [minFee, setMinFee] = useState("");



  const [error, setError] = useState(false);

  const [message, setMessage] = useState("");

  const api = "https://pickbonus.myawardwallet.com/api";
  const apiKey = "MG5SRC6-HFBMACK-MMSR9QW-1EST6QC";

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const idUserParam = urlParams.get("keyword");
        const res = await fetch(`${api}/user/read_one.php?id=${idUserParam}`);
        if (res.ok) {
          const userData = await res.json();
          setUser(userData);
        } else {
          console.error("Failed to fetch user data:", res.status);
        }
      } catch (error) {
        console.error("An error occurred while fetching user data:", error);
      }
    };

    const fetchCoins = async () => {
      try {
        const myHeaders = new Headers();
        myHeaders.append("x-api-key", apiKey);

        const requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow",
        };

        const response = await fetch(
          "https://api.nowpayments.io/v1/merchant/coins",
          requestOptions
        );

        if (response.ok) {
          const result = await response.json();
          setCoins(result);
        } else {
          console.error("Failed to fetch coins data:", response.status);
        
          // setError(true);
        }
      } catch (error) {
        console.error("An error occurred while fetching coins data:", error);
        // setError(true);
      }
    };

    fetchUser();
    fetchCoins();
  }, [api]);

  const handleMenuItemClick = async (menuItem) => {
    setLoading(true);
    setSelectedMenuItem(menuItem);
    await new Promise((resolve) => setTimeout(resolve, 500)); // Ждем 500 миллисекунд
    setLoading(false);
  };
  ///////////////////////ЗАПРОС НА СУЩЕСТВОВАНИЕ КОШЕЛЬКА///////////////////////////
  const validateAddress = async () => {
    try {
      const url = "https://api.nowpayments.io/v1/payout/validate-address";
      const currency = selectedPaymentMethod;
      const address = adressPayment;

      const myHeaders = new Headers();
      myHeaders.append("x-api-key", apiKey);
      myHeaders.append("Content-Type", "application/json");

      const data = {
        address: address,
        currency: currency,
      };

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(data),
        redirect: "follow",
      };

      const response = await fetch(url, requestOptions);

      if (response.ok) {
        setErrorWallet(false);
        handlePayoutRequest();
      } else {
        console.error("Failed to validate address:", response.status);
        const text = await response.text();
        console.log("Response text:", text);
        setErrorWallet(true);
      }
    } catch (error) {
      console.error("An error occurred during address validation:", error);
      setErrorWallet(true);
    }
  };
  ///////////////////////////////////////////////////////////////////////

  const phpScriptUrl =
    ////////////////////////////////ЗАПРОС НА ВЫПЛАТУ////////////////////////////////

    "https://pickbonus.myawardwallet.com/api/payment/payment.php";

  const handlePayoutRequest = async () => {
    try {
      setLoading(true);
      const apiKey = "MG5SRC6-HFBMACK-MMSR9QW-1EST6QC";
      const jwtToken = await authenticateUser(); // Получаем новый токен перед каждым запросом
      console.log("JWT", jwtToken);

      const myHeaders = new Headers();
      myHeaders.append("x-api-key", apiKey);
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${jwtToken}`);

      const payoutData = {
        ipn_callback_url: "https://nowpayments.io",
        withdrawals: [
          {
            address: adressPayment,
            currency: selectedPaymentMethod,
            amount: parseFloat(estimated.estimated_amount),
            ipn_callback_url: "https://nowpayments.io",
            userData: user,
            userWithdraw: withdrawalRequestValue,
          },
        ],
      };
      console.log("type", user);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({ ...payoutData }), // Добавляем токен к данным
        redirect: "follow",
      };

      const response = await fetch(phpScriptUrl, requestOptions);

      if (response.ok) {
        const result = await response.text();

        setErrorMin(t("Withdrawal successful"));

        setModalError(!modalError);
        setModalPayout(!modalPayout);
      } else {
        if (response.status === 400) {
          const result = await response.json();
          console.error("Failed to make payout request:", result.error);
          // Тут ви можете вивести повідомлення про помилку користувачу
          // setError(true);
          // setErrorMessage(result.error);
          setMessage(result.error);
        } else if (response.status === 500) {
          console.error(
            "Failed to make payout request:",
            "Internal Server Error"
          );
          // Тут ви можете вивести інше повідомлення про помилку користувачу
          // setError(true);
          // setErrorMessage("Internal Server Error");
          setShowModal(true);
          setMessage("Internal Server Error");
        } else {
          console.error("Failed to make payout request:", response.status);
          // setError(true);
          setShowModal(true);

          setMessage(`Error: ${response.status}`);
        }
      }
    } catch (error) {
      console.error("Error during payout request:", error);
      // setError(true);
      setShowModal(true);
      setMessage("Insufficient balance for withdrawal");
    } finally {
      setLoading(false); // Выключить лоадер вне зависимости от результата запроса
    }
  };
  ///////////////////////////////////////////////////////

  ////////////////////ПОЛУЧЕНИЕ ТОКЕНА/////////////

  const authenticateUser = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        email: "and@karmabs.com",
        password: "Ytvn3daw!",
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      const authResponse = await fetch(
        "https://api.nowpayments.io/v1/auth",
        requestOptions
      );

      if (authResponse.ok) {
        const authData = await authResponse.json(); // Извлекаем данные из ответа как объект
        const authToken = authData.token; // Извлекаем значение токена из объекта
        return authToken;
      } else {
        console.error("Failed to authenticate user:", authResponse.status);
        // Возможно, здесь стоит бросить ошибку или выполнить другие действия в зависимости от вашего потока управления
      }
    } catch (error) {
      console.error("Error during user authentication:", error);
      // То же самое - обработайте ошибку в соответствии с вашими потребностями
    }
  };
  ////////////////////////////////////////////////////////

  const [withdrawalRequestValue, setWithdrawalRequestValue] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState("USDTTRC20");
  const [minimumAmount, setMinimumAmount] = useState();

  // const handleAmountChange = (e) => {
  //   const enteredValue = parseFloat(e.target.value);
  //   setWithdrawalRequestValue(enteredValue);
  //   handleEstimatedRequest(enteredValue);
  // };

  // const handlePaymentMethodChange = (event) => {
  //   setSelectedPaymentMethod(event.target.value);
  //   setErrorWallet(false);

  //   // handleEstimatedRequest(); // Уберите эту строку
  // };

  // const handleInputChange = (value) => {
  //   setWithdrawalRequestValue(value);
  // };

  const handlePaymentMethodChange = (event) => {
    setSelectedPaymentMethod(event.target.value);
    setErrorWallet(false);
  };

  console.log("minimum", minimumAmount);
  useEffect(() => {
    handleEstimatedRequest(withdrawalRequestValue); // Используйте текущее значение withdrawalRequestValue
  }, [selectedPaymentMethod, withdrawalRequestValue]);

  const [estimated, setEstimated] = useState([]);

  ///////////////////////КОНВЕРТАЦИЯ//////////////////////
  const handleEstimatedRequest = async () => {
    try {
      // Значения переменных
      const currency_from = "usd"; // Замените на соответствующую валюту отправления
      const currency_to = selectedPaymentMethod; // Замените на соответствующую валюту получения
      const amount = withdrawalRequestValue; // Используем актуальное значение withdrawalRequestValue

      // Формируем URL с параметрами
      const url = `https://pickbonus.myawardwallet.com/api/payment/estimated.php?amount=${amount}&currency_from=${currency_from}&currency_to=${currency_to}`;

      const response = await fetch(url);

      if (response.ok) {
        const result = await response.json();
        // Обработка успешного ответа
        console.log(result);
        setEstimated(result);
      } else {
        // Обработка ошибки
        console.error(`Request failed with status ${response.status}`);
      }
    } catch (error) {
      // Обработка ошибок в случае неудачи запроса
      console.error("An error occurred during the request:", error);
    }
  };
  //////////////////////////////////////////////

  //МИНИМАЛЬНЫЙ ВЫВОД //
  useEffect(() => {
    const getMinAmount = async () => {
      try {
        const response = await fetch(
          `https://pickbonus.myawardwallet.com/api/payment/minamount.php?currency=${selectedPaymentMethod}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        setMinimumAmount(result);
        console.log("======", result);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    getMinAmount();
  }, [selectedPaymentMethod]);

  ////////////////////////////////////

  ////////////////КОМИССИЯ ЗА ВЫВОД/////////////////////////

  useEffect(() => {
    const fee = async () => {
      try {
        // Проверяем, установлено ли значение withdrawalRequestValue
        if (withdrawalRequestValue !== undefined) {
          const myHeaders = new Headers();
          myHeaders.append("x-api-key", "MG5SRC6-HFBMACK-MMSR9QW-1EST6QC");

          const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
          };

          const response = await fetch(
            `https://api.nowpayments.io/v1/payout/fee?currency=${selectedPaymentMethod}&amount=${withdrawalRequestValue}`,
            requestOptions
          );

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          const result = await response.json();
          console.log(result);
          setMinFee(result);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fee();
  }, [selectedPaymentMethod, withdrawalRequestValue]);

  ///////////////////////////////////////////////////////////////

  console.log("minFee", minFee);

  const [modalPayout, setModalPayout] = useState(false);
  const [modalError, setModalError] = useState(false);
  const [errorMin, setErrorMin] = useState(true);

  const modalPay = async () => {
    handleEstimatedRequest();
    setModalPayout(!modalPayout);
  };

  const [errorMessage, setErrorMessage] = useState("");
  // const handleAmountChange = (e) => {
  //   const enteredValue = parseFloat(e.target.value);

  //   if (enteredValue < 3.99 || isNaN(enteredValue)) {
  //     setWithdrawalRequestValue("");
  //     setErrorMin(true);
  //     setErrorMessage(
  //       t("Withdrawal rejected: Minimum withdrawal amount is 4 USD.")
  //     );
  //   } else if (enteredValue > user.balance) {
  //     setErrorMin(true);
  //     setErrorMessage(t("Not enough funds in the account."));
  //   } else {
  //     setTimeout(() => {
  //       setErrorMin(false);
  //     }, 700);
  //     setErrorMessage("");
  //     setWithdrawalRequestValue(enteredValue);
  //   }
  // };

  const handleAmountChange = (e) => {
    const enteredValue = parseFloat(e.target.value.trim()); // Убираем пробелы в начале и в конце
  
    setWithdrawalRequestValue(e.target.value);
  
    if (isNaN(enteredValue) || enteredValue < 4) {
      setErrorMin(true);
      setErrorMessage(
        t("Withdrawal rejected: Minimum withdrawal amount is 4 USD.")
      );
    } else if (enteredValue > user.balance) {
      setErrorMin(true);
      setErrorMessage(t("Not enough funds in the account."));
    } else {
      setErrorMin(false);
      setErrorMessage("");
    }
  };
  


  return (
    <div className="withdrawal">
      <Header />
      <div className="top-block">
        <h2>{t("Withdrawal")}</h2>
      </div>
      <div className="ui-methods">
        <div className="container flex">
          <div className="menu">
            <div
              className={`menu-item ${
                selectedMenuItem === "withdrawal/" ? "active" : ""
              }`}
              onClick={() => handleMenuItemClick("withdrawal/")}
            >
              {t("Withdrawal Request")}
            </div>
          </div>
          <div className="menu-info">
            {selectedMenuItem === "withdrawal/" && (
              <div className="flex menu-content">
                <h4>{t("Withdrawal Requests")}</h4>
                <div className="all-balance">
                  <p>
                    <span>{user.login}</span> {t("your current balance is:")}
                  </p>
                  {Object.keys(user).length > 0 && (
                    <div className="balance">
                      <span>{user.balance} USD</span>
                    </div>
                  )}
                </div>
                <div className="withdrawal-form">
                  <p className="lefttext">
                  {t("Your balances are safe, but temporarily unavailable. Technical work is currently underway. We will definitely notify you as soon as the withdrawal option is restored.")}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
