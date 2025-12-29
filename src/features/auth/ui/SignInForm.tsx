import { Formik, Form, Field, type FormikHelpers } from 'formik'
import * as Yup from 'yup'
import { useSignInMutation } from '../api/useSignInMutation'
import { TextField } from '@/shared/ui/TextField/TextField'
import { Button } from '@/shared/ui/Button/Button'
import { Spinner } from '@/shared/ui/Spinner/Spinner'
import googleIcon from '@/assets/Google.png'

type SignInFormValues = {
  email: string
  password: string
}

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
})

export function SignInForm() {
  const signInMutation = useSignInMutation()

  const handleSubmit = (
    values: SignInFormValues,
    { setSubmitting }: FormikHelpers<SignInFormValues>
  ) => {
    signInMutation.mutate(values, {
      onSettled: () => {
        setSubmitting(false)
      },
    })
  }

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form className="w-full space-y-4">
          <Field
            name="email"
            as={TextField}
            label="Email"
            type="email"
            placeholder="example@gmail.com"
            error={touched.email ? errors.email : undefined}
            disabled={isSubmitting || signInMutation.isPending}
            autoComplete="email"
          />
          <Field
            name="password"
            as={TextField}
            label="Password"
            type="password"
            placeholder="••••••••"
            error={touched.password ? errors.password : undefined}
            disabled={isSubmitting || signInMutation.isPending}
            autoComplete="current-password"
          />
          <Button
            type="submit"
            disabled={isSubmitting || signInMutation.isPending}
            className="w-full bg-[#C8EE44] hover:bg-[#B8DE34] text-slate-900 font-semibold"
          >
            {signInMutation.isPending ? <Spinner size="sm" /> : 'Sign In'}
          </Button>
          <button
            type="button"
            className="flex w-full items-center justify-center gap-3 rounded-[10px] border border-[#F5F5F5] bg-white px-4 py-3 text-base font-semibold text-[#78778B] transition-colors hover:bg-slate-50"
          >
            <img src={googleIcon} alt="Google" className="h-5 w-5" />
            Sign in with google
          </button>
        </Form>
      )}
    </Formik>
  )
}
