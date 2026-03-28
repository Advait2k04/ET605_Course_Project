import React from 'react';

interface FigureProps {
  type: 'types-of-angles' | 'complementary' | 'supplementary' | 'adjacent' | 'linear-pair' | 'vertically-opposite' | 'transversal' | 'corresponding-angles' | 'alternate-interior' | 'co-interior' | 'parallel-lines';
}

export function Figure({ type }: FigureProps) {
  // The images should be placed in the "public/images" folder of your project.
  // For example, to replace the "types-of-angles" figure, add a file named "types-of-angles.png" to "public/images/".
  const imagePath = `/images/${type}.png`;

  return (
    <div className="flex justify-center my-6">
      <img 
        src={imagePath} 
        alt={`Illustration for ${type}`} 
        className="max-w-full h-auto rounded-lg shadow-sm border border-slate-200"
        onError={(e) => {
          // This fallback shows a placeholder if you haven't added the image file yet.
          // Once you add the correct .png file to the public/images folder, it will show your image instead.
          e.currentTarget.src = `https://placehold.co/600x400/e2e8f0/475569?text=Add+${type}.png+to+public/images/`;
        }}
      />
    </div>
  );
}
