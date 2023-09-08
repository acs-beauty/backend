import React, { useState } from "react";
import styles from "./Collaps.module.scss";
import ArrowToRight from "../../../svgs/ArrowToRight";
import ChangeIcon from "../../../svgs/ChangeIcon";
import DeleteIcon from "../../../svgs/DeleteIcon";
import AddIcon from "../../../svgs/AddIcon";
import Subcategory from "./Subcategory/Subcategory";
import AddSubcategoryPopup from "../../../components/Popups/AddSubcategoryPopup/AddSubcategoryPopup";
import ArrowToBottomIcon from "../../../svgs/ArrowToBottomIcon";

const Collaps = (props) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [active, setActive] = useState(false);

  const { name } = props.data;

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
    setActive(false);
  };
  const showAddSubcategoryPopup = () => {
    setIsCollapsed(true);
    setActive(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.collapsContainer}>
        <div></div>
        <div className={styles.categoryName}>
          <h2>{name}</h2>
          <div className={styles.actions}>
            <div className={styles.icon}>
              <ChangeIcon />
            </div>
            <div className={styles.icon}>
              <DeleteIcon />
            </div>
            {!active && (
              <div className={styles.icon} onClick={showAddSubcategoryPopup}>
                <AddIcon color={"#FFF"} />
              </div>
            )}
          </div>
        </div>
        <div className={styles.openSubcategoriesArrow} onClick={toggleCollapse}>
          {isCollapsed ? <ArrowToBottomIcon /> : <ArrowToRight />}
        </div>
      </div>
      {isCollapsed && !active && (
        <div className={styles.content}>
          <Subcategory />
          <Subcategory />
          <Subcategory />
          <Subcategory />
        </div>
      )}
      {active && (
        <div className={styles.content}>
          <AddSubcategoryPopup setActive={setActive} />
        </div>
      )}
    </div>
  );
};

export default Collaps;
