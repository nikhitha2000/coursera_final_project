import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import styles from "./Onprogress.module.css";


function Joinmember() {
  return (
    <div className={styles.onProgress}>
      <h1>Join Members</h1>
      <p>On progress!!!!</p>
    </div>
  );
}

export default Joinmember;