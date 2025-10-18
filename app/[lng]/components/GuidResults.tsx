"use client";

import { Button, Card, CardBody } from "@heroui/react";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { useT } from "@/app/i18n/client";

interface GuidResultsProps {
  guids: string[];
  onCopyAll: () => void;
}

export function GuidResults({ guids, onCopyAll }: GuidResultsProps) {
  const { t } = useT();
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  const handleCopyGuid = async (guid: string, index: number) => {
    try {
      await navigator.clipboard.writeText(guid);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const handleCopyAll = async () => {
    await onCopyAll();
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  if (guids.length === 0) {
    return null;
  }

  return (
    <Card className="rounded-xl shadow-xs p-6 card-border">
      <CardBody className="p-0">
        <div className="flex flex-col justify-between gap-4 pb-4 sm:flex-row sm:items-center border-b border-card">
          <h3 className="text-xl font-semibold">
            {t("guidResults.title", { count: guids.length })}
          </h3>
          <Button
            size="sm"
            variant="flat"
            color="primary"
            onPress={handleCopyAll}
            startContent={
              copiedAll ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )
            }
            className="h-10 px-4 text-sm font-semibold whitespace-nowrap sm:w-auto"
          >
            {copiedAll ? t("guidResults.copied") : t("guidResults.copyAll")}
          </Button>
        </div>

        <div className="mt-4 space-y-2">
          {guids.map((guid, index) => (
            <div key={guid} className="flex items-center gap-2">
              <code className="text-sm overflow-hidden text-ellipsis whitespace-nowrap flex-1 min-w-0 bg-default-100 hover:bg-default-200 border-2 border-default-200 rounded-medium px-3 py-2 transition-colors">
                {guid}
              </code>
              <Button
                isIconOnly
                size="sm"
                variant="light"
                onPress={() => handleCopyGuid(guid, index)}
                aria-label={t("guidResults.copyGuid")}
                className="flex-shrink-0"
              >
                {copiedIndex === index ? (
                  <Check className="w-5 h-5 text-success" />
                ) : (
                  <Copy className="w-5 h-5" />
                )}
              </Button>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}
