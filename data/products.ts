// data.ts

export type TextureUrls = {
  [key: string]: string[];
};

export type Asset = {
  id: number;
  type: string;
  asset_code: string;
  type_name: string;
  name: string;
  desc: string;
  size: string;
  topsheet_finish: string;
  flex: string;
  texture_urls: TextureUrls;
};

export type Product = {
  id: number;
  name: string;
  type: number;
  price: string;
  status: boolean;
  asset: Asset;
};

export type ProductData = {
  data: Product[];
};

export const products: ProductData = {
  data: [
    {
      id: 1,
      name: "Beginner Snowboard",
      type: 1,
      price: "199.90",
      status: true,
      asset: {
        id: 4,
        type: "snowboard",
        asset_code: "SB-001",
        type_name: "雪板",
        name: "Burton Custom X",
        desc: "适合进阶滑手，高性能雪板",
        size: "150,155,160",
        topsheet_finish: "matte",
        flex: "soft",
        texture_urls: {
          "SB-001": ["api/media/textures/TX001.png"]
        }
      }
    },
    {
      id: 2,
      name: "All Weather Goggles",
      type: 1,
      price: "199.90",
      status: true,
      asset: {
        id: 5,
        type: "snowboard",
        asset_code: "SB-002",
        type_name: "雪板",
        name: "Lib Tech T.Rice Pro",
        desc: "自由式与全能雪板的最佳选择",
        size: "148,153,158",
        topsheet_finish: "gloss",
        flex: "regular",
        texture_urls: {
          "SB-002": ["api/media/textures/TX002.png"]
        }
      }
    },
    {
      id: 3,
      name: "Comfort Snow Boots",
      type: 1,
      price: "199.90",
      status: true,
      asset: {
        id: 6,
        type: "snowboard",
        asset_code: "SB-003",
        type_name: "雪板",
        name: "Ride Warpig",
        desc: "短板、高反应，适合公园和全地形",
        size: "140,145,150",
        topsheet_finish: "matte",
        flex: "stiff",
        texture_urls: {
          "SB-003": ["api/media/textures/TX003.png"]
        }
      }
    }]
};