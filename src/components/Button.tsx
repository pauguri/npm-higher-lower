export default function Button({ clickHandler, className = "", children }: { clickHandler: () => void, className?: string, children: React.ReactNode }) {
  return (
    <button onClick={clickHandler} className={"text-white border-2 border-transparent flex justify-center items-center gap-2.5 rounded-full p-1 md:p-2.5 text-lg md:text-xl max-w-64 w-3/4 hover:border-yellow hover:text-yellow hover:bg-transparent transition-colors " + className}>
      {children}
    </button>
  )
}
