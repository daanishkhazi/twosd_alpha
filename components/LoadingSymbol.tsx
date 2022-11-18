import styles from "../styles/Interface.module.css";

const LoadingSymbol = (props: { color: string }) => {
  const color = props.color;        
    return (
      <div className="flex fill-current">
        <svg className="h-full" viewBox="0 0 488 488" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect className={styles.iconElement1} width="231.325" height="231.325" fill={color}/>
          <rect className={styles.iconElement2} x="256.675" y="256.675" width="231.325" height="231.325" fill={color}/>
          <rect className={styles.iconElement3} y="256.675" width="231.325" height="231.325" rx="115.662" fill={color}/>
          <rect className={styles.iconElement4} x="256.675" width="231.325" height="231.325" fill={color}/>
        </svg>
      </div>
    )
  };
  
  export default LoadingSymbol;