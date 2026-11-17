import React, { useState } from 'react';
import { 
  X, 
  HelpCircle, 
  PhoneCall, 
  Mail, 
  MapPin, 
  Building2, 
  ShieldCheck, 
  FileText, 
  Download, 
  Code2, 
  Copy, 
  Check, 
  ExternalLink 
} from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-[#D5D0C5] flex flex-col max-h-[85vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="p-5 bg-[#1A3026] text-white flex items-center justify-between border-b border-[#254436]">
          <div className="flex items-center gap-2.5">
            <HelpCircle className="w-5 h-5 text-emerald-400" />
            <h3 className="font-display text-xl font-bold text-white">
              Central de Ajuda & Orientações Aduaneiras
            </h3>
          </div>
          <button onClick={onClose} className="text-[#C5D5CC] hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-4 text-xs text-[#3A5042]">
          <div className="p-3.5 bg-[#F9F8F6] rounded-xl border border-[#E5E1D8]">
            <h4 className="font-bold text-[#1A3026] text-sm mb-1">Como funciona a Plataforma Brapex?</h4>
            <p className="leading-relaxed">
              A Brapex é o portal unificado de comércio exterior para o Sudoeste Paulista, integrando pequenos, médios e grandes produtores da região de Itapetininga ao mercado peruano e à bacia do Pacífico.
            </p>
          </div>

          <div className="p-3.5 bg-[#F9F8F6] rounded-xl border border-[#E5E1D8]">
            <h4 className="font-bold text-[#1A3026] text-sm mb-1">O que é a taxa de R$ 245,00 no Gov.br?</h4>
            <p className="leading-relaxed">
              Trata-se da taxa consular e aduaneira simplificada: R$ 180 (Taxa de Exportação), R$ 45 (Emolumentos Gov) e R$ 20 (Taxa SISCOMEX). Ao pagar via Pix, a confirmação é automática no sistema da Receita Federal.
            </p>
          </div>

          <div className="p-3.5 bg-[#F9F8F6] rounded-xl border border-[#E5E1D8]">
            <h4 className="font-bold text-[#1A3026] text-sm mb-1">Quais são os documentos exigidos para o Acordo ACE 58?</h4>
            <p className="leading-relaxed">
              Para obter 0% de Imposto de Importação, a carga deve possuir a <strong>Invoice Comercial</strong>, o <strong>Certificado de Origem Digital Mercosul-Peru</strong> e o <strong>Laudo Fitossanitário/Qualidade</strong>.
            </p>
          </div>

          <div className="p-3.5 bg-[#F9F8F6] rounded-xl border border-[#E5E1D8]">
            <h4 className="font-bold text-[#1A3026] text-sm mb-1">Prazos de Trânsito</h4>
            <p className="leading-relaxed">
              • <strong>Modal Rodoviário Bioceânico:</strong> 10 a 14 dias.<br />
              • <strong>Modal Marítimo Santos-Callao:</strong> 18 a 22 dias.
            </p>
          </div>
        </div>

        <div className="p-3 bg-[#F1EFEA] border-t border-[#E8E6E1] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#1A3026] text-white text-xs font-semibold rounded-lg"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-[#D5D0C5] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="p-5 bg-[#1A3026] text-white flex items-center justify-between border-b border-[#254436]">
          <div className="flex items-center gap-2.5">
            <PhoneCall className="w-5 h-5 text-emerald-400" />
            <h3 className="font-display text-xl font-bold text-white">
              Contato & Unidades Brapex
            </h3>
          </div>
          <button onClick={onClose} className="text-[#C5D5CC] hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4 text-xs text-[#3A5042]">
          <div className="p-4 bg-[#F9F8F6] rounded-xl border border-[#E5E1D8] space-y-2">
            <div className="flex items-center gap-2 font-bold text-sm text-[#1A3026]">
              <Building2 className="w-4 h-4 text-emerald-700" />
              <span>Sede Regional - Sudoeste Paulista</span>
            </div>
            <div className="flex items-start gap-2 pl-6 text-[#5C7065]">
              <MapPin className="w-4 h-4 text-[#7A8E82] shrink-0 mt-0.5" />
              <span>Av. Prof. Francisco Valter, 1200 - Distrito Industrial, Itapetininga - SP, CEP 18200-000</span>
            </div>
            <div className="flex items-center gap-2 pl-6 text-[#5C7065]">
              <PhoneCall className="w-4 h-4 text-[#7A8E82] shrink-0" />
              <span>(15) 3275-8900 · 0800 722 2727 (Plantão Siscomex)</span>
            </div>
            <div className="flex items-center gap-2 pl-6 text-[#5C7065]">
              <Mail className="w-4 h-4 text-[#7A8E82] shrink-0" />
              <span>operacoes.itapetininga@brapex.com.br</span>
            </div>
          </div>

          <div className="p-4 bg-[#F9F8F6] rounded-xl border border-[#E5E1D8] space-y-2">
            <div className="flex items-center gap-2 font-bold text-sm text-[#1A3026]">
              <Building2 className="w-4 h-4 text-sky-700" />
              <span>Posto Operacional Portuário - Santos</span>
            </div>
            <div className="flex items-start gap-2 pl-6 text-[#5C7065]">
              <MapPin className="w-4 h-4 text-[#7A8E82] shrink-0 mt-0.5" />
              <span>Cais do Saboó, Armazém 32 - Porto de Santos - SP</span>
            </div>
          </div>

          <div className="p-4 bg-[#F9F8F6] rounded-xl border border-[#E5E1D8] space-y-2">
            <div className="flex items-center gap-2 font-bold text-sm text-[#1A3026]">
              <Building2 className="w-4 h-4 text-amber-700" />
              <span>Escritório de Representação Andina - Peru</span>
            </div>
            <div className="flex items-start gap-2 pl-6 text-[#5C7065]">
              <MapPin className="w-4 h-4 text-[#7A8E82] shrink-0 mt-0.5" />
              <span>Av. Elmer Faucett 2823 - Callao / Lima, Peru (SUNAT Aduanas)</span>
            </div>
          </div>
        </div>

        <div className="p-3 bg-[#F1EFEA] border-t border-[#E8E6E1] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#1A3026] text-white text-xs font-semibold rounded-lg"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

interface ExportHtmlModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExportHtmlModal: React.FC<ExportHtmlModalProps> = ({ isOpen, onClose }) => {
  const [downloaded, setDownloaded] = useState(false);

  if (!isOpen) return null;

  const handleDownloadSingleFile = () => {
    // Trigger download of the standalone single-file html bundle
    const link = document.createElement('a');
    link.href = '/brapex_portal.html';
    link.download = 'brapex_portal_single_file.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-[#D5D0C5] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="p-5 bg-[#1A3026] text-white flex items-center justify-between border-b border-[#254436]">
          <div className="flex items-center gap-2.5">
            <Code2 className="w-5 h-5 text-emerald-400" />
            <h3 className="font-display text-xl font-bold text-white">
              Versão em Arquivo Único (HTML + CSS + JS)
            </h3>
          </div>
          <button onClick={onClose} className="text-[#C5D5CC] hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4 text-xs text-[#3A5042]">
          <p className="leading-relaxed">
            Conforme solicitado, geramos uma versão independente do portal <strong>Brapex Importações e Exportações</strong> encapsulada 100% em um único arquivo HTML limpo, contendo CSS embutido e JavaScript moderno sem nenhuma dependência de compilação.
          </p>

          <div className="p-4 bg-[#F9F8F6] rounded-xl border border-[#E5E1D8] space-y-2">
            <div className="font-bold text-[#1A3026] text-sm">Recursos incluídos no arquivo único:</div>
            <ul className="list-disc list-inside space-y-1 text-[#5C7065]">
              <li>Tela de login com imagem portuária e botão Gov.br</li>
              <li>Painel com Inteligência Comercial e Radar de Mercado Mundial</li>
              <li>Conversor interativo Real (R$) ⇄ Sol Peruano (S/)</li>
              <li>Cotações de produtos e alternância de rotas Peru ⇄ Itapetininga</li>
              <li>Fluxo documental com upload e código NCM</li>
              <li>Pagamento com simulação de Pix, QR Code e total de R$ 245,00</li>
              <li>Rastreamento com mapa vetorial e animação de rota</li>
              <li>Chatbot de suporte aduaneiro integrado</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 pt-2">
            <button
              onClick={handleDownloadSingleFile}
              className="flex-1 py-3 px-4 bg-[#1A3026] hover:bg-[#254436] text-white text-xs font-bold rounded-xl transition-colors shadow flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>{downloaded ? 'Download Concluído!' : 'Baixar brapex_portal.html'}</span>
            </button>

            <a
              href="/brapex_portal.html"
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-4 bg-[#EEEDE9] hover:bg-[#E2DFD8] text-[#1A3026] text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Abrir no Navegador</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        <div className="p-3 bg-[#F1EFEA] border-t border-[#E8E6E1] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#DDD9D0] text-[#1A3026] text-xs font-semibold rounded-lg"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
