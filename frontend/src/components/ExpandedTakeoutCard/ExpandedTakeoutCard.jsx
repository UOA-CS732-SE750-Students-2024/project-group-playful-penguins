import styles from "./ExpandedTakeoutCard.module.css"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';


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
    <Card className={styles[`card`]}>
        <CardContent className={styles[`card-top-content`]}>
            <Box>
                <CardMedia component="img" image={foodItem.imageUrl} alt={foodItem.title} className={styles[`food-image`]} />
            </Box>

            <Box>
                <Typography  variant="h5" component="h2" className={styles[`food-title`]} >
                    {foodItem.title}
                </Typography>

                <Box>
                    <Box className={styles[`single-param`]}>
                        <CardMedia image={icons[0]} />
                        <Typography variant="body2">Delivery Time:</Typography >
                    </Box>
                    <Box className={styles[`single-param`]}>
                        <CardMedia image={icons[1]} />
                        <Typography variant="body2">Price Range:</Typography>
                    </Box>
                    <Box className={styles[`single-param`]}>
                        <CardMedia image={icons[2]} />
                        <Typography variant="body2">Serves:</Typography>
                    </Box>
                </Box>
                
            </Box>
        </CardContent>

        <CardContent className={styles[`card-bottom-content`]}>
            <Typography variant="h6" className={styles[`card-description-title`]}>
                Description
            </Typography>
            <Typography variant="body1" className={styles[`card-description`]}>
                {foodItem.description}
            </Typography>

            <Box className={styles[`card-button`]}>
                <Button variant="contained">Order!</Button>
            </Box>
        </CardContent>
    </Card>
    );
}