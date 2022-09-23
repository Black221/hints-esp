import React from "react";


const QuestionForm = () => {

    return (
        <div className="w-full flex justify-center bg-white min-h-screen">
            <div className="mt-10">
                <h1 className="text-xl text-blue-500 font-bold">Décrivez nous votre problème</h1>
                <form>
                    <div className="flex items-center text-xl m-3">
                        <div>
                            <label htmlFor="subject">Libellé</label>
                            <input type="text"
                                   placeholder="Libellé"
                                   className="block mt-2 text-[16px] border-2 border-blue-300 rounded-xl w-full md:block px-3 p-1 md:w-80 focus:outline focus:outline-0"
                                   id="subject"/>
                        </div>
                        <div className="ml-20">
                            <label htmlFor="category" className="mr-10">Catégorie :</label>
                            <select id="category" className="border-b-2 border-blue-300">
                                <option value="autre">Autre</option>
                                <option value="autre">Informatique</option>
                            </select>
                        </div>
                    </div>
                    <div className="m-3">
                        <label htmlFor="description" className="text-xl">Description</label>
                        <div>
                            <textarea id="description"
                                      cols="80"
                                      rows="7"
                                      placeholder="Détaillez votre problème ici"
                                      className="mt-2 p-2 border-2 border-blue-300 rounded-xl px-3 focus:outline focus:outline-0">
                            </textarea>
                        </div>
                    </div>
                    <div className="m-3">
                        <label htmlFor="ref" className="text-xl">Mot-clés</label>
                        <div>
                            <input type="text"
                                   placeholder="séparez chaque mot-clé par un points virgule"
                                   className="mt-2 text-[16px] border-2 border-blue-300 rounded-xl w-full md:block px-3 p-2  focus:outline focus:outline-0"
                                   id="ref"/>
                        </div>
                    </div>
                    <div className="w-full ml-4 mt-5">
                        <input type="submit" value="Envoyer" className="font-bold p-2 text-white bg-green-500 rounded-md drop-shadow-md px-5 "/>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default QuestionForm;