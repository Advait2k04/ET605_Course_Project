import React from 'react';

interface FigureProps {
  src: string;
}

export function Figure({ src }: FigureProps) {
  // The images should be placed in the "public/images" folder of your project.
  // For example, if src is "/images/types-of-angles.png", place the file there.
  
  // Extract filename for the alt text and placeholder
  const filename = src.split('/').pop() || 'image.png';

  return (
    <div className="flex justify-center my-6">
      <img 
        src={src} 
        alt={`Illustration for ${filename.replace('.jpeg', '').replace(/-/g, ' ')}`} 
        className="max-w-full h-auto rounded-lg shadow-sm border border-slate-200"
        onError={(e) => {
          // This fallback shows a placeholder if you haven't added the image file yet.
          // Once you add the correct .png file to the public/images folder, it will show your image instead.
          e.currentTarget.src = `https://placehold.co/600x400/e2e8f0/475569?text=Add+${filename}+to+public/images/`;
        }}
      />
    </div>
  );
}
