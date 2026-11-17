import React, { useState } from 'react';
import { Calculator, X, Truck, Ship, Calendar, DollarSign, ArrowRight, MapPin } from 'lucide-react';

interface FreightSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FreightSimulatorModal: React.FC<FreightSimulatorModalProps> = ({
  isOpen,
  onClose
}) => {
  const [weightTons, setWeightTons] = useState<number>(20);
  const [origin, setOrigin] = useState<string>('Itapetininga (SP)');
  const [destination, setDestination] = useState<string>('Callao / Lima (Peru)');
  const [transportMode, setTransportMode] = useState<'RODOVIARIO' | 'MARITIMO'>('MARITIMO');

  if (!isOpen) return null;

  // Pricing formula:
  // Marítimo: US$ 110 / ton + US$ 450 port handling
  // Rodoviário: US$ 165 / ton + US$ 300 customs pass
  const baseRatePerTon = transportMode === 'MARITIMO' ? 110 : 165;
  const fixedCostUsd = transportMode === 'MARITIMO' ? 450 : 300;
  const totalUsd = weightTons * baseRatePerTon + fixedCostUsd;
  const totalBrl = totalUsd * 5.60;
  const transitTime = transportMode === 'MARITIMO' ? '18 a 22 dias' : '10 a 14 dias';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-[#D5D0C5] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 bg-[#1A3026] text-white flex items-center justify-between border-b border-[#254436]">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-300">
              Calculadora Logística Multimodal
            </span>
            <h3 className="font-display text-xl font-bold text-white">
              Simular Frete Internacional
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-[#C5D5CC] hover:text-white p-1 rounded-md"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          
          {/* Origin and Destination */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block text-[#697E72] font-semibold mb-1">Origem:</label>
              <select
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                className="w-full p-2 bg-[#FBFBF9] border border-[#DDD9D0] rounded-lg font-medium text-[#1A3026] outline-none"
              >
                <option value="Itapetininga (SP)">Itapetininga (SP - Hub Regional)</option>
                <option value="Porto de Santos (SP)">Porto de Santos (SP)</option>
                <option value="Callao (Peru)">Porto de Callao (Peru)</option>
                <option value="Arequipa (Peru)">Arequipa (Peru)</option>
              </select>
            </div>

            <div>
              <label className="block text-[#697E72] font-semibold mb-1">Destino:</label>
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full p-2 bg-[#FBFBF9] border border-[#DDD9D0] rounded-lg font-medium text-[#1A3026] outline-none"
              >
                <option value="Callao / Lima (Peru)">Callao / Lima (Peru)</option>
                <option value="Arequipa (Peru)">Arequipa (Peru)</option>
                <option value="Itapetininga (SP)">Itapetininga (SP)</option>
                <option value="Porto de Santos (SP)">Porto de Santos (SP)</option>
              </select>
            </div>
          </div>

          {/* Weight */}
          <div>
            <label className="block text-xs font-semibold text-[#1A3026] mb-1">
              Peso Estimado da Carga (Toneladas):
            </label>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min="1"
                max="100"
                value={weightTons}
                onChange={(e) => setWeightTons(parseInt(e.target.value) || 1)}
                className="flex-1 accent-[#1A3026]"
              />
              <span className="font-mono-num font-bold text-sm text-[#1A3026] min-w-[70px] text-right">
                {weightTons} tons
              </span>
            </div>
          </div>

          {/* Modal Selection */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => setTransportMode('MARITIMO')}
              className={`p-3 rounded-xl border text-left transition-colors ${
                transportMode === 'MARITIMO'
                  ? 'border-[#1A3026] bg-[#1A3026] text-white'
                  : 'border-[#DDD9D0] bg-white text-[#2B4436]'
              }`}
            >
              <Ship className="w-5 h-5 mb-1.5" />
              <div className="font-bold text-xs">Marítimo (Santos ⇄ Callao)</div>
              <div className="text-[10px] opacity-80">Ideal para grandes lotes e granéis</div>
            </button>

            <button
              type="button"
              onClick={() => setTransportMode('RODOVIARIO')}
              className={`p-3 rounded-xl border text-left transition-colors ${
                transportMode === 'RODOVIARIO'
                  ? 'border-[#1A3026] bg-[#1A3026] text-white'
                  : 'border-[#DDD9D0] bg-white text-[#2B4436]'
              }`}
            >
              <Truck className="w-5 h-5 mb-1.5" />
              <div className="font-bold text-xs">Rodoviário Bioceânico</div>
              <div className="text-[10px] opacity-80">Mais rápido via Corredor dos Andes</div>
            </button>
          </div>

          {/* Results Card */}
          <div className="p-4 bg-[#F2F0EB] rounded-xl border border-[#DDD9D0] space-y-2 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-[#697E72]">Prazo Estimado de Viagem:</span>
              <span className="font-bold text-[#1A3026]">{transitTime}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#697E72]">Tarifa Base por Tonelada:</span>
              <span className="font-mono-num font-semibold text-[#1A3026]">US$ {baseRatePerTon} / ton</span>
            </div>
            <div className="flex justify-between items-center border-t border-[#DDD9D0] pt-2">
              <span className="font-bold text-sm text-[#1A3026]">Estimativa Total:</span>
              <div className="text-right">
                <div className="font-mono-num font-bold text-base text-[#1A3026]">
                  US$ {totalUsd.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
                <div className="text-[11px] font-mono-num text-emerald-800 font-semibold">
                  ≈ R$ {totalBrl.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#F1EFEA] border-t border-[#E8E6E1] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#1A3026] hover:bg-[#254436] text-white text-xs font-semibold rounded-lg transition-colors"
          >
            Concluir Simulação
          </button>
        </div>

      </div>
    </div>
  );
};
