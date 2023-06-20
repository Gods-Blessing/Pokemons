import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/navbar/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ListingPage from './components/listingPage/ListingPage';
import DetailPage from './components/detailPage/DetailPage';
import BookmarkedPage from './components/bookmarkedPage/BookmarkedPage';

function App() {
  // const [count, setCount] = useState(0)

  useEffect(()=>{
    document.title = "Pika-Pika"
  }, []);

  return (
    <div>
      <BrowserRouter>
          <Navbar/>
          <div className='spacing'></div>
        <Routes>
          <Route path='/' element={<ListingPage/>}/>
          <Route path='/detailpage/:name' element={<DetailPage/>}/>
          <Route path='/bookmark' element={<BookmarkedPage/>}/>
        </Routes>
      
      </BrowserRouter>
      
    </div>
  )
}

export default App
