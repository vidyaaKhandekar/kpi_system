import React from 'react'
import DisplayTable from '../TableContent/DisplayTable';
import { KpiTableColumns } from '../TableContent/Tablecolums';

const DisplayMyKpi = ({kpiList, noDataFound, error}) => {
  return (
    <div>
        {noDataFound ? (
      
          <p>No KPIs assigned to this role</p>
   
      ) : null}
      {error ? (
      
      <p>OOOps Some Error</p>

  ) : null}
       <DisplayTable row={kpiList} columns={KpiTableColumns} />
    </div>
  )
}



export default DisplayMyKpi
