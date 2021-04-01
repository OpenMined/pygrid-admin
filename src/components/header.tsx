import Link from 'next/link'
import {useRouter} from 'next/router'
import {Left} from '@/components/icons/arrows'
import type {FunctionComponent} from 'react'

const Header: FunctionComponent = () => {
  const router = useRouter()

  console.log(router)

  let links

  if (router.pathname.startsWith('/users')) {
    links = [
      {name: 'Users', link: '/users'},
      {name: 'Groups', link: '/users/groups'},
      {name: 'Roles', link: '/users/roles'}
    ]
  } else if (router.pathname.startsWith('/datasets')) {
    links = [
      {name: 'Datasets', link: '/datasets'},
      {name: 'Requests', link: '/datasets/requests'},
      {name: 'Tensors', link: '/datasets/tensors'}
    ]
  } else {
    links = [
      {name: 'Datasets', link: '/datasets'},
      {name: 'Users', link: '/users'},
      {name: 'Infrastructure', link: '/infrastructure'},
      {name: 'Settings', link: '/settings'}
    ]
  }

  return (
    <nav className="sticky top-0">
      <div className="flex flex-row flex-wrap items-center justify-between px-3 shadow bg-gray-50">
        <div className="container mx-auto flex flex-row items-center">
          <Link href="/" passHref>
            <img className="cursor-pointer" src="/assets/logo.png" alt="PyGrid home" width={50} height={50} />
          </Link>
          <div className="ml-6 space-x-4">
            {router.pathname !== '/' && (
              <Link href="/">
                <a aria-label="Return to main page">
                  <Left className="w-4 cursor-pointer" />
                </a>
              </Link>
            )}
            {links.map(({name, link}: {name: string; link: string}) =>
              router.pathname === link ? (
                <span key={`${router.pathname}/${link}`} className="text-sm font-medium text-blue-500 cursor-default">
                  {name}
                </span>
              ) : (
                <Link href={link} key={`${router.pathname}/${link}`}>
                  <a className="text-sm text-gray-600 hover:text-gray-400 active:text-gray-800">{name}</a>
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export {Header}
