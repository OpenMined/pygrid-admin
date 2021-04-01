import {FunctionComponent, useState, useRef} from 'react'
import cn from 'classnames'
import {useRouter} from 'next/router'
import {useForm} from 'react-hook-form'
import {getLayout} from '@/layouts/blank'
import {Spinner} from '@/components/icons/spinner'
import {useAuth} from '@/context/auth-context'

const Login: FunctionComponent & {getLayout: FunctionComponent} = () => {
  const router = useRouter()
  const {login} = useAuth()
  const {register, handleSubmit, formState} = useForm({mode: 'onTouched'})
  const [error, setError] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [spin, setSpin] = useState<boolean>(false)
  const rotateStyle = useRef({})
  const {isValid} = formState
  const nodeName = 'Node name'

  if (spin) {
    rotateStyle.current = {transform: `rotate(${Math.ceil(365 * Math.random())}deg)`}
    setSpin(false)
    if (error) {
      setError(false)
    }
  }

  const onSubmit = async values => {
    try {
      setLoading(true)
      await login(values)
      router.push('/dashboard')
    } catch ({message}) {
      setError(message ?? 'API unreachable')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="container mx-auto">
      <div className="flex flex-col items-center max-w-md mx-auto space-y-4 text-center">
        <div className="transition transform" style={rotateStyle.current}>
          <img alt="PyGrid logo" src="/assets/logo.png" width={200} height={200} />
        </div>
        <h1 className="text-3xl">Welcome to PyGrid Node</h1>
        <h2>{nodeName}</h2>
        <form className="w-4/5" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col space-y-6 text-left">
            <div className="flex flex-col">
              <label className="text-gray-600" htmlFor="email">
                Email or username
              </label>
              <input
                className="base-input"
                name="email"
                type="email"
                ref={register({required: true})}
                placeholder="Your email or username"
                onChange={() => setSpin(true)}
              />
              {error && <span className="px-4 py-1 mt-0.5 text-sm text-gray-800 bg-red-200">{error}</span>}
            </div>
            <div className="flex flex-col">
              <label className="text-gray-600" htmlFor="password">
                Password
              </label>
              <input
                className="base-input"
                type="password"
                name="password"
                ref={register({required: true})}
                placeholder="Your password"
                onChange={() => setSpin(true)}
              />
            </div>
            <button className={cn('btn', loading && 'pointer-events-none')} disabled={!isValid || error}>
              {loading ? <Spinner className="w-4 h-4 animate-spin" /> : 'Login'}
            </button>
          </div>
          {/* <div className="my-2 text-sm"> */}
          {/*   No credentials? <a>Request access</a> */}
          {/* </div> */}
        </form>
      </div>
    </main>
  )
}

Login.getLayout = getLayout

export default Login
