import React, {useEffect, useState} from "react";
import { icons } from "../data/dummy";
import Document from "../components/Document";
import vectorGreen from "../assets/Vectordhtr.png";
import axios from "axios";
import {useAuthContext} from "../context/AuthProvider";
import {useStateContext} from "../context/ContextProvider";
import fileLoad from "../assets/fileLoad.png"
import {HOST} from "../data/host";
import Moment from 'moment';


const Home = () => {

    const {
        userInfo,
        semester,
    } = useStateContext();

    const [matieres, setMatieres] = useState(null);
    const [matiereToRender, setMatiereToRender] = useState(null);
    const [documents, setDocuments] = useState(null)

    const auth = useAuthContext();


    const fetchMatieres = () => {
        axios.get(
            `http://${HOST}:4200/api/department/get/${userInfo.department}`,
            {
                headers: {
                    Authorization : `Bearer ${auth.user.token}`
                }
            }
        ).then(res => {
            const department = res.data.department;
            const formation = department.formations_options.filter((item) => (
                item.formation._id === userInfo.formation._id
                && item.option._id === userInfo.option._id
            ))[0];
            const year =  formation.years.filter((year) => (
                year.number === userInfo.year
            ))[0];
            setMatieres(year.semesters.filter((item) => (
                item.number === semester
            ))[0].matieres);
        }).catch((error) => {
            console.log(error)
        })
    }

    const fetchMatiere = (id) => {
        axios.get(
            `http://${HOST}:4200/api/department/matiere/get/${id}`,
            {
                headers: {
                    Authorization : `Bearer ${auth.user.token}`
                }
            }
        ).then(res => {
            setMatiereToRender(res.data.matiere)
        }).catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        if (userInfo)
            fetchMatieres()
    }, [userInfo])

    useEffect(() => {
       if (matieres)
           fetchMatiere(matieres[0]._id)
    }, [matieres]);


    useEffect(() => {

        if (matiereToRender) {
            let tmp = matiereToRender.files.reduce((r, o) => {
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
    }, [matiereToRender]);

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
                <div className="overflow-x-scroll border flex p-3 rounded-xl my-4 bg-blue-200 md:bg-blue-100 drop-shadow-md">
                    { matieres && matieres.map((matiere) => (
                        <div onClick={() => fetchMatiere(matiere._id)}
                             key={matiere._id}
                             className="cursor-pointer p-4 py-1 rounded-xl border bg-white mr-3 drop-shadow-md flex items-center">
                            {icons[`${matiere.icon}`]} <span className="ml-4 text-sm "> {matiere.name}</span>
                        </div>
                    ))}
                </div>
                <h1 className="text-2xl text-center font-bold text-blue-500">{matiereToRender && matiereToRender.name}</h1>
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