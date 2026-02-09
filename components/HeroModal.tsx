"use client";

import { ReactNode } from "react";

interface CustomModalProps {
  open: boolean;                  // 是否显示弹窗
  onClose?: () => void;           // 关闭事件，可选
  children: ReactNode;            // 弹窗主体内容
  showCloseButton?: boolean;      // 是否显示右上角叉号
  footerButtons?: ReactNode;      // 底部自定义按钮
}

export default function CustomModal({
  open,
  onClose,
  children,
  showCloseButton = true,
  footerButtons,
}: CustomModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-[90%] max-w-lg rounded-xl bg-white shadow-xl animate-scale-in">
        {/* Header */}
        <div className="flex items-start justify-between border-b px-4 py-3">
          <div className="flex-1">{/* 留空或自定义 header 内容 */}</div>

          {showCloseButton && onClose && (
            <button
              onClick={onClose}
              className="rounded-md p-1 hover:bg-slate-100"
            >
              {/* 小叉号 SVG */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-slate-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>

        {/* Body */}
        <div className="p-4">{children}</div>

        {/* Footer */}
        {footerButtons && (
          <div className="flex justify-end gap-2 border-t px-4 py-3">
            {footerButtons}
          </div>
        )}
      </div>
    </div>
  );
}
