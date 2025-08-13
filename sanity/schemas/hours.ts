import { defineField, defineType } from "sanity";

const timeRange = {
  name: "range",
  type: "object",
  fields: [
    {
      name: "start",
      title: "Début (HHmm)",
      type: "string",
      description: "Format HHmm, ex: 0700 (7h00)",
      validation: (r: any) => r.regex(/^\d{4}$/i, { name: "HHmm" }),
    },
    {
      name: "end",
      title: "Fin (HHmm)",
      type: "string",
      description: "Format HHmm, ex: 1315 (13h15)",
      validation: (r: any) => r.regex(/^\d{4}$/i, { name: "HHmm" }),
    },
  ],
};

export default defineType({
  name: "hours",
  title: "Horaires hebdomadaires",
  type: "object",
  fields: [
    defineField({ name: "monday", title: "Lundi", type: "array", of: [timeRange], description: "Laisser vide si fermé." }),
    defineField({ name: "tuesday", title: "Mardi", type: "array", of: [timeRange], description: "Laisser vide si fermé." }),
    defineField({ name: "wednesday", title: "Mercredi", type: "array", of: [timeRange], description: "Laisser vide si fermé." }),
    defineField({ name: "thursday", title: "Jeudi", type: "array", of: [timeRange], description: "Laisser vide si fermé." }),
    defineField({ name: "friday", title: "Vendredi", type: "array", of: [timeRange], description: "Laisser vide si fermé." }),
    defineField({ name: "saturday", title: "Samedi", type: "array", of: [timeRange], description: "Laisser vide si fermé." }),
    defineField({ name: "sunday", title: "Dimanche", type: "array", of: [timeRange], description: "Laisser vide si fermé." }),
  ],
});
