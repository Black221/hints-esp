import React, {useEffect} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import Register from "./pages/Register";
import Login from "./pages/Login";
import {useStateContext} from "./context/ContextProvider";
import Sidebar from "./components/Sidebar";
import Forum from "./pages/Forum";
import Redirection from "./pages/Redirection";
import {AiOutlineMenu} from "react-icons/ai";
import {BiMenuAltLeft} from "react-icons/bi";



function App() {

    const {
        activeMenu,
        setActiveMenu,
        screenSize,
        setScreenSize,
        isAuth,
        setShowMenu
    } = useStateContext();

    useEffect(() => {
        const handleResize = () => setScreenSize(window.innerWidth);
        window.addEventListener('resize', handleResize);

        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);


    useEffect(() => {
        if (isAuth)
            if (screenSize <= 900)
                setActiveMenu(false);
            else
                setActiveMenu(true);
        else
            setActiveMenu(false)
    }, [screenSize, isAuth]);



    return (
        <div className="overflow-x-hidden">
            <BrowserRouter>
                <div className='flex relative dark:bg-main-dark-bg'>
                    <div>
                        { activeMenu ? (
                            <div className='w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white'>
                                <Sidebar computer={true} />
                            </div>
                        ) : (
                           isAuth ? (
                              <div>
                                  <Sidebar computer={false} />
                              </div>
                           ) : (<> </>)
                        )}
                    </div>
                    <div className={ `dark:bg-main-bg bg-main-bg min-h-screen  w-full ${activeMenu ? 'md:ml-72' : 'flex-2'}`} onClick={() => setShowMenu(false)}>
                        <Routes>
                            <Route path="/"
                                   element={<Register />}
                            />
                            { isAuth ?
                                <>
                                    <Route path="/accueil"
                                            element={<Home/>}/>
                                    <Route path="/compte"
                                    element={<Settings />}/>
                                    <Route path="/aide"
                                    element={<Forum />}/>
                                </>
                                : ""
                            }
                            <Route path="/inscription"
                                   element={<Register />}/>
                            <Route path="/inscription/option"
                                   element={<Redirection />}/>
                            <Route path="/option"
                                   element={<Redirection />}/>
                            <Route path="/connexion"
                                   element={<Login />}/>
                            <Route path="*" element={<Login />} />
                        </Routes>
                    </div>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;
