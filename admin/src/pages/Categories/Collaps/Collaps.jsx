import React, { useState } from "react";
import styles from "./Collaps.module.scss";
import ArrowToRight from "../../../svgs/ArrowToRight";
import ChangeIcon from "../../../svgs/ChangeIcon";
import DeleteIcon from "../../../svgs/DeleteIcon";
import AddIcon from "../../../svgs/AddIcon";
import Subcategory from "./Subcategory/Subcategory";

const Collaps = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={styles.container}>
      <div className={styles.collapsContainer}>
        <div></div>
        <div className={styles.categoryName}>
          <h2>ДОГЛЯД</h2>
          <div className={styles.actions}>
            <div className={styles.icon}>
              <ChangeIcon />
            </div>
            <div className={styles.icon}>
              <DeleteIcon />
            </div>
            <div className={styles.icon}>
              <AddIcon color={'#FFF'}/>
            </div>
          </div>
        </div>
        <div className={styles.openSubcategoriesArrow} onClick={toggleCollapse}>
          <ArrowToRight />
        </div>
      </div>

      {isCollapsed && (
        <div className={styles.content}>
          <Subcategory />
          <Subcategory />
          <Subcategory />
          <Subcategory />
        </div>
      )}
    </div>
  );
};

export default Collaps;
