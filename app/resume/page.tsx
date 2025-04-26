// import "./styles.css"

import Education from "@/components/resume/Education"
import Experience from "@/components/resume/Experience"
import Header from "@/components/resume/Header"
import Interests from "@/components/resume/Interests"
import Languages from "@/components/resume/Languages"
import Skills from "@/components/resume/Skills"

import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'jwoo | Resume',
  description: 'View my resume',
};

const leftColumnWidth = "w-1/3"
const rightColumnWidth = "w-2/3"
const columnCommon = "flex flex-col gap-4 m-3 p-4"

export default function ResumePage() {
  return (
    <div className="resume w-[210mm] h-[297mm] bg-white shadow-2xl flex flex-col mx-auto my-24">
      <Header />
      
      <div className="flex flex-grow">
        {/* left column */}
        <div className={`${columnCommon} ${leftColumnWidth} bg-accent`}>
          <Education />
          <Languages />
          <Interests />
        </div>
        
        {/* right column */}
        <div className={`${columnCommon} ${rightColumnWidth} ml-0 pl-2`}>
          <Experience />
          <Skills />
        </div>
      </div>
    </div>
  );
}
