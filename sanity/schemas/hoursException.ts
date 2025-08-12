import { defineField, defineType } from "sanity";

export default defineType({
  name: "hoursException",
  title: "Exception d'horaires",
  type: "object",
  fields: [
    defineField({ name: "date", title: "Date", type: "date", validation: (r) => r.required() }),
    defineField({ name: "label", title: "Label", type: "string" }),
    defineField({ name: "closed", title: "Fermé", type: "boolean", initialValue: true }),
    defineField({ name: "ranges", title: "Plages horaires (si ouvert)", type: "array", of: [{ type: "object", fields: [ { name: "start", type: "string" }, { name: "end", type: "string" } ] }] }),
  ],
});
