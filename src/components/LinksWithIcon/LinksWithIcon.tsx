import { LucideIcon } from "lucide-react";
import React from "react";

interface LinkWithIconProps {
    text: string;
    icon: LucideIcon;
    href: string;
  }

export default function LinkWithIcon({ text, icon: Icon, href }: LinkWithIconProps) {
  return (
    <a href={href} className="flex items-center space-x-2 font-medium text-[16px] leading-[24px] hover:text-primary hover:font-bold">
      {Icon && <Icon className="w-5 h-5" />}
      <span>{text}</span>
    </a>
  );
};