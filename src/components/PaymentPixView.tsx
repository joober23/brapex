import React, { useState, useEffect } from 'react';
import { 
  QrCode, 
  Copy, 
  Check, 
  Clock, 
  FileCheck2, 
  ShieldCheck, 
  ArrowRight, 
  Barcode, 
  Download, 
  Smartphone,
  ExternalLink,
  Receipt,
  Sparkles,
  Building2
} from 'lucide-react';
import { ExportWorkflowData } from './DocumentExportWorkflow';

interface PaymentPixViewProps {
  workflowData?: ExportWorkflowData;
  onPaymentSuccess: (trackingCode: string) => void;
  onBackToWorkflow: () => void;
}

export const PaymentPixView: React.FC<PaymentPixViewProps> = ({
  workflowData,
  onPaymentSuccess,
  onBackToWorkflow
}) => {
  const [activePaymentTab, setActivePaymentTab] = useState<'pix' | 'qrcode' | 'boleto'>('pix');
  const [copied, setCopied] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(899); // 14:59 min
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);

  // Simulated Pix Code in Brazilian Central Bank EMV standard format
  const pixCopiaECola = 
    '00020126580014br.gov.bcb.pix0136brapex-receita-gov@tesouro.gov.br5204000053039865406245.005802BR5925BRAPEX LOGISTICA ITAPETI6009SAO PAULO62140510BRAPEX2026630487E1';

  // Timer countdown
  useEffect(() => {
    if (secondsRemaining <= 0 || paymentDone) return;
    const interval = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [secondsRemaining, paymentDone]);

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleCopyPix = () => {
    navigator.clipboard?.writeText(pixCopiaECola);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSimulatePaymentApproval = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentDone(true);
      setTimeout(() => {
        onPaymentSuccess('BRAPEX2026');
      }, 1200);
    }, 1000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="bg-white rounded-2xl border border-[#E5E1D8] p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider">
              <span>Etapa 3 · Liquidação de Taxas Aduaneiras</span>
              <span>·</span>
              <span className="text-[#697E72] font-normal">Sincronizado com Gov.br & Tesouro Nacional</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#1A3026] mt-1">
              Pagamento & Simulação Pix
            </h1>
            <p className="text-xs text-[#5C7065] mt-1">
              Guia oficial de recolhimento de taxas de exportação, emolumentos e serviços aduaneiros vinculados ao Siscomex.
            </p>
          </div>

          <button
            onClick={onBackToWorkflow}
            className="text-xs text-[#5C7065] hover:text-[#1A3026] underline self-start md:self-auto"
          >
            ← Voltar ao Fluxo Documental
          </button>
        </div>
      </div>

      {/* Main Grid: Payment Details & Tabs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Resumo do Valor Detalhado (Requisito Explícito) */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-white rounded-2xl border border-[#E5E1D8] p-6 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-[#E8E6E1]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#1351B4] text-white flex items-center justify-center font-bold text-xs">
                  G
                </div>
                <div>
                  <h3 className="font-bold text-xs uppercase text-[#1A3026]">Receita Federal / Siscomex</h3>
                  <p className="text-[11px] text-[#697E72]">Protocolo: BRAPEX-2026-ITP-09</p>
                </div>
              </div>
              <span className="text-[10px] font-mono-num bg-amber-100 text-amber-900 px-2 py-0.5 rounded font-semibold">
                Aguardando Pagamento
              </span>
            </div>

            {/* Fee Breakdown (R$ 180 + R$ 45 + R$ 20 = R$ 245) */}
            <div className="mt-5 space-y-3 text-xs">
              <div className="flex items-center justify-between text-[#3F5448]">
                <span>Taxa de Exportação (Despacho Aduaneiro):</span>
                <span className="font-mono-num font-semibold text-[#1A3026]">R$ 180,00</span>
              </div>

              <div className="flex items-center justify-between text-[#3F5448]">
                <span>Emolumentos GOV (Receita / MAPA):</span>
                <span className="font-mono-num font-semibold text-[#1A3026]">R$ 45,00</span>
              </div>

              <div className="flex items-center justify-between text-[#3F5448]">
                <span>Taxa de Serviço SISCOMEX:</span>
                <span className="font-mono-num font-semibold text-[#1A3026]">R$ 20,00</span>
              </div>

              {/* Total Banner */}
              <div className="pt-4 border-t border-[#E8E6E1] flex items-center justify-between">
                <div>
                  <span className="font-bold text-sm text-[#1A3026]">Valor Total a Pagar:</span>
                  <p className="text-[10px] text-[#697E72]">Liquidação imediata via Banco Central</p>
                </div>
                <div className="text-right">
                  <span className="font-display text-2xl sm:text-3xl font-bold text-emerald-800">
                    R$ 245,00
                  </span>
                </div>
              </div>
            </div>

            {/* Workflow cargo context */}
            <div className="mt-5 p-3.5 bg-[#FBFBF9] rounded-xl border border-[#EBE8E0] text-[11px] space-y-1.5 text-[#5C7065]">
              <div className="flex justify-between">
                <span>Mercadoria Vinculada:</span>
                <span className="font-semibold text-[#1A3026]">
                  {workflowData?.product?.name || 'Cobre Eletrolítico (Catodos)'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Classificação NCM:</span>
                <span className="font-mono-num font-bold text-[#1A3026]">
                  {workflowData?.product?.ncm || '7403.11.00'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Rota Declarada:</span>
                <span className="font-medium text-[#1A3026]">
                  {workflowData?.originCity || 'Callao (Peru)'} ➔ {workflowData?.destinationCity || 'Itapetininga (SP)'}
                </span>
              </div>
            </div>

            {/* Security Notice */}
            <div className="mt-5 pt-3 border-t border-[#E8E6E1] flex items-center gap-2 text-[11px] text-[#697E72]">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Garantia de estorno automático em caso de inconsistência de manifesto.</span>
            </div>
          </div>
        </div>

        {/* Right Column: Abas de Pagamento (Pix, QR Code, Boleto) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-[#E5E1D8] p-6 shadow-sm flex flex-col justify-between">
          <div>
            {/* Tabs Selector */}
            <div className="flex items-center gap-1 p-1 bg-[#F1EFEA] rounded-xl mb-6">
              <button
                onClick={() => setActivePaymentTab('pix')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                  activePaymentTab === 'pix'
                    ? 'bg-[#1A3026] text-white shadow-sm'
                    : 'text-[#5C7065] hover:text-[#1A3026]'
                }`}
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>Pague com Pix</span>
              </button>

              <button
                onClick={() => setActivePaymentTab('qrcode')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                  activePaymentTab === 'qrcode'
                    ? 'bg-[#1A3026] text-white shadow-sm'
                    : 'text-[#5C7065] hover:text-[#1A3026]'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>QR Code App</span>
              </button>

              <button
                onClick={() => setActivePaymentTab('boleto')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                  activePaymentTab === 'boleto'
                    ? 'bg-[#1A3026] text-white shadow-sm'
                    : 'text-[#5C7065] hover:text-[#1A3026]'
                }`}
              >
                <Barcode className="w-3.5 h-3.5" />
                <span>Boleto / GRU</span>
              </button>
            </div>

            {/* TAB 1: Pague com Pix (Destaque Principal) */}
            {activePaymentTab === 'pix' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="flex flex-col sm:flex-row items-center gap-6 p-5 bg-[#FBFBF9] rounded-2xl border border-[#EBE8E0]">
                  
                  {/* Visual Stylized QR Code SVG */}
                  <div className="p-3 bg-white rounded-xl border border-[#DDD9D0] shadow-sm flex flex-col items-center shrink-0">
                    <svg
                      viewBox="0 0 160 160"
                      className="w-36 h-36"
                      shapeRendering="crispEdges"
                    >
                      {/* Stylized QR Code matrix elements */}
                      <rect width="160" height="160" fill="#ffffff" />
                      {/* Top-Left Position Detection Pattern */}
                      <rect x="10" y="10" width="40" height="40" fill="#1A3026" rx="4" />
                      <rect x="16" y="16" width="28" height="28" fill="#ffffff" rx="2" />
                      <rect x="22" y="22" width="16" height="16" fill="#1A3026" rx="2" />
                      
                      {/* Top-Right Position Detection Pattern */}
                      <rect x="110" y="10" width="40" height="40" fill="#1A3026" rx="4" />
                      <rect x="116" y="16" width="28" height="28" fill="#ffffff" rx="2" />
                      <rect x="122" y="22" width="16" height="16" fill="#1A3026" rx="2" />

                      {/* Bottom-Left Position Detection Pattern */}
                      <rect x="10" y="110" width="40" height="40" fill="#1A3026" rx="4" />
                      <rect x="16" y="116" width="28" height="28" fill="#ffffff" rx="2" />
                      <rect x="22" y="122" width="16" height="16" fill="#1A3026" rx="2" />

                      {/* Internal Data Dots & Patterns */}
                      <rect x="58" y="14" width="8" height="8" fill="#1A3026" />
                      <rect x="74" y="14" width="8" height="8" fill="#1A3026" />
                      <rect x="90" y="14" width="8" height="8" fill="#1A3026" />
                      
                      <rect x="58" y="30" width="12" height="6" fill="#1A3026" />
                      <rect x="80" y="30" width="18" height="6" fill="#1A3026" />
                      
                      <rect x="14" y="58" width="8" height="8" fill="#1A3026" />
                      <rect x="30" y="58" width="16" height="8" fill="#1A3026" />
                      <rect x="54" y="54" width="10" height="10" fill="#1A3026" />
                      <rect x="70" y="54" width="18" height="8" fill="#1A3026" />
                      <rect x="94" y="54" width="14" height="10" fill="#1A3026" />
                      <rect x="116" y="58" width="8" height="8" fill="#1A3026" />
                      <rect x="134" y="58" width="14" height="8" fill="#1A3026" />

                      {/* Center Brand Badge */}
                      <rect x="62" y="62" width="36" height="36" fill="#1A3026" rx="6" />
                      <text x="80" y="84" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                        PIX
                      </text>

                      {/* Lower Pattern */}
                      <rect x="56" y="106" width="14" height="8" fill="#1A3026" />
                      <rect x="76" y="106" width="16" height="8" fill="#1A3026" />
                      <rect x="100" y="100" width="10" height="14" fill="#1A3026" />
                      <rect x="118" y="100" width="12" height="8" fill="#1A3026" />
                      <rect x="136" y="106" width="14" height="8" fill="#1A3026" />

                      <rect x="56" y="124" width="24" height="8" fill="#1A3026" />
                      <rect x="88" y="124" width="12" height="14" fill="#1A3026" />
                      <rect x="108" y="120" width="20" height="10" fill="#1A3026" />
                      <rect x="136" y="124" width="12" height="14" fill="#1A3026" />
                    </svg>

                    <div className="mt-1 text-[10px] font-mono-num font-semibold text-[#1A3026]">
                      R$ 245,00
                    </div>
                  </div>

                  {/* Instructions & Timer */}
                  <div className="flex-1 space-y-3 text-center sm:text-left">
                    <div>
                      <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-semibold text-emerald-800">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Código válido por:</span>
                        <span className="font-mono-num font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">
                          {formatTimer(secondsRemaining)}
                        </span>
                      </div>
                      <h4 className="font-bold text-sm text-[#1A3026] mt-1">
                        Pague instantaneamente com o Pix do seu banco
                      </h4>
                      <p className="text-xs text-[#5C7065] mt-0.5">
                        Abra o app do seu banco, escolha a opção Pix e escaneie o QR Code ao lado ou copie a chave Pix abaixo.
                      </p>
                    </div>

                    {/* Copiar Código Pix */}
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          readOnly
                          value={pixCopiaECola}
                          className="w-full text-[11px] font-mono-num py-2 px-3 bg-white border border-[#DDD9D0] rounded-lg text-[#5C7065] select-all outline-none"
                        />
                        <button
                          type="button"
                          onClick={handleCopyPix}
                          className={`py-2 px-3.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap shadow-2xs ${
                            copied
                              ? 'bg-emerald-600 text-white'
                              : 'bg-[#1A3026] hover:bg-[#254436] text-white'
                          }`}
                        >
                          {copied ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Copiado!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copiar Código Pix</span>
                            </>
                          )}
                        </button>
                      </div>
                      {copied && (
                        <p className="text-[11px] text-emerald-700 font-medium">
                          ✓ Código Pix copiado para a área de transferência!
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Instant Simulation Action */}
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="font-bold text-xs text-emerald-950">
                      Ambiente de Teste / Demonstração:
                    </div>
                    <div className="text-[11px] text-emerald-800">
                      Simule a liquidação imediata da taxa de R$ 245,00 para aprovar a carga e liberar o rastreamento.
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleSimulatePaymentApproval}
                    disabled={isProcessing || paymentDone}
                    className="py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-2 shadow shrink-0"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Confirmando no Banco Central...</span>
                      </>
                    ) : paymentDone ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Pagamento Aprovado!</span>
                      </>
                    ) : (
                      <>
                        <Receipt className="w-3.5 h-3.5" />
                        <span>Simular Confirmação Pix (R$ 245)</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* TAB 2: QR Code no App */}
            {activePaymentTab === 'qrcode' && (
              <div className="space-y-4 animate-in fade-in duration-200 p-4 bg-[#FBFBF9] rounded-xl border border-[#EBE8E0] text-xs text-[#3F5448]">
                <h4 className="font-bold text-sm text-[#1A3026]">Como pagar pelo App do seu Banco:</h4>
                <ol className="list-decimal list-inside space-y-2">
                  <li>Acesse o aplicativo do seu banco (Banco do Brasil, Itaú, Bradesco, Santander, Caixa, Nubank, etc.).</li>
                  <li>Selecione a área <strong>Pix</strong> e toque em <strong>Ler QR Code</strong>.</li>
                  <li>Aponte a câmera do seu celular para a tela e confirme o valor de <strong>R$ 245,00</strong> direcionado à <em>Brapex / Receita Federal</em>.</li>
                  <li>A aprovação é reconhecida pelo sistema em até 10 segundos.</li>
                </ol>
                <div className="pt-2">
                  <button
                    onClick={() => setActivePaymentTab('pix')}
                    className="text-xs font-semibold text-emerald-800 hover:underline"
                  >
                    ← Voltar para a visualização do QR Code
                  </button>
                </div>
              </div>
            )}

            {/* TAB 3: Boleto Bancário / GRU */}
            {activePaymentTab === 'boleto' && (
              <div className="space-y-4 animate-in fade-in duration-200 p-4 bg-[#FBFBF9] rounded-xl border border-[#EBE8E0]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-xs text-[#1A3026]">
                    <Barcode className="w-4 h-4 text-[#1A3026]" />
                    <span>GRU Simples - Guia de Recolhimento da União</span>
                  </div>
                  <span className="text-[11px] font-mono-num text-[#697E72]">Vencimento: 19/11/2026</span>
                </div>

                <div className="p-3 bg-white rounded-lg border border-[#DDD9D0] font-mono-num text-xs text-[#1A3026] text-center select-all">
                  00190.00009 02450.000004 00000.000185 8 98760000024500
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                  <span className="text-[#697E72]">
                    Compensação bancária: até 1 dia útil após o pagamento.
                  </span>
                  <button
                    type="button"
                    onClick={() => alert('Download simulado da GRU em PDF com código de barras iniciado!')}
                    className="py-2 px-3.5 bg-[#1A3026] hover:bg-[#254436] text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Baixar Guia PDF</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-[#E8E6E1] flex items-center justify-between text-xs text-[#697E72]">
            <span>Autenticação Bancária: 8904.7721.9931.2026</span>
            <span>Ambiente Integrado Siscomex / SP</span>
          </div>
        </div>

      </div>
    </div>
  );
};
