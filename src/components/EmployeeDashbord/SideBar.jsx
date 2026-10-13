
// import React, { useState } from 'react'

// import { AiFillAmazonCircle, AiFillCalendar } from "react-icons/ai";
// import { IoIosPeople } from "react-icons/io";
// import { GiMoneyStack } from "react-icons/gi";
// import { FaBuilding, FaCalendar, FaCalendarAlt, FaMoneyBill, FaMoneyBillWave, FaTachometerAlt, FaUsers } from "react-icons/fa";
// import { NavLink } from 'react-router-dom';
// import { useAuth } from '../../Context/AuthContext';
// import { useEffect } from 'react';
// import axios from 'axios';


// const SideBar = () => {
//     const [user, setUser] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [employee,setEmployee] = useState([])
//     const[workeraccess,setWorkeraccess] = useState([])

//       const {serverLink} = useAuth()

//   const Id = user._id;

//   useEffect(() => {
//     const userVerify = async () => {
//       try {
//         const token = localStorage.getItem("token");

//         if (!token) {
//           setUser(null);
//           return;
//         }

//         const response = await axios.get(`${serverLink}/auth/verify`, {
//           headers: {
//             "Authorization": `Bearer ${token}`
//           }
//         });

//         if (response.data.success) {
//           setUser(response.data.user);
//         } else {
//           setUser(null);
//         }

//       } catch (error) {
//         setUser(null);
//       } finally {
//         setLoading(false);   // <-- Always stop loading
//       }
//     };

//     userVerify();
//   }, []);





//   useEffect(()=>{


//   const fetchEmp = async () => {
//       try {
//         const res = await axios.get(
//           `${serverLink}/api/employee/userId/${Id}`
//         );
// console.log(res.data)
//         setEmployee( res.data.employees.
// purchaseaccess);
// setWorkeraccess(res.data.employees.workeraccess)

        

//         // क्योंकि res.data एक array है
    
//       } catch (error) {
//         console.error("Error fetching employee:", error);
//       }
//     };

//     fetchEmp();


    
 
//   },[Id])








//   return (
//     <div className='bg-gray-800 text-white h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64'>
//       <div className='bg-teal-600 h-12 flex items-center justify-center'>
//         <h1 className='text-2xl text-center'>Empolyee Ms</h1>
//       </div>
//       <div>
        
//         <NavLink to="/employee-dashbord"
//           className={({ isActive }) => `${isActive ? "bg-teal-500 " : " "}  flex items-center space-x-4 block py-2.5 px-4 rounded`}
//           end>
//           <FaTachometerAlt />
//           <span>Dashbord</span>
//         </NavLink>




       


    

//          {user && user._id && (<NavLink to= {`/employee-dashbord/profile/${user._id}`}
//           className={ ({ isActive }) => `${isActive ? "bg-teal-500 " : " "}   flex items-center space-x-4 block py-2.5 px-4 rounded`}>
//           <FaUsers />
//           <span>My Profle</span>
//         </NavLink>) }

//     <NavLink to="/employee-dashbord/leaves"
//           className={({ isActive }) => `${isActive ? "bg-teal-500 " : " "}  flex items-center space-x-4 block py-2.5 px-4 rounded`}>
//           <FaBuilding />
//           <span>Leaves</span>
//         </NavLink>
        







     


//         <NavLink to={`/employee-dashbord/salary/${user._id}`}
//            className={ ({ isActive }) => `${isActive ? "bg-teal-500 " : " "}   flex items-center space-x-4 block py-2.5 px-4 rounded`}>
//           <FaMoneyBillWave />
//           <span>Salary</span>
//         </NavLink>

//  {employee == "Allowed" ? ( <NavLink to="/employee-dashbord/purchase"
//           className={({ isActive }) => `${isActive ? "bg-teal-500 " : " "}  flex items-center space-x-4 block py-2.5 px-4 rounded`}>
//           < GiMoneyStack />
//           <span> Purchase </span>
//         </NavLink>) :" " } 
        
   
        

//  {workeraccess == "Allowed" ? ( <NavLink to={`/employee-dashbord/workers`}
//            className={ ({ isActive }) => `${isActive ? "bg-teal-500 " : " "}   flex items-center space-x-4 block py-2.5 px-4 rounded`}>
//           <IoIosPeople />
//           <span>Workers</span>
//         </NavLink>) : ""}


//  {workeraccess == "Allowed" ? (<NavLink to={`/employee-dashbord/workers-attendance`}
//            className={ ({ isActive }) => `${isActive ? "bg-teal-500 " : " "}   flex items-center space-x-4 block py-2.5 px-4 rounded`}>
//           <FaCalendarAlt />
//           <span>Workers-Attendance</span>
//         </NavLink>) :""}


//         <NavLink to="/employee-dashbord/setting"
//            className={ ({ isActive }) => `${isActive ? "bg-teal-500 " : " "}   flex items-center space-x-4 block py-2.5 px-4 rounded`}>
//           <FaTachometerAlt />
//           <span>Setting</span>
//         </NavLink>


//       </div>
//     </div>
   
//   )
// }

// export default SideBar


































































































import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'

import { AiFillAmazonCircle, AiFillCalendar } from "react-icons/ai";
import { IoIosPeople } from "react-icons/io";
import { GiMoneyStack } from "react-icons/gi";
import { FaBuilding, FaCalendarAlt, FaMoneyBillWave, FaTachometerAlt, FaUsers } from "react-icons/fa";

import { useAuth } from '../../Context/AuthContext'

const SideBar = () => {
  const { user, loading, serverLink } = useAuth()


  const [purchaseAccess, setPurchaseAccess] = useState(null)
  const [workerAccess, setWorkerAccess] = useState(null)

  const userId = user?._id

  // ================= VERIFY USER =================
  console.log('SideBar - user:', user)
  console.log('SideBar - userId:', userId)
  console.log('SideBar - loading:', loading)

  // ================= FETCH EMPLOYEE ACCESS =================
  useEffect(() => {
    if (!userId) {
      console.log('Skipping fetch - no userId')
      return
    }

    console.log('Fetching employee access for userId:', userId)

    const fetchEmployeeAccess = async () => {
      try {
        const res = await axios.get(
          `${serverLink}/api/employee/userId/${userId}`
        )

        console.log('Employee access response:', res.data)
        setPurchaseAccess(res.data?.employees?.purchaseaccess)
        setWorkerAccess(res.data?.employees?.workeraccess)
      } catch (error) {
        console.error('Error fetching employee access:', error)
      }
    }

    fetchEmployeeAccess()
  }, [userId, serverLink])

  // ================= LOADING STATE =================


  // ================= UI =================
  return (
    <div className="bg-gray-800 text-white h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64">
      <div className="bg-teal-600 h-12 flex items-center justify-center">
        <h1 className="text-2xl">Employee MS</h1>
      </div>

      {loading || !user ? (
        <div className="flex items-center justify-center h-32">
          <span>Loading...</span>
        </div>
      ) : (
        <nav className="space-y-1">
        <NavLink
          to="/employee-dashbord"
          end
          className={({ isActive }) =>
            `${isActive ? 'bg-teal-500' : ''} flex items-center space-x-4 py-2.5 px-4 rounded`
          }
        >
          <FaTachometerAlt />
          <span>Dashboard</span>
        </NavLink>

        {userId && (
          <NavLink
            to={`/employee-dashbord/profile/${userId}`}
            className={({ isActive }) =>
              `${isActive ? 'bg-teal-500' : ''} flex items-center space-x-4 py-2.5 px-4 rounded`
            }
          >
            <FaUsers />
            <span>My Profile</span>
          </NavLink>
        )}

        <NavLink
          to="/employee-dashbord/leaves"
          className={({ isActive }) =>
            `${isActive ? 'bg-teal-500' : ''} flex items-center space-x-4 py-2.5 px-4 rounded`
          }
        >
          <FaBuilding />
          <span>Leaves</span>
        </NavLink>

        {userId && (
          <NavLink
            to={`/employee-dashbord/salary/${userId}`}
            className={({ isActive }) =>
              `${isActive ? 'bg-teal-500' : ''} flex items-center space-x-4 py-2.5 px-4 rounded`
            }
          >
            <FaMoneyBillWave />
            <span>Salary</span>
          </NavLink>
        )}

        {purchaseAccess === 'Allowed' && (
          <NavLink
            to="/employee-dashbord/purchase"
            className={({ isActive }) =>
              `${isActive ? 'bg-teal-500' : ''} flex items-center space-x-4 py-2.5 px-4 rounded`
            }
          >
            <GiMoneyStack />
            <span>Purchase</span>
          </NavLink>
        )}

        {workerAccess === 'Allowed' && (
          <NavLink
            to="/employee-dashbord/workers"
            className={({ isActive }) =>
              `${isActive ? 'bg-teal-500' : ''} flex items-center space-x-4 py-2.5 px-4 rounded`
            }
          >
            <IoIosPeople />
            <span>Workers</span>
          </NavLink>
        )}

        {workerAccess === 'Allowed' && (
          <NavLink
            to="/employee-dashbord/workers-attendance"
            className={({ isActive }) =>
              `${isActive ? 'bg-teal-500' : ''} flex items-center space-x-4 py-2.5 px-4 rounded`
            }
          >
            <FaCalendarAlt />
            <span>Workers Attendance</span>
          </NavLink>
        )}

        <NavLink
          to="/employee-dashbord/setting"
          className={({ isActive }) =>
            `${isActive ? 'bg-teal-500' : ''} flex items-center space-x-4 py-2.5 px-4 rounded`
          }
        >
          <FaTachometerAlt />
          <span>Setting</span>
        </NavLink>
      </nav>
      )}
    </div>
  )
}

export default SideBar

