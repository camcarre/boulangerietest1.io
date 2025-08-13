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
      description: "Titre court affiché en légende. Exemple: Viennoiseries du matin.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      description: "Image horizontale conseillée (ex: 1600×900).",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "shop",
      title: "Boutique (optionnel)",
      type: "reference",
      to: [{ type: "shop" }],
      description: "Associer la boutique pour filtrer l'affichage. Laisser vide = visible dans toutes les boutiques.",
    }),
  ],
});
