import { defineField, defineType } from "sanity";

export default defineType({
  name: "shop",
  title: "Boutique",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Nom", type: "string", description: "Exemples: La Plaine-sur-Mer, Tharon Plage.", validation: (r) => r.required() }),
    defineField({ name: "hours", title: "Horaires", type: "hours", description: "Saisir les plages HHmm (ex: 0700 → 13h00). Laisser vide = fermé." }),
  ],
});
