import React from 'react'
import JsonData from './data.json'
  export default function Table_Display(){


        
     

    
      const datas=JsonData;
      const DisplayData=Object.keys(datas).map((info,key) =>{

                return(

                       <>     
                    <tr  key={key}>
                      <td>{datas[info].name}</td>
                      <td>{datas[info].iso.code}</td>
                        <td>{datas[info].units.name}</td>
                       
                    </tr>
                    </>
                    

                   
                )
            }
        
        
      )
         
        
      
    return(
        <div>
            <table className="table table-striped">
                <thead>
                    <tr>
                    <th>Currency Name</th>
                    <th>Currency Code</th>
                    <th>Currency Display </th>
                    <th>Currency Display Name </th>

                    </tr>
                </thead>
                <tbody>
                    
                {DisplayData}        
                    
                </tbody>
            </table>
             
        </div>
    )
 }
 
 