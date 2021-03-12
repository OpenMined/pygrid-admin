import {FunctionComponent, useState} from 'react'
import {useRouter} from 'next/router'
import {useQuery} from 'react-query'

import {Tag, ButtonGhost} from '@/components/lib'
import {Tabs, TabList, Tab, TabPanels, TabPanel} from '@reach/tabs'
import {FileIcon} from '@/components/icons/file'

import {IDataset, ITensor} from '@/types/datasets'
import {fetchDataset} from '../api/datasets'
import {EditDatasetModal} from '@/components/modals/datasets/edit'
import {DeleteDatasetModal} from '@/components/modals/datasets/delete'

const Dataset: FunctionComponent = () => {
  const router = useRouter()
  const {slug} = router.query

  const [openDeleteDatasetModal, setOpenDeleteDatasetModal] = useState(false)
  const [openEditDatasetModal, setOpenEditDatasetModal] = useState(false)

  const {isLoading, data: dataset} = useQuery<IDataset, Error>(['dataset', slug], () => fetchDataset({id: slug}))

  if (isLoading || dataset === undefined) return null

  const {id, name, manifest, description, tags, tensors} = dataset

  const handleTensors = (name: string, tensor: ITensor) => (
    <Tabs key={`tensor-${name}`}>
      <TabList>
        <Tab>data</Tab>
      </TabList>
      <hr />
      <TabPanels>
        <TabPanel>
          <section className="flex flex-col mt-4 space-y-1">
            <span>
              <strong>File</strong>: <FileIcon className="h-4 text-gray-400" /> <span>{name}</span>
            </span>
            <span>
              <strong>Shape</strong>: <span className="text-gray-400">{JSON.stringify(tensor.shape)}</span>
            </span>
            <span>
              <strong>Type</strong>: <span className="text-gray-400">{tensor.dtype}</span>
            </span>
            <span>
              <strong>Schema</strong>:{' '}
              <span className="text-gray-400">
                <ul className="list-horizontal">
                  {tensor.manifest.split(',').map(el => (
                    <li key={`${el}-element`}>{el}</li>
                  ))}
                </ul>
              </span>
            </span>
          </section>
        </TabPanel>
      </TabPanels>
    </Tabs>
  )

  return (
    <main className="space-y-8">
      <div className="space-y-6">
        <div className="flex flex-col-reverse items-start justify-between space-y-4 space-y-reverse md:flex-row md:space-y-0">
          <h1 className="pr-4 text-4xl leading-12">{name}</h1>
          <div className="flex flex-row space-x-2">
            <button className="btn" onClick={() => setOpenEditDatasetModal(true)}>
              Edit dataset
            </button>
            <ButtonGhost className="text-sm" onClick={() => setOpenDeleteDatasetModal(true)}>
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
        <h2 className="text-sm font-semibold tracking-widest uppercase">Manifest</h2>
        <p>{manifest}</p>
      </div>
      <div className="space-y-4">
        <h2 className="text-sm font-semibold tracking-widest uppercase">Tensors</h2>
        {Object.entries(tensors).map(([name, tensor]) => handleTensors(name, tensor))}
      </div>
      <EditDatasetModal
        onClose={() => setOpenEditDatasetModal(false)}
        isOpen={openEditDatasetModal}
        onConfirm={() => setOpenEditDatasetModal(false)}
        dataset={dataset}
      />
      <DeleteDatasetModal
        id={id}
        onClose={() => setOpenDeleteDatasetModal(false)}
        isOpen={openDeleteDatasetModal}
        onConfirm={() => setOpenDeleteDatasetModal(false)}
      />
    </main>
  )
}

export default Dataset
