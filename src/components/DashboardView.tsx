import React, { useState } from 'react';
import { 
  TrendingUp, 
  Globe2, 
  ArrowRightLeft, 
  FileText, 
  Truck, 
  Search, 
  Coins, 
  Calculator, 
  ArrowUpRight, 
  ArrowDownRight,
  Sparkles,
  BarChart3,
  Building,
  RefreshCw,
  CheckCircle2,
  Layers,
  ChevronRight
} from 'lucide-react';

interface DashboardViewProps {
  userName: string;
  onNavigate: (tab: string) => void;
  onOpenNcmModal: () => void;
  onOpenFreightModal: () => void;
  onSelectItemForExport: (productId: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  userName,
  onNavigate,
  onOpenNcmModal,
  onOpenFreightModal,
  onSelectItemForExport
}) => {
  // Currency Converter State
  const [brlAmount, setBrlAmount] = useState<string>('1000');
  const [solAmount, setSolAmount] = useState<string>('680.00');
  const [exchangeRate, setExchangeRate] = useState<number>(0.68); // 1 BRL = 0.68 PEN
  const [direction, setDirection] = useState<'BRL_TO_PEN' | 'PEN_TO_BRL'>('BRL_TO_PEN');
  const [lastConvertedAt, setLastConvertedAt] = useState<string>('Hoje, PTAX Oficial');

  // Commercial Intelligence Tab
  const [intelTab, setIntelTab] = useState<'import' | 'export' | 'region'>('import');

  // Convert handler
  const handleConvert = (customVal?: string, customDir?: 'BRL_TO_PEN' | 'PEN_TO_BRL') => {
    const curDir = customDir || direction;
    const rate = exchangeRate;

    if (curDir === 'BRL_TO_PEN') {
      const val = parseFloat(customVal !== undefined ? customVal : brlAmount) || 0;
      const res = (val * rate).toFixed(2);
      setSolAmount(res);
    } else {
      const val = parseFloat(customVal !== undefined ? customVal : solAmount) || 0;
      const res = (val / rate).toFixed(2);
      setBrlAmount(res);
    }
    setLastConvertedAt('Atualizado agora');
  };

  const handleSwapDirection = () => {
    const newDir = direction === 'BRL_TO_PEN' ? 'PEN_TO_BRL' : 'BRL_TO_PEN';
    setDirection(newDir);
    handleConvert(newDir === 'BRL_TO_PEN' ? brlAmount : solAmount, newDir);
  };

  const handleRateChange = (newRate: number) => {
    setExchangeRate(newRate);
    if (direction === 'BRL_TO_PEN') {
      const val = parseFloat(brlAmount) || 0;
      setSolAmount((val * newRate).toFixed(2));
    } else {
      const val = parseFloat(solAmount) || 0;
      setBrlAmount((val / newRate).toFixed(2));
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Welcome Banner */}
      <div className="bg-[#1A3026] text-white rounded-2xl p-6 sm:p-8 shadow-md border border-[#264738] relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 rounded-full bg-emerald-600/10 blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#B5C9BD] mb-1 font-medium">
              <span>Sudoeste Paulista · Hub Aduaneiro Itapetininga</span>
              <span>·</span>
              <span className="text-emerald-300">Operador OEA Conforme</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
              Olá, {userName}!
            </h1>
            <p className="mt-1 text-sm text-[#D1DFD7] max-w-2xl">
              Seu painel aduaneiro está sincronizado com a Receita Federal, Siscomex e alfândega peruana (SUNAT). Acompanhe suas cargas, cotações e inteligência de mercado.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <button
              onClick={() => onNavigate('products')}
              className="px-4 py-2.5 bg-[#2E5A44] hover:bg-[#396c53] text-white text-xs font-semibold rounded-xl transition-colors shadow-sm flex items-center gap-1.5 whitespace-nowrap"
            >
              <span>Nova Cotação</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('tracking')}
              className="px-4 py-2.5 bg-white/10 hover:bg-white/15 text-white text-xs font-semibold rounded-xl border border-white/20 transition-colors flex items-center gap-1.5 whitespace-nowrap"
            >
              <Truck className="w-4 h-4 text-emerald-300" />
              <span>Ver Cargas Ativas (3)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Menu de Atalhos Rápidos */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#546E60]">
            Atalhos Rápidos de Operação
          </h2>
          <span className="text-xs text-[#7A9184]">
            5 Módulos Principais
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
          {/* 1. Documentação */}
          <button
            onClick={() => onNavigate('workflow')}
            className="group text-left p-4 bg-white rounded-xl border border-[#E5E1D8] hover:border-[#1A3026] hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="w-10 h-10 rounded-lg bg-[#EBF3EE] text-[#1A3026] group-hover:bg-[#1A3026] group-hover:text-white transition-colors flex items-center justify-center mb-3">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="font-semibold text-sm text-[#1A3026] group-hover:text-[#1A3026]">
                Documentação
              </div>
              <div className="text-[11px] text-[#697E72] mt-0.5">
                Invoice, DU-E & Certificado ACE 58
              </div>
            </div>
          </button>

          {/* 2. Rastreamento */}
          <button
            onClick={() => onNavigate('tracking')}
            className="group text-left p-4 bg-white rounded-xl border border-[#E5E1D8] hover:border-[#1A3026] hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="w-10 h-10 rounded-lg bg-[#EBF3EE] text-[#1A3026] group-hover:bg-[#1A3026] group-hover:text-white transition-colors flex items-center justify-center mb-3">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-semibold text-sm text-[#1A3026]">
                Rastreamento
              </div>
              <div className="text-[11px] text-[#697E72] mt-0.5">
                Telemetria de rota em tempo real
              </div>
            </div>
          </button>

          {/* 3. Consulta NCM */}
          <button
            onClick={onOpenNcmModal}
            className="group text-left p-4 bg-white rounded-xl border border-[#E5E1D8] hover:border-[#1A3026] hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="w-10 h-10 rounded-lg bg-[#EBF3EE] text-[#1A3026] group-hover:bg-[#1A3026] group-hover:text-white transition-colors flex items-center justify-center mb-3">
              <Search className="w-5 h-5" />
            </div>
            <div>
              <div className="font-semibold text-sm text-[#1A3026]">
                Consulta NCM
              </div>
              <div className="text-[11px] text-[#697E72] mt-0.5">
                Classificação fiscal e alíquotas
              </div>
            </div>
          </button>

          {/* 4. Conversor de Moedas */}
          <a
            href="#conversor-moedas"
            className="group text-left p-4 bg-white rounded-xl border border-[#E5E1D8] hover:border-[#1A3026] hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="w-10 h-10 rounded-lg bg-[#EBF3EE] text-[#1A3026] group-hover:bg-[#1A3026] group-hover:text-white transition-colors flex items-center justify-center mb-3">
              <Coins className="w-5 h-5" />
            </div>
            <div>
              <div className="font-semibold text-sm text-[#1A3026]">
                Conversor de Moedas
              </div>
              <div className="text-[11px] text-[#697E72] mt-0.5">
                Câmbio R$ ⇄ S/ (Sol peruano)
              </div>
            </div>
          </a>

          {/* 5. Simular Frete */}
          <button
            onClick={onOpenFreightModal}
            className="group text-left p-4 bg-white rounded-xl border border-[#E5E1D8] hover:border-[#1A3026] hover:shadow-md transition-all flex flex-col justify-between col-span-2 sm:col-span-1"
          >
            <div className="w-10 h-10 rounded-lg bg-[#EBF3EE] text-[#1A3026] group-hover:bg-[#1A3026] group-hover:text-white transition-colors flex items-center justify-center mb-3">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <div className="font-semibold text-sm text-[#1A3026]">
                Simular Frete
              </div>
              <div className="text-[11px] text-[#697E72] mt-0.5">
                Itapetininga ⇄ Peru (Multimodal)
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Grid: Cards de Destaque (Inteligência Comercial & Radar Mundial) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Card Destaque 1: Inteligência Comercial */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-[#E5E1D8] p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                  Hub Regional Itapetininga
                </span>
                <h2 className="font-display text-xl font-bold text-[#1A3026]">
                  Inteligência Comercial
                </h2>
                <p className="text-xs text-[#5C7065] mt-0.5">
                  Fluxos aduaneiros mais movimentados entre o Sudoeste Paulista e o Peru
                </p>
              </div>

              {/* Segmented Filter */}
              <div className="flex items-center gap-1 p-1 bg-[#F1EFEA] rounded-lg shrink-0">
                <button
                  onClick={() => setIntelTab('import')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                    intelTab === 'import' ? 'bg-white text-[#1A3026] shadow-xs' : 'text-[#5C7065] hover:text-[#1A3026]'
                  }`}
                >
                  Importações (Peru ➔ SP)
                </button>
                <button
                  onClick={() => setIntelTab('export')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                    intelTab === 'export' ? 'bg-white text-[#1A3026] shadow-xs' : 'text-[#5C7065] hover:text-[#1A3026]'
                  }`}
                >
                  Exportações (SP ➔ Peru)
                </button>
              </div>
            </div>

            {/* List of Products by Flow */}
            <div className="space-y-3 mt-4">
              {intelTab === 'import' ? (
                <>
                  <div className="p-3.5 rounded-xl bg-[#FBFBF9] border border-[#EBE8E0] hover:border-[#C8D8CE] transition-colors flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-[#1A3026] truncate">Cobre Eletrolítico & Catodos</span>
                        <span className="text-[10px] font-mono-num bg-emerald-100 text-emerald-900 px-1.5 py-0.5 rounded">NCM 7403.11</span>
                      </div>
                      <div className="text-xs text-[#697E72] mt-0.5">
                        Origem: Cerro Verde & Moquegua · Aplicação: Condutores & Indústria Paulista
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="font-mono-num font-bold text-sm text-[#1A3026]">18.420 ton</div>
                      <div className="text-[11px] text-emerald-600 font-medium">+14.2% em 2026</div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#FBFBF9] border border-[#EBE8E0] hover:border-[#C8D8CE] transition-colors flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-[#1A3026] truncate">Alho Roxo Peruano Selecionado</span>
                        <span className="text-[10px] font-mono-num bg-purple-100 text-purple-900 px-1.5 py-0.5 rounded">NCM 0703.20</span>
                      </div>
                      <div className="text-xs text-[#697E72] mt-0.5">
                        Origem: Arequipa · Destino: Entrepostos e Mercados de Itapetininga/Sorocaba
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="font-mono-num font-bold text-sm text-[#1A3026]">8.950 ton</div>
                      <div className="text-[11px] text-emerald-600 font-medium">+22.5% em 2026</div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#FBFBF9] border border-[#EBE8E0] hover:border-[#C8D8CE] transition-colors flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-[#1A3026] truncate">Farinha e Óleo de Peixe (Prot. 68%)</span>
                        <span className="text-[10px] font-mono-num bg-blue-100 text-blue-900 px-1.5 py-0.5 rounded">NCM 2301.20</span>
                      </div>
                      <div className="text-xs text-[#697E72] mt-0.5">
                        Origem: Chimbote / Callao · Aplicação: Ração Animal & Nutrição Regional
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="font-mono-num font-bold text-sm text-[#1A3026]">12.180 ton</div>
                      <div className="text-[11px] text-emerald-600 font-medium">+9.8% em 2026</div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="p-3.5 rounded-xl bg-[#FBFBF9] border border-[#EBE8E0] hover:border-[#C8D8CE] transition-colors flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-[#1A3026] truncate">Milho & Soja em Grãos (Sudoeste Paulista)</span>
                        <span className="text-[10px] font-mono-num bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded">NCM 1005.90</span>
                      </div>
                      <div className="text-xs text-[#697E72] mt-0.5">
                        Origem: Cooperativas de Itapetininga · Destino: Indústria Avícola Peruana
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="font-mono-num font-bold text-sm text-[#1A3026]">32.400 ton</div>
                      <div className="text-[11px] text-emerald-600 font-medium">+18.0% em 2026</div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#FBFBF9] border border-[#EBE8E0] hover:border-[#C8D8CE] transition-colors flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-[#1A3026] truncate">Máquinas & Implementos Agrícolas</span>
                        <span className="text-[10px] font-mono-num bg-slate-200 text-slate-800 px-1.5 py-0.5 rounded">NCM 8433.59</span>
                      </div>
                      <div className="text-xs text-[#697E72] mt-0.5">
                        Origem: Polo Metal-Mecânico de Itapetininga · Destino: Vales Agrícolas do Peru
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="font-mono-num font-bold text-sm text-[#1A3026]">420 unidades</div>
                      <div className="text-[11px] text-emerald-600 font-medium">+26.4% em 2026</div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#FBFBF9] border border-[#EBE8E0] hover:border-[#C8D8CE] transition-colors flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-[#1A3026] truncate">Embalagens & Papel Cartão Ondulado</span>
                        <span className="text-[10px] font-mono-num bg-orange-100 text-orange-900 px-1.5 py-0.5 rounded">NCM 4819.10</span>
                      </div>
                      <div className="text-xs text-[#697E72] mt-0.5">
                        Origem: Indústria Papeleira Regional · Destino: Agroexportadores de Frutas de Ica
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="font-mono-num font-bold text-sm text-[#1A3026]">6.800 ton</div>
                      <div className="text-[11px] text-emerald-600 font-medium">+11.3% em 2026</div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-[#E8E6E1] flex items-center justify-between text-xs">
            <span className="text-[#697E72]">
              Fonte: Siscomex · SECEX / MDIC · SUNAT Aduanas
            </span>
            <button
              onClick={() => onNavigate('products')}
              className="text-[#1A3026] font-semibold hover:underline flex items-center gap-1"
            >
              <span>Ver Catálogo Completo</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Card Destaque 2: Radar de Mercado Mundial */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-[#E5E1D8] p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-xs font-bold text-sky-800 uppercase tracking-wider">
                  Macroeconômico & Comércio Exterior
                </span>
                <h2 className="font-display text-xl font-bold text-[#1A3026]">
                  Radar de Mercado Mundial
                </h2>
              </div>
              <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-800 flex items-center justify-center">
                <Globe2 className="w-4 h-4" />
              </div>
            </div>

            <p className="text-xs text-[#5C7065] mb-4">
              Métricas econômicas e indicadores de liquidez da rota Brasil-Peru em 2026:
            </p>

            <div className="space-y-3">
              {/* PIB do Peru */}
              <div className="p-3 bg-[#FBFBF9] border border-[#EBE8E0] rounded-xl flex items-center justify-between">
                <div>
                  <div className="text-xs text-[#697E72]">PIB do Peru (2026 Est.)</div>
                  <div className="font-mono-num font-bold text-base text-[#1A3026]">US$ 278,4 Bilhões</div>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center gap-0.5 text-xs font-semibold text-emerald-600">
                    <ArrowUpRight className="w-3.5 h-3.5" /> +3.2% a.a.
                  </span>
                  <div className="text-[10px] text-[#7A8E82]">Demanda aquecida</div>
                </div>
              </div>

              {/* Volume Bilateral */}
              <div className="p-3 bg-[#FBFBF9] border border-[#EBE8E0] rounded-xl flex items-center justify-between">
                <div>
                  <div className="text-xs text-[#697E72]">Volume Bilateral BR-PE</div>
                  <div className="font-mono-num font-bold text-base text-[#1A3026]">US$ 5,42 Bilhões</div>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center gap-0.5 text-xs font-semibold text-emerald-600">
                    <ArrowUpRight className="w-3.5 h-3.5" /> +12.8%
                  </span>
                  <div className="text-[10px] text-[#7A8E82]">Recorde histórico</div>
                </div>
              </div>

              {/* Demandas em Alta */}
              <div className="p-3 bg-[#FBFBF9] border border-[#EBE8E0] rounded-xl">
                <div className="text-xs font-semibold text-[#1A3026] mb-1.5">
                  Demandas Setoriais em Alta:
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-1.5 text-[#2A4436]">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>Cobre & Condutores</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#2A4436]">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>Hortifrúti / Alho Nobre</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#2A4436]">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>Farinha de Peixe Ração</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#2A4436]">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>Maquinário Agrícola SP</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#E8E6E1] text-[11px] text-[#7A8E82] flex items-center justify-between">
            <span>Portos: Callao (Peru) & Santos (SP)</span>
            <span className="text-emerald-700 font-medium">Fluxo Contínuo Verde</span>
          </div>
        </div>
      </div>

      {/* Seção Conversor de Moedas (Simulado: R$ ⇄ S/ Sol Peruano) */}
      <div id="conversor-moedas" className="bg-white rounded-2xl border border-[#E5E1D8] p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                Câmbio Comercial Bilateral
              </span>
              <span className="text-xs text-[#7A9184]">·</span>
              <span className="text-xs text-[#5C7065]">PTAX Aduaneira</span>
            </div>
            <h2 className="font-display text-2xl font-bold text-[#1A3026] mt-0.5">
              Conversor de Moedas: Real (R$) & Sol Peruano (S/)
            </h2>
            <p className="text-xs text-[#5C7065] mt-1">
              Simule a paridade cambial para transações de exportação e importação com base na taxa de referência.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-[#F1EFEA] p-2 rounded-xl text-xs font-mono-num text-[#1A3026]">
            <span className="text-[#697E72]">Taxa Referência:</span>
            <span className="font-bold">1 R$ = {exchangeRate.toFixed(2)} S/</span>
            <span className="text-[#9BAEA4]">|</span>
            <span className="font-bold">1 S/ = {(1 / exchangeRate).toFixed(2)} R$</span>
          </div>
        </div>

        {/* Currency Converter Inputs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center">
          
          {/* Input 1 (BRL or PEN) */}
          <div className="md:col-span-5 bg-[#FBFBF9] border border-[#E2DFD8] rounded-xl p-4 focus-within:border-[#1A3026] focus-within:ring-1 focus-within:ring-[#1A3026] transition-all">
            <div className="flex items-center justify-between text-xs text-[#697E72] mb-1">
              <span>{direction === 'BRL_TO_PEN' ? 'Você envia / Converte (Real)' : 'Você envia / Converte (Sol Peruano)'}</span>
              <span className="font-semibold">{direction === 'BRL_TO_PEN' ? 'BRL (R$)' : 'PEN (S/)'}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-display text-xl text-[#1A3026] font-bold">
                {direction === 'BRL_TO_PEN' ? 'R$' : 'S/'}
              </span>
              <input
                type="number"
                value={direction === 'BRL_TO_PEN' ? brlAmount : solAmount}
                onChange={(e) => {
                  const val = e.target.value;
                  if (direction === 'BRL_TO_PEN') {
                    setBrlAmount(val);
                    const n = parseFloat(val) || 0;
                    setSolAmount((n * exchangeRate).toFixed(2));
                  } else {
                    setSolAmount(val);
                    const n = parseFloat(val) || 0;
                    setBrlAmount((n / exchangeRate).toFixed(2));
                  }
                }}
                className="w-full bg-transparent text-2xl font-mono-num font-bold text-[#1A3026] outline-none"
                placeholder="0.00"
              />
            </div>
          </div>

          {/* Swap Button */}
          <div className="md:col-span-1 flex justify-center">
            <button
              onClick={handleSwapDirection}
              className="w-11 h-11 rounded-full bg-[#1A3026] hover:bg-[#254436] text-white flex items-center justify-center shadow-md transition-transform hover:rotate-180 active:scale-95"
              title="Inverter Moeda de Origem e Destino"
            >
              <ArrowRightLeft className="w-5 h-5" />
            </button>
          </div>

          {/* Input 2 (Result) */}
          <div className="md:col-span-5 bg-[#F2F0EB] border border-[#DDD9D0] rounded-xl p-4">
            <div className="flex items-center justify-between text-xs text-[#697E72] mb-1">
              <span>{direction === 'BRL_TO_PEN' ? 'Você recebe / Cotação (Sol Peruano)' : 'Você recebe / Cotação (Real)'}</span>
              <span className="font-semibold">{direction === 'BRL_TO_PEN' ? 'PEN (S/)' : 'BRL (R$)'}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-display text-xl text-[#1A3026] font-bold">
                {direction === 'BRL_TO_PEN' ? 'S/' : 'R$'}
              </span>
              <input
                type="number"
                readOnly
                value={direction === 'BRL_TO_PEN' ? solAmount : brlAmount}
                className="w-full bg-transparent text-2xl font-mono-num font-bold text-[#1A3026] outline-none"
              />
            </div>
          </div>
        </div>

        {/* Action Controls & Rate Presets */}
        <div className="mt-5 pt-4 border-t border-[#E8E6E1] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#697E72]">Ajustar taxa de simulação:</span>
            <button
              onClick={() => handleRateChange(0.68)}
              className={`px-2.5 py-1 rounded text-xs font-mono-num font-semibold transition-colors ${
                exchangeRate === 0.68 ? 'bg-[#1A3026] text-white' : 'bg-[#EAE8E2] text-[#1A3026] hover:bg-[#DEDAD2]'
              }`}
            >
              0,68 S/ (Padrão)
            </button>
            <button
              onClick={() => handleRateChange(0.70)}
              className={`px-2.5 py-1 rounded text-xs font-mono-num font-semibold transition-colors ${
                exchangeRate === 0.70 ? 'bg-[#1A3026] text-white' : 'bg-[#EAE8E2] text-[#1A3026] hover:bg-[#DEDAD2]'
              }`}
            >
              0,70 S/ (Alta)
            </button>
            <button
              onClick={() => handleRateChange(0.66)}
              className={`px-2.5 py-1 rounded text-xs font-mono-num font-semibold transition-colors ${
                exchangeRate === 0.66 ? 'bg-[#1A3026] text-white' : 'bg-[#EAE8E2] text-[#1A3026] hover:bg-[#DEDAD2]'
              }`}
            >
              0,66 S/ (Baixa)
            </button>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] text-[#7A8E82]">
              IOF de Exportação 0,38% incluso na cotação líquida
            </span>
            <button
              onClick={() => handleConvert()}
              className="px-5 py-2.5 bg-[#1A3026] hover:bg-[#254436] text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center gap-2"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Converter Agora</span>
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};
