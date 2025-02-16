import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../Layout/Layout";
import Home from "../Pages/Home/Home";
import Profile from "../Pages/Profile/Profile";
import CreateTask from "../Pages/Create Task/CreateTask";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Private from "../private/Private";
import UpdateTask from "../Pages/UpdateTask/UpdateTask";


export const router = createBrowserRouter([
    {
      path: "/",
      element:<Private> <Dashboard/></Private>,
      children:[
        {path:'/',element:<Home/>},
        {path:'/task/:id',element:<UpdateTask/>},
        {path:'/create-task',element:<CreateTask/>},
        {path:'/profile',element:<Profile/>}
      ]
    },
    {path:'login',element:<Login/>},
    {path:'register',element:<Register/>}
  ]);