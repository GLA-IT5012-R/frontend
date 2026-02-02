'use client';
import { Bounded } from "@/components/Bounded";
import { Heading } from "@/components/Heading";
import { SnowboardProduct } from "./SnowboardProduct";
import { SlideIn } from "@/components/SlideIn";
import { ProductGridSlice } from "@/data/homepage";
import { JSX, useEffect } from "react";
import { mockModelData } from "./mock";

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

  useEffect(() => {
    console.log('mockModelData', mockModelData.length)
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
        {mockModelData.map((data,idx) => (
          <SnowboardProduct
            idx={idx}
            key={data.id}
            id={data.id}
            type={data.type}
            typeId={data.type_id}
            name={data.name}
            selectedVariant={data.variant}
            textureUrls={data.textures}
            price={data.price}
            reviews={data.reviews}
          />
        ))}
      </div>
    </Bounded>
  );
};

export default ProductGrid;
