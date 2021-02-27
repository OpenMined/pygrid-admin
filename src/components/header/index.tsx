import type {FunctionComponent} from 'react'
import Image from 'next/image'
import React from 'react'
import {default as NextLink} from 'next/link'
import {useRouter} from 'next/router'
import Hamburger from 'components/menu/hamburger-menu'

const Header: FunctionComponent = () => {

  const [open, setOpen] = React.useState(false);

  const router = useRouter();
  const list = [];

  function setRoutes()
  {
    var curr_route = router.pathname;
    var curr_path = curr_route.substring(1);

    var routesList = {
      datasets : ['requests','tensors'],
      users : ['groups', 'roles'],
      infrastructure : ['nodes', 'workers'],
      settings : ['infrastructure', 'associations','monetization','binding']
    }

        var main_routes = ['datasets','models','users','infrastructure','finances','settings'];

        if(curr_path === 'dashboard')
        {
          main_routes.forEach((route) => {
            list.push(<NextLink href={'/'+route} passHref><span className="cursor-pointer block md:inline-block text-black-900 hover:text-black-600 text-transform: capitalize px-3 py-3 border-b-2 border-black-900 md:border-none">{route}</span></NextLink>);
          });
        }
        else
        {
          if(curr_path in routesList){
            routesList[curr_path].forEach((route) => {
              list.push(<NextLink href={curr_route+'/'+route} passHref><span className="cursor-pointer block md:inline-block text-black-900 hover:text-black-600 text-transform: capitalize px-3 py-3 border-b-2 border-black-900 md:border-none">{route}</span></NextLink>);
            });
          }
        }

    return list;
  }

  return (
    <nav className="sticky top-0">
      <div className="flex flex-row flex-wrap items-center justify-between px-3 shadow bg-gray-50">
        <div className="container md:flex flex-row">

          <NextLink href="/" passHref >
            <Image className="cursor-pointer" src="/assets/logo.png" alt="PyGrid home" width={50} height={50}/>
          </NextLink>

          <div className="flex md:hidden float-right pt-0" onClick={() => setOpen(!open)}>
          <Hamburger open = {open}>
          </Hamburger>
        </div>      
        <div className={`toggle  ${open ? '' : 'hidden'} w-full md:w-auto md:flex text-right text-bold mt-5 md:mt-0 border-t-2 border-blue-900 md:border-none`}> 

          {setRoutes()}

          </div>

        </div>
      </div>
    </nav>
  )
}

export default Header
