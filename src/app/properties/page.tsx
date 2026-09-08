import type { Metadata } from "next";
import { searchProvider } from "@/lib/services/search.service";
import { parseFilters } from "@/lib/search-params";
import { FilterPanel } from "@/components/search/FilterPanel";
import { MobileFilters } from "@/components/search/MobileFilters";
import { SortSelect } from "@/components/search/SortSelect";
import { SaveSearchButton } from "@/components/search/SaveSearchButton";
import { PropertiesView } from "@/components/search/PropertiesView";
import { toPublicProperty } from "@/lib/public-property";

export const metadata: Metadata = {
  title: "Search Properties",
  description: "Search verified properties for rent and sale across India with advanced filters.",
};

export default async function PropertiesPage(props: PageProps<"/properties">) {
  const rawParams = await props.searchParams;
  const filters = parseFilters(rawParams);
  const { items, total } = await searchProvider.search(filters);

  return (
    <div className="container-rentlet py-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-extrabold text-foreground">
          {filters.city ? `Properties in ${filters.city}` : "Search Properties"}
        </h1>
        <p className="text-sm text-muted-foreground">
          {total.toLocaleString("en-IN")} {total === 1 ? "property" : "properties"} found
          {filters.sort === "nearest" &&
            (filters.near
              ? ` · nearest to ${filters.near} first`
              : filters.nearLat != null
                ? " · nearest to your location first"
                : "")}
        </p>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto rounded-2xl border border-border bg-white p-5">
            <FilterPanel initial={filters} />
          </div>
        </aside>

        <div className="min-w-0">
          <div className="flex items-center justify-between gap-3">
            <MobileFilters initial={filters} />
            <div className="ml-auto flex items-center gap-2">
              <SaveSearchButton filters={filters} />
              <SortSelect />
            </div>
          </div>

          <div className="mt-4">
            <PropertiesView properties={items.map(toPublicProperty)} />
          </div>
        </div>
      </div>
    </div>
  );
}
