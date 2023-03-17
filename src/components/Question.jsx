import React, {useEffect, useState} from "react";
import {FaEye, FaUser} from "react-icons/fa";
import {Link} from "react-router-dom";
import Moment from 'moment';
import axios from "axios";
import {HOST, PORT} from "../config/host";
import {useAuthContext} from "../context/AuthProvider";



const Question = ({question}) => {

    const [user, setUser] = useState({});
    const currentDate = Moment().format('DD-MM-YYYY');
    const auth = useAuthContext();

    const fetchUser = () => {
        axios.get(
            `http://${HOST}:${PORT}/api/user/get/${question.user}`,
            {
                headers: {
                    Authorization : `Bearer ${auth.user.token}`
                }
            }
        ).then(res => {
            setUser(res.data.user);
        }).catch((error) => {
        })
    }
    useEffect(() => {
        if (question)
            fetchUser()
    }, [question])

    return (
        <div className="relative flex mt-8 px-6 py-3 bg-white rounded drop-shadow-md">
            <div className="absolute top-4 right-4">
                <Link to={question.id} className="text-blue-400">
                    <FaEye size={22} />
                </Link>
            </div>
            <div className="text-center flex flex-col items-center justify-center w-40">
                { user && !user.picture
                    ? <div
                        className="mx-auto bg-blue-500 p-4 rounded-full h-16 w-16  flex items-center justify-center">
                        <FaUser color="#fff" size={28}/>
                    </div>
                    :  <div className="mx-auto overflow-hidden  rounded-full w-16 h-16 flex items-center justify-center">
                        <img src={user.picture}
                             className="h-20"
                             alt="alt"/>
                    </div>
                }
                <div className="font-bold "> {user && user.name} </div>
                <div className="text-sm">{user.formation  +" "+ user.level} / {user.option}</div>
            </div>
            <div className="flex-1">
                <div className="text-xl mb-1 font-semibold capitalize">{question && question.name}</div>
                <div className="overflow-hidden">
                    <p className="px-6 line-clamp-2 text-justify">
                        {question && question.description}
                    </p>
                </div>
                <div className="ml-12 mt-3 flex items-center justify-between">
                    <div className="flex items-center">
                        {question.keywords && question.keywords.map((key, index) => (
                            <div key={index} className="p-1 px-2 bg-blue-100 text-gray-800 font-semibold mr-2 capitalize">#{key}</div>
                        ))}
                    </div>
                    <small className="text-gray-700 ">{
                        question && currentDate !== Moment(question.createAt.seconds * 1000).format('DD-MM-YYYY')
                            ? Moment(question.createAt.seconds * 1000).format('DD-MM-YYYY')
                            : "il y'a "+ Moment().subtract(Moment(question.createAt.seconds * 1000)).format('hh:mm')+" mn"
                    }</small>
                </div>
            </div>

        </div>
    )
}

export default Question;