// Shared shell for simple content pages (About, Contact, legal, etc.) — spec requires every
// footer/nav link to resolve to a real page, not a 404, without needing bespoke layout work for
// each one.
export function StaticPage({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="container-rentlet max-w-3xl py-14 lg:py-20">
      <h1 className="text-3xl font-extrabold text-foreground lg:text-4xl">{title}</h1>
      {subtitle && <p className="mt-3 text-base text-muted-foreground">{subtitle}</p>}
      <div className="prose-rentlet mt-8 flex flex-col gap-5 text-sm leading-relaxed text-foreground/80 [&_h2]:mt-6 [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-foreground [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-1.5">
        {children}
      </div>
    </div>
  );
}
