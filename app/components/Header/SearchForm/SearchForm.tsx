import { Form, useSearchParams, useSubmit } from "@remix-run/react";
import { FormEvent, useEffect, useState } from "react";

const SearchForm: React.FC = () => {
  const submit = useSubmit();
  const [searchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState<string>("");

  const search = searchParams.get("search");

  useEffect(() => {
    setSearchValue(search || "");
  }, [search]);

  const handleSearchChange = (event: FormEvent<HTMLInputElement>) => {
    setSearchValue(event.currentTarget.value);
  }

  const handleFormChange = (event: FormEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget);
    searchParams.getAll("category").forEach((category) => {
      formData.append("category", category);
    });
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
      id="search-form"
      onChange={handleFormChange}
      role="search">
      <input
        value={searchValue}
        onChange={handleSearchChange}
        aria-label="Search products"
        placeholder="Search"
        type="search"
        name="search"
      />
    </Form>)
}

export default SearchForm;