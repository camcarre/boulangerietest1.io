import { defineField, defineType } from "sanity";

export default defineType({
  name: "product",
  title: "Produit",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Nom",
      type: "string",
      description: "Nom public du produit. Exemple: Paris-Brest, Baguette tradition.",
      validation: (r) => r.required(),
    }),
    // Support multiple categories per product
    defineField({
      name: "categories",
      title: "Catégories",
      type: "array",
      of: [{ type: "reference", to: [{ type: "category" }] }],
      description: "Sélectionner une ou plusieurs catégories (exemples: Pâtisserie, Viennoiserie, Pain, Snacking).",
      options: { sortable: true },
    }),
    // Legacy single category (kept hidden for backward compatibility with older data)
    defineField({
      name: "category",
      title: "Catégorie (ancien champ)",
      type: "reference",
      to: [{ type: "category" }],
      hidden: true,
      options: { disableNew: true },
    }),
    defineField({
      name: "image",
      title: "Image principale",
      type: "image",
      description: "Conseil: image carrée 800×800 ou plus, bien centrée (hotspot activé).",
      options: { hotspot: true },
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      description: "Bref texte marketing (2–3 phrases). Exemple: Pâte à choux garnie d'une crème mousseline pralinée, noisettes torréfiées.",
      initialValue: "Exemple: Pâte à choux garnie d'une crème mousseline pralinée, noisettes torréfiées.",
    }),
    defineField({
      name: "allergens",
      title: "Allergènes",
      description: "Sélectionner dans la liste globale (exemples: gluten, œufs, lait, fruits à coque).",
      type: "array",
      of: [{ type: "reference", to: [{ type: "allergen" }] }],
      options: { sortable: true },
    }),
    // Le prix de base est désactivé: on ne gère que les tailles
    defineField({
      name: "basePrice",
      title: "Prix de base (€)",
      description: "Désactivé — utilisez uniquement les tailles avec prix.",
      type: "number",
      hidden: true,
    }),
    defineField({
      name: "variants",
      title: "Tailles et prix",
      description: "Une ligne = une taille avec son prix. Exemples de tailles: Individuelle, 4 parts, 6 parts.",
      type: "array",
      options: { layout: "table" },
      of: [
        defineField({
          name: "variant",
          type: "object",
          fields: [
            { name: "label", title: "Taille", type: "string", description: "Exemple: Individuelle, 4 parts, 6 parts.", validation: (r) => r.required() },
            { name: "price", title: "Prix (€)", type: "number", description: "Exemple: 3.5 (sans €).", validation: (r) => r.required().min(0) },
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
      description: "Marquer le produit disponible par boutique. Optionnel: prix spécifique si différent sur place (laisser vide sinon).",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "shop", title: "Boutique", type: "reference", to: [{ type: "shop" }], validation: (r) => r.required() },
            { name: "available", title: "Disponible", type: "boolean", initialValue: true },
            { name: "priceOverride", title: "Prix spécifique (optionnel)", type: "number", description: "Saisir seulement si différent (ex: 3.8)." },
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
