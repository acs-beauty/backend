import React, { useState } from "react";
import styles from "./Toggler.module.scss";

const Toggler = () => {
  const [isToggled, setIsToggled] = useState(false);

  const toggleElement = () => {
    setIsToggled(!isToggled);
  };
  return (
    <div className={styles.container}>
      <h5>Відображення</h5>
      <button
        className={`${styles.toggle} ${isToggled ? styles.toggleActive : ""}`}
        onClick={toggleElement}
      >
        <div className={styles.toggleCircle}></div>
        {isToggled ? <h6>Увiмкнено</h6> : <h6>Вимкнено</h6>}
      </button>
    </div>
  );
};

export default Toggler;
