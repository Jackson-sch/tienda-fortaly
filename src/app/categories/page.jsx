import { getCategories } from "@/api/getCategories";
import React from "react";

export default async function page() {
  const categories = await getCategories();
  console.log(categories);
  return <div>{
    categories.map((category) => (
      <div key={category.slug}>
        <h1>{category.name}</h1>
        <p>{category.description}</p>
        <img src={category.image} alt={category.name} />
      </div>
    ))
    }</div>;
}
