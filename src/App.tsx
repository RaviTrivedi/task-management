import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Home from "./pages/Home";
import TaskDescription from "./pages/TaskDescription";

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<TaskDescription />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
