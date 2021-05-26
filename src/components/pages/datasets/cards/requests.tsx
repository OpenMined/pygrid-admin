import {Transition, Dialog} from '@headlessui/react'
import {Card} from '@/components/lib'
import {CheckMark, XMark} from '@/components/icons/marks'
import {MissingUserAvatar} from '@/components/icons/user'
import {useDisclosure} from 'react-use-disclosure'

function RequestDialog({open, onClose, request, accept, deny}) {
  return (
    <Transition
      show={open}
      enter="transition duration-100 ease-out"
      enterFrom="transform scale-95 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-75 ease-out"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-95 opacity-0">
      <Dialog open={open} static onClose={onClose} className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          <div className="z-20 max-w-md p-6 mx-auto bg-white border rounded-lg opacity-100 md:max-w-lg lg:max-w-2xl space-y-4">
            <Dialog.Title className="text-lg font-semibold text-gray-600">Permission Request</Dialog.Title>
            <Dialog.Description className="text-gray-400">
              This is a request for accessing data currently stored in this domain.
            </Dialog.Description>
            <div>
              <h3 className="font-medium text-gray-600">Requested by</h3>
              <p className="text-gray-400">{request.userName}</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-600">Object metadata</h3>
              <div className="text-gray-400">
                <p>
                  <span className="text-gray-600">id:</span> f2e43c1def6c417f9030901c79598703
                </p>
                <p>
                  <span className="text-gray-600">type:</span> {request.objectType}
                </p>
                <p>
                  <span className="text-gray-600">status:</span> {request.status}
                </p>
                <p>
                  <span className="text-gray-600">tags:</span> {request.tags?.join(', ')}
                </p>
              </div>
            </div>
            <div>
              <h3 className="font-medium text-gray-600">Request reason</h3>
              <p className="text-gray-400">{request.reason}</p>
            </div>
            <button className="sr-only">kk</button>
            <div className="hidden flex justify-end space-x-4">
              <button className="bg-green-700 hover:bg-green-500 focus:ring-green-700 btn" onClick={accept}>
                Accept
              </button>
              <button
                className="text-red-700 bg-white shadow-none hover:text-red-500 hover:bg-white active:bg-white focus:ring-red-500 btn"
                onClick={deny}>
                Reject
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export const PermissionRequestCard = ({request, dataset, accept, deny}) => {
  const {isOpen, open, close} = useDisclosure(false)

  return (
    <Card className="flex flex-row font-light space-x-2 flex-nowrap">
      <div className="w-full">
        <div className="flex flex-row items-center">
          <MissingUserAvatar className="inline w-6 h-6 mr-2 rounded-full" />
          <span>
            {/* TODO: Change to a modal view here instead of linking to the profile in full */}
            {request.userName} is requesting permission to use the following:
          </span>
        </div>
        <div className="flex flex-col my-4 text-gray-800">
          <div>
            <strong>Tensor</strong>: <span className="text-gray-500">f2e43c1def6c417f9030901c79598703</span>
          </div>
          <div>
            <strong>Dataset</strong>: <span className="text-gray-500">{dataset}</span>
          </div>
          <div>
            <strong>Status</strong>: <span className="text-gray-500">{request.status}</span>
          </div>
          <div className="pt-4">
            <button
              className="px-3 py-1 border rounded hover:bg-gray-200 hover:text-gray-700"
              aria-label="View permission request reason"
              onClick={open}>
              Permission request details
            </button>
          </div>
        </div>
      </div>
      {request?.status === 'pending' && (
        <div className="flex flex-row self-center self-end flex-shrink-0 text-gray-400 space-x-6">
          <button className="focus:outline-none focus:ring-0 active:ring-0" onClick={accept}>
            <CheckMark className="w-6 h-6 text-green-500 hover:text-green-300 active:text-green-900" />
          </button>
          <button className="focus:outline-none focus:ring-0 active:ring-0" onClick={deny}>
            <XMark className="w-6 h-6 text-red-500 hover:text-red-300 active:text-red-900" />
          </button>
        </div>
      )}
      <RequestDialog open={isOpen} onClose={close} request={request} accept={accept} deny={deny} />
    </Card>
  )
}
