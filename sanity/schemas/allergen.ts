import { defineField, defineType } from "sanity";

export default defineType({
  name: "allergen",
  title: "Allergène",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Nom",
      type: "string",
      description: "Exemples: gluten, œufs, lait, arachides, fruits à coque.",
      validation: (r) => r.required(),
    }),
  ],
});
