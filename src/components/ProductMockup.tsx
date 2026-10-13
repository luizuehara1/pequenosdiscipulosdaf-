import React from 'react';
import { Printer, FileText, CheckCircle2, BookOpen } from 'lucide-react';

export default function ProductMockup() {
  return (
    <div className="relative w-full max-w-[540px] mx-auto select-none" id="product-hero-mockup">
      
      {/* Container principal da imagem do produto real com sombra editorial suave */}
      <div className="relative bg-white p-3 sm:p-4 rounded-2xl shadow-xl border border-stone-200/80">
        
        {/* Imagem real de alta qualidade do kit e das páginas */}
        <div className="relative overflow-hidden rounded-xl bg-stone-50">
          <img 
            src="https://i.postimg.cc/8cZ2cWG2/Chat-GPT-Image-11-de-jun-de-2026-12-02-16.png" 
            alt="Kit Pequenos Discípulos da Fé com atividades bíblicas infantis impressas e prontas para colorir" 
            className="w-full h-auto object-cover rounded-xl transition-transform duration-500 hover:scale-[1.02]"
            width="540"
            height="400"
            loading="eager"
          />

          {/* Tag flutuante discreta sobre a imagem */}
          <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs border border-stone-200 text-stone-800 text-[11px] sm:text-xs font-semibold px-2.5 py-1 rounded-lg shadow-xs flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-brand-blue-600" />
            <span>Material Digital em PDF</span>
          </div>
        </div>

        {/* Amostras visuais rápidas do que a criança recebe */}
        <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-stone-150 text-center">
          <div className="bg-stone-50 p-2 rounded-lg border border-stone-100">
            <span className="text-[10px] text-gray-500 font-bold block uppercase">Desenhos</span>
            <span className="text-xs font-bold text-gray-800">Para Colorir</span>
          </div>
          <div className="bg-stone-50 p-2 rounded-lg border border-stone-100">
            <span className="text-[10px] text-gray-500 font-bold block uppercase">Jogos</span>
            <span className="text-xs font-bold text-gray-800">Labirintos & Caça</span>
          </div>
          <div className="bg-stone-50 p-2 rounded-lg border border-stone-100">
            <span className="text-[10px] text-gray-500 font-bold block uppercase">Palavra</span>
            <span className="text-xs font-bold text-gray-800">Versículos</span>
          </div>
        </div>

      </div>

      {/* Badges de garantia visual abaixo do mockup */}
      <div className="mt-3 flex items-center justify-between px-2 text-xs font-medium text-gray-600">
        <div className="flex items-center gap-1.5">
          <Printer className="w-4 h-4 text-brand-blue-600" />
          <span>Formato A4 comum</span>
        </div>
        <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Download imediato</span>
        </div>
      </div>

    </div>
  );
}
