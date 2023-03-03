import React, { useState, useContext, useEffect } from 'react'
import { MdClose, MdMenu, MdAdd, MdOutlineLogout, MdOutlineQuestionAnswer, MdOutlineCoffee } from 'react-icons/md'
import { ChatContext } from '../context/chatContext'
import bot from '../assets/favicon.ico'
import DarkMode from './DarkMode'
import { auth } from '../firebase'

/**
 * A sidebar component that displays a list of nav items and a toggle 
 * for switching between light and dark modes.
 * 
 * @param {Object} props - The properties for the component.
 */
const SideBar = () => {
  const [open, setOpen] = useState(true)
  const [, , clearMessages, limit, setLimit] = useContext(ChatContext)

  function handleResize() {
    window.innerWidth <= 640 ? setOpen(false) : setOpen(true)
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const clearChat = () => clearMessages()
  const SignOut = () => {
    if (auth.currentUser) {
      auth.signOut()
      clearChat()
      setLimit(-1)
      window.sessionStorage.clear()
    }
  }

  return (
    <section className={` ${open ? "w-72" : "w-16"} sidebar`}>
      <div className="sidebar__app-bar">
        <div className={`sidebar__app-logo ${!open && "scale-0 hidden"} `}>
          <span className='w-8 h-8'><img src={bot} className="w-[40px]" alt="" /></span>
        </div>
        <h1 className={`sidebar__app-title ${!open && "scale-0 hidden"}`}>
          ChatBlock.ai
        </h1>
        <div className='sidebar__btn-close' onClick={() => setOpen(!open)}>
          {open ? <img src="/images/close-btn.png" className="w-[20px]"/> : <MdMenu className='sidebar__btn-icon' />}

        </div>
      </div>
      <div className="nav">
        <span className='nav__item  bg-light-white' onClick={clearChat}>
          <div className='nav__icons'>
            <MdAdd />
          </div>
          <h1 className={`${!open && "hidden"}`}>New chat</h1>
        </span>
      </div>
      <div className="nav__bottom">
      <div className="nav">
          <span className="nav__item">
            <div className="nav__icons">
              <img src="/images/social-media.png" className="w-[20px]" />
            </div>
            <h1 className={`font-vt ${!open && "hidden"}`}>Social Media</h1>
          </span>
        </div>
        <div className="nav">
          <span className="nav__item">
            <div className="nav__icons">
              <img src="/images/deposit.png" className="w-[20px]" />
            </div>
            <h1 className={`font-vt ${!open && "hidden"}`}>Deposit/Withdrawl</h1>
          </span>
        </div>
        <div className="nav">
          <span className="nav__item">
            <div className="nav__icons">
              {/* <MdOutlineLogout /> */}
              <img src="/images/buy-token.png" className="w-[20px]" />
            </div>
            <h1 className={`font-vt ${!open && "hidden"}`}>Buy Token</h1>
          </span>
        </div>
        <DarkMode open={open} />
        <div className="nav">
          <a href='https://github.com/EyuCoder/chatgpt-clone' className="nav__item">
            <div className="nav__icons">
              <img src="/images/docs.png" className="w-[25px]" />
            </div>
            <h1 className={`font-vt ${!open && "hidden"}`}>Docs</h1>
          </a>
        </div>
        <div className="nav">
          <span className="nav__item" onClick={SignOut}>
            <div className="nav__icons">
              <img src="/images/logout.png" className="w-[25px]" />
            </div>
            <h1 className={`font-vt ${!open && "hidden"}`}>Log out</h1>
          </span>
        </div>
      </div>
    </section >
  )
}

export default SideBar