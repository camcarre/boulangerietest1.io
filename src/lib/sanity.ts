import { createClient, type SanityClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const sanityClient: SanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2023-10-01",
  useCdn: true,
});

const builder = imageUrlBuilder(sanityClient);
type SanityImageLike = { asset?: { _ref?: string; _id?: string } | null } | null | undefined;
export function urlFor(source: SanityImageLike) {
  // If no source, return builder to avoid undefined access; callers decide usage
  return builder.image((source || { asset: undefined }) as { asset?: { _ref?: string; _id?: string } });
}
