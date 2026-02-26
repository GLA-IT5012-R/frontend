
import { Metadata } from "next";
// Type
import { homeData, Slice} from "@/data/homeData";
// Slices
import Hero from "@/slices/Hero";
import ProductGrid from "@/slices/ProductGrid";
import VideoBlock from "@/slices/VideoBlock";


export default async function Page() {
  return (
    <div>
      {homeData.slices.map((slice: Slice, index: number) => {
        switch (slice.slice_type) {
          case "hero":
            return <Hero key={index} slice={slice} />;
          case "product_grid":
            return <ProductGrid key={index} slice={slice} />;
          case "video_block":
            return <VideoBlock key={index} slice={slice} />;
          default:
            return null; // 如果出现其他 slice，暂时不渲染
        }
      })}
    </div>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: homeData.meta_title,
    description: homeData.meta_description,
  };
}