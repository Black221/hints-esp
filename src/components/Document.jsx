import React, {useEffect, useState} from "react";
import {AiOutlineFileAdd, AiOutlineFilePdf} from "react-icons/ai";
import {BiDownload} from "react-icons/bi";

const Document = ({date, data}) => {

    const [page, setPage] = useState(1);

    return (
        <div className="w-full text-start mt-5">
            <div className="mx-4 md:mx-0 flex gap-2 italic text-gray-500 items-center">
                <span>{date}</span>
                <span>({data.length})</span>
                <hr className="flex-1 border-gray-400"/>
                <AiOutlineFileAdd size={25} className="text-green-500" />
                <BiDownload size={25} className="text-green-500" />
            </div>
            <div className="overflow-x-scroll md:overflow-hidden flex md:flex-wrap ml-10 mt-4 mb-0">
                {data.filter((item, index) => (index >= (page - 1) * 8 && index < page * 8)).map((item, index) => (
                    <div key={item.id} className="relative p-3 rounded md:rounded-none md:p-0 md:w-48 md:h-28 mr-10 mb-4 border border-blue-200">
                        <div className="h-20 flex flex-col items-center justify-center">
                            <AiOutlineFilePdf size={45} color="red" />
                            <div>{item.id}</div>
                        </div>
                            <div className=" absolute left-0  bottom-0 text-center w-full bg-gray-300 text-ellipsis text-sm" >2 7 2010</div>
                    </div>
                ))}

            </div>
            {data.length > 8 ? <div className="w-full flex items-center justify-center">
                pages :
                {data.map((item, index) => (
                    index % 8 === 0
                        ? <span className="mx-2 cursor-pointer"
                                onClick={() => setPage(index / 8 + 1)}>{index / 8 + 1}</span>
                        : <></>
                ))}
            </div> : <></>}
        </div>
    )
}

export default Document;