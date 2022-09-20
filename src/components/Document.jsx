import React, { useState} from "react";
import {AiOutlineFileAdd, AiOutlineFilePdf} from "react-icons/ai";
import {BiDownload} from "react-icons/bi";

const Document = ({date, data}) => {

    const [page, setPage] = useState(1);

    const openInNewTab = ( url ) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className="w-full text-start mt-5">
            <div className="mx-4 md:mx-0 flex gap-2 italic text-gray-500 items-center">
                <span>{date}</span>
                <span>({Array.isArray(data) ? data.length : 1})</span>
                <hr className="flex-1 border-gray-400"/>
                <BiDownload size={30}
                            className="text-green-500 cursor-pointer"
                            onClick={() => {
                                if(Array.isArray(data))
                                    data.map((file) => {
                                        openInNewTab(file.filepath)
                                    })
                                else
                                    openInNewTab(data.filepath)
                            }}/>
            </div>
            <div className="overflow-x-scroll md:overflow-hidden flex md:flex-wrap ml-10 mt-4 mb-0">
                {data.filter((item, index) => (index >= (page - 1) * 8 && index < page * 8)).map(({date, data}, index) => (
                    <div key={index}
                         className="relative py-3 rounded md:rounded-none md:p-0  w-24 md:w-48 md:h-28 mr-4 md:mr-10 mb-4 border border-blue-200">
                        <div onClick={() => openInNewTab(data.filepath)}
                                className="cursor-pointer w-24 md:w-auto h-20 flex flex-col items-center justify-center">
                            <AiOutlineFilePdf size={45} color="red" />
                            <div>{(data.size / 1000).toFixed(2)} Ko</div>
                        </div>
                            <div className=" absolute left-0  bottom-0 text-center w-full bg-gray-300 text-ellipsis text-sm" >{data.date}</div>
                    </div>
                ))}

            </div>
            {data.length > 8 ? <div className="w-full flex items-center justify-center">
                pages :
                {data.map((item, index) => (
                    index % 8 === 0
                        ? <span key={index / 8 + 1} className="mx-2 cursor-pointer"
                                onClick={() => setPage(index / 8 + 1)}>{index / 8 + 1}</span>
                        : ""
                ))}
            </div> : <></>}
        </div>
    )
}

export default Document;