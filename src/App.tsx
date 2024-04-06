import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './screens/Home';
import Game from './screens/Game';
import './App.css';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/play" element={<Game />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
