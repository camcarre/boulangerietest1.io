import { defineField, defineType } from "sanity";

export default defineType({
  name: "category",
  title: "Catégorie",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Nom", type: "string", validation: (r) => r.required() }),
  ],
});
