/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  BookOpen, 
  Heart, 
  Sparkles, 
  Smartphone, 
  Smile, 
  Check, 
  ChevronDown, 
  FileText, 
  AlertCircle, 
  Award, 
  Users, 
  Printer, 
  Clock, 
  Lock, 
  ShieldCheck, 
  Instagram, 
  Mail, 
  HelpCircle, 
  Baby, 
  FileDown, 
  X, 
  ArrowRight, 
  Star,
  RefreshCw
} from 'lucide-react';

import FAQItem from './components/FAQItem';
import OfferSelector from './components/OfferSelector';
import ThreeBackground from './components/ThreeBackground';

// Register standard ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export default function App() {
  // Offer selection state from our detailed element
  const [activePrice, setActivePrice] = useState<number>(19.90);
  const [activeCheckoutUrl, setActiveCheckoutUrl] = useState<string>('https://pay.cakto.com.br/acnvaef_923318');

  // Modal states for footer links to maintain professional structure and clear user expectations
  const [modalType, setModalType] = useState<'privacy' | 'terms' | 'support' | null>(null);

  useEffect(() => {
    // Detect if screen width is mobile to simplify ScrollTrigger effects
    const isMobile = window.innerWidth < 768;

    // 1. Warm Hero content intro
    gsap.fromTo('#hero-section h1, #hero-section p, #hero-section .inline-flex, #hero-section .sm\\:flex-row', 
      { opacity: 0, y: isMobile ? 15 : 30 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.12, ease: 'power3.out' }
    );

    // 2. What's Inside features sequence
    gsap.fromTo('#features-grid > div',
      { opacity: 0, y: isMobile ? 20 : 40 },
      {
        opacity: 1,
        y: 0,
        duration: isMobile ? 0.45 : 0.75,
        stagger: isMobile ? 0.06 : 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '#what-is-inside-section',
          start: 'top 82%',
          toggleActions: 'play none none none'
        }
      }
    );

    // 3. Target audience cards stagger
    gsap.fromTo('#target-cards-grid > div',
      { opacity: 0, scale: 0.94, y: 30 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: isMobile ? 0.5 : 0.8,
        stagger: isMobile ? 0.06 : 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#who-is-it-for-section',
          start: 'top 82%',
          toggleActions: 'play none none none'
        }
      }
    );

    // 4. Before and After comparison panels
    const comparisonCards = document.querySelectorAll('#comparison-row > div');
    if (comparisonCards.length >= 2) {
      gsap.fromTo(comparisonCards[0],
        { opacity: 0, x: isMobile ? 0 : -45, y: isMobile ? 20 : 0 },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.95,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#comparison-section',
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );
      gsap.fromTo(comparisonCards[1],
        { opacity: 0, x: isMobile ? 0 : 45, y: isMobile ? 20 : 0 },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.95,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#comparison-section',
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );
    }

    // 5. FAQ items sequence
    gsap.fromTo('#faq-accordions > div',
      { opacity: 0, y: isMobile ? 15 : 25 },
      {
        opacity: 1,
        y: 0,
        duration: 0.55,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '#faq-section',
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );

    // 6. Final CTA section scale intro
    gsap.fromTo('#final-cta-section .max-w-4xl',
      { opacity: 0, scale: isMobile ? 0.97 : 0.94 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '#final-cta-section',
          start: 'top 82%',
          toggleActions: 'play none none none'
        }
      }
    );
  }, []);

  const handleOfferSelect = (price: number, url: string) => {
    setActivePrice(price);
    setActiveCheckoutUrl(url);
  };

  const scrollToOffers = (e: React.MouseEvent) => {
    e.preventDefault();
    const destination = document.getElementById('offer-selection-zone');
    if (destination) {
      destination.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const faqs = [
    {
      id: "1",
      question: "O produto é físico?",
      answer: "Não. É um PDF digital para baixar e imprimir em casa."
    },
    {
      id: "2",
      question: "Recebo na hora?",
      answer: "Sim. Após a confirmação do pagamento, você recebe o acesso ao material em alta resolução no seu e-mail."
    },
    {
      id: "3",
      question: "Posso imprimir quantas vezes quiser?",
      answer: "Sim, para uso pessoal e familiar."
    },
    {
      id: "4",
      question: "Serve para qual idade?",
      answer: "Recomendado para crianças de 3 a 10 anos."
    }
  ];

  return (
    <div className="min-h-screen bg-brand-beige-50 selection:bg-brand-blue-100 flex flex-col justify-between" id="landing-container">
      
      {/* 1. BARRA SUPERIOR DISCRETA */}
      <div className="bg-brand-blue-600 text-white text-center py-2.5 px-4 text-xs sm:text-sm font-semibold tracking-wide shadow-xs" id="top-announcement-bar">
        <p className="flex items-center justify-center gap-1.5 flex-wrap">
          <span className="inline-block w-2 h-2 rounded-full bg-brand-yellow-400 animate-ping" />
          <span>PDF digital para imprimir em casa • Acesso imediato após a compra</span>
        </p>
      </div>

      {/* 2. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-16 sm:py-20 lg:py-24 bg-gradient-to-b from-brand-blue-50 to-brand-beige-50" id="hero-section">
        {/* Three.js 3D Background - floating delicate celestial particles */}
        <ThreeBackground />

        {/* Playful Floating Decals */}
        <div className="absolute top-10 left-10 text-brand-yellow-400/20 select-none text-4xl animate-float font-sans pointer-events-none">★</div>
        <div className="absolute bottom-10 right-10 text-brand-blue-500/10 select-none text-9xl animate-float-slow font-sans pointer-events-none">☁</div>
        <div className="absolute top-1/3 right-12 text-brand-green-500/20 select-none text-3xl animate-float font-sans pointer-events-none">✝</div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* TEXT ZONE */}
            <div className="lg:col-span-7 text-center lg:text-left">
              {/* Soft Tag */}
              <div className="inline-flex items-center gap-1.5 bg-brand-yellow-400/20 text-brand-yellow-600 text-xs sm:text-sm font-bold px-3 py-1.5 rounded-full mb-6 uppercase tracking-wider">
                <Star className="w-3.5 h-3.5 fill-brand-yellow-400" />
                <span>Kit Digital de Atividades Cristãs</span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-5xl text-gray-900 font-extrabold tracking-tight leading-[1.1] mb-6">
                Mais Bíblia, <span className="text-brand-blue-600">menos tela:</span> atividades cristãs para imprimir em casa
              </h1>

              <p className="font-sans text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed mb-6 max-w-2xl mx-auto lg:mx-0">
                Receba hoje um PDF infantil cristão com atividades bíblicas para colorir, brincar e aprender sobre Deus em família.
              </p>

              {/* Bullet List for instant scan */}
              <ul className="space-y-3 mb-8 inline-block text-left max-w-xl mx-auto lg:mx-0">
                <li className="flex items-center gap-3 text-gray-700 text-sm sm:text-base font-semibold">
                  <span className="bg-brand-blue-100 text-brand-blue-600 flex items-center justify-center rounded-full h-6 w-6 text-xs font-bold">✓</span>
                  <span>120 páginas em PDF</span>
                </li>
                <li className="flex items-center gap-3 text-gray-700 text-sm sm:text-base font-semibold">
                  <span className="bg-brand-blue-100 text-brand-blue-600 flex items-center justify-center rounded-full h-6 w-6 text-xs font-bold">✓</span>
                  <span>Acesso imediato</span>
                </li>
                <li className="flex items-center gap-3 text-gray-700 text-sm sm:text-base font-semibold">
                  <span className="bg-brand-blue-100 text-brand-blue-600 flex items-center justify-center rounded-full h-6 w-6 text-xs font-bold">✓</span>
                  <span>Para imprimir em casa</span>
                </li>
                <li className="flex items-center gap-3 text-gray-700 text-sm sm:text-base font-semibold">
                  <span className="bg-brand-blue-100 text-brand-blue-600 flex items-center justify-center rounded-full h-6 w-6 text-xs font-bold">✓</span>
                  <span>Ideal para crianças de 3 a 10 anos</span>
                </li>
                <li className="flex items-center gap-3 text-gray-700 text-sm sm:text-base font-semibold">
                  <span className="bg-brand-blue-100 text-brand-blue-600 flex items-center justify-center rounded-full h-6 w-6 text-xs font-bold">✓</span>
                  <span>Colorir, caça-palavras, labirintos e versículos</span>
                </li>
              </ul>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
                <a
                  href="#offer-selection-zone"
                  onClick={scrollToOffers}
                  className="w-full sm:w-auto text-center bg-brand-green-500 hover:bg-brand-green-600 text-white font-display text-lg font-bold py-4.5 px-10 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 btn-premium-shine btn-auto-shimmer shadow-premium-hover"
                >
                  Receber acesso imediato
                </a>
              </div>
            </div>

            {/* MOCKUP GRAPHIC ZONE */}
            <div className="lg:col-span-5 flex justify-center items-center">
              <img 
                src="https://i.postimg.cc/8cZ2cWG2/Chat-GPT-Image-11-de-jun-de-2026-12-02-16.png" 
                alt="Material de apoio Pequenos Discípulos da Fé com atividades bíblicas para crianças" 
                className="hero-product-image w-full max-w-[92%] lg:max-w-[520px] mt-7 lg:mt-0 h-auto object-contain block mx-auto rounded-[24px] transition-all duration-300 hover:scale-[1.02]"
                style={{ filter: "drop-shadow(0 20px 40px rgba(15, 23, 42, 0.18))" }}
              />
            </div>

          </div>
        </div>
      </section>

      {/* 3. SEÇÃO DE OFERTA EXCLUSIVA COM SELETOR DE PREÇOS (TRAZIDA PARA O TOPO) */}
      <section className="py-12 sm:py-16 bg-brand-beige-100 relative" id="offer-selection-zone">
        {/* Hand drawn cloud decoration */}
        <div className="absolute top-12 left-10 text-brand-blue-500/10 text-9xl animate-float font-sans pointer-events-none select-none hidden md:block">☁</div>
        <div className="absolute bottom-16 right-10 text-brand-yellow-400/20 text-7xl animate-float-slow font-sans pointer-events-none select-none hidden md:block">★</div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <div className="inline-flex flex-wrap justify-center gap-2 mb-4">
            <span className="text-[10px] sm:text-xs font-bold text-brand-blue-750 bg-brand-blue-100/60 uppercase tracking-widest px-3 py-1 rounded-full">
              ⚡ Oferta com acesso imediato
            </span>
            <span className="text-[10px] sm:text-xs font-bold text-teal-700 bg-teal-50 uppercase tracking-widest px-3 py-1 rounded-full">
              🖨️ PDF digital para imprimir em casa
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl text-gray-900 font-extrabold mb-3 leading-tight">
            Escolha seu material bíblico infantil
          </h2>
          <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto mb-8 leading-relaxed font-medium">
            Comece com o Volume 1 ou leve o Kit Completo com o Volume 2 e receba um combo com 584 páginas de atividades, histórias e aprendizado cristão para imprimir em casa.
          </p>

          {/* Offer switch block component called */}
          <OfferSelector onSelectOption={handleOfferSelect} />

        </div>
      </section>

      {/* 5. O QUE VEM NO MATERIAL (GRID SLICK COM 6 ITENS) */}
      <section className="py-16 sm:py-20 bg-white" id="what-is-inside-section">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <span className="text-xs font-bold text-brand-green-600 bg-brand-green-50 uppercase tracking-widest px-3 py-1 rounded-full">
              Conteúdo do Kit
            </span>
            <h2 className="font-display text-3xl sm:text-4xl text-gray-900 font-extrabold mt-4 mb-4 leading-tight">
              O que vem dentro do Kit Digital?
            </h2>
            <p className="text-gray-500 text-sm sm:text-base">
              Desenvolvemos 120 páginas em PDF de alta qualidade para imprimir em casa e usar hoje mesmo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="features-grid">
            
            {/* Feature 1 */}
            <div className="bg-brand-beige-50 rounded-2xl p-6 border border-brand-beige-100 flex flex-col justify-between hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div>
                <span className="text-3xl block mb-3">🖍</span>
                <h3 className="font-display text-lg font-bold text-gray-800 mb-2">Desenhos bíblicos para colorir</h3>
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                  Pinte passagens marcantes como a Arca de Noé, Jonas e o Grande Peixe, e Jesus com as crianças.
                </p>
              </div>
              <span className="text-[10px] uppercase font-bold text-brand-blue-500 bg-white px-2 py-1 rounded mt-4 w-fit">Criatividade</span>
            </div>

            {/* Feature 2 */}
            <div className="bg-brand-beige-50 rounded-2xl p-6 border border-brand-beige-100 flex flex-col justify-between hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div>
                <span className="text-3xl block mb-3">🔍</span>
                <h3 className="font-display text-lg font-bold text-gray-800 mb-2">Caça-palavras</h3>
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                  Busque e reconheça termos edificantes sobre fé, amor, esperança e heróis da Bíblia.
                </p>
              </div>
              <span className="text-[10px] uppercase font-bold text-brand-yellow-600 bg-white px-2 py-1 rounded mt-4 w-fit">Raciocínio</span>
            </div>

            {/* Feature 3 */}
            <div className="bg-brand-beige-50 rounded-2xl p-6 border border-brand-beige-100 flex flex-col justify-between hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div>
                <span className="text-3xl block mb-3">🧩</span>
                <h3 className="font-display text-lg font-bold text-gray-800 mb-2">Labirintos</h3>
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                  Ajude os animais a chegarem na arca ou a ovelha perdida a encontrar o bom pastor com segurança.
                </p>
              </div>
              <span className="text-[10px] uppercase font-bold text-brand-blue-500 bg-white px-2 py-1 rounded mt-4 w-fit">Coordenação</span>
            </div>

            {/* Feature 4 */}
            <div className="bg-brand-beige-50 rounded-2xl p-6 border border-brand-beige-100 flex flex-col justify-between hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div>
                <span className="text-3xl block mb-3">🗣</span>
                <h3 className="font-display text-lg font-bold text-gray-800 mb-2">Versículos para memorizar</h3>
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                  Áreas estruturadas com caligrafia infantil para memorizar versículos e guardá-los no coração.
                </p>
              </div>
              <span className="text-[10px] uppercase font-bold text-brand-yellow-600 bg-white px-2 py-1 rounded mt-4 w-fit">Fixação da Palavra</span>
            </div>

            {/* Feature 5 */}
            <div className="bg-brand-beige-50 rounded-2xl p-6 border border-brand-beige-100 flex flex-col justify-between hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div>
                <span className="text-3xl block mb-3">✏</span>
                <h3 className="font-display text-lg font-bold text-gray-800 mb-2">Atividades educativas</h3>
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                  Ligue os números, complete lacunas bíblicas e desafios lógicos adaptados à infância.
                </p>
              </div>
              <span className="text-[10px] uppercase font-bold text-brand-green-600 bg-white px-2 py-1 rounded mt-4 w-fit">Educação e Fé</span>
            </div>

            {/* Feature 6 */}
            <div className="bg-brand-beige-50 rounded-2xl p-6 border border-brand-beige-100 flex flex-col justify-between hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div>
                <span className="text-3xl block mb-3">📜</span>
                <h3 className="font-display text-lg font-bold text-gray-800 mb-2">Certificado de Conclusão</h3>
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                  Uma linda folha oficial assinada pelos pais para premiar o esforço e celebrar a conquista concluída.
                </p>
              </div>
              <span className="text-[10px] uppercase font-bold text-brand-green-600 bg-white px-2 py-1 rounded mt-4 w-fit">Premiação Especial</span>
            </div>

          </div>
        </div>
      </section>

      {/* 6. SEÇÃO "PARA QUEM É" */}
      <section className="py-16 sm:py-20 bg-brand-beige-50" id="who-is-it-for-section">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <span className="text-xs font-bold text-brand-blue-600 bg-brand-blue-50 uppercase tracking-widest px-3 py-1 rounded-full">
              Público-Alvo Perfeito
            </span>
            <h2 className="font-display text-3xl sm:text-4xl text-gray-900 font-extrabold mt-4 mb-4">
              Para quem este material foi feito?
            </h2>
            <p className="text-gray-500 text-sm sm:text-base">
              Identifique se o kit foi desenhado especificamente para a sua realidade e a das crianças que você ama.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" id="target-cards-grid">
            
            {/* Target 1 */}
            <div className="bg-white rounded-2xl p-6 border border-brand-beige-200 shadow-xs flex flex-col gap-3">
              <span className="text-2xl">👩‍👦</span>
              <h4 className="font-display text-base font-bold text-gray-800">Mães e pais cristãos</h4>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                Que desejam nutrir a fé dos filhos dentro de casa e assumir de verdade o papel de educador espiritual no dia a dia.
              </p>
            </div>

            {/* Target 2 */}
            <div className="bg-white rounded-2xl p-6 border border-brand-beige-200 shadow-xs flex flex-col gap-3">
              <span className="text-2xl">🏫</span>
              <h4 className="font-display text-base font-bold text-gray-800">Professores de EBD</h4>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                Que precisam de folhas didáticas rápidas, limpas, bonitas e prontas para colorir e entregar para as classes dominicais.
              </p>
            </div>

            {/* Target 3 */}
            <div className="bg-white rounded-2xl p-6 border border-brand-beige-200 shadow-xs flex flex-col gap-3">
              <span className="text-2xl">⛪</span>
              <h4 className="font-display text-base font-bold text-gray-800">Igrejas infantis</h4>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                Que querem economizar tempo gerando materiais com linguagem visual que conecta com doçura e carinho ao coração infantil.
              </p>
            </div>

            {/* Target 4 */}
            <div className="bg-white rounded-2xl p-6 border border-brand-beige-200 shadow-xs flex flex-col gap-3">
              <span className="text-2xl">👶</span>
              <h4 className="font-display text-base font-bold text-gray-800">Crianças de 3 a 10 anos</h4>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                Menores vão se apaixonar pintando, e maiores vão aprender e memorizar versículos com independência.
              </p>
            </div>

            {/* Target 5 */}
            <div className="bg-white rounded-2xl p-6 border border-brand-beige-200 shadow-xs flex flex-col gap-3 sm:col-span-2 lg:col-span-1">
              <span className="text-2xl">📵</span>
              <h4 className="font-display text-base font-bold text-gray-800">Combate seguro às telas</h4>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                Para quem não aguenta mais ver as crianças vidradas no feed do celular e quer reverter esse hábito com canetinhas e giz de cera.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 5. BENEFÍCIOS PRINCIPAIS */}
      <section className="py-16 sm:py-20 bg-brand-blue-50/30 border-t border-b border-brand-beige-200" id="benefits-highlights-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="text-xs font-bold text-brand-blue-700 bg-brand-blue-50 uppercase tracking-widest px-3 py-1.5 rounded-full inline-block mb-4">
            Benefícios Principais
          </span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-gray-900 font-extrabold max-w-2xl mx-auto mb-6 leading-tight">
            “Ensine a Palavra de Deus de forma simples, divertida e de forma visual.”
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left mt-10">
            <div className="bg-white p-6 rounded-2xl border border-brand-beige-200 shadow-xs">
              <span className="text-2xl mb-1.5 block">🎨</span>
              <h4 className="font-display text-sm font-bold text-gray-800 mb-1">Passo a Passo Prático</h4>
              <p className="text-xs text-gray-500 leading-relaxed">Páginas limpas prontas para impressora comum A4. Imprima e use no seu ritmo sem complicações.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-brand-beige-200 shadow-xs">
              <span className="text-2xl mb-1.5 block">📵</span>
              <h4 className="font-display text-sm font-bold text-gray-800 mb-1">Mais Foco, Menos Celular</h4>
              <p className="text-xs text-gray-500 leading-relaxed">Exercite a coordenação motora fina e atenção plena longe da agitação excessiva das redes digitais.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-brand-beige-200 shadow-xs">
              <span className="text-2xl mb-1.5 block">👨‍👩‍👧</span>
              <h4 className="font-display text-sm font-bold text-gray-800 mb-1">Valores Eternos</h4>
              <p className="text-xs text-gray-500 leading-relaxed">Momentos ricos de união espiritual, fixando versículos preciosos que seu filho levará para sempre.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. SEÇÃO DE COMPARAÇÃO (BEFORE / AFTER) */}
      <section className="py-16 sm:py-20 bg-white" id="comparison-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <span className="text-xs font-bold text-brand-yellow-500 bg-brand-yellow-50 uppercase tracking-widest px-3 py-1 rounded-full">
              Comparação Real
            </span>
            <h2 className="font-display text-3xl sm:text-4xl text-gray-900 font-extrabold mt-4 mb-4 leading-tight">
              A diferença de escolher uma rotina edificante
            </h2>
            <p className="text-gray-500 text-sm sm:text-base">
              Veja a diferença prática e de temperamento na sua casa após implementar atividades manuais cristãs estruturadas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch" id="comparison-row">
            
            {/* ANTES */}
            <div className="bg-red-50/40 rounded-3xl p-6 sm:p-8 border-2 border-red-100 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold bg-red-100 text-red-600 px-3 py-1 rounded-full uppercase tracking-wide inline-block mb-4">
                  Antes (Sem o Material)
                </span>
                <p className="text-xl font-display font-bold text-gray-800 mb-6 flex items-center gap-1.5">
                  📱 Celular, vídeos aleatórios e distração
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="text-red-500 text-lg font-bold">✕</span>
                    <span className="text-xs sm:text-sm text-gray-600">Tempo excessivo em telas sem controle educativo.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-red-500 text-lg font-bold">✕</span>
                    <span className="text-xs sm:text-sm text-gray-600">Conteúdo sem princípios morais ou valores bíblicos.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-red-500 text-lg font-bold">✕</span>
                    <span className="text-xs sm:text-sm text-gray-600">Irritabilidade excessiva e tédio fácil na infância.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-red-500 text-lg font-bold">✕</span>
                    <span className="text-xs sm:text-sm text-gray-600">Ausência de momentos especiais de partilha cristã em família.</span>
                  </div>
                </div>
              </div>
              <div className="bg-red-100/50 p-4 rounded-xl text-center mt-6">
                <p className="text-[11px] font-bold text-red-600 font-sans uppercase">Estimula dependência digital</p>
              </div>
            </div>

            {/* DEPOIS */}
            <div className="bg-brand-green-50/40 rounded-3xl p-6 sm:p-8 border-2 border-brand-green-500/20 flex flex-col justify-between shadow-md">
              <div>
                <span className="text-xs font-bold bg-brand-green-50 text-brand-green-600 px-3 py-1 rounded-full uppercase tracking-wide inline-block mb-4">
                  Depois (Com o Material)
                </span>
                <p className="text-xl font-display font-bold text-gray-800 mb-6 flex items-center gap-1.5">
                  🖍 Colorir, aprender e orar
                </p>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="text-brand-green-500 text-lg font-bold">✓</span>
                    <span className="text-xs sm:text-sm text-gray-600 font-medium">Foco físico saudável pintando páginas preciosas de heróis bíblicos.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-brand-green-500 text-lg font-bold">✓</span>
                    <span className="text-xs sm:text-sm text-gray-600 font-medium">Assimilação saudável de versículos de Provérbios, Salmos e Evangelhos.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-brand-green-500 text-lg font-bold">✓</span>
                    <span className="text-xs sm:text-sm text-gray-600 font-medium">Tranquilidade, desenvolvimento emocional e amor pelas escrituras.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-brand-green-500 text-lg font-bold">✓</span>
                    <span className="text-xs sm:text-sm text-gray-600 font-medium">Sentar-se juntos, criando um lar leve de testemunho cristão.</span>
                  </div>
                </div>
              </div>
              <div className="bg-brand-green-50 p-4 rounded-xl text-center mt-6">
                <p className="text-[11px] font-bold text-brand-green-600 font-sans uppercase">CONEXÃO SAUDÁVEL COM A PALAVRA DE DEUS</p>
              </div>
            </div>

          </div>
        </div>
      </section>



      {/* 9. SEÇÃO DE GARANTIA E CONFIANÇA */}
      <section className="py-12 bg-white border-t border-b border-brand-beige-200" id="trust-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-brand-beige-50/50 p-6 sm:p-10 rounded-3xl border border-brand-beige-200">
            
            <div className="md:col-span-4 flex flex-col items-center text-center border-b md:border-b-0 md:border-r border-brand-beige-200 pb-6 md:pb-0 md:pr-6">
              <span className="text-5xl mb-3 block">🛡</span>
              <h3 className="font-display text-lg font-bold text-gray-800">Sem Riscos</h3>
              <p className="text-xs text-brand-green-600 font-bold uppercase mt-1">Garantia Absoluta</p>
            </div>

            <div className="md:col-span-8">
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                <strong>Pagamento seguro e acesso imediato ao material em PDF após a confirmação da compra.</strong> Você receberá o link de acesso ao material digital para baixar e imprimir em casa sem qualquer complicação. Caso tenha dúvidas, nosso suporte amigável estará ativo todos os dias.
              </p>

              {/* Badges container */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 mt-6">
                <div className="bg-white px-3 py-2 rounded-xl border border-brand-beige-200 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-brand-blue-500" />
                  <span className="text-[11px] font-semibold text-gray-600">Pagamento criptografado</span>
                </div>
                <div className="bg-white px-3 py-2 rounded-xl border border-brand-beige-200 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-brand-blue-500" />
                  <span className="text-[11px] font-semibold text-gray-600">Acesso super rápido</span>
                </div>
                <div className="bg-white px-3 py-2 rounded-xl border border-brand-beige-200 col-span-2 sm:col-span-1 flex items-center justify-center sm:justify-start gap-2">
                  <Printer className="w-4 h-4 text-brand-blue-500" />
                  <span className="text-[11px] font-semibold text-gray-600">Imprima livremente</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 10. SEÇÃO DE FAQ (PERGUNTAS FREQUENTES ACCORDION) */}
      <section className="py-16 sm:py-20 bg-brand-beige-50" id="faq-section">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-brand-blue-500 bg-brand-blue-50 px-3 py-1 rounded-full uppercase tracking-widest">
              Dúvidas Frequentes
            </span>
            <h2 className="font-display text-3xl sm:text-4xl text-gray-900 font-extrabold mt-4 mb-2">
              Perguntas e Respostas
            </h2>
            <p className="text-gray-500 text-sm">
              Separamos as principais dúvidas das mães cristãs sobre o funcionamento do material digital.
            </p>
          </div>

          <div className="space-y-4" id="faq-accordions">
            {faqs.map((faq) => (
              <FAQItem 
                key={faq.id}
                id={faq.id}
                question={faq.question}
                answer={faq.answer}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 11. CTA FINAL EMOCIONAL */}
      <section className="py-20 sm:py-24 bg-brand-blue-600 text-white relative overflow-hidden" id="final-cta-section">
        {/* Floating background design */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float-slow" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-blue-700 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-float" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <span className="text-xs font-bold bg-brand-blue-500/50 text-brand-yellow-400 border border-brand-yellow-400/30 px-3.5 py-1.5 rounded-full inline-block uppercase tracking-widest mb-4">
            Herança do Senhor
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-white font-extrabold mb-5 leading-tight">
            Transforme o tempo livre do seu filho em um momento com Deus
          </h2>
          <p className="text-brand-blue-100 text-base sm:text-lg mb-8 max-w-2xl mx-auto leading-relaxed font-semibold">
            Clique no botão abaixo e receba seu material completo em PDF.
          </p>

          <a
            href="#offer-selection-zone"
            onClick={scrollToOffers}
            className="inline-flex items-center gap-2 bg-brand-yellow-400 hover:bg-brand-yellow-500 text-gray-900 font-display text-lg font-bold py-4.5 px-10 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 btn-premium-shine btn-auto-shimmer shadow-premium-hover duration-300 active:scale-95"
          >
            Quero receber meu PDF
          </a>

          <p className="mt-4 text-xs text-brand-blue-200 uppercase font-bold tracking-wider">
            ★ Receba em menos de 1 minuto em formato PDF
          </p>
        </div>
      </section>

      {/* 12. RODAPÉ */}
      <footer className="bg-gray-950 text-gray-400 py-12 px-4 sm:px-6 border-t border-gray-900 text-center" id="footer-section">
        <div className="max-w-5xl mx-auto">
          
          <div className="mb-6">
            <h4 className="font-display text-lg font-bold text-white tracking-tight">
              ⛵ Pequenos Discípulos da Fé
            </h4>
            <p className="text-xs text-gray-500 mt-2 max-w-md mx-auto">
              Produto digital independente. Material educativo infantil de fixação bíblica para uso pessoal e familiar.
            </p>
          </div>

          {/* Interactive footer actions showing modular popups for higher transparency */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2.5 text-xs font-semibold mb-6">
            <button 
              onClick={() => setModalType('privacy')} 
              className="hover:text-white transition-colors cursor-pointer focus:outline-none"
            >
              Política de Privacidade
            </button>
            <span className="text-gray-800">|</span>
            <button 
              onClick={() => setModalType('terms')} 
              className="hover:text-white transition-colors cursor-pointer focus:outline-none"
            >
              Termos de Uso
            </button>
            <span className="text-gray-800">|</span>
            <button 
              onClick={() => setModalType('support')} 
              className="hover:text-white transition-colors cursor-pointer focus:outline-none"
            >
              Suporte Técnico por E-mail
            </button>
          </div>

          <div className="text-[10px] text-gray-600 border-t border-gray-900 pt-6">
            <p>© {new Date().getFullYear()} Pequenos Discípulos da Fé. Todos os direitos reservados.</p>
            <p className="mt-1">Nossa plataforma utiliza uma intermediadora de pagamentos totalmente segura. Nosso conteúdo não substitui a bíblia física ou o aconselhamento doutrinário da igreja local.</p>
          </div>

        </div>
      </footer>

      {/* 13. BOTTOM FLOATING DEVICE CTA FOR MOBILE DISCOVERY */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 p-3 bg-white/95 backdrop-blur-md border-t border-brand-beige-200 z-40 flex items-center justify-between shadow-lg" id="mobile-floating-dock">
        <div className="flex flex-col text-left justify-center pl-1">
          <span className="text-[9px] uppercase font-bold text-gray-400 leading-none">Oferta Selecionada</span>
          <span className="font-display text-lg font-black text-brand-blue-600">R$ {activePrice.toFixed(2).replace('.', ',')}</span>
          <span className="text-[9px] text-brand-green-600 font-bold leading-none -mt-0.5">Sem mensalidade • Único</span>
        </div>
        
        <a
          href={activeCheckoutUrl}
          className="bg-brand-green-500 hover:bg-brand-green-600 text-white font-display text-xs sm:text-sm font-bold py-3.5 px-6 rounded-xl flex items-center gap-1.5 shadow-md active:scale-95 transition-all mobile-cta-pulse btn-premium-shine btn-auto-shimmer"
        >
          <span>RECEBER ACESSO IMEDIATO</span>
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>

      {/* FOOTER DIALOG MODULES - Real overlay modals inside React state for client reliability */}
      <AnimatePresence>
        {modalType && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full max-h-[80vh] overflow-y-auto shadow-2xl relative"
            >
              <button 
                onClick={() => setModalType(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1.5 bg-gray-100 rounded-full"
              >
                <X className="w-4 h-4" />
              </button>

              {modalType === 'privacy' && (
                <div>
                  <h3 className="font-display text-xl font-bold text-gray-900 mb-4">Política de Privacidade</h3>
                  <div className="text-xs sm:text-sm text-gray-600 space-y-3 leading-relaxed">
                    <p>Valorizamos a privacidade e segurança de todas as famílias e educadores cristãos que utilizam nosso portal de recursos educativos.</p>
                    <p><strong>1. Dados coletados:</strong> Ao adquirir nossos materiais através da plataforma de pagamento seguro, os dados cadastrais (nome completo e e-mail) nos são retransmitidos para permitir a entrega automática e identificação do suporte de download.</p>
                    <p><strong>2. Sem Span:</strong> Não vendemos, alugamos ou retransmitimos sua conta de e-mail para outras marcas. Você apenas receberá atualizações das atividades de colorir ou materiais complementares solicitados por você.</p>
                    <p><strong>3. Cookies:</strong> Usamos pequenos cookies para viabilizar as métricas padrão de performance do site e rastreamento do fluxo geral de compras.</p>
                  </div>
                </div>
              )}

              {modalType === 'terms' && (
                <div>
                  <h3 className="font-display text-xl font-bold text-gray-900 mb-4">Termos de Uso</h3>
                  <div className="text-xs sm:text-sm text-gray-600 space-y-3 leading-relaxed">
                    <p>Leia com carinho as condições de uso do nosso Kit Digital de atividades bíblicas.</p>
                    <p><strong>1. Uso Familiar:</strong> Você tem direito de uso pessoal ilimitado. Pode imprimir as 120 páginas para as crianças do seu lar quantas vezes desejar.</p>
                    <p><strong>2. Uso EBD/Igrejas:</strong> Autorizamos a equipe de tias de igrejas e professores de Escola Bíblica Dominical (EBD) a imprimir o kit para suas turmas locais sem fins lucrativos.</p>
                    <p><strong>3. Direitos Reservados:</strong> É estritamente proibido revender os PDFs, hospedar os arquivos em canais de telegram, sites de terceiros sem autorização prévia por escrito.</p>
                  </div>
                </div>
              )}

              {modalType === 'support' && (
                <div>
                  <h3 className="font-display text-xl font-bold text-gray-900 mb-4">Suporte ao Cliente</h3>
                  <div className="text-xs sm:text-sm text-gray-600 space-y-3 leading-relaxed">
                    <p>Precisa de auxílio com o download das suas 120 atividades bíblicas infantis? Estamos aqui para servir você!</p>
                    <p>Se você realizou o pagamento e não encontrou o e-mail de acesso na sua caixa de entrada, por favor verifique sua pasta de spans/lixo eletrônico primeiro.</p>
                    <p>Se precisar, nos envie uma mensagem direta informando seu e-mail de compra:</p>
                    <div className="bg-brand-blue-50 p-4 rounded-xl border border-brand-blue-100 font-mono text-xs text-brand-blue-800 break-all select-all flex items-center gap-2">
                      <Mail className="w-4 h-4 flex-shrink-0" />
                      <span>{`suporte.discípulos@gmail.com`}</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-6 pt-4 border-t border-gray-100 text-right">
                <button 
                  onClick={() => setModalType(null)}
                  className="bg-brand-blue-500 hover:bg-brand-blue-600 text-white font-semibold px-4 py-2 rounded-xl text-xs sm:text-sm"
                >
                  Fechar janela
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
