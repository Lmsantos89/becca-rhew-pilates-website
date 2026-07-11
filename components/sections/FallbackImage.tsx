'use client';

interface Props {
  src: string;
  alt: string;
  tint: string;
  className?: string;
}

// CAVEMAN: show photo, hide it and show tint block when file not there yet
export default function FallbackImage({ src, alt, tint, className }: Props) {
  return (
    <div className={`overflow-hidden ${className ?? ''}`} style={{ backgroundColor: tint }}>
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover"
        onError={(event) => {
          event.currentTarget.style.visibility = 'hidden';
        }}
      />
    </div>
  );
}
