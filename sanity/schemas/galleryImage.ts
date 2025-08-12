import { defineField, defineType } from "sanity";

export default defineType({
  name: "galleryImage",
  title: "Image de galerie",
  type: "object",
  fields: [
    defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true }, validation: (r) => r.required() }),
    defineField({ name: "caption", title: "Légende", type: "string" }),
  ],
});
