import React, { useState, useEffect } from 'react';
import { Check, Sparkles, ShieldCheck, ArrowRight, BookOpen, Star, Printer, Clock } from 'lucide-react';

interface OfferSelectorProps {
  onSelectOption: (price: number, url: string) => void;
}

export default function OfferSelector({ onSelectOption }: OfferSelectorProps) {
  const [selectedOffer, setSelectedOffer] = useState<'base' | 'upsell'>('upsell');
  const [timeLeft, setTimeLeft] = useState<number>(15 * 60);
  const [isTimerEnded, setIsTimerEnded] = useState<boolean>(false);

  // Error state for images so they fallback smoothly to CSS mockups if the files don't exist yet
  const [v1ImgError, setV1ImgError] = useState<boolean>(false);
  const [v2ImgError, setV2ImgError] = useState<boolean>(false);

  // Run once initially to broadcast default selection
  useEffect(() => {
    const selectedPrice = selectedOffer === 'base' ? 14.90 : 19.90;
    const selectedUrl = selectedOffer === 'base' ? '[COLOCAR_LINK_CHECKOUT_1490]' : '[COLOCAR_LINK_CHECKOUT_1990]';
    onSelectOption(selectedPrice, selectedUrl);
  }, [selectedOffer, onSelectOption]);

  // Persistent 15-minute Countdown Timer with localStorage
  useEffect(() => {
    const STORAGE_KEY = 'kids_bible_offer_countdown_v1';
    let endTimeStr = localStorage.getItem(STORAGE_KEY);
    let endTime = 0;

    if (endTimeStr) {
      endTime = parseInt(endTimeStr, 10);
      // Fallback if NaN or invalid or in the past
      if (isNaN(endTime)) {
        endTime = Date.now() + 15 * 60 * 1000;
        localStorage.setItem(STORAGE_KEY, endTime.toString());
      }
    } else {
      endTime = Date.now() + 15 * 60 * 1000;
      localStorage.setItem(STORAGE_KEY, endTime.toString());
    }

    const updateTimer = () => {
      const now = Date.now();
      const difference = endTime - now;

      if (difference <= 0) {
        setTimeLeft(0);
        setIsTimerEnded(true);
        return;
      }

      setTimeLeft(Math.floor(difference / 1000));
    };

    updateTimer(); // Run once immediately
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleSelect = (option: 'base' | 'upsell') => {
    setSelectedOffer(option);
    const selectedPrice = option === 'base' ? 14.90 : 19.90;
    const selectedUrl = option === 'base' ? '[COLOCAR_LINK_CHECKOUT_1490]' : '[COLOCAR_LINK_CHECKOUT_1990]';
    onSelectOption(selectedPrice, selectedUrl);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-2 px-1" id="offer-selection-zone">
      
      {/* PERSUASIVE TOP ANNOUNCEMENT BAR (VISIBLE ON MOBILE & DESKTOP) */}
      <div className="w-full bg-gradient-to-r from-red-500 via-amber-500 to-red-600 text-white text-xs sm:text-sm font-black py-3.5 px-4 rounded-2xl shadow-md flex items-center justify-center gap-2 mb-8 animate-pulse text-center">
        <Sparkles className="w-4 h-4 fill-white flex-shrink-0 animate-bounce" />
        <span>🔥 Oferta relâmpago: Kit Completo com +464 páginas extras por apenas R$ 19,90</span>
        <Sparkles className="w-4 h-4 fill-white flex-shrink-0 animate-bounce" />
      </div>

      {/* OFFER CARDS WRAPPER */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-8">
        
        {/* OPTION 1: VOLUME 1 - COUVÉ DE ENTRADA (Occupies 5 columns on desktop) */}
        <div 
          onClick={() => handleSelect('base')}
          className={`relative cursor-pointer transition-all duration-300 rounded-3xl p-6 lg:p-7 lg:col-span-5 flex flex-col justify-between border-3 bg-white shadow-md hover:shadow-xl ${
            selectedOffer === 'base' 
              ? 'border-brand-blue-500 shadow-xl bg-brand-blue-50/5 scale-[1.01] ring-2 ring-brand-blue-300 ring-offset-1' 
              : 'border-brand-beige-200 hover:border-brand-blue-300'
          }`}
          id="offer-card-base"
        >
          {/* Header area of Card */}
          <div>
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className={`text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-full ${
                  selectedOffer === 'base'
                    ? 'text-brand-blue-600 bg-brand-blue-100/60'
                    : 'text-gray-500 bg-gray-100'
                }`}>
                  Oferta Standard
                </span>
                <h3 className="font-display text-xl sm:text-2xl text-gray-800 mt-2 font-extrabold leading-tight">
                  Volume 1 — Pequenos Discípulos da Fé
                </h3>
              </div>
              <div className={`w-7 h-7 rounded-full flex items-center justify-center border-2 transition-colors flex-shrink-0 ${
                selectedOffer === 'base'
                  ? 'border-brand-blue-500 bg-brand-blue-500 text-white shadow-sm'
                  : 'border-gray-300 bg-white'
              }`}>
                {selectedOffer === 'base' && <Check className="w-4 h-4 stroke-[3]" />}
              </div>
            </div>

            {/* PRODUCT COVER PLACEHOLDER OR IMAGE CONDITIONAL TAGS */}
            <div className="my-5 flex flex-col items-center justify-center py-5 bg-brand-beige-50/70 rounded-2xl border border-brand-beige-100 relative group overflow-hidden min-h-[190px]">
              <div className="absolute right-4 bottom-2 text-[10px] font-mono text-gray-400 select-none opacity-40">
                Formato PDF A4
              </div>

              {/* IMAGE HOOK ACCESSIBLE TO USER AS REQUESTED */}
              {!v1ImgError ? (
                <img 
                  src="https://i.postimg.cc/pVJ1PDXC/capa-png.png" 
                  alt="Capa do Volume 1 Pequenos Discípulos da Fé" 
                  className="product-cover volume-1-cover w-32 h-44 object-contain rounded-[18px] shadow-lg border border-gray-150 transform group-hover:scale-105 transition-all duration-300"
                  onError={() => setV1ImgError(true)}
                />
              ) : (
                /* CSS Beautiful Cover Fallback */
                <div className="relative w-28 h-36 bg-gradient-to-br from-brand-blue-400 via-brand-blue-500 to-indigo-600 rounded-[18px] shadow-lg flex flex-col justify-between p-3.5 border-r-2 border-b-2 border-indigo-700/80 transform group-hover:scale-105 transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-transparent opacity-40 rounded-[18px] pointer-events-none"></div>
                  
                  <div className="flex justify-between items-center">
                    <Star className="w-3 h-3 text-brand-yellow-400 fill-brand-yellow-400 animate-pulse" />
                    <span className="text-[6px] text-white opacity-85 font-bold uppercase tracking-wider font-sans">Vol. 1</span>
                  </div>
                  
                  <div className="text-center my-auto">
                    <h4 className="font-display text-[9px] font-black text-brand-yellow-300 leading-tight drop-shadow-md">
                      Pequenos Discípulos
                    </h4>
                    <p className="text-[6px] text-white/95 mt-1 font-bold font-sans tracking-wide">120 PÁGINAS</p>
                  </div>
                  
                  <div className="flex justify-between items-end border-t border-white/20 pt-1">
                    <span className="text-[5.5px] text-white font-medium font-sans">Atividades Bíblicas</span>
                    <BookOpen className="w-2.5 h-2.5 text-white" />
                  </div>
                </div>
              )}
              
              <div className="text-center mt-3 px-2">
                <span className="text-[11px] font-bold text-gray-500 bg-white border border-brand-beige-200 px-2.5 py-0.5 rounded-full shadow-xs inline-block">
                  Capa do Volume 1
                </span>
              </div>
            </div>

            {/* TEXTO CURTO PARA O CARD REQUERIDO */}
            <p className="text-xs sm:text-sm text-gray-650 mb-5 leading-relaxed text-left font-medium">
              “Um material cristão infantil com 120 páginas para colorir, brincar, aprender e se aproximar de Deus em família.”
            </p>

            {/* BULLETS VOLUME 1 REQUERIDOS */}
            <div className="space-y-2 mb-6">
              <div className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700 text-left">
                <span className="text-emerald-500 flex-shrink-0">✅</span>
                <span className="font-medium">120 páginas em PDF</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700 text-left">
                <span className="text-emerald-500 flex-shrink-0">✅</span>
                <span className="font-medium">Histórias e atividades bíblicas</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700 text-left">
                <span className="text-emerald-500 flex-shrink-0">✅</span>
                <span className="font-medium">Desenhos para colorir</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700 text-left">
                <span className="text-emerald-500 flex-shrink-0">✅</span>
                <span className="font-medium">Atividades educativas cristãs</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700 text-left">
                <span className="text-emerald-500 flex-shrink-0">✅</span>
                <span className="font-medium">Para imprimir em casa</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700 text-left">
                <span className="text-emerald-500 flex-shrink-0">✅</span>
                <span className="font-medium">Acesso imediato por e-mail</span>
              </div>
            </div>
          </div>

          {/* Value area of Card */}
          <div className="pt-5 border-t border-brand-beige-100 mt-auto flex flex-col justify-end text-left">
            <span className="text-xs text-brand-blue-600 font-bold bg-brand-blue-50 px-2.5 py-0.5 rounded-full w-fit mb-1.5 font-sans">
              Economia Imperdível
            </span>
            <div className="text-xs text-gray-400 line-through font-semibold">
              De R$ 39,90 por
            </div>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="font-display text-2xl sm:text-3xl font-extrabold text-gray-800">
                R$ 14,90
              </span>
              <span className="text-xs text-gray-500 font-bold">taxa única</span>
            </div>
          </div>
        </div>

        {/* OPTION 2: KIT COMPLETO + VOLUME 2 (PRO COMBO UPSELL - Occupies 7 columns) */}
        <div 
          onClick={() => handleSelect('upsell')}
          className={`relative cursor-pointer transition-all duration-300 rounded-3xl p-6 lg:p-8 lg:col-span-7 flex flex-col justify-between border-4 bg-white shadow-xl hover:shadow-2xl ${
            selectedOffer === 'upsell' 
              ? 'border-amber-400 shadow-2xl bg-amber-500/[0.015] scale-[1.015] ring-3 ring-amber-300 ring-offset-2' 
              : 'border-brand-beige-200 hover:border-amber-300'
          }`}
          id="offer-card-upsell"
        >
          {/* HIGHLY EXCITING BADGES AS REQUESTED (🔥 MAIS ESCOLHIDO, ⭐ MELHOR CUSTO-BENEFÍCIO, etc.) */}
          <div className="absolute -top-4.5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-red-600 via-amber-500 to-yellow-500 text-white font-display text-[9px] sm:text-[10px] font-black px-4 py-2 rounded-full flex flex-wrap items-center justify-center gap-1 sm:gap-2 shadow-md uppercase tracking-wider z-20 whitespace-nowrap">
            <Sparkles className="w-3.5 h-3.5 fill-white animate-pulse" />
            <span>🔥 MAIS ESCOLHIDO</span>
            <span className="opacity-40">•</span>
            <span>⭐ MELHOR CUSTO-BENEFÍCIO</span>
            <span className="opacity-40">•</span>
            <span>🚀 +464 PÁG. EXTRAS</span>
            <span className="opacity-40">•</span>
            <span>📚 584 PÁG. TOTAL</span>
            <span className="opacity-40">•</span>
            <span>🎁 APENAS +R$ 5,00</span>
          </div>

          <div>
            <div className="flex justify-between items-start mb-4 mt-3">
              <div>
                <span className="text-[10px] sm:text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-full text-brand-yellow-600 bg-brand-yellow-400/20">
                  Leve o Volume 2 por apenas + R$ 5,00
                </span>
                <h3 className="font-display text-2xl sm:text-3xl text-gray-900 mt-2 font-black leading-none flex items-center gap-2">
                  Kit Completo — Volume 1 + Volume 2
                </h3>
                <p className="text-gray-500 text-xs sm:text-sm font-bold mt-1 tracking-wide">
                  Leve também o livro gigante "Pequenos Heróis da Bíblia"
                </p>
              </div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors flex-shrink-0 ${
                selectedOffer === 'upsell'
                  ? 'border-amber-500 bg-amber-500 text-white shadow-md'
                  : 'border-gray-200 bg-white'
              }`}>
                {selectedOffer === 'upsell' && <Check className="w-5 h-5 stroke-[4] text-white" />}
              </div>
            </div>

            {/* DYNAMIC PERSUASIVE COUNTDOWN TIMER CRITICAL SECTION */}
            <div className="mt-4 mb-5 bg-red-50 border border-red-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left shadow-inner">
              <div className="flex items-center gap-3">
                <span className="text-2xl animate-bounce">⏰</span>
                <div>
                  <h4 className="text-xs sm:text-sm font-black text-red-700 leading-none uppercase tracking-wider flex items-center justify-center sm:justify-start gap-1.5">
                    <span>{isTimerEnded ? 'Oferta especial encerrada' : 'Oferta especial do Kit Completo termina em:'}</span>
                  </h4>
                  <p className="text-[10px] sm:text-xs text-gray-700 mt-1.5 font-semibold">
                    {isTimerEnded 
                      ? 'Atualize a página para verificar disponibilidade da oferta.' 
                      : 'Garanta o combo com 584 páginas por apenas R$ 19,90 enquanto a oferta está ativa.'}
                  </p>
                </div>
              </div>
              
              {!isTimerEnded && (
                <div className="bg-white border-2 border-red-500 rounded-xl px-4 py-1.5 text-center flex-shrink-0 animate-pulse shadow-sm">
                  <span className="font-mono text-xl sm:text-2xl font-black text-red-600 tracking-wider">
                    {formatTime(timeLeft)}
                  </span>
                  <span className="text-[8px] text-red-500 block font-bold uppercase tracking-wider leading-none mt-0.5">Minutos</span>
                </div>
              )}
            </div>

            {/* TEXTO PERSUASIVO REQUERIDO */}
            <div className="space-y-3 mb-5 text-left text-xs sm:text-sm text-gray-750 leading-relaxed">
              <p className="bg-amber-50 p-3.5 rounded-xl border border-amber-200/60 font-bold text-gray-800 text-[11px] sm:text-xs">
                👉 <strong className="text-amber-800 font-extrabold text-xs sm:text-sm">Por apenas R$ 5,00 a mais</strong>, você leva também o Volume 2 — Pequenos Heróis da Bíblia, com 464 páginas extras, mais de 390 atividades, 50 histórias bíblicas, gabarito completo e certificado final.
              </p>
              
              <p className="text-emerald-700 font-extrabold text-xs sm:text-sm">
                💥 “Por apenas + R$ 5,00, leve mais de 200 páginas extras para imprimir em casa.”
              </p>
              
              <p className="text-brand-blue-750 italic font-black text-[11.5px] sm:text-xs bg-brand-blue-50 px-3 py-2 rounded-xl border border-brand-blue-100 inline-block">
                “Mais que colorir: seu filho lê, aprende, escreve, pensa e se aproxima de Deus.”
              </p>
            </div>

            {/* COMPARADOR VISUAL REQUERIDO */}
            <div className="bg-brand-beige-50 rounded-2xl p-4 border border-brand-beige-200 text-left mb-5">
              <p className="text-[10px] sm:text-[11px] uppercase font-black text-gray-400 mb-2 tracking-wider">Comparação de valor:</p>
              <div className="grid grid-cols-2 gap-4 text-xs font-bold mt-1">
                <div className="border-r border-brand-beige-200 pr-3">
                  <span className="text-gray-500 block text-[10px] sm:text-[11px]">Volume 1:</span>
                  <span className="text-gray-800 text-sm font-black">120 páginas</span>
                </div>
                <div className="pl-1">
                  <span className="text-amber-600 block text-[10px] sm:text-[11px]">Kit Completo:</span>
                  <span className="text-amber-700 text-sm font-black flex flex-col justify-content-start gap-0.5">
                    <span>120 pág. + 464 pág. extras</span>
                    <span className="text-[10px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md font-extrabold w-fit mt-0.5">
                      Total: 584 páginas
                    </span>
                  </span>
                </div>
              </div>
              <p className="text-[11px] text-gray-550 mt-2.5 font-medium leading-normal italic">
                Aumente o divertimento e aprendizado em 5x: mais de 390 atividades + 50 histórias no Volume 2.
              </p>
            </div>

            {/* DUAL COVERS PLACEHOLDERS OR IMAGE CONDITIONAL TAGS */}
            <div className="my-6 flex flex-col items-center justify-center p-5 bg-amber-500/[0.03] rounded-3xl border border-amber-200/50 relative group overflow-hidden">
              
              {/* Badges/Selo */}
              <div className="absolute top-2.5 left-2.5 bg-brand-green-600 text-white font-display text-[9px] sm:text-[10px] font-black px-2.5 py-1 rounded-full shadow-sm uppercase tracking-wider z-10 animate-pulse">
                Combo Completo 🎁
              </div>
              <div className="absolute top-2.5 right-2.5 bg-amber-500 text-white font-display text-[9px] sm:text-[10px] font-black px-2.5 py-1 rounded-full shadow-sm uppercase tracking-wider z-10">
                584 páginas no total 📚
              </div>
              
              {/* Covers container: side-by-side flex wrap with a "+" symbol in between */}
              <div className="flex items-center justify-center gap-3 sm:gap-5 mt-7 mb-4 w-full">
                
                {/* Cover Volume 1 (Left, slightly smaller) */}
                <div className="relative flex flex-col items-center transform rotate-[-4deg] hover:rotate-0 transition-transform duration-300">
                  <span className="text-[8px] text-gray-500 font-extrabold pb-1 sm:pb-1.5 uppercase tracking-wider">Vol. 1</span>
                  {!v1ImgError ? (
                    <img 
                      src="https://i.postimg.cc/pVJ1PDXC/capa-png.png" 
                      alt="Capa do Volume 1 Pequenos Discípulos da Fé" 
                      className="product-cover volume-1-cover h-28 sm:h-36 max-w-[85px] sm:max-w-[110px] object-contain rounded-[18px] shadow-lg border border-gray-150 transition-all duration-300"
                      onError={() => setV1ImgError(true)}
                    />
                  ) : (
                    /* Beautiful CSS Book Fallback */
                    <div className="w-18 h-26 bg-gradient-to-br from-brand-blue-400 to-indigo-600 rounded-[14px] shadow-md flex flex-col justify-between p-2 border-r-2 border-b-2 border-indigo-700/80">
                      <Star className="w-2 h-2 text-brand-yellow-300 fill-brand-yellow-300" />
                      <p className="font-display text-[6px] font-black text-brand-yellow-250 leading-none text-center">PEQUENOS</p>
                      <span className="text-[4px] text-white/80 font-bold uppercase tracking-wider text-center">120 pág.</span>
                    </div>
                  )}
                </div>

                {/* PLUS SYMBOL IN BETWEEN */}
                <div className="text-amber-500 font-black text-2xl sm:text-3xl px-1 sm:px-2 flex-shrink-0 animate-pulse">
                  +
                </div>

                {/* Cover Volume 2 (Right, larger, highlighted, main bonus/order bump with 464 pages) */}
                <div className="relative flex flex-col items-center transform rotate-[4deg] hover:rotate-0 transition-all duration-300 scale-105">
                  <div className="absolute -top-3.5 right-1 bg-red-500 text-white font-black text-[8px] px-1.5 py-0.5 rounded shadow-sm uppercase animate-bounce z-10">
                    +464 Págs! 🔥
                  </div>
                  <span className="text-[8px] text-amber-700 font-extrabold pb-1 sm:pb-1.5 uppercase tracking-wider">Vol. 2 (Bônus)</span>
                  {!v2ImgError ? (
                    <img 
                      src="https://i.postimg.cc/B6GM0vrr/Chat-GPT-Image-11-de-jun-de-2026-11-53-49.png" 
                      alt="Capa do Volume 2 Pequenos Heróis da Bíblia" 
                      className="product-cover volume-2-cover h-32 sm:h-40 max-w-[95px] sm:max-w-[125px] object-contain rounded-[18px] shadow-2xl border border-amber-300 ring-2 ring-amber-200/50"
                      onError={() => setV2ImgError(true)}
                    />
                  ) : (
                    /* Beautiful CSS Book Fallback 2 */
                    <div className="w-20 h-28 bg-gradient-to-br from-brand-yellow-400 to-amber-600 rounded-[14px] shadow-lg flex flex-col justify-between p-2 border-r-2 border-b-2 border-amber-700/80">
                      <Sparkles className="w-2 h-2 text-white fill-white" />
                      <p className="font-display text-[6px] font-black text-white leading-none text-center">HERÓIS</p>
                      <span className="text-[4px] text-gray-900 bg-white px-1 py-0.5 rounded-sm font-bold uppercase tracking-wider text-center mx-auto">464 pág.</span>
                    </div>
                  )}
                </div>

              </div>

              {/* Required text below covers */}
              <p className="text-[11px] sm:text-xs text-center text-gray-650 font-bold max-w-sm mx-auto mt-2 leading-snug">
                “Volume 1 + Volume 2 com 584 páginas de conteúdo bíblico infantil para imprimir em casa.”
              </p>
            </div>

            {/* BOX "POR QUE COMPENSA?" REQUERIDO */}
            <div className="bg-amber-100/40 border border-amber-300 p-4.5 rounded-2xl mb-5 text-left">
              <span className="text-xs font-black text-amber-800 bg-amber-200/60 px-2.5 py-0.5 rounded-full mb-1.5 inline-block">
                Por que vale muito mais a pena?
              </span>
              <p className="text-[11.5px] sm:text-xs text-gray-750 leading-relaxed font-bold">
                Por apenas R$ 5,00 a mais, você recebe um segundo livro completo com 464 páginas, mais de 390 atividades, 50 histórias bíblicas, diário de oração, caligrafia, jogos educativos, gabarito e certificado. É o melhor custo-benefício para quem quer mais conteúdo cristão para a criança.
              </p>
            </div>

            {/* FRASE DE IMPACTO REQUERIDA */}
            <p className="text-red-650 font-black text-xs sm:text-sm bg-red-50 p-3 rounded-xl border border-red-100 mb-5 text-left leading-relaxed">
              🔥 “Por só +R$ 5,00, transforme sua compra em um combo completo com mais de 580 páginas de conteúdo bíblico infantil.”
            </p>

            {/* LISTA DE BENEFÍCIOS DO KIT COMPLETO (bullets curtos, fortes e claros) */}
            <p className="text-xs uppercase font-extrabold text-gray-400 mb-2.5 tracking-wider text-left">Diferenciais do Volume 2 incluídos:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 mb-6 text-left">
              <div className="flex items-start gap-2 text-[11px] sm:text-xs text-gray-700">
                <span className="text-emerald-500 font-extrabold">✅</span>
                <span className="font-bold text-gray-800">Mais de 460 páginas de conteúdo cristão infantil</span>
              </div>
              <div className="flex items-start gap-2 text-[11px] sm:text-xs text-gray-700">
                <span className="text-emerald-500 font-extrabold">✅</span>
                <span className="font-medium text-gray-800">50 histórias bíblicas com lição e versículo</span>
              </div>
              <div className="flex items-start gap-2 text-[11px] sm:text-xs text-gray-700">
                <span className="text-emerald-500 font-extrabold">✅</span>
                <span className="font-medium text-gray-800">Mais de 390 atividades bíblicas</span>
              </div>
              <div className="flex items-start gap-2 text-[11px] sm:text-xs text-gray-700">
                <span className="text-emerald-500 font-extrabold">✅</span>
                <span>Cruzadinhas, sudoku, caça-palavras e labirintos</span>
              </div>
              <div className="flex items-start gap-2 text-[11px] sm:text-xs text-gray-700">
                <span className="text-emerald-500 font-extrabold">✅</span>
                <span>Caligrafia e tracejado de versículos</span>
              </div>
              <div className="flex items-start gap-2 text-[11px] sm:text-xs text-gray-700">
                <span className="text-emerald-500 font-extrabold">✅</span>
                <span>Diário de Oração e Gratidão</span>
              </div>
              <div className="flex items-start gap-2 text-[11px] sm:text-xs text-gray-700">
                <span className="text-emerald-500 font-extrabold">✅</span>
                <span className="font-semibold text-teal-800 bg-teal-50 px-1 rounded">Gabarito completo com todas as respostas</span>
              </div>
              <div className="flex items-start gap-2 text-[11px] sm:text-xs text-gray-700">
                <span className="text-emerald-500 font-extrabold">✅</span>
                <span className="font-bold text-amber-800">Certificado final “Pequeno Herói da Fé”</span>
              </div>
              <div className="flex items-start gap-2 text-[11px] sm:text-xs text-gray-700 col-span-1 sm:col-span-2 bg-emerald-50 p-2 rounded-xl">
                <span className="text-emerald-500 font-extrabold flex-shrink-0 mt-0.5">✅</span>
                <span className="font-extrabold text-emerald-800">Pronto para imprimir em casa, na igreja ou na EBD</span>
              </div>
            </div>
          </div>

          <div className="pt-5 border-t border-brand-beige-100 mt-auto flex flex-col justify-end text-left">
            <span className="text-xs text-amber-850 font-black bg-brand-yellow-400/40 px-2.5 py-1 rounded-full w-fit mb-2 flex items-center gap-1.5 animate-pulse">
              <Sparkles className="w-3.5 h-3.5 fill-amber-700" /> + R$ 5,00 E RECEBA MAIS 464 PÁGINAS EXTRAORDINÁRIAS
            </span>
            
            <div className="text-xs text-red-500 line-through font-bold">
              De R$ 49,90 por apenas
            </div>
            
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="font-display text-4xl sm:text-5xl font-black text-brand-yellow-500 tracking-tight leading-none">
                R$ 19,90
              </span>
              <span className="text-xs text-gray-500 font-bold">taxa única</span>
            </div>
            
            <p className="text-[11px] font-bold text-brand-yellow-600 mt-2">
              ★ Melhor escolha para quem quer o material mais completo
            </p>
            <p className="text-[10px] text-gray-500 font-semibold italic mt-0.5">
              Por só + R$ 5,00, você recebe muito mais conteúdo educativo para seu filho aprender brincando.
            </p>
            
            <p className="text-[10px] sm:text-[11px] text-gray-400 font-bold mt-2 uppercase tracking-wide">
              Pagamento único • Acesso imediato • PDF digital
            </p>
          </div>
        </div>

      </div>

      {/* HIGHR CONVERTING TRUST ELEMENTS CLOSE TO ACTION */}
      <div className="max-w-2xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8 text-center text-[10px] sm:text-[11px] font-bold text-gray-600">
        <div className="bg-white/80 p-3 rounded-xl border border-brand-beige-200 flex items-center justify-center gap-1.5 shadow-sm">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>Compra segura Kiwify</span>
        </div>
        <div className="bg-white/80 p-3 rounded-xl border border-brand-beige-200 flex items-center justify-center gap-1.5 shadow-sm">
          <Clock className="w-4 h-4 text-brand-blue-500" />
          <span>Acesso imediato digital</span>
        </div>
        <div className="bg-white/80 p-3 rounded-xl border border-brand-beige-200 flex items-center justify-center gap-1.5 shadow-sm">
          <Printer className="w-4 h-4 text-brand-yellow-500" />
          <span>PDF pronto para imprimir</span>
        </div>
        <div className="bg-white/80 p-3 rounded-xl border border-brand-beige-200 items-center justify-center gap-1.5 shadow-sm col-span-1 hidden sm:flex">
          <span>Para Crianças de 4 a 10 Anos</span>
        </div>
      </div>

      {/* BIG PRIMARY COMPACT CONVERTING CTA BUTTON THAT DYNAMICALLY ADAPTS LABELS */}
      <div className="text-center max-w-xl mx-auto bg-brand-beige-100/50 p-6 rounded-3xl border border-brand-beige-200 shadow-md">
        <p className="text-xs text-gray-500 font-semibold mb-2">
          Oferta Selecionada: <span className="text-gray-900 font-extrabold">{selectedOffer === 'base' ? 'Volume 1 — R$ 14,90' : 'Kit Completo + Volume 2 — R$ 19,90'}</span>
        </p>
        <a
          href={selectedOffer === 'base' ? '[COLOCAR_LINK_CHECKOUT_1490]' : '[COLOCAR_LINK_CHECKOUT_1990]'}
          id="cta-offer-button"
          className="inline-flex w-full items-center justify-center gap-3 bg-brand-green-500 hover:bg-brand-green-600 text-white font-display text-lg sm:text-xl font-black py-4.5 sm:py-5 px-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 active:scale-95 btn-premium-shine btn-auto-shimmer shadow-premium-hover cursor-pointer"
        >
          <span>
            {selectedOffer === 'base' ? 'Quero o Volume 1' : 'Quero o Kit Completo'}
          </span>
          <ArrowRight className="w-5.5 h-5.5 stroke-[2.5]" />
        </a>
        <p className="mt-3.5 text-xs text-gray-500 font-black tracking-wide">
          PDF digital • Acesso imediato • Compra segura • Pronto para imprimir
        </p>
      </div>

    </div>
  );
}
