import { CiHome } from "react-icons/ci";
import { FaBox } from "react-icons/fa";
import { TfiTruck } from "react-icons/tfi";
import { MdSupportAgent } from "react-icons/md";


export const pages = [
    {page:'Home', link:'/productlisting', icon:CiHome },
    {page:'Orders', link:'/orderplacement', icon:FaBox },
    {page:'Tracking', link:'/liveordertracking' , icon:TfiTruck },
    {page:'Support', link:'/support', icon:MdSupportAgent },
];