import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import './App.css'
import  MyAppBar  from './components/MyAppBar';
import Home from './components/Home'
import Tasks from './components/Tasks'
import Posts from './components/Posts'
import Photos from './components/Photos'
import Users from './components/Users'
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import userSlice from './Slices/userSlice';
import taskSlice from './Slices/taskSlice';
import postSlice from './Slices/postSlice';

const myStore = configureStore({
  reducer:{
    userSlice,
    taskSlice,
    postSlice
  }
})

function App() {

  const [searchVal,setSearchVal] = useState("")

  return (
    <Provider store={myStore}>
      <MyAppBar setSearchVal={setSearchVal}/>
      <Routes>
        <Route path='/' element={<Home searchVal={searchVal}/>} />
        <Route path='/tasks' element={<Tasks searchVal={searchVal}/>}/>
        <Route path='/posts' element={<Posts searchVal={searchVal}/>}/>
        <Route path='/photos' element={<Photos searchVal={searchVal}/>}/>
        <Route path='/users' element={<Users searchVal={searchVal}/>}/>
      </Routes>
    </Provider>
  );
}

export default App;
