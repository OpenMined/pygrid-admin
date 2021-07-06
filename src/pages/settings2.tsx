import {useQuery} from 'react-query'
import {getLayout} from '@/layouts/blank'
import {Page, SpinnerWithText} from '@/components'
import {SettingsList} from '@/components/pages/settings'
import {useSettings} from '@/lib/data/useMe'
import {cacheKeys} from '@/utils'
import type {Settings} from '@/types/grid-types'

export default function SettingsE() {
  const {all} = useSettings()
  const {data: settings} = all()

  return (
    <Page
      title="Domain Settings"
      description={`Set structural and usage configurations for ${settings?.domainName ?? '...'}`}>
      <section className="max-w-lg lg:max-w-3xl space-y-2">
        <h3 className="font-medium">Configurations</h3>
        <p>This section is still under construction.</p>
      </section>
      {/* TODO: uncomment this when /setup is fixed
      <section className="flex justify-between space-x-6">
        {settings ? <SettingsList settings={settings} /> : <SpinnerWithText>Loading Domain settings</SpinnerWithText>}
      </section>
      */}
    </Page>
  )
}

SettingsE.getLayout = getLayout
