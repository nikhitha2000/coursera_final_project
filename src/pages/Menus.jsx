import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import styles from "./Onprogress.module.css";


function Menus() {
  return (
    <div className={styles.onProgress}>
      <h1>Menus</h1>
      <p>On progress!!!!</p>
    </div>
  );
}

export default Menus;
