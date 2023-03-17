import React, {useEffect, useState} from "react";
import {FaUser} from "react-icons/fa";
import {BsStar, BsStarFill} from "react-icons/bs";
import axios from "axios";
import { HOST, PORT} from "../config/host";
import {useAuthContext} from "../context/AuthProvider";
import { collection, updateDoc, doc } from "firebase/firestore";
import {fireDB} from '../data/firebase';
import Moment from 'moment';


const Response = ({response}) => {

    const [user, setUser] = useState({});
    const auth = useAuthContext();
    const currentDate = Moment().format('DD-MM-YYYY');

    const handleLike = async () => {
        let like = response.like ? response.like : [];
        like.push(user._id);
        await updateDoc(doc(collection(fireDB, "Responses"), response.id), {like})
            .then((res) => {
            })
    }

   

    const fetchUser = () => {
        axios.get(
            `http://${HOST}:${PORT}/api/user/get/${response.user}`,
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
        if (response)
            fetchUser();
    }, [response]);


    

    return (
        user && <div className="my-8">
            <div className="flex justify-between">
                <div className="text-center flex space-x-4 items-center ">
                    { user && !user.picture
                        ? <div className="mx-auto bg-blue-500 p-4 rounded-full h-16 w-16 flex items-center justify-center">
                            <FaUser color="#fff" size={28}/>
                        </div>
                        :  <div className="mx-auto overflow-hidden  rounded-full w-16 h-16 flex items-center justify-center">
                            <img src={user.picture}
                                 className="h-20"
                                 alt="alt"/>
                        </div>
                    }
                    <div>
                        <div className="font-bold "> {user && user.name} </div>
                        <div className="text-sm">{user.formation +" "+ user.level} / {user.option}</div>
                    </div>
                </div>
                <div className="flex space-x-3">
                    {response && response.like &&
                        response.like.filter((id) => (id === user._id))[0]
                            ? <BsStarFill size={20} className="text-yellow-400" />
                            : <BsStar size={20} onClick={handleLike} className="cursor-pointer text-yellow-400" />

                    }
                    <span>{response && response.like && response.like.length} votes</span>
                </div>
            </div>
            <div className="mt-2">
                <p className="text-justify text-sm tracking-widest line-clamp-3">
                    {response && response.description}
                </p>
            </div>
            <div className="text-end">
                <button className="text-gray-800 font-bold mt-3">
                    afficher plus
                </button>
            </div>
            <small className="text-gray-700 ">{
                response && currentDate !== Moment(response.createAt.seconds * 1000).format('DD-MM-YYYY')
                    ? Moment(response.createAt.seconds * 1000).format('DD-MM-YYYY')
                    : "il y'a "+ Moment().subtract(Moment(response.createAt.seconds * 1000)).format('HH:mm')+" mn"
            }</small>
            <hr className="border-gray-300 my-6"/>
        </div>
    )
}

export default Response;