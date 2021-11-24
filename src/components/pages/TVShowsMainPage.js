import useMovieService from "../../service/MovieService";

import { useState, useEffect } from "react";

import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import MovieCarousel from "../movieCarousel/MovieCarousel";
import TVMainList from '../TVMainList/TVMainList'

const TVShowsMainPage = () => {
  const [baseURL, setBaseURL] = useState("");
  const [data, setData] = useState(null);

  const { getConfiguration, getTopRatedTV } = useMovieService();

  useEffect(() => {
    getConfiguration().then(({ base_url, poster_sizes }) => {
      console.log(poster_sizes, base_url);
      setBaseURL(`${base_url}${poster_sizes[5]}`);
      getTopRatedTV().then((data) => {
        const arr = data.map((item) => {
          return {
            url:
              base_url.slice(0, -1) + "/" + poster_sizes[5] + item.poster_path,
            id: item.id,
          };
        });
        setData(arr);
      });
    });
  }, []);

  return (
    <>
      <ErrorBoundary>
        <MovieCarousel data={data} from="tv"/>
      </ErrorBoundary>

      <ErrorBoundary>
        <TVMainList baseURL={baseURL} />
      </ErrorBoundary>
    </>
  );
};

export default TVShowsMainPage;
