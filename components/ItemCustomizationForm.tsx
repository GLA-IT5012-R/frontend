import React from "react";
import { Input } from "@/components/ui/input";
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";

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
  onChange: (field: string, value: any) => void;
}

export function ProductCustomizationForm({ data, formData, onChange }: ProductCustomizationFormProps) {
  const sizes = data.p_size?.split(",") || [];
  const finishes = data.p_finish?.split(",") || [];
  const flexes = data.p_flex?.split(",") || [];
  const textures = data.p_textures || {};

  const handleChange = (field: string, value: any) => {
    onChange(field, value);
  };

  const renderButtonGroup = (items: string[], field: string) => (
    <div className="flex flex-wrap gap-2 mt-2">
      {items.map((item) => (
        <button
          key={item}
          type="button"
          className={`px-3 py-1 rounded-full border-2 ${
            formData?.[field] === item ? "border-blue-500 bg-blue-50" : "border-gray-300"
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
                  {Object.entries(textures).map(([key, urls]: any) => (
                    <button
                      key={key}
                      type="button"
                      className={`w-16 h-16 rounded-full border-2 overflow-hidden ${
                        formData?.p_texture === key ? "border-blue-500" : "border-gray-300"
                      }`}
                      onClick={() => handleChange("p_texture", key)}
                    >
                      <img src={urls[0]} alt={key} className="w-full h-full object-cover" />
                    </button>
                  ))}

                  <label className="w-16 h-16 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-gray-400">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const url = URL.createObjectURL(file);
                          handleChange("p_texture", url);
                        }
                      }}
                    />
                    <span className="text-xs text-gray-500">Upload</span>
                  </label>
                </div>
              </Field>
            </FieldGroup>
          </FieldSet>

          {/* Custom Text */}
          <FieldSet>
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
          </FieldSet>

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
