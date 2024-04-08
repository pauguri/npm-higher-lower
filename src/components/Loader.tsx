import './Loader.css';

export default function Loader({ active = true }: { active?: boolean }) {
  return (
    <div className={"absolute inset-0 z-50 flex flex-col items-center justify-center bg-dark-blue transition-opacity duration-300" + (active ? " opacity-100" : " opacity-0 pointer-events-none")}>
      <div className="loader"></div>
    </div>
  )
}
