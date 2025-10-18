import { Checkbox } from "@heroui/react";
import type { FormatOptions as FormatOptionsType } from "@/lib/guid";

interface FormatOptionsProps {
  options: FormatOptionsType;
  onChange: (options: FormatOptionsType) => void;
}

export function FormatOptions({ options, onChange }: FormatOptionsProps) {
  return (
    <div>
      <p className="mb-3 font-medium">Formatting Options</p>
      <div className="grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-3 md:grid-cols-5">
        <Checkbox
          isSelected={options.hyphens}
          onValueChange={(checked) =>
            onChange({ ...options, hyphens: checked })
          }
          classNames={{
            label: "text-sm font-medium"
          }}
        >
          Hyphens
        </Checkbox>
        <Checkbox
          isSelected={options.braces}
          onValueChange={(checked) =>
            onChange({ ...options, braces: checked })
          }
          classNames={{
            label: "text-sm font-medium"
          }}
        >
          Braces
        </Checkbox>
        <Checkbox
          isSelected={options.uppercase}
          onValueChange={(checked) =>
            onChange({ ...options, uppercase: checked })
          }
          classNames={{
            label: "text-sm font-medium"
          }}
        >
          Uppercase
        </Checkbox>
        <Checkbox
          isSelected={options.quotes}
          onValueChange={(checked) =>
            onChange({ ...options, quotes: checked })
          }
          classNames={{
            label: "text-sm font-medium"
          }}
        >
          Quotes
        </Checkbox>
        <Checkbox
          isSelected={options.commas}
          onValueChange={(checked) =>
            onChange({ ...options, commas: checked })
          }
          classNames={{
            label: "text-sm font-medium"
          }}
        >
          Commas
        </Checkbox>
      </div>
    </div>
  );
}
