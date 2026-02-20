'use client';
import { JSX } from "react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

import { Bounded } from "@/components/Bounded";
import { Heading } from "@/components/Heading";
import { SkateboardIcon } from "@/components/SnowboardIcon";
import { InteractiveSnowboard } from "./InteractiveSnowboard";
import { WideLogo } from "./WideLogo";
import { TallLogo } from "./TallLogo";
import { HeroSlice } from "@/data/homepage";
import { Leva } from "leva";

/**
 * Props for `Hero`.
 */
export type HeroProps = {
  slice: HeroSlice;
};

/**
 * Component for "Hero" Slices.
 */
const Hero = ({ slice }: HeroProps): JSX.Element => {


  // const { isSignedIn } = useUser();
  const router = useRouter();

  const handleBuild = (e: React.MouseEvent) => {
    e.preventDefault();
  };
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      className="bg-brand-yellow relative h-dvh overflow-hidden text-zinc-800 bg-texture"
    >
      <Leva collapsed={true} />
      <div className="absolute inset-0 flex items-center pt-20">
        <WideLogo className="w-full text-brand-purple hidden opacity-20 mix-blend-multiply lg:block px-10" />
        <TallLogo className="w-3/4 mx-auto text-brand-purple opacity-20 mix-blend-multiply lg:hidden" />
      </div>

      <div className="absolute inset-0 mx-auto mt-24 grid max-w-6xl grid-rows-[1fr,auto] place-items-end px-6 fl-py-10/16">
        <Heading className="relative max-w-2xl place-self-start ">
          {slice.heading}
        </Heading>
        <div className="flex relative w-full flex-col items-center justify-between fl-gap-2/4 lg:flex-row">
          <div className="max-w-[45ch] font-semibold fl-text-lg/xl">
            {slice.body.map((paragraph, index) => {
              if (paragraph.emphasis) {
                const parts = paragraph.text.split(paragraph.emphasis);
                return (
                  <p key={index}>
                    {parts[0]}
                    <span className="font-black text-brand-blue">{paragraph.emphasis}</span>
                    {parts[1]}
                  </p>
                );
              }
              return <p key={index}>{paragraph.text}</p>;
            })}
          </div>
          {/* <Link
            href={slice.button.url}
            // href={slice.button.url}
            onClick={handleBuild}
            className="button-cutout group z-5 mt-2 inline-flex items-center bg-gradient-to-b from-25% to-75% bg-[length:100%_400%] font-bold transition-[filter,background-position] duration-300 hover:bg-bottom gap-4 px-2 fl-text-lg/2xl fl-py-0.5/4 from-brand-blue to-brand-lime text-black md:mr-4"
          >
            <div className="flex fl-size-10/12 items-center justify-center transition-transform group-hover:-rotate-[25deg]">
              <SkateboardIcon className="h-full w-full" />
            </div>
            <div className="w-px self-stretch bg-black/25" />
            {slice.button.text}
          </Link> */}
        </div>
      </div>
      {/* 3d-模型 */}
      
      <InteractiveSnowboard />
    </Bounded>
  );
};

export default Hero;
