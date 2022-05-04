import './App.css';
import Menu from './Components/Menu/Menu';
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Pages/Home';
import { BrowserRouter, Routes, Route} from 'react-router-dom'



function AllTask() {
 
  return (
    <Home/>
  )
}


function Today() {
 
  return (
    <div className='home-container'>
    <div className='task-bar-header'>Today</div>

  </div>
  )
}

function Filters() {
 
  return (
    <div className='home-container'>
    <div className='task-bar-header'>Filters</div>

  </div>
  )
}

function Upcomings() {
 
  return (
    <div className='home-container'>
    <div className='task-bar-header'>Upcomings</div>

  </div>
  )
}

const App = () => {
 
  

  return (


    <BrowserRouter>
    <Navbar/>
    <Menu/>
      <div className="App">
     
        <Routes>
          <Route path="/" element={<AllTask />} />
          <Route path="/Today" element={<Today />} />
          <Route path="/Filters" element={<Filters />} />
          <Route path="/Upcomings" element={<Upcomings />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App