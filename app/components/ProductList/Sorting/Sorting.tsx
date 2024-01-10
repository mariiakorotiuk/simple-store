import { useState } from "react";
import { useNavigate, useSearchParams, useSubmit } from "@remix-run/react";
import styles from "./styles.module.css";

const Sorting: React.FC = ({  }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isSortingDesc, setIsSortingDesc] = useState<boolean>(searchParams.get("sorting") === "desc");

  const handleButtonClick = () => {    
    const updatedSorting = isSortingDesc ? "asc" : "desc";
    setIsSortingDesc(!isSortingDesc);
    if(searchParams.get("sorting")) {
      searchParams.set("sorting", updatedSorting);
      navigate(`?${searchParams.toString()}`);
    } else {
      const existingParams = searchParams.toString();
      navigate(`?${existingParams ? existingParams + "&" : ""}sorting=${updatedSorting}`);
    }
  }

  return (
    <div className={styles.root}>
      <p>Sort by Name</p>
      <button className={styles.arrow} onClick={handleButtonClick}>{isSortingDesc ? "↓" : "↑"}</button>
    </div>
  );
}

export default Sorting;
