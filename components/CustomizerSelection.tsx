import React, { useEffect, useState } from "react";
import { CustomizerCanvas } from "./CustomizeCanvas";
import { ProductCustomizationForm } from "./ItemCustomizationForm";

interface CustomizerSelectionProps {
  data: any;
  formData: any; // 父组件传入状态
  onChange: (field: string, value: any) => void; // 表单改动回调给父组件
  renderButtons?: (formData: any) => React.ReactNode;
}

export function CustomizerSelection({
  data,
  formData,
  onChange,
  renderButtons,
}: CustomizerSelectionProps): React.ReactElement {
  // 内部 state 用于本地表单同步
  const [localFormData, setLocalFormData] = useState(formData);

  useEffect(() => {
    setLocalFormData(formData);
  }, [formData]);

  const handleFormChange = (field: string, value: any) => {
    onChange(field, value);
    setLocalFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-[600px] border border-gray-200 rounded-lg overflow-hidden">
      {/* Left: 3D Model Canvas */}
      <div className="w-full lg:w-1/2 bg-gray-50 h-[500px] lg:h-auto relative flex-shrink-0">
        {data.asset && data.p_textures?.[data.asset.type_id] && (
          <CustomizerCanvas
            typeId={data.asset.type_id}
            finish={localFormData?.p_finish || ""}
            textureUrls={data.p_textures[data.asset.type_id] || []}
            orbitControls={true}
            className="h-full w-full"
          />
        )}
      </div>

      {/* Right: Customization Parameters */}
      <div className="w-full lg:w-1/2 bg-white border-l border-gray-200 flex flex-col">
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <ProductCustomizationForm
            data={data}
            formData={localFormData}
            onChange={handleFormChange}
          />
        </div>
        {renderButtons && (
          <div className="p-6 flex gap-2 border-t border-gray-200 bg-white">
            {renderButtons(localFormData)}
          </div>
        )}
      </div>
    </div>
  );
}
