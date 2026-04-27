import { CiHome } from "react-icons/ci";
import { FaBox } from "react-icons/fa";
import { TfiTruck } from "react-icons/tfi";
import { MdSupportAgent } from "react-icons/md";


export const navLinks = [
  { label: 'Home',     page: 'Home',     to: '/productlisting', icon: CiHome         },
  { label: 'Orders',   page: 'Orders',   to: '/checkoutpage',   icon: FaBox          },
  { label: 'Tracking', page: 'Tracking', to: '/trackingpage',   icon: TfiTruck       },
  { label: 'Support',  page: 'Support',  to: '/aichat',         icon: MdSupportAgent },
]

