"use client";

import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import {
  type FormatOptions,
  formatMultipleGuids,
  generateMultipleGuids,
  generateSimilarGuids,
  isValidGuid,
} from "@/lib/guid";
import { PageHeader } from "./components/PageHeader";
import { GeneratorCard } from "./components/GeneratorCard";
import { AdvancedOptions } from "./components/AdvancedOptions";
import { GuidResults } from "./components/GuidResults";
import { PageFooter } from "./components/PageFooter";

export default function Home() {
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
        message: "Please enter a valid quantity between 1 and 1000",
      });
      return;
    }

    let guids: string[];
    if (referenceGuid.trim()) {
      if (!isValidGuid(referenceGuid)) {
        setErrorDialog({
          isOpen: true,
          message: "Invalid reference GUID format",
        });
        return;
      }
      guids = generateSimilarGuids(referenceGuid, count);
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
          message: "Failed to copy to clipboard. Please try again.",
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
          />

          <GuidResults guids={generatedGuids} onCopyAll={handleCopyAll} />
        </main>

        <PageFooter />
      </div>

      <Modal
        isOpen={errorDialog.isOpen}
        onOpenChange={(isOpen) =>
          setErrorDialog({ ...errorDialog, isOpen })
        }
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Error</ModalHeader>
              <ModalBody>
                <p>{errorDialog.message}</p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose}>
                  OK
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
