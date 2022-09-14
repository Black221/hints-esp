import React, {useEffect} from "react";
import {useStateContext} from "../context/ContextProvider";
import cee from "../assets/Vector.png";
import {useNavigate} from "react-router-dom";

const Redirection = () => {

    let navigate = useNavigate();
    const {
        isAuth,
        setIsAuth
    } = useStateContext();

    useEffect(() => {
        if (isAuth)
            navigate("/accueil")
    }, []);

    return (
        <div className="">
            <div className="flex items-center justify-center h-screen bg-[#009DEC]">
                <div className="bg-white relative rounded-xl w-5/6  py-16 md:p-16 md:w-2/5 drop-shadow-xl">
                    <div className="absolute left-0 -top-24 text-center w-full">
                        <img src={cee} alt="" className="mx-auto w-44 drop-shadow-md"/>
                    </div>
                    <div className="md:w-2/3 px-6 md:px-0  mx-auto relative">
                        <form action="" className="space-y-5 text-[17px] flex flex-col items-center" onSubmit={() => {setIsAuth(true);navigate("/accueil")}}>
                            <div className="flex justify-between w-full">
                                <label htmlFor="" className="font-semibold">Formation</label>
                                <select name="" id="" className="w-24">
                                    <option value="DUT">DUT</option>
                                    <option value="DST">DST</option>
                                    <option value="LICENCE">LICENCE</option>
                                </select>
                            </div>
                            <div className="flex justify-between w-full">
                                <label htmlFor=""  className="font-semibold" >Departement</label>
                                <select name="" id="" className="w-24">
                                    <option value="DGI">DGI</option>
                                    <option value="DGM">DGM</option>
                                    <option value="GCBA">GCBA</option>
                                    <option value="GE">GE</option>
                                    <option value="DG">DG</option>
                                </select>
                            </div>
                            <div className="flex justify-between w-full">
                                <label htmlFor=""  className="font-semibold">Option</label>
                                <select name="" id="" className="w-24">
                                    <option value="">Tr</option>
                                    <option value="">Inf</option>
                                </select>
                            </div>
                            <div className="flex justify-between w-full">
                                <label htmlFor=""  className="font-semibold">Année</label>
                                <input type="number" max="3" min="1" placeholder="1" className="pl-2 md:w-16"/>
                            </div>
                            <div className="text-center">
                                <input type="submit"
                                       value="Valider"
                                       className=" mt-10 p-2 px-6 mx-auto md:px-16 font-bold text-xl bg-sky-500 text-white rounded-md "/>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Redirection;