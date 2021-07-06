import {Fragment, createContext, useContext, useCallback, useState} from 'react'
import Link from 'next/link'
import {useRouter} from 'next/router'
import cn from 'classnames'
import {Dialog, Transition} from '@headlessui/react'
import {MenuIcon, XIcon} from '@heroicons/react/solid'
import {DomainConnectionStatus} from '@/components'
import {useMe, useRequests, useDomainStatus} from '@/lib/data/useMe'
import {useAuth} from '@/context/auth-context'

const navigation = [
  {name: 'Datasets', href: '/datasets3', current: false},
  {name: 'Models', href: '/models', current: false},
  {name: 'Requests', href: '/requests', current: false},
  {name: 'Tensors', href: '/tensors', current: false},
  {name: 'Users', href: '/users2', current: false},
  {name: 'Roles & Permissions', href: '/permissions', current: false},
  {name: 'Dashboard', href: '/dashboard', current: false},
  // {name: 'Infrastructure', href: '#', current: false}, // TODO: Check support
  {name: 'Settings', href: '/settings2', current: false}
]

const SidebarContext = createContext(null)

function MobileSidebarMenuContent() {
  return (
    <div className="relative flex-1 flex flex-col w-full bg-gray-100 text-gray-800">
      <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
        <Link href="/">
          <a>
            <NodeInfo />
          </a>
        </Link>
        <DomainConnectionStatus />
        <Navigation />
      </div>
      <LogoutBox />
    </div>
  )
}

function MobileSidebarDisplay() {
  const {open} = useContext(SidebarContext)
  return (
    <div className="cursor-pointer border bg-blueGray-50 w-full flex items-center justify-between md:hidden h-20">
      <Link href="/">
        <a>
          <NodeInfo />
        </a>
      </Link>
      <button onClick={() => open(true)}>
        <p className="sr-only">Press to open the navigation menu</p>
        <MenuIcon className="w-8 h-8 mx-4" role="presentation" />
      </button>
    </div>
  )
}

function MobileSidebar() {
  const {isOpen, open} = useContext(SidebarContext)

  return (
    <>
      <MobileSidebarDisplay />
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
            <MobileSidebarMenuContent />
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
    </>
  )
}

function DesktopSidebar() {
  return (
    <aside className="hidden md:flex sticky h-screen top-0 border border-gray-200">
      <div className="h-full bg-blueGray-100 text-gray-800 flex flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col h-0 flex-1">
            <SidebarContent />
          </div>
        </div>
      </div>
    </aside>
  )
}

function NodeInfo() {
  const {data} = useDomainStatus()
  const domainName = data?.nodeName

  return (
    <div className="flex items-center flex-shrink-0 px-4">
      <img className="h-16 w-auto" src="/assets/logo.png" alt="PyGrid Domain" />
      <span className="text-xl">{domainName}</span>
    </div>
  )
}

function LogoutBox() {
  const router = useRouter()
  const {logout} = useAuth()
  const {data: me} = useMe()

  const doLogout = useCallback(() => {
    logout()
    router.push('/login')
  }, [logout, router])

  return (
    <button onClick={doLogout}>
      <div className="flex-shrink-0 flex group border-t border-gray-200 p-4">
        <div className="flex-shrink-0 w-full cursor-pointer block">
          <div className="flex items-center">
            <div className="text-left font-regular">
              <p className="text-sm text-gray-500 transition-colors">{me?.email}</p>
              <p className="text-xs group-hover:text-blue-500">Log out</p>
            </div>
          </div>
        </div>
      </div>
    </button>
  )
}

function Navigation() {
  const {current} = useContext(SidebarContext)
  const {all} = useRequests()
  const {data: requests} = all()
  const totalRequests = requests?.filter(request => request.status === 'pending').length ?? null

  return (
    <nav className="mt-5 px-2 space-y-1">
      {navigation.map(item => (
        <Link href={item.href} key={item.href}>
          <a
            className={cn(
              item.href === current
                ? 'bg-cyan-500 text-white'
                : 'text-gray-800 hover:text-white hover:bg-sky-600 hover:bg-opacity-75 active:bg-opacity-100',
              'group flex items-center px-2 py-2 text-sm font-regular rounded-sm'
            )}>
            {item.name} {item.href === '/requests' && totalRequests > 0 && `(${totalRequests})`}
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
        <Link href="/">
          <a>
            <NodeInfo />
          </a>
        </Link>
        <Navigation />
      </div>
      <DomainConnectionStatus />
      <LogoutBox />
    </>
  )
}

export function Sidebar() {
  const [isOpen, open] = useState(false)
  const router = useRouter()
  return (
    <SidebarContext.Provider value={{isOpen, open, current: router.route}}>
      <MobileSidebar />
      <DesktopSidebar />
    </SidebarContext.Provider>
  )
}
