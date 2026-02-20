'use client';
import { useEffect, useState } from "react";
import { Scribble } from "../app/(public)/products/Scribble";
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
import { Title } from '../app/(public)/products/others'
import { addCustomDesignApi, addOrderApi } from "@/api/auth";
import { toast } from "sonner"
import { useAuth } from '@/contexts/auth-context';

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
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<any>(null); // 保存 CustomizerSelection 的 formData
  const userid = JSON.parse(localStorage.getItem('userInfo'))?.id;

  const scribbleColor = SCRIBBLE_COLORS[idx % SCRIBBLE_COLORS.length];

  // 初始化 formData，默认选中每个选项的第一个
  const initFormData = () => ({
    p_size: getDefault(data.p_size),
    p_finish: getDefault(data.p_finish),
    p_flex: getDefault(data.p_flex),
    p_textures: data.p_textures[data.asset.type_id]?.[0] || null,
    quantity: 1,
  });

  useEffect(() => {
    if (data) {
      setFormData(initFormData());
    }
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
    // alert(`Added to cart: ${data.name} (Qty: ${formData.quantity})`);
    toast.success(`Added to cart: ${data.name} (Qty: ${formData.quantity})`)
    // submit formData to backend
    addCustomDesignApi({
      product_id: data.id,
      user_id: userid, // TODO: replace with actual user ID
      p_size: formData.p_size,
      p_finish: formData.p_finish,
      p_flex: formData.p_flex,
      p_textures: formData.p_textures || [],
    }).then((res) => {
      console.log("Custom design added:", res);

    }).catch((err) => {
      console.error("Failed to add custom design:", err);
    });
  }

  // --------------------------
  // 下单 / 支付逻辑
  // --------------------------
  const onPay = async (formData: any) => {
    if (!formData) return;
    const userAddress = user?.address?.trim() || "";

    // ✅ 地址校验
    if (!userAddress) {
      toast.error("Please add your shipping address in your profile before placing an order.");
      return; // 终止下单
    }



    try {
      // 1️⃣ 先创建定制
      const designRes = await addCustomDesignApi({
        product_id: data.id,
        user_id: userid, // TODO: replace with actual user ID
        p_size: formData.p_size,
        p_finish: formData.p_finish,
        p_flex: formData.p_flex,
        p_textures: formData.p_textures || [],
      });

      if (designRes.code !== 200) {
        toast.error("Failed to create design");
        return;
      }

      const designId = designRes.data.id;
      const productId = designRes.data.product_id;

      // 2️⃣ 计算总价
      const quantity = formData.quantity || 1;
      const unitPrice = data.price; // 假设 product 里有 price
      const totalPrice = quantity * unitPrice;

      // 3️⃣ 调用订单接口
      const orderRes = await addOrderApi({
        user_id: userid, // TODO: replace with actual user ID
        total_price: totalPrice,
        order_status: "Pending",
        address: userAddress, // TODO: 换成用户地址
        email: user?.email || "",
        list: [
          {
            design_id: designId,
            product_id: productId,
            quantity,
            unit_price: unitPrice,
          },
        ],
      });

      if (orderRes.code === 200) {
        toast.success("Order created successfully!");
        setOpen(false);
      } else {
        toast.error("Order creation failed");
      }

    } catch (err) {
      console.error("Order failed:", err);
      toast.error("Something went wrong");
    }
  };


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
            finish={data.asset.finish || 'matte'}
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
            <button
              disabled={!data.status} // status false 就禁用按钮
              className={`
                inline-flex items-center font-bold px-4 text-base fl-py-2/2.5
                transition-[filter,background-position] duration-300
                rounded-md text-black
                ${data.status
                            ? 'button-cutout bg-gradient-to-b from-25% to-75% bg-[length:100%_400%] hover:bg-bottom from-brand-blue to-brand-lime'
                            : 'button-cutout bg-gray-300 cursor-not-allowed opacity-70 hover:bg-gray-300'}
              `}
            >
              {data.status ? 'Customize' : 'Sold Out'}
            </button>
          </DrawerTrigger>

          <DrawerContent className="w-[90vw]" >
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
