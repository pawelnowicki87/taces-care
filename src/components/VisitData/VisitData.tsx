"use client";

import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { useState } from "react";
import { addDays, format } from "date-fns"
 
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";


const formSchema = z.object({
  visitType: z
        .string()
        .refine((value) => ["Wizyta online", "Wizyta domowa", "Ambulatiorium"].includes(value), {
        message: "Please select a valid option.",
        }),
    specialization: z
    .string()
    .refine((value) => ["kardiolog", "internista", "urolog"].includes(value), {
    message: "Please select a valid option.",
    }),
    topic: z
    .string()
    .refine((value) => ["leczenie", "recepta", "dawkowanie"].includes(value), {
    message: "Please select a valid option.",
    }),
    language: z
    .string()
    .refine((value) => ["polish", "english", "sweeden"].includes(value), {
    message: "Please select a valid option.",
    }),
    textArea: z.string().min(1, {
        message: "This field cannot be empty.",
      }).max(500, {
        message: "Text is too long. Maximum length is 500 characters.",
      }),
    caseNumber: z
        .string().nonempty({ message: "Numer zgłoszenia jest wymagany" }),
    visitDate: z
    .string()
    .refine((value) => ["asap", "lateMonths"].includes(value), {
    message: "Please select a valid option.",
    }),
    visitHours: z.object({
        start: z.string().refine(value => /^([01]?[0-9]|2[0-3]):([0-5]?[0-9])$/.test(value), {
          message: "Invalid start time",
        }),
        end: z.string().refine(value => /^([01]?[0-9]|2[0-3]):([0-5]?[0-9])$/.test(value), {
          message: "Invalid end time",
        })
      }).refine(data => data.start <= data.end, {
        message: "Start time must be earlier than end time",
      }),
      patientAge: z
    .string()
    .refine((value) => ["Dorosły", "Dziecko"].includes(value), {
      message: "Please select a valid option for patient age.",
    }),
    patientData: z.object({
      name: z.string().min(1, { message: "Imię jest wymagane" }),
      surname: z.string().min(1, { message: "Nazwisko jest wymagane" }),
    }),
    symptoms: z.string().optional(),
    document: z.object({
      type: z.string().refine((value) => ["PESEL", "Paszport"].includes(value), {
        message: "Please select PESEL or Paszport",
      }),
      number: z.string().nonempty({ message: "Numer dokumentu jest wymagany" }),
      birthDate: z.string().nonempty({ message: "Data urodzenia jest wymagana" }),
      date: z.date().optional(),
      pesel: z.string().optional(),
      passport: z.string().optional(),
    }),
    passport: z.string().optional(),
    pesel: z
      .string()
      .min(11, { message: "PESEL musi mieć dokładnie 11 cyfr" })
      .max(11, { message: "PESEL musi mieć dokładnie 11 cyfr" }),
    birthDate: z.string().nonempty({ message: "Data urodzenia jest wymagana" }),

});

const extractDateFromPESEL = (pesel: string) => {
  if (pesel.length !== 11) return null;

  const yearPrefix = parseInt(pesel.substring(0, 2)); // Pierwsze dwa znaki to rok
  let month = parseInt(pesel.substring(2, 4)); // Kolejne dwa to miesiąc
  const day = parseInt(pesel.substring(4, 6)); // Kolejne dwa to dzień

  let year = 1900 + yearPrefix; // Przyjmujemy wiek 1900-1999
  if (month > 20) {
    year = 2000 + yearPrefix; // Jeśli miesiąc > 20, to rok 2000-2099
    month -= 20; // Aby uzyskać poprawny miesiąc
  }

  // Tworzymy obiekt Date z tych wartości
  return new Date(year, month - 1, day); // month - 1 ponieważ w JS miesiące zaczynają się od 0
};


export default function VisitData() {
const [isChecked, setIsChecked] = useState(false);
const [date, setDate] = React.useState<Date>()
const [isCheckedAdress, setIsCheckedAdress] = useState(false);

const handleChangeAdress = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsCheckedAdress(event.target.checked);
};

const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
};

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      visitType: "",
      specialization: "",
      topic: "",
      language: "",
      textArea: "",
      caseNumber: "",
      visitDate: "",
      visitHours: {
        start: "",
        end: "",
      },
      patientAge: "",
      patientData: {
        name: "",
        surname: "",
      },
      symptoms: "",
      document: {
        type: "",
        number: "",
        birthDate: "",
      }
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values); // Logowanie danych po przesłaniu formularza
  }

  return (
    <div>
      <h1 className="font-light text-[24px] leading-[28.8px] text-darkBlue">Wizyta</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} >
            <FormField
            control={form.control}
            name="caseNumber"
            render={({ field }) => (
              <FormItem className="mt-4" id="numer-zgloszenia">
                <FormLabel className="font-bold text-base leading-6 text-darkBlue">Numer zgłoszenia</FormLabel>
                <Input {...field} type="text" placeholder="Wpisz numer zgłoszenia" className="w-full border-0 p-[0px] text-gray border-b-2 rounded-none" />
              </FormItem>
            )}
            />

            <FormField
            control={form.control}
            name="visitType"
            render={({ field }) => (
              <FormItem className="mt-4" id="rodzaj-wizyty">
                <FormLabel className="font-bold text-base leading-6 text-darkBlue">Rodzaj wizyty</FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(value)}
                  value={field.value}
                >
                  <SelectTrigger className="w-full border-0 p-[0px] text-gray border-b-2 rounded-none">
                    <SelectValue  placeholder="Wybierz rodzaj wizyty" />
                  </SelectTrigger>
                  <SelectContent >
                    <SelectItem value="Wizyta online">Wizyta online</SelectItem>
                    <SelectItem value="Wizyta domowa">Wizyta domowa</SelectItem>
                    <SelectItem value="Ambulatiorium">Ambulatiorium</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
            />

            <FormField
            control={form.control}
            name="specialization"
            render={({ field }) => (
              <FormItem className="mt-4" id="specjalizacja">
                <FormLabel className="font-bold text-base leading-6 text-darkBlue">Specjalizacja</FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(value)}
                  value={field.value}
                >
                  <SelectTrigger className="w-full border-0 p-[0px] text-gray border-b-2 rounded-none">
                    <SelectValue  placeholder="Wybierz rodzaj wizyty" />
                  </SelectTrigger>
                  <SelectContent >
                    <SelectItem value="kardiolog">Kardiolog</SelectItem>
                    <SelectItem value="internista">Internista</SelectItem>
                    <SelectItem value="urolog">Urolog</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
            />

            <FormField
            control={form.control}
            name="caseNumber"
            render={() => (
              <FormItem className="mt-4" id="data-wizyty">
                <FormLabel className="font-bold text-base leading-6 text-darkBlue">Data wizyty</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                    "w-full justify-start text-left font-normal p-[0px]  border-0 text-gray border-b-2 rounded-none ",
                    !date && "text-muted-foreground"
                    )}
                  >
                    {date ? format(date, "PPP") : <span>Jak najszybciej</span>}
                  </Button>
                  </PopoverTrigger>
                  <PopoverContent className="flex w-full flex-col space-y-2 p-2">
                  
                  <div className="rounded-md border">
                    <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={{ before: new Date(), after: addDays(new Date(), 3) }}
                    />
                  </div>
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
            />

            <div className="flex items-center mt-2">
                <input
                    type="checkbox"
                    id="terms"
                    checked={isChecked}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-500 border-gray-300 focus:ring-2 focus:ring-blue-500"
                />
                <label
                    htmlFor="terms"
                    className="font-normal text-sm leading-[19.6px] pl-4"
                >
                    Wybierz konkretny przedział godzinowy
                </label>
            </div>

            {isChecked && 
            <FormField
            control={form.control}
            name="visitHours"
            render={({ field }) => (
              <FormItem className="mt-4">
                <FormLabel className="font-bold text-base leading-6 text-darkBlue">Godzina</FormLabel>
                <div className="flex space-x-4">
                  {/* Godzina - Od */}
                  <div className="w-1/2">
                    <Select
                      onValueChange={(value) => field.onChange({ ...field.value, start: value })}
                      value={field.value?.start || ""}
                    >
                      <SelectTrigger className="w-full border-0 p-[0px] text-gray border-b-2 rounded-none">
                        <SelectValue placeholder="Od" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 24 }, (_, index) => {
                          const hour = String(index).padStart(2, "0");
                          const currentDate = new Date();
                          const selectedDate = date ? new Date(date) : null;
                          const isToday = selectedDate && selectedDate.toDateString() === currentDate.toDateString();
                          const minHour = isToday ? Math.ceil(currentDate.getHours() / 1) + 2 : 0;
                          if (index >= minHour && index <= 22) {
                            return (
                              <SelectItem key={index} value={hour}>
                                {hour}:00
                              </SelectItem>
                            );
                          }
                          return null;
                        })}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Godzina - Do */}
                  <div className="w-1/2">
                    <Select
                      onValueChange={(value) => field.onChange({ ...field.value, end: value })}
                      value={field.value?.end || ""}
                    >
                      <SelectTrigger className="w-full border-0 p-[0px] text-gray border-b-2 rounded-none">
                        <SelectValue placeholder="Do" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 24 }, (_, index) => {
                          const hour = String(index).padStart(2, "0");
                          const fromHour = field.value?.start ? parseInt(field.value.start) + 1 : 0;
                          if (index >= fromHour && index <= 23) {
                            return (
                              <SelectItem key={index} value={hour}>
                                {hour}:00
                              </SelectItem>
                            );
                          }
                          return null;
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </FormItem>
            )}
            />}
            

            <FormField
            control={form.control}
            name="topic"
            render={({ field }) => (
              <FormItem className="mt-4" id="temat">
                <FormLabel className="font-bold text-base leading-6 text-darkBlue">Temat</FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(value)}
                  value={field.value}
                >
                  <SelectTrigger className="w-full border-0 p-[0px] text-gray border-b-2 rounded-none">
                    <SelectValue  placeholder="Wybierz rodzaj wizyty" />
                  </SelectTrigger>
                  <SelectContent >
                    <SelectItem value="leczenie">Leczenie</SelectItem>
                    <SelectItem value="recepta">Recepta</SelectItem>
                    <SelectItem value="dawkowanie">Dawkowanie</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
            />

            <FormField
            control={form.control}
            name="textArea"
            render={({ field }) => (
              <FormItem className="mt-4" id="dodatkowe-informacje">
                <FormLabel className="font-bold text-base leading-6 text-darkBlue">Dodatkowe informacje <span className="font-normal">(opcjonalnie)</span></FormLabel>
                <Textarea {...field} placeholder="Opisz problem" className="border-2 p-2 rounded-none h-[134px] resize-none font-normal text-xs leading-5 text-gray-700 bg-grayScale"/>
              </FormItem>
            )}
            />

            <FormField
            control={form.control}
            name="language"
            render={({ field }) => (
              <FormItem className="mt-4" id="jezyk-wizyty">
                <FormLabel className="font-bold text-base leading-6 text-darkBlue">Język wizyty</FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(value)}
                  value={field.value}
                >
                  <SelectTrigger className="w-full border-0 p-[0px] text-gray border-b-2 rounded-none">
                    <SelectValue  placeholder="Wybierz z listy" />
                  </SelectTrigger>
                  <SelectContent >
                    <SelectItem value="polish">Polski</SelectItem>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="sweeden">Swenska</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
            />

          <h1 className="font-light text-[24px] leading-[28.8px] text-darkBlue mt-8">Pacjent</h1>
            
          <FormField
          control={form.control}
          name="patientAge"
          render={({ field }) => (
            <FormItem className="mt-4" id="wiek-pacjenta">
              <FormLabel className="font-bold text-base leading-6 text-darkBlue">Wiek pacjenta</FormLabel>
              <div className="flex space-x-4 mt-2">
                {/* Przycisk "Dorosły" */}
                <button
                  type="button"
                  onClick={() => field.onChange("Dorosły")}
                  className={cn(
                    "w-full py-2 text-center rounded border",
                    field.value === "Dorosły" ? "bg-darkBlue text-white" : "bg-white text-darkBlue border-darkBlue"
                  )}
                >
                  Dorosły
                </button>

                {/* Przycisk "Dziecko" */}
                <button
                  type="button"
                  onClick={() => field.onChange("Dziecko")}
                  className={cn(
                    "w-full py-2 text-center rounded border",
                    field.value === "Dziecko" ? "bg-darkBlue text-white" : "bg-white text-darkBlue border-darkBlue"
                  )}
                >
                  Dziecko
                </button>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="patientData"
          render={() => (
            <FormItem className="mt-4" id="dane-pacjenta">
              <FormLabel className="font-bold text-base leading-6 text-darkBlue">Dane pacjenta</FormLabel>
              <div className="flex space-x-4 mt-2">
                {/* Pole "Imię" */}
                <Input
                  type="text"
                  placeholder="Imię"
                  className="flex-1 border-0 p-[0px] text-gray border-b-2 rounded-none"
                />
                {/* Pole "Nazwisko" */}
                <Input
                  type="text"
                  placeholder="Nazwisko"
                  className="flex-1 border-0 p-[0px] text-gray border-b-2 rounded-none"
                />
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="symptoms"
          render={({ field }) => (
            <FormItem className="mt-4" id="objawy">
              <FormLabel className="font-bold text-base leading-6 text-darkBlue">
                Objawy <span className="font-normal">(opcjonalnie)</span>
              </FormLabel>
              <Select
                onValueChange={(value) => field.onChange(value)}
                value={field.value}
              >
                <SelectTrigger className="w-full border-0 p-[0px] text-gray border-b-2 rounded-none">
                  <SelectValue placeholder="Wybierz z listy" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kaszel">Kaszel</SelectItem>
                  <SelectItem value="gorączka">Gorączka</SelectItem>
                  <SelectItem value="ból_gardła">Ból gardła</SelectItem>
                  <SelectItem value="inne">Inne</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

            <FormField
              control={form.control}
              name="document"
              render={({ field }) => (
                <FormItem className="mt-4" id="dokument">
                  {/* Tytuł */}
                  <FormLabel className="font-bold text-base leading-6 text-darkBlue">
                    Nazwa dokumentu
                  </FormLabel>

                  {/* Zamiana przycisków na Tabs */}
                  <div className="flex gap-4 mt-2">
                    <Tabs defaultValue="PESEL" className="w-full bg-lig">
                      <TabsList className="grid w-full grid-cols-2 bg-lightBlue h-[46px] ">
                        <TabsTrigger value="PESEL"   className="w-full text-center data-[state=active]:bg-white data-[state=active]:h-[40px] data-[state=active]:rounded-md data-[state=active]:scale-95 data-[state=active]:shadow-md flex justify-center items-center align-center mt-[3px]"
                        >
                          PESEL
                        </TabsTrigger>
                        <TabsTrigger value="Paszport" className="w-full text-center data-[state=active]:bg-white data-[state=active]:h-[40px] data-[state=active]:rounded-md data-[state=active]:scale-95 data-[state=active]:shadow-md flex justify-center items-center align-center mt-[3px]">
                          Paszport
                        </TabsTrigger>
                      </TabsList>

                      {/* Treść dla PESEL i Paszport w jednej linii */}
                      <div className="flex gap-4 mt-4">

                        <TabsContent value="PESEL" className="w-1/2">
                          <Input
                            placeholder="PESEL"
                            className="w-full border-0 text-gray border-b-2 rounded-none p-0"
                            value={field.value.pesel || ""}
                            onChange={(e) => {
                              const pesel = e.target.value;
                              field.onChange({ ...field.value, pesel });

                              // Wyciągamy datę z numeru PESEL i ustawiamy ją w polu date
                              const extractedDate = extractDateFromPESEL(pesel);
                              if (extractedDate) {
                                field.onChange({ ...field.value, date: extractedDate });
                              }
                            }}
                          />
                        </TabsContent>

                        <TabsContent value="PESEL" className="w-1/2">
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full justify-start text-left font-normal p-[0px] border-0 text-gray border-b-2 rounded-none",
                                  !field.value.date && "text-muted-foreground"
                                )}
                              >
                                {field.value.date ? format(field.value.date, "PPP") : <span>Data urodzenia</span>}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="flex w-full flex-col space-y-2 p-2">
                              <div className="rounded-md border">
                                <Calendar
                                  mode="single"
                                  selected={field.value.date}
                                  onSelect={(date) => field.onChange({ ...field.value, date })}
                                  disabled={{ before: new Date(), after: addDays(new Date(), 3) }}
                                />
                              </div>
                            </PopoverContent>
                          </Popover>
                        </TabsContent>

                        {/* Treść dla Paszport */}
                        <TabsContent value="Paszport" className="w-1/2">
                          <Input
                            placeholder="Numer paszportu"
                            className="w-full p-0 border-0 text-gray border-b-2 rounded-none"
                            value={field.value.passport || ""}
                            onChange={(e) => field.onChange({ ...field.value, passport: e.target.value })}
                          />
                        </TabsContent>

                        <TabsContent value="Paszport" className="w-1/2">
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full justify-start text-left font-normal p-[0px] border-0 text-gray border-b-2 rounded-none",
                                  !field.value.date && "text-muted-foreground"
                                )}
                              >
                                {field.value.date ? format(field.value.date, "PPP") : <span>Data urodzenia</span>}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="flex w-full flex-col space-y-2 p-2">
                              <div className="rounded-md border">
                                <Calendar
                                  mode="single"
                                  selected={field.value.date}
                                  onSelect={(date) => field.onChange({ ...field.value, date })}
                                  disabled={{ before: new Date(), after: addDays(new Date(), 3) }}
                                />
                              </div>
                            </PopoverContent>
                          </Popover>
                        </TabsContent>
                      </div>
                    </Tabs>
                  </div>
                </FormItem>
              )}
            />

          <FormField
          control={form.control}
          name="symptoms"
          render={({ field }) => (
            <FormItem className="mt-4" id="dane-adresowe">
              <FormLabel className="font-bold text-base leading-6 text-darkBlue">
                Dane adresowe
              </FormLabel>
              <Select
                onValueChange={(value) => field.onChange(value)}
                value={field.value}
              >
                <SelectTrigger className="w-full border-0 p-[0px] text-gray border-b-2 rounded-none">
                  <SelectValue placeholder="Kraj" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kaszel">Polska</SelectItem>
                  <SelectItem value="gorączka">England</SelectItem>
                  <SelectItem value="ból_gardła">Germany</SelectItem>
                  <SelectItem value="inne">France</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex space-x-4 mt-2">
                {/* Pole "Imię" */}
                <Input
                  type="text"
                  placeholder="Ulica"
                  className="flex-1 border-0 p-[0px] text-gray border-b-2 rounded-none"
                />
                {/* Pole "Nazwisko" */}
                <Input
                  type="text"
                  placeholder="Numer lokalu"
                  className="flex-1 border-0 p-[0px] text-gray border-b-2 rounded-none"
                />
              </div>
              
            </FormItem>
          )}
        />

          <div className="flex items-center mt-2">
              <input
                  type="checkbox"
                  id="termsAdress"
                  checked={isCheckedAdress}
                  onChange={handleChangeAdress}
                  className="h-4 w-4 text-blue-500 border-gray-300 focus:ring-2 focus:ring-blue-500"
              />
              <label
                  htmlFor="termsAdress"
                  className="font-normal text-sm leading-[19.6px] pl-4"
              >
                  Wizyta ma się odbyć na inny adres
              </label>
          </div>

          {isCheckedAdress && 
          <FormField
          control={form.control}
          name="symptoms"
          render={({ field }) => (
            <FormItem className="mt-4">
              <FormLabel className="font-bold text-base leading-6 text-darkBlue">
                Dane adresowe do wizyty
              </FormLabel>
              <Select
                onValueChange={(value) => field.onChange(value)}
                value={field.value}
              >
                <SelectTrigger className="w-full border-0 p-[0px] text-gray border-b-2 rounded-none">
                  <SelectValue placeholder="Kraj" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kaszel">Polska</SelectItem>
                  <SelectItem value="gorączka">England</SelectItem>
                  <SelectItem value="ból_gardła">Germany</SelectItem>
                  <SelectItem value="inne">France</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex space-x-4 mt-2">
                {/* Pole "Imię" */}
                <Input
                  type="text"
                  placeholder="Ulica"
                  className="flex-1 border-0 p-[0px] text-gray border-b-2 rounded-none"
                />
                {/* Pole "Nazwisko" */}
                <Input
                  type="text"
                  placeholder="Numer lokalu"
                  className="flex-1 border-0 p-[0px] text-gray border-b-2 rounded-none"
                />
              </div>
              
            </FormItem>
          )}
        />}
        </form>
      </Form>
    </div>
  );
}
