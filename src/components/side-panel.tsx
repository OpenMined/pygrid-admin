import type {FunctionComponent, PropsWithChildren} from 'react'
import {Transition} from '@headlessui/react'
import {Portal} from '@reach/portal'

const SidePanel: FunctionComponent<PropsWithChildren<{isOpen: boolean; close: () => void}>> = ({
  isOpen,
  close,
  children
}) => {
  return (
    <Portal>
      <Transition show={isOpen}>
        <div className="fixed inset-0 overflow-hidden w-screen">
          <div className="absolute inset-0 overflow-hidden">
            <Transition.Child
              enter="transition ease-in-out duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition ease-in-out duration-500"
              leaveFrom="opacity-100"
              leaveTo="opacity-0">
              <div
                className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                aria-hidden="true"
                onClick={close}
              />
            </Transition.Child>
            <section
              className="absolute inset-y-0 right-0 flex w-full pl-10 max-w-112"
              aria-labelledby="slide-over-heading">
              <Transition.Child
                className="w-full"
                enter="transition transform ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition transform ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full">
                <div className="relative w-full max-w-md">
                  <Transition.Child
                    enter="transition ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0">
                    <div className="absolute top-0 left-0 flex pt-4 pr-2 -ml-8 sm:-ml-10 sm:pr-4">
                      <button
                        className="text-gray-300 rounded-md hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                        onClick={close}>
                        <span className="sr-only">Close panel</span>
                        <svg
                          className="w-6 h-6"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex flex-col h-screen py-6 overflow-y-scroll bg-white shadow-xl">{children}</div>
                </div>
              </Transition.Child>
            </section>
          </div>
        </div>
      </Transition>
    </Portal>
  )
}

export {SidePanel}
