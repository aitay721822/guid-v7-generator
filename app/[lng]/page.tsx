"use client";

import {
  type FormatOptions,
  formatMultipleGuids,
  generateMultipleGuids,
  generateSimilarGuids,
  isValidGuid,
} from "@/lib/guid";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import { useState } from "react";
import { useT } from "../i18n/client";
import { AdvancedOptions } from "./components/AdvancedOptions";
import { GeneratorCard } from "./components/GeneratorCard";
import { GuidResults } from "./components/GuidResults";
import { PageFooter } from "./components/PageFooter";
import { PageHeader } from "./components/PageHeader";

export default function Home() {
  const { t } = useT();
  const [quantity, setQuantity] = useState<string>("1");
  const [generatedGuids, setGeneratedGuids] = useState<string[]>([]);
  const [formatOptions, setFormatOptions] = useState<FormatOptions>({
    hyphens: true,
    braces: false,
    uppercase: false,
    quotes: false,
    commas: false,
  });
  const [autoCopy, setAutoCopy] = useState(true);
  const [referenceGuid, setReferenceGuid] = useState("");
  const [timeOffset, setTimeOffset] = useState("");
  const [showCopiedMessage, setShowCopiedMessage] = useState(false);
  const [errorDialog, setErrorDialog] = useState<{
    isOpen: boolean;
    message: string;
  }>({ isOpen: false, message: "" });

  const handleGenerate = async () => {
    const count = Number.parseInt(quantity, 10);
    if (Number.isNaN(count) || count < 1 || count > 1000) {
      setErrorDialog({
        isOpen: true,
        message: t("errors.invalidQuantity"),
      });
      return;
    }

    // Parse time offset and validate it's only used with reference GUID
    let offsetMs: number | undefined;
    if (timeOffset.trim()) {
      if (!referenceGuid.trim()) {
        setErrorDialog({
          isOpen: true,
          message: t("errors.timeOffsetNeedsReference"),
        });
        return;
      }
      const parsedOffset = Number.parseInt(timeOffset, 10);
      if (Number.isNaN(parsedOffset)) {
        setErrorDialog({
          isOpen: true,
          message: t("errors.invalidTimeOffset"),
        });
        return;
      }
      offsetMs = parsedOffset;
    }

    let guids: string[];
    if (referenceGuid.trim()) {
      if (!isValidGuid(referenceGuid)) {
        setErrorDialog({
          isOpen: true,
          message: t("errors.invalidReferenceGuid"),
        });
        return;
      }
      guids = generateSimilarGuids(referenceGuid, count, offsetMs);
    } else {
      guids = generateMultipleGuids(count);
    }

    const formatted = formatMultipleGuids(guids, formatOptions);
    setGeneratedGuids(formatted);

    if (autoCopy && formatted.length > 0) {
      try {
        await navigator.clipboard.writeText(formatted.join("\n"));
        setShowCopiedMessage(true);
        setTimeout(() => setShowCopiedMessage(false), 2000);
      } catch (error) {
        console.error("Failed to auto-copy:", error);
        setErrorDialog({
          isOpen: true,
          message: t("errors.copyFailed"),
        });
      }
    }
  };

  const handleCopyAll = async () => {
    try {
      await navigator.clipboard.writeText(generatedGuids.join("\n"));
    } catch (error) {
      console.error("Failed to copy all:", error);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center overflow-x-hidden">
      <div className="flex h-full w-full max-w-3xl flex-col px-4 py-16 sm:py-24">
        <PageHeader />

        <main className="mt-12 flex w-full flex-col gap-6">
          <GeneratorCard
            quantity={quantity}
            onQuantityChange={setQuantity}
            formatOptions={formatOptions}
            onFormatOptionsChange={setFormatOptions}
            autoCopy={autoCopy}
            onAutoCopyChange={setAutoCopy}
            showCopiedMessage={showCopiedMessage}
            onGenerate={handleGenerate}
          />

          <AdvancedOptions
            referenceGuid={referenceGuid}
            onReferenceGuidChange={setReferenceGuid}
            timeOffset={timeOffset}
            onTimeOffsetChange={setTimeOffset}
          />

          <GuidResults guids={generatedGuids} onCopyAll={handleCopyAll} />
        </main>

        <PageFooter />
      </div>

      <Modal
        isOpen={errorDialog.isOpen}
        onOpenChange={(isOpen) => setErrorDialog({ ...errorDialog, isOpen })}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {t("errors.title")}
              </ModalHeader>
              <ModalBody>
                <p>{errorDialog.message}</p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose}>
                  {t("errors.ok")}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
