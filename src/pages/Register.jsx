import React, {useEffect, useState} from "react";
import login from "../assets/login.png";
import cee from "../assets/Vector.png";
import {FiAtSign} from "react-icons/fi";
import emailJs from '@emailjs/browser';
import {Link} from "react-router-dom";
import {useStateContext} from "../context/ContextProvider";
import {FaRegUser} from "react-icons/fa";
import axios from "axios";
import {HOST, PORT} from "../config/host";
import loginGif from "../assets/login.gif";

const Register = () => {

    const CHAR = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const NUM = "0123456789";
    const char = "abcdefghijklmnopqrstuvwxyz";
    const spChar = "!@#&*";

    const {
        isLoading,
        setIsLoading,
    } = useStateContext();


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [response, setResponse] = useState("");
    const [formation, setFormation] = useState("DUT");
    const [department, setDepartment] = useState("DGE");
    const [level, setLevel] = useState(1);
    const [option, setOption] = useState("Inf");
    const [name, setName] = useState("");
    const [isDone, setIsDone] = useState(false);

    const randPassword = (character, count) => {
        let password = "";
        for (let i = 0; i <= count; i++) {
            let randomNumber = Math.floor(Math.random() * character.length);
            password += character.substring(randomNumber, randomNumber +1);
        }
        return password;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let pass  = randPassword(CHAR, 1) + ""+ randPassword(spChar, 1) + "" + randPassword(char, 4) +""+ randPassword(NUM, 2); 
        if (!email) {

            setResponse("Veuillez saisir votre email")
            return null;
        }
        setPassword(pass);
        setIsLoading(true)
    }



    useEffect(() => {
        if (password) {
            axios.post(`http://${HOST}:${PORT}/api/user/register`, {
                email,
                password,
                department,
                option,
                level,
                pseudo: name,
                formation
            }).then(res => {
                setIsLoading(false)
                console.log(res)
                if (res.data.result) {
                    sendEmail(res.data.result, password);
                    setIsDone(true);
                    setResponse("Inscription réussie veuillez consulter votre boite mail.")
                } else
                    setResponse(res.data.msg)
            }).catch((error) => {
                setIsLoading(false)
                setResponse("Une erreur est survenue veuillez ressayer plus tard");
            })
        } else
            setIsLoading(false)
    }, [password]);


    const sendEmail = (name, message) => {

        emailJs.send(
            'service_r6hou73',
            'codification_56cli1k',
            {
                to_name: `${name}`,
                to_email: email,
                message
            },
            'BCidLL6hrWDmpzwyN')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
    };


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
                <img src={cee} alt="" className="md:w-auto w-32"/>
                <div className="relative bottom-5">
                    {!isDone ? <form className="md:space-y-4 space-y-4 bg-white py-3 rounded-xl md:drop-shadow-none drop-shadow-xl px-2" onSubmit={handleSubmit} > 
                        <div className="text-center text-red-500">{response}</div>
                        <div className=" flex justify-between items-center border border-blue-300 rounded-2xl m-2 px-3 drop-shadow-md bg-white">
                            <div className="relative">
                                <input type="text"
                                       id="name"
                                       onChange={(e) => setName(e.target.value)}
                                       value={name}
                                       className="w-64 md:block p-2 md:w-80 peer appearance-none bg-transparent focus:outline focus:outline-0 "
                                       placeholder=""/>
                                <label htmlFor="name"
                                       className="absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-6 left-1">
                                    Pseudo</label>
                            </div>
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

                        <div className=" flex justify-between items-center border border-blue-300 rounded-2xl m-2 px-3 drop-shadow-md bg-white">
                            <div className="relative">
                                <select value={department} onChange={(e) => setDepartment(e.target.value)} className="w-64 md:block p-2 md:w-80 peer appearance-none bg-transparent focus:outline focus:outline-0 "
                                       id="department">
                                     <option value="DGE">Génie Électrique</option>
                                    <option value="DG">Gestion</option>
                                    <option value="DGI">Génie Informatique</option>
                                    <option value="DGC">Génie Civil</option>
                                    <option value="GCBG">Génie Chimique et Biologie Appliquée</option>
                                    <option value="DGM">Génie Mécanique</option>
                                </select>
                                <label htmlFor="department"
                                       className="absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-6 left-1">
                                    Département</label>
                            </div>
                        </div>

                        <div className=" flex justify-between items-center border border-blue-300 rounded-2xl m-2 px-3 drop-shadow-md bg-white">
                            <div className="relative">
                                <select value={option} onChange={(e) => setOption(e.target.value)} className="w-64 md:block p-2 md:w-80 peer appearance-none bg-transparent focus:outline focus:outline-0 "
                                       id="option">
                                    <option value="Inf">Informatique</option>
                                    <option value="TR">Télécom Réseaux</option>
                                    <option value="Elec">Élec</option>
                                    <option value="BioMed">Biomed</option>
                                    <option value="AB">AB</option>
                                    <option value="ICA">ICA</option>
                                    <option value="IA">IA</option>
                                    <option value="GC">GC</option>
                                </select>
                                <label htmlFor="option"
                                       className="absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-6 left-1">
                                    Option</label>
                            </div>
                        </div>

                        <div className=" flex justify-between items-center border border-blue-300 rounded-2xl m-2 px-3 drop-shadow-md bg-white">
                            <div className="relative">
                                <select value={formation} onChange={ (e) => setFormation(e.target.value)} className="w-16 md:block p-2 md:w-64 peer appearance-none bg-transparent focus:outline focus:outline-0 "
                                       id="formation">
                                    <option value="DUT">DUT</option>
                                    <option value="DIC">DIC</option>
                                    <option value="DESCAF">DESCAF</option>
                                    <option value="DST">DST</option>
                                    <option value="L">Licence</option>
                                    <option value="M">Master</option>
                                </select>
                                <label htmlFor="formation"
                                       className="absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-6 left-1">
                                    Formation</label>
                            </div>

                            <div className="relative">
                                <input type="number"
                                       id="level"
                                       onChange={(e) => setLevel(e.target.value)}
                                       value={level}
                                       max={3}
                                       min={1}
                                       className="w-16 md:block p-2 md:w-auto peer appearance-none bg-transparent focus:outline focus:outline-0 "
                                       placeholder=""/>
                                <label htmlFor="level"
                                       className="absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-6 left-1">
                                    Niveau</label>
                            </div>
                        </div>

                        <div className="flex items-center justify-center">
                            {!isLoading
                                ? <input type="submit"
                                    value="S'inscrire"
                                    className="cursor-pointer md:mt-10 p-2 mx-auto px-16 font-bold text-xl bg-sky-500 text-white rounded-md "/>
                                : <img src={loginGif} className="w-24" alt=""/>
                            }
                        </div>
                    </form> : <div className="bg-white p-4 rounded-xl">
                            <p className="text-green-500 ">{response}</p>
                    </div>}

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