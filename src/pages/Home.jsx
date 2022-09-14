import React from "react";
import {departments} from "../data/dummy";
import Document from "../components/Document";
import vectorGreen from "../assets/Vectordhtr.png";
import {BsFolderPlus} from "react-icons/bs";

const Home = () => {


    return (
        <div className='md:mt-20 mt-24 flex flex-col  w-full items-center mb-20'>
            <div className="absolute -right-5 md:right-16 w-44 flex flex-col text-white items-center justify-center top-5 bg-semester text-center">
                <img src={vectorGreen}  alt="" className="absolute drop-shadow-md"/>
                <div className="relative text-xl font-semibold italic"> Semestre 1</div>
                <div className="relative "> 5 / 11 / 2022 </div>
            </div>
            <div className="text-start w-full md:px-10">
                <h1 className="text-2xl font-bold text-gray-700 ml-4">Matières</h1>
                <div className="overflow-x-scroll border flex p-3 rounded-xl my-4 bg-blue-200 md:bg-blue-100 drop-shadow-md">
                    { departments
                        .filter((department) => (department.id === "DGI"))[0]
                        .level
                        .filter((level) => (level.title === "DUT 1"))[0]
                        .options
                        .filter((option) => (option.id === "Inf"))[0]
                        .matieres.map((matiere) => (
                            <div className="cursor-pointer p-4 py-1 rounded-xl border bg-white mr-3 drop-shadow-md flex items-center">
                                {matiere.icon} <span className="ml-4 text-sm "> {matiere.name}</span>
                            </div>
                        ))
                    }
                </div>
                <div className="flex items-center justify-center my-6 text-green-500">
                    <BsFolderPlus size={40} className="cursor-pointer" onClick={() => {}} />
                </div>
                <div>
                    <Document date={2010} data={[{id: 0},{id: 1},{id: 2},{id: 3},{id: 4},{id: 5},{id: 6}, {id: 7},{id: 8}]} />
                    <Document date={2005} data={[{id: 0},{id: 1},{id: 2},{id: 3}]} />
                </div>
            </div>
        </div>
    )
};

export default Home;