import React, {useState} from "react";
import {Link} from "react-router-dom";
import {BiSearchAlt} from "react-icons/bi";

const ForumHead = () => {

    const [search, setSearch] = useState("");

    return (
        <div className="fixed forum-head top-2 flex items-center justify-between p-4 bg-white drop-shadow-xl">
            <Link to="question" className=" text-blue-600 text-xl">Poser une question.</Link>
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
            <select className=" border-b-2 border-blue-300 py-1" >
                <option value="tout">Tout</option>
                <option value="tout">Informatique</option>
            </select>
        </div>
    )
}

export default ForumHead;