import React from "react";
import { SectionHeadersProps } from "@/app/types/index";

const SectionsHeaders = (props: SectionHeadersProps) => {
  const { subHeader, mainHeader } = props;

  return (
    <>
      <h3 className="uppercase text-gray-500 font-semibold leading-4">
        {subHeader}
      </h3>
      <h2 className="text-primary font-bold text-4xl italic">{mainHeader}</h2>
    </>
  );
};

export default SectionsHeaders;
