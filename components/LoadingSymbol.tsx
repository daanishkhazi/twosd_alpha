import styles from "../styles/Interface.module.css";

const LoadingSymbol = (props: { color: string }) => {
  const color = props.color;        
    return (
      <div className="flex fill-current">
        <svg className="h-full" viewBox="0 0 488 488" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g className={styles.iconfull} >
            {/* <rect width="231.325" height="231.325" fill={color}/>
            <rect x="256.675" y="256.675" width="231.325" height="231.325" fill={color}/>
            <rect y="256.675" width="231.325" height="231.325" rx="115.662" fill={color}/>
            <rect x="256.675" width="231.325" height="231.325" fill={color}/> */}
            <rect id="Rectangle 5" x="71.4729" y="71.4156" width="163.533" height="163.533" fill={color}/>
            <rect id="Rectangle 6" x="252.927" y="252.87" width="163.533" height="163.533" fill={color}/>
            <rect id="Rectangle 7" x="71.4729" y="253.099" width="163.533" height="163.533" rx="81.7664" fill={color}/>
            <rect id="Rectangle 8" x="252.927" y="71.416" width="163.533" height="163.533" fill={color}/>
          </g>
        </svg>
      </div>
    )
  };
  
  export default LoadingSymbol;