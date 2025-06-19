"use client";
import React from "react";
import { HeroParallax } from "../components/ui/hero-parallax";
import productsData from "../data/productsData";

// Create product array from productsData
const products = [
  ...productsData.left.map((product) => ({
    title: product.name,
    link: "/dual-carousel", // You can customize this link
    thumbnail: product.image,
  })),
  ...productsData.right.map((product) => ({
    title: product.name,
    link: "/dual-carousel", // Or use individual links if needed
    thumbnail: product.image,
  })),
];

export function HeroParallaxDemo() {
  return <HeroParallax products={products} />;
}

export default HeroParallaxDemo;
