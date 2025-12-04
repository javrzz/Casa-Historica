import React from 'react';
import { Collection } from '../types';
import { Icons } from './Icons';

interface CollectionCardProps {
  collection: Collection;
  onClick: (collection: Collection) => void;
}

const CollectionCard: React.FC<CollectionCardProps> = ({ collection, onClick }) => {
  // Safe access to icon from the string identifier
  const IconComponent = (Icons as any)[collection.icon] || Icons.Box;

  return (
    <div 
      onClick={() => onClick(collection)}
      className="group relative h-96 w-full overflow-hidden rounded-xl cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 border border-museum-200"
    >
      {/* Background Image */}
      <div className="absolute inset-0 bg-museum-200">
        <img 
          src={collection.coverImage} 
          alt={collection.title} 
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 filter grayscale-[20%] group-hover:grayscale-0"
        />
        {/* Gradient Overlay */}
        <div className={`absolute inset-0 opacity-60 transition-opacity duration-300 group-hover:opacity-80 ${collection.themeColor} mix-blend-multiply`} />
        <div className="absolute inset-0 bg-gradient-to-t from-museum-900 via-transparent to-transparent opacity-90" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 p-8 flex flex-col justify-end">
        
        {/* Decorative Watermark Icon (Top Right) */}
        <div className="absolute top-4 right-4 text-white/20 group-hover:text-white/40 transition-colors duration-500 transform group-hover:scale-110 group-hover:rotate-12">
            <IconComponent size={64} strokeWidth={1} />
        </div>

        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          
          {/* Animated Icon and Divider */}
          <div className="flex items-center gap-3 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75 transform -translate-x-4 group-hover:translate-x-0">
             <div className="p-1.5 bg-white/20 backdrop-blur-sm rounded-md text-white border border-white/10 shadow-sm">
                <IconComponent size={20} />
             </div>
             <div className="h-0.5 bg-white/50 w-12 rounded-full"></div>
          </div>

          <h2 className="font-serif text-2xl md:text-3xl font-bold text-white mb-2 drop-shadow-md tracking-tight">
            {collection.title}
          </h2>
          <p className="text-museum-100 text-sm md:text-base leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75 line-clamp-3 font-light">
            {collection.shortDescription}
          </p>
          <div className="mt-5 flex items-center gap-2 text-white text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150">
            Explorar <Icons.Back className="rotate-180" size={16} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionCard;