import React, { createContext, useContext, useState} from "react";

const StateContext = createContext(undefined);


export const ContextProvider = ({ children}) => {
    const [activeMenu, setActiveMenu] = useState(false);
    const [screenSize, setScreenSize] = useState(undefined);
    const [isLoading, setIsLoading] = useState(false)
    const [userInfo, setUserInfo] = useState(false)
    const [semester, setSemester] = useState(1);

    return (
        <StateContext.Provider value={{
            activeMenu, setActiveMenu,
            screenSize, setScreenSize,
            isLoading, setIsLoading,
            userInfo, setUserInfo,
            semester, setSemester,
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)