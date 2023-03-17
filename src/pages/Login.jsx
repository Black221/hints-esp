import React, {useEffect, useState} from "react";
import login from "../assets/login.png";
import loginGif from "../assets/login.gif";
import cee from "../assets/Vector.png";
import {FiAtSign} from "react-icons/fi";
import {RiLock2Line, RiLockUnlockLine} from "react-icons/ri";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {useAuthContext} from "../context/AuthProvider";
import {useStateContext} from "../context/ContextProvider";
import {HOST, PORT} from "../config/host";

const Login = () => {

    let navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [response, setResponse] = useState("")
    const [unlock, setUnlock] = useState(false);
    const {
        isLoading,
        setIsLoading,
        userInfo
    } = useStateContext();

    const auth = useAuthContext()

    const handleLogin = async (e) => {
        setIsLoading(true)
        console.log(email)
        e.preventDefault();
        axios.post(`http://${HOST}:${PORT}/api/user/login`, {
            email,
            password
        }).then(res => {
            setIsLoading(false)
            console.log(res)
            localStorage.setItem('access-key', JSON.stringify(res.data));
            auth.login(res.data);
        }).catch((error) => {
            setIsLoading(false)
            console.log(error)
            setResponse(error.response.data);
        })
    }

    useEffect(() => {

        if (auth.user)
            if (userInfo) {
               setIsLoading(false)
               navigate("/accueil")
            }

    }, [userInfo]);



    return (
        <div className="bg-cyan-400 bg-gradient-to-bl from-blue-500 md:from-white md:bg-white h-full md:h-screen md:grid md:grid-cols-2 ">
            <div className="flex flex-col items-center justify-center text-center md:bg-cyan-400 md:bg-gradient-to-bl md:from-blue-500 text-white" >
                <img src={login} alt="" className="md:w-60 mb-8 w-44 md:relative absolute md:bottom-0 bottom-0 "/>
                <div className="font-extrabold text-3xl md:mt-0 mt-6">
                    “Hints” numériques
                </div>
                <div className="mt-2 ">
                    Accédez  aux devoirs et examens<br/>
                    Quelque soit votre formation
                </div>
            </div>




            <div className="md:relative flex flex-col items-center justify-center" >
                <img src={cee} alt="" className="md:w-auto w-44"/>
                <div className="relative bottom-5">
                    <form className=" bg-white py-3 rounded-xl md:drop-shadow-none drop-shadow-xl"
                          onSubmit={handleLogin}>
                        <div className="text-center text-red-500">{response}</div>
                        <div className=" flex  items-center border border-blue-300 rounded-2xl m-2 px-3 drop-shadow-md bg-white">
                            <div className="relative flex-1">
                                <input type="text"
                                       id="email"
                                       className="w-full md:block p-2 md:w-80 peer appearance-none bg-transparent focus:outline focus:outline-0 "
                                       placeholder=""
                                       value={email}
                                       onChange={(e) => setEmail(e.target.value)}
                                />
                                <label htmlFor="email"
                                       className="absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-6 left-1">
                                    Email</label>
                            </div>
                            <FiAtSign size={24} />
                        </div>
                        <div className="mt-4 relative flex  items-center border border-blue-300 rounded-2xl m-2 px-3 drop-shadow-md bg-white">
                            <div className="relative flex-1">
                                <input type={unlock ? "text": "password"}
                                       id="password"
                                       className="w-full md:block p-2 md:w-80 peer appearance-none bg-transparent focus:outline focus:outline-0 "
                                       placeholder=""
                                       value={password}
                                       onChange={(e) => setPassword(e.target.value)}
                                />
                                <label htmlFor="password"
                                       className="absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-6 left-1">
                                    Mot de passe</label>
                            </div>
                            <button type="button" onClick={() => setUnlock(u => (!u))}>
                                {!unlock 
                                ? <RiLock2Line size={24} className="text-gray-700" />
                                : <RiLockUnlockLine size={24} className="text-gray-700" />}
                            </button>
                        </div>
                        <div className="flex justify-between px-3 text-[14px] md:text-[16px] space-x-10 md:space-x-0">
                            <div className="space-x-1 md:space-x-3 text-green-500 flex items-center">
                                <input type="checkbox"
                                       value="remember me"
                                       id="check"/>
                                <label htmlFor="check" className="cursor-pointer">Se souvenir de moi</label>
                            </div>
                            <span className=" text-cyan-600 cursor-pointer">Mot de passe oublié</span>
                        </div>
                        <div className="flex items-center justify-center">
                            {!isLoading
                                ? <input type="submit"
                                         value="Se connecter"
                                         className="cursor-pointer md:mt-10 mt-8 p-2 mx-auto px-16 font-bold text-xl bg-sky-500 text-white rounded-md "/>
                                : <img src={loginGif}
                                       className="w-24"
                                       alt=""/>
                            }
                        </div>
                     </form>

                </div>
                <div className="space-x-2 mt-16 md:relative absolute bottom-2">
                    <span className="text-gray-700">Pas de compte?</span>
                    <Link to="/inscription" className="md:text-cyan-600 text-white">S'inscrire</Link>
                </div>
            </div>
        </div>
    )
}

export default Login;