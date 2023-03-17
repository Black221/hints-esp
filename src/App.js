import React, {useEffect, useState} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useStateContext } from "./context/ContextProvider";
import Sidebar from "./components/Sidebar";
import Forum from "./pages/Forum";
import {useAuthContext} from "./context/AuthProvider";
import {RequireAuth} from "./guard/AuthGard";
import axios from "axios";
import {HOST, PORT} from "./config/host";
import Redirection from "./pages/Redirection";
import QuestionForm from "./pages/QuestionForm";


function App() {

    //global state
    const {
        screenSize,
        setScreenSize,
        userInfo,
        setUserInfo
    } = useStateContext();
    //auth state
    const auth = useAuthContext();
    //for getting required user information
    const fetchUser = (id) => {
        axios.get(
            `http://${HOST}:${PORT}/api/user/get/${id}`,
            {
                headers: {
                    Authorization : `Bearer ${auth.user.token}`
                }
            }
        ).then(res => {
            setUserInfo(res.data.user);
        }).catch((error) => {
            auth.logout();
        })
    }

    const [tentative, setTentative] = useState(0);

    useEffect(() => {
        auth.logout();
        const handleResize = () => setScreenSize(window.innerWidth);
        window.addEventListener('resize', handleResize);

        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const access = JSON.parse(localStorage.getItem('access-key'));
        if (auth.user)
            fetchUser(access.userId)
        else if (!auth.user && access && access.token)
            if (tentative < 3) {
                auth.login(access)
                setTentative(1)
            } else {
                auth.logout();
            }
    }, [auth.user])

    return (
        <div className="overflow-x-hidden">
            <BrowserRouter>
                <div className='flex relative dark:bg-main-dark-bg'>
                    { auth.user && userInfo && (
                        <div className='w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white'>
                            <Sidebar />
                        </div>
                    )}
                    <div className={ `dark:bg-main-bg bg-main-bg min-h-screen  w-full ${screenSize >= 900 && auth.user && userInfo ? 'md:ml-72' : 'flex-2'}`} >
                        <Routes>
                            <Route path="/"
                                   exact
                                   element={<Register />}
                            />
                            <Route path="/inscription"
                                   element={<Register />}
                            />
                            <Route path="/connexion"
                                   element={<Login />}
                            />
                            <Route path="/redirection"
                                   element={<Redirection />}
                            />
                            <Route path="/accueil"
                                   element={
                                       <RequireAuth>
                                           <Home/>
                                       </RequireAuth>
                                   }
                            />
                            <Route path="/compte"
                                   element={
                                       <RequireAuth>
                                           <Settings/>
                                       </RequireAuth>
                                   }
                            />

                            <Route path="/forum/question"
                                   element={
                                       <RequireAuth>
                                           <QuestionForm/>
                                       </RequireAuth>
                                   }
                            />
                            <Route path="/forum/*"
                                   element={
                                       <RequireAuth>
                                           <Forum/>
                                       </RequireAuth>
                                   }
                            />

                            {/*<Route path="/dashboard"*/}
                            {/*       element={*/}
                            {/*           <RequireAuth>*/}
                            {/*               <Dashboard/>*/}
                            {/*           </RequireAuth>*/}
                            {/*       }*/}
                            {/*/>*/}

                        </Routes>
                    </div>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;
