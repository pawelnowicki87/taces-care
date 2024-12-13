import logo from "@/assets/images/avatar.png";
import Image from "next/image";

export default function Hero() {
    return (
        <div className="w-[247px] h-[163px] mb-[16px]">
            <Image className="w-[80px] h-[80px] rounded-full" priority src={logo} alt="Follow us on Twitter" />
            <div>
                <p className="text-navy700 font-bold text-[18px] leading-[27px] mt-3">Imię Nazwisko</p>
                <p className="text-gray font-normal text-[16px] leading-[24px]">Operator</p>
                <p className="text-gray font-normal text-[16px] leading-[24px]">name@gmail.com</p>
            </div>
        </div>
    )
}