import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import styles from "./Onprogress.module.css";


function Orderonline() {
  return (
    <div className={styles.onProgress}>
      <h1>Order Online</h1>
      <p>On progress!!!!</p>
    </div>
  );
}

export default Orderonline;
