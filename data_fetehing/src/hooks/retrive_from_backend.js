import  { useEffect, useState } from 'react';
import axios from 'axios';

function useDataFetch(apiURL, intervalTime) {
   const [todos, setTodos] = useState([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const fetchData = () => {
         axios.get(apiURL)
            .then((response) => {
               setTodos(response.data.todo);
               setLoading(false);
            })
            .catch((error) => {
               console.error("Error fetching data: ", error);
               setLoading(false);
            });
      };

      fetchData(); 

      const intervalId = setInterval(fetchData, intervalTime * 1000); 

      return () => clearInterval(intervalId);  //cleanup functions 
   }, [apiURL, intervalTime]);

   return { todos, loading };
}

export default useDataFetch;

