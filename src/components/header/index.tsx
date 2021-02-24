import type {FunctionComponent} from 'react'
import Image from 'next/image'

import {default as NextLink} from 'next/link'

import {useRouter} from 'next/router'

import { faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Header: FunctionComponent = () => {

  var routes = ['datasets','models','users','infrastructure','finances','settings'];

  const router = useRouter();

  const list = []

  function myFunc()
  {
    var curr_route = router.pathname;
    var curr_path = curr_route.substring(1);

    if(curr_path=='dashboard')
    {
      routes = ['datasets','models','users','infrastructure','finances','settings'];
    }

    else if(curr_path=='datasets')
    {
      routes = ['requests', 'tensors'];
    }

    else if(curr_path=='users')
    {
      routes = ['groups', 'roles'];
    }

    else if(curr_path=='infrastructure')
    {
      routes = ['nodes', 'workers'];
    }

    else if(curr_path=='settings')
    {
      routes = ['infrastructure', 'associations','monetization','binding'];
    }

    else
    {
      routes = [];
    }

    routes.forEach((route) => {
      if(curr_path === 'dashboard')
      {
        var route_name = route.charAt(0).toUpperCase() + route.slice(1);
        list.push(<NextLink href={'/'+route} passHref><span className="cursor-pointer block md:inline-block text-black-900 hover:text-black-600 px-3 py-3 border-b-2 border-black-900 md:border-none">{route_name}</span></NextLink>);
      }
      else
      {
        var route_name = route.charAt(0).toUpperCase() + route.slice(1)
        list.push(<NextLink href={curr_route+'/'+route} passHref><span className="cursor-pointer block md:inline-block text-black-900 hover:text-black-600 px-3 py-3 border-b-2 border-black-900 md:border-none">{route_name}</span></NextLink>);
      }
      
    })

    if(process.browser){
        document.getElementById("hamburger").onclick = function toggleMenu() {
          const navToggle = document.getElementsByClassName("toggle");
          for (let i = 0; i < navToggle.length; i++) {
            navToggle.item(i).classList.toggle("hidden");
          }
        };
    }

    return list;
  }

  return (

    

    <nav className="sticky top-0">
      <div className="flex flex-row flex-wrap items-center justify-between px-3 shadow bg-gray-50">
        <div className="container w-full md:w-auto md:flex flex-row">
          <NextLink href="/" passHref >
            <Image className="cursor-pointer block md:inline-block px-3 py-3 mt-5 border-b-2 md:border-none" src="/assets/logo.png" alt="PyGrid home" width={50} height={50}/>
          </NextLink>

          {/* <NextLink href="/" passHref >
              <FontAwesomeIcon className="cursor-pointer" icon={faCaretLeft} color="gray.400"/>
          </NextLink> */}

          <div className="flex md:hidden float-right pt-3">
          <button id="hamburger">
            <img className="toggle block" src="https://img.icons8.com/fluent-systems-regular/2x/menu-squared-2.png" width={30} height={30} />
            <img className="toggle hidden" src="https://img.icons8.com/fluent-systems-regular/2x/close-window.png" width={30} height={30} />
          </button>
        </div>      
        <div className="toggle hidden w-full md:w-auto md:flex text-right text-bold mt-5 md:mt-0 border-t-2 border-blue-900 md:border-none"> 

          {myFunc()}

          </div>

        </div>
      </div>
    </nav>
  )
}

export default Header
