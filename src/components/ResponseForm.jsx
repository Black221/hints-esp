import React, {useState} from "react";
import {useParams} from "react-router-dom";
import {useAuthContext} from "../context/AuthProvider";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import {fireDB} from '../data/firebase';


const ResponseForm = () => {

    const [description, setDescription] = useState("");
    const auth = useAuthContext()
    const {id} = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await addDoc(collection(fireDB, "Responses"), {
                description, question : id,user : auth.user.userId,
                createAt: Timestamp.now()
            });
            setDescription("")
        } catch (e) {
        }
    }

    return (
        <div className="w-full flex flex-col items-center justify-center">
            <form className="w-full" onSubmit={handleSubmit}>
                <h1 className="md:mt-4 text-2xl text-blue-500 font-bold">Ajouter une réponse</h1>
                <div className="w-full mt-4">
                    <textarea id="description"
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                              placeholder="Détaillez votre problème ici"
                              className="w-full h-36 mt-2 p-2 border-2 border-blue-300 rounded-xl px-3 focus:outline focus:outline-0">
                            </textarea>
                </div>
                <div className="w-full  mt-4">
                    <input type="submit" value="Envoyer" className="cursor-pointer font-bold p-2 text-white bg-green-500 rounded-md drop-shadow-md px-5 "/>
                </div>
            </form>
            <hr className="w-full border-gray-300 mt-20"/>
        </div>
    )
}

export default ResponseForm;