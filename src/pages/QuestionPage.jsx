import React from "react";
import Question from "../components/Question";


const QuestionPage = () => {

    return (
        <div>
            <div className="w-11/12 mx-auto">
                <span className="text-3xl">Sujets récents :</span>
            </div>
            <div className="mt-4 w-11/12 mx-auto">
                <Question question={{ titre : "", description: ""}} />
                <Question question={{ titre : "", description: ""}} />
                <Question question={{ titre : "", description: ""}} />
                <Question question={{ titre : "", description: ""}} />
            </div>
        </div>
    )
}

export default QuestionPage;