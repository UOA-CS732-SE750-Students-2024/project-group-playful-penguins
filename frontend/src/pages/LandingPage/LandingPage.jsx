import styles from "./LandingPage.module.css";
import fontStyle from "../../assets/GlobalStyles/CustomFont.module.css"
import UserIcon from "../../assets/SVGIconComponents/UserIcon";
import { AppContext } from "../../providers/AppContextProvider";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const { isTakeout, changeCategory } = useContext(AppContext);
  const navigate = useNavigate();

  function openCookPage() {
    changeCategory(false);
    navigate(`/home`);
  }

  function openTakeoutPage() {
    changeCategory(true);
    navigate(`/home`);
  }

  return (
    <>
      <div className={styles.topbar}>
        <img
          id={styles["logo-icon"]}
          src="/images/app-logo.png"
          width="80px"
          height="80px"
          alt="logo for playful penguins"
        />
        <div id={styles["user-icon"]}>
          <UserIcon />
        </div>
      </div>

      <div className={styles["slogan-container"]}>
        <h1
          className={`${fontStyle["quicksand-regular"]} ${styles["slogan-first-line"]}`}
        >
          Can't decide what to eat? no worries
          <br />
          <b
            className={`${fontStyle["quicksand-bold"]} ${styles["slogan-second-line"]}`}
          >
            PLAYFUL PENGUINS GOT YOU COVERED
          </b>
        </h1>
      </div>

      <div className={styles["CTAs-container"]}>
        <div className={`${styles["CTA"]} ${styles["CTA-takeout"]}`}>
          <h3 className={fontStyle["quicksand-medium"]}>
            Don't feel like cooking, we got you&nbsp;
            <strong className={fontStyle["quicksand-bold"]}>
              many healthy takeout options to choose from your loved brands
            </strong>
          </h3>
          <button
            onClick={openTakeoutPage}
            id={`${styles["CTA-button-takeout"]}`}
            className={fontStyle["quicksand-bold"]}
          >
            Takeout
          </button>
        </div>
        <div className={`${styles["CTA"]} ${styles["CTA-cook"]}`}>
          <h3 className={fontStyle["quicksand-bold"]}>
            You got some saute skills,&nbsp;
            <span className={fontStyle["quicksand-medium"]}>
              playful penguins <br />
              got you a<strong> range of recipes</strong> to put your skills to
              test !
            </span>
          </h3>
          <button
            onClick={openCookPage}
            id={`${styles["CTA-button-cook"]}`}
            className={fontStyle["quicksand-bold"]}
          >
            Cook at home
          </button>
        </div>
      </div>
    </>
  );
}
