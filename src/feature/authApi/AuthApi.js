import { ApiSlice } from "../Api/Api";


const authApi=ApiSlice.injectEndpoints({

    endpoints:(builder)=>({
       createAccount:builder.mutation({
        query:(data)=>({
            url:'/api/v1/user/register',
            method:'POST',
            body:data
        })
       }),
       loginUser:builder.mutation({
        query:(data)=>({
            url:'/api/v1/user/login',
            method:'POST',
            body:data
        })
       }) ,
       checkRole:builder.query({
        query:(email)=>({
            url:`/api/v1/user/user-status?email=${email}`,
        })
       }) ,

    })
})

export const {useCreateAccountMutation,useLoginUserMutation,useCheckRoleQuery}=authApi
export default authApi;