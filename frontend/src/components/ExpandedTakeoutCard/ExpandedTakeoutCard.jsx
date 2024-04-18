import styles from "./ExpandedTakeoutCard.module.css"

//should take a food item as a parameter
export default function ExpandedTakeoutCard(){

    //  placeholder static foodItem
    const foodItem = {
        title: "Triple Cheese Pizza", 
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras scelerisque turpis id elit vehicula, et accumsan ligula tempus. Aenean hendrerit sodales purus sit amet pharetra. Phasellus in euismod metus. Donec eu ex mauris. Pellentesque fermentum aliquet tortor, vitae porttitor nisi ornare in. Aliquam elementum rutrum enim vitae dictum. Sed et bibendum libero, id elementum ipsum. Vivamus eu pellentesque dolor. Proin in vehicula tortor. Sed in arcu non nibh ultrices porta. Nunc feugiat nisl at hendrerit iaculis. In hac habitasse platea dictumst. Suspendisse ipsum nulla, luctus vitae blandit eget, dictum in dolor. Curabitur quis diam pretium, vehicula eros at, laoreet nunc. ", 
        imageUrl: "../public/images/pizza.jpg"};

    const icons = ["../public/images/clock-icon.png", "../public/images/money-icon.png", "../public/images/cutlery-icon.png"]

    // food param could be turned into map function
    return(
    <div className={styles[`card`]}>
        
        <div className={styles[`card-top-content`]}>
            
            <div>
                <img src={foodItem.imageUrl} alt={foodItem.title} className={styles[`food-image`]} />
            </div>

            <div>
                <h2 className={styles[`food-title`]} >{foodItem.title}</h2>
                <div className={styles[`food-params`]}>
                    <div className={styles[`single-param`]}>
                        <img src={icons[0]} />
                        <p>Delivery Time:</p>
                    </div>
                    <div className={styles[`single-param`]}>
                        <img src={icons[1]} />
                        <p>Price Range:</p>
                    </div>
                    <div className={styles[`single-param`]}>
                        <img src={icons[2]} />
                        <p>Serves:</p>
                    </div>
                </div>
            </div>

        </div>

        <div className={styles[`card-bottom-content`]}>
            <h3 className={styles[`card-description-title`]}>Description</h3>
            <p className={styles[`card-description`]}>{foodItem.description}</p>

            <div className={styles[`card-button`]}>
                <button>Order!</button>
            </div>
        </div>

    </div>
    );
}