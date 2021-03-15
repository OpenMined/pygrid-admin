import type {FunctionComponent} from 'react'
import {TensorsCard} from '@/components/pages/datasets/cards/tensors'
import {ArrowForward} from '@/components/icons/arrows'
import {useQuery} from 'react-query'
import {ITensor} from '@/types/datasets'
import {deleteTensor, fetchTensors} from '@/pages/api/datasets'

const Tensors: FunctionComponent = () => {
  const {isLoading, data: tensorsData, error} = useQuery<ITensor[], Error>('tensors', fetchTensors)

  const permissionsChangesRequests = 2

  const tensors = [
    {
      userAvatarURL: 'https://ca.slack-edge.com/T6963A864-U6AN4BFML-gbd6d31952f3-512',
      userName: 'Andrew Trask',
      userId: '129031293',
      tensorInformation: {
        downloadedAt: '22 days',
        tensors: ['data', 'target'],
        dataset: 'Diabetes Study 01.289.301',
        epsilonUsed: 20.1
      }
    },
    {
      userAvatarURL: 'https://ca.slack-edge.com/T6963A864-U6966R9BJ-gdec6e06f19e-512',
      userName: 'Patrick Cason',
      userId: 19239123,
      tensorInformation: {
        downloadedAt: '8 days',
        tensors: ['training_data'],
        dataset: 'Diabetes Study 01.289.301',
        epsilonUsed: 20.1
      }
    },
    {
      userAvatarURL: 'https://ca.slack-edge.com/T6963A864-UP9PYUFJT-614414739a77-512',
      userName: 'Hericles Emanuel',
      userId: 'asdasd19212312392',
      tensorInformation: {
        downloadedAt: '13 days',
        tensors: ['data', 'target'],
        dataset: 'Diabetes Study 01.289.301',
        epsilonUsed: 20.1
      }
    }
  ]

  // TODO: Make settings available through context
  const settings = {
    tensorsExpiry: '30 days'
  }

  const fakeProps = {
    userAvatarURL: 'https://ca.slack-edge.com/T6963A864-UP9PYUFJT-614414739a77-512',
    userName: 'Hericles Emanuel',
    userId: 'asdasd19212312392',
    downloadedAt: '22 days'
  }

  return (
    <main className="space-y-8">
      <div>
        <h1 className="text-4xl text-gray-800">Tensors</h1>
        <p className="mt-4 text-xl font-light text-gray-400">View all tensors resulting from your private data</p>
      </div>
      <section>
        <small className="font-semibold tracking-wide text-gray-800 uppercase">Retrieve permissions changes</small>
        <div className="mt-2">
          <a href="/datasets/requests">
            <span className="text-xl font-semibold text-gray-800">{permissionsChangesRequests}</span>{' '}
            <span className="text-gray-400">requests</span> <ArrowForward className="w-4 h-4 text-blue-600" />
          </a>
        </div>
      </section>
      <p className="font-thin text-gray-400">
        According to{' '}
        <a href="/settings" target="blank">
          your settings
        </a>
        , tensors are automatically deleted <strong>{settings.tensorsExpiry}</strong> after being downloaded.
      </p>
      <section className="grid grid-cols-1 gap-4 xl:gap-4">
        <div className="space-y-6 xl:space-y-8">
          {!isLoading &&
            !error &&
            tensorsData.map(tensor => (
              <TensorsCard
                {...tensor}
                {...fakeProps}
                key={`tensor-${tensor.id}`}
                onDelete={() => deleteTensor(tensor.id).then(msg => alert(msg))}
              />
            ))}
        </div>
      </section>
    </main>
  )
}

export default Tensors
