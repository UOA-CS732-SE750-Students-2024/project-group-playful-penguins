import styles from "./RecipeInfo.module.css";
import fontStyle from "../../assets/GlobalStyles/CustomFont.module.css";
import ClockIcon from "../../assets/SVGIconComponents/ClockIcon";
import ServingsIcon from "../../assets/SVGIconComponents/ServingsIcon";

export default function RecipeInfo() {
  return (
    <>
      <div className={styles["box"]}>
        <div className={styles["info-container"]}>
          <div className={styles["details-container"]}>
            <div
              className={styles["recipe-photo-container"]}
              src="/images/Yaki-Udon.jpg"
            >
              <img
                className={styles["recipe-photo"]}
                src="/images/Yaki-Udon.jpg"
              />
            </div>
            <div className={styles["basic-info"]}>
              {/* {Recipe name} */}
              <h1 className={fontStyle["quicksand-bold"]}>Veggie Yaki Udon </h1>
              {/* Timing information */}
              <div className={styles["time-info"]}>
                <div id={styles["clock-icon"]}>
                  <ClockIcon />
                </div>
                <h3 className={fontStyle["quicksand-medium"]}>
                  Prep time 25 mins
                </h3>
                <div id={styles["clock-icon"]}>
                  <ClockIcon />
                </div>
                <h3 className={fontStyle["quicksand-medium"]}>
                  Prep time 25 mins
                </h3>
              </div>
              <div className={styles["servings-info"]}>
                <div id={styles["servings-icon"]}>
                  <ServingsIcon />
                </div>
                <h3 className={fontStyle["quicksand-medium"]}>2 servings</h3>
              </div>
              <div className={fontStyle["quicksand-regular"]}>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Facilis eum similique delectus quia minus quaerat cum quibusdam
                cupiditate. Consequatur corporis mollitia nisi similique? Maxime
                porro doloremque, voluptatum sapiente, facere velit adipisci
                ipsam optio praesentium perspiciatis, ad quo vitae nam
                reprehenderit?
              </div>
            </div>
          </div>
          <div className={styles["food-type-container"]}>
            <h3 className={fontStyle["quicksand-regular"]}>
              <strong>Course : </strong> Dinner, Lunch
            </h3>
            <h3 className={fontStyle["quicksand-regular"]}>
              <strong>Cuisine : </strong> Japanese
            </h3>
            <div
              className={`${fontStyle["quicksand-regular"]} ${styles["diet-label"]}`}
            >
              VEGAN
            </div>
          </div>
          <div className={styles["section-container"]}>
            <div className={styles["ingredients-container"]}>
              <h2 className={fontStyle["quicksand-bold"]}>Ingredients</h2>
              <div
                className={`${fontStyle["quicksand-regular"]} ${styles["ingredients-list-container"]}`}
              >
                <div className={styles["ingredient-item"]}>FIrst one</div>
              </div>
            </div>
            <div
              className={`${fontStyle["quicksand-semibold"]} ${styles["nutrients-container"]}`}
            >
              <h3>NUTRITION INFORMATION</h3>
              <div
                className={`${fontStyle["quicksand-medium"]} ${styles["nutrients-item"]}`}
              >
                will show carbs
              </div>
            </div>
          </div>
          <div className={styles["directions-container"]}>
            <h2 className={fontStyle["quicksand-bold"]}>Directions</h2>
            <div
              className={`${fontStyle["quicksand-medium"]} ${styles["direction-item"]}`}
            >
              {" "}
              Step 1{" "}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
