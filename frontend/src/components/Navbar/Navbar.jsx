import React, { useContext, useState } from "react";
import styles from "./Navbar.module.css";
import { AppContext } from "../../providers/AppContextProvider";
export function Navbar() {
  const { isTakeout, changeCategory } = useContext(AppContext);
  return (
    <div
      className={isTakeout ? styles["header-takeout"] : styles["header-cook"]}
    >
      Navbar
      <button
        className={
          isTakeout ? styles["takeout-button-picked"] : styles["takeout-button"]
        }
        onClick={() => changeCategory(true)}
      >
        Takeout
      </button>
      <button
        className={
          isTakeout ? styles["cook-button"] : styles["cook-button-picked"]
        }
        onClick={() => changeCategory(false)}
      >
        Cook
      </button>
    </div>
  );
}
