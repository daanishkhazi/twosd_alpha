import Image from "next/image";
import Link from "next/link";
import {Subject} from "../types";
import EditIcon from "./icons/editIcon";
import {useState} from "react"


type SubjectBannerProps = {
    selectedSubject: Subject;
    setSelectedSubject: React.Dispatch<React.SetStateAction<Subject | null>>;
    subjectNames: {[key: string]: string}
    collapsed: boolean;
    setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
};

const subjectNames: { [key: string]: string } = {
    Biology: "Rachel (Biology)",
    "US History": "Ross (US History)",
    "Computer Science": "Monica (Computer Science)",
    Law: "Phoebe (Law)",
    "World History": "Chandler (World History)",
  };
  
const subjectImages: { [key: string]: string } = {
    Biology: "/rachel.png",
    "US History": "/ross.png",
    "Computer Science": "/monica.png",
    Law: "/phoebe.png",
    "World History": "/chandler.png",
};


// TODO- refactor this into it's own svg (i can't figure out why it isn't working...)
const icon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="w-7 h-7 inline-block align-top"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
      />
    </svg>
);

const collapse = (
    <svg className="w-12 h-12 inline-block align-top pl-2" viewBox="0 0 18 16" xmlns="http://www.w3.org/2000/svg">
        <path fill="#000000" d="M2,3 C2.55228,3 3,3.44772 3,4 L3,12 C3,12.5523 2.55229,13 2,13 C1.44772,13 1,12.5523 1,12 L1,4 C1,3.44772 1.44772,3 2,3 Z M7.29289,4.29289 C7.68342,3.90237 8.31658,3.90237 8.7071,4.29289 C9.09763,4.68342 9.09763,5.31658 8.7071,5.70711 L7.41421,7 L14,7 C14.5523,7 15,7.44772 15,8 C15,8.55228 14.5523,9 14,9 L7.41421,9 L8.7071,10.2929 C9.09763,10.6834 9.09763,11.3166 8.7071,11.7071 C8.31658,12.0976 7.68342,12.0976 7.29289,11.7071 L3.58578,8 L7.29289,4.29289 Z"/>
    </svg>
)


const SubjectBanner: React.FC<SubjectBannerProps> = (props: SubjectBannerProps) => {
    const setSelectedSubject = props.setSelectedSubject;
    const selectedSubject = props.selectedSubject;
    const subjectNames = props.subjectNames;
    const collapsed = props.collapsed;
    const setCollapsed = props.setCollapsed;


    console.log(selectedSubject, subjectNames)

    return (
            (!collapsed ? 
                <div className="max-sm:hidden sm:flex-row sticky top-28 z-20 items-end">
                
                <div className="flex items-center">
                    <div className="flex z-30 absolute">
                            <Image
                                className="rounded-full self-center border-secondary-400 border-4"
                                src={subjectImages[selectedSubject.name]}
                                alt={selectedSubject.name}
                                width={96}
                                height={96}
                            />
                    </div>
                        
                    <div className="flex w-full z-20 items-center bg-secondary-400 font-bold text-lg rounded-full rounded-r-none py-3 pl-24 justify-center">
                        <div>
                        {`Now learning from: ${subjectNames[selectedSubject.name]}`}
                        </div>
                        <div className="flex w-20">
                            <button
                                className="flex hover:scale-110 transition ease-in-out delay-50 w-20 pl-3"
                                onClick={() => setSelectedSubject(null)}
                            >
                                {icon}
                            </button>
                        </div>
                    </div>
                    <div className="flex justify-center w-16 py-0.5 pr-3 h-full items-center rounded-lg rounded-l-none bg-secondary-400 align-end">
                        <button
                            onClick={() => setCollapsed(!collapsed)}
                            className="hover:scale-110 hover:-translate-x-2 transition ease-in-out delay-50"
                        >
                            {collapse}
                        </button>
                    </div>
                </div>
                </div> :
                <div className="max-sm:hidden sm:fixed left-0 top-32">
                    <div className="flex rotate-180 justify-center w-16 py-0.5 h-full items-center rounded-lg rounded-r-none bg-secondary-400 align-end">
                        <button
                            onClick={() => setCollapsed(!collapsed)}
                            className="hover:scale-110 hover:-translate-x-2 transition ease-in-out delay-50"
                        >
                            {collapse}
                        </button>
                    </div>
                </div>)
            
            );
};

export default SubjectBanner;