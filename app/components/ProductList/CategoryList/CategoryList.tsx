import { Form, useSearchParams, useSubmit } from "@remix-run/react";
import { FormEvent, useEffect, useState } from "react";
import styles from "./styles.module.css";

interface CategoryListProps {
  categories: string[];
}

const CategoryList: React.FC<CategoryListProps> = ({ categories }) => {
  const submit = useSubmit();
  const [searchParams] = useSearchParams();

  const [checkedCategories, setCheckedCategories] = useState(searchParams.getAll("category"));

  useEffect(() => {
    setCheckedCategories(searchParams.getAll("category"));
  }, [searchParams]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, category: string) => {
    const isChecked = event.target.checked;
    setCheckedCategories((prevCheckedCategories) => {
      if (isChecked) {
        return [...prevCheckedCategories, category];
      } else {
        return prevCheckedCategories.filter((c) => c !== category);
      }
    });
  };

  const handleFormChange = (event: FormEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget);
    const search = searchParams.get("search");
    if (search) {
      formData.append("search", search);
    }
    const sorting = searchParams.get("sorting");
    if (sorting) {
      formData.append("sorting", sorting);
    }
    const page = searchParams.get("page");
    if (page) {
      formData.append("page", page);
    }
    submit(formData);
  }

  return (
    <Form 
      id="category-form"
      className={styles.root}
      onChange={(event) => handleFormChange(event)}
      role="search"
    >
      {categories.map((category, index) => 
        <label key={index} className={styles.category}>
          <input
            type="checkbox"
            name="category"
            checked={checkedCategories.includes(category)}
            onChange={(event) => handleCheckboxChange(event, category)}
            value={category}
          />{" "}
          {category}
        </label>
      )}
    </Form>
  )
}

export default CategoryList;