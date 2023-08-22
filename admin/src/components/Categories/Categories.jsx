import React from "react";
import styles from "./Categories.module.scss";
import Collaps from "./Collaps/Collaps";

const Categories = () => {
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h3>Категорії</h3>
        <button>ДОДАТИ КАТЕГОРІЮ</button>
      </div>
      <div className={styles.collapses}>
        <Collaps />
        <Collaps />
        <Collaps />
      </div>
    </div>
  );
};

export default Categories;
