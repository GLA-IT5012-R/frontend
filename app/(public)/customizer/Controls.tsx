"use client";

import clsx from "clsx";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";

import { useCustomizerControls } from "./context";
import { SnowboardDeckOption, SnowboardBaseOption, SnowboardBindingOption } from "@/data/customizer";

type Props = {
  boards: SnowboardDeckOption[];
  bases: SnowboardBaseOption[];
  bindings: SnowboardBindingOption[];
};

export default function Controls({ boards, bases, bindings }: Props) {
  const { selectedBoard, setBoard, selectedBase, setBase, selectedBinding, setBinding } = useCustomizerControls();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const params = new URLSearchParams(searchParams?.toString());
    if (selectedBoard) params.set("board", selectedBoard.id);
    if (selectedBase) params.set("base", selectedBase.id);
    if (selectedBinding) params.set("binding", selectedBinding.id);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [selectedBoard, selectedBase, selectedBinding, router, pathname, searchParams]);

  return (
    <>
      <Options
        title="Board"
        selected={selectedBoard?.name}
        options={boards.map((board) => (
          <Option
            key={board.id}
            name={board.name}
            image={board.texture}
            selected={selectedBoard?.id === board.id}
            onClick={() => setBoard(board)}
          />
        ))}
      />
      <Options
        title="Base"
        selected={selectedBase?.name}
        options={bases.map((base) => (
          <Option
            key={base.id}
            name={base.name}
            color={base.color}
            selected={selectedBase?.id === base.id}
            onClick={() => setBase(base)}
          />
        ))}
      />
      {/* Bindings section commented out until binding models are available/integrated
      <Options
        title="Bindings"
        selected={selectedBinding?.name}
        options={bindings.map((binding) => (
          <Option
            key={binding.id}
            name={binding.name}
            color={binding.color}
            selected={selectedBinding?.id === binding.id}
            onClick={() => setBinding(binding)}
          />
        ))}
      />
      */}
    </>
  );
}

function Options({
  title,
  selected,
  options,
}: {
  title: string;
  selected?: string;
  options: JSX.Element[];
}) {
  const selectedFormatted = selected
    ?.split(" ")
    .map((word) => word.toLowerCase())
    .join(" ");

  return (
    <div>
      <div className="flex">
        <h2 className="font-sans uppercase ~text-lg/xl mb-2">{title}</h2>
        <p className="ml-3 text-zinc-300">
          <span className="select-none text-zinc-500">| </span>
          {selectedFormatted}
        </p>
      </div>
      <ul className="mb-1 flex flex-wrap gap-2">{options}</ul>
    </div>
  );
}

type OptionImageProps = {
  name: string;
  image: { url: string; alt: string };
  selected: boolean;
  onClick: () => void;
  color?: never;
};

type OptionColorProps = {
  name: string;
  color: string;
  selected: boolean;
  onClick: () => void;
  image?: never;
};

type OptionProps = OptionImageProps | OptionColorProps;

function Option({ name, image, color, selected, onClick }: OptionProps) {
  return (
    <li>
      <button
        className={clsx(
          "size-10 cursor-pointer rounded-full bg-black p-0.5 outline-2 outline-white",
          selected && "outline"
        )}
        onClick={onClick}
      >
        {image && (
          <Image
            src={image.url}
            alt={image.alt}
            width={150}
            height={150}
            className="pointer-events-none h-full w-full rounded-full"
          />
        )}
        {color && (
          <div
            className="h-full w-full rounded-full"
            style={{ backgroundColor: color }}
          />
        )}
        <span className="sr-only">{name}</span>
      </button>
    </li>
  );
}
