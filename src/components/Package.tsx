import CountUp from "react-countup"
import { PackageType } from "../@types/types"
import GuessButton from "./GuessButton"

export default function Package({ pkg, showDownloads = false, animateDownloads = false, className = "" }: { pkg: PackageType, showDownloads?: boolean, animateDownloads?: boolean, className?: string }) {



  return (
    <div className={"relative flex flex-col gap-4 items-center justify-center w-full h-full p-4 md:p-8 lg:p-12 bg-dark-blue " + className}>
      <div className="flex flex-col items-center gap-1 text-center md:gap-2">
        <h2 className="min-w-0 text-2xl md:text-4xl">{pkg.package}</h2>
        <p className="font-thin md:text-xl line-clamp-3 md:line-clamp-6">{pkg.description}</p>
      </div>
      {
        showDownloads ?
          (
            <div className="flex flex-col items-center w-full text-yellow">
              <CountUp start={animateDownloads ? 0 : pkg.downloads} end={pkg.downloads} duration={1.5} className="text-3xl font-bold leading-none md:text-5xl" />
              <p className="text-yellow">weekly downloads</p>
            </div>
          ) :
          (
            <div className="flex flex-col items-center w-full gap-2 text-yellow">
              <p>has</p>
              <GuessButton isTrue={true} />
              <GuessButton isTrue={false} />
              <p>weekly downloads</p>
            </div>
          )
      }

      <div className="absolute text-xs font-thin -translate-x-1/2 md:text-sm bottom-4 left-1/2 opacity-60">{pkg.start + " - " + pkg.end}</div>
    </div>
  )
}
