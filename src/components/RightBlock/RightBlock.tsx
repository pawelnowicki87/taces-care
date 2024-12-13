import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"

export default function RightBlock() {
    return (
        <div className="w-[190px] bg-white h-auto p-4 font-medium text-[14px] leading-[21px]" >
            <Accordion type="multiple" className="text-[14px] leading-[21px]">
                <AccordionItem value="item-1" className="border-0">
                    <AccordionTrigger className="hover:no-underline">Przejdź do</AccordionTrigger>
                </AccordionItem>
                <AccordionItem value="item-2" className="border-0">
                    <AccordionTrigger className="hover:no-underline">Wizta</AccordionTrigger>
                    <AccordionContent className="pl-4 pb-2">Numer zgłoszenia</AccordionContent>
                    <AccordionContent className="pl-4 pb-2">Rodzaj wizyty</AccordionContent>
                    <AccordionContent className="pl-4 pb-2">Specjalizacja</AccordionContent>
                    <AccordionContent className="pl-4 pb-2">Data Wizyty</AccordionContent>
                    <AccordionContent className="pl-4 pb-2">Temat</AccordionContent>
                    <AccordionContent className="pl-4 pb-2">Dodatkowe informacje</AccordionContent>
                    <AccordionContent className="pl-4 pb-2">Język wizyty</AccordionContent>
                    <AccordionContent className="pl-4 pb-2">Kod rabatowy</AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3" className="border-0">
                    <AccordionTrigger className="hover:no-underline">Pacjent</AccordionTrigger>
                    <AccordionContent className="pl-4 pb-2">Kraj</AccordionContent>
                    <AccordionContent className="pl-4 pb-2">Wiek pacjenta</AccordionContent>
                    <AccordionContent className="pl-4 pb-2">Dane pacjenta</AccordionContent>
                    <AccordionContent className="pl-4 pb-2">Objawy</AccordionContent>
                    <AccordionContent className="pl-4 pb-2">Dokument</AccordionContent>
                    <AccordionContent className="pl-4 pb-2">Dane adresowe</AccordionContent>
                </AccordionItem>
            </Accordion>

        </div>
    )
}