import type {FunctionComponent} from 'react'
import Image from 'next/image'

import {default as NextLink} from 'next/link'

import {useRouter} from 'next/router'

import { faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Header: FunctionComponent = () => {

  var routes = ['datasets','models','users','finances','infrastructure','settings'];

  const router = useRouter();

  const list = []

  const mystyle = {
    marginLeft:"30px",
    position:"relative",
    bottom:"15px"
  };

  const arrowStyle = {
    position:"relative",
    marginLeft:"10px",
    bottom:"13px"
  }

  function myFunc()
  {
    var curr_route = router.pathname;
    var curr_path = curr_route.substring(1);

    if(curr_path=='dashboard')
    {
      routes = ['datasets','models','users','finances','infrastructure','settings'];
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
        list.push(<NextLink href={'/'+route} passHref><span className="cursor-pointer" style={mystyle}>{route_name}</span></NextLink>);
      }
      else
      {
        var route_name = route.charAt(0).toUpperCase() + route.slice(1)
        list.push(<NextLink href={curr_route+'/'+route} passHref><span className="cursor-pointer" style={mystyle}>{route_name}</span></NextLink>);
      }
      
    })

    return list;
  }

  return (
    <nav className="sticky top-0">
      <div className="flex flex-row flex-wrap items-center justify-between px-3 shadow bg-gray-50">
        <div className="container mx-auto">
          <NextLink href="/" passHref>
            <Image className="cursor-pointer" src="/assets/logo.png" alt="PyGrid home" width={50} height={50}/>
          </NextLink>

          <NextLink href="/" passHref >
              <FontAwesomeIcon className="cursor-pointer align-baseline" icon={faCaretLeft} color="gray.400" style={arrowStyle}/>
          </NextLink>

          {myFunc()}

          

        </div>
      </div>
    </nav>
  )
}

export default Header
