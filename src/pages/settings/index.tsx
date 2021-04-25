import {Alert, Input, Select} from '@/components/lib'
import {ButtonRound} from '@/components/lib'
import React, {FunctionComponent, useEffect, useState} from 'react'
import {fetchSettings, updateSettings} from '../api/settings'
import {useForm} from 'react-hook-form'
import {useFetch, useMutate} from '@/utils/query-builder'
import {Notification} from '@/components/notifications'
import {Spinner} from '@/components/icons/spinner'

const Settings: FunctionComponent = () => {
  const {isLoading, error, isError, data: settings} = useFetch<Array<any>>('/setup')
  const editSettings = useMutate<Partial<any>, any>({url: `/setup`, method: 'post', invalidate: '/setup'})
  const {
    register,
    formState: {errors},
    handleSubmit
  } = useForm()

  const isValid = true

  const submit = values => {
    editSettings.mutate(values as Partial<any>, {onSuccess: close})
  }

  return (
    <main className="space-y-4">
      <h1 className="text-4xl text-gray-800">Settings</h1>
      <p className="text-xl font-light text-gray-400 pb-8">Configure your domain</p>
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
              defaultValue={settings?.replicateDb}
              options={[
                {value: 1, label: 'Yes'},
                {value: 0, label: 'No'}
              ]}
            />
            <Select
              name="autoScale"
              ref={register}
              label="Infraestructure Auto Scale"
              defaultValue={settings?.autoScale}
              options={[
                {value: 1, label: 'Yes'},
                {value: 0, label: 'No'}
              ]}
            />
            <Select
              name="allowUserSignup"
              ref={register}
              label="Allow User Signup"
              defaultValue={settings?.allowUserSignup}
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
