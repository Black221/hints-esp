import React, {useEffect, useState} from "react";
import {useStateContext} from "../context/ContextProvider";
import cee from "../assets/Vector.png";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {HOST, PORT} from "../config/host";
import {useAuthContext} from "../context/AuthProvider";

const Redirection = () => {

    let navigate = useNavigate();
    const auth = useAuthContext();

    const [departments, setDepartments] = useState(null);
    const [department, setDepartment] = useState("");
    const [option, setOption] = useState("");
    const [formation, setFormation] = useState("");
    const [year, setYear] = useState(1);

    const fetchFormation = () => {
        axios.get(
            `http://${HOST}:${PORT}/api/department/get/all`,
            {
                headers: {
                    Authorization : `Bearer ${auth.user.token}`
                }
            }
        ).then(res => {
            setDepartments(res.data.departments)
            setDepartment(res.data.departments[0]._id)
        }).catch((error) => {
            auth.logout();
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(
            `http://${HOST}:${PORT}/api/user/update/formation/${userInfo._id}/${department}/${formation}/${option}`,
            {
                year
            },
            {
                headers: {
                    Authorization: `Bearer ${auth.user.token}`
                }
            }
        ).then(res => {
            fetchUser()
        }).catch((error) => {
            console.log(error.response)
        })
    }

    const fetchUser = () => {
        axios.get(
            `http://${HOST}:${PORT}/api/user/get/${auth.user.userId}`,
            {
                headers: {
                    Authorization : `Bearer ${auth.user.token}`
                }
            }
        ).then(res => {
            setUserInfo(res.data.user);
        }).catch((error) => {
            console.log(error)
            auth.logout();
        })
    }

    const {
        userInfo,
        setUserInfo
    } = useStateContext();

    useEffect(() => {
        if (auth.user)
            fetchFormation()
        else
            navigate("/connexion")
    }, [auth.user]);

    useEffect(() => {
       if (department && departments.filter((dep) => (dep._id === department))[0].formations_options[0])
           setFormation(departments
               .filter((dep) => (dep._id === department))[0]
               .formations_options[0]
               .formation._id)

    }, [department]);

    useEffect(() => {
        if (formation)
            setOption(departments
                .filter((dep) => (dep._id === department))[0]
                .formations_options.filter((o) => (o.formation._id === formation))[0]
                .option._id)

    }, [formation]);


    useEffect(() => {

        if (auth.user)
            if (userInfo) {
                if (userInfo.department)
                    navigate("/accueil")
            }

    }, [userInfo]);

    useEffect(() => {
        console.log(auth.user)
    }, []);


    return (
        <div className="">
            <div className="flex items-center justify-center h-screen bg-[#009DEC]">
                <div className="bg-white relative rounded-xl w-5/6  py-16 md:p-16 md:w-2/5 drop-shadow-xl">
                    <div className="absolute left-0 -top-24 text-center w-full">
                        <img src={cee} alt="" className="mx-auto w-44 drop-shadow-md"/>
                    </div>
                    <div className="md:w-2/3 px-6 md:px-0  mx-auto relative">
                        <form  className="space-y-5 text-[17px] flex flex-col items-center" onSubmit={handleSubmit}>
                            <div className="flex justify-between w-full">
                                <label htmlFor="#department"  className="font-semibold" >Departement</label>
                                <select id="department"
                                        onChange={(e) => setDepartment(e.target.value)}
                                        value={department}
                                        className="w-24">
                                    { departments && departments.map((dep, index) => (
                                        <option key={dep._id}
                                                value={dep._id}>{dep.abv}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex justify-between w-full">
                                <label htmlFor="#formation" className="font-semibold">Formation</label>
                                <select id="formation"
                                        onChange={(e) => setFormation(e.target.value)}
                                        value={formation}
                                        className="w-24">
                                    { departments && departments
                                        .filter((dep) => (dep._id === department))[0]
                                        .formations_options.map(({formation}, index) => (
                                            <option key={index}
                                                    value={formation._id}>{formation.abv}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="flex justify-between w-full">
                                <label htmlFor="option"  className="font-semibold">Option</label>
                                <select id="option"
                                        onChange={(e) => setOption(e.target.value)}
                                        value={option}
                                        className="w-24">
                                    { departments && formation && departments
                                        .filter((dep) => (dep._id === department))[0]
                                        .formations_options.filter((o) => (o.formation._id === formation))
                                        .map(({option}, index) => (
                                            <option key={index}
                                                    value={option._id}>{option.abv}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="flex justify-between w-full">
                                <label htmlFor=""  className="font-semibold">Année</label>
                                <input type="number"
                                       value={year}
                                       onChange={(e) => setYear( e.target.value)}
                                       max={
                                    departments && formation
                                    && departments.filter((dep) => (dep._id === department))[0].formations_options[0]
                                    && departments.filter((dep) => (dep._id === department))[0].formations_options.filter((o) => (o.formation._id === formation))[0]
                                        ? departments
                                            .filter((dep) => (dep._id === department))[0]
                                            .formations_options.filter((o) => (o.formation._id === formation))[0].formation.year
                                        : 1
                                } min="1" placeholder="1" className="pl-2 md:w-16"/>
                            </div>
                            <div className="text-center">
                                <input type="submit"
                                       value="Valider"
                                       className="cursor-pointer mt-10 p-2 px-6 mx-auto md:px-16 font-bold text-xl bg-sky-500 text-white rounded-md "/>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Redirection;