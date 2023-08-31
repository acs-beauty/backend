import React, { useState } from "react";
import styles from "./Categories.module.scss";
import Collaps from "./Collaps/Collaps";
import VioletButton from "../../components/VioletButton/VioletButton";
import AddCategoryPopup from "../../components/Popups/AddCategoryPopup/AddCategoryPopup";

const Categories = () => {
  const [active, setActive] = useState(false);

  return (
    <>
      <div className={styles.container} style={{ display: active ? 'none' : '' }}>
        <div className={styles.heading}>
          <h3>Категорії</h3>
          <VioletButton
            buttonText={"ДОДАТИ КАТЕГОРІЮ"}
            onClickFunction={() => setActive(true)}
          />
        </div>
        <div className={styles.collapses}>
          <Collaps />
          <Collaps />
          <Collaps />
        </div>
      </div>
      {active && <AddCategoryPopup setActive={setActive}/>}
    </>
  );
};

export default Categories;
