import React, { useState } from 'react';
import { Sparkles, FileText, Printer, Award } from 'lucide-react';

export default function ProductMockup() {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5
    setCoords({ x, y });
  };

  const inlineStyle = isHovered
    ? {
        transform: `perspective(1000px) rotateY(${coords.x * 22}deg) rotateX(${-coords.y * 22}deg) translateY(-4px)`,
        boxShadow: '0 25px 50px -12px rgba(14, 165, 233, 0.25)',
        transition: 'transform 0.12s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.2s ease',
      }
    : {
        transform: 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(0px)',
        transition: 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.4s ease',
      };

  return (
    <div 
      className="relative mx-auto max-w-[500px] w-full" 
      id="product-mockup"
    >
      {/* Decorative stars and hand-drawn lines */}
      <div className="absolute -top-6 -left-6 text-brand-yellow-400 animate-float pointer-events-none">
        <svg width="35" height="35" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l2.4 4.9 5.4.8-3.9 3.8.9 5.4-4.8-2.5-4.8 2.5.9-5.4-3.9-3.8 5.4-.8z" />
        </svg>
      </div>
      
      <div className="absolute -bottom-4 -right-2 text-brand-blue-500 animate-float-slow pointer-events-none">
        <svg width="25" height="25" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l2.4 4.9 5.4.8-3.9 3.8.9 5.4-4.8-2.5-4.8 2.5.9-5.4-3.9-3.8 5.4-.8z" />
        </svg>
      </div>

      <div className="absolute top-1/2 -right-8 text-brand-yellow-400 opacity-50 hidden sm:block pointer-events-none">
        <svg width="40" height="40" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4">
          <path d="M10,50 Q50,10 90,50" />
        </svg>
      </div>

      {/* Floating Cloud Decoration */}
      <div className="absolute -top-12 right-4 bg-white/90 backdrop-blur-xs border border-brand-beige-100 px-3.5 py-1.5 rounded-full shadow-md text-xs font-semibold text-brand-blue-600 flex items-center gap-1.5 animate-float pointer-events-none">
        <Sparkles className="w-3.5 h-3.5 text-brand-yellow-500" />
        <span>Kit Digital em Alta Resolução PDF</span>
      </div>

      {/* Main 3D Container of book mockup with custom relative interactive tilt on hover */}
      <div 
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={inlineStyle}
        className="relative bg-brand-beige-100 rounded-[36px] p-6 shadow-xl border-4 border-white overflow-hidden flex flex-col items-center cursor-crosshair select-none"
      >
        
        {/* Sky Background Representation with Sun/Cloud inside the Mockup Box */}
        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-b from-sky-300 via-sky-200 to-white border-2 border-brand-blue-100 shadow-inner flex flex-col justify-between p-4 pointer-events-none">
          
          {/* Subtle Christian Cross and Sun rays */}
          <div className="absolute top-2 right-4 text-brand-yellow-400 opacity-70 flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-brand-yellow-400/30 absolute blur-md" />
            <span className="font-display text-2xl font-bold">☀</span>
          </div>

          <div className="absolute left-4 top-2 text-white/80 select-none text-xl">☁</div>

          {/* Book Title inside mockup */}
          <div className="text-center mt-3 z-10">
            <span className="bg-white/90 text-brand-blue-600 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs uppercase tracking-wider">
              Material Prático de Apoio
            </span>
            <h4 className="font-display text-gray-800 text-lg sm:text-2xl font-black tracking-tight leading-tight mt-1 px-4 text-shadow-sm">
              PEQUENOS DISCÍPULOS DA FÉ
            </h4>
            <p className="text-[11px] sm:text-xs text-brand-blue-700/80 font-bold mt-0.5">
              ✦ Atividades Bíblicas Premium ✦
            </p>
          </div>

          {/* Graphical Noah's Ark or Holy Sheep cute SVG inline */}
          <div className="my-auto flex justify-center items-center z-10">
            <div className="bg-white/85 backdrop-blur-xs py-2 px-4 rounded-2xl shadow-md border border-brand-blue-200/50 max-w-[280px] w-full flex items-center gap-3">
              {/* Sheep visual design */}
              <div className="bg-brand-beige-100 p-2 rounded-xl flex-shrink-0 relative">
                {/* Cute lamb ear/face representation */}
                <div className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center font-bold text-xs">
                  🐑
                </div>
                <div className="absolute -bottom-1 -right-1 bg-brand-yellow-400 text-[8px] text-white p-0.5 rounded-full font-bold">
                  ★
                </div>
              </div>
              <div className="text-left">
                <p className="text-[10px] uppercase font-bold text-brand-blue-700">Desenhos &amp; Jogos</p>
                <p className="text-xs font-black text-gray-800 leading-tight">Arca de Noé, Davi, Jonas e Versículos!</p>
              </div>
            </div>
          </div>

          {/* Pages count badge */}
          <div className="flex justify-between items-center z-10 bg-brand-blue-50/90 py-1.5 px-3 rounded-xl border border-brand-blue-100">
            <div className="flex items-center gap-1">
              <FileText className="w-3.5 h-3.5 text-brand-blue-600" />
              <span className="text-[11px] font-bold text-gray-800">120 Atividades Bíblicas</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-bold text-brand-green-600">
              <Printer className="w-3.5 h-3.5" />
              <span>Imprima em Casa</span>
            </div>
          </div>
        </div>

        {/* Floating preview of internal worksheets pages overlapping */}
        <div className="grid grid-cols-2 gap-3.5 w-full mt-4 pointer-events-none">
          
          {/* Worksheets preview 1 */}
          <div className="bg-white rounded-xl p-3 border border-brand-beige-200 shadow-sm flex flex-col justify-between aspect-[1/1.2]">
            <div className="border-b border-brand-beige-100 pb-1.5 flex justify-between items-center">
              <span className="text-[9px] font-bold text-brand-blue-500 uppercase">Salmo 23</span>
              <span className="text-[8px] text-gray-400">Atividade #04</span>
            </div>
            
            {/* Outline of lamb connector */}
            <div className="my-2 border-2 border-dashed border-brand-blue-100 rounded-lg p-2 bg-brand-beige-50/20 text-center flex flex-col items-center justify-center h-20">
              <span className="text-2xl block mb-1">🐑</span>
              <p className="text-[8px] font-bold text-gray-500 font-display uppercase tracking-wide">Ligue os Pontos</p>
            </div>

            <div className="text-[7px] text-gray-400 text-center font-mono leading-none">
              "O Senhor é o meu pastor..."
            </div>
          </div>

          {/* Worksheets preview 2 */}
          <div className="bg-white rounded-xl p-3 border border-brand-beige-200 shadow-sm flex flex-col justify-between aspect-[1/1.2]">
            <div className="border-b border-brand-beige-100 pb-1.5 flex justify-between items-center">
              <span className="text-[9px] font-bold text-brand-yellow-500 uppercase font-display">Para Colorir</span>
              <span className="text-[8px] text-gray-400">Atividade #27</span>
            </div>

            {/* Outline of Noah's Ark coloring page */}
            <div className="my-2 border-2 border-dashed border-brand-yellow-100 rounded-lg p-2 bg-brand-beige-50/20 text-center flex flex-col items-center justify-center h-20">
              <span className="text-2xl block mb-1">⛵</span>
              <p className="text-[8px] font-bold text-gray-500 font-display uppercase tracking-wide">Pinte com Carinho</p>
            </div>

            <div className="text-[7px] text-gray-400 text-center font-mono leading-none">
              Gênesis 6 — Arca de Noé
            </div>
          </div>

        </div>

        {/* Decorative crayons layout */}
        <div className="w-full flex justify-center gap-1.5 mt-5 pointer-events-none">
          <div className="w-3.5 h-10 rounded-t-full bg-brand-yellow-400 transform -rotate-12 shadow-xs" />
          <div className="w-3.5 h-12 rounded-t-full bg-brand-blue-500 -mt-1 shadow-xs" />
          <div className="w-3.5 h-10 rounded-t-full bg-brand-green-500 transform rotate-12 shadow-xs" />
          <div className="w-3.5 h-8 rounded-t-full bg-red-400 transform rotate-45" />
        </div>

      </div>

      {/* Decorative Badges underneath the mockup */}
      <div className="mt-4 flex justify-between items-center px-4">
        <div className="flex items-center gap-1.5">
          <Award className="w-4 h-4 text-brand-yellow-500" />
          <span className="text-xs font-bold text-gray-600">Educação Cristã Ativa</span>
        </div>
        <div className="bg-brand-green-50 text-brand-green-600 text-xs font-extrabold px-2.5 py-1 rounded-full border border-brand-green-100">
          ✓ RECOMENDADO POR TIAS DA EBD
        </div>
      </div>
    </div>
  );
}
