import React, { useContext, useState } from "react";
import styles from "./Navbar.module.css";
import { AppContext } from "../../providers/AppContextProvider";
function Navbar() {
  const { isTakeout, changeCategory } = useContext(AppContext);
  return (
    <div className={isTakeout ? styles.header_takeout : styles.header_cook}>
      Navbar
      <button
        className={
          isTakeout ? styles.takeout_button_picked : styles.takeout_button
        }
        onClick={() => changeCategory(true)}
      >
        Takeout
      </button>
      <button
        className={isTakeout ? styles.cook_button : styles.cook_button_picked}
        onClick={() => changeCategory(false)}
      >
        Cook
      </button>
    </div>
  );
}

export default Navbar;
