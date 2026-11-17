import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Truck, 
  Ship, 
  MapPin, 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle2, 
  Clock, 
  Thermometer, 
  Gauge, 
  Compass, 
  ChevronRight,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { TRACKING_RECORDS, TrackingShipment } from '../data/mockData';

interface TrackingLogisticsViewProps {
  initialCode?: string;
  onOpenHelp: () => void;
}

export const TrackingLogisticsView: React.FC<TrackingLogisticsViewProps> = ({
  initialCode = 'BRAPEX2026',
  onOpenHelp
}) => {
  const [searchCode, setSearchCode] = useState(initialCode);
  const [activeShipment, setActiveShipment] = useState<TrackingShipment>(
    TRACKING_RECORDS[initialCode] || TRACKING_RECORDS['BRAPEX2026']
  );
  
  // Animation state for route
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [animationProgress, setAnimationProgress] = useState<number>(activeShipment.progressPercent);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (TRACKING_RECORDS[initialCode]) {
      setActiveShipment(TRACKING_RECORDS[initialCode]);
      setSearchCode(initialCode);
      setAnimationProgress(TRACKING_RECORDS[initialCode].progressPercent);
    }
  }, [initialCode]);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const clean = searchCode.trim().toUpperCase();
    if (TRACKING_RECORDS[clean]) {
      setActiveShipment(TRACKING_RECORDS[clean]);
      setAnimationProgress(TRACKING_RECORDS[clean].progressPercent);
      setIsAnimating(false);
    } else {
      alert(`Código "${searchCode}" não encontrado. Experimente um dos códigos sugeridos: BRAPEX2026, BR-PE-001 ou LOG-ITP-789`);
    }
  };

  const handleQuickCode = (code: string) => {
    setSearchCode(code);
    if (TRACKING_RECORDS[code]) {
      setActiveShipment(TRACKING_RECORDS[code]);
      setAnimationProgress(TRACKING_RECORDS[code].progressPercent);
      setIsAnimating(false);
    }
  };

  // Route animation loop
  useEffect(() => {
    if (isAnimating) {
      const step = () => {
        setAnimationProgress((prev) => {
          if (prev >= 100) {
            return 0; // loop or reset
          }
          return Math.min(100, prev + 0.35);
        });
        animationFrameRef.current = requestAnimationFrame(step);
      };
      animationFrameRef.current = requestAnimationFrame(step);
    } else {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isAnimating]);

  const toggleAnimation = () => {
    setIsAnimating(!isAnimating);
  };

  const resetAnimation = () => {
    setIsAnimating(false);
    setAnimationProgress(0);
  };

  // Interpolate position on the map path for the truck/ship icon:
  // Route coordinates in SVG viewbox (0 0 700 400):
  // Point A (Peru - Callao/Lima): (120, 180)
  // Point B (Andes Pass / Corumbá): (320, 230)
  // Point C (Santos/Itapetininga SP): (560, 260)
  const t = animationProgress / 100;
  // Quadratic bezier: P0(120, 180), P1(320, 210), P2(560, 260) if Peru -> Brazil
  // or inverted if Brazil -> Peru
  const isPeruToBrazil = activeShipment.code !== 'LOG-ITP-789';

  const p0 = isPeruToBrazil ? { x: 120, y: 170 } : { x: 560, y: 260 };
  const p1 = { x: 330, y: 220 };
  const p2 = isPeruToBrazil ? { x: 560, y: 260 } : { x: 120, y: 170 };

  const currentX = (1 - t) * (1 - t) * p0.x + 2 * (1 - t) * t * p1.x + t * t * p2.x;
  const currentY = (1 - t) * (1 - t) * p0.y + 2 * (1 - t) * t * p1.y + t * t * p2.y;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header & Search Bar */}
      <div className="bg-white rounded-2xl border border-[#E5E1D8] p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider">
              <span>Sistemas de Localização Global (GPS / AIS Marítimo)</span>
              <span>·</span>
              <span className="text-[#697E72] font-normal">Corredor Bioceânico</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#1A3026] mt-1">
              Rastreamento & Logística em Tempo Real
            </h1>
            <p className="text-xs text-[#5C7065] mt-1">
              Monitore a telemetria, passagem alfandegária e movimentação das cargas entre o Sudoeste Paulista e o Peru.
            </p>
          </div>

          {/* Suggested codes shortcuts (Requisito Explícito: BRAPEX2026, BR-PE-001) */}
          <div className="flex flex-wrap items-center gap-1.5 shrink-0">
            <span className="text-xs font-medium text-[#697E72] mr-1">Sugestões:</span>
            {['BRAPEX2026', 'BR-PE-001', 'LOG-ITP-789'].map((code) => (
              <button
                key={code}
                onClick={() => handleQuickCode(code)}
                className={`px-2.5 py-1 text-xs font-mono-num font-semibold rounded-lg transition-colors ${
                  activeShipment.code === code
                    ? 'bg-[#1A3026] text-white shadow-2xs'
                    : 'bg-[#F1EFEA] hover:bg-[#E4E1D8] text-[#1A3026]'
                }`}
              >
                {code}
              </button>
            ))}
          </div>
        </div>

        {/* Search input form */}
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#7A8E82] absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchCode}
              onChange={(e) => setSearchCode(e.target.value)}
              placeholder="Digite o código da carga (ex: BRAPEX2026)..."
              className="w-full pl-10 pr-4 py-2.5 bg-[#FBFBF9] border border-[#DDD9D0] rounded-xl text-xs sm:text-sm font-mono-num font-semibold text-[#1A3026] focus:border-[#1A3026] focus:ring-1 focus:ring-[#1A3026] outline-none"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 bg-[#1A3026] hover:bg-[#254436] text-white text-xs font-bold rounded-xl transition-colors shadow-sm flex items-center gap-1.5 whitespace-nowrap"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Consultar</span>
          </button>
        </form>
      </div>

      {/* Shipment Status Strip & Telemetry */}
      <div className="bg-[#1A3026] text-white rounded-2xl p-6 shadow-md border border-[#254436]">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-mono-num text-xs bg-emerald-700/60 text-emerald-200 border border-emerald-500/30 px-2 py-0.5 rounded font-bold">
                {activeShipment.code}
              </span>
              <span className="text-xs text-[#B5C9BD]">{activeShipment.carrier}</span>
              <span className="text-xs text-[#B5C9BD]">·</span>
              <span className="text-xs text-[#B5C9BD]">Atualizado {activeShipment.updatedAt}</span>
            </div>
            
            <h2 className="font-display text-xl sm:text-2xl font-bold text-white">
              {activeShipment.title}
            </h2>

            <div className="flex items-center gap-2 text-xs text-emerald-300 font-semibold pt-1">
              <MapPin className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>Posição Atual: {activeShipment.currentLocation}</span>
            </div>
          </div>

          {/* Telemetry Widgets */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-[#223F31] border border-[#2F5744] p-3 rounded-xl min-w-[130px]">
              <div className="flex items-center gap-1.5 text-[11px] text-[#A8BEB1]">
                <Clock className="w-3.5 h-3.5 text-amber-300" />
                <span>Previsão (ETA)</span>
              </div>
              <div className="font-mono-num font-bold text-sm text-white mt-0.5">
                {activeShipment.eta}
              </div>
            </div>

            <div className="bg-[#223F31] border border-[#2F5744] p-3 rounded-xl min-w-[130px]">
              <div className="flex items-center gap-1.5 text-[11px] text-[#A8BEB1]">
                <Thermometer className="w-3.5 h-3.5 text-sky-300" />
                <span>Temperatura</span>
              </div>
              <div className="font-mono-num font-bold text-sm text-white mt-0.5">
                {activeShipment.telemetry.temperature || 'Normal (22°C)'}
              </div>
            </div>

            <div className="bg-[#223F31] border border-[#2F5744] p-3 rounded-xl min-w-[130px]">
              <div className="flex items-center gap-1.5 text-[11px] text-[#A8BEB1]">
                <Gauge className="w-3.5 h-3.5 text-emerald-300" />
                <span>Velocidade / Modo</span>
              </div>
              <div className="font-mono-num font-bold text-sm text-white mt-0.5">
                {activeShipment.telemetry.speed || '72 km/h'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Visualização de Rota Ilustrativa (Brasil -> Peru) com Botão "Animar rota" (Requisito Explícito) */}
      <div className="bg-white rounded-2xl border border-[#E5E1D8] p-6 shadow-sm overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                Cartografia da Rota Logística
              </span>
              <span className="text-xs text-[#7A9184]">·</span>
              <span className="text-xs text-[#5C7065]">{activeShipment.route}</span>
            </div>
            <h3 className="font-display text-xl font-bold text-[#1A3026] mt-0.5">
              Corredor Logístico Brasil ⇄ Peru
            </h3>
          </div>

          {/* Animation Controls (Botão "Animar rota" conforme solicitado) */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={toggleAnimation}
              className={`py-2 px-4 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-sm ${
                isAnimating
                  ? 'bg-amber-600 hover:bg-amber-700 text-white'
                  : 'bg-[#1A3026] hover:bg-[#254436] text-white'
              }`}
            >
              {isAnimating ? (
                <>
                  <Pause className="w-3.5 h-3.5" />
                  <span>Pausar Rota</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span>Animar Rota</span>
                </>
              )}
            </button>

            <button
              onClick={resetAnimation}
              className="p-2 bg-[#F1EFEA] hover:bg-[#E2DFD8] text-[#1A3026] rounded-xl transition-colors"
              title="Reiniciar deslocamento para o ponto de partida"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <div className="font-mono-num text-xs font-bold text-[#1A3026] bg-[#F1EFEA] py-2 px-3 rounded-xl border border-[#DDD9D0]">
              {animationProgress.toFixed(0)}% Concluído
            </div>
          </div>
        </div>

        {/* Interactive SVG Map Canvas */}
        <div className="relative w-full aspect-[21/9] min-h-[280px] sm:min-h-[340px] bg-[#142820] rounded-2xl overflow-hidden border border-[#2E5A44] shadow-inner">
          {/* Subtle Map Grid lines */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(46,90,68,0.2),transparent_70%)]" />
          <svg
            className="w-full h-full"
            viewBox="0 0 700 380"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              {/* Gradient for route */}
              <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#34D399" />
                <stop offset="50%" stopColor="#FBBF24" />
                <stop offset="100%" stopColor="#38BDF8" />
              </linearGradient>

              {/* Glow filter */}
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Stylized South America Map Contours (Simplified for clarity & aesthetics) */}
            {/* Pacific Coastline / Peru */}
            <path
              d="M 60 40 Q 110 100 115 160 Q 120 220 150 280 L 160 340 L 40 340 L 40 40 Z"
              fill="#1A3429"
              opacity="0.8"
            />
            {/* Brazil Landmass */}
            <path
              d="M 160 80 Q 300 40 480 60 Q 640 100 660 180 Q 640 280 540 330 Q 380 340 200 310 Q 170 200 160 80 Z"
              fill="#1C382C"
              opacity="0.9"
            />

            {/* Andes Mountain Range Ridge Stylized */}
            <path
              d="M 130 90 L 140 160 L 170 240 L 180 310"
              fill="none"
              stroke="#2E5A44"
              strokeWidth="4"
              strokeDasharray="4 6"
              opacity="0.7"
            />
            <text x="175" y="140" fill="#7A9C8B" fontSize="10" fontFamily="sans-serif" fontStyle="italic">
              Cordilheira dos Andes
            </text>

            {/* Dotted Route Line between Peru and Brazil (Santos/Itapetininga) */}
            <path
              d="M 120 170 Q 330 220 560 260"
              fill="none"
              stroke="#4E7C64"
              strokeWidth="3"
            />
            <path
              d="M 120 170 Q 330 220 560 260"
              fill="none"
              stroke="url(#routeGradient)"
              strokeWidth="3.5"
              strokeDasharray="6 8"
              filter="url(#glow)"
            />

            {/* Key Hub Pin 1: Peru (Callao / Lima / Arequipa) */}
            <g transform="translate(120, 170)">
              <circle r="12" fill="#10B981" opacity="0.3" className="animate-ping" />
              <circle r="6" fill="#10B981" stroke="#ffffff" strokeWidth="2" />
              <text x="-10" y="-14" fill="#ffffff" fontSize="11" fontWeight="bold" fontFamily="sans-serif" textAnchor="end">
                PERU
              </text>
              <text x="-10" y="0" fill="#B5C9BD" fontSize="9" fontFamily="sans-serif" textAnchor="end">
                Callao / Lima / Arequipa
              </text>
            </g>

            {/* Intermediate Hub: Corredor Bioceânico / Fronteira */}
            <g transform="translate(330, 220)">
              <circle r="4" fill="#F59E0B" stroke="#ffffff" strokeWidth="1.5" />
              <text x="0" y="-10" fill="#FBBF24" fontSize="9" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">
                Corredor Bioceânico
              </text>
              <text x="0" y="16" fill="#9BAEA4" fontSize="8" fontFamily="sans-serif" textAnchor="middle">
                Posto Aduaneiro Transoceânico
              </text>
            </g>

            {/* Key Hub Pin 2: Brazil (Itapetininga & Santos SP) */}
            <g transform="translate(560, 260)">
              <circle r="12" fill="#38BDF8" opacity="0.3" className="animate-ping" />
              <circle r="6" fill="#38BDF8" stroke="#ffffff" strokeWidth="2" />
              <text x="14" y="-8" fill="#ffffff" fontSize="11" fontWeight="bold" fontFamily="sans-serif">
                BRASIL
              </text>
              <text x="14" y="6" fill="#E2E8F0" fontSize="10" fontWeight="bold" fontFamily="sans-serif">
                Itapetininga (SP)
              </text>
              <text x="14" y="18" fill="#94A3B8" fontSize="8" fontFamily="sans-serif">
                Porto de Santos (Canal de Exportação)
              </text>
            </g>

            {/* Animated Moving Truck / Ship Icon along the route */}
            <g transform={`translate(${currentX}, ${currentY})`}>
              <circle r="16" fill="#1A3026" stroke="#34D399" strokeWidth="2" filter="url(#glow)" />
              {activeShipment.transportMode === 'MARITIMO' ? (
                // Ship icon SVG
                <path
                  d="M -7 -2 L 7 -2 L 5 4 L -5 4 Z M -1 -6 L 1 -6 L 1 -2 L -1 -2 Z"
                  fill="#ffffff"
                  transform="translate(0, 1)"
                />
              ) : (
                // Truck icon SVG
                <path
                  d="M -7 -4 L 1 -4 L 4 -1 L 4 3 L -7 3 Z M -4 4 A 1.5 1.5 0 0 1 -4 7 A 1.5 1.5 0 0 1 -4 4 Z M 2 4 A 1.5 1.5 0 0 1 2 7 A 1.5 1.5 0 0 1 2 4 Z"
                  fill="#ffffff"
                />
              )}
            </g>
          </svg>

          {/* Live Progress Hud Overlay */}
          <div className="absolute bottom-3 left-3 bg-[#11221B]/90 backdrop-blur-md border border-[#2E5A44] py-1.5 px-3 rounded-lg text-xs font-mono-num text-[#D1DFD7] flex items-center gap-3">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Carga em trânsito</span>
            </span>
            <span>·</span>
            <span>Coord: {activeShipment.coordinates.lat}, {activeShipment.coordinates.lng}</span>
            <span>·</span>
            <span className="text-emerald-300 font-bold">{animationProgress.toFixed(0)}% da rota percorrida</span>
          </div>
        </div>

        {/* Route Details Timeline */}
        <div className="mt-6 pt-5 border-t border-[#E8E6E1]">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#546E60] mb-4">
            Histórico de Pontos de Passagem & Vistorias Fiscais
          </h4>

          <div className="space-y-4">
            {activeShipment.events.map((ev, index) => (
              <div key={index} className="flex items-start gap-3.5 text-xs">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                    ev.completed
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-[#EAE7DF] text-[#7A8E82]'
                  }`}
                >
                  {ev.completed ? (
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  ) : (
                    <Clock className="w-3.5 h-3.5" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <span className="font-bold text-[#1A3026]">
                      {ev.location} — {ev.description}
                    </span>
                    <span className="font-mono-num text-[11px] text-[#697E72] shrink-0">
                      {ev.date} às {ev.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};
