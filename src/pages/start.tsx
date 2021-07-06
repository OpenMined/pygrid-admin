import {useRouter} from 'next/router'
import {useForm} from 'react-hook-form'
import {getLayout} from '@/layouts/blank'
import {Input, NormalButton, DomainConnectionStatus, MutationError} from '@/components'
import {Spinner} from '@/components/icons/spinner'
import {useSettings} from '@/lib/data/useMe'

interface Onboarding {
  domainName: string
  email: string
  password: string
}

export default function Onboarding() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: {isValid}
  } = useForm({mode: 'onTouched'})

  const {create} = useSettings()
  const mutation = create({
    onSuccess: () => {
      router.push('/login')
    }
  })

  const onSubmit = ({email, password, domainName}: Onboarding) => {
    mutation.mutate({email, password, nodeName: domainName})
  }

  return (
    <main className="mx-auto max-w-7xl min-h-screen flex justify-center items-center flex-col">
      <div className="p-12 bg-blueGray-200 rounded-lg md:min-w-lg space-y-6 m-8">
        <header className="space-y-3">
          <h1>PyGrid</h1>
          <p className="text-gray-500">One last step to finish the Domain setup</p>
        </header>
        <p className="max-w-lg">
          After installing PyGrid, you must set up a Domain owner account and give your Domain a name.
        </p>
        <form className="max-w-lg space-y-3" onSubmit={handleSubmit(onSubmit)}>
          <MutationError
            isError={mutation.isError}
            error="Unable to setup domain"
            description={mutation.error?.message}
          />
          <Input label="Domain name" id="domainName" name="domainName" placeholder="Grid Domain" ref={register} />
          <Input label="Email or username" placeholder="owner@openmined.org" id="email" name="email" ref={register} />
          <Input
            label="Password"
            id="password"
            name="password"
            type="password"
            placeholder="••••••••••"
            ref={register}
          />
          <div className="mt-4 flex items-center">
            <NormalButton
              className="w-36 disabled:bg-gray-200 disabled:text-white"
              disabled={!isValid || mutation.isLoading}>
              {mutation.isLoading ? <Spinner className="w-4 h-4" /> : 'Start domain'}
            </NormalButton>
            <DomainConnectionStatus />
          </div>
        </form>
      </div>
    </main>
  )
}

Onboarding.getLayout = getLayout
