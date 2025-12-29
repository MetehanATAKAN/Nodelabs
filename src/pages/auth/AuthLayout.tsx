import { Outlet } from 'react-router-dom'
import { Logo } from '@/shared/ui/Logo/Logo'
import signInImage from '@/assets/sign-in.png'

export function AuthLayout() {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <div className="flex flex-[3] flex-col bg-white overflow-y-auto px-4 sm:px-8 lg:pl-48">
        <div className="px-4 sm:px-8 lg:px-0 pt-8 pb-4 shrink-0">
          <Logo />
        </div>
        <div className="flex-1 flex items-center justify-center lg:justify-start px-4 sm:px-8 lg:px-0 py-12">
          <div className="w-full max-w-md">
            <Outlet />
          </div>
        </div>
      </div>
      <div className="hidden lg:flex flex-[2] items-center justify-center bg-slate-100 overflow-hidden">
        <div className="w-full h-full flex items-center justify-center">
          <img src={signInImage} alt="Authentication" className="w-full h-full" />
        </div>
      </div>
    </div>
  )
}

