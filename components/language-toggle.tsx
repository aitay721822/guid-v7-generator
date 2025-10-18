"use client";

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import { Languages } from "lucide-react";
import { useEffect, useState } from "react";
import { useT } from "@/app/i18n/client";

const languages = [
  { key: "en", label: "English", flag: "🇺🇸" },
  { key: "zh-Hant", label: "繁體中文", flag: "🇹🇼" },
];

export function LanguageToggle() {
  const [mounted, setMounted] = useState(false);
  const { i18n } = useT();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        isIconOnly
        variant="light"
        aria-label="Toggle language"
        isDisabled
      >
        <Languages className="w-5 h-5" />
      </Button>
    );
  }

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button isIconOnly variant="light" aria-label="Change language">
          <Languages className="w-5 h-5" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Language selection"
        selectedKeys={new Set([i18n.language])}
        selectionMode="single"
        onSelectionChange={(keys) => {
          const selected = Array.from(keys)[0] as string;
          i18n.changeLanguage(selected);
        }}
      >
        {languages.map((lang) => (
          <DropdownItem key={lang.key} startContent={<span>{lang.flag}</span>}>
            {lang.label}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
