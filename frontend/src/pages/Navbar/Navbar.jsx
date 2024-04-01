import React, { useState } from "react";
import styles from "./Navbar.module.css";
function Navbar() {
  const [isTakeout, setTakeout] = useState(true);
  return (
    <div className={isTakeout ? styles.header_takeout : styles.header_cook}>
      Navbar
      <button
        className={
          isTakeout ? styles.takeout_button_picked : styles.takeout_button
        }
        onClick={() => setTakeout(true)}
      >
        Takeout
      </button>
      <button
        className={isTakeout ? styles.cook_button : styles.cook_button_picked}
        onClick={() => setTakeout(false)}
      >
        Cook
      </button>
    </div>
  );
}

export default Navbar;
