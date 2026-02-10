'use client';
import { useEffect, useState } from "react";
import { Scribble } from "./Scribble";
import Link from "next/link";
import { ProductModelCanvas } from "@/components/ProductModelCanvas";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button";
import { CustomizerSelection } from "@/components/CustomizerSelection";
import { Title } from './others'

const SCRIBBLE_COLORS = [
  '#f97316', // orange
  '#ec4899', // pink
  '#ef4444', // red
  '#eab308', // yellow
  '#d6d3d1', // gray
]

// 辅助函数：处理后端字段，取第一个有效值
const getDefault = (str?: string) => {
  if (!str) return "";
  const arr = str.split(",").map(s => s.trim()).filter(Boolean);
  return arr[0] || "";
}

export function ProductItem({ idx, data }: any): React.ReactElement | null {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<any>(null); // 保存 CustomizerSelection 的 formData

  const scribbleColor = SCRIBBLE_COLORS[idx % SCRIBBLE_COLORS.length];

  // 初始化 formData，默认选中每个选项的第一个
  const initFormData = () => ({
    p_size: getDefault(data.p_size),
    p_finish: getDefault(data.p_finish),
    p_flex: getDefault(data.p_flex),
    p_texture: Object.keys(data.p_textures || {})[0] || "",
    quantity: 1,
  });

  useEffect(() => {
    if (data) {
      setFormData(initFormData());
    }
  }, [data]);

  useEffect(() => {
    console.log('ProductItem Rendered: ', data);
  }, [data]);

  // --------------------------
  // 加入购物车逻辑
  // --------------------------
  const onAddToCart = (formData: any) => {
    if (!formData) return;
    console.log("Add to cart:", {
      productId: data.id,
      ...formData
    });
    alert(`Added to cart: ${data.name} (Qty: ${formData.quantity})`);
  }

  // --------------------------
  // 下单 / 支付逻辑
  // --------------------------
  const onPay = (formData: any) => {
    if (!formData) return;
    console.log("Place order:", {
      productId: data.id,
      ...formData
    });
    alert(`Order placed for: ${data.name} (Qty: ${formData.quantity})`);
  }

  // --------------------------
  // 抽屉关闭时重置表单
  // --------------------------
  const handleDrawerClose = () => {
    setOpen(false);
    setFormData(initFormData());
  }

  return (
    <div className="group relative mx-auto w-full max-w-72 px-8 pt-4 ">
      <Title {...data} />
      <div className="-mb-1 overflow-hidden py-4">
        <Scribble
          className="absolute inset-0 h-full w-full"
          color={scribbleColor}
        />

        {data.asset && data.p_textures?.[data.asset.type_id] && (
          <ProductModelCanvas
            typeId={data.asset.type_id}
            textureUrls={data.p_textures[data.asset.type_id] || []}
            orbitControls={false}
            className="w-full h-[350px] mx-auto origin-top transform-gpu transition-transform duration-500 ease-in-out group-hover:scale-150"
          />
        )}
      </div>

      <h3 className="my-2 text-center font-sans leading-tight ~text-lg/xl">
        {data.name}
      </h3>

      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        <Drawer direction="right" dismissible={false}
          open={open}
          onOpenChange={(val) => setOpen(val)}>
          <DrawerTrigger asChild>
            <Link
              href={'#'}
              className="button-cutout inline-flex items-center bg-gradient-to-b from-25% to-75% bg-[length:100%_400%] font-bold transition-[filter,background-position] duration-300 hover:bg-bottom px-4 text-base fl-py-2/2.5 from-brand-blue to-brand-lime text-black"
            >
              Customize
            </Link>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Customizer Modal</DrawerTitle>
              <DrawerDescription>Configure your snowboard!</DrawerDescription>
            </DrawerHeader>
            <div className="w-full no-scrollbar overflow-y-auto px-4">
              <CustomizerSelection
                data={data}
                formData={formData}
                renderButtons={() => null} // 按钮由 DrawerFooter 管理
                onChange={(field: string, value: any) => {
                  setFormData((prev: any) => ({ ...prev, [field]: value }));
                }}
              />
            </div>
            <DrawerFooter>
              <Button onClick={() => onAddToCart(formData)}>
                Add to cart
              </Button>

              <Button variant="destructive" onClick={() => onPay(formData)}>
                Pay it
              </Button>

              <DrawerClose asChild>
                <Button onClick={handleDrawerClose} variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
}
