import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function GuessButton({ isTrue }: { isTrue: boolean }) {
  return (
    <button className={"text-white border-2 border-transparent flex justify-center items-center gap-2.5 rounded-full font-bold p-2.5 text-xl max-w-64 w-3/4 hover:border-yellow hover:text-yellow hover:bg-transparent transition-colors " + (isTrue ? 'bg-green' : 'bg-red')}>
      <FontAwesomeIcon icon={isTrue ? faChevronUp : faChevronDown} />
      <span>{isTrue ? "MORE" : "LESS"}</span>
    </button>
  )
}
