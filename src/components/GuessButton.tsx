import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useContext } from "react";
import { GameContextType } from "../@types/types";
import { GameContext } from "../screens/Game";
import Button from "./Button";

export default function GuessButton({ isTrue }: { isTrue: boolean }) {
  const { guessCurrentPkg } = useContext<GameContextType>(GameContext);

  const handleClick = () => {
    if (guessCurrentPkg) {
      guessCurrentPkg(isTrue);
    }
  }

  return (
    <Button clickHandler={handleClick} className={isTrue ? 'font-bold bg-green' : 'font-bold bg-red'}>
      <FontAwesomeIcon icon={isTrue ? faChevronUp : faChevronDown} />
      <span>{isTrue ? "MORE" : "LESS"}</span>
    </Button>
  )
}
