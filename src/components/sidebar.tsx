import {Fragment, createContext, useContext, useState} from 'react'
import Link from 'next/link'
import cn from 'classnames'
import {useQuery} from 'react-query'
import {Dialog, Transition} from '@headlessui/react'
import api from '@/utils/api-axios'
import {MenuIcon, XIcon} from '@heroicons/react/solid'

const navigation = [
  {name: 'Datasets', href: '#', current: false},
  {name: 'Models', href: '#', current: false},
  {name: 'Requests', href: '#', current: false},
  {name: 'Tensors', href: '#', current: false},
  {name: 'Users', href: '#', current: false},
  {name: 'Infrastructure', href: '#', current: false},
  {name: 'Settings', href: '#', current: false}
]

const SidebarContext = createContext(null)

export function useSidebar() {
  return useContext(SidebarContext)
}

function MobileSidebar() {
  const {isOpen, open} = useContext(SidebarContext)

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" static className="fixed inset-0 flex z-40 md:hidden" open={isOpen} onClose={open}>
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <Dialog.Overlay className="fixed w-full inset-0 bg-gray-600 bg-opacity-90" />
        </Transition.Child>
        <div className="flex-shrink-0 w-14" aria-hidden="true" />
        <Transition.Child
          as={Fragment}
          enter="transition ease-in-out duration-300 transform"
          enterFrom="translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="translate-x-full">
          <div className="relative flex-1 flex flex-col w-full bg-gray-100 text-gray-800">
            <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
              <NodeInfo />
              <Navigation />
            </div>
            <LogoutBox />
          </div>
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <div className="absolute top-0 left-0 -mr-12 pt-2">
            <button
              className="mr-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => open(false)}>
              <span className="sr-only">Close menu</span>
              <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
            </button>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  )
}

function DesktopSidebar() {
  return (
    <aside className="sticky h-screen top-0 border border-gray-200">
      <div className="hidden h-full bg-gray-100 text-gray-800 md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col h-0 flex-1">
            <SidebarContent />
          </div>
        </div>
      </div>
    </aside>
  )
}

function useDomainStatus() {
  const {data, ...rest} = useQuery('domain:status', () => api.get('/setup/status').then(res => res.data))
  return {
    init: data?.init,
    name: data?.nodeName,
    ...rest
  }
}

function useUser() {
  const {data, ...rest} = useQuery('/users/me')
  // TODO: User types
  return {email: data?.email, role: data?.role, ...rest}
}

function NodeInfo() {
  const {name} = useDomainStatus()

  return (
    <div className="flex items-center flex-shrink-0 px-4 truncate">
      <img className="h-16 w-auto" src="/assets/logo.png" alt="PyGrid Domain" />
      <p className="text-xl">{name}</p>
    </div>
  )
}

function LogoutBox() {
  const {email} = useUser()

  return (
    <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
      <div className="flex-shrink-0 w-full group cursor-pointer block">
        <div className="flex items-center">
          <div className="font-regular">
            <p className="text-sm">{email}</p>
            <p className="text-xs group-hover:text-cyan-300">Log out</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function Navigation() {
  return (
    <nav className="mt-5 px-2 space-y-1">
      {navigation.map(item => (
        <Link href={item.href}>
          <a
            key={item.name}
            className={cn(
              item.current
                ? 'bg-cyan-500 text-white'
                : 'text-gray-800 hover:text-white hover:bg-cyan-600 hover:bg-opacity-75 active:bg-opacity-100',
              'group flex items-center px-2 py-2 text-sm font-regular rounded-sm'
            )}>
            {item.name}
          </a>
        </Link>
      ))}
    </nav>
  )
}

function SidebarContent() {
  return (
    <>
      <div className="flex-1 flex flex-col pt-2 pb-4 overflow-y-auto">
        <NodeInfo />
        <Navigation />
      </div>
      <LogoutBox />
    </>
  )
}

export function Sidebar() {
  const [isOpen, open] = useState(false)
  return (
    <SidebarContext.Provider value={{isOpen, open}}>
      <div className="border bg-gray-50 w-full flex items-center justify-between md:hidden h-20">
        <NodeInfo />
        <button onClick={() => open(true)}>
          <p className="sr-only">Press to open the navigation menu</p>
          <MenuIcon className="w-8 h-8 mx-4" role="presentation" />
        </button>
      </div>
      <MobileSidebar />
      <DesktopSidebar />
    </SidebarContext.Provider>
  )
}
