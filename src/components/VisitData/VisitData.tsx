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

});

export default function VisitData() {
const [isChecked, setIsChecked] = useState(false);
const [date, setDate] = React.useState<Date>()

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
              <FormItem className="mt-4">
                <FormLabel className="font-bold text-base leading-6 text-darkBlue">Numer zgłoszenia</FormLabel>
                <Input {...field} type="text" placeholder="Wpisz numer zgłoszenia" className="w-full border-0 p-[0px] text-gray border-b-2 rounded-none" />
              </FormItem>
            )}
            />

            <FormField
            control={form.control}
            name="visitType"
            render={({ field }) => (
              <FormItem className="mt-4">
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
              <FormItem className="mt-4">
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
            name="visitDate"
            render={({ field }) => (
              <FormItem className="mt-4">
                <FormLabel className="font-bold text-base leading-6 text-darkBlue">Data wizyty</FormLabel>
                
                <Popover>
                  <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                    "w-full justify-start text-left font-normal p-[0px] ",
                    !date && "text-muted-foreground"
                    )}
                  >
                    {date ? format(date, "PPP") : <span>Jak najszybciej</span>}
                  </Button>
                  </PopoverTrigger>
                  <PopoverContent className="flex w-full flex-col space-y-2 p-2">
                  <Select
                    onValueChange={(value) =>
                    setDate(addDays(new Date(), parseInt(value)))
                    }
                  >
                    <SelectTrigger>
                    <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                    <SelectItem value="0">Jak najszybciej</SelectItem>
                    </SelectContent>
                  </Select>
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
                    className="font-normal text-sm leading-[19.6px]"
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
                        {Array.from({ length: 24 }, (_, index) => (
                          <SelectItem key={index} value={String(index).padStart(2, "0")}>
                            {String(index).padStart(2, "0")}:00
                          </SelectItem>
                        ))}
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
                        {Array.from({ length: 24 }, (_, index) => (
                          <SelectItem key={index} value={String(index).padStart(2, "0")}>
                            {String(index).padStart(2, "0")}:00
                          </SelectItem>
                        ))}
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
              <FormItem className="mt-4">
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
              <FormItem className="mt-4">
                <FormLabel className="font-bold text-base leading-6 text-darkBlue">Dodatkowe informacje</FormLabel>
                <Textarea {...field} placeholder="Opisz problem" className="border-2 p-2 rounded-none h-[134px] resize-none font-normal text-xs leading-5 text-gray-700 bg-grayScale"/>
              </FormItem>
            )}
            />

            <FormField
            control={form.control}
            name="language"
            render={({ field }) => (
              <FormItem className="mt-4">
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

            
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
