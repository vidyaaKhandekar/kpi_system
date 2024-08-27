import { useState, useEffect } from 'react';

export const useFetchById = ({link,id}) => {
    const [data, setData] = useState([]);
    const [noDataFound, setNoDataFound] = useState(false);
    const [error, setError] = useState(null);
  const url = `${link}/${id}`;
  useEffect(() => {
    const fetchData = async () => {
      try {
    
        const response = await fetch(url);
        if (!response.ok) {
            setError("Problem in Fetching data");
            return;
          }
  
          const data = await response.json();
          console.log(data,"data in hook")
          if (data.length === 0) {
            setData([]);
            setNoDataFound(true);
          } else {
            setData(data);
            setNoDataFound(false);
          }
        } catch (error) {
          setError(error.message);
        }
      };
  
      fetchData();
    }, [link,id]);
  
    return { data, noDataFound, error };
  };
  
 
