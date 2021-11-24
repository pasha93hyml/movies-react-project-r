import {useState, useEffect} from 'react';

import useMovieService from '../../service/MovieService';

import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import SearchList from '../searchList/SearchList';

const SearchPage = () => {
    const [baseURL, setBaseURL] = useState('')

    const {getConfiguration} = useMovieService();

  useEffect(() => {
    getConfiguration().then(({ base_url, poster_sizes }) => setBaseURL(`${base_url}${poster_sizes[5]}`))
  }, [])

  return (
      <>
        <ErrorBoundary>
            <SearchList baseURL={baseURL} />
        </ErrorBoundary>;
      </>
  )
}


export default SearchPage;