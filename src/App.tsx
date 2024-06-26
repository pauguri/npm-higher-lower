import { HashRouter, Route, Routes } from 'react-router-dom';
import Home from './screens/Home';
import Game from './screens/Game';
import './App.css';
import Loader from './components/Loader';
import { useState } from 'react';

function App() {
  const [loading, setLoading] = useState(false);

  return (
    <>
      <HashRouter>
        <Loader active={loading} />
        <Routes>
          <Route path="/" element={<Home loadingSetter={setLoading} />} />
          <Route path="/play" element={<Game loadingSetter={setLoading} />} />
        </Routes>
      </HashRouter>
    </>
  )
}

export default App
