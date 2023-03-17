import React, {useEffect, useState} from "react";
import Question from "../components/Question";
import { fireDB } from "../data/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import noData from "../assets/noData.png";
import {useStateContext} from "../context/ContextProvider";

const QuestionPage = () => {

    //const auth = useAuthContext();
    const [questions, setQuestions] = useState(null);
    const {search} = useStateContext();

    const fetchQuestions = async () => {
        setQuestions([])
        await onSnapshot(collection(fireDB, "Questions"), querySnapshot => {
            let res = []
            querySnapshot.forEach((doc) => {
                res.push({...doc.data(), id : doc.id});
            });
            setQuestions(res)
        })
    }

    useEffect(() => {
       fetchQuestions()
    }, []);

    useEffect(() => {
        
        if (search)
            setQuestions((Q) => (
                Q.filter((q) => (q.description.toUpperCase().search(search.toUpperCase()) !== -1 ||
                                 q.name.toUpperCase().search(search.toUpperCase()) !== -1 ||
                                 q.keywords.filter(k => (k.toUpperCase().search(search.toUpperCase()) !== -1 ))[0])
            )))
        else
            fetchQuestions()
    }, [search]);

    return (
        <div>
            <div className="w-11/12 mx-auto">
                <span className="text-3xl">Sujets récents :</span>
            </div>
            <div className="mt-4 w-11/12 mx-auto">
                {questions && questions[0] ? questions.map((question) => (
                    <Question key={question.id} question={question} />
                )) :<div>
                    <img src={noData} alt="no data" className="self-center mx-auto mt-10"/>
                    <p className="mx-auto w-min whitespace-nowrap mt-4 text-xl">Aucun de sujet trouvé.</p>
                </div> }
            </div>
        </div>
    )
}

export default QuestionPage;