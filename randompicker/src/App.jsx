
import "./App.css";
import { PickerProvider } from "./contexts/PickerContext";
import AddPicks from "./components/AddPicks";
import PickList from "./components/PickList";

function App() {
  return (
    
    <>

<h1>Random Picker</h1>
      <h2>Type your picks in the box</h2>

      <main className="main-container">
        <PickerProvider>
          <AddPicks />
         
          <PickList />
        </PickerProvider>
      </main>

    
    </>
  );
}

export default App;
