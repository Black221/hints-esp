import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {FaCommentMedical, FaUser} from "react-icons/fa";
import Response from "../components/Response";
import ResponseForm from "../components/ResponseForm";
import axios from "axios";
import { HOST, PORT} from "../config/host";
import {useAuthContext} from "../context/AuthProvider";
import {useStateContext} from "../context/ContextProvider";
import noData from "../assets/noData.png";
import { collection, where, doc, onSnapshot} from "firebase/firestore";
import { fireDB } from "../data/firebase";

const SpecificQuestion = () => {

    const {id} = useParams();
    const [question, setQuestion] = useState(null);
    const [user, setUser] = useState({});
    const [responses, setResponses] = useState([]);
    const auth = useAuthContext();
    const {search} = useStateContext();
    const [previousSearch, setPreviousSearch] = useState("")

    useEffect(() => {
        if (previousSearch.length < search.length)
            setPreviousSearch(search)
        else {
            fetchResponse()
            setPreviousSearch(search)
        }
        if (search)
            setResponses((R) => (
                R.filter((r) => (r.description.toUpperCase().search(search.toUpperCase()) !== -1)
            )))
        else
            fetchResponse()
    }, [search]);

    const fetchQuestion = async () => {
        await onSnapshot(doc(collection(fireDB, "Questions"), id), doc => {
            setQuestion({id: doc.id, ...doc.data()}); 
            fetchResponse(id)
            fetchUser(doc.data().user); 
        })
    }

    const fetchResponse = async (idQ) => {
        setResponses([])
        await onSnapshot(collection(fireDB, "Responses"),where("question", "==", idQ), querySnapshot => {
            let res = []
            querySnapshot.forEach((doc) => {
                res.push({...doc.data(), id : doc.id});
            });
            res = res.sort((a, b) => {
                return  a.createAt.seconds > b.createAt.seconds ? -1 : 1;
            })
            setResponses(res)
        })
    }


    useEffect(() => {
        fetchQuestion()
    }, []);

    const fetchUser = (user) => {
        axios.get(
            `http://${HOST}:${PORT}/api/user/get/${user}`,
            {
                headers: {
                    Authorization : `Bearer ${auth.user.token}`
                }
            }
        ).then(res => {
            setUser(res.data.user)
        }).catch((error) => {
        })
    }


    return (
        <div className=" w-11/12 mx-auto">
            <div className="text-2xl font-bold text-gray-800 mb-6">Question :</div>
            <div className="fixed right-6 bottom-6 z-50">
                <a href="#response-form" className="cursor-pointer  text-blue-600">
                    <FaCommentMedical  className="shadow-green-400" size={30}/>
                </a>
            </div>
            <hr className="border-gray-300 mb-4"/>
            <div className=" flex justify-between">
                <div className="text-center flex space-x-4 items-center justify-center">
                    { user && !user.picture
                        ? <div
                            className="mx-auto bg-blue-500 p-4 rounded-full h-16 w-16 flex items-center justify-center">
                            <FaUser color="#fff" size={28}/>
                        </div>
                        : <div className="mx-auto overflow-hidden  rounded-full w-16 h-16 flex items-center justify-center">
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
                <div className="space-x-3">
                    {question && question.keywords.map((key, index) => (
                        <span key={index} className="capitalize p-1 px-2 bg-blue-100 text-gray-800 font-semibold">#{key}</span>
                    ))}
                </div>
            </div>
            <div className=" flex mb-2">
                <div className="text-gray-800 font-bold mt-2">Libellé :</div>
                <span className="flex-1 text-center capitalize">{question && question.name}</span>
            </div>
            <div>
                <h2 className=" text-gray-800 font-bold">Description :</h2>
                <p className="m-3 text-sm text-justify tracking-widest">
                    {question && question.description}
                </p>
            </div>
            <hr id="response-form" className="border-gray-300 mt-4 mb-20"/>
            <ResponseForm />
            <div className="text-xl font-bold text-gray-800 mt-6">Réponses :</div>
            <div className="mt-10">
                {
                    responses  ? responses.map((response) => (
                        <Response key={response.id} response={response} />
                    )) : <img src={noData} alt=""/>
                }
            </div>
        </div>
    )
}

export default SpecificQuestion;