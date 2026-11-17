import React, { useState } from 'react';
import { 
  ShieldCheck, 
  HelpCircle, 
  PhoneCall, 
  ArrowRight, 
  Building2, 
  Lock, 
  FileCheck2, 
  MapPin, 
  Globe2, 
  Sparkles,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

interface HeroLoginProps {
  onLoginSuccess: (name: string) => void;
  onOpenHelp: () => void;
  onOpenContact: () => void;
}

export const HeroLogin: React.FC<HeroLoginProps> = ({
  onLoginSuccess,
  onOpenHelp,
  onOpenContact
}) => {
  const [showGovModal, setShowGovModal] = useState(false);
  const [cpfInput, setCpfInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPersona, setSelectedPersona] = useState('Larissa Ferreira');

  const handleCpfSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowGovModal(false);
      onLoginSuccess(selectedPersona);
    }, 700);
  };

  const handleQuickLogin = (name: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess(name);
    }, 400);
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-between overflow-hidden">
      {/* Background Hero Banner with Container Port */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/brapex_port_hero_1794492624789.jpg"
          alt="Porto e Terminais de Contêineres Brapex"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-105 transform motion-safe:transition-transform duration-1000 ease-out"
        />
        {/* Measured Scrim & Gradients for High Contrast and Visual Identity */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#14261E] via-[#1A3026]/85 to-[#0E1D17]/75" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(46,90,68,0.35),transparent_60%)]" />
      </div>

      {/* Main Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 flex-1 flex flex-col items-center justify-center">
        
        {/* Institutional Kicker & Badges */}
        <div className="text-center max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-xs text-[#E3ECE7] mb-4">
            <span className="font-semibold text-emerald-300">HUB REGIONAL</span>
            <span>·</span>
            <span>Itapetininga & Sudoeste Paulista</span>
            <span>·</span>
            <span className="text-amber-300 font-medium">Peru & Pacífico</span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-5xl text-white font-bold tracking-tight leading-tight [text-wrap:balance]">
            BRAPEX: CONECTANDO O SUDOESTE PAULISTA AO FUTURO
          </h1>
          
          <p className="mt-4 text-base sm:text-lg text-[#C7D7CD] max-w-2xl mx-auto font-normal leading-relaxed">
            Plataforma unificada de comércio exterior, inteligência tributária e logística multimodal integrada entre o interior paulista e o mercado andino.
          </p>
        </div>

        {/* Central Card: Portal de Operações */}
        <div className="w-full max-w-md bg-[#F9F8F6] text-[#1A3026] rounded-2xl shadow-2xl border border-[#E5E1D8] p-6 sm:p-8 backdrop-blur-sm">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#1A3026] text-white shadow-md mb-3">
              <Building2 className="w-6 h-6 text-emerald-400" />
            </div>
            
            <h2 className="font-display text-2xl font-bold text-[#1A3026]">
              Portal de Operações
            </h2>
            
            <p className="mt-2 text-sm text-[#4E6257] leading-snug">
              "Bem-vindo à sua rota de confiança. Do pequeno ao grande empreendedor."
            </p>
          </div>

          {/* Key Actions */}
          <div className="space-y-4">
            {/* Primary Gov.br Button */}
            <button
              onClick={() => setShowGovModal(true)}
              className="w-full group relative flex items-center justify-center gap-3 py-3.5 px-5 bg-[#1351B4] hover:bg-[#0f449a] text-white font-semibold text-sm rounded-xl shadow-lg transition-all transform active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-[#1351B4] focus:ring-offset-2"
            >
              {/* Gov.br SVG Emblem Badge */}
              <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-[#1351B4] font-black text-xs">
                G
              </div>
              <span>Entrar com o Gov.br</span>
              <ArrowRight className="w-4 h-4 ml-auto group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Quick Demo Access Bar */}
            <div className="pt-2 border-t border-[#E8E6E1]">
              <div className="flex items-center justify-between text-xs text-[#5C7065] mb-2">
                <span>Acesso Direto Simulado (Ambiente Homologado):</span>
              </div>
              <button
                onClick={() => handleQuickLogin('Larissa Ferreira')}
                disabled={isLoading}
                className="w-full flex items-center justify-between p-2.5 bg-[#EEEDE9] hover:bg-[#E3E1DA] rounded-lg text-xs font-medium text-[#1A3026] transition-colors"
              >
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-[#1A3026] text-white flex items-center justify-center text-[10px] font-bold">
                    L
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-[#1A3026]">Larissa Ferreira</div>
                    <div className="text-[10px] text-[#697E72]">Operadora Aduaneira OEA (Itapetininga)</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#7A8E82]" />
              </button>
            </div>

            {/* Secondary Buttons: Ajuda & Contato */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={onOpenHelp}
                className="flex items-center justify-center gap-2 py-2.5 px-3 bg-white border border-[#DCD9D1] hover:bg-[#F2F0EB] text-[#284234] text-xs font-medium rounded-lg transition-colors shadow-2xs"
              >
                <HelpCircle className="w-4 h-4 text-[#2E5A44]" />
                <span>Ajuda & Suporte</span>
              </button>

              <button
                type="button"
                onClick={onOpenContact}
                className="flex items-center justify-center gap-2 py-2.5 px-3 bg-white border border-[#DCD9D1] hover:bg-[#F2F0EB] text-[#284234] text-xs font-medium rounded-lg transition-colors shadow-2xs"
              >
                <PhoneCall className="w-4 h-4 text-[#2E5A44]" />
                <span>Contato Regional</span>
              </button>
            </div>
          </div>

          {/* Security & Regulatory footer */}
          <div className="mt-6 pt-4 border-t border-[#E8E6E1] flex items-center justify-center gap-3 text-[11px] text-[#697E72]">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Certificação OEA · Siscomex · Protocolo Criptografado SSL</span>
          </div>
        </div>

        {/* Regional Trade Trust Strip */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl w-full text-center text-white">
          <div className="bg-[#14261E]/70 backdrop-blur-md border border-white/10 rounded-xl p-3.5">
            <div className="font-mono-num text-xl sm:text-2xl font-bold text-amber-300">R$ 5.4 Bi</div>
            <div className="text-xs text-[#B2C6BA] mt-0.5">Comércio Brasil-Peru</div>
          </div>
          <div className="bg-[#14261E]/70 backdrop-blur-md border border-white/10 rounded-xl p-3.5">
            <div className="font-mono-num text-xl sm:text-2xl font-bold text-emerald-300">0% I.I.</div>
            <div className="text-xs text-[#B2C6BA] mt-0.5">Acordo Tarifário ACE 58</div>
          </div>
          <div className="bg-[#14261E]/70 backdrop-blur-md border border-white/10 rounded-xl p-3.5">
            <div className="font-mono-num text-xl sm:text-2xl font-bold text-white">12 Dias</div>
            <div className="text-xs text-[#B2C6BA] mt-0.5">Corredor Transoceânico</div>
          </div>
          <div className="bg-[#14261E]/70 backdrop-blur-md border border-white/10 rounded-xl p-3.5">
            <div className="font-mono-num text-xl sm:text-2xl font-bold text-sky-300">100% Digital</div>
            <div className="text-xs text-[#B2C6BA] mt-0.5">Despacho Siscomex DU-E</div>
          </div>
        </div>
      </div>

      {/* Gov.br Authentication Modal */}
      {showGovModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
            {/* Gov.br Modal Header */}
            <div className="bg-[#1351B4] p-5 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#1351B4] font-black text-sm shadow">
                  gov.br
                </div>
                <div>
                  <h3 className="font-bold text-base leading-tight">Identificação Gov.br</h3>
                  <p className="text-[11px] text-blue-100">Portal de Serviços do Governo Federal</p>
                </div>
              </div>
              <button 
                onClick={() => setShowGovModal(false)}
                className="text-blue-100 hover:text-white text-lg font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="p-6">
              <div className="mb-4">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Digite seu CPF para acessar o Portal Brapex:
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="000.000.000-00"
                    value={cpfInput}
                    onChange={(e) => setCpfInput(e.target.value)}
                    className="w-full pl-3 pr-10 py-2.5 border border-slate-300 rounded-lg text-slate-900 font-mono-num focus:ring-2 focus:ring-[#1351B4] focus:border-transparent outline-none"
                  />
                  <Lock className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Ambiente de Simulação Aduaneira Integrada (Sudoeste Paulista)
                </p>
              </div>

              <div className="mb-5 bg-slate-50 border border-slate-200 rounded-lg p-3">
                <span className="text-xs font-semibold text-slate-700 block mb-1">Selecione o Perfil do Operador:</span>
                <div className="space-y-1.5">
                  <label className="flex items-center gap-2 text-xs text-slate-800 cursor-pointer">
                    <input
                      type="radio"
                      name="persona"
                      checked={selectedPersona === 'Larissa Ferreira'}
                      onChange={() => setSelectedPersona('Larissa Ferreira')}
                      className="text-[#1351B4]"
                    />
                    <span>Larissa Ferreira (Despachante Aduaneira - Itapetininga)</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs text-slate-800 cursor-pointer">
                    <input
                      type="radio"
                      name="persona"
                      checked={selectedPersona === 'Cooperativa Sudoeste'}
                      onChange={() => setSelectedPersona('Cooperativa Sudoeste')}
                      className="text-[#1351B4]"
                    />
                    <span>Cooperativa Agroindustrial de Itapetininga</span>
                  </label>
                </div>
              </div>

              <div className="space-y-2.5">
                <button
                  type="button"
                  onClick={handleCpfSubmit}
                  disabled={isLoading}
                  className="w-full py-2.5 px-4 bg-[#1351B4] hover:bg-[#0d3f8c] text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-2 shadow"
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Continuar com Gov.br</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickLogin('Larissa Ferreira')}
                  className="w-full py-2 px-4 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-semibold rounded-lg transition-colors"
                >
                  Entrada Rápida de Demonstração (Sem Senha)
                </button>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200 text-center">
                <span className="text-[11px] text-slate-500">
                  Acesso protegido por ICP-Brasil e certificação digital e-CPF/e-CNPJ.
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Institutional subtle Bottom Credit */}
      <div className="relative z-10 py-4 px-4 text-center text-xs text-[#A8BEB1] bg-[#11221B]/90 border-t border-[#1C362B]">
        <span>Brapex Importações e Exportações Ltda · CNPJ 44.890.123/0001-90 · Itapetininga, SP - Brasil</span>
      </div>
    </div>
  );
};
