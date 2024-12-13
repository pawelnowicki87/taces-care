import React from "react";
import { LucideIcon } from "lucide-react";
import LinksWithIcon from "../LinksWithIcon/LinksWithIcon";


interface Link {
  text: string;
  icon: LucideIcon;
  href: string;
}

interface LinksListProps {
  links: Link[];
}

export default function LinksList({ links }: LinksListProps) {
  return (
    <div className="flex flex-col gap-3 py-[8px] border-t border-grayBorder bg-white">
      {links.map((link, index) => (
        <LinksWithIcon key={index} text={link.text} icon={link.icon} href={link.href} />
      ))}
    </div>
  );
};
