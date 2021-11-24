import useMovieService from "../../service/MovieService"

import {useState, useEffect} from 'react'

import ErrorBoundary from "../errorBoundary/ErrorBoundary"

import MovieCarousel from "../movieCarousel/MovieCarousel"
import MainList from "../mainList/MainList"

const MainPage = () => {

    const [baseURL, setBaseURL] = useState('')
    const [data, setData] = useState(null)

    const {getConfiguration, getTopRatedMovies} = useMovieService();

  useEffect(() => {
    getConfiguration().then(({ base_url, poster_sizes }) => {
      setBaseURL(`${base_url}${poster_sizes[5]}`)
      getTopRatedMovies().then((data) => {
        const arr = data.map(item => {
          return {
            url: base_url.slice(0, -1) + "/" + poster_sizes[5] + item.poster_path,
            id: item.id,
          }
          }
        );
        setData(arr)
      });
    });
  }, [])

    return (
        <>
            
                <ErrorBoundary>
                    <MovieCarousel data={data} from="movie"/>
                </ErrorBoundary>

                <ErrorBoundary>
                    <MainList baseURL={baseURL} />
                </ErrorBoundary>
        </>
    )
}

export default MainPage;