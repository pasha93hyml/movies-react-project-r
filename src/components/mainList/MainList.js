import {useState, useEffect} from 'react'

import ErrorMessage from '../errorMessage/ErrorMessage'
import Spinner from '../spinner/Spinner'

import MovieService from '../../service/MovieService'
import MoviesList from '../moviesList/MoviesList'


const MainList = ({baseURL}) => {

    const [loading, setLoading] = useState(true)
    const [newPageLoading, setNewPageLoading] = useState(false)
    const [error, setError] = useState(false)
    const [data, setData] = useState([])
    const [page, setPage] = useState(1)
    const [ended, setEnded] = useState(false)

    useEffect(() => {
        setPage(1)
        onRequest()
    }, [])

    const {getPopularMovies} = MovieService()

    const onRequest = () => {
        setNewPageLoading(true)
        getPopularMovies(page).then(onItemsLoaded).catch(onError)
    }

    const onItemsLoaded = (newData) => {
        newData.length < 20 ? setEnded(true) : setEnded(false)
        setLoading(true)
        setData([...data, ...newData])
        setPage(page + 1)
        setLoading(false)
        setNewPageLoading(false)
    }

    const onError = () => {
        setLoading(false)
        setError(true)
    }

    const spinner = loading ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null; 
    const content = !(loading && error) ? <MoviesList onRequest={onRequest} data={data} baseURL={baseURL} ended={ended} newPageLoading={newPageLoading} from={'/movie/'}/> : null;

    return (
        <>
            {spinner}
            {errorMessage}
            {content}
        </>
    )
}

export default MainList;