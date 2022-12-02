import { Prompt, PromptGeneratorProps } from "../types";
import styles from "../styles/Interface.module.css";

import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

// TODO - refactor this
const icon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="w-4 h-4 inline-block align-top"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
      />
    </svg>
);

const PromptSelector = (props: any) => {
    const prompts = props.prompts;
    const setSelectedPrompt = props.setSelectedPrompt;
    const selectedPrompt = props.selectedPrompt;
    const setSelectedSubject = props.setSelectedSubject;
    const selectedSubject = props.selectedSubject;

    return (

        <div>
            <div className="flex sm:hidden ml-4 py-[0.2rem] w-max h-full bg-primary-400 rounded-tl-lg rounded-tr-lg shadow-neobrutalism-md-black">
                <button className="flex items-center relative h-full pl-2 pr-1" onClick={() => setSelectedSubject(null)}>{icon}</button>
                <p className="text-center italic text-xs pr-2">{selectedSubject.name}</p>
            </div>
            <div className="flex sm:hidden items-center w-full">        
            <Listbox value={selectedPrompt} onChange={setSelectedPrompt}>
                <div className="flex w-full relative">
                <Listbox.Button className="relative w-full cursor-default rounded-tr-xl rounded-xl shadow-neobrutalism-md-black bg-primary-400 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 text-sm">
                    <span className="block truncate">{selectedPrompt.description}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon
                        className="h-5 w-5 text-black"
                        aria-hidden="true"
                    />
                    </span>
                </Listbox.Button>
                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Listbox.Options className="absolute mt-10 max-h-60 w-full items-center overflow-auto rounded-md bg-white border-black border-2 py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {prompts.map((prompt: Prompt, promptIdx: number) => (
                        <Listbox.Option
                        key={promptIdx}
                        className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active ? 'bg-primary-100 text-primary-900' : 'text-gray-900'
                            }`
                        }
                        value={prompt}
                        >
                        {({ selected }) => (
                            <>
                            <span
                                className={`block truncate ${
                                selected ? 'font-medium' : 'font-normal'
                                }`}
                            >
                                {prompt.description}
                            </span>
                            {selected ? (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary-600">
                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                </span>
                            ) : null}
                            </>
                        )}
                        </Listbox.Option>
                    ))}
                    </Listbox.Options>
                </Transition>
                </div>
            </Listbox>
            </div>
        </div>

        // <div className="flex sm:hidden items-center border-2 rounded-3xl border-black shadow-neobrutalism-md-black">
        //     <select className="flex items-center select w-full rounded-3xl sm:hidden">
        //         <option>test</option>
        //         <option>test</option>
        //     </select>
        // </div>
        // <div className="dropdown w-full">
        //     <label tabIndex={0} className="btn w-fullm-1">Click</label>
        //     <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
        //         <li><a>Item 1</a></li>
        //         <li><a>Item 2</a></li>
        //     </ul>
        // </div>

    )

};

export default PromptSelector;
