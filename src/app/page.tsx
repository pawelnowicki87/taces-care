import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import LeftBlock from "@/components/LeftBlock/LeftBlock";
import RightBlock from "@/components/RightBlock/RightBlock";
import VisitData from "@/components/VisitData/VisitData";
import PatientData from "@/components/PatientData/PatientData";

export default function Home() {
  return (
    <div className="relative flex gap-x-5 pt-4" >
      
      <LeftBlock />
      <div className="flex w-[60%] flex-col gap-y-6">
        <div className="flex flex-col gap-y-2">
          <Breadcrumb>
            <BreadcrumbList className="sm:gap-2">
              <BreadcrumbItem className="text-gray">
                <BreadcrumbLink href="/">Wizyty domowe</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-darkGray">
                  Umawianie wizyty
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h2 className="text-4xl font-light text-darkBlue">
            Umawianie wizyty
          </h2>
        </div>
        <div className="max-h-[70vh] overflow-y-auto bg-white p-10">
          <VisitData />
          <PatientData />
        </div>
      </div>

      <RightBlock />
    </div>
  );
}
