import type {FunctionComponent} from 'react'
import {Tag, ButtonGhost} from '@/components/lib'
import {Tabs, TabList, Tab, TabPanels, TabPanel} from '@reach/tabs'
import {FileIcon} from '@/components/icons/file'

const Dataset: FunctionComponent<{slug?: string}> = () => {
  const DatasetData = {
    title: 'Diabetes Study 01.289.301',
    description:
      'This was a double-blind diabetes study done in coordination with UC Santa Barbara between July 1st, 2017 and January 1st, 2019.',
    tags: ['diabetes', 'california', 'healthcare', 'UCSF', 'beekeeper'],
    tensors: 2
  }

  const {title, description, tags} = DatasetData

  return (
    <main className="space-y-8">
      <div className="space-y-6">
        <div className="flex flex-col-reverse items-start justify-between space-y-4 space-y-reverse md:flex-row md:space-y-0">
          <h1 className="pr-4 text-4xl leading-12">{title}</h1>
          <div className="flex flex-row space-x-2">
            <button className="btn" onClick={() => alert('Edit dataset')}>
              Edit dataset
            </button>
            <ButtonGhost className="text-sm" onClick={() => alert('Delete dataset')}>
              Delete dataset
            </ButtonGhost>
          </div>
        </div>
        <p className="text-gray-500 lg:max-w-3xl">{description}</p>
        <div className="flex flex-row">
          {tags.map(tag => (
            <Tag className="mr-2" key={`tag-${tag}`}>
              {tag}
            </Tag>
          ))}
        </div>
      </div>
      <div className="space-y-4">
        <h2 className="text-sm font-semibold tracking-widest uppercase">Tensors</h2>
        <Tabs>
          <TabList>
            <Tab>data</Tab>
            <Tab>target</Tab>
          </TabList>
          <hr />
          <TabPanels>
            <TabPanel>
              <section className="flex flex-col mt-4 space-y-1">
                <span>
                  <strong>File</strong>: <FileIcon className="h-4 text-gray-400" />{' '}
                  <span className="underline">diabetes_data.csv</span>
                </span>
                <span>
                  <strong>Shape</strong>: <span className="text-gray-400">[10000, 8]</span>
                </span>
                <span>
                  <strong>Type</strong>: <span className="text-gray-400">64-bit floating point</span>
                </span>
                <span>
                  <strong>Schema</strong>:{' '}
                  <span className="text-gray-400">
                    <ul className="list-horizontal">
                      <li>id</li>
                      <li>birthdate</li>
                      <li>sex</li>
                      <li>diagnosis_date</li>
                      <li>type</li>
                      <li>weight</li>
                      <li>glucose_level</li>
                      <li>medications</li>
                    </ul>
                  </span>
                </span>
                <span>
                  <strong>Entities</strong>: <span className="text-gray-400">10,000 unique entities</span>
                </span>
                <span>
                  <strong>Default Permissions</strong>: <span className="text-gray-400">search-only</span>
                </span>
                <span>
                  <strong>Permissions</strong>: <a href="/">7 users, 2 groups</a>
                </span>
              </section>
            </TabPanel>
            <TabPanel>
              <section className="flex flex-col mt-4 space-y-1">Target</section>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </main>
  )
}

export default Dataset
