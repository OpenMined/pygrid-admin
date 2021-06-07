import {useRouter} from 'next/router'
import {Tabs, TabList, Tab, TabPanels, TabPanel} from '@reach/tabs'
import {useMutate} from '@/utils/query-builder'
import {Tag, ButtonGhost} from '@/components/lib'
import {PyGridDataset} from '@/types'
import {Notification} from '@/components/notifications'
import {Ban} from '@/components/icons/marks'
import {Spinner} from '@/components/icons/spinner'
import {useQuery} from 'react-query'

function Dataset() {
  const router = useRouter()
  const datasetId = router.query?.id

  const {data: dataset} = useQuery<PyGridDataset>(`/data-centric/datasets/${datasetId}`)

  const {id, description, tags, manifest, data} = dataset ?? {}
  const deleteDataset = useMutate({
    url: `/data-centric/datasets/${dataset?.id}`,
    method: 'delete',
    invalidate: '/data-centric/datasets'
  })

  const remove = () => {
    deleteDataset.mutate(null, {onSuccess: () => router.push('/datasets/')})
  }

  return (
    <main className="space-y-8">
      <div className="space-y-6">
        <div className="flex flex-col-reverse items-start justify-between space-y-4 space-y-reverse md:flex-row md:space-y-0">
          <h1 className="pr-4 text-4xl leading-12">{id}</h1>
          <div className="flex flex-row space-x-2">
            <button className="btn" onClick={() => alert('Edit dataset')}>
              Edit dataset
            </button>
            <button
              type="button"
              className="mt-4 font-normal text-red-600 bg-white shadow-none lg:mt-0 btn transition-all ease-in-out duration-700 hover:bg-red-400 hover:text-white active:bg-red-700"
              disabled={deleteDataset.isLoading}
              onClick={remove}>
              {deleteDataset.isLoading ? <Spinner className="w-4 text-white" /> : 'Delete dataset'}
            </button>
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
      {deleteDataset.isSuccess && (
        <Notification title="Successfully removed!" Icon={<Ban className="text-red-700 w-5" />}>
          <p>User successfully delete</p>
        </Notification>
      )}
    </main>
  )
}

export default Dataset
