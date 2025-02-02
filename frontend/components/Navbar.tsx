import Image from "next/image"
import logo from "../public/image/Logo-1.svg";
import Link from "next/link";
import { IoPersonOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { HiMiniShoppingBag } from "react-icons/hi2";


const Navbar = () => {
    return (
        <div className="flex items-center justify-between max-w-7xl mx-auto p-4 sticky top-0">
            <div className="">

                <Image src={logo} alt="xstore logo" />
            </div>
            <div className="">

                <Link href={"#"}>Home</Link>
                <Link href={"#"}>Our Story</Link>
                <Link href={"#"}>Products</Link>
                <Link href={"#"}>Blog</Link>
                <Link href={"#"}>Contracts</Link>
            </div>
            <div className="flex">
                <IoPersonOutline />
                <FaRegHeart />
                <HiMiniShoppingBag />
            </div>

        </div>
    )
}

export default Navbar