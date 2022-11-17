import styles from "../styles/Interface.module.css";

const LoadingSymbol: React.FC = () => {
    // return (
    //     <div style={{ justifyContent: "center" }}>
    //       <div className={styles.loader}>
    //         <div></div>
    //         <div></div>
    //         <div></div>
    //       </div>
    //     </div>
    //   );
    return (
      <div>
        <svg width="320" height="320" viewBox="0 0 320 320" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect className={styles.iconElement1} x="106" y="90" width="63.0455" height="63.0455" fill="#E8798A"/>
          <rect className={styles.iconElement2} x="175.955" y="159.955" width="63.0455" height="63.0455" fill="#E8798A"/>
          <rect className={styles.iconElement3} x="106" y="159.955" width="63.0455" height="63.0455" rx="31.5227" fill="#E8798A"/>
          <rect className={styles.iconElement4} x="175.955" y="90" width="63.0455" height="63.0455" fill="#E8798A"/>
        </svg>
      </div>
    )
  };
  
  export default LoadingSymbol;