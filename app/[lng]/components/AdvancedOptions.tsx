"use client";

import { Accordion, AccordionItem, Card, Input } from "@heroui/react";
import { useT } from "@/app/i18n/client";

interface AdvancedOptionsProps {
  referenceGuid: string;
  onReferenceGuidChange: (value: string) => void;
  timeOffset: string;
  onTimeOffsetChange: (value: string) => void;
}

export function AdvancedOptions({
  referenceGuid,
  onReferenceGuidChange,
  timeOffset,
  onTimeOffsetChange,
}: AdvancedOptionsProps) {
  const { t } = useT();

  return (
    <Card className="rounded-xl shadow-xs card-border">
      <Accordion className="px-6">
        <AccordionItem
          key="advanced"
          aria-label={t("advancedOptions.title")}
          title={
            <h3 className="text-lg font-semibold">
              {t("advancedOptions.title")}
            </h3>
          }
          subtitle={
            <p className="text-sm text-muted">
              {t("advancedOptions.subtitle")}
            </p>
          }
          classNames={{
            title: "text-lg font-semibold",
            subtitle: "text-sm",
            content: "pt-2 pb-6",
          }}
        >
          <div className="flex flex-col gap-4">
            <Input
              label={t("advancedOptions.referenceGuidLabel")}
              placeholder={t("advancedOptions.referenceGuidPlaceholder")}
              value={referenceGuid}
              onValueChange={onReferenceGuidChange}
              description={t("advancedOptions.referenceGuidDescription")}
            />
            <Input
              label={t("advancedOptions.timeOffsetLabel")}
              placeholder={t("advancedOptions.timeOffsetPlaceholder")}
              value={timeOffset}
              onValueChange={onTimeOffsetChange}
              description={t("advancedOptions.timeOffsetDescription")}
              type="number"
            />
          </div>
        </AccordionItem>
      </Accordion>
    </Card>
  );
}
