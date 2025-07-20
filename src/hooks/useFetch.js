import axios from "axios"
import { useEffect, useState } from "react"

const useFetch = (endpoint) => {
    const[data,setData] = useState([])
    const[loading,setLoading] = useState(false)

    const fetchData = async() =>{
      try{
        setLoading(true)
        console.log('Fetching endpoint:', endpoint);
        const response = await axios.get(endpoint)
        setLoading(false)
        setData(response.data.results)
      }catch(error){
        setLoading(false);
        console.log('Fetch error for endpoint', endpoint, error)
      }
    }
    useEffect(()=>{
        fetchData()

    },[endpoint])

    return {data,loading}

}
export default useFetch