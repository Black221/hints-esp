import React, {} from "react";
import {Link} from "react-router-dom";
import {BiMessageAdd, BiSearchAlt} from "react-icons/bi";
import {useStateContext} from "../context/ContextProvider";

const ForumHead = () => {

    const {search, setSearch, screenSize} = useStateContext();

    return (
        <div className="fixed forum-head md:pl-0 pl-24 md:flex-row flex-row-reverse md:flex-nowrap  top-2 flex items-center justify-between p-4 bg-white drop-shadow-xl">
            {screenSize > 780 ? <Link to="question" className=" text-blue-600 text-xl">Poser une question.</Link>
             : <Link to="question" className=" text-blue-600 text-xl"><BiMessageAdd size={35} className="text-blue-600" /></Link>}
            <div className="border-1 border-blue-300  rounded-full flex items-center px-2">
                <label htmlFor="search">
                    <BiSearchAlt size={35} className="text-blue-300" />
                </label>
                <input type="search"
                       id="search"
                       className="w-full md:block p-2 md:w-72 peer appearance-none bg-transparent focus:outline focus:outline-0 "
                       placeholder="Rechercher..."
                       value={search}
                       onChange={(e) => setSearch(e.target.value)}
                />
            </div>
        </div>
    )
}

export default ForumHead;