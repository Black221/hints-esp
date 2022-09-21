import React, {useState} from "react";
import {FaUser} from "react-icons/fa";
import blob1 from "../assets/Vectordhtr.png";
import blob2 from "../assets/blob2.png";
import {useStateContext} from "../context/ContextProvider";
import axios from "axios";
import {HOST, PORT} from "../config/host";
import loginGif from "../assets/login.gif";
import {useAuthContext} from "../context/AuthProvider";


const Settings = () => {

    const [exPassword, setExPassword] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [response, setResponse] = useState("");
    const [picture, setPicture] = useState();


    const {
        userInfo,
        isLoading, setIsLoading
    } = useStateContext();

    const auth = useAuthContext();

    const handleUpdatePicture = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('picture', picture);
        formData.append('fileName', picture.name);

        axios.put(
            `http://${HOST}:${PORT}/api/user/update/picture/${userInfo._id}`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${auth.user.token}`,
                    'content-type': 'multipart/form-data',
                }
            }
        ).then(res => {
            console.log(res.data)
            setPicture(null)
        }).catch((error) => {
            console.log(error.response)
            setResponse(error.response.data)
            setPicture(null)
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!exPassword || !password || password !== confirmPassword) {
            setResponse("Saisie invalide")
            return null;
        }
        setIsLoading(true)
        axios.put(
            `http://${HOST}:${PORT}/api/user/update/password/${userInfo._id}`,
            {
                password,
                exPassword
            },
            {
                headers: {
                    Authorization: `Bearer ${auth.user.token}`
                }
            }
        ).then(res => {
            console.log(res.data)
            setResponse("Mot de passe changé")
            setIsLoading(false)
        }).catch((error) => {
            console.log(error.response)
            setResponse(error.response.data)
            setIsLoading(false)
        })
    }

    return (
        <div className="w-full h-full flex items-center justify-center overflow-hidden">
            <div className="relative z-20">
                <div className="md:w-auto w-80 p-5 md:px-10 space-y-10 border rounded-xl bg-white drop-shadow-xl relative z-20">
                    <div className="flex items-center space-x-4">
                        <form className="mr-2 space-y-1" onSubmit={handleUpdatePicture}>
                            <label htmlFor="picture" className="cursor-pointer">
                                { !userInfo.picture
                                    ? <div
                                        className="mx-auto bg-blue-500 p-4 rounded-full w-20 h-20 flex items-center justify-center">
                                        <FaUser color="#fff" size={28}/>
                                    </div>
                                    :  <div className="mx-auto overflow-hidden  rounded-full w-20 h-20 flex items-center justify-center">
                                        <img src={userInfo.picture}
                                             className="h-20"
                                             alt="alt"/>
                                    </div>
                                }
                            </label>
                            <input type="file"
                                   id="picture"
                                   onChange={(e) => setPicture(e.target.files[0])}
                                   className="hidden"/>
                            <small className="block">{picture && picture.name}</small>
                            <input type="submit" disabled={!picture} value="Changer" className="cursor-pointer p-3 py-2 bg-blue-200 rounded" />
                        </form>
                        <div className="space-y-1">
                            <div className="font-bold text-2xl">{userInfo.name}</div>
                            <div className="text-gray-800 text-xl">{userInfo.formation.abv +" "+ userInfo.year} / {userInfo.option.abv}</div>
                            <div className="text-gray-700">{userInfo.email}</div>
                        </div>
                    </div>
                    <div className="relative">
                        <form onSubmit={handleSubmit}>
                            <div>{response && response}</div>
                            <div className="flex flex-wrap justify-between items-center">
                                <label htmlFor="password">Ancien mot de passe </label>
                                <input type="password"
                                       id="password"
                                       value={exPassword}
                                       onChange={(e) => setExPassword(e.target.value)}
                                       className="p-2 border border-blue-300 rounded-2xl m-2 px-3 w-full md:w-80"/>
                            </div>
                            <div className="flex flex-wrap justify-between items-center">
                                <label htmlFor="newPassword">Nouveau mot de passe </label>
                                <input type="password"
                                       id="newPassword"
                                       value={password}
                                       onChange={(e) => setPassword(e.target.value)}
                                       className="p-2 border border-blue-300 rounded-2xl m-2 px-3 w-full md:w-80"/>
                            </div>
                            <div className="flex flex-wrap justify-between items-center">
                                <label htmlFor="ConfirmPassword">Confirmer mot de passe </label>
                                <input type="password"
                                       id="ConfirmPassword"
                                       value={confirmPassword}
                                       onChange={(e) => setConfirmPassword(e.target.value)}
                                       className="p-2 border border-blue-300 rounded-2xl m-2 px-3 w-full md:w-80"/>
                            </div>
                            {! isLoading
                                ? <div className="w-full text-end mt-10">
                                    <input type="submit" value="Confirmer"
                                           className="cursor-pointer p-2 text-white bg-green-500 rounded-full px-5"/>
                                </div>
                                : <img src={loginGif}
                                       className="w-24"
                                       alt=""/>
                            }
                        </form>
                    </div>
                </div>
                <div className="w-36 absolute -top-16 -right-20 z-10">
                    <img src={blob1} alt=""/>
                </div>
                <div className="w-36 absolute -bottom-24 -right-24 z-10 rotate-45">
                    <img src={blob2} alt=""/>
                </div>
            </div>
        </div>
    )
}

export  default Settings;