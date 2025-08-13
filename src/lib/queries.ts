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
  return sanityClient.fetch(shopByTitleQuery, { title });
}

export async function getAllShops(): Promise<Shop[]> {
  return sanityClient.fetch(allShopsQuery);
}

export async function getAllCategories(): Promise<{ _id: string; title: string }[]> {
  return sanityClient.fetch(allCategoriesQuery);
}

export async function getProductsForShop(shopId: string): Promise<Product[]> {
  return sanityClient.fetch(productsForShopQuery, { shopId });
}

export async function getPhotosForShop(shopId: string): Promise<Photo[]> {
  return sanityClient.fetch(photosForShopQuery, { shopId });
}
