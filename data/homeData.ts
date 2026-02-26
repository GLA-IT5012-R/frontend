// types.ts
export type RichText = Array<{
  type: 'paragraph';
  text: string;
  emphasis?: string;
}>;

export type Link = {
  url: string;
  text: string;
};

export type HeroSlice = {
  slice_type: 'hero';
  heading: string;
  body: RichText;
  button?: Link; // 可选
};

export type ProductGridSlice = {
  slice_type: 'product_grid';
  heading: string;
  body: RichText;
};

export type VideoBlockSlice = {
  slice_type: 'video_block';
  youtube_video_id: string;
};

// 所有 slice 的联合类型
export type Slice = HeroSlice | ProductGridSlice | VideoBlockSlice;

// homepage 数据类型
export type HomeData = {
  meta_title: string;
  meta_description: string;
  slices: Slice[];
};

export const homeData: HomeData = {
  meta_title: "Snow craft - Build Your Custom Snowboard",
  meta_description: "Not just a board, your board. Design a snowboard that's as real as the places you take it.",
  slices: [
    {
      slice_type: 'hero',
      heading: "Go Beyond Snow",
      body: [
        {
          type: 'paragraph',
          text: "Not just a board, your board. Design a board that's as real as the places you take it.",
          emphasis: "your board"
        }
      ],
      button: {
        url: '#',
        text: 'Build Your Board'
      }
    },
    {
      slice_type: 'product_grid',
      heading: "Latest & Hot",
      body: [
        { type: 'paragraph', text: "Check out our newest snowboard designs" }
      ]
    },
    {
      slice_type: 'video_block',
      youtube_video_id: 'BqDWZ_z4GQw'
    }
  ]
};