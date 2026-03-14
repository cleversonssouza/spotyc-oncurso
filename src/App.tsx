/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause,
  CheckCircle2, 
  Music, 
  Brain, 
  Zap, 
  Clock, 
  ShieldCheck, 
  ChevronDown, 
  Star,
  Users,
  Award,
  ArrowRight,
  Volume2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const CHECKOUT_URL = "https://pay.lowify.com.br/checkout?product_id=i0cg85";

const AudioSample = ({ title, url }: { title: string, url: string }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const audioRef = React.useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        setError(null);
        audioRef.current.play().catch((e) => {
          console.error("Playback error:", e);
          setError("Erro ao carregar áudio. Verifique a conexão ou permissões.");
          setIsPlaying(false);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="bg-zinc-900/80 border border-zinc-800 p-6 rounded-2xl flex items-center gap-4 hover:border-emerald-500/30 transition-all group relative">
      <button 
        onClick={togglePlay}
        className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform flex-shrink-0"
      >
        {isPlaying ? <Pause className="w-5 h-5 text-black fill-current" /> : <Play className="w-5 h-5 text-black fill-current ml-1" />}
      </button>
      <div className="flex-grow">
        <h4 className="text-white font-bold mb-1">{title}</h4>
        {error ? (
          <div className="text-red-500 text-xs mt-1">{error}</div>
        ) : (
          <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: isPlaying ? '100%' : '0%' }}
              transition={{ duration: 30, ease: "linear" }}
              className="h-full bg-emerald-500"
            />
          </div>
        )}
      </div>
      <Volume2 className="w-5 h-5 text-zinc-500" />
      <audio 
        ref={audioRef} 
        onEnded={() => setIsPlaying(false)} 
        onError={() => {
          setError("O áudio não pôde ser carregado. O Google Drive bloqueou o acesso direto.");
          setIsPlaying(false);
        }}
        preload="metadata"
      >
        <source src={url} type="audio/mpeg" />
        Seu navegador não suporta o elemento de áudio.
      </audio>
    </div>
  );
};

const FeatureCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-2xl hover:border-emerald-500/50 transition-colors group"
  >
    <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
      <Icon className="w-6 h-6 text-emerald-500" />
    </div>
    <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
    <p className="text-zinc-400 leading-relaxed">{description}</p>
  </motion.div>
);

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-zinc-800">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left hover:text-emerald-500 transition-colors"
      >
        <span className="text-lg font-medium text-white">{question}</span>
        <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-zinc-400 leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function App() {
  const [timeLeft, setTimeLeft] = useState({ minutes: 15, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.minutes === 0 && prev.seconds === 0) {
          clearInterval(timer);
          return prev;
        }
        if (prev.seconds === 0) {
          return { minutes: prev.minutes - 1, seconds: 59 };
        }
        return { ...prev, seconds: prev.seconds - 1 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 font-sans selection:bg-emerald-500/30">
      {/* Top Bar */}
      <div className="bg-emerald-600 text-white py-2 text-center text-sm font-bold tracking-wide uppercase">
        Oferta Especial por Tempo Limitado
      </div>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-4 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-full pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-[10%] right-[-10%] w-[40%] h-[40%] bg-emerald-500/10 blur-[120px] rounded-full" />
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 border border-zinc-800 text-emerald-500 text-sm font-medium mb-8"
          >
            <Zap className="w-4 h-4 fill-current" />
            <span>A Revolução nos Estudos Chegou</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black tracking-tight text-white mb-8 leading-[1.1]"
          >
            Memorize 10x Mais Rápido com <span className="text-emerald-500">Spotyconcursos</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-zinc-400 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Transforme leis complexas e artigos chatos em músicas viciantes. 
            Aprenda enquanto dirige, treina ou relaxa.
          </motion.p>

          {/* Video Section */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="relative aspect-[9/16] w-full max-w-[350px] mx-auto rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-2xl shadow-emerald-500/5 mb-12 group"
          >
            <iframe 
              width="100%" 
              height="100%" 
              src="https://www.youtube.com/embed/tUvQtz69Vv4?autoplay=0&rel=0" 
              title="Spotyconcursos Video" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <a 
              href={CHECKOUT_URL}
              className="inline-flex items-center gap-3 px-10 py-6 bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xl rounded-2xl transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(16,185,129,0.3)] active:scale-95"
            >
              QUERO MEMORIZAR AGORA
              <ArrowRight className="w-6 h-6" />
            </a>
            <div className="mt-6 flex items-center justify-center gap-6 text-zinc-500 text-sm">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                <span>Compra 100% Segura</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Acesso Imediato</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-zinc-900/30 border-y border-zinc-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Músicas Criadas", value: "200+" },
              { label: "Alunos Ativos", value: "15k+" },
              { label: "Taxa de Retenção", value: "94%" },
              { label: "Matérias Cobertas", value: "12+" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl font-black text-white mb-2">{stat.value}</div>
                <div className="text-zinc-500 text-sm uppercase tracking-widest font-bold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Audio Samples Section */}
      <section className="py-24 px-4 bg-zinc-900/10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Ouça nossas <span className="text-emerald-500">Músicas</span></h2>
            <p className="text-zinc-400">Exemplos reais de como transformamos a lei em ritmo.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <AudioSample 
              title="Amostra 1 - Memorização Ativa" 
              url="https://files.catbox.moe/3w53um.mp3" 
            />
            <AudioSample 
              title="Amostra 2 - Técnica Spotyconcursos" 
              url="https://files.catbox.moe/dvfl3k.mp3" 
            />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Por que estudar com <span className="text-emerald-500">Música?</span></h2>
            <p className="text-zinc-400 text-xl max-w-2xl mx-auto leading-relaxed">
              A neurociência explica: o cérebro processa música em áreas ligadas à memória de longo prazo.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={Brain}
              title="Memorização Passiva"
              description="Aprenda sem esforço enquanto faz outras atividades. O ritmo e a rima fixam o conteúdo no seu subconsciente."
            />
            <FeatureCard 
              icon={Clock}
              title="Ganhe Tempo"
              description="Transforme horas de trânsito ou academia em sessões de estudo produtivas. Cada minuto conta para sua aprovação."
            />
            <FeatureCard 
              icon={Music}
              title="Estudo Sem Tédio"
              description="Diga adeus às leituras cansativas. Nossas músicas são produzidas com IA de ponta para serem viciantes e educativas."
            />
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-32 px-4 bg-zinc-900/20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-8 leading-tight">
              O que você vai encontrar no <span className="text-emerald-500">Spotyconcursos</span>
            </h2>
            <div className="space-y-6">
              {[
                "Direito Constitucional em Melodias",
                "Direito Administrativo Cantado",
                "Português e Redação com Ritmo",
                "Raciocínio Lógico em Versos",
                "Atualizações Constantes via IA",
                "Acesso Vitalício à Plataforma"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  </div>
                  <span className="text-lg text-zinc-300 font-medium">{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-12">
              <a 
                href={CHECKOUT_URL}
                className="inline-flex items-center gap-2 text-emerald-500 font-bold text-lg hover:underline underline-offset-8"
              >
                Ver lista completa de matérias
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-emerald-500/20 blur-[100px] rounded-full" />
            <img 
              src="https://picsum.photos/seed/app/800/1000" 
              alt="App Interface" 
              className="relative z-10 rounded-3xl border border-zinc-800 shadow-2xl"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 mb-20">
            <div className="max-w-xl">
              <h2 className="text-4xl font-black text-white mb-6">O que dizem os <span className="text-emerald-500">Futuros Concursados</span></h2>
              <div className="flex items-center gap-2 mb-4">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />)}
                <span className="text-white font-bold ml-2">4.9/5 estrelas</span>
              </div>
            </div>
            <div className="flex -space-x-4">
              {[1,2,3,4,5].map(i => (
                <img 
                  key={i}
                  src={`https://i.pravatar.cc/150?u=${i}`}
                  className="w-16 h-16 rounded-full border-4 border-[#050505] object-cover"
                  alt="User"
                  referrerPolicy="no-referrer"
                />
              ))}
              <div className="w-16 h-16 rounded-full border-4 border-[#050505] bg-zinc-800 flex items-center justify-center text-xs font-bold text-zinc-400">
                +15k
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Ricardo Silva",
                role: "Estudante para PF",
                text: "Eu não conseguia decorar os artigos da CF. Com as músicas do Spotfabio, eu canto a lei inteira no banho. Acertei 90% de constitucional na última prova!"
              },
              {
                name: "Mariana Costa",
                role: "Aprovada no TJ",
                text: "O melhor investimento que fiz. Estudava no ônibus indo pro trabalho. A música fixa o conteúdo de um jeito que a leitura nunca conseguiu."
              },
              {
                name: "Lucas Oliveira",
                role: "Concurseiro de Elite",
                text: "A qualidade das músicas é impressionante. Não parece 'musiquinha de estudo', são produções reais que dão vontade de ouvir."
              }
            ].map((testimonial, i) => (
              <div key={i} className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-2xl">
                <p className="text-zinc-300 italic mb-6 leading-relaxed">"{testimonial.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center font-bold text-emerald-500">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <div className="text-white font-bold">{testimonial.name}</div>
                    <div className="text-zinc-500 text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-32 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-emerald-500/5 pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-block px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-500 text-sm font-bold mb-8 uppercase tracking-widest">
            Acesso Vitalício
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-white mb-8">Comece sua <span className="text-emerald-500">Aprovação</span> Hoje</h2>
          
          <div className="bg-zinc-900 border border-zinc-800 rounded-[2.5rem] p-8 md:p-16 shadow-2xl relative">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white text-black px-6 py-2 rounded-full font-black text-sm uppercase tracking-tighter">
              Oferta Expira em {timeLeft.minutes}:{timeLeft.seconds < 10 ? `0${timeLeft.seconds}` : timeLeft.seconds}
            </div>

            <div className="mb-12">
              <div className="text-zinc-500 line-through text-2xl mb-2">De R$ 97,00</div>
              <div className="flex items-center justify-center gap-2">
                <span className="text-3xl font-bold text-zinc-400">Por apenas</span>
                <span className="text-7xl md:text-8xl font-black text-white">R$ 27,99</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-12 text-left">
              {[
                "200+ Músicas Criadas por IA",
                "Todas as Matérias Base",
                "Acesso Vitalício",
                "Bônus: Guia de Memorização",
                "Suporte Prioritário",
                "Garantia de 7 Dias"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  <span className="text-zinc-300 font-medium">{item}</span>
                </div>
              ))}
            </div>

            <a 
              href={CHECKOUT_URL}
              className="block w-full py-8 bg-emerald-500 hover:bg-emerald-400 text-black font-black text-2xl rounded-2xl transition-all hover:scale-[1.02] hover:shadow-[0_0_50px_rgba(16,185,129,0.4)] active:scale-95 mb-8"
            >
              QUERO MEU ACESSO AGORA
            </a>

            <div className="flex items-center justify-center gap-8">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/1200px-PayPal.svg.png" alt="PayPal" className="h-6 grayscale opacity-50" referrerPolicy="no-referrer" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" alt="Visa" className="h-4 grayscale opacity-50" referrerPolicy="no-referrer" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" alt="Mastercard" className="h-8 grayscale opacity-50" referrerPolicy="no-referrer" />
            </div>
          </div>

          <div className="mt-16 flex flex-col md:flex-row items-center justify-center gap-12">
            <div className="flex items-center gap-6 text-left max-w-xs">
              <ShieldCheck className="w-16 h-16 text-emerald-500 flex-shrink-0" />
              <div>
                <h4 className="text-white font-bold">Garantia Total</h4>
                <p className="text-zinc-500 text-sm">7 dias para testar. Se não gostar, devolvemos seu dinheiro.</p>
              </div>
            </div>
            <div className="flex items-center gap-6 text-left max-w-xs">
              <Award className="w-16 h-16 text-emerald-500 flex-shrink-0" />
              <div>
                <h4 className="text-white font-bold">Qualidade Premium</h4>
                <p className="text-zinc-500 text-sm">Músicas produzidas com as melhores IAs do mercado.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 px-4 bg-zinc-900/10">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-black text-white mb-12 text-center">Dúvidas <span className="text-emerald-500">Frequentes</span></h2>
          <div className="space-y-2">
            <FAQItem 
              question="Como recebo o acesso?"
              answer="Imediatamente após a confirmação do pagamento, você receberá um e-mail com seus dados de acesso à nossa plataforma exclusiva."
            />
            <FAQItem 
              question="As músicas servem para qualquer concurso?"
              answer="Sim! Cobrimos as matérias base que caem em 95% dos concursos públicos no Brasil (Constitucional, Administrativo, Português, etc)."
            />
            <FAQItem 
              question="Posso ouvir offline?"
              answer="Sim, nossa plataforma permite que você baixe as músicas para ouvir onde e quando quiser, sem precisar de internet."
            />
            <FAQItem 
              question="O acesso é vitalício mesmo?"
              answer="Sim! Você paga uma única vez e tem acesso para sempre, incluindo todas as futuras atualizações e novas músicas."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-4 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-8">
            <Music className="w-8 h-8 text-emerald-500" />
            <span className="text-2xl font-black text-white tracking-tighter">Spotyconcursos</span>
          </div>
          <p className="text-zinc-500 text-sm mb-8 max-w-md mx-auto">
            Transformando o estudo para concursos em uma experiência memorável e eficiente através da música e inteligência artificial.
          </p>
          <div className="flex justify-center gap-8 text-zinc-400 text-sm mb-12">
            <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
            <a href="#" className="hover:text-white transition-colors">Privacidade</a>
            <a href="#" className="hover:text-white transition-colors">Contato</a>
          </div>
          <div className="text-zinc-600 text-xs">
            © 2026 Spotyconcursos. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}
