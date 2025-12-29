import { Formik, Form, Field, type FormikHelpers } from 'formik'
import * as Yup from 'yup'
import { useSignUpMutation } from '../api/useSignUpMutation'
import { TextField } from '@/shared/ui/TextField/TextField'
import { Button } from '@/shared/ui/Button/Button'
import { Spinner } from '@/shared/ui/Spinner/Spinner'
import { ApiError } from '@/shared/api/ApiError'
import googleIcon from '@/assets/Google.png'

type SignUpFormValues = {
  fullName: string
  email: string
  password: string
}

const validationSchema = Yup.object({
  fullName: Yup.string()
    .min(2, 'Full name must be at least 2 characters')
    .required('Full name is required'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters long.')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one lowercase letter, one uppercase letter, and one number.'
    )
    .required('Password is required'),
})

export function SignUpForm() {
  const signUpMutation = useSignUpMutation()

  const handleSubmit = (
    values: SignUpFormValues,
    { setSubmitting, setFieldError }: FormikHelpers<SignUpFormValues>
  ) => {
    signUpMutation.mutate(
      {
        fullName: values.fullName,
        email: values.email,
        password: values.password,
      },
      {
        onError: (error: Error) => {
          if (error instanceof ApiError && error.data) {
            const errorData = error.data as { details?: Array<{ field: string; message: string }> }
            if (errorData.details && Array.isArray(errorData.details)) {
              errorData.details.forEach((detail) => {
                if (detail.field && detail.message) {
                  setFieldError(detail.field, detail.message)
                }
              })
            }
          }
        },
        onSettled: () => {
          setSubmitting(false)
        },
      }
    )
  }

  return (
    <Formik
      initialValues={{ fullName: '', email: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form className="w-full space-y-4">
          <Field
            name="fullName"
            as={TextField}
            label="Full Name"
            type="text"
            placeholder="Mahfuzul Nabil"
            error={touched.fullName ? errors.fullName : undefined}
            disabled={isSubmitting || signUpMutation.isPending}
            autoComplete="name"
          />
          <Field
            name="email"
            as={TextField}
            label="Email"
            type="email"
            placeholder="example@gmail.com"
            error={touched.email ? errors.email : undefined}
            disabled={isSubmitting || signUpMutation.isPending}
            autoComplete="email"
          />
          <Field
            name="password"
            as={TextField}
            label="Password"
            type="password"
            placeholder="••••••••"
            error={touched.password ? errors.password : undefined}
            disabled={isSubmitting || signUpMutation.isPending}
            autoComplete="new-password"
          />
          <Button
            type="submit"
            disabled={isSubmitting || signUpMutation.isPending}
            className="w-full bg-[#C8EE44] hover:bg-[#B8DE34] text-slate-900 font-semibold"
          >
            {signUpMutation.isPending ? <Spinner size="sm" /> : 'Create Account'}
          </Button>
          <button
            type="button"
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-50"
          >
            <img src={googleIcon} alt="Google" className="h-5 w-5" />
            Sign up with google
          </button>
        </Form>
      )}
    </Formik>
  )
}
