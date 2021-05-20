import {Alert, Input, Select, Subtitle, Title} from '@/components/lib'
import React, {FunctionComponent} from 'react'
import {useForm} from 'react-hook-form'
import {useFetch, useMutate} from '@/utils/query-builder'
import {Notification} from '@/components/notifications'
import {Spinner} from '@/components/icons/spinner'
import {PyGridSettings} from '@/types'

const Settings: FunctionComponent = () => {
  const {isLoading, error, isError, data: settings} = useFetch<PyGridSettings>('/setup')
  const editSettings = useMutate<Partial<PyGridSettings>, PyGridSettings>({
    url: `/setup`,
    method: 'post',
    invalidate: '/setup'
  })
  const {
    register,
    formState: {errors},
    handleSubmit
  } = useForm()

  const submit = values => {
    editSettings.mutate(values as Partial<PyGridSettings>, {onSuccess: close})
  }

  return (
    <main className="space-y-4">
      <header>
        <Title>Settings</Title>
        <Subtitle>Configure your domain</Subtitle>
      </header>
      <div className="relative space-y-6">
        <div>
          <h3 className="text-2xl text-gray-800">General Domain Settings</h3>
          <hr className="mt-3" />
        </div>
        <form onSubmit={handleSubmit(submit)} className="space-y-6">
          <div className="grid grid-flow-row md:grid-rows-1 md:grid-cols-3 md:grid-flow-col gap-4 ">
            <Input
              name="domainName"
              label="Domain Name"
              ref={register({required: 'This is required'})}
              placeholder="OpenMined Domain"
              defaultValue={settings?.domainName}
              hint="The public name for your domain"
              error={errors.domainName?.message}
            />
            <Input
              name="awsCredentials"
              label="Cloud Provider API Credentials"
              ref={register({required: 'This is required'})}
              placeholder="nilcwjicwiweije90391nmos"
              defaultValue={settings?.awsCredentials}
              error={errors.awsCredentials?.message}
            />
            <Input
              name="cacheStrategy"
              label="Cache Strategy"
              ref={register({required: 'This is required'})}
              placeholder="nilcwjicwiweije90391nmos"
              error={errors.tensorExpirationPolicy?.message}
            />
          </div>
          <div>
            <h3 className="text-2xl text-gray-800">Advanced Settings</h3>
            <hr className="mt-3" />
          </div>
          <Input
            name="tensorExpirationPolicy"
            label="Tensor Expiration Policy"
            ref={register({required: 'This is required'})}
            placeholder="30"
            hint="Expiration time in seconds for Tensors"
            error={errors.tensorExpirationPolicy?.message}
          />

          <div className="grid grid-flow-row md:grid-rows-1 md:grid-cols-3 md:grid-flow-col gap-4">
            <Select
              name="replicateDb"
              ref={register}
              label="Replicate Database"
              defaultValue={settings?.replicateDb ? 1 : 0}
              options={[
                {value: 1, label: 'Yes'},
                {value: 0, label: 'No'}
              ]}
            />
            <Select
              name="autoScale"
              ref={register}
              label="Infraestructure Auto Scale"
              defaultValue={settings?.autoScale ? 1 : 0}
              options={[
                {value: 1, label: 'Yes'},
                {value: 0, label: 'No'}
              ]}
            />
            <Select
              name="allowUserSignup"
              ref={register}
              label="Allow User Signup"
              defaultValue={settings?.allowUserSignup ? 1 : 0}
              options={[
                {value: 1, label: 'Yes'},
                {value: 0, label: 'No'}
              ]}
            />
          </div>
          <div className="flex flex-col text-right lg:flex-row-reverse">
            <button className="lg:ml-4 btn transition-all ease-in-out duration-700" disabled={editSettings.isLoading}>
              {editSettings.isLoading ? <Spinner className="w-4 text-white" /> : 'Edit'}
            </button>
          </div>
          {editSettings.isError && (
            <div>
              <Alert error="There was an error editing the user" description={editSettings.error.message} />
            </div>
          )}
        </form>
        {editSettings.isSuccess && (
          <Notification title="Successfully saved!">
            <p>Settings successfully edited</p>
          </Notification>
        )}
      </div>
    </main>
  )
}

export default Settings
