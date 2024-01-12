import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { importCategories } from "~/services/import.server";

export const loader: LoaderFunction = async ()  => {
  const categories = await importCategories();
  return categories;
}

export default function ImportPage() {
  useLoaderData<typeof loader>();

  return (
    <div>Import</div>
  )
}