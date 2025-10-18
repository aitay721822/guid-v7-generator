"use client";

import { useT } from "@/app/i18n/client";
import type { FormatOptions as FormatOptionsType } from "@/lib/guid";
import { Checkbox } from "@heroui/react";

interface FormatOptionsProps {
  options: FormatOptionsType;
  onChange: (options: FormatOptionsType) => void;
}

export function FormatOptions({ options, onChange }: FormatOptionsProps) {
  const { t } = useT();

  return (
    <div>
      <p className="mb-3 font-medium">{t("formatOptions.title")}</p>
      <div className="grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-3 md:grid-cols-5">
        <Checkbox
          isSelected={options.hyphens}
          onValueChange={(checked) =>
            onChange({ ...options, hyphens: checked })
          }
          classNames={{
            label: "text-sm font-medium",
          }}
        >
          {t("formatOptions.hyphens")}
        </Checkbox>
        <Checkbox
          isSelected={options.braces}
          onValueChange={(checked) => onChange({ ...options, braces: checked })}
          classNames={{
            label: "text-sm font-medium",
          }}
        >
          {t("formatOptions.braces")}
        </Checkbox>
        <Checkbox
          isSelected={options.uppercase}
          onValueChange={(checked) =>
            onChange({ ...options, uppercase: checked })
          }
          classNames={{
            label: "text-sm font-medium",
          }}
        >
          {t("formatOptions.uppercase")}
        </Checkbox>
        <Checkbox
          isSelected={options.quotes}
          onValueChange={(checked) => onChange({ ...options, quotes: checked })}
          classNames={{
            label: "text-sm font-medium",
          }}
        >
          {t("formatOptions.quotes")}
        </Checkbox>
        <Checkbox
          isSelected={options.commas}
          onValueChange={(checked) => onChange({ ...options, commas: checked })}
          classNames={{
            label: "text-sm font-medium",
          }}
        >
          {t("formatOptions.commas")}
        </Checkbox>
      </div>
    </div>
  );
}
