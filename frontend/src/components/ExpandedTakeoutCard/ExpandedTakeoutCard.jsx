import styles from "./ExpandedTakeoutCard.module.css"

//should take a food item as a parameter
export default function ExpandedTakeoutCard(){

    //  placeholder static foodItem
    const foodItem = {
        title: "Triple Cheese Pizza", 
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras scelerisque turpis id elit vehicula, et accumsan ligula tempus. Aenean hendrerit sodales purus sit amet pharetra. Phasellus in euismod metus. Donec eu ex mauris. Pellentesque fermentum aliquet tortor, vitae porttitor nisi ornare in. Aliquam elementum rutrum enim vitae dictum. Sed et bibendum libero, id elementum ipsum. Vivamus eu pellentesque dolor. Proin in vehicula tortor. Sed in arcu non nibh ultrices porta. Nunc feugiat nisl at hendrerit iaculis. In hac habitasse platea dictumst. Suspendisse ipsum nulla, luctus vitae blandit eget, dictum in dolor. Curabitur quis diam pretium, vehicula eros at, laoreet nunc. ", 
        imageUrl: "../resources/pizza.jpg"};

    const icons = ["../resources/clock-icon.png", "../resources/cutlery-icon.png"]

    // food param could be turned into map function
    return(
    <div className={styles.card}>
        
        <div className={styles.cardTopContent}>
            
            <div>
                <img src={foodItem.imageUrl} alt={foodItem.title} className={styles.foodImage} />
            </div>

            <div>
                <h2 className={styles.foodTitle} >{foodItem.title}</h2>
                <div className={styles.foodParams}>
                    <div className={styles.singleParam}>
                        <img src={icons[0]} />
                        <p>Prep Time:</p>
                    </div>
                    <div className={styles.singleParam}>
                        <img src={icons[0]} />
                        <p>Cooking Time:</p>
                    </div>
                    <div className={styles.singleParam}>
                        <img src={icons[1]} />
                        <p>Serves:</p>
                    </div>
                </div>
            </div>

        </div>

        <div className={styles.cardBottomContent}>
            <h3 className={styles.cardDescriptionTitle}>Description</h3>
            <p className={styles.cardDescription}>{foodItem.description}</p>
        </div>

    </div>
    );
}