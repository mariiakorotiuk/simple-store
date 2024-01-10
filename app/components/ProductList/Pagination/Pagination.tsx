import { FormEvent } from "react";
import { useNavigate, useSearchParams } from "@remix-run/react";
import styles from "./styles.module.css";

interface PaginationProps {
  limits: number;
  currentPage: number;
  total: number;
}

const Pagination: React.FC<PaginationProps> = ({ limits, currentPage, total }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const pageCount = Math.ceil(total / limits);

  const handleButtonClick = (event: FormEvent<HTMLButtonElement>) => {
    const page = event.currentTarget.value;
    if(searchParams.get("page")) {
      searchParams.set("page", page);
      navigate(`?${searchParams.toString()}`);
    } else {
      const existingParams = searchParams.toString();
      navigate(`?${existingParams ? existingParams + "&" : ""}page=${page}`);
    }
  }

  return (
    <div className={styles.root}>
      {Array.from({ length: pageCount }, (_, index) => index + 1).map((page, index) => 
        <button
          key={index}
          className={page === currentPage ? styles.currentPage : styles.page}
          onClick={handleButtonClick}
          value={page}
        >
          {page}
        </button>)}
    </div>
  )
}

export default Pagination;