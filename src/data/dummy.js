import React from 'react';
import {FaBalanceScaleLeft, FaHome} from 'react-icons/fa'
import {IoMdHelpCircle} from "react-icons/io";
import {RiSettings5Fill} from "react-icons/ri";
import {TbMath, TbMathFunction, TbNetwork} from "react-icons/tb";
import {GiReceiveMoney} from "react-icons/gi";


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
        name: 'forum',
        icon: <IoMdHelpCircle size={30} />,
    },
];

export const icons = {
    'TbMathFunction': <TbMathFunction color="lightblue" size={35} />,
    'TbMath': <TbMath color="lightblue" size={35} />,
    'FaBalanceScaleLeft': <FaBalanceScaleLeft color="lightblue" size={35} />,
    'GiReceiveMoney': <GiReceiveMoney color="lightblue" size={35} />,
    'TbNetwork': <TbNetwork color="lightblue" size={35} />,
}