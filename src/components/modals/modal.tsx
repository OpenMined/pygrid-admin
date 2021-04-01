import {FunctionComponent} from 'react'
import {Dialog} from '@reach/dialog'
import '@reach/dialog/styles.css'

interface IModalProps {
  isOpen: boolean
  onClose: () => void
  header: string
  footer: React.ReactNode
}

const Modal: FunctionComponent<IModalProps> = ({isOpen, onClose, children, header, footer}) => (
  <Dialog
    isOpen={isOpen}
    onDismiss={onClose}
    className="relative w-auto my-6 mx-auto max-w-md border-b border-solid border-gray-300 rounded-t shadow-lg">
    <div className="flex items-start justify-between">
      <h3 className="text-3xl font-semibold">{header}</h3>
      <button
        className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
        onClick={onClose}>
        <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">×</span>
      </button>
    </div>
    <div>{children}</div>
    <div className="flex items-center justify-end pt-6 border-t border-solid border-gray-300 rounded-b">{footer}</div>
  </Dialog>
)

export {Modal}
