import {Input} from '@/components/forms/input'
import {Toggle} from '@/components/forms/toggle'
import {ButtonRound} from '@/components/lib'
import React, {FunctionComponent, useEffect, useState} from 'react'
import {fetchSettings, updateSettings} from '../api/settings'

const Settings: FunctionComponent = () => {
  const [settingsData, setSettingsData] = useState(null)

  const isValid = true

  useEffect(() => {
    fetchSettings().then(data => {
      setSettingsData(data)
    })
  }, [])

  const submit = () => {
    updateSettings(settingsData)
  }

  if (settingsData != null) {
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
              value={settingsData.nodeName}
              required={true}
              label="Domain Name"
              placeholder="My Domain"
              hint="Set your domain name"
              onChange={value => {
                setSettingsData({...settingsData, nodeName: value})
              }}
            />
            <Input
              value={settingsData.awsCredentials}
              required={true}
              label="Cloud Provider API Credentials"
              placeholder="nilcwjicwiweije90391nmos"
              hint="Set your cloud provider access keys"
              onChange={value => {
                setSettingsData({...settingsData, awsCredentials: value})
              }}
            />
            <Input
              value={settingsData.cacheStrategy}
              required={true}
              label="Cache Strategy"
              placeholder="nilcwjicwiweije90391nmos"
              hint="Configure the domain's cache strategy"
              onChange={value => {
                setSettingsData({...settingsData, cacheStrategy: value})
              }}
            />
          </div>
          <div>
            <h3 className="text-2xl text-gray-800">Advanced Settings</h3>
            <hr className="mt-3" />
          </div>
          <Input
            value={settingsData.tensorExpirationPolicy}
            required={true}
            label="Tensor Expiration Policy"
            placeholder="nilcwjicwiweije90391nmos"
            hint="Set your tensor expiration policy in days"
            onChange={value => {
              setSettingsData({...settingsData, tensorExpirationPolicy: value})
            }}
          />
          <div className="grid grid-flow-row md:grid-rows-1 md:grid-cols-3 md:grid-flow-col gap-4">
            <Toggle
              value={settingsData.replicateDb}
              label="Replicate Database"
              hint="Set whether you want to replicate db"
              onChange={value => {
                setSettingsData({...settingsData, replicateDb: value})
              }}
            />
            <Toggle
              value={settingsData.autoScale}
              label="Infraestructure Auto Scale"
              hint="Allow infraestructure auto scaling"
              onChange={value => {
                setSettingsData({...settingsData, autoScale: value})
              }}
            />
            <Toggle
              value={settingsData.allowUserSignup}
              label="Allow User Signup"
              hint="Allow users to signup in your domain"
              onChange={value => {
                setSettingsData({...settingsData, allowUserSignup: value})
              }}
            />
          </div>
          <ButtonRound
            className="absolute right-0 disabled:opacity-50"
            {...{disabled: !isValid}}
            onClick={() => submit()}>
            Save
          </ButtonRound>
        </div>
      </main>
    )
  } else {
    return null
  }
}

export default Settings
