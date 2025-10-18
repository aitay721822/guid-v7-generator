"use client";

import { useT } from "@/app/i18n/client";
import { Link } from "@heroui/react";

export function PageFooter() {
  const { t } = useT();

  return (
    <footer className="mt-16 text-center">
      <Link
        href="https://datatracker.ietf.org/doc/html/draft-peabody-dispatch-new-uuid-format"
        target="_blank"
        rel="noopener noreferrer"
        color="primary"
        className="text-sm transition-colors hover:underline"
      >
        {t("pageFooter.rfcLink")}
      </Link>
    </footer>
  );
}
