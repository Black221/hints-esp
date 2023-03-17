import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAuthContext} from "../context/AuthProvider";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import {fireDB} from '../data/firebase';

const QuestionForm = () => {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [department, setDepartment] = useState("");
    const [inputKeywords, setKeywords] = useState("");

    const auth = useAuthContext();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const keywords = inputKeywords.split(' ');

        try {
            const docRef = await addDoc(collection(fireDB, "Questions"), {
                name, description, department, keywords, user :auth.user.userId,
                createAt: Timestamp.now()
            });
            console.log("Document written with ID: ", docRef.id);
            navigate('/forum');
        } catch (e) {
            console.error("Error adding document: ", e);
        }

    }

    return (
        <div className="w-full flex bg-white min-h-screen">
            <div className="md:mt-10 mt-20 w-full">
                <h1 className="ml-1 text-xl text-blue-500 font-bold">Décrivez nous votre problème</h1>
                <form className="w-full" onSubmit={handleSubmit}>
                    <div className="flex items-center text-xl m-3">
                        <div>
                            <label htmlFor="subject">Libellé</label>
                            <input type="text"
                                   value={name}
                                   onChange={(e) => setName(e.target.value)}
                                   placeholder="Libellé"
                                   className="block mt-2 text-[16px] border-2 border-blue-300 rounded-xl w-full md:block px-3 p-1 md:w-80 focus:outline focus:outline-0"
                                   id="subject"/>
                        </div>
                        {/* <div className="md:ml-20">
                            <label htmlFor="category" className="md:mr-10">Département :</label>
                            <select id="category"
                                    value={department}
                                    onChange={(e) => setDepartment(e.target.value)}
                                    className="border-b-2 border-blue-300">
                                <option value="autre">Tout</option>
                                <option value="Informatique">Informatique</option>
                                <option value="GCBA">GCBA</option>
                                <option value="Gestion">Gestion</option>
                                <option value="Mécanique">Mécanique</option>
                                <option value="Civil">Civil</option>
                                <option value="Électrique">Électrique</option>
                            </select>
                        </div> */}
                    </div>
                    <div className="m-3">
                        <label htmlFor="description" className="text-xl">Description</label>
                        <div>
                            <textarea id="description"
                                      value={description}
                                      onChange={(e) => setDescription(e.target.value)}
                                      
                                      placeholder="Détaillez votre problème ici"
                                      className="w-full h-36 mt-2 p-2 border-2 border-blue-300 rounded-xl px-3 focus:outline focus:outline-0">
                            </textarea>
                        </div>
                    </div>
                    <div className="m-3">
                        <label htmlFor="ref" className="text-xl">Mot-clés <small className="text-gray-600">(8 max)</small></label>
                        <div>
                           <div className="flex items-center">
                               {inputKeywords && inputKeywords.split(' ').map((key, index) => (
                                   (index <= 8)
                                       ? <div key={index} className="p-1 px-2 bg-blue-100 text-gray-800 font-semibold mr-2">#{key}</div>
                                       : (index === 9) && <span className="text-red-500"> MAX </span>
                               ))}
                           </div>
                            <input type="text"
                                   value={inputKeywords}
                                   onChange={(e) => {
                                       if (e.target.value.split(' ').length <= 8)
                                           setKeywords(e.target.value)
                                   }}
                                   placeholder="Mot-clés"
                                   className="mt-2 text-[16px] border-2 border-blue-300 rounded-xl w-full md:block px-3 p-2  focus:outline focus:outline-0"
                                   id="ref"/>
                        </div>
                    </div>
                    <div className="w-full ml-4 mt-5">
                        <input type="submit" value="Envoyer" className="cursor-pointer font-bold p-2 text-white bg-green-500 rounded-md drop-shadow-md px-5 "/>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default QuestionForm;