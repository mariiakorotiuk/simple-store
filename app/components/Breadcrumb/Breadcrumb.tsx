import { UIMatch, useMatches } from "@remix-run/react";
import styles from "./styles.module.css";

interface Handle {
  breadcrumb: (match: UIMatch) => React.ReactNode;
}

const Breadcrumb = () => {
  const matches = useMatches();

  return (
    <div className={styles.root}>
      {matches
        .filter((match) =>
          match.handle && (match.handle as Handle)?.breadcrumb
        )
        .map((match, index, array) => (
          <div className={styles.match} key={index}>
            <h3 className={styles.title}>
              {(match.handle as Handle).breadcrumb(match)}
            </h3>  
            {index !== array.length - 1 && <h3 className={styles.arrow }>{">"}</h3>}
          </div>
        ))}
    </div>
  )
}

export default Breadcrumb;
