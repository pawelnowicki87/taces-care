import { BriefcaseMedical, CalendarDays, ChartNoAxesCombined, CircleHelp, Headset, Hospital, House, Layers2, LogOut, NotebookTabs, Settings } from "lucide-react";
import Hero from "../Hero/Hero";
import LinksList from "../LinksList/LinksList";
import Image from "next/image";
import Link from "next/link";


import logo from "@/assets/icons/LogoSmall.svg";

const fullLinkList = [
    { text: "Strona główna", icon: House, href: "#" },
    { text: "Wizyty online", icon: Headset, href: "#" },
    { text: "Wizyty domowe", icon: BriefcaseMedical, href: "#" },
    { text: "Wizyty stacjonarne", icon: Hospital, href: "#" },
    { text: "Druga opinia", icon: Layers2, href: "#" },
    { text: "Dziennik aktywności", icon: NotebookTabs, href: "#" },
    { text: "Kalendarz specjalistów", icon: CalendarDays, href: "#" },
    { text: "Raporty", icon: ChartNoAxesCombined, href: "#" },
  ];

const faq = [
    { text: "Ustawienia", icon: Settings, href: "#" },
    { text: "FAQ", icon: CircleHelp, href: "#" },
  ];

const logOut = [
    { text: "Wyloguj się", icon: LogOut, href: "#" }
  ];

export default function LeftBlock() {
    return (
        <div className="w-[20%] flex flex-col justify-between ">
          <div className="p-6 bg-white">
            <Hero />
            <LinksList links={fullLinkList} />
            <LinksList links={faq} />
            <LinksList links={logOut} />
          </div>

          <div className="mt-12">
            <Link href={"#"}>
              <Image src={logo} alt="Logo if takecare" />
            </Link>
            <p className="text-gray text-[14px] leading-[19.6px]">© www.takes-care.com 2024</p>
          </div>
        </div>
    )

}