"use client";

import type { FormatOptions as FormatOptionsType } from "@/lib/guid";
import { Button, Card, CardBody, Checkbox, Input } from "@heroui/react";
import { Check } from "lucide-react";
import { FormatOptions } from "./FormatOptions";

interface GeneratorCardProps {
  quantity: string;
  onQuantityChange: (value: string) => void;
  formatOptions: FormatOptionsType;
  onFormatOptionsChange: (options: FormatOptionsType) => void;
  autoCopy: boolean;
  onAutoCopyChange: (value: boolean) => void;
  showCopiedMessage: boolean;
  onGenerate: () => void;
}

export function GeneratorCard({
  quantity,
  onQuantityChange,
  formatOptions,
  onFormatOptionsChange,
  autoCopy,
  onAutoCopyChange,
  showCopiedMessage,
  onGenerate,
}: GeneratorCardProps) {
  return (
    <Card className="rounded-xl shadow-xs p-6 card-border">
      <CardBody className="flex flex-col gap-6 p-0 overflow-visible">
        <h2 className="text-xl font-semibold">Generate GUIDs</h2>

        <div className="flex flex-col gap-4">
          <Input
            label="Quantity"
            type="number"
            value={quantity}
            onValueChange={onQuantityChange}
            min="1"
            max="1000"
            placeholder="1"
            className="flex-1"
            classNames={{
              inputWrapper: "h-14"
            }}
          />
          <Button
            color="primary"
            onPress={onGenerate}
            className="px-6 text-base font-semibold"
          >
            {showCopiedMessage ? (
              <>
                <Check className="w-4 h-4" />
                <span>Copied to clipboard</span>
              </>
            ) : (
              <span>Generate</span>
            )}
          </Button>
        </div>

        <FormatOptions
          options={formatOptions}
          onChange={onFormatOptionsChange}
        />

        <div className="mt-4 pt-4 border-t border-card">
          <p className="mb-3 font-medium">Clipboard</p>
          <Checkbox
            isSelected={autoCopy}
            onValueChange={onAutoCopyChange}
            classNames={{
              label: "text-sm font-medium"
            }}
          >
            Auto copy to clipboard
          </Checkbox>
        </div>
      </CardBody>
    </Card>
  );
}
