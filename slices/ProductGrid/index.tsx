'use client';
import { Bounded } from "@/components/Bounded";
import { Heading } from "@/components/Heading";
import { SnowboardProduct } from "./SnowboardProduct";
import { SlideIn } from "@/components/SlideIn";
import { ProductGridSlice } from "@/data/homepage";
import { JSX, useEffect, useState } from "react";
import { mockModelData } from "./mock";
import { getProducts } from "@/api/auth";

/**
 * Props for `ProductGrid`.
 */
export type ProductGridProps = {
  slice: ProductGridSlice;
};

/**
 * Component for "ProductGrid" Slices.
 */
const ProductGrid = ({ slice }: ProductGridProps): JSX.Element => {
  const [hotList, sethotList] = useState([])
  useEffect(() => {
    // console.log('mockModelData', mockModelData.length)
    getProducts().then(res => {
      console.log('Products from API:', res.data);
      if (res.code == 200 && res.data.length > 0) {
        sethotList(res.data || []);
      }
    }).catch(err => {
      console.error('Failed to fetch products:', err);
    });
  }, []);



  return (
    <Bounded
      id="products"
      data-slice-type={slice.slice_type}
      className="bg-texture bg-brand-gray"
    >
      <SlideIn>
        <Heading className="text-center ~mb-4/6" as="h2">
          {slice.heading}
        </Heading>
      </SlideIn>
      <SlideIn>
        <div className="text-center ~mb-6/10">
          {slice.body.map((paragraph, index) => (
            <p key={index}>{paragraph.text}</p>
          ))}
        </div>
      </SlideIn>
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {hotList.map((product, idx) => (
          <SnowboardProduct
            key={`product-${product.id}`}
            idx={idx}
            data={product}
          />
        ))}
      </div>
    </Bounded>
  );
};

export default ProductGrid;
