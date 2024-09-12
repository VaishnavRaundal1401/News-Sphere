import './App.css'

import React, { useState } from 'react'
import NavBar from './Components/NavBar';
import News from './Components/News';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';

const App = ()=> {

  const [progress, setProgress] = useState(0)

 const apiKey = '5192158a08ea4fb2a60ed3577d264711';
  // apiKey = process.env.NEWS_API
    return (
    <BrowserRouter>
      <div>
        <NavBar/>
        <LoadingBar
        color='#f11946'
        progress={progress}
      />
          <Routes>
            <Route path='/' element={<News setProgress = {setProgress} apiKey = {apiKey} key = "general" country = "us" category = "general" pageSize = {12} logo="danger"/>}/>   
            <Route path='/general' element={<News setProgress = {setProgress} apiKey = {apiKey} key = "general" country = "us" category = "general" pageSize = {12} logo="danger"/>}/>
            <Route path='/business' element={<News setProgress = {setProgress} apiKey = {apiKey} key = "business" country = "us" category = "business" pageSize = {12} logo="info"/>}/>
            <Route path='/entertainment' element={<News setProgress = {setProgress} apiKey = {apiKey} key = "entertainment" country = "us" category = "entertainment" pageSize = {12} logo="warning"/>}/>
            <Route path='/health' element={<News setProgress = {setProgress} apiKey = {apiKey} key = "health" country = "us" category = "health" pageSize = {12} logo="success"/>}/>
            <Route path='/science' element={<News setProgress = {setProgress} apiKey = {apiKey} key = "science" country = "us" category = "science" pageSize = {12} logo="secondary"/>}/>
            <Route path='/sports' element={<News setProgress = {setProgress} apiKey = {apiKey} key = "sports" country = "us" category = "sports" pageSize = {12} logo="dark"/>}/>
            <Route path='/technology' element={<News setProgress = {setProgress} apiKey = {apiKey} key = "technology" country = "us" category = "technology" pageSize = {12} logo="primary"/>}/>
          </Routes>
      </div>
    </BrowserRouter>
    )
}

export default App