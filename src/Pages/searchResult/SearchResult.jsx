import React, {useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import InfiniteScroll from "react-infinite-scroll-component";

import "./style.scss";

import {fetchDataFromApi} from "../../utils/api";
import ContentWrapper from "../../Components/contentWrapper/ContentWrapper";
import MovieCard from "../../Components/movieCard/MovieCard";
import Spinner from "../../Components/spinner/Spinner";
import noResults from "../../assets/no-results.png";



const SearchResult = () => {
    const [data, setData] = useState(null);
    const [pageNum, setPageNum] = useState(1);
    const [loading, setLoading] = useState(false);
    const { query } = useParams();

    const fetchInitialData = () => {
      setLoading(true);
      fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then((res) => {
        setData(res)
        setPageNum((prev) => prev+1)
        setLoading(false);
        // console.log(res);
      })
    }

    const fetchNextPageData = () => {
      fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then((res) => {
        if(data?.results) {
          setData({
              ...data, results:[...data?.results, ...res.results]
            })
        }
        else {
          setData(res);
        }
        setPageNum((prev) => prev+1)
      })
    }

    useEffect(() => {
      fetchInitialData();
      // eslint-disable-next-line
    },[query])

  return (
    <div className='searchResultsPage'>
      {loading && <Spinner initial={true} />}
      {!loading && (
        <ContentWrapper>
          {data?.results?.length > 0 ? (
            <>
            <div className="pageTitle">
              {`Search ${
                data?.total_results > 1 ?
                "results" : "result" }
                 of ${query}
              `}
            </div>
            <InfiniteScroll
                className='content'
                dataLength={data?.results?.length || []}
                next={fetchNextPageData}
                hasMore={pageNum <= data?.total_pages}
                loader={<Spinner />}
            >
                {data?.results?.map((item, index) => {
                  if(item?.media_type === 'person') return null;
                  return (
                    <MovieCard 
                        key={index}
                        data={item}
                        // media_type={item?.media_type}
                        fromSearch={true}
                    />
                  )
                })}
            </InfiniteScroll>
            </>
          ) : (
            <span className="resultNotFound" style={{margin:'auto'}}>
              <span>Sorry, Results not found!</span>
              <br/>
              <img src={noResults} alt=''style={{width:'200px', height:'200px',margin:'auto'}}/>
            </span>
          )}
        </ContentWrapper>
      )}
    </div>
  )
}

export default SearchResult