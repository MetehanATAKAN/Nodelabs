import nodelabsIcon from '@/assets/nodelabs-icon.png'

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="relative flex-shrink-0">
        <div className="absolute inset-0 rounded-lg bg-slate-100 opacity-50"></div>
        <div className="relative rounded-lg bg-white p-1.5">
          <img src={nodelabsIcon} alt="Fintech" className="h-7 w-7" />
        </div>
      </div>
      <span className="text-lg font-bold text-[#1B212D]">Fintech</span>
    </div>
  )
}

