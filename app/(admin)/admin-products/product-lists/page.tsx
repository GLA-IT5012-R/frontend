"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { getProducts, updateProductStatus } from "@/api/auth";

type Product = {
  id: number;
  name: string;
  type: number;
  price: string;
  status: boolean;
  p_size: string;
  p_finish: string;
};

const PAGE_SIZE = 8;

const ProductListPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        setLoading(true);
        setError(null);

        const res: any = await getProducts({
          page,
          page_size: PAGE_SIZE,
          params: {},
        });

        // 后端 products/list/ 返回格式：
        // {
        //   code: 200,
        //   data: { total, page, page_size, list },
        //   message: "ok"
        // }
        if (res?.code === 200) {
          setProducts(res.data.list || []);
          setTotal(res.data.total || 0);
        } else {
          setError("加载失败");
        }
      } catch (e: any) {
        setError(e.message || "加载失败");
      } finally {
        setLoading(false);
      }
    };

    fetchProductsData();
  }, [page]);

  const handleToggleStatus = async (id: number, checked: boolean) => {
    // 先乐观更新 UI
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: checked } : p))
    );

    try {
      await updateProductStatus({ id: String(id), status: checked });
    } catch (e) {
      // 失败则回滚
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, status: !checked } : p))
      );
      console.error("Failed to update status", e);
    }
  };

  const handlePrev = () => {
    setPage((p) => Math.max(1, p - 1));
  };

  const handleNext = () => {
    setPage((p) => Math.min(totalPages, p + 1));
  };

  return (
    <div className="flex flex-col h-[80vh]">
      <h1 className="mb-4 text-2xl font-semibold">Products</h1>

      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500 text-sm">{error}</div>}

      {!loading && (
        <div className="flex-1 overflow-auto">
          <Table className="w-full h-full">
            <TableCaption>产品列表（共 {total} 条）</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Finish</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">{p.id}</TableCell>
                  <TableCell>{p.name}</TableCell>
                  <TableCell>{p.type}</TableCell>
                  <TableCell>{p.price}</TableCell>
                  <TableCell>
                    <Switch
                      checked={p.status}
                      onCheckedChange={(checked) =>
                        handleToggleStatus(p.id, checked)
                      }
                    />
                  </TableCell>
                  <TableCell>{p.p_size}</TableCell>
                  <TableCell>{p.p_finish}</TableCell>
                </TableRow>
              ))}
              {products.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center">
                    暂无数据
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={7}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Page {page} of {totalPages}, {PAGE_SIZE} items per page
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        className="border px-3 py-1 rounded disabled:opacity-50"
                        onClick={handlePrev}
                        disabled={page === 1}
                      >
                        Prev
                      </button>
                      <button
                        className="border px-3 py-1 rounded disabled:opacity-50"
                        onClick={handleNext}
                        disabled={page === totalPages}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      )}
    </div>
  );
};

export default ProductListPage;