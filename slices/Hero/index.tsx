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
import { HeroSlice } from "@/data/homeData";
import { Leva } from "leva";
import { motion, AnimatePresence } from 'motion/react';
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


      <div className=" w-hull h-[50vh] md:h-[80vh] flex items-center ">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 }}
        >

          <Heading className="text-4xl text-gary-800 relative max-w-2xl place-self-start md:text-8xl uppercase tracking-tighter mb-8 ">
            {slice.heading}<br />
            <span className="text-stroke">world.</span>
          </Heading>
        </motion.div>
      </div>

      <div className="absolute inset-0 flex justify-end items-end px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}      // 下方向初始偏移
          animate={{ opacity: 1, y: 0 }}       // 向上移动到正常位置
          exit={{ opacity: 0, y: 20 }}         // 离开时向下
          transition={{ delay: 1, duration: 0.6 }}
          className="max-w-md"
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={slice.heading}
              initial={{ opacity: 0, y: 20 }}     // 下方初始
              animate={{ opacity: 1, y: 0 }}      // 向上动画
              exit={{ opacity: 0, y: 20 }}        // 离开动画
              transition={{ duration: 0.5 }}
              className="text-lg text-zinc-500 font-light leading-relaxed"
            >
              {slice.body.map((paragraph, index) => {
                if (paragraph.emphasis) {
                  const parts = paragraph.text.split(paragraph.emphasis);
                  return (
                    <span key={index}>
                      {parts[0]}
                      <span className="font-black text-brand-orange">{paragraph.emphasis}</span>
                      {parts[1]}
                    </span>
                  );
                }
                return <span key={`px-${index}`}>{paragraph.text}</span>;
              })}
            </motion.p>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* <div className="absolute inset-0 mx-auto mt-24 grid max-w-6xl grid-rows-[1fr,auto] place-items-end px-6 fl-py-10/16">
        <Heading className="relative max-w-2xl place-self-start ">
          {slice.heading}
        </Heading>
        <div className="flex relative w-full flex-col items-center justify-end fl-gap-2/4 lg:flex-row">
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
        </div>
      </div> */}
      {/* 3d-模型 */}
      <InteractiveSnowboard />
    </Bounded>
  );
};

export default Hero;
