import React from "react";
import styles from "./AddSubcategoryPopup.module.scss";
import CloseIcon from "../../../svgs/CloseIcon";
import VioletButton from "../../VioletButton/VioletButton";
import Toggler from "../../Toggler/Toggler";

const AddSubcategoryPopup = ({ setActive }) => {
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <div></div>
        <h3>ДОДАТИ ПІДКАТЕГОРІЮ</h3>
        <div className={styles.closeIcon} onClick={() => setActive(false)}>
          <CloseIcon />
        </div>
      </div>
      <div className={styles.form}>
        <label for="name">
          <h6 className={styles.optionName}>Назва підкатегорії</h6>
        </label>
        <input type="text" id="name" />
        <label for="link">
          <h6 className={styles.optionName}>URL</h6>
        </label>
        <input type="text" id="link" />
        <label for="description">
          <h6 className={styles.optionName}>Опис</h6>
        </label>
        <input
          type="text"
          id="description"
          className={styles.descriptionInput}
        />
        <div className={styles.togglerContainer}>
          <Toggler />
        </div>
      </div>
      <div className={styles.violetButton}>
        <VioletButton buttonText={"ДОДАТИ"} onClickFunction={"#"} />
      </div>
    </div>
  );
};

export default AddSubcategoryPopup;
