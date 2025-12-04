import React from 'react';
import { Artifact } from '../types';
import { Icons } from './Icons';

interface ArtifactViewerProps {
  artifact: Artifact;
}

const ArtifactViewer: React.FC<ArtifactViewerProps> = ({ artifact }) => {
  const getIcon = () => {
    switch (artifact.type) {
      case 'model3d': return <Icons.Cube className="text-museum-600" size={20} />;
      case 'blueprint': return <Icons.Map className="text-museum-600" size={20} />;
      case 'photo': return <Icons.Camera className="text-museum-600" size={20} />;
      default: return <Icons.Image className="text-museum-600" size={20} />;
    }
  };

  const getLabel = () => {
    switch (artifact.type) {
      case 'model3d': return 'Modelo 3D Interactivo';
      case 'blueprint': return 'Plano Arquitectónico';
      case 'photo': return 'Fotografía Histórica';
      default: return 'Imagen';
    }
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md border border-museum-200 hover:shadow-xl transition-all duration-300 group">
      <div className="relative aspect-[4/3] bg-museum-100 overflow-hidden">
        {/* Type Badge */}
        <div className="absolute top-3 left-3 z-10 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-museum-800 flex items-center gap-2 shadow-sm pointer-events-none">
          {getIcon()}
          {getLabel()}
        </div>

        {/* Content Visualization */}
        {artifact.type === 'model3d' && artifact.modelUrl ? (
           <iframe 
             title={artifact.title}
             src={artifact.modelUrl}
             className="w-full h-full bg-museum-100"
             frameBorder="0"
             allow="autoplay; fullscreen; xr-spatial-tracking"
             allowFullScreen
           ></iframe>
        ) : (
          <>
            <img 
              src={artifact.url} 
              alt={artifact.title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* 3D Overlay Simulator (only for models without direct embed) */}
            {artifact.type === 'model3d' && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors cursor-pointer">
                <div className="bg-white/90 p-4 rounded-full shadow-lg transform transition-transform group-hover:scale-110">
                  <Icons.Cube size={32} className="text-museum-800" />
                </div>
                <span className="absolute bottom-4 text-white font-bold text-sm bg-black/50 px-3 py-1 rounded-md">
                  Click para rotar
                </span>
              </div>
            )}
          </>
        )}
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-serif text-lg font-bold text-museum-900 leading-tight">{artifact.title}</h3>
          {artifact.date && (
            <span className="text-xs font-mono text-museum-500 bg-museum-100 px-2 py-1 rounded">
              {artifact.date}
            </span>
          )}
        </div>
        <p className="text-museum-700 text-sm leading-relaxed border-t border-museum-100 pt-3 mt-2">
          {artifact.description}
        </p>
      </div>
    </div>
  );
};

export default ArtifactViewer;