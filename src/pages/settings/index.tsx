import {Input} from '@/components/forms/input'
import {Toggle} from '@/components/forms/toggle'
import {ButtonRound} from '@/components/lib'
import React, {FunctionComponent, useState} from 'react'

const Settings: FunctionComponent = () => {
  const [domainName, setDomainName] = useState('University of Essex')
  const [awsCredentials, setAwsCredentials] = useState('')
  const [gcpCredentials, setGcpCredentials] = useState('')
  const [azureCredentials, setAzureCredentials] = useState('')
  const [tensorExpirationPolicy, setTensorExpirationPolicy] = useState('0')
  const [replicateDatabase, setReplicateDatabase] = useState(true)
  const [canSave, setCanSave] = useState(false)

  return (
    <main className="space-y-4">
      <h1 className="text-4xl text-gray-800">Settings</h1>
      <p className="text-xl font-light text-gray-400 pb-8">Configure your domain</p>
      <div className="relative space-y-6">
        <div>
          <h3 className="text-2xl text-gray-800">General Domain Settings</h3>
          <hr className="mt-3" />
        </div>
        <Input
          value={domainName}
          label="Domain Name"
          placeholder="Example"
          hint="Set your domain name"
          onChange={value => {
            setDomainName(value)
          }}
        />
        <div className="grid grid-flow-row md:grid-flow-col gap-4">
          <Input
            value={awsCredentials}
            label="AWS Credentials"
            placeholder="nilcwjicwiweije90391nmos"
            hint="Set your domain name"
            onChange={value => {
              setAwsCredentials(value)
            }}
          />
          <Input
            value={gcpCredentials}
            label="GCP Credentials"
            placeholder="nilcwjicwiweije90391nmos"
            hint="Set your domain name"
            onChange={value => {
              setGcpCredentials(value)
            }}
          />
          <Input
            value={azureCredentials}
            label="Azure Credentials"
            placeholder="nilcwjicwiweije90391nmos"
            hint="Set your domain name"
            onChange={value => {
              setAzureCredentials(value)
            }}
          />
        </div>
        <div>
          <h3 className="text-2xl text-gray-800">Advanced Settings</h3>
          <hr className="mt-3" />
        </div>
        <Input
          value={tensorExpirationPolicy}
          label="Tensor Expiration Policy"
          placeholder="nilcwjicwiweije90391nmos"
          hint="Set your tensor expiration policy in days"
          onChange={value => {
            setTensorExpirationPolicy(value)
          }}
        />
        <Toggle
          value={replicateDatabase}
          label="Replicate Database"
          hint="Set whether you want to replicate db"
          onChange={value => {
            setReplicateDatabase(value)
          }}
        />
        <ButtonRound className="absolute right-0 disabled">Save</ButtonRound>
      </div>
    </main>
  )
}

export default Settings
