import { defineField, defineType } from "sanity";

export default defineType({
  name: "shop",
  title: "Boutique",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Nom", type: "string", validation: (r) => r.required() }),
    defineField({ name: "hours", title: "Horaires", type: "hours" }),
  ],
});
