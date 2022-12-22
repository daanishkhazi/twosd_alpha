const FunkyWindow = (props: { color: string }) => {
    const color = props.color;
    return (
        <div className="flex w-full h-full">
            <div className="hidden sm:flex w-full h-full max-h-screen items-center justify-end">
                <svg className="w-full h-full" 
                    preserveAspectRatio="none"
                    // viewBox="0 0 1102 946" 
                    // viewBox="0 0 952 946" 
                    viewBox="0 0 763 862"
                    fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* <path d="M122.476 527.468L122.439 527.42L122.399 527.374L107.079 509.478C82.5595 480.836 76.736 440.631 92.1205 406.209L92.7004 404.912C97.4091 394.376 104.095 384.842 112.396 376.825C160.39 330.474 147.073 250.414 86.6582 222.094L64.8227 211.859C-28.8513 167.949 -11.673 29.8375 89.9033 10.2132L116.374 5.09911C123.601 3.70289 130.945 3 138.305 3H169.093C226.383 3 281.95 22.5877 326.576 58.513C383.937 104.69 458.398 123.946 530.954 111.366L645.579 91.4911C806.979 78.2725 913.226 88.1626 981.188 109.081C1049.16 130.002 1078.43 161.799 1086.8 192.167C1091.7 209.948 1087.56 227.235 1079.02 243.987C1070.46 260.781 1057.63 276.759 1045.5 291.86L1045.2 292.234L1047.14 293.8L1045.2 292.234L887.392 488.565C842.958 543.848 840.56 622.015 881.332 680.042C925.569 743 916.583 829.151 860.133 881.426C825.734 913.281 778.68 927.7 732.34 920.585L645.033 907.181C592.596 899.131 539.004 903.399 488.502 919.647L484.71 920.867C461.618 928.297 437.822 933.331 413.7 935.889L355.466 942.065C331.502 944.607 307.29 940.849 285.223 931.163L267.472 923.371C203.837 895.438 177.051 819.543 209.055 757.856C231.551 714.495 226.791 662.013 196.86 623.409L122.476 527.468Z" fill={color} stroke="black" strokeWidth="5"/> */}
                    <path d="M344.068 33.0694L500.793 7.4939C613.085 -0.734444 680.459 6.88413 716.825 22.6969C734.959 30.5822 745.079 40.3709 749.44 50.9503C753.795 61.5109 752.624 73.3759 747.078 85.883C736.919 108.796 726.661 133.317 722.032 157.668C717.394 182.065 718.366 206.5 730.881 229.108C743.029 251.052 746.156 276.864 739.601 301.075L709.527 412.156C695.58 463.671 701.603 518.553 726.392 565.816L740.411 592.547C775.515 659.478 761.381 741.633 705.928 792.985C668.5 827.646 617.302 843.334 566.88 835.593L486.033 823.181C433.596 815.13 380.004 819.398 329.502 835.647L325.71 836.867C302.618 844.297 278.822 849.331 254.7 851.889L196.466 858.065C172.502 860.607 148.29 856.849 126.223 847.163L118.384 843.721C49.3822 813.433 20.3367 731.137 55.0403 664.247C74.9972 625.781 75.3385 580.087 55.9586 541.327L47.7142 524.838C26.9959 483.402 24.4665 435.209 40.7331 391.832L44.3286 382.244C48.7163 370.543 51.9696 358.448 54.0438 346.125L61.0869 304.281C65.6798 276.993 64.4607 249.044 57.5092 222.26C53.0798 205.194 46.3748 188.802 37.5745 173.523L14.675 133.767C14.6737 133.765 14.6724 133.763 14.6711 133.76C-20.6343 71.4567 29.4374 -4.64674 100.629 3.11947L129.415 6.25974C136.757 7.06065 143.991 8.65135 150.991 11.0042L175.908 19.3784C230.011 37.5624 287.736 42.2621 344.068 33.0694Z" fill="#E3FF7A" stroke="black" stroke-width="5"/>
                </svg>
            </div>

            <div className="sm:hidden flex w-full h-full max-h-screen items-center justify-center">
                <svg className="w-full h-full" 
                    preserveAspectRatio="none"
                    // viewBox="0 0 1102 946" 
                    // viewBox="-5 0 579 717" 
                    viewBox="-6 0 574 723"
                    fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* <path d="M158.606 696.031L158.471 696.053L158.339 696.089L109.836 709.392C69.6364 720.418 27.8245 698.125 14.5751 658.603C6.81274 635.448 10.2606 610 23.9043 589.746L48.8361 552.734C74.2124 515.062 72.9149 465.444 45.6043 429.149L43.9613 426.966C37.8166 418.8 33.1715 409.608 30.2425 399.817C23.9794 378.882 25.8929 356.35 35.5966 336.771L45.6139 316.559C53.105 301.445 57.6634 285.047 59.048 268.235L60.1263 255.142C62.6644 224.323 51.5093 193.949 29.6277 172.098L24.6685 167.146C-17.2423 125.294 -10.6867 55.6285 38.2958 22.3296C53.9437 11.692 72.4281 6.00401 91.3494 6.00401H96.6052C112.242 6.00401 127.704 9.29464 141.986 15.662L320.375 95.1934C372.599 118.477 433.996 99.811 464.424 51.4004C482.505 22.6331 513.021 3.13564 546.757 2.56734C596.626 1.72726 626.447 8.81672 643.09 20.2049C651.345 25.8538 656.358 32.5585 659.026 39.9447C661.706 47.3653 662.079 55.6417 660.768 64.4857C658.134 82.2518 648.792 101.788 638.742 120.153C635.721 125.673 632.678 131.014 629.747 136.159C627.796 139.584 625.895 142.921 624.083 146.166C619.601 154.191 615.705 161.582 613.268 167.86L514.236 403.023C498.402 440.622 503.398 483.765 527.405 516.751C555.314 555.097 555.899 606.905 528.864 645.872L523.959 652.942C492.645 698.077 435.293 717.119 383.201 699.675L357.436 691.048C340.57 685.4 322.901 682.52 305.115 682.52H272.314C253.003 682.52 233.722 684.048 214.652 687.09L158.606 696.031Z" fill={color} stroke="black" strokeWidth="5"/> */}
                    {/* <path d="M546.757 2.56734C596.626 1.72726 626.447 8.81672 643.09 20.2049C651.345 25.8538 656.358 32.5585 659.025 39.9447C661.706 47.3653 662.079 55.6417 660.768 64.4857C658.134 82.2518 648.792 101.788 638.742 120.153C635.721 125.673 632.678 131.014 629.747 136.159C627.796 139.584 625.895 142.921 624.083 146.166C619.601 154.191 615.705 161.582 613.267 167.86L513.589 404.559C498.157 441.205 503.026 483.254 526.424 515.403C554.638 554.168 554.064 606.854 525.014 644.996L519.088 652.776C489.913 691.082 440.887 708.572 394.054 697.381L346.668 686.059C336.877 683.72 326.925 682.117 316.895 681.266L283.282 678.411C256.473 676.135 229.513 676.289 202.731 678.871L175.293 681.516C168.142 682.206 161.062 683.508 154.134 685.408L115.272 696.067C75.3888 707.006 33.9061 684.889 20.761 645.678C12.9053 622.245 16.6296 596.474 30.7983 576.224L47.5699 552.254C73.6244 515.016 72.7639 465.243 45.4379 428.928L43.9613 426.966C37.8166 418.8 33.1715 409.608 30.2424 399.817C23.9794 378.882 25.8929 356.35 35.5966 336.771L45.6139 316.559C53.1049 301.445 57.6634 285.047 59.048 268.235L60.1262 255.142C62.6644 224.323 51.5092 193.949 29.6276 172.098L24.6685 167.146C-17.2423 125.294 -10.6867 55.6285 38.2958 22.3296C53.9437 11.692 72.428 6.00401 91.3493 6.00401H96.6052C112.242 6.00401 127.704 9.29464 141.986 15.662L320.374 95.1934C372.598 118.477 433.996 99.811 464.424 51.4004C482.505 22.6331 513.021 3.13564 546.757 2.56734Z" fill="#E3FF7A" stroke="black" stroke-width="5"/> */}
                    <path d="M293.142 39.9742L293.169 39.9782L293.197 39.9815L372.234 49.639C422.629 55.7966 473.731 47.3201 519.439 25.2215C524.38 22.8331 529.24 20.0099 534.001 17.2442C536.256 15.934 538.49 14.6366 540.699 13.4045C547.679 9.51154 554.618 6.14203 562.061 4.41102C573.811 1.67842 584.183 4.847 593.124 12.2268C602.147 19.6727 609.708 31.4222 615.451 45.6973C626.937 74.249 630.825 112.095 625.208 143.096C623.09 154.784 618.971 165.958 614.159 177.075C611.953 182.17 609.613 187.227 607.259 192.316L606.616 193.706C604.051 199.253 601.485 204.839 599.107 210.486L513.589 413.559C498.157 450.205 503.026 492.254 526.424 524.403C554.638 563.168 554.064 615.854 525.014 653.996L519.088 661.776C489.913 700.082 440.887 717.572 394.054 706.381L346.668 695.059C336.877 692.72 326.925 691.118 316.895 690.266L283.282 687.412C256.473 685.135 229.513 685.289 202.731 687.871L175.293 690.516C168.142 691.206 161.062 692.508 154.134 694.408L115.272 705.067C75.3888 716.006 33.9061 693.889 20.761 654.678C12.9053 631.245 16.6296 605.474 30.7982 585.224L47.57 561.254C73.6244 524.016 72.7639 474.243 45.4379 437.928L43.9613 435.966C37.8166 427.8 33.1715 418.608 30.2424 408.817C23.9794 387.882 25.8929 365.35 35.5965 345.771L45.614 325.559C53.105 310.445 57.6634 294.047 59.048 277.235L60.1262 264.143C62.6644 233.323 51.5092 202.949 29.6276 181.098L24.6685 176.146C-17.2423 134.294 -10.6868 64.6288 38.2958 31.3299C53.9437 20.6923 72.4281 15.0043 91.3494 15.0043H109.607C116.976 15.0043 124.336 15.5343 131.63 16.5903L293.142 39.9742Z" fill="#E3FF7A" stroke="black" stroke-width="5"/>
                    {/* <g filter="url(#filter0_d_87_48)">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M175.8 28L321.392 92.9101C323.052 93.6499 324.721 94.3464 326.398 95H-5.3696C-3.97406 70.0416 6.98535 45.6789 26.9357 28H175.8Z" fill="#8B99FF"/>
                    </g>
                    <defs>
                    <filter id="filter0_d_87_48" x="-5.3696" y="28" width="341.767" height="75" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset dx="10" dy="8"/>
                    <feComposite in2="hardAlpha" operator="out"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_87_48"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_87_48" result="shape"/>
                    </filter>
                    </defs> */}
                </svg>
            </div>


        </div>
   
    );
  };
  
  export default FunkyWindow;
  