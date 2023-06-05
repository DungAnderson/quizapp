import React, { useState } from 'react'
import { Route, Routes, useNavigate} from "react-router-dom";
import Home from "./components/Home";
import Play from "./components/Play";
import QuizSummary from "./components/quiz/QuizSummary";
function App() {
  const navigate = useNavigate()
  const [data, setData] = useState([])
  return (
    <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/play" element={<Play navigate={navigate} setData={setData}/> }></Route>
        <Route path="/quizsummary" element={<QuizSummary
            navigate={navigate}
            data={data}
        /> }></Route>
    </Routes>
  );
}

export default App;
