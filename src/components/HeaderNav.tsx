import React from 'react';
import { 
  Ship, 
  HelpCircle, 
  PhoneCall, 
  LogOut, 
  UserCheck, 
  Compass, 
  TrendingUp, 
  FileText, 
  Truck, 
  Search, 
  DollarSign, 
  Calculator,
  Download
} from 'lucide-react';

interface HeaderNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isLoggedIn: boolean;
  userName: string;
  onLoginClick: () => void;
  onLogoutClick: () => void;
  onOpenHelp: () => void;
  onOpenContact: () => void;
  onOpenExportHtml: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  activeTab,
  setActiveTab,
  isLoggedIn,
  userName,
  onLoginClick,
  onLogoutClick,
  onOpenHelp,
  onOpenContact,
  onOpenExportHtml
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#1A3026] text-[#F9F8F6] border-b border-[#254436] shadow-sm">
      {/* Top Bar Contract: Zone 1 (Brand) - Zone 2 (Nav Links) - Zone 3 (Action) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single element wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button 
            onClick={() => setActiveTab(isLoggedIn ? 'dashboard' : 'login')}
            className="flex items-center gap-2.5 text-left focus:outline-none group"
            title="Brapex - Ir para o Início"
          >
            <div className="w-9 h-9 rounded-lg bg-[#2E5A44] border border-[#3E7559] flex items-center justify-center text-[#F9F8F6] shadow-inner group-hover:bg-[#386b51] transition-colors">
              <Ship className="w-5 h-5 text-[#F9F8F6]" />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-xl font-bold tracking-wider text-[#F9F8F6] leading-none">
                BRAPEX
              </span>
              <span className="text-[10px] tracking-widest text-[#B5C9BD] uppercase font-medium mt-0.5">
                Importações & Exportações
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: 4-5 clean single-line nav links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {isLoggedIn ? (
            <>
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                  activeTab === 'dashboard'
                    ? 'bg-[#28493A] text-white shadow-sm'
                    : 'text-[#C5D5CC] hover:text-white hover:bg-[#223F31]'
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                Painel Geral
              </button>
              <button
                onClick={() => setActiveTab('products')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                  activeTab === 'products'
                    ? 'bg-[#28493A] text-white shadow-sm'
                    : 'text-[#C5D5CC] hover:text-white hover:bg-[#223F31]'
                }`}
              >
                <TrendingUp className="w-3.5 h-3.5" />
                Cotações & Produtos
              </button>
              <button
                onClick={() => setActiveTab('workflow')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                  activeTab === 'workflow'
                    ? 'bg-[#28493A] text-white shadow-sm'
                    : 'text-[#C5D5CC] hover:text-white hover:bg-[#223F31]'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                Documentação
              </button>
              <button
                onClick={() => setActiveTab('payment')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                  activeTab === 'payment'
                    ? 'bg-[#28493A] text-white shadow-sm'
                    : 'text-[#C5D5CC] hover:text-white hover:bg-[#223F31]'
                }`}
              >
                <DollarSign className="w-3.5 h-3.5" />
                Pagamento Gov.br
              </button>
              <button
                onClick={() => setActiveTab('tracking')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                  activeTab === 'tracking'
                    ? 'bg-[#28493A] text-white shadow-sm'
                    : 'text-[#C5D5CC] hover:text-white hover:bg-[#223F31]'
                }`}
              >
                <Truck className="w-3.5 h-3.5" />
                Rastreamento
              </button>
            </>
          ) : (
            <div className="flex items-center gap-4 text-xs text-[#B5C9BD]">
              <span className="hidden xl:inline">Sudoeste Paulista ➔ Peru & Mercado Global</span>
              <span>·</span>
              <span>Siscomex Integrado</span>
              <span>·</span>
              <span>Corredor Bioceânico</span>
            </div>
          )}
        </nav>

        {/* Zone 3: Primary Action & Utilities */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Quick Tools */}
          <button
            onClick={onOpenExportHtml}
            title="Baixar ou ver versão em arquivo único HTML"
            className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-[#C5D5CC] hover:text-white hover:bg-[#223F31] rounded-md transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden xl:inline">Arquivo Único</span>
          </button>

          <button
            onClick={onOpenHelp}
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs text-[#C5D5CC] hover:text-white hover:bg-[#223F31] rounded-md transition-colors"
            title="Dúvidas e Suporte"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Ajuda</span>
          </button>

          <button
            onClick={onOpenContact}
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs text-[#C5D5CC] hover:text-white hover:bg-[#223F31] rounded-md transition-colors"
            title="Contatos e Endereço"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Contato</span>
          </button>

          <div className="h-4 w-px bg-[#2E5A44] mx-1" />

          {isLoggedIn ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 bg-[#223F31] border border-[#2E5A44] py-1 px-2.5 rounded-lg text-xs">
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="font-medium text-white">{userName}</span>
              </div>
              <button
                onClick={onLogoutClick}
                className="p-1.5 text-[#C5D5CC] hover:text-white hover:bg-[#223F31] rounded-lg transition-colors"
                title="Sair da Sessão"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onLoginClick}
              className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-white bg-[#1351B4] hover:bg-[#0c3e8e] rounded-lg transition-colors shadow-sm whitespace-nowrap"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Entrar com Gov.br</span>
            </button>
          )}
        </div>
      </div>

      {/* Mobile Navigation bar for logged in users */}
      {isLoggedIn && (
        <div className="lg:hidden border-t border-[#254436] bg-[#14261E] px-3 py-2 flex items-center justify-between gap-1 overflow-x-auto text-xs">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-2.5 py-1.5 rounded font-medium whitespace-nowrap ${
              activeTab === 'dashboard' ? 'bg-[#28493A] text-white' : 'text-[#A8BEB1]'
            }`}
          >
            Painel
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`px-2.5 py-1.5 rounded font-medium whitespace-nowrap ${
              activeTab === 'products' ? 'bg-[#28493A] text-white' : 'text-[#A8BEB1]'
            }`}
          >
            Cotações
          </button>
          <button
            onClick={() => setActiveTab('workflow')}
            className={`px-2.5 py-1.5 rounded font-medium whitespace-nowrap ${
              activeTab === 'workflow' ? 'bg-[#28493A] text-white' : 'text-[#A8BEB1]'
            }`}
          >
            Documentação
          </button>
          <button
            onClick={() => setActiveTab('payment')}
            className={`px-2.5 py-1.5 rounded font-medium whitespace-nowrap ${
              activeTab === 'payment' ? 'bg-[#28493A] text-white' : 'text-[#A8BEB1]'
            }`}
          >
            Pagamento
          </button>
          <button
            onClick={() => setActiveTab('tracking')}
            className={`px-2.5 py-1.5 rounded font-medium whitespace-nowrap ${
              activeTab === 'tracking' ? 'bg-[#28493A] text-white' : 'text-[#A8BEB1]'
            }`}
          >
            Rastreamento
          </button>
        </div>
      )}
    </header>
  );
};
