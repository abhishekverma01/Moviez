// axios use karke global method likhna apni API ko call karne ke liye.
import axios from "axios";


const TMDB_TOKEN = process.env.REACT_APP_TMDB_TOKEN;
const BASE_URL = "https://api.themoviedb.org/3";

const headers = {
    Authorization:`bearer ${TMDB_TOKEN}`,
}

export const fetchDataFromApi = async (url,params)=>{
    try{
        const {data} = await axios.get(`${BASE_URL}${url}`,{
            headers,
            params,
        })
        // console.log(data);
        return data;
    }catch(err){
        // console.log(err);
        return err;
    }
}