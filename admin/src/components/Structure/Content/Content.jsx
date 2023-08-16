import React from "react";
import styles from "./Content.module.scss";
import {Route, Routes} from 'react-router-dom'
import Dashboard from '../../Dashboard/Dashboard';

const Content = () => {
  return <div className={styles.container}>
    <Routes>
      <Route path="/dashboard" element={<Dashboard/>}></Route>
    </Routes>

  </div>;
};

export default Content;
