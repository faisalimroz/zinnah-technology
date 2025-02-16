import { ApiSlice } from "../Api/Api";


const taskApi=ApiSlice.injectEndpoints({

    endpoints:(builder)=>({
       createTask:builder.mutation({
        query:(data)=>({
            url:'/api/v1/task',
            method:'POST',
            body:data
        })
       }),
       getTaskUser: builder.query({
        query: ({ id, status }) => ({
          url: `api/v1/task?user_id=${id}&status=`,
        }),
      }),
      deleteTask:builder.mutation({
        query:(id)=>({
            url:`/api/v1/task/${id}}`,
            method:'DELETE',
        })
       }),
       getTaskById: builder.query({
        query: (id) => `api/v1/task/${id}`, // Get task by ID
      }),
      
      updateTask: builder.mutation({
        query: ({ id, status }) => ({
          url: `api/v1/task/${id}`,
          method: 'PUT',
          body: { status },
        }),
      }),
    })
})

export const {useCreateTaskMutation,useGetTaskUserQuery,useDeleteTaskMutation,useGetTaskByIdQuery,useUpdateTaskMutation}=taskApi
export default taskApi;