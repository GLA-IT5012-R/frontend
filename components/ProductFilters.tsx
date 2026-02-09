'use client';

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

type FilterProps = {
    onApply?: (filters: { keyword: string; type: string; min_price: number | null; max_price: number | null }) => void;
    types?: string[];
};

export default function ProductFilters({
    onApply,
    types = ["雪板", "套装", "护具", "配件"],
}: FilterProps) {
    const [keyword, setKeyword] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [selectedType, setSelectedType] = useState("");

    const handleApply = () => {
        onApply?.({
            keyword,
            type: selectedType === "all" ? "" : selectedType,
            min_price: minPrice ? Number(minPrice) : null,
            max_price: maxPrice ? Number(maxPrice) : null,
        });
    };

    const handleReset = () => {
        setKeyword("");
        setSelectedType("");
        setMinPrice("");
        setMaxPrice("");
        onApply?.({
            keyword: "",
            type: "",
            min_price: null,
            max_price: null,
        });
    };

    return (
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between p-4">

            {/* 搜索框 */}
            <Input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Search products..."
                onKeyDown={(e) => {
                    if (e.key === "Enter") handleApply();
                }}
                className="w-full md:w-64"
            />

            {/* 类型筛选 */}
            <Select
                value={selectedType}
                onValueChange={(value) => setSelectedType(value)}
            >
                <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    {types.map((t) => (
                        <SelectItem key={t} value={t}>{t}</SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {/* 价格过滤 */}
            <div className="flex gap-2 items-center">
                <Input
                    type="number"
                    value={minPrice}
                    placeholder="Min Price"
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="w-24"
                />
                <span className="text-white">-</span>
                <Input
                    type="number"
                    value={maxPrice}
                    placeholder="Max Price"
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="w-24"
                />
                <Button onClick={handleApply}>Apply</Button>
                <Button variant="outline" onClick={handleReset}>Reset</Button>
            </div>
        </div>
    );
}
