import {useCallback, useState} from "react";

const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const request = useCallback(async (url, requestOptions=undefined) => {
        setLoading(true)
        try {
            const response = await fetch(url, requestOptions)
            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`)
            }
            return await response.json()
        }
        catch (err) {
            setError(err.message)
            throw err
        }
        finally {
            setLoading(false)
        }
    }, [])

    const clearError = useCallback(() => {
        setError(null)
    }, [])

    return {loading, error, clearError, request}
}

export default useHttp