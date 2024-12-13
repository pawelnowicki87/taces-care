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
                    <AccordionContent className="pl-4 pb-2"><a href="#numer-zgloszenia" className="hover:underline">Numer zgłoszenia</a></AccordionContent>
                    <AccordionContent className="pl-4 pb-2"><a href="#rodzaj-wizyty" className="hover:underline">Rodzaj wizyty</a></AccordionContent>
                    <AccordionContent className="pl-4 pb-2"><a href="#specjalizacja" className="hover:underline">Specjalizacja</a></AccordionContent>
                    <AccordionContent className="pl-4 pb-2"><a href="#data-wizyty" className="hover:underline">Data Wizyty</a></AccordionContent>
                    <AccordionContent className="pl-4 pb-2"><a href="#temat" className="hover:underline">Temat</a></AccordionContent>
                    <AccordionContent className="pl-4 pb-2"><a href="#dodatkowe-informacje" className="hover:underline">Dodatkowe informacje</a></AccordionContent>
                    <AccordionContent className="pl-4 pb-2"><a href="#jezyk-wizyty" className="hover:underline">Język wizyty</a></AccordionContent>
                    <AccordionContent className="pl-4 pb-2"><a href="#kod-rabatowy" className="hover:underline">Kod rabatowy</a></AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3" className="border-0">
                    <AccordionTrigger className="hover:no-underline">Pacjent</AccordionTrigger>
                    <AccordionContent className="pl-4 pb-2"><a href="#kraj" className="hover:underline">Kraj</a></AccordionContent>
                    <AccordionContent className="pl-4 pb-2"><a href="#wiek-pacjenta" className="hover:underline">Wiek pacjenta</a></AccordionContent>
                    <AccordionContent className="pl-4 pb-2"><a href="#dane-pacjenta" className="hover:underline">Dane pacjenta</a></AccordionContent>
                    <AccordionContent className="pl-4 pb-2"><a href="#objawy" className="hover:underline">Objawy</a></AccordionContent>
                    <AccordionContent className="pl-4 pb-2"><a href="#dokument" className="hover:underline">Dokument</a></AccordionContent>
                    <AccordionContent className="pl-4 pb-2"><a href="#dane-adresowe" className="hover:underline">Dane adresowe</a></AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}
