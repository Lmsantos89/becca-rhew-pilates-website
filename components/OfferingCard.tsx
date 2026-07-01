import type { Offering } from '@/sanity/lib/types';

interface Props {
  offering: Offering;
}

export default function OfferingCard({ offering }: Props) {
  return (
    <article className="flex flex-col overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-black/5">
      <div className="h-48 w-full bg-[#D9D3CC]" aria-hidden="true" />
      <div className="flex flex-1 flex-col gap-2 p-6">
        <h3 className="font-heading text-xl font-semibold">{offering.title}</h3>
        <p className="text-sm leading-relaxed text-muted">{offering.description}</p>
      </div>
    </article>
  );
}
