import { groq } from "next-sanity";
import { sanityClient } from "./sanity";
import type { Photo, Product, Shop } from "./types";

export const shopByTitleQuery = groq`*[_type == "shop" && title == $title][0]{
  _id,
  title,
  hours
}`;

export const allShopsQuery = groq`*[_type == "shop"]{ _id, title, hours }`;

export const allCategoriesQuery = groq`*[_type == "category"]|order(title asc){ _id, title }`;

export const productsForShopQuery = groq`*[_type == "product" && defined(shops[shop._ref == $shopId] [0])]{
  _id,
  title,
  image,
  description,
  basePrice,
  variants,
  // support both legacy single category and new multiple categories
  category->{_id, title},
  categories[]->{_id, title},
  allergens[]->{_id, title}
}`;

export const photosForShopQuery = groq`*[_type == "photo" && (!defined(shop) || shop._ref == $shopId)]|order(_createdAt desc){
  _id,
  title,
  image
}`;

export async function getShopByTitle(title: string): Promise<Shop | null> {
  try {
    return await sanityClient.fetch(shopByTitleQuery, { title });
  } catch (error) {
    console.error(`Error fetching shop by title "${title}":`, error);
    return null;
  }
}

export async function getAllShops(): Promise<Shop[]> {
  try {
    return await sanityClient.fetch(allShopsQuery);
  } catch (error) {
    console.error("Error fetching all shops:", error);
    return [];
  }
}

export async function getAllCategories(): Promise<{ _id: string; title: string }[]> {
  try {
    return await sanityClient.fetch(allCategoriesQuery);
  } catch (error) {
    console.error("Error fetching all categories:", error);
    return [];
  }
}

export async function getProductsForShop(shopId: string): Promise<Product[]> {
  try {
    return await sanityClient.fetch(productsForShopQuery, { shopId });
  } catch (error) {
    console.error(`Error fetching products for shop "${shopId}":`, error);
    return [];
  }
}

export async function getPhotosForShop(shopId: string): Promise<Photo[]> {
  try {
    return await sanityClient.fetch(photosForShopQuery, { shopId });
  } catch (error) {
    console.error(`Error fetching photos for shop "${shopId}":`, error);
    return [];
  }
}
