'use client';
import { useEffect, useEffectEvent } from "react";
import { FaStar } from "react-icons/fa6";
import { HorizontalLine, VerticalLine } from "@/components/Line";
import clsx from "clsx";
import { Scribble } from "./Scribble";
import { skateboards } from "@/data/skateboards";
import Link from "next/link";
import Image from "next/image";
import { ProductModelCanvas } from "@/components/ProductModelCanvas";
import type { ProductModelProps } from '@/models/Product'

const VERTICAL_LINE_CLASSES =
  "absolute top-0 h-full stroke-2 text-stone-300 transition-colors group-hover:text-stone-400";

const HORIZONTAL_LINE_CLASSES =
  "-mx-8 stroke-2 text-stone-300 transition-colors group-hover:text-stone-400";

const SCRIBBLE_COLORS = [
  '#f97316', // orange
  '#ec4899', // pink
  '#ef4444', // red
  '#eab308', // yellow
  '#d6d3d1', // gray
]

export function SnowboardProduct({ idx, data }: any): React.ReactElement | null {

  useEffect(() => {
    console.log('SnowboardProduct Rendered: ', data);
  }, []);

  // const product = skateboards.find((p) => p.id === data.id);

  // if (!product) {
  //   return null;
  // }

  // const price = `$${(product.price / 100).toFixed(2)}`;
  const scribbleColor = SCRIBBLE_COLORS[idx % SCRIBBLE_COLORS.length]


  return (
    <div className="group relative mx-auto w-full max-w-72 px-8 pt-4 ">
      <VerticalLine className={clsx(VERTICAL_LINE_CLASSES, "left-4")} />
      <VerticalLine className={clsx(VERTICAL_LINE_CLASSES, "right-4")} />
      <HorizontalLine className={HORIZONTAL_LINE_CLASSES} />

      <div className="flex items-center justify-between ~text-sm/2xl">
        <span>￡ {data.price}</span>
        <span className="inline-flex items-center gap-1">
          <FaStar className="text-yellow-400" /> {data.reviews}
        </span>
      </div>
      <div className="-mb-1 overflow-hidden py-4">

        <Scribble
          className="absolute inset-0 h-full w-full"
          color={scribbleColor}
        />

        {/* <Image
          src={product.image.url}
          alt={product.image.alt}
          width={150}
          height={150}
          className=" mx-auto w-[58%] origin-top transform-gpu transition-transform duration-500 ease-in-out group-hover:scale-150"
        /> */}

        <ProductModelCanvas
          {...data.asset}
          textureUrls={data.asset.texture_urls[`${data.asset.type_id}`]}
          // style={{ width: '100%', height: '300px' }}
          // className="w-full h-[350px]"
          orbitControls={false}
          className=" w-full h-[350px] mx-auto origin-top transform-gpu transition-transform duration-500 ease-in-out group-hover:scale-150"

        />
      </div>
      <HorizontalLine className={HORIZONTAL_LINE_CLASSES} />

      <h3 className="my-2 text-center font-sans leading-tight ~text-lg/xl">
        {data.name}
      </h3>

      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        <Link
          // href={data.customizer_link.url}
          href={'#'}
          className="button-cutout inline-flex items-center bg-gradient-to-b from-25% to-75% bg-[length:100%_400%] font-bold transition-[filter,background-position] duration-300 hover:bg-bottom px-4 text-base fl-py-2/2.5 from-brand-blue to-brand-lime text-black"
        >
          {/* {data.customizer_link.text} */} Customize
        </Link>
      </div>
    </div>
  );
}
