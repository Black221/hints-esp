import React, { createContext, useContext, useState} from "react";

const StateContext = createContext(undefined);

const initialState = {
    chat: false,
    cart: false,
    userProfile: false,
    notification: false
}

export const ContextProvider = ({ children}) => {
    const [activeMenu, setActiveMenu] = useState(false);
    const [isClicked, setIsClicked] = useState(initialState);
    const [screenSize, setScreenSize] = useState(undefined);
    const [isAuth, setIsAuth] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    const handleClick = (clicked) => {
        setIsClicked({...initialState, [clicked]:true})
    }

    return (
        <StateContext.Provider value={{
            activeMenu,
            setActiveMenu,
            isClicked,
            setIsClicked,
            handleClick,
            screenSize,
            setScreenSize,
            isAuth,
            setIsAuth,
            showMenu,
            setShowMenu
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)