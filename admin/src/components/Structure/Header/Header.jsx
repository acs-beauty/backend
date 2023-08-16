import React, { useState } from "react";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
import LoginIcon from "../../svgs/LoginIcon";
import NotificationIcon from "../../svgs/NotificationIcon";
import NotificationPopup from "../../Popups/NotificationPopup";
import ProfilePopup from "../../Popups/ProfilePopup";

const Header = () => {
  const [notificationPopupVisible, setNotificationPopupVisible] =
    useState(false);
  const [profilePopupVisible, setProfilePopupVisible] = useState(false);

  const toggleNotificationPopup = () => {
    setNotificationPopupVisible(!notificationPopupVisible);
  };

  const toggleProfilePopup = () => {
    setProfilePopupVisible(!profilePopupVisible);
  };
  return (
    <>
      <div className={styles.container}>
        <Link to="/" className={styles.headerLogo}>
          ACS Beauty
        </Link>
        <div className={styles.headerMenu}>
          <div className={styles.icon} onClick={toggleNotificationPopup}>
            <NotificationIcon />
          </div>
          <div className={styles.icon} onClick={toggleProfilePopup}>
            <LoginIcon color={'white'} />
          </div>
        </div>
      </div>
      {notificationPopupVisible && <NotificationPopup />}
      {profilePopupVisible && <ProfilePopup />}
    </>
  );
};

export default Header;
