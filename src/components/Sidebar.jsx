import React from 'react';
import {NavLink, Navigate} from 'react-router-dom';

import { links } from '../data/dummy';
import { useStateContext } from '../context/ContextProvider';
import {BiLogOut, BiMenuAltLeft} from "react-icons/bi";
import {FaUser} from "react-icons/fa";
import {useAuthContext} from "../context/AuthProvider";

const Sidebar = () => {

    const {
        activeMenu,
        setActiveMenu,
        screenSize,
        userInfo,
        setUserInfo
    } = useStateContext();

    const auth = useAuthContext();

    const handleCLoseSlideBar = () => {
        setActiveMenu(false)
    }



    const activeLink = "text-gray-800 bg-blue-100 drop-shadow-md";
    const normalLink = "text-gray-400 dark:text-gray-200"

    if (screenSize > 900)
        return (
            <div className='ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10'>
                <div className='mt-10 bg-white border drop-shadow-xl p-3 flex justify-between items-center mx-5 px-5 rounded-[15px]'>
                    <div className="bg-blue-500 p-4 rounded-full">
                        <FaUser color="#fff" size={24} />
                    </div>
                    <div className="text-center flex-1">
                        <div>{userInfo.name}</div>
                        <div>{userInfo?.formation?.abv +" "+ userInfo.year} / {userInfo?.option?.abv}</div>
                    </div>
                </div>
                <div className='mt-20'>
                    {links.map((link) => (
                        <div className="mx-2 mb-2"
                             key={link.name}>
                            <NavLink to={`/${link.name}`}
                                     className={( {isActive} ) =>
                                         isActive
                                             ? activeLink +" flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md"
                                             : normalLink +" flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md"
                                     }>
                                {link.icon}
                                <span className='capitalize'>{link.name}</span>
                            </NavLink>
                        </div>
                    ))}
                </div>
                <NavLink to='/connexion'
                         onClick={() => {
                             localStorage.clear();
                             auth.logout(null);
                         }}
                         className="cursor-pointer absolute bottom-10 left-5 border text-green-500 bg-white p-3 rounded-full drop-shadow-xl">
                    <BiLogOut  size={30} />
                </NavLink>
            </div>
        )
    else
        return (
            <div className="fixed top-4 left-6 z-50">
                <div onClick={() => setActiveMenu((m) => (!m))}
                     className="border-1 drop-shadow-xl cursor-pointer text-cyan-800 w-14 h-14 flex items-center justify-center bg-blue-300 rounded-full">
                    <BiMenuAltLeft size={35} />
                </div>
                { activeMenu ? (
                    <div className="mt-1 bg-white border-1  drop-shadow-xl rounded-full">
                        {links.map((link) => (
                            <div className=" m-0"
                                 key={link.name}>
                                <NavLink to={`/${link.name}`}
                                         onClick={handleCLoseSlideBar}
                                         className={( {isActive} ) =>
                                             isActive
                                                 ? activeLink + " flex items-center p-3 rounded-full"
                                                 : normalLink + " flex items-center p-3 rounded-full"
                                         }>
                                    {link.icon}
                                </NavLink>
                            </div>
                        ))}
                        <NavLink to='/connexion'
                                 onClick={() => {
                                     localStorage.clear();
                                     setUserInfo(null)
                                     auth.logout(null);
                                 }}
                                 className=" mt-1 cursor-pointer absolute border text-green-500 bg-white p-3 rounded-full drop-shadow-xl">
                            <BiLogOut  size={30} />
                        </NavLink>
                    </div>
                ) : (<> </>)}
            </div>
        )

}

export default Sidebar;