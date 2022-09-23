import React from "react";

const ResponseForm = () => {

    return (
        <div className=" flex flex-col items-center justify-center">
            <form>
                <h1 className="mt-4 text-2xl text-blue-500 font-bold">Ajouter une réponse</h1>
                <div className="m-10 mt-4">
                    <textarea id="description"
                              cols="80"
                              rows="7"
                              placeholder="Détaillez votre problème ici"
                              className="mt-2 p-2 border-2 border-blue-300 rounded-xl px-3 focus:outline focus:outline-0">
                            </textarea>
                </div>
                <div className="w-full ml-4 mt-5">
                    <input type="submit" value="Envoyer" className="font-bold p-2 text-white bg-green-500 rounded-md drop-shadow-md px-5 "/>
                </div>
            </form>
            <hr className="w-full border-gray-300 mt-20"/>
        </div>
    )
}

export default ResponseForm;