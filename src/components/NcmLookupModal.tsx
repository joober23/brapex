import React, { useState } from 'react';
import { Search, X, CheckCircle2, ShieldCheck, Tag, ExternalLink } from 'lucide-react';
import { NCM_DATABASE } from '../data/mockData';

interface NcmLookupModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
  onSelectNcm?: (ncm: string) => void;
}

export const NcmLookupModal: React.FC<NcmLookupModalProps> = ({
  isOpen,
  onClose,
  initialQuery = '',
  onSelectNcm
}) => {
  const [query, setQuery] = useState(initialQuery);

  if (!isOpen) return null;

  const filtered = NCM_DATABASE.filter(
    (item) =>
      item.code.includes(query) ||
      item.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-[#D5D0C5] flex flex-col max-h-[85vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="p-5 bg-[#1A3026] text-white flex items-center justify-between border-b border-[#254436]">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-300">
              Tabela Tarifária Siscomex & Mercosul
            </span>
            <h3 className="font-display text-xl font-bold text-white">
              Consulta de Classificação Fiscal (NCM)
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-[#C5D5CC] hover:text-white p-1 rounded-md"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 bg-[#FBFBF9] border-b border-[#E8E6E1]">
          <div className="relative">
            <Search className="w-4 h-4 text-[#7A8E82] absolute left-3.5 top-3" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Digite o código NCM ou nome do produto (ex: 7200, 7403, ferro, cobre, alho, milho)..."
              className="w-full pl-10 pr-4 py-2 bg-white border border-[#DDD9D0] rounded-xl text-xs sm:text-sm text-[#1A3026] outline-none focus:border-[#1A3026] focus:ring-1 focus:ring-[#1A3026]"
              autoFocus
            />
          </div>
          <div className="flex items-center gap-2 mt-2 text-[11px] text-[#697E72]">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Regras do Acordo ACE 58 Brasil-Peru: Isenção de I.I. para mais de 98% dos itens.</span>
          </div>
        </div>

        {/* Results Table */}
        <div className="flex-1 overflow-y-auto p-4">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#E8E6E1] text-[#697E72] font-semibold">
                <th className="pb-2 pl-2">Código NCM</th>
                <th className="pb-2">Descrição Mercadoria</th>
                <th className="pb-2 text-right">I.I. Padrão</th>
                <th className="pb-2 text-right">Acordo Brasil-Peru</th>
                <th className="pb-2 text-center pr-2">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EFECE6]">
              {filtered.map((item) => (
                <tr key={item.code} className="hover:bg-[#F9F8F6] transition-colors">
                  <td className="py-3 pl-2 font-mono-num font-bold text-[#1A3026]">
                    {item.code}
                  </td>
                  <td className="py-3 pr-2 text-[#3A5042] font-medium max-w-[240px]">
                    {item.name}
                  </td>
                  <td className="py-3 text-right font-mono-num text-[#697E72]">
                    {item.ii}
                  </td>
                  <td className="py-3 text-right font-mono-num font-semibold text-emerald-700">
                    {item.ace58}
                  </td>
                  <td className="py-3 text-center pr-2">
                    <button
                      onClick={() => {
                        if (onSelectNcm) onSelectNcm(item.code);
                        onClose();
                      }}
                      className="px-2.5 py-1 bg-[#1A3026] hover:bg-[#254436] text-white text-[11px] font-semibold rounded-md transition-colors"
                    >
                      Usar NCM
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div className="p-8 text-center text-[#697E72]">
              Nenhum código NCM encontrado para "{query}". Tente buscar por termos mais genéricos.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#F1EFEA] border-t border-[#E8E6E1] text-right">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#DDD9D0] hover:bg-[#CDC8BD] text-[#1A3026] text-xs font-semibold rounded-lg transition-colors"
          >
            Fechar Consulta
          </button>
        </div>

      </div>
    </div>
  );
};
