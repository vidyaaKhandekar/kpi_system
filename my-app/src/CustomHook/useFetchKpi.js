import { useState,useEffect } from "react";

const useFetchKpi = (id) => {
    const [kpiList, setKpiList] = useState([]);
    const [noDataFound, setNoDataFound] = useState(false);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchKpiData = async () => {
        try {
          const response = await fetch(
            `http://localhost:4000/api/kpi/getByEmp/${id}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
  
          if (!response.ok) {
            setError("Problem in Fetching data");
            return;
          }
  
          const data = await response.json();
          console.log("KPI", data);
  
          if (data.length === 0) {
            setKpiList([]);
            setNoDataFound(true);
          } else {
            setKpiList(data);
            setNoDataFound(false);
          }
        } catch (error) {
          setError(error.message);
        }
      };
  
      fetchKpiData();
    }, [id]);
  
    return { kpiList, noDataFound, error };
  };
  
  export default useFetchKpi;