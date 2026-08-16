'use client';

interface Props {
  src: string;
  alt: string;
  tint: string;
  className?: string;
  // CAVEMAN: portrait photo in square hole cuts the head off without this
  objectPosition?: string;
}

// CAVEMAN: show photo, hide it and show tint block when file not there yet
export default function FallbackImage({ src, alt, tint, className, objectPosition }: Props) {
  return (
    <div className={`overflow-hidden ${className ?? ''}`} style={{ backgroundColor: tint }}>
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover"
        style={{ objectPosition }}
        onError={(event) => {
          event.currentTarget.style.visibility = 'hidden';
        }}
      />
    </div>
  );
}
