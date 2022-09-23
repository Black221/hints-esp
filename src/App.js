import React, {useEffect} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useStateContext } from "./context/ContextProvider";
import Sidebar from "./components/Sidebar";
import Forum from "./pages/Forum";
import Dashboard from "./admin/Dashboard";
import {useAuthContext} from "./context/AuthProvider";
import {RequireAuth} from "./guard/AuthGard";
import axios from "axios";
import {HOST, PORT} from "./config/host";
import Redirection from "./pages/Redirection";
import QuestionForm from "./pages/QuestionForm";
import SpecificQuestion from "./pages/SpecificQuestion";
import ForumHead from "./components/ForumHead";


function App() {

    const {
        screenSize,
        setScreenSize,
        userInfo,
        setUserInfo
    } = useStateContext();

    const auth = useAuthContext();

    const fetchUser = () => {
        axios.get(
            `http://${HOST}:${PORT}/api/user/get/${auth.user.userId}`,
            {
                headers: {
                    Authorization : `Bearer ${auth.user.token}`
                }
            }
        ).then(res => {
            console.log(res.data);
            setUserInfo(res.data.user);
        }).catch((error) => {
            console.log(error)
            auth.logout();
        })
    }

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
            fetchUser()
        else if (!auth.user && access && access.token)
            auth.login(access)

    }, [auth.user])

    return (
        <div className="overflow-x-hidden">
            <BrowserRouter>
                <div className='flex relative dark:bg-main-dark-bg'>
                    { auth.user && userInfo && userInfo.department ? (
                        <div className='w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white'>
                            <Sidebar />
                        </div>
                    ) : (
                        <></>
                    )}
                    <div className={ `dark:bg-main-bg bg-main-bg min-h-screen  w-full ${screenSize >= 900 && auth.user && userInfo && userInfo.department ? 'md:ml-72' : 'flex-2'}`} >
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
