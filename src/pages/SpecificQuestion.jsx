import React from "react";
import {Link} from "react-router-dom";
import {FaCommentMedical, FaEye, FaUser} from "react-icons/fa";
import Response from "../components/Response";
import ResponseForm from "../components/ResponseForm";


const SpecificQuestion = () => {

    return (
        <div className="w-full px-8">
            <div className="text-3xl font-bold text-gray-800 mb-6">Question :</div>
            <div className="fixed right-6 bottom-6 z-50">
                <a href="#response-form" className="cursor-pointer text-xl text-blue-600">
                    <FaCommentMedical  className="shadow-green-400" size={30}/>
                </a>
            </div>
            <hr className="border-gray-300 mb-4"/>
            <div className=" flex justify-between">
                <div className="text-center flex space-x-4 items-center justify-center">
                    <div className="mb-2 bg-blue-500 p-4 w-20 h-20 rounded-full flex items-center justify-center">
                        <FaUser color="#fff" size={24}/>
                    </div>
                    <div>
                        <div className="font-bold ">John Doe</div>
                        <div className="text-sm">Dut 2 / Ba</div>
                    </div>
                </div>
                <div className="space-x-3">
                    <span className="p-1 px-2 bg-blue-100 text-gray-800 font-semibold">#Informatique</span>
                    <span className="p-1 px-2 bg-blue-100 text-gray-800 font-semibold">#IA</span>
                    <span className="p-1 px-2 bg-blue-100 text-gray-800 font-semibold">#Lorem</span>

                </div>
            </div>
            <div className="text-xl flex mb-2">
                <div className="text-gray-800 font-bold">Sujet :</div>
                <span className="flex-1 text-center capitalize">lorem ipsum dolor.</span>
            </div>
            <div>
                <h2 className="text-xl text-gray-800 font-bold">Description :</h2>
                <p className="m-3 text-justify tracking-widest">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid at eveniet fugiat minima omnis,
                    placeat quisquam. Accusantium aspernatur delectus esse excepturi facere harum id minus obcaecati,
                    placeat quae quasi, quia.
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid at eveniet fugiat minima omnis,
                    placeat quisquam. Accusantium aspernatur delectus esse excepturi facere harum id minus obcaecati,
                    placeat quae quasi, quia.
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid at eveniet fugiat minima omnis,
                    placeat quisquam. Accusantium aspernatur delectus esse excepturi facere harum id minus obcaecati,
                    placeat quae quasi, quia.
                </p>
            </div>
            <hr id="response-form" className="border-gray-300 mt-4 mb-20"/>
            <ResponseForm />
            <div className="text-3xl font-bold text-gray-800 mt-6">Réponses :</div>
            <div className="mt-10">
                <Response />
                <Response />
                <Response />
            </div>
        </div>
    )
}

export default SpecificQuestion;