import type {FunctionComponent} from 'react'
import React from 'react'
import {Close} from 'components/icons/close'
import {Bars} from 'components/icons/bars'

const Hamburger: FunctionComponent = ({open}) => {

    return (
        <div className="flex md:hidden float-right pt-3">
        <button id="hamburger">
            <Bars className={`toggle ${open ? 'hidden' : ''}`}/>
            <Close className={`toggle ${open ? '' : 'hidden'}`}/>
          </button>
        </div>
    )
}

export default Hamburger