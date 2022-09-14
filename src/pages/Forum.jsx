import React from "react";
import aidePng from "../assets/aide.png";
import blob1 from "../assets/Vectordhtr.png";
import blob2 from "../assets/blob2.png";

const Forum = () => {

    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <div className="relative z-40">
                <div className=" space-y-10 border rounded-xl bg-white drop-shadow-xl relative z-20 md:mb-0 mb-20">
                    <form action="" className="md:w-auto w-80 p-4">
                        <div className="flex flex-col space-y-7">
                            <label htmlFor="password" className="text-xl text-blue-500 font-bold">Décrivez nous votre problème</label>
                            <textarea name="" id="text" cols="50" rows="7" placeholder="Détaillez votre problème ici" className="p-2 border border-blue-300 rounded-xl m-2 px-3 drop-shadow-xl">

                            </textarea>
                        </div>
                        <div className="w-full ml-4 mt-5">
                            <input type="submit" value="Envoyer" className="font-bold p-2 text-white bg-green-500 rounded-full drop-shadow-md border-2 border-blue-100 px-5"/>
                        </div>
                    </form>
                </div>
                <div className="w-36 absolute -top-16 -right-20 z-10">
                    <img src={blob1} alt=""/>
                </div>
                <div className="w-36 absolute -bottom-8 -left-24 z-10">
                    <img src={blob2} alt=""/>
                </div>
            </div>
            <div className="w-52 absolute bottom-0 right-10">
                <img src={aidePng} alt=""/>
            </div>

        </div>
    )
}


export default Forum;