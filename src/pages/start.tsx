import {useState} from 'react'
import {useRouter} from 'next/router'
import cn from 'classnames'
import {useForm} from 'react-hook-form'
import {Input} from '@/components/lib'
import {getLayout} from '@/layouts/blank'
import {CheckMark} from '@/components/icons/marks'
import api from '@/utils/api-axios'

const steps = [
  {name: 'Deploy PyGrid', description: 'Deploy the PyGrid Domain via the PyGrid CLI.', href: '#', status: 'complete'},
  {
    name: 'PyGrid setup token',
    description: 'Verify the token obtained during installation.',
    href: '#',
    status: 'current'
  },
  {name: 'Owner account', description: 'Create the Domain Owner account.', href: '#', status: 'upcoming'},
  {name: 'Other settings', description: 'Set up some remaining options for PyGrid', href: '#', status: 'upcoming'}
]

export default function Example() {
  const [currentStep, setStep] = useState(1)
  const {handleSubmit, register} = useForm()
  const router = useRouter()

  function submit(values) {
    setStep(3)
    api.post('/setup', values).then(() => router.push('/login'))
  }

  function change() {
    if (steps[currentStep].status !== 'complete') {
      steps[currentStep].status = 'complete'
      steps[currentStep + 1].status = 'current'
    }

    setStep(curr => curr + 1)
  }

  return (
    <main className="mx-auto max-w-3xl h-screen flex items-center">
      <article className="flex flex-row w-full max-w-xl mx-auto space-x-20">
        <nav aria-label="Progress" className="w-full">
          <ol className="overflow-hidden">
            {steps.map((step, stepIdx) => (
              <li key={step.name} className={cn(stepIdx !== steps.length - 1 ? 'pb-10' : '', 'relative')}>
                {step.status === 'complete' ? (
                  <>
                    {stepIdx !== steps.length - 1 ? (
                      <div
                        className="-ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full bg-indigo-600"
                        aria-hidden="true"
                      />
                    ) : null}
                    <div onClick={() => setStep(stepIdx)}>
                      <a href={step.href} className="relative flex items-start group">
                        <span className="flex items-center h-9">
                          <span className="relative z-10 flex items-center justify-center w-8 h-8 bg-indigo-600 rounded-full group-hover:bg-indigo-800">
                            <CheckMark className="w-5 h-5 text-white" aria-hidden="true" />
                          </span>
                        </span>
                        <span className="flex flex-col min-w-0 ml-4">
                          <span className="text-xs font-semibold tracking-wide uppercase">{step.name}</span>
                          <span className="text-sm text-gray-500">{step.description}</span>
                        </span>
                      </a>
                    </div>
                  </>
                ) : step.status === 'current' ? (
                  <>
                    {stepIdx !== steps.length - 1 ? (
                      <div
                        className="-ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full bg-gray-300"
                        aria-hidden="true"
                      />
                    ) : null}
                    <a href={step.href} className="relative flex items-start group" aria-current="step">
                      <span className="flex items-center h-9" aria-hidden="true">
                        <span className="relative z-10 flex items-center justify-center w-8 h-8 bg-white border-2 border-indigo-600 rounded-full">
                          <span className="h-2.5 w-2.5 bg-indigo-600 rounded-full" />
                        </span>
                      </span>
                      <span className="flex flex-col min-w-0 ml-4">
                        <span className="text-xs font-semibold tracking-wide text-indigo-600 uppercase">
                          {step.name}
                        </span>
                        <span className="text-sm text-gray-500">{step.description}</span>
                      </span>
                    </a>
                  </>
                ) : (
                  <>
                    {stepIdx !== steps.length - 1 ? (
                      <div
                        className="-ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full bg-gray-300"
                        aria-hidden="true"
                      />
                    ) : null}
                    <a href={step.href} className="relative flex items-start group">
                      <span className="flex items-center h-9" aria-hidden="true">
                        <span className="relative z-10 flex items-center justify-center w-8 h-8 bg-white border-2 border-gray-300 rounded-full group-hover:border-gray-400">
                          <span className="h-2.5 w-2.5 bg-transparent rounded-full group-hover:bg-gray-300" />
                        </span>
                      </span>
                      <span className="flex flex-col min-w-0 ml-4">
                        <span className="text-xs font-semibold tracking-wide text-gray-500 uppercase">{step.name}</span>
                        <span className="text-sm text-gray-500">{step.description}</span>
                      </span>
                    </a>
                  </>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <section className="w-full">
          <form onSubmit={handleSubmit(submit)}>
            <div className={cn(currentStep !== 1 && 'sr-only')}>
              <Input ref={register} label="Token" placeholder="Insert the token" name="token" />
            </div>
            <div className={cn(currentStep !== 2 && 'sr-only', 'space-y-4')}>
              <Input ref={register} label="Owner email" placeholder="Owner account email" name="email" />
              <Input
                ref={register}
                label="Owner password"
                placeholder="Owner account password"
                name="password"
                type="password"
              />
            </div>
            <div className={cn(currentStep !== 3 && 'sr-only')}>
              <Input ref={register} label="Domain name" placeholder="Domain name" name="domainName" />
            </div>
            <div className="flex flex-row justify-between mt-8 space-x-4">
              <div>
                <button
                  className={cn('btn', currentStep <= 1 && 'hidden')}
                  type="button"
                  onClick={() => setStep(curr => curr - 1)}>
                  Previous
                </button>
              </div>
              {currentStep === 3 ? (
                <button key="finish" className="btn">
                  Finish setup
                </button>
              ) : (
                <button className="btn" onClick={change} type="button">
                  Next
                </button>
              )}
            </div>
          </form>
        </section>
      </article>
      {/* <Dialog open={true} onClose={() => false} className="fixed inset-0 z-10 overflow-y-auto"> */}
      {/* <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" /> */}
      {/* <img alt="PyGrid logo" src="/assets/logo.png" className="w-24 h-24 spin" /> */}
      {/* <button onClick={() => false}>Cancel</button> */}
      {/* <Dialog.Title>None</Dialog.Title> */}
      {/* </Dialog> */}
    </main>
  )
}

Example.getLayout = getLayout
