import styles from "../styles/Interface.module.css";

const LoadingSymbol = (props: { color: string }) => {
  const color = props.color;        
    return (
      <div className="flex fill-current">
        <svg className="h-full" viewBox="0 0 510 510" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g className={styles.iconfull} >
            <rect width="231.325" height="231.325" fill={color}/>
            <rect x="256.675" y="256.675" width="231.325" height="231.325" fill={color}/>
            <rect y="256.675" width="231.325" height="231.325" rx="115.662" fill={color}/>
            <rect x="256.675" width="231.325" height="231.325" fill={color}/>
          </g>
        </svg>
      </div>
    )
  };
  
  export default LoadingSymbol;