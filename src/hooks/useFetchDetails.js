import axios from "axios"
import { useEffect, useState } from "react"

const useFetchDetails = (endpoint) => {
    const[data,setData] = useState()
    const[loading,setLoading] = useState(false)

    const fetchDataD = async() =>{
      try{
        setLoading(true)
        console.log('Fetching endpoint:', endpoint);
        const response = await axios.get(endpoint)
        setLoading(false)
        setData(response.data)
      }catch(error){
        setLoading(false);
        console.log('Fetch error for endpoint', endpoint, error)
      }
    }
    useEffect(()=>{
        fetchDataD()
    },[endpoint])

    return {data,loading}

}
export default useFetchDetails