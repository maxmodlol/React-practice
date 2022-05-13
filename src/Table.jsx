import React from 'react'
import JsonData from './data.json'
  export default function Table_Display(){
    
      const data =JsonData;
      let dataArr = Array.from(data);

   
     
      const DisplayData=dataArr.map((infos) =>{
                return(
                    infos.map((info) => {
                        return(
                    <tr>
                        <td>{info.name}</td>
                        <td>{info.iso.code}</td>
                        <td>{info.symbol.native.display}</td>
                    </tr>
                        )})
                )
            }
        
        
      );
 
         
        
      
    return(
        <div>
            <table className="table table-striped">
                <thead>
                    <tr>
                    <th>Currency Name</th>
                    <th>Currency Code</th>
                    <th>Currency Display </th>
                    </tr>
                </thead>
                <tbody>
                    
                    {DisplayData}
                    
                </tbody>
            </table>
             
        </div>
    )
 }
 
 