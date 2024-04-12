import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import './Home.css';
import { decorPkgList } from '../decorPkgList';

export default function Home({ loadingSetter: setLoading }: { loadingSetter: (loading: boolean) => void }) {
  const navigate = useNavigate();

  const handleStartGame = () => {
    setLoading(true);

    setTimeout(() => {
      navigate('/play');
    }, 500);
  }

  const decorListOffset = Math.floor(Math.random() * decorPkgList.length);
  const decorText = decorPkgList.substring(decorListOffset, decorListOffset + 700);

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen p-4 overflow-hidden md:p-8 lg:p-12 bg-dark-blue">
      <div className='bg-decor'>{decorText}</div>
      <div className='relative z-10 flex flex-col items-center gap-12'>
        <div className='flex flex-col items-center gap-4 text-center'>
          <h1 className='font-mono text-2xl font-bold md:text-4xl text-yellow'>npm-higher-lower</h1>
          <p className='font-thin md:text-xl'>the game about guessing package popularity</p>
        </div>
        <Button onClick={handleStartGame} className='bg-green'>Start Game</Button>
      </div>
    </div>
  )
}
