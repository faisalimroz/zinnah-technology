import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const GetTaskTable = ({ tasks }) => {
  const [sortBy, setSortBy] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");
  const [dueDateFilter, setDueDateFilter] = useState("");

  const sortedTasks = [...tasks]
    .filter((task) => !dueDateFilter || task.dueDate === dueDateFilter) // 🔥 Filter tasks by Due Date
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
  };

  return (
    <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-4">
      {/* 🔹 Due Date Filter Input */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Filter by Due Date</label>
        <input
          type="date"
          value={dueDateFilter}
          onChange={(e) => setDueDateFilter(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded-md w-full"
        />
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
                        <td className="p-3">{task.name}</td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-1 rounded text-xs font-bold ${
                              task.status === "Completed"
                                ? "bg-green-100 text-green-700"
                                : task.status === "In Progress"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {task.status}
                          </span>
                        </td>
                        <td className="p-3">{task.dueDate}</td>
                        <td className="p-3 flex space-x-2">
                          <button className="px-2 py-1 bg-blue-500 text-white rounded text-xs">
                            Edit
                          </button>
                          <button
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
