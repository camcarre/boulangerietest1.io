import { defineField, defineType } from "sanity";

export default defineType({
  name: "product",
  title: "Produit",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Nom", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "category",
      title: "Catégorie",
      type: "reference",
      to: [{ type: "category" }],
      validation: (r) => r.required(),
      options: { disableNew: false },
    }),
    defineField({ name: "image", title: "Image principale", type: "image", options: { hotspot: true } }),
    defineField({ name: "description", title: "Description", type: "text", description: "Exemple: Pâte à choux garnie d'une crème mousseline pralinée, noisettes torréfiées.", initialValue: "Exemple: Pâte à choux garnie d'une crème mousseline pralinée, noisettes torréfiées." }),
    defineField({
      name: "allergens",
      title: "Allergènes",
      description: "Sélectionner dans la liste (gérée globalement).",
      type: "array",
      of: [{ type: "reference", to: [{ type: "allergen" }] }],
      options: { sortable: true },
    }),
    defineField({
      name: "basePrice",
      title: "Prix de base (€)",
      description: "Utilisé si aucune taille n'est définie.",
      type: "number",
      validation: (r) => r.min(0),
    }),
    defineField({
      name: "variants",
      title: "Tailles et prix",
      description: "Liste claire pour l'affichage: une ligne = une taille avec son prix.",
      type: "array",
      options: { layout: "table" },
      of: [
        defineField({
          name: "variant",
          type: "object",
          fields: [
            { name: "label", title: "Taille", type: "string", validation: (r) => r.required() },
            { name: "price", title: "Prix (€)", type: "number", validation: (r) => r.required().min(0) },
          ],
          preview: {
            select: { title: "label", subtitle: "price" },
            prepare({ title, subtitle }) {
              return { title: title || "Taille", subtitle: subtitle != null ? `${subtitle} €` : "" };
            },
          },
        }),
      ],
    }),
    defineField({
      name: "shops",
      title: "Disponibilités par boutique",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "shop", title: "Boutique", type: "reference", to: [{ type: "shop" }], validation: (r) => r.required() },
            { name: "available", title: "Disponible", type: "boolean", initialValue: true },
            { name: "priceOverride", title: "Prix spécifique (optionnel)", type: "number" },
          ],
          preview: {
            select: { title: "shop.title", available: "available", price: "priceOverride" },
            prepare({ title, available, price }) {
              const status = available ? "disponible" : "indisponible";
              const priceTxt = price != null ? ` • ${price} €` : "";
              return { title: title || "Boutique", subtitle: `${status}${priceTxt}` };
            },
          },
        },
      ],
    }),
  ],
});
