import { Globe } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const LanguageSelect = () => {
  return (
    <Select defaultValue="pl">
      <SelectTrigger className="gap-x-2 border-none p-0 text-primary shadow-none">
        <Globe size={16} /> <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="pl">PL</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
export default LanguageSelect;
