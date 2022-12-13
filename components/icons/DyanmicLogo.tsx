const DynamicLogo = (props: { color: string }) => {
    const color = props.color;
    return (
        <div className="flex w-full h-full items-center justify-end">
            <svg className="h-full fill-black" viewBox="40 40 570 162" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="52" y="56" width="63.0455" height="63.0455" fill={color}/>
                <rect x="121.955" y="125.955" width="63.0455" height="63.0455" fill={color}/>
                <rect x="52" y="125.955" width="63.0455" height="63.0455" rx="31.5227" fill={color}/>
                <rect x="121.955" y="56" width="63.0455" height="63.0455" fill={color}/>
                <path d="M234.1 171C231.86 171 230.74 170.113 230.74 168.34V167.78C230.74 166.66 231.673 164.98 233.54 162.74C235.407 160.407 236.34 158.073 236.34 155.74V86.86C236.34 84.5267 235.407 82.24 233.54 80C231.673 77.6667 230.74 75.94 230.74 74.82V74.26C230.74 72.4867 231.86 71.6 234.1 71.6H264.9C267.14 71.6 268.26 72.4867 268.26 74.26V74.82C268.26 75.94 267.187 77.6667 265.04 80C262.987 82.24 261.96 84.5267 261.96 86.86V152.1C261.96 154.62 262.52 156.767 263.64 158.54C264.853 160.313 266.58 161.2 268.82 161.2H283.38C285.993 161.2 288.373 160.173 290.52 158.12C292.76 156.067 294.44 153.78 295.56 151.26C296.773 148.74 298.127 146.453 299.62 144.4C301.113 142.347 302.56 141.32 303.96 141.32H305.92C308.253 141.32 309.187 142.487 308.72 144.82L305.08 166.52C304.52 169.507 302.887 171 300.18 171H234.1ZM380.176 155.74C380.456 157.98 380.969 159.8 381.716 161.2C382.556 162.507 383.349 163.347 384.096 163.72C384.936 164.093 385.682 164.56 386.336 165.12C386.989 165.68 387.316 166.38 387.316 167.22C387.316 170.3 382.042 171.84 371.496 171.84C367.202 171.84 363.982 171.327 361.836 170.3C359.782 169.273 358.476 167.547 357.916 165.12C354.369 169.973 348.442 172.4 340.136 172.4C332.296 172.4 325.902 170.58 320.956 166.94C316.102 163.3 313.676 158.027 313.676 151.12C313.676 144.4 316.102 139.173 320.956 135.44C325.809 131.613 331.782 129.7 338.876 129.7C344.382 129.7 349.096 130.867 353.016 133.2V132.78C352.082 123.54 351.009 117.287 349.796 114.02C348.676 110.753 346.436 109.12 343.076 109.12C340.929 109.12 339.202 110.1 337.896 112.06C336.589 114.02 335.609 116.167 334.956 118.5C334.396 120.833 333.276 122.98 331.596 124.94C329.916 126.9 327.676 127.88 324.876 127.88C321.982 127.88 319.602 127.04 317.736 125.36C315.962 123.68 315.076 121.487 315.076 118.78C315.076 113.367 317.782 109.307 323.196 106.6C328.609 103.8 335.236 102.4 343.076 102.4C352.409 102.4 360.109 104.967 366.176 110.1C372.336 115.14 375.976 122 377.096 130.68L380.176 155.74ZM347.836 165.26C349.982 165.26 351.709 164.233 353.016 162.18C354.416 160.127 355.116 157.793 355.116 155.18L354.556 148.74C353.622 140.993 350.729 137.12 345.876 137.12C343.729 137.12 342.002 138.007 340.696 139.78C339.389 141.46 338.736 143.747 338.736 146.64C338.736 151.867 339.529 156.3 341.116 159.94C342.796 163.487 345.036 165.26 347.836 165.26ZM446.818 148.88C447.845 147.853 448.965 147.573 450.178 148.04C451.485 148.413 452.091 149.347 451.998 150.84C451.811 155.507 449.105 160.267 443.878 165.12C438.651 169.973 431.885 172.4 423.578 172.4C413.405 172.4 405.098 169.133 398.658 162.6C392.218 156.067 388.998 147.527 388.998 136.98C388.998 126.9 392.358 118.64 399.078 112.2C405.891 105.667 414.011 102.4 423.438 102.4C431.931 102.4 438.511 104.36 443.178 108.28C447.845 112.2 450.178 116.633 450.178 121.58C450.178 125.5 448.358 128.393 444.718 130.26L416.858 145.94C420.685 152.007 426.005 155.04 432.818 155.04C435.711 155.04 438.418 154.48 440.938 153.36C443.551 152.147 445.511 150.653 446.818 148.88ZM420.918 109.26C418.118 109.26 415.831 110.66 414.058 113.46C412.378 116.26 411.538 119.76 411.538 123.96C411.538 129.56 412.238 134.46 413.638 138.66L426.658 130.82C429.085 129.14 430.298 126.76 430.298 123.68C430.298 120.6 429.505 117.427 427.918 114.16C426.425 110.893 424.091 109.26 420.918 109.26ZM504.814 102.4C508.827 102.4 512.001 103.707 514.334 106.32C516.761 108.933 517.974 112.247 517.974 116.26C517.974 125.033 514.381 129.42 507.194 129.42C504.301 129.42 502.107 128.767 500.614 127.46C499.121 126.06 498.234 124.52 497.954 122.84C497.767 121.16 497.301 119.667 496.554 118.36C495.807 116.96 494.687 116.26 493.194 116.26C489.741 116.26 488.014 120.74 488.014 129.7V155.74C488.014 158.073 489.227 160.407 491.654 162.74C494.174 164.98 495.434 166.66 495.434 167.78V168.34C495.434 170.113 494.314 171 492.074 171H461.974C459.734 171 458.614 170.113 458.614 168.34V167.78C458.614 166.66 459.547 164.98 461.414 162.74C463.281 160.407 464.214 158.073 464.214 155.74V127.88C464.214 126.013 463.654 124.427 462.534 123.12C461.414 121.813 460.294 120.693 459.174 119.76C458.054 118.827 457.494 117.8 457.494 116.68V116.26C457.494 114.673 458.567 113.32 460.714 112.2L480.454 102.96C482.321 102.307 483.627 102.26 484.374 102.82C485.121 103.38 485.494 104.453 485.494 106.04V116.26C488.667 107.02 495.107 102.4 504.814 102.4ZM587.168 155.74C587.448 157.98 587.961 159.8 588.708 161.2C589.548 162.507 590.341 163.347 591.088 163.72C591.928 164.093 592.675 164.56 593.328 165.12C593.981 165.68 594.308 166.38 594.308 167.22C594.308 170.3 589.035 171.84 578.488 171.84C574.195 171.84 570.975 171.327 568.828 170.3C566.775 169.273 565.468 167.547 564.908 165.12C561.361 169.973 555.435 172.4 547.128 172.4C539.288 172.4 532.895 170.58 527.948 166.94C523.095 163.3 520.668 158.027 520.668 151.12C520.668 144.4 523.095 139.173 527.948 135.44C532.801 131.613 538.775 129.7 545.868 129.7C551.375 129.7 556.088 130.867 560.008 133.2V132.78C559.075 123.54 558.001 117.287 556.788 114.02C555.668 110.753 553.428 109.12 550.068 109.12C547.921 109.12 546.195 110.1 544.888 112.06C543.581 114.02 542.601 116.167 541.948 118.5C541.388 120.833 540.268 122.98 538.588 124.94C536.908 126.9 534.668 127.88 531.868 127.88C528.975 127.88 526.595 127.04 524.728 125.36C522.955 123.68 522.068 121.487 522.068 118.78C522.068 113.367 524.775 109.307 530.188 106.6C535.601 103.8 542.228 102.4 550.068 102.4C559.401 102.4 567.101 104.967 573.168 110.1C579.328 115.14 582.968 122 584.088 130.68L587.168 155.74ZM554.828 165.26C556.975 165.26 558.701 164.233 560.008 162.18C561.408 160.127 562.108 157.793 562.108 155.18L561.548 148.74C560.615 140.993 557.721 137.12 552.868 137.12C550.721 137.12 548.995 138.007 547.688 139.78C546.381 141.46 545.728 143.747 545.728 146.64C545.728 151.867 546.521 156.3 548.108 159.94C549.788 163.487 552.028 165.26 554.828 165.26Z" fill={color}/>
            </svg>
        </div>
   
    );
  };
  
  export default DynamicLogo;
  