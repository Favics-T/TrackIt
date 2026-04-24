import { CiHome } from "react-icons/ci";
import { FaBox } from "react-icons/fa";
import { TfiTruck } from "react-icons/tfi";
import { MdSupportAgent } from "react-icons/md";


export const navLinks = [
    {page:'Home', to:'/productlisting', icon:CiHome },
    {page:'Orders', to:'/checkoutpage', icon:FaBox },
    {page:'Tracking',to:'/trackingpage' , icon:TfiTruck },
    {page:'Support', to:'/aichat', icon:MdSupportAgent },
];

