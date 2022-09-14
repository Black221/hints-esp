import React, {useEffect, useState} from 'react';
import {NavLink, useNavigate} from 'react-router-dom';

import { links } from '../data/dummy';
import { useStateContext } from '../context/ContextProvider';
import {BiLogOut, BiMenuAltLeft} from "react-icons/bi";
import {FaUser} from "react-icons/fa";

const Sidebar = ({computer}) => {

    const {
        activeMenu,
        setActiveMenu,
        screenSize,
        setIsAuth,
        isAuth,
        showMenu,
        setShowMenu
    } = useStateContext();
    let navigate = useNavigate();

    const handleCLoseSlideBar = () => {
        if (activeMenu && screenSize <= 900) {
            setActiveMenu(false)
        }
    }

    useEffect(() => {
       if (!isAuth) {
           navigate("/connexion");
       }
    }, []);



    const activeLink = "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-800 bg-blue-100 drop-shadow-md";
    const normalLink = "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-400 dark:text-gray-200"

    if (computer)
        return (
            <div className='ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10'>

                { activeMenu && (<>
                    <div className='mt-10 bg-white border drop-shadow-xl p-3 flex justify-between items-center mx-5 px-5 rounded-[15px]'>
                        <div className="bg-blue-500 p-4 rounded-full">
                            <FaUser color="#fff" size={24} />
                        </div>
                        <div className="text-center flex-1">
                            <div>Username</div>
                            <div>Level / Dep</div>
                        </div>
                    </div>
                    <div className='mt-20'>
                        {links.map((link) => (
                            <div className="mx-2 mb-2">
                                <NavLink to={`/${link.name}`}
                                         key={link.name}
                                         onClick={handleCLoseSlideBar}
                                         className={( {isActive} ) =>
                                              isActive ? activeLink : normalLink
                                         }>
                                    {link.icon}
                                    <span className='capitalize'>{link.name}</span>
                                </NavLink>
                            </div>
                        ))}
                    </div>
                </>)}
                <div className="absolute bottom-10 left-5 border text-green-500 bg-white p-3 rounded-full drop-shadow-xl">
                    <BiLogOut className="cursor-pointer" size={30} onClick={() => {
                        setActiveMenu(false);
                        setIsAuth(false);
                    }} />
                </div>
            </div>
        )
    else
        return (
            <div className="fixed top-4 left-6 z-50 bg-white rounded-full drop-shadow-xl">
                <div className="text-cyan-800 w-14 h-14 flex items-center justify-center bg-blue-300 rounded-full">
                    <BiMenuAltLeft size={35} className="cursor-pointer" onClick={() => setShowMenu(!showMenu)} />
                </div>
                { showMenu ? (
                    <div className="mt-4">
                        {links.map((link) => (
                            <div className="mb-2 m-0">
                                <NavLink to={`/${link.name}`}
                                         key={link.name}
                                         onClick={handleCLoseSlideBar}
                                         className={( {isActive} ) =>
                                             isActive ? activeLink : normalLink
                                         }>
                                    {link.icon}
                                </NavLink>
                            </div>
                        ))}
                        <div className=" text-green-500 bg-white p-3 rounded-full ">
                            <BiLogOut size={30} onClick={() => {
                                setActiveMenu(false);
                                setIsAuth(false);
                            }} />
                        </div>
                    </div>
                ) : (<> </>)}
            </div>
        )
}

export default Sidebar;