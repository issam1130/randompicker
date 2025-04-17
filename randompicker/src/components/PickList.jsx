import React from 'react'
import { useContext } from "react";
import { PickerContext } from '../contexts/PickerContext'; 
import Pick from './Pick';
import trumpetsGif from '../assets/trumpets.gif'; 
import waiting from '../assets/waiting.gif'; 
import fireworks from '../assets/fireworks.gif'; 

export default function PickList() {

    const { state, dispatch } = useContext(PickerContext);
    function handleRandomPick() {
        dispatch({ type: "RANDOM_PICK" });
      }

      function handleRandomPick() {
        dispatch({ type: "RANDOM_PICK_START" });
      
        setTimeout(() => {
          dispatch({ type: "RANDOM_PICK_SUCCESS" });
        }, 8000); // 2 seconds delay
      }
  return (
    <>



    <div >
    <h2>Pick Options:</h2>
    
   

   
    {
  state.picks.length === 0
    ? <p>No pick options yet big boi!</p>
    : <ul className="pick-list">
        {state.picks.map(obj => (
          <li key={obj.id}>
            <Pick pickItem={obj} />
          </li>
        ))}
      </ul>
}


<button onClick={handleRandomPick} className="play">Play!</button>



{state.loading && (
  <div className="loading-container">
    <h3>Horrible choices, let me choose the least horrible...</h3>
    <img src={waiting} alt="Drumroll" />
  </div>
)}

{state.selectedPick && (
        <div className="winner-container">
            
          <h3>Winner is:</h3>
          <div
  className="winner"
  style={{
    backgroundImage: `url(${fireworks})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    
  }}
>
  {state.selectedPick.content}
</div>
          <img src={trumpetsGif} alt="Trumpets" />
 
         
        </div>
      )}
      </div>
    </>
  )
}
