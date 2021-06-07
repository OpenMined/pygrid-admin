import {Alert, Input, Select, SectionHeader} from '@/components/lib'
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
    method: 'put',
    invalidate: ['/setup', '/setup/status']
  })
  const {register, formState, handleSubmit, reset} = useForm()

  const submit = values => {
    editSettings.mutate(values as Partial<PyGridSettings>)
    reset(values)
  }

  return (
    <main className="space-y-8">
      <SectionHeader>
        <SectionHeader.Title>Settings</SectionHeader.Title>
        <SectionHeader.Description>Configure your domain</SectionHeader.Description>
      </SectionHeader>
      <div className="relative space-y-6">
        <div>
          <h3 className="text-2xl text-gray-800">General Domain Settings</h3>
          <hr className="mt-3" />
        </div>
        <form onSubmit={handleSubmit(submit)} className="space-y-6">
          <div className="grid grid-flow-row md:grid-rows-1 md:grid-cols-1 md:grid-flow-col gap-4 ">
            <Input
              name="domain_name"
              label="Domain Name"
              ref={register({required: 'This is required'})}
              placeholder="OpenMined Domain"
              defaultValue={settings?.domainName}
              hint="The public name for your domain"
              error={formState.errors.domainName?.message}
            />
          </div>
          <div className="flex flex-col text-right lg:flex-row-reverse">
            <button className="lg:ml-4 btn transition-all ease-in-out duration-700" disabled={!formState.isDirty}>
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
