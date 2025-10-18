import { ThemeToggle } from "@/components/theme-toggle";

export function PageHeader() {
  return (
    <header className="flex flex-col items-center text-center">
      <div className="absolute top-6 right-6">
        <ThemeToggle />
      </div>

      <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
        GUID v7 Generator
      </h1>
      <p className="text-lg max-w-2xl text-muted">
        A modern tool for generating time-ordered, 122-bit universally unique identifiers.
      </p>
    </header>
  );
}
