import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../dataBrands/Header";
import LoaderMini from "../LoaderMini/LoaderMini";

export function Faq() {
  const location = useLocation();
  const pathname = location.pathname;
  const currentPageName = pathname.replace("/", ""); // Убираем первый слеш

  const [selectedMenuItem, setSelectedMenuItem] = useState(
    currentPageName || "withdrawal/"
  );

  const [withdrawalRequestValue, setWithdrawalRequestValue] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [loading, setLoading] = useState(false); // Добавляем состояние для отслеживания загрузки данных
  const [user, setUser] = useState([]);

  const urlParams = new URLSearchParams(window.location.search);

  useEffect(() => {
    const idUserParam = urlParams.get("keyword");

    const fetchUsers = async () => {
      try {
        const res = await fetch(
          "https://sheet.best/api/sheets/04468527-4aef-44af-8560-08bf093a2970"
        );
        if (res.ok) {
          const users = await res.json();

          const filteredUsers = users.filter((user) => {
            return user.login === idUserParam;
          });

          setUser(filteredUsers);
        } else {
          console.error("Failed to fetch data:", res.status);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    fetchUsers();
  }, [urlParams.get("keyword")]); // Добавляем зависимость от параметра URL

  // Обработчик изменения выбранной опции платежного метода
  const handlePaymentMethodChange = (event) => {
    setSelectedPaymentMethod(event.target.value);
  };

  // Функция для добавления задержки

  // Обработчик клика по элементам меню
  const handleMenuItemClick = async (menuItem) => {
    setLoading(true); // Устанавливаем состояние загрузки перед переключением меню

    setSelectedMenuItem(menuItem);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  return (
    <div className="withdrawal">
      <Header />
      <div className="top-block">
        <h2>Withdrawal</h2>
      </div>
      <div className="ui-methods">
        <div className="container flex">
          <div className="menu">
            <div
              className={`menu-item ${
                selectedMenuItem === "my-account/" ? "active" : ""
              }`}
              onClick={() => handleMenuItemClick("my-account/")}
            >
              My Account
            </div>
            <div
              className={`menu-item ${
                selectedMenuItem === "withdrawal/" ? "active" : ""
              }`}
              onClick={() => handleMenuItemClick("withdrawal/")}
            >
              Withdrawal Request
            </div>
            <div
              className={`menu-item ${
                selectedMenuItem === "faq/" ? "active" : ""
              }`}
              onClick={() => handleMenuItemClick("faq/")}
            >
              Faq
            </div>
          </div>
          <div className="menu-info">
            {loading && <LoaderMini />}
            {selectedMenuItem === "my-account/" && (
              <div>Информация о My Account</div>
            )}
            {selectedMenuItem === "withdrawal/" && (
              <div className="flex menu-content">
                <h4>Withdrawal Requests</h4>
                <div className="all-balance">
                  <p>Your current balance is: </p>
                  {user.map((userData) => (
                    <div className="balance" key={userData.id}>
                      <span>{userData.balance / 10} USD</span>
                    </div>
                  ))}
                </div>
                <form className="withdrawal-form" action="">
                  <div className="column">
                    <label for="amount">Amount</label>
                    <input
                      type="number"
                      name="amount"
                      id="amount"
                      placeholder="0"
                      min="5"
                      max="1000"
                      step="1"
                      required=""
                      value={withdrawalRequestValue}
                      onChange={(e) =>
                        setWithdrawalRequestValue(e.target.value)
                      }
                    />
                  </div>

                  <div className="column">
                    <label for="method" class="">
                      Select Payment Method
                    </label>
                    <select
                      name="method"
                      id="fsww-payment-method"
                      required=""
                      value={selectedPaymentMethod}
                      onChange={handlePaymentMethodChange}
                    >
                      <option value="">Select Payment Method</option>
                      <option value="bitcoin">Bitcoin</option>
                      <option value="trc20">USDT-TRC20</option>
                      <option value="erc20">USDT-ERC20</option>
                    </select>
                  </div>

                  {selectedPaymentMethod && (
                    <div className="column">
                      <label for="wallet">Wallet Address</label>
                      <input
                        type="text"
                        name="wallet"
                        id="wallet"
                        placeholder="Enter wallet address"
                        required=""
                      />
                    </div>
                  )}
                  <input
                    className="btn btn-primary"
                    value="Send Request"
                    type="submit"
                  />
                </form>
              </div>
            )}
            {selectedMenuItem === "faq/" && <div>Информация о Faq</div>}
          </div>
        </div>
      </div>
      <footer>Copyright © 2023, pickbonus.myawardwallet.com. All rights reserved.</footer>
    </div>
  );
}
