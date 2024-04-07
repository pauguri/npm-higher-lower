import CountUp from "react-countup"
import { GuessablePackageType } from "../@types/types"
import GuessButton from "./GuessButton"

export default function Package({ pkg, className = "" }: { pkg: GuessablePackageType, className?: string }) {
  return (
    <div className={"flex flex-col gap-4 items-center justify-center w-full h-full p-4 md:p-8 lg:p-12 bg-dark-blue " + className}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h2 className="text-4xl">{pkg.package.package}</h2>
        <p className="text-xl font-thin">{pkg.package.description}</p>
      </div>
      {
        pkg.guessable ?
          (
            <div className="flex flex-col items-center w-full gap-2 text-yellow">
              <p>has</p>
              <GuessButton isTrue={true} />
              <GuessButton isTrue={false} />
              <p>weekly downloads</p>
            </div>
          ) :
          (
            <div className="flex flex-col items-center w-full text-yellow">
              <CountUp end={pkg.package.downloads} duration={2} separator="." className="text-5xl font-bold leading-none" />
              <p className="text-yellow">weekly downloads</p>
            </div>
          )
      }
    </div >
  )
}
