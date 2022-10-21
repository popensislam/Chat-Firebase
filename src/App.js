import { useContext } from "react";
import "./App.css";
import { AuthContext } from "./context/AuthContext";
import AppRouter from "./routes/AppRouter";

function App() {

  const {currentUser} = useContext(AuthContext)

  return (
    <div className="App">
      <AppRouter currentUser={currentUser}/>
    </div>
  );
}

export default App;
