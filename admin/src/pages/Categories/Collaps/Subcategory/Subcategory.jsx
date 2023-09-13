import React, { useState } from "react";
import styles from "./Subcategory.module.scss";
import ChangeIcon from "../../../../svgs/ChangeIcon";
import ArrowToRight from "../../../../svgs/ArrowToRight";
import ArrowToBottomIcon from "../../../../svgs/ArrowToBottomIcon";

const Subcategory = (props) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const {name, subcategoryId} = props.subcategories

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  return (
    <div className={styles.container}>
      <div className={styles.collaps}>
        <section onClick={toggleCollapse}>
          <div className={styles.openMoreArrow}>
            {isCollapsed ? (
              <ArrowToBottomIcon iconSize={"24"} />
            ) : (
              <ArrowToRight iconSize={"24"} />
            )}
          </div>
          <h5>{name}</h5>
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
