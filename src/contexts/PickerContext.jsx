import { createContext, useReducer, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export const PickerContext = createContext();

const storedPicks = JSON.parse(localStorage.getItem("picks")) || [];

const initialState = {
  pickContent: "",
  picks: storedPicks,
  selectedPick: null,
  showWinner: false,
  loading: false
};

function reducer(state, actionObj) {
  switch (actionObj.type) {
    case "CHANGE":
      return { ...state, pickContent: actionObj.payload };
    case "ADD": {
      if (state.pickContent.length > 0) {
        const newPick = {
          content: state.pickContent,
          id: uuidv4(),
        };
        return {
          pickContent: "",
          picks: [...state.picks, newPick],
        };
      } else {
        alert("Please type something!");
        return state;
      }
    }
    case "DELETE":
      return {
        ...state,
        picks: state.picks.filter((obj) => obj.id !== actionObj.payload),
      };


      case "RANDOM_PICK_START":
        return {
          ...state,
          loading: true,
          showWinner: false
        };
      
      case "RANDOM_PICK_SUCCESS": {
        if (state.picks.length > 0) {
          const randomPick = state.picks[Math.floor(Math.random() * state.picks.length)];
          return {
            ...state,
            selectedPick: randomPick,
            loading: false,
            showWinner: true
          };
        } else {
          alert("No picks available to choose from.");
          return state;
        }
      }

      case "RESET":
        return {
          ...state,
          picks: [],
          selectedPick: null,
          pickContent: ""
        };
      

    default:
      console.log("Unknown action type", actionObj.type);
      return state;
  }

  
}

export function PickerProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem("picks", JSON.stringify(state.picks));
  }, [state.picks]);

  return (
    <PickerContext.Provider value={{ state, dispatch }}>
      {children}
    </PickerContext.Provider>
  );
}
