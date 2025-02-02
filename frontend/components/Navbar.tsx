import Image from "next/image"
import logo from "../public/image/Logo-1.svg";
import Link from "next/link";
import { IoPersonOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { HiMiniShoppingBag } from "react-icons/hi2";


const Navbar = () => {
    return (
        <div className=" backdrop-blur-md bg-white/30 border-b border-white/20 sticky top-0 z-50">
            <div className="max-w-[85vw] flex items-center justify-between  mx-auto p-4 ">

                <div className="">
                    <Image src={logo} alt="xstore logo" />
                </div>
                <div className="space-x-8">
                    <Link href={"#"} className="hover:text-gray-600 transition-colors">Home</Link>
                    <Link href={"#"} className="hover:text-gray-600 transition-colors">Our Story</Link>
                    <Link href={"#"} className="hover:text-gray-600 transition-colors">Products</Link>
                    <Link href={"#"} className="hover:text-gray-600 transition-colors">Blog</Link>
                    <Link href={"#"} className="hover:text-gray-600 transition-colors">Contracts</Link>
                </div>
                <div className="flex gap-6">
                    <IoPersonOutline className="w-5 h-5 hover:text-gray-600 cursor-pointer transition-colors" />
                    <FaRegHeart className="w-5 h-5 hover:text-gray-600 cursor-pointer transition-colors" />
                    <HiMiniShoppingBag className="w-6 h-6 hover:text-gray-600 cursor-pointer transition-colors" />
                </div>
            </div>
        </div>
    )
}

export default Navbar