import {FunctionComponent, useState, useRef} from 'react'
import cn from 'classnames'
import {useRouter} from 'next/router'
import {useForm} from 'react-hook-form'
import {getLayout} from '@/layouts/blank'
import {Spinner} from '@/components/icons/spinner'
import {useAuth} from '@/context/auth-context'
import {useFetch} from '@/utils/query-builder'
import {PyGridStatus} from '@/types'
import {Alert, Input, Select, Subtitle, Title} from '@/components/lib'

const Login: FunctionComponent & {getLayout: FunctionComponent} = () => {
  const router = useRouter()
  const {login} = useAuth()
  const {register, handleSubmit, formState} = useForm({mode: 'onChange'})
  const [error, setError] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [spin, setSpin] = useState<boolean>(false)
  const rotateStyle = useRef({})
  const {isValid} = formState
  const {isLoading, isError, data: status} = useFetch<PyGridStatus>('/setup/status')

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
        <Title>Welcome to PyGrid</Title>
        {status && !isError && <Subtitle>Login to <b>{status.nodeName}</b> Domain</Subtitle>}
        <form className="w-4/5" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col text-left space-y-6">
            <div className="flex flex-col">
              <Input
                name="email"
                label="Your email or username"
                ref={register({required: 'This is required'})}
                placeholder="researcher@openmined.com"
                error={formState.errors.email?.message}
                onChange={() => setSpin(true)}
              />
              {error && <span className="px-4 py-1 mt-0.5 text-sm text-gray-800 bg-red-200">{error}</span>}
            </div>
            <div className="flex flex-col">
              <Input
                type="password"
                name="password"
                label="Your password"
                ref={register({required: 'This is required'})}
                placeholder="********"
                error={formState.errors.password?.message}
                onChange={() => setSpin(true)}
              />
            </div>
            <button className={cn('btn', loading && 'pointer-events-none')} disabled={!isValid || error}>
              {loading ? <Spinner className="w-4 h-4 animate-spin" /> : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}

Login.getLayout = getLayout

export default Login
