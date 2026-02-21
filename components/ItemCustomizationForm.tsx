import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { uploadTextureApi } from "@/api/auth";
import { toast } from "sonner"

export const LABELS = {
  SIZE: "Size",
  FINISH: "Sheet Finish",
  FLEX: "Flexibility / Porosity",
  TEXTURE: "Texture",
  CUSTOM_TEXT: "Custom Text",
  CUSTOM_TEXT_DESC: "Text will be shown on the product",
  QUANTITY: "Quantity",
  QUANTITY_DESC: "Enter the quantity you want to purchase",
};

interface ProductCustomizationFormProps {
  data: any;
  formData: any;
  /** 用户上传的纹理 URL，单独保存以便切回预设后仍可回显与再次选择 */
  uploadedTextureUrl?: string | null;
  onChange: (field: string, value: any) => void;
}

export function ProductCustomizationForm({ data, formData, uploadedTextureUrl = null, onChange }: ProductCustomizationFormProps) {
  const sizes = data.p_size?.split(",") || [];
  const finishes = data.p_finish?.split(",") || [];
  const flexes = data.p_flex?.split(",") || [];
  const textures = data.p_textures || {};
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleChange = (field: string, value: any) => {
    onChange(field, value);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError(null);
    setUploading(true);

    try {
      const res: any = await uploadTextureApi(file);

      if (res?.code === 200) {
        const url = res.data?.url;

        if (url) {
          handleChange("p_textures", url);
          toast.success("Texture uploaded successfully");
        } else {
          setUploadError("Upload succeeded but no URL returned.");
          toast.error("Upload failed: no URL returned");
        }
      } else {
        const msg = res?.message || "Upload failed";
        setUploadError(msg);
        toast.error(msg);
      }
    } catch (err: unknown) {
      const ax = err as {
        response?: { data?: { message?: string } };
        message?: string;
      };

      const msg =
        ax?.response?.data?.message ??
        ax?.message ??
        "Upload failed.";

      setUploadError(msg);
      toast.error(msg);
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const renderButtonGroup = (items: string[], field: string) => (
    <div className="flex flex-wrap gap-2 mt-2">
      {items.map((item) => (
        <button
          key={item}
          type="button"
          className={`px-3 py-1 rounded-full border-2 ${formData?.[field] === item ? "border-blue-500 bg-blue-50" : "border-gray-300"
            }`}
          onClick={() => handleChange(field, item)}
        >
          {item}
        </button>
      ))}
    </div>
  );

  return (
    <div className="w-full">
      <form>
        <FieldGroup>
          {/* Size */}
          <FieldSet>
            <FieldGroup>
              <Field>
                <FieldLabel>{LABELS.SIZE}</FieldLabel>
                {renderButtonGroup(sizes, "p_size")}
              </Field>
            </FieldGroup>
          </FieldSet>

          {/* Finish */}
          <FieldSet>
            <FieldGroup>
              <Field>
                <FieldLabel>{LABELS.FINISH}</FieldLabel>
                {renderButtonGroup(finishes, "p_finish")}
              </Field>
            </FieldGroup>
          </FieldSet>

          {/* Flex */}
          <FieldSet>
            <FieldGroup>
              <Field>
                <FieldLabel>{LABELS.FLEX}</FieldLabel>
                {renderButtonGroup(flexes, "p_flex")}
              </Field>
            </FieldGroup>
          </FieldSet>

          {/* Texture */}
          <FieldSet>
            <FieldGroup>
              <Field>
                <FieldLabel>{LABELS.TEXTURE}</FieldLabel>
                <FieldDescription>Select a texture or upload your own image</FieldDescription>
                <div className="flex flex-wrap gap-2 mt-2">
                  {(Object.entries(textures) as [string, string[]][]).map(([key, urls]) => (
                    <button
                      key={key}
                      type="button"
                      className={`w-16 h-16 rounded-full border-2 overflow-hidden ${formData?.p_textures === key ? "border-blue-500" : "border-gray-300"
                        }`}
                      onClick={() => handleChange("p_textures", key)}
                    >
                      <img src={urls[0]} alt={key} className="w-full h-full object-cover" />
                    </button>
                  ))}

                  {/* 用户上传的图片回显：用 uploadedTextureUrl 持久显示，切换预设后仍存在；再次上传即替换 */}
                  {uploadedTextureUrl && (
                    <button
                      type="button"
                      className={`w-16 h-16 rounded-full border-2 overflow-hidden shrink-0 ${formData?.p_textures === uploadedTextureUrl ? "border-blue-500" : "border-gray-300"
                        }`}
                      onClick={() => handleChange("p_textures", uploadedTextureUrl)}
                    >
                      <img
                        src={uploadedTextureUrl}
                        alt="Uploaded"
                        className="w-full h-full object-cover"
                      />
                    </button>
                  )}

                  <label
                    className={`w-16 h-16 rounded-full border-2 border-dashed flex items-center justify-center cursor-pointer transition-colors ${uploading ? "border-gray-200 bg-gray-50 cursor-not-allowed" : "border-gray-300 hover:border-gray-400"
                      }`}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      disabled={uploading}
                      onChange={handleUpload}
                    />
                    <span className="text-xs text-gray-500">
                      {uploading ? "..." : "Upload"}
                    </span>
                  </label>
                  {uploadError && (
                    <p className="text-xs text-red-500 mt-1 w-full">{uploadError}</p>
                  )}
                </div>
              </Field>
            </FieldGroup>
          </FieldSet>

          {/* Custom Text */}
          {/* <FieldSet>
            <FieldGroup>
              <Field>
                <FieldLabel>{LABELS.CUSTOM_TEXT}</FieldLabel>
                <FieldDescription>{LABELS.CUSTOM_TEXT_DESC}</FieldDescription>
                <Input
                  type="text"
                  placeholder="e.g. Your name or slogan"
                  maxLength={32}
                  value={formData?.p_custom_text ?? ""}
                  onChange={(e) => handleChange("p_custom_text", e.target.value)}
                  className="mt-2"
                />
              </Field>
            </FieldGroup>
          </FieldSet> */}

          {/* Quantity */}
          <FieldSet>
            <FieldGroup>
              <Field>
                <FieldLabel>{LABELS.QUANTITY}</FieldLabel>
                <FieldDescription>{LABELS.QUANTITY_DESC}</FieldDescription>
                <Input
                  type="number"
                  min={1}
                  value={formData?.quantity || 1}
                  onChange={(e) => handleChange("quantity", parseInt(e.target.value))}
                />
              </Field>
            </FieldGroup>
          </FieldSet>
        </FieldGroup>
      </form>
    </div>
  );
}
