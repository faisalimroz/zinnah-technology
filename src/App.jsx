import React, { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/router';
import { useDispatch, useSelector } from 'react-redux';
import { initializeAuth } from './feature/authSlice';

const App = () => {
  const theme = useSelector((state) => state.theme.theme);
console.log(theme);

const dispatch = useDispatch();

useEffect(() => {
    dispatch(initializeAuth());
}, [dispatch]);

  return (
    <div data-theme={`${theme==='light'?'dark':'light'}`}>
     <RouterProvider router={router} />
    </div>
  );
};

export default App;