import { defineField, defineType } from "sanity";

const timeRange = {
  name: "range",
  type: "object",
  fields: [
    { name: "start", title: "Début (HHmm)", type: "string" },
    { name: "end", title: "Fin (HHmm)", type: "string" },
  ],
};

export default defineType({
  name: "hours",
  title: "Horaires hebdomadaires",
  type: "object",
  fields: [
    defineField({ name: "monday", title: "Lundi", type: "array", of: [timeRange] }),
    defineField({ name: "tuesday", title: "Mardi", type: "array", of: [timeRange] }),
    defineField({ name: "wednesday", title: "Mercredi", type: "array", of: [timeRange] }),
    defineField({ name: "thursday", title: "Jeudi", type: "array", of: [timeRange] }),
    defineField({ name: "friday", title: "Vendredi", type: "array", of: [timeRange] }),
    defineField({ name: "saturday", title: "Samedi", type: "array", of: [timeRange] }),
    defineField({ name: "sunday", title: "Dimanche", type: "array", of: [timeRange] }),
  ],
});
