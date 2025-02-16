import React, { useState } from 'react';
import GetTaskTable from '../../components/GetTaskTable';
import { useGetTaskUserQuery } from '../../feature/taskApi/TaskApi';
import { useSelector } from 'react-redux';
const Home = () => {
    const {user}=useSelector(state=>state.auth)
    const [filterStatus, setFilterStatus] = useState("All");
    const {data:tasks,isLoading}=useGetTaskUserQuery({
        id: user?.id, // You can dynamically set this
        status: '', // You can dynamically set this as well
      },{pollingInterval:100})
      if (isLoading) {
        return <>loading</>
      }

      console.log(localStorage.getItem('token'));
    return (
        <div>
            <GetTaskTable tasks={tasks} filterStatus={filterStatus} setFilterStatus={setFilterStatus}   />
        </div>
    );
};

export default Home;