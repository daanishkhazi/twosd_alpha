import styles from "../styles/Interface.module.css";

const LoadingSymbol: React.FC = () => {
    return (
        <div style={{ justifyContent: "center" }}>
          <div className={styles.loader}>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      );
  };
  
  export default LoadingSymbol;