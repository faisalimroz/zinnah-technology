import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useDeleteTaskMutation } from "../feature/taskApi/TaskApi";
import { Link } from "react-router-dom";
// import { useUpdateTaskMutation, useDeleteTaskMutation } from "../../services/taskApi";

const GetTaskTable = ({tasks,filterStatus,setFilterStatus}) => {
  const [sortBy, setSortBy] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");

//   const [updateTask] = useUpdateTaskMutation();
//   const [deleteTask] = useDeleteTaskMutation();

  const sortedTasks = [...tasks]
    .filter(task => filterStatus === "All" || task.status === filterStatus)
    .sort((a, b) => {
      if (a[sortBy] < b[sortBy]) return sortOrder === "asc" ? -1 : 1;
      if (a[sortBy] > b[sortBy]) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

  const handleSort = (column) => {
    setSortBy(column);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const reorderedTask = [...tasks];
    const [draggedItem] = reorderedTask.splice(result.source.index, 1);
    reorderedTask.splice(result.destination.index, 0, draggedItem);
    
    // Update the tasks with new order
    // reorderedTask.forEach((task, index) => {
    //   updateTask({ ...task, position: index + 1 });  // Assuming position field for ordering
    // });
  };
  const [deleteTask]=useDeleteTaskMutation()
  const handleDelete = (id) => {
    deleteTask(id)
    .unwrap()
    .then(() => {
      // Task deleted successfully, handle success (maybe refresh tasks)
    })
    .catch((error) => {
      // Handle error
      console.error('Failed to delete task:', error);
    });
  };



  return (
    <div className="overflow-x-auto shadow-lg rounded-lg p-4">
      <div className="mb-4">
        <label htmlFor="statusFilter" className="mr-2">Filter by Status:</label>
        <select
          id="statusFilter"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="All">All</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="tasks">
          {(provided) => (
            <table
              className="w-full border-collapse"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <thead>
                <tr className="bg-gray-200 text-gray-700 text-left">
                  {["ID", "Task", "Status", "Due Date", "Actions"].map((header, index) => (
                    <th
                      key={index}
                      className="p-3 cursor-pointer"
                      onClick={() =>
                        handleSort(header.toLowerCase().replace(" ", ""))
                      }
                    >
                      {header}{" "}
                      {sortBy === header.toLowerCase() &&
                        (sortOrder === "asc" ? "▲" : "▼")}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sortedTasks.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                    {(provided) => (
                      <tr
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="border-b hover:bg-gray-100"
                      >
                        <td className="p-3">{task.id}</td>
                        <td className="p-3">{task.title}</td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-1 rounded text-xs font-bold ${
                              task.status === "completed"
                                ? "bg-green-100 text-green-700"
                                : task.status === "in-progress"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {task.status}
                          </span>
                        </td>
                        <td className="p-3">{task.due_date}</td>
                        <td className="p-3 flex space-x-2">
                      <Link to={`/task/${task.id}`}>
                      <button className="px-2 py-1 bg-blue-500 text-white rounded text-xs">
                            Edit
                          </button>
                      </Link>
                          <button
                            onClick={() => handleDelete(task.id)}
                            className="px-2 py-1 bg-red-500 text-white rounded text-xs"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </tbody>
            </table>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default GetTaskTable;
