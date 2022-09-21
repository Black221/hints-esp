import React, {useEffect, useState} from "react";
import login from "../assets/login.png";
import cee from "../assets/Vector.png";
import {FiAtSign} from "react-icons/fi";
import {RiLock2Line} from "react-icons/ri";
import {Link, useNavigate} from "react-router-dom";
import {useStateContext} from "../context/ContextProvider";
import {FaRegUser} from "react-icons/fa";
import {useAuthContext} from "../context/AuthProvider";
import axios from "axios";
import {HOST, PORT} from "../config/host";

const Register = () => {

    let navigate = useNavigate();

    const {
        isLoading,
        setIsLoading,
        userInfo,
        setUserInfo
    } = useStateContext();

    const auth = useAuthContext();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [response, setResponse] = useState({})

    const handleRegister = (e) => {
        setIsLoading(true)
        e.preventDefault();
        axios.post(`http://${HOST}:${PORT}/api/user/register`, {
            name,
            email,
            password
        }).then(res => {
            setIsLoading(false)
            localStorage.setItem('access-key', JSON.stringify(res.data));
            auth.login(res.data);
        }).catch((error) => {
            setIsLoading(false)
            setResponse(error.response);
        })
    }

    useEffect(() => {
        if (auth.user)
            if (userInfo) {
                setIsLoading(false)
                if (userInfo.department)
                    navigate("/accueil")
                else
                    navigate("/redirection")
            }
    }, [userInfo])

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
                    <form action="" className="md:space-y-6 space-y-5 bg-white py-3 rounded-xl md:drop-shadow-none drop-shadow-xl px-2" onSubmit={handleRegister}>
                        <div className="text-center text-red-500">{response.data}</div>
                        <div className=" flex justify-between items-center border border-blue-300 rounded-2xl m-2 px-3 drop-shadow-md bg-white">
                            <div className="relative">
                                <input type="text"
                                       onChange={(e) => setName(e.target.value)}
                                       value={name}
                                       id="pseudo"
                                       className="w-64 md:block p-2  md:w-80 peer appearance-none bg-transparent focus:outline focus:outline-0 "
                                       placeholder=""/>
                                <label htmlFor="pseudo"
                                       className="absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-6 left-1">
                                    Pseudo</label>
                            </div>
                            <FaRegUser size={24} />
                        </div>
                        <div className=" flex justify-between items-center border border-blue-300 rounded-2xl m-2 px-3 drop-shadow-md bg-white">
                            <div className="relative">
                                <input type="email"
                                       id="email"
                                       onChange={(e) => setEmail(e.target.value)}
                                       value={email}
                                       className="w-64 md:block p-2 md:w-80 peer appearance-none bg-transparent focus:outline focus:outline-0 "
                                       placeholder=""/>
                                <label htmlFor="email"
                                       className="absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-6 left-1">
                                    Email</label>
                            </div>
                            <FiAtSign size={24} />
                        </div>
                        <div className="mt-4 relative flex justify-between items-center border border-blue-300 rounded-2xl m-2 px-3 drop-shadow-md bg-white">
                            <div className="relative">
                                <input type="password"
                                       id="password"
                                       onChange={(e) => setPassword(e.target.value)}
                                       value={password}
                                       className="w-64 md:block p-2 md:w-80 peer appearance-none bg-transparent focus:outline focus:outline-0 "
                                       placeholder=""/>
                                <label htmlFor="password"
                                       className="absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-6 left-1">
                                    Mot de passe</label>
                            </div>
                            <RiLock2Line size={24} className="text-gray-700" />
                        </div>
                        <div className="flex items-center justify-center">
                            <input type="submit"
                                   value="S'inscrire"
                                   className="cursor-pointer md:mt-10 p-2 mx-auto px-16 font-bold text-xl bg-sky-500 text-white rounded-md "/>

                        </div>
                    </form>

                </div>
                <div className="space-x-2 mt-16 md:relative absolute bottom-2">
                    <span className="text-gray-700">Déja inscrit?</span>
                    <Link to="/connexion" className="md:text-cyan-600 text-white">Se connecter</Link>
                </div>
            </div>
        </div>
    )
}

export default Register;