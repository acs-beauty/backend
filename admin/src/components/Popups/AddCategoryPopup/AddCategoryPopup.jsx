import React from "react";
import styles from "./AddCategoryPopup.module.scss";
import Toggler from "../../Toggler/Toggler";
import AddIcon from "../../../svgs/AddIcon";
import VioletButton from "../../VioletButton/VioletButton";
import CloseIcon from "../../../svgs/CloseIcon";

const AddCategoryPopup = ({setActive}) => {
  return (
    <div className={styles.container} >
      <h3>Категорії/Додати категорію</h3>
      <div className={styles.popupBody}>
        <div className={styles.heading}>
          <div></div>
          <h4>ДОДАТИ КАТЕГОРІЮ</h4>
          <div className={styles.closeIcon} 
           onClick={() => setActive(false)}
          >
            <CloseIcon />
          </div>
        </div>

        <div className={styles.addImageField}>
          <div className={styles.icon}>
            <AddIcon color={"#5c5e60"} />
          </div>
          <h5>Додати зображення</h5>
        </div>
        <label for="name">
          <h6 className={styles.optionName}>Назва категорії</h6>
        </label>
        <input type="text" id="name" />
        <label for="link">
          <h6 className={styles.optionName}>URL</h6>
        </label>
        <input type="text" id="link" />
        <label for="description">
          <h6 className={styles.optionName}>Опис</h6>
        </label>
        <input type="text" id="description" />
        <div className={styles.togglerContainer}>
          <Toggler />
        </div>
        <div className={styles.violetButton}>
          <VioletButton buttonText={"CТВОРИТИ"} radius={"8px"} />
        </div>
      </div>
    </div>
  );
};

export default AddCategoryPopup;
