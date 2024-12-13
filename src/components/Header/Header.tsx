import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/icons/logo.svg";
import { Button } from "@/components/ui/button";
import { Bug, CalendarPlus2 } from "lucide-react";
import LanguageSelect from "@/components/Header/LanguageSelect";

const Header = () => {
  return (
    <header className="fixed left-0 top-0 z-20 h-[96px] w-full border-[1px] border-b-lightGray bg-white border-b border-grayBorder">
      <div className="mx-auto flex h-full w-11/12 max-w-[1440px] items-center justify-between">
        <Link href="/public">
          <Image priority src={logo} alt="Follow us on Twitter" />
        </Link>
        <div className={"flex items-center gap-x-6"}>
          <Button
            variant="outline"
            className="border-red400 h-fit px-6 py-3 text-base text-red hover:text-red">
            <Bug className="text-red" /> Zgłoś problem
          </Button>
          <Button className="h-fit px-6 py-3 text-base text-white">
            <CalendarPlus2 /> Umów wizytę
          </Button>
          <LanguageSelect />
        </div>
      </div>
    </header>
  );
};
export default Header;
