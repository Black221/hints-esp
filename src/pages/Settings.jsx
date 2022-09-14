import React from "react";
import {FaUser} from "react-icons/fa";
import blob1 from "../assets/Vectordhtr.png";
import blob2 from "../assets/blob2.png";


const Settings = () => {

    return (
        <div className="w-full h-full flex items-center justify-center overflow-hidden">
            <div className="relative z-20">
                <div className="md:w-auto w-80 p-5 md:px-10 space-y-10 border rounded-xl bg-white drop-shadow-xl relative z-20">
                    <div className="flex items-center space-x-4">
                        <div className="mr-2 space-y-1">
                            <div className="mx-auto bg-blue-500 p-4 rounded-full w-20 h-20 flex items-center justify-center">
                                <FaUser color="#fff" size={28} />
                            </div>
                            <button className="p-3 py-2 bg-blue-200 rounded">Changer</button>
                        </div>
                        <div className="space-y-1">
                            <div className="font-bold text-2xl">Username</div>
                            <div className="text-gray-800 text-xl">Level / Dep</div>
                            <div className="text-gray-700">username@esp.sn</div>
                        </div>
                    </div>
                    <div className="relative">
                        <form action="">
                            <div className="flex flex-wrap justify-between items-center">
                                <label htmlFor="password">Ancien mot de passe </label>
                                <input type="password"
                                       id="password"
                                       className="p-2 border border-blue-300 rounded-2xl m-2 px-3 w-full md:w-80"/>
                            </div>
                            <div className="flex flex-wrap justify-between items-center">
                                <label htmlFor="newPassword">Nouveau mot de passe </label>
                                <input type="password"
                                       id="newPassword"
                                       className="p-2 border border-blue-300 rounded-2xl m-2 px-3 w-full md:w-80"/>
                            </div>
                            <div className="flex flex-wrap justify-between items-center">
                                <label htmlFor="ConfirmPassword">Confirmer mot de passe </label>
                                <input type="password"
                                       id="ConfirmPassword"
                                       className="p-2 border border-blue-300 rounded-2xl m-2 px-3 w-full md:w-80"/>
                            </div>
                            <div className="w-full text-end mt-10">
                                <input type="submit" value="Confirmer" className="p-2 text-white bg-green-500 rounded-full px-5"/>
                            </div>
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