import React, {useEffect } from 'react';
import { fetchDataFromApi } from "./utils/api";
import { useDispatch } from 'react-redux';
import { getApiConfiguration, getGenres } from './features/HomeSlice';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Home from "./Pages/Home/Home";
import Details from "./Pages/Details/Details";
import Explore from "./Pages/Explore/Explore";
import SearchResult from "./Pages/searchResult/SearchResult";
import PageNotFound from "./Pages/404/PageNotFound"


function App()  {

  const dispatch = useDispatch();

  const fetchApiConfig = () => {
    fetchDataFromApi("/configuration").then((res) => {
        const url = {
          backdrop: res.images.secure_base_url + 'original',
          poster: res.images.secure_base_url + 'original',
          profile: res.images.secure_base_url + 'original',
        }
        dispatch(getApiConfiguration(url));
    })
  }  

  // use of Promise.all for multiple promises {call api to get genres of movie and tv}
  const genresCall = async () => {
    let promises = [];
    let endPoints = ["tv", "movie"];
    let allGenres = {};

    endPoints.forEach((genre) => {
        promises.push(fetchDataFromApi(`/genre/${genre}/list`))
    })
    // console.log(promises);

    const data = await Promise.all(promises);
    // console.log(data);
    data.map(({genres}) => {
        return genres.map((item) => allGenres[item.id] = item);
    });
    // console.log(allGenres);
    // const genres = fetchDataFromApi(`/genre/movie/list`);
    // console.log(genres);
    dispatch(getGenres(allGenres))
  }

  useEffect(() => {
    fetchApiConfig();
    genresCall();
    // eslint-disable-next-line
  },  [])
  
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/:media_type/:id' element={<Details />}/>
        <Route path='/search/:query' element={<SearchResult />}/>
        <Route path='/explore/:media_type' element={<Explore />}/>
        <Route path='*' element={<PageNotFound />}/>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
export default App;





// path='*' (means agar upar ke paths match nahi karenge toh is route par ke element ko render karenge)

// const fetchApiConfig = (dispatch) => {
//   fetchDataFromApi("/movie/popular").then((res) => {
//       console.log(res);
//       dispatch(getApiConfiguration(res));
//   })
// }  




// const fetchApiConfig = (dispatch) => {
//   fetchDataFromApi('/movie/popular').then((res) => {
//     console.log(res);
//     dispatch(getApiConfiguration(res));
//   });
// };

// const App = () => {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     fetchApiConfig(dispatch);
//   }, [dispatch]);

//   return (
//     <div>App</div>
//   );
// };


/* <div>App
      {url?.total_pages}
    </div> */