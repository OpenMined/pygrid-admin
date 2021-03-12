import {FunctionComponent, useEffect, useState} from 'react'
import {ButtonRound} from '@/components/lib'
import {editDataset} from '@/pages/api/datasets'
import {Modal} from '../../modal'
import {IDataset} from '@/types/datasets'

interface IEditDatasetModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  dataset: IDataset
}

const EditDatasetModal: FunctionComponent<IEditDatasetModalProps> = ({isOpen, onClose, onConfirm, dataset}) => {
  const [formObject, setFormObject] = useState({
    name: dataset.name,
    description: dataset.description,
    manifest: dataset.manifest,
    tags: dataset.tags.toString(),
    created_at: dataset.createdAt
  })

  const [tensors, setTensors] = useState([])

  useEffect(() => {
    setTensors(mapDictToTensors())
  }, [])

  const handleChange = event => {
    const {name, value} = event.target

    const newFormObject = formObject
    newFormObject[name] = value
    setFormObject(newFormObject)
  }

  const mapTensorsToDict = () => {
    const newTensors = {}
    tensors.map(tensor => (newTensors[tensor.name] = {manifest: tensor.manifest, content: tensor.content}))
    return newTensors
  }

  const mapDictToTensors = () => {
    const newTensors = []
    Object.entries(dataset.tensors).map(([name, tensor]) =>
      newTensors.push({name, manifest: tensor.manifest, content: ''})
    )
    return newTensors
  }

  const handleSubmit = () => {
    const newDataset = {
      id: dataset?.id,
      name: formObject.name,
      description: formObject.description,
      manifest: formObject.manifest,
      tags: formObject.tags.trim().split(','),
      created_at: formObject.created_at,
      tensors: {...mapTensorsToDict()}
    }

    editDataset(newDataset).then(() => onConfirm())
  }

  const appendTensors = () => {
    setTensors(prevState => [...prevState, {name: '', manifest: '', content: ''}])
  }

  const removeTensors = () => {
    const newTensors = [...tensors]
    newTensors.pop()
    setTensors(newTensors)
  }

  const toBase64 = file =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = error => reject(error)
    })

  const handleTensors = async (index, event) => {
    const {name, value, files} = event.target
    const newTensors = [...tensors]

    if (name === 'content') {
      const base64Content = await toBase64(files[0])
      newTensors[index] = {...newTensors[index], [name]: base64Content}
      setTensors(newTensors)
    } else {
      newTensors[index] = {...newTensors[index], [name]: value}
      setTensors(newTensors)
    }
  }

  const renderTensorInputs = () => {
    return tensors.map((el, i) => (
      <div key={i}>
        <div>
          <label htmlFor="tensor_name" className="text-sm block font-bold  pb-2">
            Tensor Name {i + 1}
          </label>
          <input
            type="text"
            name="name"
            id="tensor_name"
            autoComplete="off"
            className="shadow appearance-none border rounded w-full py-2 mb-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300 "
            placeholder="tensor_name"
            value={el.name}
            onChange={e => handleTensors(i, e)}
          />
        </div>
        <div>
          <label htmlFor="tensor_manifest" className="text-sm block font-bold  pb-2">
            Manifest {i + 1}
          </label>
          <input
            type="text"
            name="manifest"
            id="tensor_manifest"
            autoComplete="off"
            className="shadow appearance-none border rounded w-full py-2 mb-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300 "
            placeholder="mpg, cyl"
            value={el.manifest}
            onChange={e => handleTensors(i, e)}
          />
        </div>
        <div>
          <label htmlFor="tensor_content" className="text-sm block font-bold  pb-2">
            Content {i + 1}
          </label>
          <input
            type="file"
            name="content"
            id="tensor_content"
            autoComplete="off"
            className="shadow appearance-none border rounded w-full py-2 mb-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300 "
            placeholder="tensor_content"
            onChange={e => handleTensors(i, e)}
          />
        </div>
      </div>
    ))
  }

  const Footer = () => (
    <>
      <ButtonRound
        className="text-red-500 bg-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-3 mb-1"
        onClick={onClose}>
        Cancel
      </ButtonRound>
      <ButtonRound
        className="bg-green-500 text-white active:bg-green-600 disabled:opacity-50 font-bold uppercase text-sm px-6 py-3 shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
        onClick={handleSubmit}>
        Edit
      </ButtonRound>
    </>
  )

  return (
    <Modal isOpen={isOpen} onClose={onClose} header="Edit Dataset" footer={<Footer />}>
      <form autoComplete="off" className="m-5">
        <div>
          <label htmlFor="name" className="text-sm block font-bold  pb-2">
            Dataset Name
          </label>
          <input
            type="text"
            name="name"
            id="dataset_name"
            autoComplete="off"
            className="shadow appearance-none border rounded w-full py-2 mb-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300 "
            placeholder="Dataset"
            value={formObject.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="description" className="text-sm block font-bold  pb-2">
            Description
          </label>
          <input
            type="text"
            name="description"
            id="dataset_description"
            autoComplete="off"
            className="shadow appearance-none border rounded w-full py-2 mb-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300 "
            placeholder="Description"
            value={formObject.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="manifest" className="text-sm block font-bold  pb-2">
            Manifest
          </label>
          <input
            type="text"
            name="manifest"
            id="dataset_manifest"
            autoComplete="off"
            className="shadow appearance-none border rounded w-full py-2 mb-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300 "
            placeholder="Manifest"
            value={formObject.manifest}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="tags" className="text-sm block font-bold  pb-2">
            Tags
          </label>
          <input
            type="text"
            name="tags"
            id="dataset_tags"
            autoComplete="off"
            className="shadow appearance-none border rounded w-full py-2 mb-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300 "
            placeholder="Diabetes, Healthcare"
            value={formObject.tags}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="created_at" className="text-sm block font-bold  pb-2">
            Created At
          </label>
          <input
            type="date"
            name="created_at"
            id="dataset_created_at"
            autoComplete="off"
            className="shadow appearance-none border rounded w-full py-2 mb-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300 "
            value={formObject.created_at}
            onChange={handleChange}
          />
        </div>
        <hr />
        <span className="text-sm block font-bold mt-2">Tensors</span>
        {renderTensorInputs()}
        <div>
          <ButtonRound
            type="button"
            className="bg-blue-500 text-white active:bg-blue-600 disabled:opacity-50 font-bold uppercase text-sm px-6 py-3 shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
            onClick={appendTensors}>
            +
          </ButtonRound>
          <ButtonRound
            type="button"
            className="bg-red-500 text-white active:bg-red-600 disabled:opacity-50 font-bold uppercase text-sm px-6 py-3 shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
            onClick={removeTensors}>
            -
          </ButtonRound>
        </div>
      </form>
    </Modal>
  )
}

export {EditDatasetModal}
