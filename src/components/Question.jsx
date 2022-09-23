import React from "react";
import {FaEye, FaUser} from "react-icons/fa";
import {Link} from "react-router-dom";



const Question = ({question}) => {


    return (
        <div className="relative flex mt-8 px-6 py-3 bg-white rounded drop-shadow-md">
            <div className="absolute top-4 right-4">
                <Link to="1" className="text-blue-400">
                    <FaEye size={22} />
                </Link>
            </div>
            <div className="text-center flex flex-col items-center justify-center w-40">
                <div className="mb-2 bg-blue-500 p-4 w-16 h-16 rounded-full flex items-center justify-center">
                    <FaUser color="#fff" size={24}/>
                </div>
                <div className="font-bold ">John Doe</div>
                <div className="text-sm">Dut 2 / Ba</div>
            </div>
            <div className="flex-1">
                <div className="text-2xl mb-1 font-semibold">Titre</div>
                <div className="overflow-hidden">
                    <p className="px-6 line-clamp-2 text-justify ">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi et, incidunt nihil qui reiciendis sed. Accusamus ad alias amet aspernatur, corporis cum deleniti error itaque maiores optio pariatur quaerat voluptatum?
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi et, incidunt nihil qui reiciendis sed. Accusamus ad alias amet aspernatur, corporis cum deleniti error itaque maiores optio pariatur quaerat voluptatum?
                    </p>
                </div>
                <div className="ml-12 mt-3 flex items-center justify-between">
                    <div className="p-1 px-2 bg-blue-100 text-gray-800 font-semibold">#Informatique</div>
                    <small className="text-gray-700 ">il y'a 10mn</small>
                </div>
            </div>

        </div>
    )
}

export default Question;