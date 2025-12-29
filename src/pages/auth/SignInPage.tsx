import { Link } from 'react-router-dom'
import { SignInForm } from '@/features/auth/ui/SignInForm'
import greenUnderline from '@/assets/green-underline.svg'

export function SignInPage() {
  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold text-slate-900 mb-2">Sign In</h1>
      <p className="text-sm text-slate-500 mb-8">Welcome back! Please enter your details</p>
      <SignInForm />
      <p className="mt-6 font-normal text-sm text-[#929EAE] text-center">
        Don't have an account?{' '}
        <Link to="/sign-up" className="relative inline-block font-medium text-[#000000]">
          Sign up
          <img src={greenUnderline} alt="" aria-hidden="true" className="absolute bottom-0 left-0 top-6 w-full" />
        </Link>
      </p>
    </div>
  )
}

