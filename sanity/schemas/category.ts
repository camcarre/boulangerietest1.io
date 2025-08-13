import { defineField, defineType } from "sanity";

export default defineType({
  name: "category",
  title: "Catégorie",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Nom",
      type: "string",
      description: "Exemples: Pâtisserie, Viennoiserie, Pain, Snacking.",
      validation: (r) => r.required(),
    }),
  ],
});
