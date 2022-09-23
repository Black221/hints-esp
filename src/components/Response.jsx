import React from "react";
import {FaUser} from "react-icons/fa";
import {BsStarFill} from "react-icons/bs";

const Response = () => {

    return (
        <div className="my-8">
            <div className="flex justify-between">
                <div className="text-center flex space-x-4 items-center ">
                    <div className="mb-2 bg-blue-500 p-4 w-12 h-12 rounded-full flex items-center justify-center">
                        <FaUser color="#fff" size={24}/>
                    </div>
                    <div>
                        <div className="font-bold ">John Doe</div>
                        <div className="text-sm">Dut 2 / Ba</div>
                    </div>
                </div>
                <div className="flex space-x-3">
                    <BsStarFill size={20} className="text-yellow-400" />
                    <span>65 votes</span>
                </div>
            </div>
            <div className="">
                <p className="text-justify tracking-widest line-clamp-3">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur deserunt dolor dolorem dolorum, modi porro quaerat quos. Aliquam blanditiis consequuntur corporis id minus molestias quas quibusdam quo repudiandae! Mollitia, quas.
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur deserunt dolor dolorem dolorum, modi porro quaerat quos. Aliquam blanditiis consequuntur corporis id minus molestias quas quibusdam quo repudiandae! Mollitia, quas.
                </p>
            </div>
            <div className="text-end">
                <button className="text-gray-800 font-bold mt-3">
                    afficher plus
                </button>
            </div>
            <hr className="border-gray-300 my-6"/>
        </div>
    )
}

export default Response;