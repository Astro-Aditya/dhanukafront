import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket, faHome, faTicket } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'
import { logout } from '../redux/actions/auth'
import { useNavigate } from 'react-router-dom'

import { useDispatch, useSelector} from 'react-redux'


import '../styles/Sidebar.css'

function Sidebar(props) {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    let user = useSelector(state => state.auth.user)

    let menuItem

    if(user.designation !== "Admin"){
        menuItem=[
            {
                path:"/dashboard",
                name:"Home",
                icon:<FontAwesomeIcon icon={faHome} size="lg" />
            },
        ]
    } else {
        menuItem=[
            {
                path:"/dashboard",
                name:"Home",
                icon:<FontAwesomeIcon icon={faHome} size="lg" />
            },
            {
                path:"/tickets",
                name:"Tickets",
                icon:<FontAwesomeIcon icon={faTicket} size="lg" />
            },
        ]
    }

    let SidebarList
    if(props.class === 'sidebarMain open'){
        SidebarList = menuItem.map((item, index)=>(
            <NavLink to={item.path} key={index} className="link" activeclassName="active">
                <div className='itemContainer'>
                    <div className="icon">{item.icon}</div>
                    <div className="link_text">{item.name}</div>
                </div>
            </NavLink>
            
        ))
    }
    

    const logUserOut = () => {
        dispatch(logout())
        navigate("/")
    }

  return (
    <div className={props.class}>            
        {SidebarList}

        {props.class === 'sidebarMain open' &&
            
        <div onClick={logUserOut} className='itemContainer'>
            <div className="icon"><FontAwesomeIcon icon={faArrowRightFromBracket} size="lg" /></div>
            <div className="link_text">Logout</div>
        </div>
        }
    </div>
  )
}

export default Sidebar