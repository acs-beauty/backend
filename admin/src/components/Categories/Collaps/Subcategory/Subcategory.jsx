import React, { useState } from "react";
import styles from "./Subcategory.module.scss";
import ChangeIcon from "../../../svgs/ChangeIcon";
import ArrowToRight from "../../../svgs/ArrowToRight";

const Subcategory = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  return (
    <div className={styles.container}>
      <div className={styles.collaps}>
        <section onClick={toggleCollapse}>
          <div className={styles.openMoreArrow}>
            <ArrowToRight iconSize={"24"} />
          </div>
          <h5>Демакіяж</h5>
        </section>
        <div className={styles.icon}>
          <ChangeIcon />
        </div>
      </div>
      {isCollapsed && (
        <div className={styles.content}>
          Дополнительная инфо по подкатегории
        </div>
      )}
    </div>
  );
};

export default Subcategory;
