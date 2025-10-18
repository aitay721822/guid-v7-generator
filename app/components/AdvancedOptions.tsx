import { Accordion, AccordionItem, Card, Input } from "@heroui/react";

interface AdvancedOptionsProps {
  referenceGuid: string;
  onReferenceGuidChange: (value: string) => void;
}

export function AdvancedOptions({
  referenceGuid,
  onReferenceGuidChange,
}: AdvancedOptionsProps) {
  return (
    <Card className="rounded-xl shadow-xs card-border">
      <Accordion className="px-6">
        <AccordionItem
          key="advanced"
          aria-label="Advanced Options"
          title={<h3 className="text-lg font-semibold">Advanced Options</h3>}
          subtitle={<p className="text-sm text-muted">Generate similar IDs based on a reference GUID.</p>}
          classNames={{
            title: "text-lg font-semibold",
            subtitle: "text-sm",
            content: "pt-2 pb-6"
          }}
        >
          <Input
            label="Reference GUID v7"
            placeholder="e.g. 018f3b89-5cba-77d4-8623-275d83730e6c"
            value={referenceGuid}
            onValueChange={onReferenceGuidChange}
          />
        </AccordionItem>
      </Accordion>
    </Card>
  );
}
