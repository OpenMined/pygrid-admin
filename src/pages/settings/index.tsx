import {Input} from '@/components/forms/input'
import {Toggle} from '@/components/forms/toggle'
import {ButtonRound} from '@/components/lib'
import {ISettings} from '@/types/settings'
import React, {FunctionComponent, useState} from 'react'
import {useQuery} from 'react-query'
import {fetchSettings} from '../api/settings'

const Settings: FunctionComponent = () => {
  const {isLoading, data: settingsData, error} = useQuery<ISettings[], Error>('datasets', fetchSettings)
  const [domainName, setDomainName] = useState('University of Essex')
  const [cpCredentials, setCpCredentials] = useState('')
  const [cacheStrategy, setCacheStrategy] = useState('')
  const [tensorExpirationPolicy, setTensorExpirationPolicy] = useState('0')
  const [replicateDatabase, setReplicateDatabase] = useState(true)
  const [autoScale, setAutoScale] = useState(true)
  const [allowUserSignup, setAllowUserSignup] = useState(true)

  const isValid = domainName && cpCredentials && cacheStrategy && tensorExpirationPolicy ? true : false

  return (
    <main className="space-y-4">
      <h1 className="text-4xl text-gray-800">Settings</h1>
      <p className="text-xl font-light text-gray-400 pb-8">Configure your domain</p>
      <div className="relative space-y-6">
        <div>
          <h3 className="text-2xl text-gray-800">General Domain Settings</h3>
          <hr className="mt-3" />
        </div>
        <div className="grid grid-flow-row md:grid-rows-1 md:grid-cols-3 md:grid-flow-col gap-4">
          <Input
            value={domainName}
            required={true}
            label="Domain Name"
            placeholder="My Domain"
            hint="Set your domain name"
            onChange={value => {
              setDomainName(value)
            }}
          />
          <Input
            value={cpCredentials}
            required={true}
            label="Cloud Provider API Credentials"
            placeholder="nilcwjicwiweije90391nmos"
            hint="Set your cloud provider access keys"
            onChange={value => {
              setCpCredentials(value)
            }}
          />
          <Input
            value={cacheStrategy}
            required={true}
            label="Cache Strategy"
            placeholder="nilcwjicwiweije90391nmos"
            hint="Configure the domain's cache strategy"
            onChange={value => {
              setCacheStrategy(value)
            }}
          />
        </div>
        <div>
          <h3 className="text-2xl text-gray-800">Advanced Settings</h3>
          <hr className="mt-3" />
        </div>
        <Input
          value={tensorExpirationPolicy}
          required={true}
          label="Tensor Expiration Policy"
          placeholder="nilcwjicwiweije90391nmos"
          hint="Set your tensor expiration policy in days"
          onChange={value => {
            setTensorExpirationPolicy(value)
          }}
        />
        <div className="grid grid-flow-row md:grid-rows-1 md:grid-cols-3 md:grid-flow-col gap-4">
          <Toggle
            value={replicateDatabase}
            label="Replicate Database"
            hint="Set whether you want to replicate db"
            onChange={value => {
              setReplicateDatabase(value)
            }}
          />
          <Toggle
            value={autoScale}
            label="Infraestructure Auto Scale"
            hint="Allow infraestructure auto scaling"
            onChange={value => {
              setAutoScale(value)
            }}
          />
          <Toggle
            value={allowUserSignup}
            label="Allow User Signup"
            hint="Allow users to signup in your domain"
            onChange={value => {
              setAllowUserSignup(value)
            }}
          />
        </div>
        <ButtonRound className="absolute right-0 disabled:opacity-50" {...{disabled: !isValid}} onClick={() => alert("Submit")}>
          Save
        </ButtonRound>
      </div>
    </main>
  )
}

export default Settings
