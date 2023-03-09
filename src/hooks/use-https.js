import { useCallback, useState } from "react";

const useHttp = ()=>{
    console.log("costom hook stated")
    const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (requestConfig , applyData) => {
    setIsLoading(true);
    setError(null);
    console.log(requestConfig)
    try {
      console.log(requestConfig.body ? JSON.stringify(requestConfig.body):null)
      const response = await fetch(
            requestConfig.url , {
            method : requestConfig.method ? requestConfig.method : "GET",
            headers : requestConfig.headers ? requestConfig.headers : {},
            body : requestConfig.body ? JSON.stringify(requestConfig.body) : null
        }
      );

      if (!response.ok) {
        throw new Error('Request failed!');
      }

      const data = await response.json();
      console.log(data)
      applyData(data);
    } catch (err) {
      setError(err.message || 'Something went wrong!');
      console.log(err)
    }
    setIsLoading(false);
  } , []) ;

  return {
    isLoading : isLoading ,
    error : error ,
    sendRequest : sendRequest
  }
}

export default useHttp;