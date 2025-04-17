import React from 'react'
import { useContext } from "react";
import { PickerContext } from '../contexts/PickerContext'; 


export default function AddPicks() {
  const { state, dispatch } = useContext(PickerContext);

  function handleChangepick({ target }) {
    dispatch({
      type: "CHANGE",
      payload: target.value,
    });
  }

  function handleAddpick(e) {
    e.preventDefault();

    dispatch({
      type: "ADD",
    });
  }

  return (
    <form>
      <input
        id="pick-content"
        name="pick-content"
        value={state.pickContent}
        onChange={handleChangepick}
      />
      <button onClick={handleAddpick}>Add</button>
      <button className="reset" onClick={() => dispatch({ type: "RESET" })}>
  Restart
</button>
    </form>
  );
}
