import {useState, useCallback} from 'react'

export const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const request = useCallback(async (URL, method = 'GET', body = null, headers = {'Content-Type': 'application/json'}) => {
        setLoading(true)

        try {
            const response = await fetch(URL, {method, body, headers})

            if(!response.ok) {
                throw new Error(`Could not fetch ${URL}, status: ${response.status}`)
            }

            const data = await response.json()
            setLoading(false)
            return data

        } catch(error){
            setLoading(false)
            setError(error.message)
            throw error;
        }
    }, [])

    const clearError = useCallback(() => setError(null), [])

    return {loading, request, error, clearError}
}