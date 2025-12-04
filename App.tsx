import React, { useState } from 'react';
import { Collection } from './types';
import { COLLECTIONS } from './constants';
import CollectionCard from './components/CollectionCard';
import ArtifactViewer from './components/ArtifactViewer';
import GeminiGuide from './components/GeminiGuide';
import { Icons } from './components/Icons';

const App: React.FC = () => {
  const [activeCollection, setActiveCollection] = useState<Collection | null>(null);

  const handleCollectionClick = (collection: Collection) => {
    setActiveCollection(collection);
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    setActiveCollection(null);
  };

  return (
    <div className="min-h-screen font-sans text-museum-900 bg-museum-50 selection:bg-museum-300 selection:text-museum-900">
      
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-museum-200 shadow-sm h-16 flex items-center">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div 
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={handleBack}
          >
            <div className="w-10 h-10 bg-museum-900 rounded-sm flex items-center justify-center text-white shadow-md group-hover:bg-museum-800 transition-colors">
              <Icons.Library size={20} />
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-lg leading-none text-museum-900 tracking-wide">
                CASA HISTÓRICA
              </span>
              <span className="text-[10px] uppercase tracking-widest text-museum-600">
                Museo Nacional
              </span>
            </div>
          </div>
          
          <div className="text-xs md:text-sm font-bold text-museum-600 tracking-widest uppercase border border-museum-300 px-4 py-1.5 rounded-full bg-museum-50">
             {activeCollection ? activeCollection.title : 'Colección Patrimonial'}
          </div>
        </div>
      </nav>

      <main>
        {!activeCollection ? (
          /* LANDING PAGE / GRID VIEW */
          <div className="animate-fade-in">
            {/* Hero Section */}
            <header className="relative py-32 px-4 bg-museum-900 text-center overflow-hidden min-h-[600px] flex flex-col justify-center items-center">
               {/* Hero Image: Casa Histórica Facade */}
               <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Casa_Tucuman.jpg/1280px-Casa_Tucuman.jpg')] bg-cover bg-center transition-transform duration-1000 hover:scale-105"></div>
               
               {/* Overlay for text readability (Prussian Blue tint) */}
               <div className="absolute inset-0 bg-museum-900/70 mix-blend-multiply"></div>
               <div className="absolute inset-0 bg-black/20"></div>
               
               {/* Gradient to merge with content */}
               <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-museum-50 to-transparent"></div>
               
               <div className="relative z-10 max-w-5xl mx-auto mt-8">
                 <div className="inline-block border-b-2 border-museum-300 mb-6 pb-2">
                   <span className="text-white/90 uppercase tracking-[0.3em] text-sm md:text-base font-bold shadow-black drop-shadow-md">
                     Tucumán, Argentina
                   </span>
                 </div>
                 <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 tracking-tight drop-shadow-2xl leading-tight">
                   Casa Histórica Museo Nacional de la Independencia
                 </h1>
                 <p className="text-white/90 text-lg md:text-2xl leading-relaxed max-w-3xl mx-auto font-light drop-shadow-md border-t border-white/20 pt-6">
                   Recorra virtualmente las colecciones patrimoniales.
                 </p>
               </div>
            </header>

            {/* Collection Grid */}
            <div className="container mx-auto px-4 py-16 -mt-24 relative z-20">
              <div className="bg-white rounded-xl shadow-xl p-8 mb-12 border border-museum-200">
                <div className="flex items-center gap-4 mb-8 justify-center">
                  <div className="h-px bg-museum-200 w-24"></div>
                  <h2 className="text-2xl font-serif text-museum-900 font-bold uppercase tracking-widest">
                    Nuestras Colecciones
                  </h2>
                  <div className="h-px bg-museum-200 w-24"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {COLLECTIONS.map((col) => (
                    <CollectionCard 
                      key={col.id} 
                      collection={col} 
                      onClick={handleCollectionClick} 
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* DETAIL VIEW */
          <div className="animate-fade-in-up">
            {/* Header for Specific Collection */}
            <div className={`relative h-72 md:h-96 w-full overflow-hidden ${activeCollection.themeColor}`}>
              <img 
                src={activeCollection.coverImage} 
                alt={activeCollection.title}
                className="w-full h-full object-cover opacity-50 mix-blend-overlay"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-museum-900/90 via-transparent to-transparent" />
              
              <div className="absolute inset-0 flex flex-col justify-end items-center text-center p-8 pb-12">
                <span className="text-museum-200 uppercase tracking-widest text-xs font-bold mb-2 bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm">
                  Colección Permanente
                </span>
                <h1 className="font-serif text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
                  {activeCollection.title}
                </h1>
                <button 
                  onClick={handleBack}
                  className="absolute top-6 left-4 md:left-8 flex items-center gap-2 text-white/90 hover:text-white transition-colors bg-black/20 hover:bg-black/40 px-5 py-2.5 rounded-full backdrop-blur-md border border-white/10"
                >
                  <Icons.Back size={18} />
                  <span className="font-bold text-sm">Volver</span>
                </button>
              </div>
            </div>

            <div className="container mx-auto px-4 py-12 max-w-6xl">
              {/* Description Section */}
              <div className="flex flex-col md:flex-row gap-12 mb-16">
                <div className="md:w-1/3">
                  <div className="bg-white p-8 rounded-xl border-l-4 border-museum-600 shadow-md sticky top-24">
                    <h3 className="font-serif text-xl font-bold text-museum-900 mb-4 flex items-center gap-2">
                      <Icons.Info className="text-museum-600" />
                      Resumen
                    </h3>
                    <p className="text-museum-600 leading-relaxed italic border-t border-museum-100 pt-4">
                      "{activeCollection.shortDescription}"
                    </p>
                  </div>
                </div>
                <div className="md:w-2/3">
                  <div className="prose prose-lg prose-museum text-museum-800">
                    <p className="text-xl leading-8 font-light">
                      {activeCollection.fullDescription}
                    </p>
                  </div>
                </div>
              </div>

              {/* Artifacts Grid */}
              <div className="mb-8 flex flex-col md:flex-row items-center justify-between gap-4 border-b border-museum-200 pb-4">
                <h2 className="text-3xl font-serif text-museum-900 font-bold">
                  Acervo Patrimonial
                </h2>
                <div className="flex gap-3 text-xs font-bold text-museum-600 bg-white px-4 py-2 rounded-full shadow-sm border border-museum-100">
                  <span className="flex items-center gap-1.5"><Icons.Image size={14} className="text-museum-500"/> Imágenes</span>
                  <span className="text-museum-300">|</span>
                  <span className="flex items-center gap-1.5"><Icons.Map size={14} className="text-museum-500"/> Planos</span>
                  <span className="text-museum-300">|</span>
                  <span className="flex items-center gap-1.5"><Icons.Cube size={14} className="text-museum-500"/> 3D</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
                {activeCollection.artifacts.map((artifact) => (
                  <ArtifactViewer key={artifact.id} artifact={artifact} />
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
      
      {/* Footer */}
      <footer className="bg-museum-900 text-museum-300 py-12 mt-12 text-center border-t border-museum-800">
        <div className="container mx-auto px-4 flex flex-col items-center gap-4">
          <div className="w-12 h-12 bg-museum-800 rounded-md flex items-center justify-center text-white mb-2">
             <Icons.Library size={24} />
          </div>
          <div>
            <p className="font-serif text-xl text-white tracking-wide">MUSEO CASA HISTÓRICA</p>
            <p className="text-xs uppercase tracking-widest mt-1 text-museum-400">De la Independencia</p>
          </div>
          <div className="h-px w-24 bg-museum-700 my-4"></div>
          <p className="text-sm opacity-60">© {new Date().getFullYear()} Preservando el legado de 1816.</p>
        </div>
      </footer>

      {/* Gemini AI Guide */}
      <GeminiGuide contextName={activeCollection ? activeCollection.title : 'Museo General'} />
    </div>
  );
};

export default App;