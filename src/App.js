import React, { useState, useEffect } from 'react'
import Loading from './Loading'
import Tours from './Tours'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-tours-project'
function App() {
  const [loading, setLoading] = useState(true);
  const [tours, setTours] = useState([]);

  const removeTour = (id) => {
    const newTours = tours.filter((tour)=> tour.id !== id);
    setTours(newTours)
    
  }

  const fetchTours = async () => {
    setLoading(true);

    try {
      
      const response = await fetch(url);
      const tours = await response.json();
      setLoading(false);
      setTours(tours)
    } catch (error) {
      setLoading(false);
      console.log(error)
    }
    
  }
// the useEffect is used to invoke the fetchTours when the component renders. it wshould only run once.
  useEffect(()=> {
    fetchTours()
  }, [])

  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    )
  } 
// if there are no more tours. the button connects the fetchtours function. it can also be written inline
  if (tours.length === 0) {
    return (
      <main>
        <div className="title">
          <h2>No tours left</h2>
          <button className='btn' onClick={fetchTours}>Refresh</button>
        </div>
      </main>
    )
  }
  // if the loading is not true, then it will return the tours.
  return (
    <main>
      <Tours tours={tours} removeTour = {removeTour}/>
    </main>
  )
  
}

export default App
