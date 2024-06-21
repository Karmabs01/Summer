import { useEffect, useState, useRef } from "react";
import logo from "../../../src/img/logo2.png";
import arrow from "../../../src/img/arrow-down.png";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
import LanguageSelector from "../LanguageSelector";
import LanguageSelectorMobile from "../LanguageSelectorMobile";
import profile from "../../img/prof.svg";
import wallet from "../../img/wallet.svg";
import dollar from "../../img/dollar.svg";
import shop from "../../img/shop.svg";

import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';

import { useTranslation } from "react-i18next";

function ChildComponent() {
  const { t } = useTranslation();
  const [source, setSource] = useState();
  // const [src, setSrc] = useState("");
  const [user, setUser] = useState([]);
  const [newUrl, setNewUrl] = useState("");
  const urlParams = new URLSearchParams(window.location.search);
  const [showAdditionalOptions, setShowAdditionalOptions] = useState(false);
  const [ipDataCode, setIpDataCode] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuContainerRef = useRef(null);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Для меню профиля
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const handleClickOutsideMenu = (event) => {
      if (
        menuContainerRef.current &&
        !menuContainerRef.current.contains(event.target) &&
        !event.target.classList.contains("btn-menu")
      ) {
        setIsMenuOpen(false);
      }
    };

    // Добавляем обработчик клика при монтировании компонента
    document.addEventListener("click", handleClickOutsideMenu);

    // Очищаем обработчик при размонтировании компонента
    return () => {
      document.removeEventListener("click", handleClickOutsideMenu);
    };
  }, [menuContainerRef]);

  useEffect(() => {
    // Добавьте обработчик для изменения размера окна
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };

    // Вызовите функцию обработчика при монтировании компонента
    handleResize();

    // Добавьте слушатель события изменения размера окна
    window.addEventListener("resize", handleResize);

    // Очистите слушатель события при размонтировании компонента
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const menuRef = useRef(null);
  const api = "https://bonusnumber1.com/api";
  useEffect(() => {
    const idUserParam = urlParams.get("keyword");

    const fetchUsers = async () => {
      if (!idUserParam) return;
      try {
        const res = await fetch(`${api}/user/read_one.php?id=${idUserParam}`);
        if (res.ok) {
          const users = await res.json();

          setUser(users);
        } else {
          console.error("Failed to fetch data:", res.status);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    fetchUsers();
  }, []);
  // console.log("user", user);

  const handleBalanceChange = (event) => {
    event.stopPropagation();
    setShowAdditionalOptions(!showAdditionalOptions);
  };

  useEffect(() => {
    const url = window.location.href;
    const urlObj = new URL(url);
    const searchParams = new URLSearchParams(urlObj.search);
    const newUrl = "?" + searchParams.toString();
    setNewUrl(newUrl);
  }, []);
  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (!menuRef.current || menuRef.current.contains(event.target)) {
        // Если клик был внутри меню, не скрывать его
        return;
      }
      // Если клик был вне меню, скрыть меню
      setShowAdditionalOptions(false);
    };

    // Добавьте обработчик при монтировании компонента
    document.addEventListener("click", handleDocumentClick);

    // Удалите обработчик при размонтировании компонента
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);

    // Удаляем параметр 'brand', если он есть
    searchParams.delete("brand");

    const currentSource = searchParams.get("keyword");
    let sourceValue = "0"; // Значение по умолчанию для 'source'

    // Проверяем, содержит ли 'keyword' идентификатор партнера
    if (currentSource) {
      const match = currentSource.match(/partner(_)?\d+/);
      if (match) {
        sourceValue = match[0]; // Извлекаем идентификатор партнера
        setSource(sourceValue); // Обновляем состояние 'source' с найденным значением
      } else {
        setSource("0"); // Обновляем состояние 'source', если идентификатор партнера не найден
      }
    } else {
      setSource("0"); // Обновляем состояние 'source', если параметр 'keyword' отсутствует
    }
  });

  const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  console.log("SOURCE!!!!!!!!!!!!", source);

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <Link  target="_blank" className="flex" to={`/${newUrl}`}>
          <img className="logo" src={`.${logo}`} />
        </Link>
        {!isMobile ? (
          <div className="flex ml-auto items-center">
            {Object.keys(user).length > 0 && (
              <div className="tickets">
                <Link  target="_blank" to={`https://topbon.us/fortune/${newUrl}`}>
                  <img id="dollar" src={`.${dollar}`} alt={dollar} />
                  {t("Wheel of Fortune")} <span>{user.tickets}</span>
                </Link>
              </div>
            )}
            <div className="relative">
              {Object.keys(user).length > 0 && (
                <div className="parent">
                  <div
                    className="option"
                    value={user.balance}
                    onClick={handleBalanceChange}
                  >
                    {t("Balance")}: {user.balance} USD
                    <img className="arrow-down" src={`${arrow}`} />
                  </div>
                </div>
              )}
              {showAdditionalOptions && (
                <div className="additional-options" ref={menuRef}>
                  <div className="option">
                    <Link
                     target="_blank"
                      className="flex items-center"
                      to={`https://topbon.us/personal/${newUrl}`}
                      onClick={() => setShowAdditionalOptions(false)}
                    >
                      <img className="mr-1" src={`.${wallet}`} alt={wallet} />{" "}
                      {t("Withdraw")}
                    </Link>
                  </div>
                </div>
              )}
            </div>
            {/* {Object.keys(user).length > 0 && (
              <div className="shop">
                <Link to={`https://topbon.us/shop/${newUrl}`}>
                  <img id="shop" src={`.${shop}`} alt={shop} />
                  {t("Shop")}
                </Link>
              </div>
            )} */}
            <LanguageSelector ipDataCode={ipDataCode} source={source} />
            {Object.keys(user).length > 0 && (
              <React.Fragment>
                <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                  <Tooltip title="Account">
                    <IconButton
                      onClick={handleClick}
                      size="small"
                      sx={{ ml: 2 }}
                      aria-controls={open ? 'account-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? 'true' : undefined}
                    >
                      <Avatar sx={{ width: 32, height: 32 }}>{user.login[0]}</Avatar>
                    </IconButton>
                  </Tooltip>
                </Box>
                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: 'visible',
                      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                      mt: 1.5,
                      '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      '&::before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  <MenuItem onClick={handleClose}>
                    <Link
                     target="_blank"
                      to={`https://topbon.us/personal/${newUrl}`}
                      className="balanceWithdraw"
                    >
                      <img className="mr-1" src={`.${profile}`} alt={profile} />
                      {t("Profile")}
                    </Link>
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleClose}>
                    <Link
                     target="_blank"
                      to={`https://topbon.us/personal/${newUrl}`}
                      className="balanceWithdraw"
                    >
                      <img className="mr-1" src={`.${wallet}`} alt={wallet} />
                      {t("Withdraw")} <span>{user.balance} USD</span>
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Link
                     target="_blank"
                      to={`https://topbon.us/fortune/${newUrl}`}
                      className="balanceWithdraw"
                    >
                      <img className="mr-1" src={`.${dollar}`} alt={dollar} />
                      {t("Wheel of Fortune")} <span>{user.tickets}</span>
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Link  target="_blank" className="balanceWithdraw" to={`https://topbon.us/shop/${newUrl}`}>
                      <img className="mr-1" src={`.${shop}`} alt={shop} />
                      {t("Cards shop")}
                    </Link>
                  </MenuItem>
                </Menu>
              </React.Fragment>
            )}

          </div>
        ) : (
          <div className="flex ml-auto items-center">
            <div className="mobile-menu">
              {Object.keys(user).length > 0 && (
                <div className="flex items-center">
                  <Link
                   target="_blank"
                    to={`https://topbon.us/personal/${newUrl}`}
                    className="wallet flex items-center"
                  >
                    <img src={`.${wallet}`} alt={wallet} />
                    <p>{user.balance} USD</p>
                  </Link>
                  <div
                    className="btn-menu"
                    onClick={handleMenuToggle}
                    ref={menuContainerRef}
                  >
                    <img src={`.${profile}`} alt={profile} />
                    <strong className="ticketspoint">{user.tickets}</strong>
                  </div>
                </div>
              )}
              {isMenuOpen && (
                <div className="list-menu">
                  {Object.keys(user).length > 0 && ( // Проверяем, есть ли данные в user
                    <Link
                     target="_blank"
                      to={`https://topbon.us/personal/${newUrl}`}
                      className="balanceWithdraw"
                    >
                      <img className="mr-1" src={`.${wallet}`} alt={wallet} />
                      {t("Withdraw")} <span>{user.balance} USD</span>
                    </Link>
                  )}
                  <div className="mobile-menu-content">
                    {Object.keys(user).length > 0 && (
                      <Link
                       target="_blank"
                        to={`https://topbon.us/fortune/${newUrl}`}
                        className="balanceWithdraw"
                      >
                        <img className="mr-1" src={`.${dollar}`} alt={dollar} />
                        {t("Wheel of Fortune")} <span>{user.tickets}</span>
                      </Link>
                    )}
                    {/* Другие элементы меню для мобильного вида */}
                    {/* ... */}
                  </div>
                  {Object.keys(user).length > 0 && (
                    <div>
                      <Link  target="_blank" className="balanceWithdraw" to={`https://topbon.us/shop/${newUrl}`}>
                        <img className="mr-1" src={`.${shop}`} alt={shop} />
                        {t("Cards shop")}
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>

            <LanguageSelectorMobile ipDataCode={ipDataCode} source={source} />

          </div>
        )}
      </div>
    </header>
  );
}

export default ChildComponent;
