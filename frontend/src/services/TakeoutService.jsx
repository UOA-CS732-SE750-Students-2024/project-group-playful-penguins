import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const getTakeouts = async () => {
    try {
        const response = await axios.get(BACKEND_URL + "/takeouts/");
        if (!response.data) {
            throw new Error('No data from backend');
        };
        return response.data;
    } catch (error) {
        console.error('Error fetching data: ', error);
    }
}

export default { getTakeouts };
