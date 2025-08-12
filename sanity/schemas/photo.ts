import { defineField, defineType } from "sanity";

/**
 * Photo (gallery photo)
 * Each document represents a single photo with a name.
 */
export default defineType({
  name: "photo",
  title: "Photo",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Nom de la photo",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "shop",
      title: "Boutique (optionnel)",
      type: "reference",
      to: [{ type: "shop" }],
    }),
  ],
});
