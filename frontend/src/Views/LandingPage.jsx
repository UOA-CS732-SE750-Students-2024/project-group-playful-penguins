import styles from "./LandingPage.module.css";
import UserIcon from "../assets/SVGIconComponents/UserIcon";

export default function LandingPage() {
  console.log(styles);
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
          className={`${styles["quicksand-regular"]} ${styles["slogan-first-line"]}`}
        >
          Can't decide what to eat? no worries
          <br />
          <b
            className={`${styles["quicksand-bold"]} ${styles["slogan-second-line"]}`}
          >
            PLAYFUL PENGUINS GOT YOU COVERED
          </b>
        </h1>
      </div>

      <div className={styles["CTAs-container"]}>
        <div className={`${styles["CTA"]} ${styles["CTA-takeout"]}`}>
          <h3 className={styles["quicksand-medium"]}>
            Don't feel like cooking, we got you&nbsp;
            <strong className={styles["quicksand-bold"]}>
              many healthy takeout options to choose from your loved brands
            </strong>
          </h3>
          <button
            id={`${styles["CTA-button-takeout"]}`}
            className={styles["quicksand-bold"]}
          >
            Takeout
          </button>
        </div>
        <div className={`${styles["CTA"]} ${styles["CTA-cook"]}`}>
          <h3 className={styles["quicksand-bold"]}>
            You got some saute skills,&nbsp;
            <span className={styles["quicksand-medium"]}>
              playful penguins <br />
              got you a<strong> range of recipes</strong> to put your skills to
              test !
            </span>
          </h3>
          <button
            id={`${styles["CTA-button-cook"]}`}
            className={styles["quicksand-bold"]}
          >
            Cook at home
          </button>
        </div>
      </div>
    </>
  );
}
