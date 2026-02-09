'use client'

import * as React from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface MySelectProps {
  options: string[]          // 接收字符串数组作为选项
  value?: string             // 当前选中值（可选）
  onChange?: (value: string) => void // 选中回调
  placeholder?: string       // 占位文字
  className?: string         // 自定义样式
}

export function SelectComp({
  options,
  value,
  onChange,
  placeholder = "请选择",
  className,
}: MySelectProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
