import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './screens/Home';
import Game from './screens/Game';
import './App.css';

function App() {

  return (
    <main>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/play" element={<Game />} />
        </Routes>
      </BrowserRouter>
    </main>
  )
}

export default App
