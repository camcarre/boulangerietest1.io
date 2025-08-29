import { createClient, type SanityClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

// Ensure we have required environment variables with fallbacks
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "4og9np0r";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2023-10-01";

// Validate configuration
if (!projectId) {
  console.warn("Sanity project ID is not configured. Using fallback value.");
}

// Create a robust Sanity client that can handle build-time failures
let sanityClient: SanityClient;

try {
  sanityClient = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: true,
  });
} catch (error) {
  console.error("Failed to create Sanity client:", error);
  // Create a minimal client for build time with hardcoded values
  sanityClient = createClient({
    projectId: "4og9np0r",
    dataset: "production",
    apiVersion: "2023-10-01",
    useCdn: false,
  });
}

export { sanityClient };

// Create image builder with error handling
const builder = imageUrlBuilder(sanityClient);

type SanityImageLike = { asset?: { _ref?: string; _id?: string } | null } | null | undefined;
export function urlFor(source: SanityImageLike) {
  try {
    // If no source, return builder to avoid undefined access; callers decide usage
    return builder.image((source || { asset: undefined }) as { asset?: { _ref?: string; _id?: string } });
  } catch (error) {
    console.error("Error in urlFor:", error);
    // Return the builder with a fallback source to maintain the interface
    return builder.image({ asset: undefined });
  }
}
