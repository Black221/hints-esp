import React from 'react';
import {FaHome} from 'react-icons/fa'
import {IoMdHelpCircle} from "react-icons/io";
import {RiSettings5Fill} from "react-icons/ri";
import {TbMath} from "react-icons/tb";


export const links = [
    {
        name: 'accueil',
        icon: <FaHome size={30} />,
    },
    {
        name: 'compte',
        icon: <RiSettings5Fill size={30} />
    },
    {
        name: 'aide',
        icon: <IoMdHelpCircle size={30} />,
    },
];

export const departments = [
    {
        id: "DGI",
        name : 'Génie Informatique',
        level: [
            {
                title : 'DUT 1',
                options : [
                    {
                        id: 'Inf',
                        name: 'Informatique',
                        matieres: [
                            {
                                name: 'Maths discret',
                                icon: <TbMath color="lightblue" size={35} />
                            },
                            {
                                name: 'Maths informatique',
                                icon: <TbMath color="lightblue" size={35} />
                            },
                            {
                                name: 'Maths ',
                                icon: <TbMath color="lightblue" size={35} />
                            },
                            {
                                name: 'Droit ',
                                icon: <TbMath color="lightblue" size={35} />
                            }
                        ]
                    }
                ],
            },
            {
                title : 'DUT 2',
                options : [
                    {
                        id: 'TR',
                        name: 'Réseau et Télécommunication',
                        matieres: [

                        ]
                    }
                ],
            }
        ]
    },
    {
        id: "DGE",
        name : 'Génie Electrique',
        level: [
            {
                title : '',
                options : [
                    {
                        name: '',
                        matieres: [

                        ]
                    }
                ]
            }
        ]
    },
    {
        id: "GCBA",
        name : 'Génie Chimique et Biologie Appliquée',
        level: [
            {
                title : '',
                options : [
                    {
                        name: '',
                        matieres: [

                        ]
                    }
                ]
            }
        ]
    },
    {
        id: "GC",
        name : 'Génie Civile',
        level: [
            {
                title : '',
                options : [
                    {
                        name: '',
                        matieres: [

                        ]
                    }
                ]
            }
        ]
    },
    {
        id: "DGM",
        name : 'Génie Mécanique',
        level: [
            {
                title : '',
                options : [
                    {
                        name: '',
                        matieres: [

                        ]
                    }
                ]
            }
        ]
    },
    {
        id: "DG",
        name : 'Gestion',
        level: [
            {
                title : '',
                options : [
                    {
                        name: '',
                        matieres: [

                        ]
                    }
                ]
            }
        ]
    }
]