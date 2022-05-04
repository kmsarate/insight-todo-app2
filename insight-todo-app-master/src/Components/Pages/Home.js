import React from 'react'
import './Home.css'
import { useState } from 'react'

const Home = () => {
  const current = new Date();
  const dateNow = `${current.getDate()}, ${current.getFullYear()}`;
  

  const [month, setMonth] = useState(current.getMonth());

  const convertMonth = (month) => {
    if (month === 0) setMonth("January");
        else if (month === 1) setMonth("February");
        else if (month === 2) setMonth("March");
        else if (month === 3) setMonth("April");
        else if (month === 4) setMonth("May");
        else if (month === 5) setMonth("June");
        else if (month === 6) setMonth("July");
        else if (month === 7) setMonth("August");
        else if (month === 8) setMonth("September");
        else if (month === 9) setMonth("October");
        else if (month === 10) setMonth("November");
        else if (month === 11) setMonth("December");

     
    return <h5>{day},  {month}  {dateNow} </h5> ;
  };

  const [day, setDay] = useState(current.getDay());

const convertDay = (day) => {
    if (day === 1) setDay("Monday");
        else if (day === 2) setDay("Tuesday");
        else if (day === 3) setDay("Wednesday");
        else if (day === 4) setDay("Thursday");
        else if (day === 5) setDay("Friday");
        else if (day === 6) setDay("Saturday");
        else if (day === 7) setDay("Sunday");
};

  
  return (
    <div className='home-container'>
    <div className='task-bar-header'>All tasks
    <div className='today-taskbar'>Today
    <h5>{convertDay(day) } {convertMonth(month)}</h5>
    </div>
    <div className='upcoming-taskbar'>Upcoming
    <div className='upcoming-details'>
          <h3>12 Mar - Saturday</h3>
          <h4>Upcoming Task 1</h4>
          <h3>14 Mar - Saturday</h3>
          <h4>Upcoming Task 1</h4>
    </div>
    </div>
    </div>

  </div>
  )
}

export default Home
