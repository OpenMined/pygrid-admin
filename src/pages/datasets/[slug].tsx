import {useFetch} from '@/utils/query-builder'
import {Tag, ButtonGhost} from '@/components/lib'
import {Tabs, TabList, Tab, TabPanels, TabPanel} from '@reach/tabs'

function Dataset({slug = '064552b5-13bd-4ad7-b521-9f79e3e92ba3'}: {slug?: string}) {
  const {isLoading, data: dataset, error} = useFetch(`/data-centric/datasets/${slug}`)
  const {id, description, tags, manifest, data} = dataset ?? {}

  return (
    <main className="space-y-8">
      <div className="space-y-6">
        <div className="flex flex-col-reverse items-start justify-between space-y-4 space-y-reverse md:flex-row md:space-y-0">
          <h1 className="pr-4 text-4xl leading-12">{id}</h1>
          <div className="flex flex-row space-x-2">
            <button className="btn" onClick={() => alert('Edit dataset')}>
              Edit dataset
            </button>
            <ButtonGhost className="text-sm" onClick={() => alert('Delete dataset')}>
              Delete dataset
            </ButtonGhost>
          </div>
        </div>
        <p className="text-gray-500 lg:max-w-3xl whitespace-pre-line">{description}</p>
        <div className="flex flex-row">
          {tags?.map(tag => (
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
            <Tab className="px-2 focus:outline-none">Manifest</Tab>
            <Tab className="px-2 focus:outline-none">Data</Tab>
          </TabList>
          <hr />
          <TabPanels>
            <TabPanel>
              <section className="flex flex-col mt-4 space-y-1">
                <p className="text-gray-400 whitespace-pre-line">{manifest}</p>
              </section>
            </TabPanel>
            <TabPanel>
              <section className="flex flex-col space-y-4 divide-y-2">
                {data &&
                  data
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map(({name, id: dataId, dtype, shape}) => (
                      <div key={dataId} className="flex flex-col pt-4 text-sm text-gray-400">
                        <div>
                          Syft id: <span className="text-base text-gray-600">{dataId}</span>
                        </div>
                        <div>
                          File: <span className="text-base text-gray-600">{name}</span>
                        </div>
                        <div>
                          Shape: <span className="text-base text-gray-600">{shape}</span>
                        </div>
                        <div>
                          Type: <span className="text-base text-gray-600">{dtype}</span>
                        </div>
                      </div>
                    ))}
              </section>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </main>
  )
}

export default Dataset
