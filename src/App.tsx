/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Heart, 
  Sparkles, 
  Printer, 
  Clock, 
  Lock, 
  ShieldCheck, 
  Mail, 
  X, 
  ArrowRight, 
  Star,
  CheckCircle2,
  Users,
  FileCheck,
  ChevronDown
} from 'lucide-react';

import FAQItem from './components/FAQItem';
import OfferSelector from './components/OfferSelector';
import ProductMockup from './components/ProductMockup';
import ThreeBackground from './components/ThreeBackground';
import { trackPageView, trackViewContent, trackInitiateCheckout } from './utils/pixel';

export default function App() {
  const [activePrice, setActivePrice] = useState<number>(19.90);
  const [activeCheckoutUrl, setActiveCheckoutUrl] = useState<string>('https://pay.cakto.com.br/acnvaef_923318');
  const [modalType, setModalType] = useState<'privacy' | 'terms' | 'support' | null>(null);

  useEffect(() => {
    // Fire safe tracking events
    trackPageView();
    trackViewContent('Pequenos Discípulos da Fé — Atividades Bíblicas Infantis');
  }, []);

  const handleOfferSelect = (price: number, url: string) => {
    setActivePrice(price);
    setActiveCheckoutUrl(url);
  };

  const scrollToOffers = (e: React.MouseEvent) => {
    e.preventDefault();
    const destination = document.getElementById('secao-ofertas');
    if (destination) {
      destination.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleMobileCtaClick = () => {
    trackInitiateCheckout(
      activePrice === 14.90 ? 'Volume 1 — Pequenos Discípulos' : 'Kit Completo — Volume 1 + 2',
      activePrice
    );
  };

  const faqs = [
    {
      id: "1",
      question: "O material é físico ou digital?",
      answer: "O material é 100% digital em formato PDF de alta resolução. Você não paga frete nem precisa esperar pelos Correios: o acesso é liberado por e-mail para você baixar no computador ou celular e imprimir quando quiser."
    },
    {
      id: "2",
      question: "Como recebo o material após a compra?",
      answer: "Após a confirmação do pagamento pela plataforma segura, você recebe imediatamente um e-mail com o link de acesso aos arquivos em PDF, prontos para download e impressão."
    },
    {
      id: "3",
      question: "Preciso ter uma impressora em casa?",
      answer: "Não necessariamente. Você pode imprimir na sua impressora caseira ou salvar os PDFs em um pendrive/celular e imprimir em qualquer gráfica rápida ou papelaria do seu bairro, imprimindo apenas as folhas que desejar no momento."
    },
    {
      id: "4",
      question: "Posso utilizar as atividades em casa ou na igreja?",
      answer: "Sim! As atividades foram desenvolvidas tanto para momentos em família no lar (culto doméstico, fins de semana, férias) quanto para professores de Escola Bíblica Dominical (EBD) e cultos infantis da igreja."
    },
    {
      id: "5",
      question: "Para qual faixa etária o material é indicado?",
      answer: "O material é recomendado principalmente para crianças de 3 a 10 anos. Os menores aproveitam bastante os desenhos grandes para colorir e ligar pontos com os pais, enquanto os maiores resolvem labirintos, caça-palavras e memorizam versículos com independência."
    },
    {
      id: "6",
      question: "O que está incluído no Volume 1?",
      answer: "O Volume 1 contém 120 páginas em PDF com desenhos bíblicos para colorir, labirintos, caça-palavras, versículos para memorizar e atividades educativas cristãs prontas para imprimir em papel A4."
    },
    {
      id: "7",
      question: "O que recebo ao comprar o Kit Completo?",
      answer: "Ao adquirir o Kit Completo, você recebe os 2 volumes: o Volume 1 (120 páginas) e o Volume 2 'Pequenos Heróis da Bíblia' (464 páginas), totalizando 584 páginas em PDF com mais de 390 atividades, 50 histórias bíblicas com lição prática, diário de oração, gabarito completo e certificado infantil."
    },
    {
      id: "8",
      question: "Como posso entrar em contato se precisar de ajuda?",
      answer: "Nosso canal de suporte atende através do e-mail suporte.discipulos@gmail.com. Caso tenha qualquer dúvida sobre o download ou acesso aos arquivos, nossa equipe estará pronta para te auxiliar com carinho."
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-800 selection:bg-brand-blue-100 flex flex-col justify-between font-sans">
      
      {/* 1. BARRA SUPERIOR DISCRETA E INFORMATIVA */}
      <header className="bg-brand-blue-700 text-white text-center py-2.5 px-4 text-xs sm:text-sm font-medium tracking-wide shadow-xs" id="top-announcement-bar">
        <div className="max-w-6xl mx-auto flex items-center justify-center gap-2 flex-wrap">
          <span className="inline-block w-2 h-2 rounded-full bg-brand-yellow-400" />
          <span>PDF digital para imprimir em casa</span>
          <span className="text-brand-blue-300">•</span>
          <span>Acesso imediato após a confirmação da compra</span>
        </div>
      </header>

      {/* 2. PRIMEIRA DOBRA (HERO SECTION) — TOTALMENTE REDESENHADA CONFORME DIRETRIZES */}
      <section className="relative overflow-hidden pt-8 pb-14 sm:py-16 lg:py-20 bg-gradient-to-b from-[#F2F7FC] via-[#FAF8F5] to-[#FAF8F5]" id="hero-section">
        {/* Subtle, smooth Three.js background accent */}
        <ThreeBackground />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* LAYOUT DESKTOP: 2 COLUNAS | MOBILE: ORDEM SOLICITADA */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* COLUNA ESQUERDA (DESKTOP) / BLOCO TEXTUAL */}
            <div className="lg:col-span-7 flex flex-col text-center lg:text-left">
              
              {/* Texto superior oficial da marca */}
              <div className="flex items-center justify-center lg:justify-start gap-1.5 mb-3">
                <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-brand-blue-700 bg-brand-blue-100/70 px-3 py-1 rounded-md">
                  PEQUENOS DISCÍPULOS DA FÉ
                </span>
              </div>

              {/* Título Principal Exato Solicitado */}
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-stone-900 font-bold tracking-tight leading-[1.15] mb-4">
                Seu filho pode aprender a Palavra de Deus de um jeito divertido!
              </h1>

              {/* Subtítulo Exato Solicitado */}
              <p className="text-base sm:text-lg text-stone-600 leading-relaxed mb-6 max-w-2xl mx-auto lg:mx-0">
                Transforme momentos em família em oportunidades para ensinar valores cristãos com atividades bíblicas infantis prontas para imprimir.
              </p>

              {/* MOBILE ONLY: Mockup colocado na 3ª posição da ordem do celular */}
              <div className="block lg:hidden my-4 mb-6">
                <ProductMockup />
              </div>

              {/* Benefícios em lista limpa e escaneável */}
              <div className="bg-white/80 border border-stone-200/80 rounded-2xl p-5 mb-6 text-left shadow-xs max-w-xl mx-auto lg:mx-0">
                <p className="text-xs font-bold uppercase text-stone-400 tracking-wider mb-3">
                  O que você encontra no material:
                </p>
                <ul className="space-y-2.5">
                  <li className="flex items-start gap-2.5 text-sm sm:text-base text-stone-700 font-medium">
                    <span className="text-brand-blue-600 font-bold text-base flex-shrink-0 mt-0.5">✓</span>
                    <span>Atividades bíblicas para aprender brincando.</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-sm sm:text-base text-stone-700 font-medium">
                    <span className="text-brand-blue-600 font-bold text-base flex-shrink-0 mt-0.5">✓</span>
                    <span>Desenhos, jogos e desafios educativos.</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-sm sm:text-base text-stone-700 font-medium">
                    <span className="text-brand-blue-600 font-bold text-base flex-shrink-0 mt-0.5">✓</span>
                    <span>Uma opção para usar em casa ou na igreja.</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-sm sm:text-base text-stone-700 font-medium">
                    <span className="text-brand-blue-600 font-bold text-base flex-shrink-0 mt-0.5">✓</span>
                    <span>Material digital para imprimir conforme sua necessidade.</span>
                  </li>
                </ul>
              </div>

              {/* Texto de apoio exato solicitado */}
              <p className="text-xs sm:text-sm text-stone-600 italic font-medium mb-6 max-w-xl mx-auto lg:mx-0">
                “Uma maneira especial de aproximar as crianças das histórias e dos ensinamentos da Bíblia.”
              </p>

              {/* Indicação clara da oferta e Botão Principal */}
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <a
                  href="#secao-ofertas"
                  onClick={scrollToOffers}
                  className="w-full sm:w-auto text-center bg-brand-green-500 hover:bg-brand-green-600 text-white font-display text-lg font-bold py-4 px-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
                >
                  <span>QUERO CONHECER O KIT COMPLETO</span>
                  <ArrowRight className="w-5 h-5" />
                </a>

                <div className="text-xs text-stone-500 font-medium text-center sm:text-left">
                  <span>A partir de <strong>R$ 14,90</strong></span>
                  <span className="mx-1.5">•</span>
                  <span>Kit Completo por <strong>R$ 19,90</strong></span>
                </div>
              </div>

            </div>

            {/* COLUNA DIREITA (DESKTOP) / MOCKUP REAL DE ALTA QUALIDADE */}
            <div className="hidden lg:flex lg:col-span-5 justify-center items-center">
              <ProductMockup />
            </div>

          </div>

        </div>
      </section>

      {/* 3. DEMONSTRAÇÃO VISUAL DO PRODUTO — SEÇÃO 4 DO BRIEFING */}
      <section className="py-16 sm:py-20 bg-white border-t border-b border-stone-200/70" id="demonstracao-produto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="text-xs font-bold text-brand-blue-700 bg-brand-blue-50 uppercase tracking-widest px-3 py-1 rounded-md">
              Conteúdo por Dentro
            </span>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl text-stone-900 font-bold mt-3 mb-4 leading-tight">
              Veja o que seu filho vai descobrir em cada atividade
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Páginas desenvolvidas com carinho, prontas para imprimir em folha sulfite A4 comum. Cada atividade combina ilustrações acolhedoras, passagens bíblicas e desafios lúdicos para a idade certa.
            </p>
          </div>

          {/* Grid Editorial das Categorias Reais do Produto */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            
            {/* Bloco 1: Desenhos Bíblicos para Colorir */}
            <div className="bg-[#FAF8F5] rounded-2xl p-6 border border-stone-200 flex flex-col justify-between hover:border-brand-blue-300 transition-colors">
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-xl mb-4">
                  🎨
                </div>
                <h3 className="font-display text-lg font-bold text-stone-900 mb-2">
                  Desenhos bíblicos para colorir
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">
                  Ilustrações de passagens marcantes como a Arca de Noé, Jonas e o Grande Peixe, Davi e Golias, e Jesus abençoando as crianças.
                </p>
              </div>
              <div className="pt-3 border-t border-stone-200/60 flex items-center justify-between text-xs text-stone-500 font-medium">
                <span>Traços limpos para pintura</span>
                <span className="text-brand-blue-700 font-bold">Economia de tinta</span>
              </div>
            </div>

            {/* Bloco 2: Jogos e Desafios Bíblicos */}
            <div className="bg-[#FAF8F5] rounded-2xl p-6 border border-stone-200 flex flex-col justify-between hover:border-brand-blue-300 transition-colors">
              <div>
                <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-xl mb-4">
                  🧩
                </div>
                <h3 className="font-display text-lg font-bold text-stone-900 mb-2">
                  Jogos e desafios educativos
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">
                  Caça-palavras bíblicos, labirintos temáticos (como ajudar a ovelha a encontrar o pastor), cruzadinhas e ligue os pontos.
                </p>
              </div>
              <div className="pt-3 border-t border-stone-200/60 flex items-center justify-between text-xs text-stone-500 font-medium">
                <span>Raciocínio e coordenação</span>
                <span className="text-brand-blue-700 font-bold">Aprendizado lúdico</span>
              </div>
            </div>

            {/* Bloco 3: Versículos para Memorizar */}
            <div className="bg-[#FAF8F5] rounded-2xl p-6 border border-stone-200 flex flex-col justify-between hover:border-brand-blue-300 transition-colors">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xl mb-4">
                  📖
                </div>
                <h3 className="font-display text-lg font-bold text-stone-900 mb-2">
                  Versículos para memorizar
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">
                  Trechos de Provérbios, Salmos e Evangelhos com linhas pontilhadas de caligrafia infantil para fixar a Palavra de Deus.
                </p>
              </div>
              <div className="pt-3 border-t border-stone-200/60 flex items-center justify-between text-xs text-stone-500 font-medium">
                <span>Fixação das Escrituras</span>
                <span className="text-brand-blue-700 font-bold">Treino de escrita</span>
              </div>
            </div>

            {/* Bloco 4: Histórias Bíblicas com Lições */}
            <div className="bg-[#FAF8F5] rounded-2xl p-6 border border-stone-200 flex flex-col justify-between hover:border-brand-blue-300 transition-colors">
              <div>
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-xl mb-4">
                  📜
                </div>
                <h3 className="font-display text-lg font-bold text-stone-900 mb-2">
                  Histórias bíblicas com lições práticas
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">
                  Narrativas bíblicas adaptadas para a compreensão infantil, ensinando valores como amor, perdão, generosidade e obediência.
                </p>
              </div>
              <div className="pt-3 border-t border-stone-200/60 flex items-center justify-between text-xs text-stone-500 font-medium">
                <span>Valores cristãos eternos</span>
                <span className="text-brand-blue-700 font-bold">Linguagem acessível</span>
              </div>
            </div>

            {/* Bloco 5: Diário de Oração e Gratidão */}
            <div className="bg-[#FAF8F5] rounded-2xl p-6 border border-stone-200 flex flex-col justify-between hover:border-brand-blue-300 transition-colors">
              <div>
                <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-xl mb-4">
                  🙏
                </div>
                <h3 className="font-display text-lg font-bold text-stone-900 mb-2">
                  Diário de Oração e Gratidão
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">
                  Espaço guiado para a criança registrar seus pedidos a Deus, motivos de agradecimento e sentimentos do dia a dia com a família.
                </p>
              </div>
              <div className="pt-3 border-t border-stone-200/60 flex items-center justify-between text-xs text-stone-500 font-medium">
                <span>Cultivo da fé no lar</span>
                <span className="text-brand-blue-700 font-bold">Hábito de orar</span>
              </div>
            </div>

            {/* Bloco 6: Gabarito e Certificado de Conclusão */}
            <div className="bg-[#FAF8F5] rounded-2xl p-6 border border-stone-200 flex flex-col justify-between hover:border-brand-blue-300 transition-colors">
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-xl mb-4">
                  ⭐
                </div>
                <h3 className="font-display text-lg font-bold text-stone-900 mb-2">
                  Gabarito e Certificado de Conclusão
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">
                  Gabarito completo para os pais conferirem as respostas e lindo certificado para presentear e comemorar o empenho da criança.
                </p>
              </div>
              <div className="pt-3 border-t border-stone-200/60 flex items-center justify-between text-xs text-stone-500 font-medium">
                <span>Incentivo e conquista</span>
                <span className="text-brand-blue-700 font-bold">Folha especial</span>
              </div>
            </div>

          </div>

          {/* Banner de formato e impressão prática */}
          <div className="mt-10 bg-brand-blue-50/60 border border-brand-blue-100 rounded-2xl p-6 text-center max-w-3xl mx-auto">
            <h4 className="font-display text-base font-bold text-stone-900 mb-1">
              Praticidade total: imprima em qualquer impressora caseira
            </h4>
            <p className="text-xs sm:text-sm text-stone-600">
              Os arquivos são diagramados em alta resolução no formato padrão A4. Você pode imprimir folhas individuais sempre que precisar, sem compromisso de imprimir tudo de uma vez.
            </p>
          </div>

        </div>
      </section>

      {/* 4. COMO FUNCIONA — SEÇÃO 6 DO BRIEFING (3 ETAPAS CURTAS) */}
      <section className="py-16 sm:py-20 bg-[#FAF8F5]" id="como-funciona">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <span className="text-xs font-bold text-brand-blue-700 bg-brand-blue-100/60 uppercase tracking-widest px-3 py-1 rounded-md">
              Passo a Passo
            </span>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl text-stone-900 font-bold mt-3 mb-3">
              Como funciona o acesso
            </h2>
            <p className="text-stone-600 text-sm sm:text-base">
              Processo simples, rápido e seguro para você receber seu material em poucos minutos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 relative">
            
            {/* ETAPA 1 */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-stone-200 text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-brand-blue-50 border-2 border-brand-blue-500 text-brand-blue-700 font-display font-bold text-lg flex items-center justify-center mb-4">
                1
              </div>
              <h3 className="font-display text-base sm:text-lg font-bold text-stone-900 mb-2">
                ESCOLHA SEU KIT
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Selecione o volume individual ou o kit completo que deseja adquirir conforme a necessidade da sua família.
              </p>
            </div>

            {/* ETAPA 2 */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-stone-200 text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-brand-blue-50 border-2 border-brand-blue-500 text-brand-blue-700 font-display font-bold text-lg flex items-center justify-center mb-4">
                2
              </div>
              <h3 className="font-display text-base sm:text-lg font-bold text-stone-900 mb-2">
                RECEBA SEU MATERIAL
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Após a confirmação da compra, acesse o material em formato PDF conforme as instruções enviadas ao seu e-mail.
              </p>
            </div>

            {/* ETAPA 3 */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-stone-200 text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-brand-blue-50 border-2 border-brand-blue-500 text-brand-blue-700 font-display font-bold text-lg flex items-center justify-center mb-4">
                3
              </div>
              <h3 className="font-display text-base sm:text-lg font-bold text-stone-900 mb-2">
                IMPRIMA E APROVEITE
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Prepare as atividades, separe os lápis de cor e compartilhe momentos de aprendizado bíblico com as crianças.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 5. BENEFÍCIOS PARA A FAMÍLIA — SEÇÃO 7 DO BRIEFING */}
      <section className="py-16 sm:py-20 bg-white border-t border-b border-stone-200/70" id="beneficios-familia">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <span className="text-xs font-bold text-amber-700 bg-amber-100/70 uppercase tracking-widest px-3 py-1 rounded-md">
              Propósito e Fé
            </span>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl text-stone-900 font-bold mt-3 mb-3 leading-tight">
              Pequenos momentos podem ensinar grandes valores
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Mais do que simples folhas de papel: uma oportunidade acolhedora para cultivar o amor a Deus no dia a dia.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div className="bg-[#FAF8F5] p-6 rounded-2xl border border-stone-200">
              <span className="text-2xl mb-3 block">📖</span>
              <h4 className="font-display text-base font-bold text-stone-900 mb-2">
                Histórias e ensinamentos bíblicos
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Apresenta heróis da fé e princípios da Bíblia de modo simples, visual e de fácil assimilação para as crianças.
              </p>
            </div>

            <div className="bg-[#FAF8F5] p-6 rounded-2xl border border-stone-200">
              <span className="text-2xl mb-3 block">✏️</span>
              <h4 className="font-display text-base font-bold text-stone-900 mb-2">
                Participação ativa e longe das telas
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Estimula a imaginação, o raciocínio e a coordenação motora com lápis de cor, longe do excesso de celulares e vídeos.
              </p>
            </div>

            <div className="bg-[#FAF8F5] p-6 rounded-2xl border border-stone-200">
              <span className="text-2xl mb-3 block">💬</span>
              <h4 className="font-display text-base font-bold text-stone-900 mb-2">
                Oportunidades de conversa no lar
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Cria momentos descontraídos entre pais e filhos para conversar sobre Deus, tirar dúvidas e orar juntos.
              </p>
            </div>

            <div className="bg-[#FAF8F5] p-6 rounded-2xl border border-stone-200">
              <span className="text-2xl mb-3 block">⛪</span>
              <h4 className="font-display text-base font-bold text-stone-900 mb-2">
                Para casa, escola bíblica ou igreja
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Excelente recurso tanto para o culto doméstico familiar quanto para professores e líderes de ministério infantil (EBD).
              </p>
            </div>

            <div className="bg-[#FAF8F5] p-6 rounded-2xl border border-stone-200">
              <span className="text-2xl mb-3 block">🖨️</span>
              <h4 className="font-display text-base font-bold text-stone-900 mb-2">
                Praticidade e economia na preparação
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Material pronto para imprimir em folha A4 comum. Sem complicação, sem desperdício de tempo buscando atividades na internet.
              </p>
            </div>

            <div className="bg-[#FAF8F5] p-6 rounded-2xl border border-stone-200">
              <span className="text-2xl mb-3 block">🌱</span>
              <h4 className="font-display text-base font-bold text-stone-900 mb-2">
                Sementes de fé para a vida inteira
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Versículos e valores bíblicos guardados no coração da criança desde cedo, servindo de base para o seu crescimento.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 6. PÚBLICO-ALVO / QUEM APROVEITA O MATERIAL */}
      <section className="py-16 sm:py-20 bg-[#FAF8F5]" id="para-quem-e">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-brand-blue-700 bg-brand-blue-100/60 uppercase tracking-widest px-3 py-1 rounded-md">
              Público-Alvo
            </span>
            <h2 className="font-display text-2xl sm:text-3xl text-stone-900 font-bold mt-3 mb-2">
              Para quem este material foi pensado?
            </h2>
            <p className="text-stone-600 text-sm">
              Um recurso versátil e acolhedor para quem ama ensinar a Bíblia às crianças.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            
            <div className="bg-white p-5 rounded-2xl border border-stone-200 text-center flex flex-col items-center">
              <span className="text-3xl mb-2">👨‍👩‍👧</span>
              <h4 className="font-display text-base font-bold text-stone-900 mb-1">Mães e pais cristãos</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Que desejam ensinar a fé no ambiente acolhedor do lar com atividades divertidas.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-stone-200 text-center flex flex-col items-center">
              <span className="text-3xl mb-2">🏫</span>
              <h4 className="font-display text-base font-bold text-stone-900 mb-1">Professores de EBD</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Que precisam de folhas didáticas limpas e prontas para enriquecer as aulas dominicais.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-stone-200 text-center flex flex-col items-center">
              <span className="text-3xl mb-2">⛪</span>
              <h4 className="font-display text-base font-bold text-stone-900 mb-1">Ministério Infantil</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Igrejas que querem materiais educativos bíblicos organizados para os momentos de culto infantil.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-stone-200 text-center flex flex-col items-center">
              <span className="text-3xl mb-2">👶</span>
              <h4 className="font-display text-base font-bold text-stone-900 mb-1">Crianças de 3 a 10 anos</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Desde os pequenos que adoram pintar até os maiores que resolvem desafios e memorizam versículos.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 7. SEÇÃO DE OFERTAS — SEÇÃO 5 DO BRIEFING (MELHORAR A CONVERSÃO COM CLAREZA) */}
      <section className="py-16 sm:py-24 bg-white border-t border-b border-stone-200/80" id="secao-ofertas-ancora">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          
          <div className="max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-brand-green-700 bg-brand-green-50 uppercase tracking-widest px-3 py-1 rounded-md">
              Acesso Digital Imediato
            </span>
            <h2 className="font-display text-3xl sm:text-4xl text-stone-900 font-bold mt-3 mb-3">
              Escolha seu material bíblico infantil
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Adquira o Volume 1 individualmente ou leve o Kit Completo com o Volume 2 por apenas <strong>R$ 5,00 a mais</strong> e tenha 584 páginas de atividades bíblicas.
            </p>
          </div>

          {/* Componente Modular de Ofertas */}
          <OfferSelector onSelectOption={handleOfferSelect} />

        </div>
      </section>

      {/* 8. INFORMAÇÕES DE CONFIANÇA E COMPRA PROTEGIDA — SEÇÃO 8 DO BRIEFING */}
      <section className="py-12 bg-[#FAF8F5] border-b border-stone-200/70" id="garantia-confianca">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            <div className="md:col-span-4 flex flex-col items-center text-center border-b md:border-b-0 md:border-r border-stone-150 pb-6 md:pb-0 md:pr-6">
              <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-2xl font-bold mb-2">
                🛡️
              </div>
              <h3 className="font-display text-base font-bold text-stone-900">Compra Segura</h3>
              <p className="text-xs text-stone-500 mt-0.5">Garantia legal de 7 dias</p>
            </div>

            <div className="md:col-span-8 text-center md:text-left">
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                <strong>Pagamento seguro e protegido por intermediadora oficial.</strong> Após a confirmação, o link de acesso aos arquivos em PDF é enviado para o seu e-mail para download e impressão em casa. Caso tenha dúvidas ou precise de assistência, nosso suporte está à disposição.
              </p>
              
              <div className="flex flex-wrap gap-4 mt-4 justify-center md:justify-start text-xs font-semibold text-stone-600">
                <span className="flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-brand-blue-600" />
                  <span>Criptografia de ponta a ponta</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-brand-blue-600" />
                  <span>Envio automático por e-mail</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Mail className="w-4 h-4 text-brand-blue-600" />
                  <span>suporte.discipulos@gmail.com</span>
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 9. PERGUNTAS FREQUENTES (FAQ) — SEÇÃO 9 DO BRIEFING */}
      <section className="py-16 sm:py-20 bg-white" id="perguntas-frequentes">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          
          <div className="text-center mb-10 sm:mb-12">
            <span className="text-xs font-bold text-brand-blue-700 bg-brand-blue-50 px-3 py-1 rounded-md uppercase tracking-widest">
              Dúvidas Comuns
            </span>
            <h2 className="font-display text-2xl sm:text-3xl text-stone-900 font-bold mt-3 mb-2">
              Perguntas Frequentes
            </h2>
            <p className="text-stone-600 text-sm">
              Tudo o que você precisa saber sobre o material e a forma de entrega.
            </p>
          </div>

          <div className="space-y-3" id="faq-accordions">
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

      {/* 10. CTA FINAL — SEÇÃO 10 DO BRIEFING */}
      <section className="py-16 sm:py-20 bg-brand-blue-700 text-white relative overflow-hidden" id="cta-final">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          
          <span className="text-xs font-bold text-brand-yellow-300 uppercase tracking-widest mb-3 inline-block">
            Pequenos Discípulos da Fé
          </span>

          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl text-white font-bold mb-4 leading-tight">
            Leve mais aprendizado bíblico para os momentos em família
          </h2>

          <p className="text-brand-blue-100 text-sm sm:text-base mb-8 max-w-2xl mx-auto leading-relaxed">
            Conheça as atividades do Pequenos Discípulos da Fé e escolha o material ideal para sua família.
          </p>

          <a
            href="#secao-ofertas"
            onClick={scrollToOffers}
            className="inline-flex items-center gap-2 bg-brand-yellow-400 hover:bg-brand-yellow-500 text-stone-900 font-display text-base sm:text-lg font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>ESCOLHER MEU KIT</span>
            <ArrowRight className="w-5 h-5" />
          </a>

          <p className="mt-4 text-xs text-brand-blue-200 font-medium">
            Material em PDF digital pronto para imprimir em casa
          </p>
        </div>
      </section>

      {/* 11. RODAPÉ INSTITUCIONAL TRANSPARENTE */}
      <footer className="bg-stone-950 text-stone-400 py-10 px-4 sm:px-6 border-t border-stone-900 text-center text-xs" id="footer-section">
        <div className="max-w-5xl mx-auto">
          
          <div className="mb-6">
            <h4 className="font-display text-base font-bold text-white tracking-tight">
              Pequenos Discípulos da Fé
            </h4>
            <p className="text-xs text-stone-500 mt-1 max-w-md mx-auto">
              Material digital de apoio educativo cristão infantil para uso pessoal, familiar e ministerial.
            </p>
          </div>

          {/* Links para modais institucionais */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 font-medium mb-6">
            <button 
              onClick={() => setModalType('privacy')} 
              className="hover:text-white transition-colors cursor-pointer"
            >
              Política de Privacidade
            </button>
            <span className="text-stone-800">|</span>
            <button 
              onClick={() => setModalType('terms')} 
              className="hover:text-white transition-colors cursor-pointer"
            >
              Termos de Uso
            </button>
            <span className="text-stone-800">|</span>
            <button 
              onClick={() => setModalType('support')} 
              className="hover:text-white transition-colors cursor-pointer"
            >
              Contato de Suporte
            </button>
          </div>

          <div className="text-[11px] text-stone-600 border-t border-stone-900 pt-5 space-y-1">
            <p>© {new Date().getFullYear()} Pequenos Discípulos da Fé. Todos os direitos reservados.</p>
            <p>Este material destina-se ao apoio educacional e devocional infantil e não substitui a Bíblia Sagrada ou a orientação pastoral local.</p>
          </div>

        </div>
      </footer>

      {/* 12. BOTÃO FIXO NO RODAPÉ DO CELULAR (MOBILE DOCK) — NÃO COBRE TEXTOS IMPORTANTES */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 p-3 bg-white/95 backdrop-blur-md border-t border-stone-200 z-40 flex items-center justify-between shadow-lg" id="mobile-floating-dock">
        <div className="flex flex-col text-left pl-1">
          <span className="text-[9px] uppercase font-bold text-stone-400 leading-none">Opção</span>
          <span className="font-display text-base font-bold text-stone-900">
            R$ {activePrice.toFixed(2).replace('.', ',')}
          </span>
          <span className="text-[9px] text-stone-500 font-medium">taxa única</span>
        </div>
        
        <a
          href={activeCheckoutUrl}
          onClick={handleMobileCtaClick}
          className="bg-brand-green-500 hover:bg-brand-green-600 text-white font-display text-xs font-bold py-3 px-5 rounded-xl flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
        >
          <span>QUERO O KIT</span>
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>

      {/* MODAIS INSTITUCIONAIS REAIS */}
      <AnimatePresence>
        {modalType && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="bg-white rounded-2xl p-6 sm:p-8 max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-2xl relative text-left"
            >
              <button 
                onClick={() => setModalType(null)}
                className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 p-1 bg-stone-100 rounded-full cursor-pointer"
                aria-label="Fechar modal"
              >
                <X className="w-4 h-4" />
              </button>

              {modalType === 'privacy' && (
                <div>
                  <h3 className="font-display text-lg font-bold text-stone-900 mb-3">Política de Privacidade</h3>
                  <div className="text-xs sm:text-sm text-stone-600 space-y-3 leading-relaxed">
                    <p>Respeitamos a privacidade e a segurança das famílias e educadores que adquirem nossos materiais educativos digitais.</p>
                    <p><strong>1. Dados coletados:</strong> Ao realizar a compra na plataforma de pagamento, os dados cadastrais (como nome e e-mail) são utilizados exclusivamente para o envio automático dos links de download e identificação do suporte ao cliente.</p>
                    <p><strong>2. Proteção de dados:</strong> Seus dados não são vendidos, alugados ou compartilhados com terceiros para fins publicitários não autorizados.</p>
                    <p><strong>3. Rastreamento técnico:</strong> Utilizamos cookies padrão para mensuração de desempenho do site e validação de tráfego de campanhas de anúncios.</p>
                  </div>
                </div>
              )}

              {modalType === 'terms' && (
                <div>
                  <h3 className="font-display text-lg font-bold text-stone-900 mb-3">Termos de Uso</h3>
                  <div className="text-xs sm:text-sm text-stone-600 space-y-3 leading-relaxed">
                    <p>Ao adquirir o material digital Pequenos Discípulos da Fé, você concorda com os seguintes termos:</p>
                    <p><strong>1. Uso Pessoal e Familiar:</strong> Você tem permissão para imprimir as atividades quantas vezes desejar para as crianças do seu lar ou de sua família imediata.</p>
                    <p><strong>2. Uso Ministerial / EBD:</strong> Professores de Escola Bíblica Dominical (EBD) e igrejas locais têm autorização para imprimir cópias para suas turmas de estudo sem fins comerciais.</p>
                    <p><strong>3. Propriedade Intelectual:</strong> É vedada a revenda, sublicenciamento, redistribuição comercial ou compartilhamento público dos arquivos digitais em redes sociais ou canais de terceiros.</p>
                  </div>
                </div>
              )}

              {modalType === 'support' && (
                <div>
                  <h3 className="font-display text-lg font-bold text-stone-900 mb-3">Contato de Suporte</h3>
                  <div className="text-xs sm:text-sm text-stone-600 space-y-3 leading-relaxed">
                    <p>Precisa de assistência com o acesso ou download dos seus arquivos em PDF? Estamos prontos para te ajudar!</p>
                    <p>Se você concluiu sua compra e não localizou o e-mail com os arquivos na sua caixa de entrada, confira primeiro sua caixa de spam ou lixo eletrônico.</p>
                    <p>Caso precise falar com nossa equipe, envie uma mensagem para o nosso e-mail oficial com o nome e e-mail utilizados na compra:</p>
                    <div className="bg-brand-blue-50 p-3 rounded-xl border border-brand-blue-100 font-mono text-xs text-brand-blue-900 break-all select-all flex items-center gap-2 mt-3">
                      <Mail className="w-4 h-4 flex-shrink-0 text-brand-blue-600" />
                      <span>suporte.discipulos@gmail.com</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-6 pt-4 border-t border-stone-150 text-right">
                <button 
                  onClick={() => setModalType(null)}
                  className="bg-stone-800 hover:bg-stone-900 text-white font-medium px-4 py-2 rounded-xl text-xs cursor-pointer"
                >
                  Fechar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
