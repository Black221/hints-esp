import React from "react";
import { Route, Routes} from 'react-router-dom';
// import aidePng from "../assets/aide.png";
// import blob1 from "../assets/Vectordhtr.png";
// import blob2 from "../assets/blob2.png";
import ForumHead from "../components/ForumHead";
import QuestionPage from "./QuestionPage";
import SpecificQuestion from "./SpecificQuestion";

const Forum = () => {


    return (
        <div className="flex flex-col items-center min-h-screen bg-white">
            <ForumHead />
            <div className="mt-32 w-full">
                <Routes>
                    <Route path="/" element={
                        <QuestionPage />
                    } />
                    <Route path="/:id" element={
                        <SpecificQuestion />
                    } />
                </Routes>
            </div>
        </div>
    )
}


export default Forum;