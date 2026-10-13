import React, { useState } from 'react';
import { Check, Sparkles, ShieldCheck, ArrowRight, Printer, Clock, FileText } from 'lucide-react';
import { trackInitiateCheckout } from '../utils/pixel';

interface OfferSelectorProps {
  onSelectOption?: (price: number, url: string) => void;
}

export default function OfferSelector({ onSelectOption }: OfferSelectorProps) {
  const [selectedOffer, setSelectedOffer] = useState<'base' | 'upsell'>('upsell');
  const [v1ImgError, setV1ImgError] = useState<boolean>(false);
  const [v2ImgError, setV2ImgError] = useState<boolean>(false);

  // Real checkout link verified in project
  const CHECKOUT_URL = 'https://pay.cakto.com.br/acnvaef_923318';

  const handleSelect = (option: 'base' | 'upsell') => {
    setSelectedOffer(option);
    const price = option === 'base' ? 14.90 : 19.90;
    if (onSelectOption) {
      onSelectOption(price, CHECKOUT_URL);
    }
  };

  const handleCheckoutClick = (planName: string, price: number) => {
    trackInitiateCheckout(planName, price);
  };

  return (
    <div className="w-full max-w-5xl mx-auto" id="secao-ofertas">
      {/* Banner de apoio à decisão - Limpo e honesto */}
      <div className="bg-brand-blue-50/80 border border-brand-blue-100 rounded-2xl p-4 mb-8 text-center max-w-3xl mx-auto">
        <p className="text-xs sm:text-sm font-semibold text-brand-blue-800 flex items-center justify-center gap-2 flex-wrap">
          <span className="inline-block w-2 h-2 rounded-full bg-brand-blue-500" />
          <span>Acesso digital imediato em PDF</span>
          <span className="text-brand-blue-300">•</span>
          <span>Pronto para imprimir em casa ou na gráfica</span>
          <span className="text-brand-blue-300">•</span>
          <span>Sem mensalidades</span>
        </p>
      </div>

      {/* Grid de Ofertas: 1 coluna no celular, 2 colunas no desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch mb-8">
        
        {/* OPÇÃO 1 — VOLUME 1 */}
        <div 
          onClick={() => handleSelect('base')}
          className={`relative cursor-pointer transition-all duration-300 rounded-2xl p-6 sm:p-7 flex flex-col justify-between border-2 bg-white shadow-sm hover:shadow-md ${
            selectedOffer === 'base' 
              ? 'border-brand-blue-500 ring-2 ring-brand-blue-400/30' 
              : 'border-stone-200 hover:border-brand-blue-300'
          }`}
          id="card-volume-1"
        >
          <div>
            {/* Header do card */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Opção Individual
                </span>
                <h3 className="font-display text-xl sm:text-2xl text-gray-900 mt-1 font-bold">
                  Volume 1
                </h3>
                <p className="text-xs text-gray-500 font-medium mt-0.5">
                  Pequenos Discípulos da Fé
                </p>
              </div>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-colors flex-shrink-0 ${
                selectedOffer === 'base'
                  ? 'border-brand-blue-500 bg-brand-blue-500 text-white'
                  : 'border-gray-300 bg-white'
              }`}>
                {selectedOffer === 'base' && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </div>
            </div>

            {/* Capa do Volume 1 */}
            <div className="my-5 flex flex-col items-center justify-center py-4 bg-stone-50 rounded-xl border border-stone-100">
              {!v1ImgError ? (
                <img 
                  src="https://i.postimg.cc/pVJ1PDXC/capa-png.png" 
                  alt="Capa do Volume 1 Pequenos Discípulos da Fé" 
                  className="h-44 w-auto object-contain rounded-lg shadow-md border border-gray-100"
                  onError={() => setV1ImgError(true)}
                  loading="lazy"
                  width="130"
                  height="176"
                />
              ) : (
                <div className="w-32 h-44 bg-brand-blue-600 rounded-lg shadow-md flex flex-col justify-between p-3 text-white text-center">
                  <span className="text-[10px] font-bold uppercase tracking-wider">Vol. 1</span>
                  <p className="font-display text-xs font-bold">Pequenos Discípulos</p>
                  <span className="text-[10px] font-medium">120 Páginas</span>
                </div>
              )}
              <span className="text-[11px] font-semibold text-gray-500 mt-3">
                120 páginas em PDF para imprimir
              </span>
            </div>

            {/* Descrição objetiva */}
            <p className="text-xs sm:text-sm text-gray-600 mb-5 leading-relaxed">
              Material digital completo com atividades bíblicas educativas, desenhos para colorir e versículos para ensinar a Palavra de Deus em casa ou na igreja.
            </p>

            {/* Conteúdo incluído */}
            <div className="space-y-2.5 mb-6 text-left">
              <div className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700">
                <span className="text-brand-green-600 font-bold flex-shrink-0">✓</span>
                <span><strong>120 páginas</strong> de atividades em formato PDF</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700">
                <span className="text-brand-green-600 font-bold flex-shrink-0">✓</span>
                <span>Desenhos bíblicos clássicos para colorir</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700">
                <span className="text-brand-green-600 font-bold flex-shrink-0">✓</span>
                <span>Caça-palavras e labirintos infantis</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700">
                <span className="text-brand-green-600 font-bold flex-shrink-0">✓</span>
                <span>Versículos ilustrados para memorizar</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700">
                <span className="text-brand-green-600 font-bold flex-shrink-0">✓</span>
                <span>Pronto para imprimir em folha A4 comum</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700">
                <span className="text-brand-green-600 font-bold flex-shrink-0">✓</span>
                <span>Acesso digital imediato por e-mail</span>
              </div>
            </div>
          </div>

          {/* Preço e Botão */}
          <div className="pt-5 border-t border-stone-100 mt-auto">
            <div className="mb-4">
              <span className="text-xs text-gray-500 block font-medium">Pagamento único</span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="font-display text-3xl font-bold text-gray-900">
                  R$ 14,90
                </span>
                <span className="text-xs text-gray-500 font-medium">sem mensalidade</span>
              </div>
            </div>

            <a
              href={CHECKOUT_URL}
              onClick={() => handleCheckoutClick('Volume 1 - Pequenos Discípulos', 14.90)}
              className="inline-flex w-full items-center justify-center gap-2 bg-stone-100 hover:bg-stone-200 text-gray-900 font-display text-base font-bold py-3.5 px-6 rounded-xl transition-all duration-200"
            >
              <span>QUERO O VOLUME 1</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* OPÇÃO 2 — KIT COMPLETO: VOLUME 1 + VOLUME 2 */}
        <div 
          onClick={() => handleSelect('upsell')}
          className={`relative cursor-pointer transition-all duration-300 rounded-2xl p-6 sm:p-7 flex flex-col justify-between border-2 bg-white shadow-md hover:shadow-lg ${
            selectedOffer === 'upsell' 
              ? 'border-brand-blue-600 ring-2 ring-brand-blue-500/30' 
              : 'border-stone-200 hover:border-brand-blue-400'
          }`}
          id="card-kit-completo"
        >
          {/* Tag pequena e discreta no canto superior direito - Sem cobrir o título */}
          <div className="absolute top-4 right-4 bg-amber-500 text-white font-sans text-xs font-bold px-3 py-1 rounded-full shadow-xs flex items-center gap-1">
            <Sparkles className="w-3 h-3 fill-white" />
            <span>Mais escolhido</span>
          </div>

          <div>
            {/* Header do card com espaçamento limpo */}
            <div className="mb-4 pr-32 sm:pr-36">
              <span className="text-xs font-bold text-brand-blue-700 uppercase tracking-wider">
                Combo Completo
              </span>
              <h3 className="font-display text-xl sm:text-2xl text-gray-900 mt-1 font-bold leading-snug">
                Kit Completo: Volume 1 + Volume 2
              </h3>
              <p className="text-xs text-gray-500 font-medium mt-0.5">
                Inclui os livros completos: Volume 1 + Pequenos Heróis da Bíblia
              </p>
            </div>

            {/* Destaque sutil e honesto da diferença de apenas R$ 5,00 */}
            <div className="bg-amber-50 border border-amber-200/80 rounded-xl p-3 mb-5 text-left">
              <p className="text-xs text-amber-900 font-semibold leading-relaxed">
                <span className="font-bold text-amber-950">Apenas R$ 5,00 a mais:</span> você recebe o Volume 2 com 464 páginas extras, totalizando <strong>584 páginas</strong> de atividades para a criança.
              </p>
            </div>

            {/* Capas dos dois volumes lado a lado */}
            <div className="my-5 flex flex-col items-center justify-center py-4 bg-brand-blue-50/40 rounded-xl border border-brand-blue-100/60">
              <div className="flex items-center justify-center gap-4 sm:gap-6">
                
                {/* Capa Vol 1 */}
                <div className="flex flex-col items-center">
                  <span className="text-[10px] text-gray-500 font-bold uppercase mb-1">Vol. 1 (120 pág.)</span>
                  {!v1ImgError ? (
                    <img 
                      src="https://i.postimg.cc/pVJ1PDXC/capa-png.png" 
                      alt="Capa do Volume 1" 
                      className="h-36 sm:h-40 w-auto object-contain rounded-lg shadow-sm border border-gray-150"
                      onError={() => setV1ImgError(true)}
                      loading="lazy"
                      width="105"
                      height="144"
                    />
                  ) : (
                    <div className="w-24 h-36 bg-brand-blue-600 rounded-lg shadow-sm flex flex-col justify-between p-2 text-white text-center">
                      <span className="text-[9px] font-bold">Vol. 1</span>
                      <p className="font-display text-[10px] font-bold">120 pág.</p>
                    </div>
                  )}
                </div>

                {/* Símbolo de soma */}
                <div className="text-brand-blue-400 font-bold text-2xl font-display">
                  +
                </div>

                {/* Capa Vol 2 */}
                <div className="flex flex-col items-center">
                  <span className="text-[10px] text-brand-blue-700 font-bold uppercase mb-1">Vol. 2 (+464 pág.)</span>
                  {!v2ImgError ? (
                    <img 
                      src="https://i.postimg.cc/B6GM0vrr/Chat-GPT-Image-11-de-jun-de-2026-11-53-49.png" 
                      alt="Capa do Volume 2 Pequenos Heróis da Bíblia" 
                      className="h-36 sm:h-40 w-auto object-contain rounded-lg shadow-md border border-brand-blue-200"
                      onError={() => setV2ImgError(true)}
                      loading="lazy"
                      width="110"
                      height="150"
                    />
                  ) : (
                    <div className="w-24 h-36 bg-amber-500 rounded-lg shadow-md flex flex-col justify-between p-2 text-white text-center">
                      <span className="text-[9px] font-bold">Vol. 2</span>
                      <p className="font-display text-[10px] font-bold">464 pág.</p>
                    </div>
                  )}
                </div>

              </div>

              <span className="text-[11px] font-bold text-brand-blue-900 mt-3">
                Total de 584 páginas em PDF de alta qualidade
              </span>
            </div>

            {/* Conteúdo adicional real */}
            <div className="space-y-2.5 mb-6 text-left">
              <div className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-800">
                <span className="text-brand-green-600 font-bold flex-shrink-0">✓</span>
                <span><strong>Inclui tudo do Volume 1</strong> (120 páginas de atividades)</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-800">
                <span className="text-brand-green-600 font-bold flex-shrink-0">✓</span>
                <span><strong>Volume 2 com 464 páginas extras:</strong> livro "Pequenos Heróis da Bíblia"</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-800">
                <span className="text-brand-green-600 font-bold flex-shrink-0">✓</span>
                <span>Mais de 390 atividades bíblicas diversas</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-800">
                <span className="text-brand-green-600 font-bold flex-shrink-0">✓</span>
                <span>50 histórias bíblicas ilustradas com lição prática e versículo</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-800">
                <span className="text-brand-green-600 font-bold flex-shrink-0">✓</span>
                <span>Cruzadinhas, caça-palavras, labirintos e caligrafia</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-800">
                <span className="text-brand-green-600 font-bold flex-shrink-0">✓</span>
                <span>Diário de Oração e Gratidão para a criança</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-800">
                <span className="text-brand-green-600 font-bold flex-shrink-0">✓</span>
                <span>Gabarito completo de respostas</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-800">
                <span className="text-brand-green-600 font-bold flex-shrink-0">✓</span>
                <span>Certificado de conclusão "Pequeno Herói da Fé"</span>
              </div>
            </div>
          </div>

          {/* Preço e Botão */}
          <div className="pt-5 border-t border-stone-100 mt-auto">
            <div className="mb-4">
              <span className="text-xs text-brand-blue-700 block font-semibold">
                Diferença de apenas R$ 5,00 em relação ao Volume 1
              </span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="font-display text-3xl sm:text-4xl font-bold text-gray-900">
                  R$ 19,90
                </span>
                <span className="text-xs text-gray-500 font-medium">pagamento único</span>
              </div>
            </div>

            <a
              href={CHECKOUT_URL}
              onClick={() => handleCheckoutClick('Kit Completo - Volume 1 + Volume 2', 19.90)}
              className="inline-flex w-full items-center justify-center gap-2 bg-brand-green-500 hover:bg-brand-green-600 text-white font-display text-base sm:text-lg font-bold py-4 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
            >
              <span>QUERO O KIT COMPLETO</span>
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>

      </div>

      {/* Selos de segurança e clareza de compra */}
      <div className="max-w-2xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs font-semibold text-gray-600">
        <div className="bg-white p-3 rounded-xl border border-stone-200 flex items-center justify-center gap-1.5 shadow-xs">
          <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>Pagamento Seguro</span>
        </div>
        <div className="bg-white p-3 rounded-xl border border-stone-200 flex items-center justify-center gap-1.5 shadow-xs">
          <Clock className="w-4 h-4 text-brand-blue-600 flex-shrink-0" />
          <span>Acesso Imediato</span>
        </div>
        <div className="bg-white p-3 rounded-xl border border-stone-200 flex items-center justify-center gap-1.5 shadow-xs">
          <Printer className="w-4 h-4 text-amber-600 flex-shrink-0" />
          <span>Pronto para Imprimir</span>
        </div>
        <div className="bg-white p-3 rounded-xl border border-stone-200 flex items-center justify-center gap-1.5 shadow-xs">
          <FileText className="w-4 h-4 text-brand-blue-600 flex-shrink-0" />
          <span>Formato PDF A4</span>
        </div>
      </div>
    </div>
  );
}
