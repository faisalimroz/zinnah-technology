import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useCreateTaskMutation } from '../feature/taskApi/TaskApi';
import {  toast } from 'react-toastify';
const TaskForm = () => {
  const { register, handleSubmit, formState: { errors } ,reset} = useForm();
  const {user}=useSelector(state=>state.auth)
  const [createTask,{isError}]=useCreateTaskMutation()
  const onSubmit = async (data) => {
    const { name, status, dueDate, description } = data;
    const addTask={
      title:name,status:status,due_date:dueDate,description:description,user_id:user.id
    }
    console.log(addTask);
   const res= await createTask(addTask)
   if (res.data?.taskId) {
    toast.success('task added')
    reset()
   }

console.log(res);
  };

  return (
    <div className="w-[50%]  flex items-center justify-center ">
      <div className="w-full max-w-none p-6  shadow-md rounded-lg">
        <h2 className="text-3xl font-semibold mb-6 text-center">Create Task</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
 <div className='grid grid-cols-2 gap-3 items-center'>
           {/* Task Name */}
           <div>
            <label htmlFor="name" className="block text-lg font-medium text-gray-700">Task Name</label>
            <input
              id="name"
              type="text"
              placeholder='Task Name'
              {...register('name', { required: 'Task name is required' })}
              className="w-full px-4 py-3 mt-1 border border-gray-300 rounded-md"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          {/* Task Status */}
          <div>
            <label htmlFor="status" className="block text-lg font-medium text-gray-700">Status</label>
            <select
              id="status"
              {...register('status', { required: 'Task status is required' })}
              className="w-full px-4 py-3 mt-1 border border-gray-300 rounded-md"
            >
              <option value="">Select Status</option>
              <option value="completed">Completed</option>
              <option value="in-progress">In Progress</option>
              <option value="pending">Pending</option>
            </select>
            {errors.status && <p className="text-red-500 text-sm">{errors.status.message}</p>}
          </div>

          {/* Due Date */}
          <div>
            <label htmlFor="dueDate" className="block text-lg font-medium text-gray-700">Due Date</label>
            <input
              id="dueDate"
              type="date"
              {...register('dueDate', { required: 'Due date is required' })}
              className="w-full px-4 py-3 mt-1 border border-gray-300 rounded-md"
            />
            {errors.dueDate && <p className="text-red-500 text-sm">{errors.dueDate.message}</p>}
          </div>

          {/* Task Description */}
          <div>
            <label htmlFor="description" className="block text-lg font-medium text-gray-700">Task Description</label>
            <textarea
              id="description"
              placeholder='Task Description'
              {...register('description', { required: 'Task description is required' })}
              className="w-full px-4 py-3 mt-1 border border-gray-300 rounded-md"
            />
            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
          </div>
 </div>

          {/* Submit Button */}
          <div>
            <button type="submit" className="w-full bg-blue-500 text-white text-lg py-3 rounded-md hover:bg-blue-600 transition">
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
