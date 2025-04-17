import React, { useContext } from 'react';
import { PickerContext } from '../contexts/PickerContext'; 
import Pick from './Pick';

import trumpetsGif from '../assets/trumpets.gif'; 
import win2 from '../assets/win2.gif';
import win3 from '../assets/win3.gif';
import win4 from '../assets/win4.gif';

import waiting1 from '../assets/waiting.gif';
import waiting2 from '../assets/waiting2.gif';
import waiting3 from '../assets/waiting3.gif';
import waiting4 from '../assets/waiting4.gif';

import fireworks from '../assets/fireworks.gif';

export default function PickList() {
  const winningGifs = [trumpetsGif, win2, win3, win4];
  const waitingGifs = [waiting1, waiting2, waiting3, waiting4];

  const { state, dispatch } = useContext(PickerContext);

  function handleRandomPick() {
    const randomWaitingGif = waitingGifs[Math.floor(Math.random() * waitingGifs.length)];
    const randomWinningGif = winningGifs[Math.floor(Math.random() * winningGifs.length)];

    dispatch({ type: "RANDOM_PICK_START", payload: { gif: randomWaitingGif } });

    setTimeout(() => {
      dispatch({ type: "RANDOM_PICK_SUCCESS", payload: { gif: randomWinningGif } });
    }, 6000);
  }

  return (
    <div>
      <h2>Pick Options:</h2>

      {state.picks.length === 0 ? (
        <p>No pick options yet big boi!</p>
      ) : (
        <ul className="pick-list">
          {state.picks.map(obj => (
            <li key={obj.id}>
              <Pick pickItem={obj} />
            </li>
          ))}
        </ul>
      )}

      <button onClick={handleRandomPick} className="play">Play!</button>

      {state.loading && (
        <div className="loading-container">
          <h3>analyzing choices...</h3>
          {state.waitingGif && (
            <img src={state.waitingGif} alt="Drumroll animation" />
          )}
        </div>
      )}

      {state.selectedPick && (
        <div className="winner-container">
          <h3>My Random Pick is:</h3>
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
          {state.selectedGif && (
            <img src={state.selectedGif} alt="Winner celebration" />
          )}
        </div>
      )}
    </div>
  );
}
