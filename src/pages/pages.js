import { CiHome } from "react-icons/ci";
import { FaBox } from "react-icons/fa";
import { TfiTruck } from "react-icons/tfi";
import { MdSupportAgent } from "react-icons/md";


export const navLinks = [
    {page:'Home', to:'/productlisting', icon:CiHome },
    {page:'Orders', to:'/orderplacement', icon:FaBox },
    {page:'Tracking',to:'/liveordertracking' , icon:TfiTruck },
    {page:'Support', to:'/support', icon:MdSupportAgent },
];

// const navLinks = [
//   { label: 'Home', to: '/productlisting' },
//   { label: 'Orders', to: '/orderplacement' },
//   { label: 'Tracking', to: '/liveordertracking' },
//   { label: 'Support', to: '/aichat' },
// ]