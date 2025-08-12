import { defineField, defineType } from "sanity";

export default defineType({
  name: "allergen",
  title: "Allergène",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Nom", type: "string", validation: (r) => r.required() }),
  ],
});
