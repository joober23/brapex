import React, { useState } from 'react';
import { 
  FileText, 
  UploadCloud, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  ArrowRight, 
  AlertCircle, 
  FileCheck, 
  Building, 
  Truck, 
  Trash2,
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import { ProductItem, PRODUCTS_CATALOG } from '../data/mockData';

interface DocumentExportWorkflowProps {
  selectedProduct: ProductItem;
  onProceedToPayment: (workflowData: ExportWorkflowData) => void;
  onOpenNcmDetails: (ncm: string) => void;
}

export interface DocumentAttachment {
  id: string;
  name: string;
  status: 'PENDENTE' | 'UPLOADING' | 'ANEXADO';
  fileName?: string;
  fileSize?: string;
  uploadDate?: string;
  required: boolean;
}

export interface ExportWorkflowData {
  product: ProductItem;
  quantityKg: number;
  originCountry: string;
  originCity: string;
  destinationCountry: string;
  destinationCity: string;
  transportMode: 'RODOVIARIO' | 'MARITIMO';
  incoterm: 'FOB' | 'CIF' | 'DAP';
  documents: DocumentAttachment[];
  subtotalGoodsBrl: number;
  govFeeBrl: number;
}

export const DocumentExportWorkflow: React.FC<DocumentExportWorkflowProps> = ({
  selectedProduct,
  onProceedToPayment,
  onOpenNcmDetails
}) => {
  const [product, setProduct] = useState<ProductItem>(selectedProduct || PRODUCTS_CATALOG[0]);
  const [quantityKg, setQuantityKg] = useState<number>(15000); // 15 tons
  const [originCountry, setOriginCountry] = useState<string>(
    product.routeType === 'PE_TO_ITP' ? 'Peru' : 'Brasil'
  );
  const [originCity, setOriginCity] = useState<string>(
    product.routeType === 'PE_TO_ITP' ? 'Callao / Arequipa' : 'Itapetininga (SP)'
  );
  const [destinationCountry, setDestinationCountry] = useState<string>(
    product.routeType === 'PE_TO_ITP' ? 'Brasil' : 'Peru'
  );
  const [destinationCity, setDestinationCity] = useState<string>(
    product.routeType === 'PE_TO_ITP' ? 'Itapetininga (SP)' : 'Lima / Callao'
  );
  const [transportMode, setTransportMode] = useState<'RODOVIARIO' | 'MARITIMO'>('MARITIMO');
  const [incoterm, setIncoterm] = useState<'FOB' | 'CIF' | 'DAP'>('CIF');

  // Documents state
  const [documents, setDocuments] = useState<DocumentAttachment[]>([
    {
      id: 'doc-invoice',
      name: 'Invoice Comercial (Fatura Comercial Proforma)',
      status: 'PENDENTE',
      required: true
    },
    {
      id: 'doc-origin',
      name: 'Certificado de Origem Digital (ACE 58 Brasil-Peru)',
      status: 'PENDENTE',
      required: true
    },
    {
      id: 'doc-quality',
      name: 'Certificado de Qualidade / Fitossanitário (MAPA / SENASA)',
      status: 'PENDENTE',
      required: true
    },
    {
      id: 'doc-bill',
      name: 'Conhecimento de Transporte Internacional (BL / CRT Rodoviário)',
      status: 'PENDENTE',
      required: false
    }
  ]);

  const [uploadingDocId, setUploadingDocId] = useState<string | null>(null);

  // Simulated upload handler
  const handleAttachDocument = (docId: string) => {
    setUploadingDocId(docId);
    
    // Simulate realistic async upload progress
    setTimeout(() => {
      setDocuments((prev) =>
        prev.map((doc) => {
          if (doc.id === docId) {
            const sampleNames: Record<string, string> = {
              'doc-invoice': `INVOICE_PROFORMA_${product.ncm.replace(/\./g, '')}_2026.pdf`,
              'doc-origin': `CERTIFICADO_ORIGEM_ACE58_BRPE_${Date.now().toString().slice(-4)}.pdf`,
              'doc-quality': `LAUDO_CONFORMIDADE_MAPA_SENASA.pdf`,
              'doc-bill': `CONHECIMENTO_TRANSPORTE_INTERMODAL.pdf`
            };
            return {
              ...doc,
              status: 'ANEXADO',
              fileName: sampleNames[doc.id] || 'documento_homologado.pdf',
              fileSize: '1.4 MB',
              uploadDate: 'Hoje às 11:24'
            };
          }
          return doc;
        })
      );
      setUploadingDocId(null);
    }, 600);
  };

  const handleRemoveDocument = (docId: string) => {
    setDocuments((prev) =>
      prev.map((doc) => {
        if (doc.id === docId) {
          return {
            ...doc,
            status: 'PENDENTE',
            fileName: undefined,
            fileSize: undefined,
            uploadDate: undefined
          };
        }
        return doc;
      })
    );
  };

  const allRequiredAttached = documents
    .filter((d) => d.required)
    .every((d) => d.status === 'ANEXADO');

  const handleFinishAndPay = () => {
    // If not all documents attached, optionally allow auto-attaching for convenience or proceed
    const payload: ExportWorkflowData = {
      product,
      quantityKg,
      originCountry,
      originCity,
      destinationCountry,
      destinationCity,
      transportMode,
      incoterm,
      documents,
      subtotalGoodsBrl: (quantityKg / 1000) * product.pricePerUnit * 5.6, // estimated
      govFeeBrl: 245.00
    };
    onProceedToPayment(payload);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="bg-white rounded-2xl border border-[#E5E1D8] p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider">
              <span>Etapa 2 · Despacho e Conformidade Aduaneira</span>
              <span>·</span>
              <span className="text-[#697E72] font-normal">Siscomex Integrado</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#1A3026] mt-1">
              Fluxo Documental & Processo de Exportação
            </h1>
            <p className="text-xs text-[#5C7065] mt-1">
              Valide as especificações de carga, códigos tributários e anexe os certificados obrigatórios para emissão da guia de recolhimento Gov.br.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-[#F1EFEA] px-3.5 py-2 rounded-xl text-xs font-medium text-[#1A3026] shrink-0 self-start md:self-auto">
            <span>Status Geral:</span>
            <span className="font-bold text-amber-700">Aguardando Documentação & Pagamento</span>
          </div>
        </div>
      </div>

      {/* Grid: Item Details & Input Fields */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Detalhes do Item Selecionado e NCM Vinculado */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-white rounded-2xl border border-[#E5E1D8] p-6 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                Item Selecionado para Despacho
              </span>
              <button
                onClick={() => onOpenNcmDetails(product.ncm)}
                className="text-xs font-mono-num font-bold text-[#1A3026] bg-[#EEEDE9] hover:bg-[#E2E0D8] px-2 py-0.5 rounded transition-colors"
                title="Consultar Alíquota e Isenção ACE 58"
              >
                NCM: {product.ncm}
              </button>
            </div>

            <h2 className="font-display text-xl font-bold text-[#1A3026]">
              {product.name}
            </h2>

            <p className="text-xs text-[#5C7065] mt-1">
              {product.description}
            </p>

            <div className="mt-4 p-3 bg-[#FBFBF9] rounded-xl border border-[#EBE8E0] space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-[#697E72]">Classificação Oficial:</span>
                <span className="font-medium text-[#1A3026] text-right max-w-[220px]">{product.ncmDescription}</span>
              </div>
              <div className="flex justify-between border-t border-[#EFECE6] pt-1.5">
                <span className="text-[#697E72]">Fornecedor Credenciado:</span>
                <span className="font-semibold text-[#1A3026]">{product.supplier}</span>
              </div>
              <div className="flex justify-between border-t border-[#EFECE6] pt-1.5">
                <span className="text-[#697E72]">Benefício Fiscal Bilateral:</span>
                <span className="font-semibold text-emerald-700">{product.taxBenefit}</span>
              </div>
              <div className="flex justify-between border-t border-[#EFECE6] pt-1.5">
                <span className="text-[#697E72]">Preço Unitário de Referência:</span>
                <span className="font-mono-num font-bold text-[#1A3026]">
                  {product.currency} {product.pricePerUnit.toLocaleString('pt-BR')} / {product.unit}
                </span>
              </div>
            </div>

            {/* Change product selector */}
            <div className="mt-4">
              <label className="text-[11px] font-semibold text-[#697E72] block mb-1">
                Trocar item selecionado:
              </label>
              <select
                value={product.id}
                onChange={(e) => {
                  const found = PRODUCTS_CATALOG.find((p) => p.id === e.target.value);
                  if (found) {
                    setProduct(found);
                    if (found.routeType === 'PE_TO_ITP') {
                      setOriginCountry('Peru');
                      setOriginCity('Callao / Arequipa');
                      setDestinationCountry('Brasil');
                      setDestinationCity('Itapetininga (SP)');
                    } else {
                      setOriginCountry('Brasil');
                      setOriginCity('Itapetininga (SP)');
                      setDestinationCountry('Peru');
                      setDestinationCity('Lima / Callao');
                    }
                  }
                }}
                className="w-full text-xs p-2 bg-[#F1EFEA] border border-[#DDD9D0] rounded-lg font-medium text-[#1A3026] outline-none"
              >
                {PRODUCTS_CATALOG.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} (NCM {p.ncm})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Incoterm & Transport Mode */}
          <div className="bg-white rounded-2xl border border-[#E5E1D8] p-5 shadow-sm space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#546E60]">
              Logística & Modalidade de Embarque
            </h3>
            
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setTransportMode('MARITIMO')}
                className={`p-2.5 rounded-lg border text-left transition-colors ${
                  transportMode === 'MARITIMO'
                    ? 'border-[#1A3026] bg-[#1A3026] text-white'
                    : 'border-[#E0DCD3] bg-white text-[#2B4436]'
                }`}
              >
                <div className="font-bold">Marítimo Internacional</div>
                <div className="text-[10px] opacity-80">Santos ⇄ Callao (18-22 dias)</div>
              </button>

              <button
                type="button"
                onClick={() => setTransportMode('RODOVIARIO')}
                className={`p-2.5 rounded-lg border text-left transition-colors ${
                  transportMode === 'RODOVIARIO'
                    ? 'border-[#1A3026] bg-[#1A3026] text-white'
                    : 'border-[#E0DCD3] bg-white text-[#2B4436]'
                }`}
              >
                <div className="font-bold">Rodoviário Bioceânico</div>
                <div className="text-[10px] opacity-80">Itapetininga ⇄ Andes (10-14 dias)</div>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Campos de Entrada e Seção de Anexos */}
        <div className="lg:col-span-7 space-y-5">
          
          {/* Campos de Entrada: Quantidade (kg), País de Origem e País de Destino */}
          <div className="bg-white rounded-2xl border border-[#E5E1D8] p-6 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#546E60] mb-4">
              Parâmetros de Carga & Declaração de Rota
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Quantidade (kg) */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-[#1A3026] uppercase tracking-wider mb-1.5">
                  Quantidade da Carga (kg):
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="100"
                    step="500"
                    value={quantityKg}
                    onChange={(e) => setQuantityKg(Math.max(1, parseFloat(e.target.value) || 0))}
                    className="w-full pl-3.5 pr-20 py-2.5 bg-[#FBFBF9] border border-[#DDD9D0] rounded-xl font-mono-num text-base font-bold text-[#1A3026] focus:border-[#1A3026] focus:ring-1 focus:ring-[#1A3026] outline-none"
                  />
                  <div className="absolute right-3.5 top-2.5 text-xs font-medium text-[#697E72]">
                    = {(quantityKg / 1000).toFixed(1)} toneladas
                  </div>
                </div>
              </div>

              {/* País e Cidade de Origem */}
              <div>
                <label className="block text-xs font-bold text-[#1A3026] uppercase tracking-wider mb-1.5">
                  País de Origem:
                </label>
                <select
                  value={originCountry}
                  onChange={(e) => setOriginCountry(e.target.value)}
                  className="w-full py-2.5 px-3 bg-[#FBFBF9] border border-[#DDD9D0] rounded-xl text-xs font-medium text-[#1A3026] outline-none"
                >
                  <option value="Peru">Peru (Alfandega de Callao / Arequipa)</option>
                  <option value="Brasil">Brasil (Alfandega de Santos / Itapetininga)</option>
                </select>
                <input
                  type="text"
                  placeholder="Cidade / Polo de Origem"
                  value={originCity}
                  onChange={(e) => setOriginCity(e.target.value)}
                  className="w-full mt-2 py-1.5 px-3 bg-[#FBFBF9] border border-[#DDD9D0] rounded-lg text-xs text-[#1A3026] outline-none"
                />
              </div>

              {/* País e Cidade de Destino */}
              <div>
                <label className="block text-xs font-bold text-[#1A3026] uppercase tracking-wider mb-1.5">
                  País de Destino:
                </label>
                <select
                  value={destinationCountry}
                  onChange={(e) => setDestinationCountry(e.target.value)}
                  className="w-full py-2.5 px-3 bg-[#FBFBF9] border border-[#DDD9D0] rounded-xl text-xs font-medium text-[#1A3026] outline-none"
                >
                  <option value="Brasil">Brasil (Itapetininga / Sudoeste Paulista)</option>
                  <option value="Peru">Peru (Lima / Callao / Trujillo)</option>
                </select>
                <input
                  type="text"
                  placeholder="Cidade / Centro de Distribuição"
                  value={destinationCity}
                  onChange={(e) => setDestinationCity(e.target.value)}
                  className="w-full mt-2 py-1.5 px-3 bg-[#FBFBF9] border border-[#DDD9D0] rounded-lg text-xs text-[#1A3026] outline-none"
                />
              </div>
            </div>
          </div>

          {/* Seção de Anexos de Documentos (Requisito Explícito) */}
          <div className="bg-white rounded-2xl border border-[#E5E1D8] p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#546E60]">
                  Anexos Obrigatórios & Vistoria Documental
                </h3>
                <p className="text-xs text-[#697E72] mt-0.5">
                  Documentação exigida pelas autoridades aduaneiras (Receita Federal / SUNAT).
                </p>
              </div>

              {/* Quick attach all button */}
              <button
                type="button"
                onClick={() => {
                  documents.forEach((d) => handleAttachDocument(d.id));
                }}
                className="text-[11px] font-semibold text-emerald-800 hover:text-emerald-950 underline shrink-0"
              >
                Simular Anexo em Lote
              </button>
            </div>

            <div className="space-y-3">
              {documents.map((doc) => {
                const isUploading = uploadingDocId === doc.id;
                const isAttached = doc.status === 'ANEXADO';

                return (
                  <div
                    key={doc.id}
                    className={`p-3.5 rounded-xl border transition-all ${
                      isAttached
                        ? 'bg-emerald-50/60 border-emerald-300'
                        : 'bg-[#FBFBF9] border-[#E5E1D8]'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-start gap-3 min-w-0">
                        <div
                          className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                            isAttached
                              ? 'bg-emerald-600 text-white'
                              : 'bg-[#EAE7DF] text-[#697E72]'
                          }`}
                        >
                          {isAttached ? (
                            <CheckCircle2 className="w-5 h-5" />
                          ) : isUploading ? (
                            <RefreshCw className="w-5 h-5 animate-spin text-[#1A3026]" />
                          ) : (
                            <FileText className="w-5 h-5" />
                          )}
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-xs sm:text-sm text-[#1A3026]">
                              {doc.name}
                            </span>
                            {doc.required && (
                              <span className="text-[10px] text-red-600 font-bold uppercase">
                                *Obrigatório
                              </span>
                            )}
                          </div>

                          {isAttached ? (
                            <div className="flex items-center gap-2 text-[11px] text-emerald-800 mt-0.5">
                              <span className="font-mono-num font-medium">{doc.fileName}</span>
                              <span>·</span>
                              <span>{doc.fileSize}</span>
                              <span>·</span>
                              <span className="text-emerald-700 font-semibold">Anexado com sucesso</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1.5 text-[11px] text-amber-700 mt-0.5">
                              <Clock className="w-3.5 h-3.5 shrink-0" />
                              <span>Status: Pendente de envio</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Attach / Remove Button */}
                      <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                        {isAttached ? (
                          <button
                            type="button"
                            onClick={() => handleRemoveDocument(doc.id)}
                            className="p-1.5 text-[#7A8E82] hover:text-red-600 rounded transition-colors"
                            title="Remover anexo"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleAttachDocument(doc.id)}
                            disabled={isUploading}
                            className="px-3 py-1.5 bg-[#1A3026] hover:bg-[#254436] text-white text-xs font-semibold rounded-lg transition-colors shadow-2xs flex items-center gap-1.5 whitespace-nowrap"
                          >
                            <UploadCloud className="w-3.5 h-3.5" />
                            <span>{isUploading ? 'Enviando...' : 'Anexar arquivo'}</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Validation Callout */}
            {!allRequiredAttached && (
              <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2.5 text-xs text-amber-900">
                <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Atenção ao despacho aduaneiro:</span> Anexe os 3 documentos obrigatórios acima para garantir a isenção tributária integral do Acordo Brasil-Peru (ACE 58) e liberar o pagamento Gov.br.
                </div>
              </div>
            )}
          </div>

          {/* Botão Finalizador: IR PARA PAGAMENTO (GOV.BR) */}
          <div className="bg-[#1A3026] text-white rounded-2xl p-6 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs text-[#B5C9BD] font-medium">
                Próxima Etapa: Emissão de Guias e Emolumentos Aduaneiros
              </div>
              <div className="font-display text-xl font-bold text-white mt-0.5">
                Taxa de Registro & Despacho: R$ 245,00
              </div>
              <div className="text-[11px] text-[#A8BEB1] mt-0.5">
                Taxa de Exportação (R$ 180) + Emolumentos GOV (R$ 45) + Taxa SISCOMEX (R$ 20)
              </div>
            </div>

            <button
              type="button"
              onClick={handleFinishAndPay}
              className="py-3 px-6 bg-[#1351B4] hover:bg-[#0c3e8e] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 shrink-0 active:scale-[0.99]"
            >
              <span>IR PARA PAGAMENTO (GOV.BR)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
