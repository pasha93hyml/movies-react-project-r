import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'

import ErrorMessage from '../errorMessage/ErrorMessage'
import Spinner from '../spinner/Spinner'

import MovieService from '../../service/MovieService'
import MoviesList from '../moviesList/MoviesList'


const SearchList = ({baseURL}) => {

    const {query} = useParams()

    const [value, setValue] = useState(query)
    const [loading, setLoading] = useState(true)
    const [newPageLoading, setNewPageLoading] = useState(false)
    const [error, setError] = useState(false)
    const [data, setData] = useState([])
    const [page, setPage] = useState(1)
    const [ended, setEnded] = useState(false)

    useEffect(() => {
        onRequest()
    }, [])

    useEffect(() => {
        setPage(1)
        setData([])
        setValue(query)
        document.title = query[0].toUpperCase() + query.slice(1).toLowerCase()
    }, [query])

    useEffect(() => {
        onRequest()
    }, [value])

    const {getSearchResults} = MovieService()

    const onRequest = () => {
        setNewPageLoading(true)
        getSearchResults(page, query).then(onItemsLoaded).catch(onError)
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

export default SearchList;