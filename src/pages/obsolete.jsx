import React, {useEffect} from "react";
import login from "../assets/login.png";
import cee from "../assets/Vector.png";
import {FiAtSign} from "react-icons/fi";
import {RiLock2Line} from "react-icons/ri";
import {Link, useNavigate} from "react-router-dom";
import {useStateContext} from "../context/ContextProvider";

const obsolete = () => {

    let navigate = useNavigate();
    const {
        isAuth
    } = useStateContext();

    useEffect(() => {
        if (isAuth)
            navigate("/accueil")
    }, []);

    return (
        <div className="h-screen grid grid-cols-2 ">
            <div className="flex flex-col items-center justify-center text-center bg-cyan-400 bg-gradient-to-bl from-blue-500 text-white" >
                <img src={login} alt="" className="w-60 mb-8"/>
                <div className="font-extrabold text-3xl">
                    “Hints” numériques
                </div>
                <div className="mt-2">
                    Accédez  aux devoirs et examens<br/>
                    Quelque soit votre formation
                </div>
            </div>
            <div className="flex flex-col items-center justify-center" >
                <img src={cee} alt=""/>
                <div>
                    <form action="" className="" onSubmit={() => {navigate("option")}}>
                        <div className=" flex justify-between items-center border border-blue-300 rounded-2xl m-2 px-3 drop-shadow-md bg-white">
                            <div className="relative">
                                <input type="email"
                                       id="email"
                                       className="block p-2 w-80 peer appearance-none bg-transparent focus:outline focus:outline-0 "
                                       placeholder=""/>
                                <label htmlFor="email"
                                       className="absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-6 left-1">
                                    Pseudo</label>
                            </div>
                            <FiAtSign size={24} />
                        </div>
                        <div className=" flex justify-between items-center border border-blue-300 rounded-2xl m-2 px-3 drop-shadow-md bg-white">
                            <div className="relative">
                                <input type="email"
                                       id="email"
                                       className="block p-2 w-80 peer appearance-none bg-transparent focus:outline focus:outline-0 "
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
                                       className="block p-2 w-80 peer appearance-none bg-transparent focus:outline focus:outline-0 "
                                       placeholder=""/>
                                <label htmlFor="password"
                                       className="absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-6 left-1">
                                    Mot de passe</label>
                            </div>
                            <RiLock2Line size={24} className="text-gray-700" />
                        </div>
                        <div className="flex justify-between px-3">
                            <div className="space-x-3 text-green-500">
                                <input type="checkbox"
                                       value="remember me"
                                       id="check"/>
                                <label htmlFor="check">Se souvenir de moi</label>
                            </div>
                            <span className=" text-cyan-600">Mot de passe oublié</span>
                        </div>
                        <div className="flex mt-4">
                            <input type="submit"
                                   value="S'inscrire"
                                   className=" mt-10 p-2 mx-auto px-16 font-bold text-xl bg-sky-500 text-white rounded-md "/>

                        </div>
                    </form>

                </div>
                <div className="space-x-2 mt-16">
                    <span className="text-gray-700">Déja inscrit?</span>
                    <Link to="/connexion" className="text-cyan-600">Se connecter</Link>
                </div>
            </div>
        </div>
    )
}

