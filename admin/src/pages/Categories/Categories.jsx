import React from "react";
import styles from "./Categories.module.scss";
import Collaps from "./Collaps/Collaps";
import VioletButton from '../../components/VioletButton/VioletButton';

const Categories = () => {
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h3>Категорії</h3>
        <VioletButton buttonText={'ДОДАТИ КАТЕГОРІЮ'}/>
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
