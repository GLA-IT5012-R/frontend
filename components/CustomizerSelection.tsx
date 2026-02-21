import React, { useEffect, useState } from "react";
import { CustomizerCanvas } from "./CustomizeCanvas";
import { ProductCustomizationForm } from "./ItemCustomizationForm";

interface CustomizerSelectionProps {
  data: any;
  formData: any; // 父组件传入状态
  onChange: (field: string, value: any) => void; // 表单改动回调给父组件
  renderButtons?: (formData: any) => React.ReactNode;
}

function isTextureUrl(v: string): boolean {
  return typeof v === "string" && (v.startsWith("/") || v.startsWith("http"));
}

export function CustomizerSelection({
  data,
  formData,
  onChange,
  renderButtons,
}: CustomizerSelectionProps): React.ReactElement {
  const [localFormData, setLocalFormData] = useState(formData);
  // 用户上传的纹理 URL 单独保存，切换回预设后仍可回显与再次选择
  const [uploadedTextureUrl, setUploadedTextureUrl] = useState<string | null>(null);

  useEffect(() => {
    setLocalFormData(formData);
  }, [formData]);

  useEffect(() => {
    const v = formData?.p_textures;
    if (v && isTextureUrl(String(v))) setUploadedTextureUrl(v);
  }, [formData?.p_textures]);

  const handleFormChange = (field: string, value: any) => {
    if (field === "p_textures" && isTextureUrl(String(value))) {
      setUploadedTextureUrl(value);
    }
    onChange(field, value);
    setLocalFormData((prev) => ({ ...prev, [field]: value }));
  };


  const typeId = data?.asset?.type_id;
  const presetTextures = typeId ? data?.p_textures?.[typeId] : undefined;
  const currentPTexture = localFormData?.p_textures;

  const textureUrlsForCanvas: string[] = (() => {
    if (!presetTextures) return [];
    const firstPresetUrl = Array.isArray(presetTextures)
      ? presetTextures[0]
      : (Object.values(presetTextures as Record<string, string[]>) as string[][])[0]?.[0];
    if (!currentPTexture) return firstPresetUrl ? [firstPresetUrl] : [];
    if (isTextureUrl(currentPTexture)) return [currentPTexture];
    if (Array.isArray(presetTextures)) return firstPresetUrl ? [firstPresetUrl] : [];
    const urls = (presetTextures as Record<string, string[]>)[currentPTexture];
    return urls?.length ? [urls[0]] : firstPresetUrl ? [firstPresetUrl] : [];
  })();


  
  return (
    <div className="flex flex-col lg:flex-row w-full min-h-[600px] border border-gray-200 rounded-lg overflow-hidden">
      {/* Left: 3D Model Canvas */}
      <div className="w-full lg:w-1/2 bg-gray-50 h-[500px] lg:h-auto relative shrink-0">
        {data.asset && (presetTextures || textureUrlsForCanvas.length > 0) && (
          <CustomizerCanvas
            typeId={data.asset.type_id}
            finish={localFormData?.p_finish || ""}
            textureUrls={textureUrlsForCanvas}
            customText={localFormData?.p_custom_text ?? ""}
            isDoubleSided={data?.is_double_sided !== false && data?.is_double_sided !== "false"}
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
            uploadedTextureUrl={uploadedTextureUrl}
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
