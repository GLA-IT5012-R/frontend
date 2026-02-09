import React from "react";
import Link from "next/link";

import { Heading } from "@/components/Heading";
import { Logo } from "@/components/Logo";
import { customizerSettings } from "@/data/customizer";

import { CustomizerControlsProvider } from "./context";
import Preview from "./Preview";
import Controls from "./Controls";
import Loading from "./Loading";
import AddToCartButton from "./AddToCartButton";

type SearchParams = {
  product_id?: string;

};

type PageProps = {
  searchParams?: Promise<SearchParams>;
};

export default async function Page({ searchParams }: PageProps) {
  // Await searchParams (Next.js 15+ requires this)
  const params = searchParams ? await searchParams : {};
  console.log('params', params);


  // Find selected options based on search params or use defaults
  // const defaultBoard =
  //   decks.find((d) => d.id === params.board) ?? decks[0];
  // const defaultBase =
  //   bases.find((b) => b.id === params.base) ?? bases[0];
  // const defaultBinding =
  //   bindings.find((b) => b.id === params.binding) ?? bindings[0];

  return (
    <CustomizerControlsProvider
      // defaultBoard={defaultBoard}
    >
      <div className="flex min-h-screen flex-col lg:flex-row">
        <div className="relative aspect-square shrink-0 bg-[#3a414a] lg:aspect-auto lg:grow">
          <div className="absolute inset-0">
            <Preview />
          </div>
          <Link href="/" className="absolute left-6 top-6">
            {/* <Logo className="h-12 text-white" /> */}
          </Link>
        </div>
        <div className="grow bg-texture bg-zinc-900 text-white ~p-4/6 lg:w-96 lg:shrink-0 lg:grow-0">
          <Heading className="mb-6 mt-0" as="h1">
            Build your board
          </Heading>
          <div className="flex flex-col gap-6 mb-6">
            {/* <Controls boards={decks} bases={bases} bindings={bindings} /> */}
          </div>
          {/* <AddToCartButton /> */}
        </div>
        {/* <Loading /> */}
      </div>
    </CustomizerControlsProvider>
  );
}
