'use client';
import { Bounded } from "@/components/Bounded";
import { Heading } from "@/components/Heading";
import { CustomizerDrawer } from "./CustomizerDrawer";
import { JSX, useEffect, useState } from "react";
import { getProducts } from "@/api/auth";
import ProductFilters from "@/components/ProductFilters";

const Products = () => {
  const [dataList, setDataList] = useState<any[]>([]);
  const [filters, setFilters] = useState({
    keyword: "",
    type: "",
    min_price: null as number | null,
    max_price: null as number | null,
  });

  const page = 1;
  const page_size = 8;

  // ---------- 拉取产品数据 ----------
  const fetchProducts = (filtersParam = filters) => {
    // 只传有值的参数，后端默认处理空值
    const params: Record<string, any> = {};
    if (filtersParam.keyword) params.keyword = filtersParam.keyword;
    if (filtersParam.type) params.type = filtersParam.type;
    if (filtersParam.min_price !== null) params.min_price = filtersParam.min_price;
    if (filtersParam.max_price !== null) params.max_price = filtersParam.max_price;

    getProducts({ page, page_size, params })
      .then((res) => {
        if (res.code === 200) {
          setDataList(res.data.list || []);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch products:", err);
      });
  };

  // ---------- 初次加载 ----------
  useEffect(() => {
    fetchProducts();
  }, []);

  // ---------- 筛选回调 ----------
  const handleApplyFilters = (appliedFilters: typeof filters) => {
    setFilters((prev) => ({ ...prev, ...appliedFilters }));
    fetchProducts({ ...filters, ...appliedFilters });
  };

  return (
    <Bounded className="bg-texture bg-brand-gray">
      <div className="mt-20">
        <Heading className="text-center ~mb-4/6" as="h2">
          All Products
        </Heading>

        <ProductFilters
          onApply={handleApplyFilters}
        />
      </div>

      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 mt-6">
        {dataList.map((product, idx) => (
          <CustomizerDrawer key={`product-${product.id}`} idx={idx} data={product} />
        ))}
      </div>
    </Bounded>
  );
};

export default Products;
