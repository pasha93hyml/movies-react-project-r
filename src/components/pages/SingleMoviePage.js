import { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import RecommendationsCarousel from "../recommendationsCarousel/RecommendationsCarousel";
import MovieService from "../../service/MovieService";

import "./singleMoviePage.css";

const SingleMoviePage = () => {
  const { movieID } = useParams();

  const [moiveData, setMovieData] = useState(null);
  const [baseURL, setBaseURL] = useState("");
  const [reccomendationsData, setReccomendationsData] = useState(null);
  const [moviesData, setMoviesData] = useState(null)

  const {
    loading,
    error,
    getDetails,
    clearError,
    getConfiguration,
    getRecommendations,
    getMovieVideos
  } = MovieService();

  useEffect(() => {
    getConfiguration().then(({ base_url, poster_sizes }) =>
      setBaseURL(`${base_url}${poster_sizes[5]}`)
    );
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getRecommendations(movieID).then(onReccomendationsLoaded);
    getMovieVideos(movieID).then(onMoviesLoaded)
    updateMovie();
    return () => {
      setMoviesData(null)
    }
    // eslint-disable-next-line
  }, [movieID]);

  const updateMovie = () => {
    clearError();
    getDetails(movieID).then(onMovieLoaded);
  };

  const onMovieLoaded = (data) => {
    setMovieData(data);
    document.title = data.title;
  };

  const onReccomendationsLoaded = (data) => {
    setReccomendationsData(data);
  };
  const onMoviesLoaded = (data) => {
    if(data) {
      setMoviesData(data)
    } else {
      setMoviesData(null)
    }
  }

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error || !moiveData || !reccomendationsData) ? (
    <ErrorBoundary>
      <View data={moiveData} baseURL={baseURL} reccomendationsData={reccomendationsData} moviesData={moviesData}/>
    </ErrorBoundary>
  ) : null;

  return (
    <>
      {errorMessage}
      {spinner}
      {content}
    </>
  );
};

const View = ({ data, baseURL, reccomendationsData, moviesData}) => {
  const player = (moviesData && moviesData.length) ? (
          <iframe 
          src={`https://www.youtube.com/embed/${moviesData[0].key}`} title="YouTube video player" 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
  ) : <p>Нет доступных видео для данного фильма</p>
  return (
    <>
      <div className="movie">
        <div className="title">
          <div className="title_wrapper title-grid">
            <h3>{data.title}</h3>
            <span>{data.original_title}</span>
          </div>
        </div>
        <div className="poster">
          <img
            src={
              data.poster_path
                ? baseURL + data.poster_path
                : "https://cdn.browshot.com/static/images/not-found.png"
            }
            alt={data.title}
          />
        </div>
        <div className="player">
         {player}
        </div>
        <div className="details">
          <div className="details-inner">
            {data.overview ? data.overview : "Нет описания данного фильма"}
          </div>
        </div>
        <div className="description">
          <div className="rate">Популярность фильма: {data.popularity}</div>
          <div className="sub_grid">
            <div className="sub_title">Год</div>
            <div className="sub_descr">{data.release_date}</div>
            <div className="sub_title">Страна</div>
            <div className="sub_descr">
              {data.production_countries &&
                data.production_countries.map((item, i) => {
                  if (i + 1 === data.production_countries.length) {
                    return item + ".";
                  }
                  return item + ", ";
                })}
            </div>
            <div className="sub_title">Жанр</div>
            <div className="sub_descr">
              {data.genres &&
                data.genres.map((item, i) => {
                  if (i + 1 === data.genres.length) {
                    return item + ".";
                  }
                  return item + ", ";
                })}
            </div>
            <div className="sub_title">Время</div>
            <div className="sub_descr">{data.runtime}</div>
          </div>
        </div>
        <div className="carousel_rec">
          <p>Реккомендации</p>
          {reccomendationsData.length ? (
            <RecommendationsCarousel data={reccomendationsData} baseURL={baseURL} from="movie"/>
          ): <p>Нет реккомендаций</p>}
        
        </div>
      </div>
    </>
  );
};

export default SingleMoviePage;
