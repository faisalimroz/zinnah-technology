import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetTaskByIdQuery, useUpdateTaskMutation } from '../../feature/taskApi/TaskApi';

const UpdateTask = () => {
    const { id } = useParams()

    const { data: task, error, isLoading } = useGetTaskByIdQuery(id,{pollingInterval:100});
    const [status, setStatus] = useState('');
  
    const [updateTask] = useUpdateTaskMutation();
    const navigate=useNavigate()

    const handleUpdate = async () => {
        try {
            if (status === '') {
                alert('select own updating status')
            }else{
                const res= await updateTask({ id: id, status }); // Dispatch update action to the backend
                console.log(res);
                if (res.data.message==='Task updated successfully') {
                    navigate('/')
                }
               console.log('Task updated successfully with status:', status); // Log the updated status
            }

            
        } catch (error) {
            console.error('Failed to update task status:', error);
        }
    };


    if (isLoading) {
        return <>loading</>
    }
    return (
        <div>
            <h2>Task Details</h2>
            <p><strong>Title:</strong> {task.title}</p>
            <p><strong>Description:</strong> {task.description}</p>
            <p><strong>Status:</strong> {task.status}</p>
            <p><strong>Due Date:</strong> {new Date(task.due_date).toLocaleDateString()}</p>

            {/* Status Select */}
            <div className="mt-4">
                <label htmlFor="status" className="mr-2">Update Status:</label>
                <select
                    id="status"
                    defaultValue={task.status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="border rounded px-2 py-1"
                >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>
                <button onClick={handleUpdate}
                    className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
                >
                    Update
                </button>
            </div>

        </div>
    );
};

export default UpdateTask;