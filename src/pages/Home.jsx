import React, {useEffect, useState} from "react";
import { icons } from "../data/dummy";
import Document from "../components/Document";
import vectorGreen from "../assets/Vectordhtr.png";
import axios from "axios";
import {useAuthContext} from "../context/AuthProvider";
import {useStateContext} from "../context/ContextProvider";
import fileLoad from "../assets/fileLoad.png"
import {HOST, PORT} from "../config/host";
import Moment from 'moment';


const Home = () => {

    const {
        userInfo,
    } = useStateContext();

    const [courses, setCourses] = useState(null);
    const [courseToRender, setCourseToRender] = useState(null);
    const [documents, setDocuments] = useState(null)

    const auth = useAuthContext();


    const fetchCourses = () => {
        axios.get(
            `http://${HOST}:${PORT}/api/course/get/user/${userInfo._id}`,
            {
                headers: {
                    Authorization : `Bearer ${auth.user.token}`
                }
            }
        ).then(res => {
            setCourses(res.data.courses);
        }).catch((error) => {
        })
    }

    const fetchCourse = (id) => {
        axios.get(
            `http://${HOST}:4200/api/department/course/get/${id}`,
            {
                headers: {
                    Authorization : `Bearer ${auth.user.token}`
                }
            }
        ).then(res => {
            setCourseToRender(res.data.course)
        }).catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        if (userInfo)
            fetchCourses()
    }, [userInfo])

    useEffect(() => {
       if (courses && courses[0])
           fetchCourse(courses[0]._id)
    }, [courses]);


    useEffect(() => {

        if (courseToRender) {
            let tmp = courseToRender.files.reduce((r, o) => {
                    r[o.date.split('/')[2]] = r[o.date.split('/')[2]] || []
                    r[o.date.split('/')[2]].push(o)
                    return r;
                },
                Object.create(null)
            );
            let result = [];
            Object.keys(tmp).forEach(k => {
                result.push(
                    tmp[k].map(v => ({date: k, data: v}))
                );
            })

            result.sort((a,b) => {
                return b[0].date - a[0].date
            })
            setDocuments(result);
        }
    }, [courseToRender]);

    useEffect(() => {
        if (documents)
            console.log(documents)
    }, [documents]);


    return (
        <div className='md:mt-20 mt-24 flex flex-col  w-full items-center mb-20'>
            <div className="absolute -right-5 md:right-16 w-44 flex flex-col text-white items-center justify-center top-5 bg-semester text-center">
                <img src={vectorGreen}  alt="" className="absolute drop-shadow-md"/>
                <div className="relative text-xl font-semibold italic"> Semestre 1</div>
                <div className="relative "> { Moment().format('DD-MM-YYYY')} </div>
            </div>
            <div className="text-start w-full md:px-10">
                <h1 className="text-2xl font-bold text-gray-700 ml-4">Matières</h1>
                <div className="overflow-x-auto border flex p-3 rounded-xl my-4 bg-blue-200 md:bg-blue-100 drop-shadow-md">
                    {  courses && courses[0] ? courses.map((course) => (
                        <div onClick={() => fetchCourse(course._id)}
                             key={course._id}
                             className="min-w-fit cursor-pointer p-4 py-1 rounded-xl border bg-white mr-3 drop-shadow-md flex items-center">
                            {icons[`${course.icon}`]} <span className="ml-4 text-sm "> {course.name}</span>
                        </div>
                    )) : <p className="text-center w-full">
                        Matiere indisponible
                    </p>}
                </div>
                <h1 className="text-2xl text-center font-bold text-blue-500">{courseToRender && courseToRender.name}</h1>
                <div className="mt-7">
                    {documents && documents[0] ? documents.map((doc, index) => (
                        <Document key={index} date={doc[0].date} data={doc} />
                    )) : <div className="flex flex-col items-center justify-center">
                        <img src={fileLoad} alt=""/>
                        Aucun fichier trouvé.
                    </div>}

                </div>
            </div>
        </div>
    )
};

export default Home;