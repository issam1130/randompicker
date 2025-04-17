import React, { useContext } from 'react';
import { PickerContext } from '../contexts/PickerContext'


 function Pick({pickItem}) {

  const {dispatch} = useContext(PickerContext);

  function handleDeletePick(id) {
    dispatch({
      type: "DELETE",
      payload: id
    })
  }

  return (
    <div className="pick">
    {pickItem.content}

    <span
      className="delete"
      onClick={() => {
        handleDeletePick(pickItem.id);
      }}
    >
                          <span className='delete'>      X</span>
    </span>
  </div>
  )
}

export default Pick;