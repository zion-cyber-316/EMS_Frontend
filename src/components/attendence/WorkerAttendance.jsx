import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import DataTable from 'react-data-table-component'
import { columns, OverTime,WorkerAttButtons} from '../../utils/WorkerAttHelper'


const WorkerAttendance = () => {
  const [attendance,setAttendance] = useState([])
  const [filterAttendance,setFilterAttendance] = useState([])
    const[dateFilter,setDateFilter] = useState( new Date().toISOString().split("T")[0])
    const[skip,setSkip] = useState(0)


  const statusChange = ()=>{
    fetchAttendance()
  }



const fetchAttendance = async()=>{

   const query = new URLSearchParams({skip})
      if(dateFilter){
        query.append("date",dateFilter)
      }
  try{

  

    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/workerAttendance/get?${query.toString()}`);

    
console.log(res.data)

    if(res.data.success){
      let sno = 1;
      const data = await res.data.attendance.map((att)=> ({
        sno : sno++,
        name: att.workerId.name,
        fathername : att.workerId.fathername,
        designation : att.workerId.designation,
        action :<WorkerAttButtons status={att.status} id={att.workerId._id}  statusChange={statusChange} dateFilter={dateFilter}/>,
        OverTime :<OverTime id={att.workerId._id} OT={att.overtime}  dateFilter={dateFilter}  statusChange={statusChange}/>



      }))
      setAttendance(data)
      setFilterAttendance(data)
    }
    
    

  }catch(error){
    console.log(error)
  }
}


useEffect(()=>{
  fetchAttendance()

},[skip,dateFilter])

const handleFilter =(e)=>{
const record = attendance.filter((att)=>(
  att.name.toLowerCase().includes(e.target.value.toLowerCase())
))
setFilterAttendance(record)
}






  return (
    <div className='p-5'>
      
           <div className='text-center'>
     
        <h3 className='text-2xl font-bold  underline'> Workers-Attendance {dateFilter}</h3>
         
   
      </div>
      
      <div className='flex justify-between items-center mt-2'>
         <input type="date" className='border bg-gray-100' value={dateFilter} onChange={(e)=>{
          setDateFilter(e.target.value)
          setSkip(0)
        }}/>
        
        <input onChange={handleFilter}  type="text" placeholder='Search by worker name' className='px-4 py-0.5 border' />
        {/* <p>Mark workers for {new Date().toISOString().split('T')[0]}</p> */}
        
        <div>
           
        <Link to="/employee-dashbord/workers-attendance/reports" className='px-4 py-1 bg-teal-600 rounded text-white'>Attendance-Reports</Link>
        </div>
        
      </div>
      <div className='mt-1'>
        <DataTable   columns={columns} data={filterAttendance}/>

      </div>
    </div>
  )
}

export default WorkerAttendance