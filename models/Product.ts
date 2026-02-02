export interface ProductModelProps {
  id: string           // 商品 ID
  type: string         // 商品类型 e.g. "snowboard"
  typeId: string       // 商品唯一编号 e.g. "SB-001"
  name: string         // 商品名称
  variant: string        // 变体类型 e.g. "camber", "flat", "rocker"
  textureUrls: string[] | undefined // 贴图路径列表 e.g. [top.png, bottom.png, side.png]
  selectedVariant?: 'camber' | 'flat' | 'rocker' | string // 可选，选择哪组 mesh
  className?: string
  style?: React.CSSProperties
  price?: number        // 价格，单位分
  reviews?  : number      // 评价数量
  // width?: number       // canvas 宽度
  // height?: number      // canvas 高度
}
