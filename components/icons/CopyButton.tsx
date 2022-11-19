import styles from "../../styles/Interface.module.css"
import { useState } from "react";

const CopyButton = (props: { copied: boolean }) => {
    const copied = props.copied; 
    console.log(copied) 
    
    return (
    copied ? (<div className="flex pl- w-full h-full items-center justify-end">
                <svg className="h-5/6 hover:scale-110" viewBox="0 0 88 67" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g className={copied ? styles.checkIconVisible : styles.checkIconInvisible}>
                    <rect x="21" y="57.848" width="81.8095" height="12" rx="6" transform="rotate(-45 21 57.848)" fill="black"/>
                    <rect x="8.72424" y="29.2552" width="39.6672" height="12" rx="6" transform="rotate(45 8.72424 29.2552)" fill="black"/>
                  </g>
                </svg>
              </div>)
            : (<div className="flex w-full h-full items-center justify-end">
                <svg className="h-full hover:scale-110" viewBox="0 0 169 183" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g className={copied ? styles.copyIconInvisible : styles.copyIconVisible}>
                    <rect x="6.5" y="47.5" width="129" height="129" rx="15.5" stroke="black" strokeWidth="13"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M49 13H147C151.971 13 156 17.0294 156 22V120C156 124.971 151.971 129 147 129H142V142H147C159.15 142 169 132.15 169 120V22C169 9.84974 159.15 0 147 0H49C36.8497 0 27 9.84974 27 22V41H40V22C40 17.0294 44.0294 13 49 13Z" fill="black"/>
                  </g>
                </svg>
              </div>)
    )
  };
  
  export default CopyButton;