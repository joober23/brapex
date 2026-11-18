import React, { useState, useEffect, useRef } from 'react';
import { TRANSLATIONS, Language } from './translations';
import { GLOSSARY_TERMS, findGlossaryTerm, GlossaryTerm } from './glossary';
import {
  Globe,
  ArrowRightLeft,
  ArrowUpDown,
  Search,
  FileText,
  Truck,
  CheckCircle2,
  Clock,
  TrendingUp,
  TrendingDown,
  ShieldCheck,
  Building2,
  Phone,
  Mail,
  Send,
  ExternalLink,
  Copy,
  Check,
  X,
  User,
  Package,
  Layers,
  HelpCircle,
  MessageCircle,
  FileCheck,
  UploadCloud,
  ChevronRight,
  Sparkles,
  PhoneCall,
  RotateCcw,
  Play,
  ArrowUpRight,
  Lock,
  Compass,
  Home,
  Ship,
  Anchor,
  AlertTriangle,
  Info,
  Receipt,
  Plane,
  Hash,
  BookOpen
} from 'lucide-react';

interface CommodityItem {
  id: string;
  name: string;
  supplier: string;
  price: number;
  unit: string;
  currency: 'US$' | 'R$';
  deltaPct: number;
  flag: string;
  imgUrl: string;
  ncm: string;
}

export default function App() {
  const [lang, setLang] = useState<Language>('pt');
  const t = TRANSLATIONS[lang];

  const [currentScreen, setCurrentScreen] = useState<string>('screen-login');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [showGovModal, setShowGovModal] = useState<boolean>(false);
  const [showContactModal, setShowContactModal] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Live Market Engine (Valores e Preços mudam automaticamente)
  const [fxRate, setFxRate] = useState<number>(0.648);
  const [fxDeltaPct, setFxDeltaPct] = useState<number>(0.4);
  const [isLiveApiRate, setIsLiveApiRate] = useState<boolean>(false);
  const [lastMarketTime, setLastMarketTime] = useState<string>('');

  // Itens importados do Peru para Itapetininga
  const [peruProducts, setPeruProducts] = useState<CommodityItem[]>([
    {
      id: 'garlic',
      name: 'Alho Roxo Peruano',
      supplier: 'Arequipa Agroexport',
      price: 1250,
      unit: '/ ton',
      currency: 'US$',
      deltaPct: 0.2,
      flag: '🇵🇪',
      imgUrl: 'https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?auto=format&fit=crop&w=120&q=80',
      ncm: '0703.20.90'
    },
    {
      id: 'copper',
      name: 'Cobre Eletrolítico / Cátodos',
      supplier: 'Southern Copper Corp / Cerro Verde',
      price: 9180,
      unit: '/ ton',
      currency: 'US$',
      deltaPct: 1.1,
      flag: '🇵🇪',
      imgUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=120&q=80',
      ncm: '7403.11.00'
    },
    {
      id: 'iron',
      name: 'Ferro e Pelotas Siderúrgicas',
      supplier: 'Shougang Hierro Perú / SIDERPERU',
      price: 850,
      unit: '/ ton',
      currency: 'US$',
      deltaPct: 0.6,
      flag: '🇵🇪',
      imgUrl: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=120&q=80',
      ncm: '7200.00.00'
    },
    {
      id: 'fishmeal',
      name: 'Farinha de Peixe Premium 68%',
      supplier: 'TASA Pesquera Perú',
      price: 1420,
      unit: '/ ton',
      currency: 'US$',
      deltaPct: -0.5,
      flag: '🇵🇪',
      imgUrl: 'https://images.unsplash.com/photo-1534939561126-855b8675edd7?auto=format&fit=crop&w=120&q=80',
      ncm: '2301.20.90'
    },
    {
      id: 'fertilizer',
      name: 'Fertilizantes & Fosfatos Naturais',
      supplier: 'Fosfatos de Bayóvar / Piura',
      price: 420,
      unit: '/ ton',
      currency: 'US$',
      deltaPct: 0.4,
      flag: '🇵🇪',
      imgUrl: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=120&q=80',
      ncm: '3105.20.00'
    },
    {
      id: 'zinc',
      name: 'Zinco e Minérios Refinados',
      supplier: 'Volcan Compañía Minera',
      price: 2750,
      unit: '/ ton',
      currency: 'US$',
      deltaPct: -0.2,
      flag: '🇵🇪',
      imgUrl: 'https://images.unsplash.com/photo-1535813547-99c456a41d4a?auto=format&fit=crop&w=120&q=80',
      ncm: '7901.11.00'
    }
  ]);

  // Itens exportados de Itapetininga / Sudoeste Paulista para o Peru (matching do print do usuário)
  const [itpProducts, setItpProducts] = useState<CommodityItem[]>([
    {
      id: 'corn',
      name: 'Milho em Grão a Granel',
      supplier: 'Cooperativa Agro Sudoeste SP',
      price: 182,
      unit: '/ ton',
      currency: 'US$',
      deltaPct: 0.8,
      flag: '🇧🇷',
      imgUrl: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=120&q=80',
      ncm: '1005.90.10'
    },
    {
      id: 'pork',
      name: 'Carne Suína Resfriada',
      supplier: 'Frigoríficos Regionais Sudoeste SP',
      price: 2450,
      unit: '/ ton',
      currency: 'US$',
      deltaPct: 0.3,
      flag: '🇧🇷',
      imgUrl: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=120&q=80',
      ncm: '0203.11.00'
    },
    {
      id: 'wood',
      name: 'Madeira Serrada / Pinus e Eucalipto',
      supplier: 'Polo Madeireiro Sudoeste Paulista',
      price: 320,
      unit: '/ m³',
      currency: 'US$',
      deltaPct: 0.5,
      flag: '🇧🇷',
      imgUrl: 'https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?auto=format&fit=crop&w=120&q=80',
      ncm: '4407.11.00'
    },
    {
      id: 'soy',
      name: 'Soja em Grãos e Farelo',
      supplier: 'Produtores Rurais de Itapetininga',
      price: 410,
      unit: '/ ton',
      currency: 'US$',
      deltaPct: -0.4,
      flag: '🇧🇷',
      imgUrl: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=120&q=80',
      ncm: '1201.90.00'
    },
    {
      id: 'orange',
      name: 'Suco de Laranja e Cítricos',
      supplier: 'Polo Citrícola Regional',
      price: 540,
      unit: '/ ton',
      currency: 'US$',
      deltaPct: 0.2,
      flag: '🇧🇷',
      imgUrl: 'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?auto=format&fit=crop&w=120&q=80',
      ncm: '2009.11.00'
    }
  ]);

  // Conversor de Moedas FinTech
  const [brlVal, setBrlVal] = useState<string>('100');
  const [penVal, setPenVal] = useState<string>('64,80');
  const [brlParaPen, setBrlParaPen] = useState<boolean>(true);
  const [fxConvertedResult, setFxConvertedResult] = useState<{ from: string; to: string; valid: boolean } | null>(null);

  // Inteligência Comercial
  const [fluxoBrasil, setFluxoBrasil] = useState<boolean>(true);
  const [selectedIntelItems, setSelectedIntelItems] = useState<Record<number, boolean>>({});
  const [intelSearchQuery, setIntelSearchQuery] = useState<string>('');

  // Produtos (alternância de rota & busca)
  const [routePeToItp, setRoutePeToItp] = useState<boolean>(true);
  const [productSearch, setProductSearch] = useState<string>('');

  // Documentação e Anexos (Sem redundâncias: fluxo unificado)
  const [selectedProductKey, setSelectedProductKey] = useState<string>('iron');
  const [docQtyKg, setDocQtyKg] = useState<string>('1000');
  const [doc1Attached, setDoc1Attached] = useState<boolean>(false);
  const [doc2Attached, setDoc2Attached] = useState<boolean>(false);
  const [doc3Attached, setDoc3Attached] = useState<boolean>(false);
  const [uploadedFiles, setUploadedFiles] = useState<{ [key: number]: string }>({});

  // Pagamento
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'qr' | 'boleto'>('pix');
  const [pixCopied, setPixCopied] = useState<boolean>(false);
  const [paymentDone, setPaymentDone] = useState<boolean>(false);

  // Frete
  const [freteProd, setFreteProd] = useState<string>('ferro');
  const [freteValor, setFreteValor] = useState<string>('5000');
  const [fretePeso, setFretePeso] = useState<string>('1200');
  const [freteOrigem, setFreteOrigem] = useState<string>('Itapetininga - SP');
  const [freteDestino, setFreteDestino] = useState<string>('Porto de Callao, Peru');
  const [freteResultado, setFreteResultado] = useState<{ type: 'ok' | 'err'; value?: string } | null>(null);

  // Rastreamento e Rota Simplificada
  const [trackCode, setTrackCode] = useState<string>('BRAPEX2026');
  const [truckPos, setTruckPos] = useState<{ left: string; bottom: string }>({ left: '55px', bottom: '45px' });
  const [routeStage, setRouteStage] = useState<'ready' | 'moving' | 'arrived'>('ready');

  // Guia Aduaneiro NCM inline feedback & modais
  const [showNcmInfo, setShowNcmInfo] = useState<boolean>(false);
  const [guideDetailModal, setGuideDetailModal] = useState<{ title: string; desc: string; tips: string[] } | null>(null);

  // Glossário de Siglas (FOB, CIF, NCM, DU-E, DUIMP, Invoice, Packing List, BL/AWB)
  const [showGlossaryModal, setShowGlossaryModal] = useState<boolean>(false);
  const [activeSiglaCode, setActiveSiglaCode] = useState<string | null>(null);
  const [glossarySearch, setGlossarySearch] = useState<string>('');

  const filteredGlossaryTerms = GLOSSARY_TERMS.filter((item) => {
    if (!glossarySearch.trim()) return true;
    const q = glossarySearch.toLowerCase().trim();
    return (
      item.code.toLowerCase().includes(q) ||
      item.name.toLowerCase().includes(q) ||
      item.descPt.toLowerCase().includes(q) ||
      item.descEs.toLowerCase().includes(q) ||
      item.tags.some((t) => t.includes(q))
    );
  });

  const getGlossaryIcon = (icon: GlossaryTerm['icon']) => {
    switch (icon) {
      case 'ship':
        return <Ship size={20} className="text-emerald-700" />;
      case 'shield':
        return <ShieldCheck size={20} className="text-emerald-700" />;
      case 'hash':
        return <Hash size={20} className="text-emerald-700" />;
      case 'upload':
        return <FileCheck size={20} className="text-emerald-700" />;
      case 'download':
        return <UploadCloud size={20} className="text-emerald-700" />;
      case 'receipt':
        return <Receipt size={20} className="text-emerald-700" />;
      case 'package':
        return <Package size={20} className="text-emerald-700" />;
      case 'plane':
        return <Plane size={20} className="text-emerald-700" />;
      default:
        return <FileText size={20} className="text-emerald-700" />;
    }
  };

  const renderSiglaBadge = (code: string, label?: string) => {
    return (
      <button
        type="button"
        className="sigla-tag-btn"
        onClick={(e) => {
          e.stopPropagation();
          setActiveSiglaCode(activeSiglaCode === code ? null : code);
        }}
        title={`Clique para entender o significado de ${code}`}
      >
        <span>{label || code}</span>
        <span className="sigla-q-mark">?</span>
      </button>
    );
  };

  // Chatbot
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'bot' | 'user'; key?: string; text?: string }>>([
    { sender: 'bot', key: 'greeting' }
  ]);
  const [chatInput, setChatInput] = useState<string>('');

  // Perfil do Usuário
  const [userName, setUserName] = useState<string>('BRAPEX');
  const [userEmail, setUserEmail] = useState<string>('contato@brapeximportaexporta.com.br');
  const [userDoc, setUserDoc] = useState<string>('254.785.785-67');
  const [userCompany, setUserCompany] = useState<string>('Brapex Comércio Exterior Sudoeste Paulista Ltda.');
  const [userLocation, setUserLocation] = useState<string>('Itapetininga - SP, Brasil');

  // Gov.br CPF input
  const [govCpfInput, setGovCpfInput] = useState<string>('254.785.785-67');

  const fileInputRef1 = useRef<HTMLInputElement>(null);
  const fileInputRef2 = useRef<HTMLInputElement>(null);
  const fileInputRef3 = useRef<HTMLInputElement>(null);

  // Sync document language attribute
  useEffect(() => {
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'es';
  }, [lang]);

  // Toast notification helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Format Brazilian numbers
  const formatBrNumber = (num: number, decimals = 2): string =>
    num.toLocaleString('pt-BR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

  const parseCurrencyAmount = (raw: string): number => {
    const cleaned = String(raw || '').trim().replace(/[^\d.,]/g, '');
    if (!cleaned) return 0;
    if (cleaned.includes(',') && cleaned.includes('.')) {
      if (cleaned.lastIndexOf(',') > cleaned.lastIndexOf('.')) {
        return parseFloat(cleaned.replace(/\./g, '').replace(',', '.')) || 0;
      }
      return parseFloat(cleaned.replace(/,/g, '')) || 0;
    }
    if (cleaned.includes(',')) {
      return parseFloat(cleaned.replace(',', '.')) || 0;
    }
    return parseFloat(cleaned) || 0;
  };

  const formatConvertedOutput = (val: number, isBrlToPen: boolean, rate: number): string => {
    if (isBrlToPen) {
      return `${formatBrNumber(val * rate)}`;
    }
    return `${formatBrNumber(val / rate)}`;
  };

  // Live Market Engine: Automatic updates every 9 seconds
  useEffect(() => {
    const updateMarket = () => {
      const now = new Date();
      setLastMarketTime(now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));

      // Fluctuate exchange rate gently (±0.003)
      setFxRate((prev) => {
        const delta = (Math.random() - 0.48) * 0.006;
        const next = Math.max(0.58, Math.min(0.72, prev + delta));
        const deltaPct = Number(((delta / prev) * 100).toFixed(2));
        setFxDeltaPct(deltaPct);
        return Number(next.toFixed(4));
      });

      // Fluctuate peru products
      setPeruProducts((prev) =>
        prev.map((item) => {
          const variance = (Math.random() - 0.48) * 0.015;
          const newPrice = Math.round(item.price * (1 + variance) * 10) / 10;
          const deltaPct = Number((variance * 100).toFixed(1));
          return { ...item, price: newPrice, deltaPct };
        })
      );

      // Fluctuate itp products
      setItpProducts((prev) =>
        prev.map((item) => {
          const variance = (Math.random() - 0.48) * 0.015;
          const newPrice = Math.round(item.price * (1 + variance) * 10) / 10;
          const deltaPct = Number((variance * 100).toFixed(1));
          return { ...item, price: newPrice, deltaPct };
        })
      );
    };

    updateMarket();
    const interval = setInterval(updateMarket, 9000);
    return () => clearInterval(interval);
  }, []);

  // Update PEN output whenever fxRate or brlVal changes
  useEffect(() => {
    const val = parseCurrencyAmount(brlVal);
    setPenVal(formatConvertedOutput(val, brlParaPen, fxRate));
  }, [fxRate, brlParaPen]);

  // Initial fetch of real live exchange rate if network is available
  useEffect(() => {
    let active = true;
    const loadRealRate = async () => {
      try {
        const res = await fetch('https://open.er-api.com/v6/latest/BRL');
        if (res.ok) {
          const data = await res.json();
          const pen = Number(data?.rates?.PEN);
          if (active && Number.isFinite(pen) && pen > 0) {
            setFxRate(Number(pen.toFixed(4)));
            setIsLiveApiRate(true);
          }
        }
      } catch {
        // Fallback to internal live engine
      }
    };
    loadRealRate();
    return () => { active = false; };
  }, []);

  // Total docs attached
  const totalDocs = (doc1Attached ? 1 : 0) + (doc2Attached ? 1 : 0) + (doc3Attached ? 1 : 0);

  // Navigation
  const navigate = (screenId: string) => {
    setCurrentScreen(screenId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Login Gov.br Handler (Totalmente Funcional)
  const handleGovLogin = () => {
    setIsLoggedIn(true);
    setShowGovModal(false);
    showToast(t.govSuccessToast);
    navigate('screen-dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('screen-login');
    showToast('Sessão encerrada com sucesso.');
  };

  // Câmbio Handlers
  const handleBrlChange = (valStr: string) => {
    setBrlVal(valStr);
    const val = parseCurrencyAmount(valStr);
    setPenVal(formatConvertedOutput(val, brlParaPen, fxRate));
    if (fxConvertedResult) {
      if (val > 0) {
        const fromText = brlParaPen ? `R$ ${formatBrNumber(val)}` : `S/. ${formatBrNumber(val)}`;
        const toText = brlParaPen ? `${formatConvertedOutput(val, brlParaPen, fxRate)} S/.` : `R$ ${formatConvertedOutput(val, brlParaPen, fxRate)}`;
        setFxConvertedResult({ from: fromText, to: toText, valid: true });
      } else {
        setFxConvertedResult({ from: '', to: '', valid: false });
      }
    }
  };

  const inverterMoeda = () => {
    const nextMode = !brlParaPen;
    setBrlParaPen(nextMode);
    const val = parseCurrencyAmount(brlVal);
    const nextOut = formatConvertedOutput(val, nextMode, fxRate);
    setPenVal(nextOut);
    if (fxConvertedResult && val > 0) {
      const fromText = nextMode ? `R$ ${formatBrNumber(val)}` : `S/. ${formatBrNumber(val)}`;
      const toText = nextMode ? `${nextOut} S/.` : `R$ ${nextOut}`;
      setFxConvertedResult({ from: fromText, to: toText, valid: true });
    }
  };

  const converterMoeda = () => {
    const val = parseCurrencyAmount(brlVal);
    if (val <= 0) {
      setPenVal('0,00');
      setFxConvertedResult({ from: '', to: '', valid: false });
      return;
    }
    const converted = formatConvertedOutput(val, brlParaPen, fxRate);
    setPenVal(converted);
    const fromText = brlParaPen ? `R$ ${formatBrNumber(val)}` : `S/. ${formatBrNumber(val)}`;
    const toText = brlParaPen ? `${converted} S/.` : `R$ ${converted}`;
    setFxConvertedResult({ from: fromText, to: toText, valid: true });
  };

  // Frete Cálculo Funcional
  const calcularFrete = () => {
    const peso = parseFloat(fretePeso) || 0;
    if (peso <= 0) {
      setFreteResultado({ type: 'err' });
      return;
    }
    const baseTariff = 1.45 * (1 + (peruProducts[0]?.deltaPct || 0) / 100);
    const estimativa = (peso * baseTariff + 320).toFixed(2).replace('.', ',');
    setFreteResultado({ type: 'ok', value: estimativa });
  };

  // Animação de Rota Simplificada (1 segundo limpo e fluido)
  const animarRota = () => {
    setTruckPos({ left: '55px', bottom: '45px' });
    setRouteStage('moving');
    setTimeout(() => {
      setTruckPos({ left: '215px', bottom: '135px' });
    }, 100);
    setTimeout(() => {
      setRouteStage('arrived');
    }, 1100);
  };

  const resetarRota = () => {
    setTruckPos({ left: '55px', bottom: '45px' });
    setRouteStage('ready');
  };

  // Chatbot
  const enviarChat = () => {
    if (!chatInput.trim()) return;
    const text = chatInput.trim();
    setChatMessages((prev) => [...prev, { sender: 'user', text }]);
    setChatInput('');

    setTimeout(() => {
      let key = 'default';
      const q = text.toLowerCase();
      if (q.includes('document') || q.includes('invoice') || q.includes('factura') || q.includes('origem') || q.includes('origen')) {
        key = 'docs';
      } else if (q.includes('taxa') || q.includes('tasa') || q.includes('pix') || q.includes('245') || q.includes('pago') || q.includes('pagar')) {
        key = 'pay';
      } else if (q.includes('rastrei') || q.includes('rastreo') || q.includes('brapex2026') || q.includes('lote') || q.includes('carga')) {
        key = 'track';
      } else if (q.includes('moeda') || q.includes('moneda') || q.includes('sol') || q.includes('cambio') || q.includes('cotação')) {
        key = 'fx';
      } else if (q.includes('contato') || q.includes('ajuda') || q.includes('telefone') || q.includes('whatsapp') || q.includes('email') || q.includes('e-mail')) {
        key = 'contact';
      }

      setChatMessages((prev) => [...prev, { sender: 'bot', key }]);
    }, 400);
  };

  const copyPix = () => {
    const pixKey = '00020126580014br.gov.bcb.pix0136brapex-receita-gov@tesouro.gov.br5204000053039865406245.005802BR5925BRAPEX LOGISTICA ITAPETI6009SAO PAULO62140510BRAPEX2026';
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(pixKey);
    }
    setPixCopied(true);
    showToast(t.payCopiedFeedback);
    setTimeout(() => setPixCopied(false), 3000);
  };

  const getBotText = (msg: { key?: string; text?: string }) => {
    if (msg.text) return msg.text;
    switch (msg.key) {
      case 'greeting': return t.chatGreeting;
      case 'docs': return t.chatReplyDocs;
      case 'pay': return t.chatReplyPay;
      case 'track': return t.chatReplyTrack;
      case 'fx': return t.chatReplyFx;
      case 'contact': return t.chatReplyContact;
      default: return t.chatReplyDefault;
    }
  };

  const routeStatusText =
    routeStage === 'ready' ? t.routeReady : routeStage === 'moving' ? t.routeMoving : t.routeArrived;

  // Selected NCM info helper for Tela 5
  const getNcmByProductKey = (key: string) => {
    switch (key) {
      case 'iron': return '7200.00.00 (Ferro e Aço em Formas Primárias)';
      case 'copper': return '7403.11.00 (Cobre Refinado em Cátodos)';
      case 'garlic': return '0703.20.90 (Alho Fresco ou Refrigerado)';
      case 'fishmeal': return '2301.20.90 (Farinha de Peixe para Rações)';
      case 'fertilizer': return '3105.20.00 (Fosfatos Minerais Naturais)';
      case 'zinc': return '7901.11.00 (Zinco em Bruto Não Ligado)';
      case 'corn': return '1005.90.10 (Milho em Grão para Exportação)';
      case 'pork': return '0203.11.00 (Carne Suína Resfriada)';
      case 'wood': return '4407.11.00 (Madeira de Coníferas Serrada)';
      case 'soy': return '1201.90.00 (Soja em Grãos)';
      case 'orange': return '2009.11.00 (Suco de Laranja Concentrado)';
      default: return '7200.00.00';
    }
  };

  // Active products list based on route
  const currentProducts = routePeToItp ? peruProducts : itpProducts;
  const filteredProducts = currentProducts.filter((item) =>
    item.name.toLowerCase().includes(productSearch.toLowerCase()) ||
    item.supplier.toLowerCase().includes(productSearch.toLowerCase())
  );

  return (
    <div className={`app-shell ${lang === 'es' ? 'theme-peru' : ''}`} data-theme={lang === 'es' ? 'pe' : 'br'}>

      {/* TOAST NOTIFICATION */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'var(--primary-dark)',
          color: '#FFFFFF',
          padding: '12px 24px',
          borderRadius: '30px',
          fontSize: '0.86rem',
          fontWeight: 700,
          boxShadow: '0 12px 32px rgba(13,34,24,0.3)',
          border: '1px solid rgba(255,255,255,0.15)',
          zIndex: 300,
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          animation: 'simpleFadeIn 0.2s ease-out'
        }}>
          <CheckCircle2 size={18} className="text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* MODAL 1: AJUDA & CONTATO UNIFICADO (+55 15 99173-7379 / brapeximportaexporta.com.br) */}
      {showContactModal && (
        <div className="modal-overlay" onClick={() => setShowContactModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div className="brand-logo-wrap" style={{ padding: 0 }}>
                <img src="/brapex-logo.png" alt="BRAPEX" className="brand-logo-img" style={{ height: '32px' }} />
              </div>
              <button className="icon-btn" onClick={() => setShowContactModal(false)} aria-label="Fechar">
                <X size={18} />
              </button>
            </div>

            <h3 className="serif-title" style={{ fontSize: '1.25rem', color: 'var(--primary-dark)', marginBottom: '8px' }}>
              {t.contactModalTitle}
            </h3>

            <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginBottom: '20px', lineHeight: 1.5 }}>
              {t.contactModalSub}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '22px' }}>
              {/* WhatsApp & Telefone */}
              <div style={{ background: 'var(--bg-mint)', padding: '18px', borderRadius: '18px', border: '1px solid #C8D6CD' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--primary-green)', marginBottom: '4px' }}>
                  <Phone size={14} />
                  <span className="eyebrow" style={{ margin: 0 }}>{t.contactPhoneLabel}</span>
                </div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary-dark)', margin: '4px 0 12px', letterSpacing: '0.3px' }}>
                  {t.contactPhoneValue}
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <a
                    href="https://wa.me/5515991737379?text=Ol%C3%A1%2C%20gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20as%20opera%C3%A7%C3%B5es%20da%20BRAPEX"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-green"
                    style={{ textDecoration: 'none', padding: '11px 16px', fontSize: '0.84rem', flex: 1 }}
                  >
                    <MessageCircle size={16} />
                    <span>{t.contactWhatsappBtn}</span>
                  </a>
                  <a
                    href="tel:+5515991737379"
                    className="btn-outline"
                    style={{ textDecoration: 'none', padding: '11px 16px', fontSize: '0.84rem' }}
                  >
                    <PhoneCall size={16} />
                    <span>Ligar</span>
                  </a>
                </div>
              </div>

              {/* E-mail Oficial */}
              <div style={{ background: '#FAF9F6', padding: '18px', borderRadius: '18px', border: '1px solid var(--border-light)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                  <Mail size={14} />
                  <span className="eyebrow" style={{ margin: 0 }}>{t.contactEmailLabel}</span>
                </div>
                <div style={{ fontSize: '0.96rem', fontWeight: 700, color: 'var(--primary-dark)', margin: '4px 0 12px', wordBreak: 'break-all' }}>
                  {t.contactEmailValue}
                </div>
                <a
                  href={`mailto:${t.contactEmailValue}?subject=Consulta%20Operacional%20BRAPEX`}
                  className="btn-outline"
                  style={{ textDecoration: 'none', width: '100%', display: 'flex', justifyContent: 'center' }}
                >
                  <Mail size={15} />
                  <span>{t.contactEmailBtn}</span>
                </a>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 16px', background: '#FEF3EB', borderRadius: '14px', fontSize: '0.8rem', color: '#8A4A1C' }}>
                <Clock size={16} style={{ flexShrink: 0 }} />
                <div>
                  <strong>{t.contactHoursLabel}:</strong> {t.contactHoursValue}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                className="btn-outline"
                style={{ flex: 1, fontSize: '0.84rem' }}
                onClick={() => {
                  setShowContactModal(false);
                  navigate('screen-guia');
                }}
              >
                <FileText size={16} />
                <span>{t.contactFaqBtn}</span>
              </button>
              <button
                className="btn-outline"
                style={{ flex: 1, fontSize: '0.84rem' }}
                onClick={() => {
                  setShowContactModal(false);
                  navigate('screen-rastreamento');
                }}
              >
                <MessageCircle size={16} />
                <span>Chatbot Online</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: LOGIN GOV.BR FUNCIONAL */}
      {showGovModal && (
        <div className="modal-overlay" onClick={() => setShowGovModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '36px', height: '36px', background: '#1351B4', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 900, fontSize: '0.95rem' }}>
                  gov
                </div>
                <div>
                  <strong style={{ fontSize: '1.15rem', color: '#1351B4', display: 'block' }}>Identificação Gov.br</strong>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Acesso Único Brasil Cidadão</span>
                </div>
              </div>
              <button className="icon-btn" onClick={() => setShowGovModal(false)} aria-label="Fechar">
                <X size={18} />
              </button>
            </div>

            <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginBottom: '18px', lineHeight: 1.5 }}>
              {t.govModalDesc}
            </p>

            <div className="form-group" style={{ marginBottom: '16px' }}>
              <label>{t.govCpfLabel}</label>
              <input
                type="text"
                value={govCpfInput}
                onChange={(e) => setGovCpfInput(e.target.value)}
                placeholder={t.govCpfPlaceholder}
                style={{ fontSize: '1rem', fontWeight: 700, letterSpacing: '0.5px' }}
              />
            </div>

            <button
              className="btn-primary"
              style={{ background: '#1351B4', marginBottom: '10px' }}
              onClick={handleGovLogin}
            >
              <ShieldCheck size={18} />
              <span>{t.govContinueBtn}</span>
            </button>

            <button
              className="btn-outline"
              style={{ width: '100%', marginBottom: '16px' }}
              onClick={handleGovLogin}
            >
              <Sparkles size={16} />
              <span>{t.govDirectBtn}</span>
            </button>

            <div style={{ textAlign: 'center', fontSize: '0.8rem' }}>
              <a
                href="https://www.gov.br/pt-br"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#1351B4', textDecoration: 'none', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}
              >
                <span>{t.govExternalLink}</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: GUIA ADUANEIRO DETALHES */}
      {guideDetailModal && (
        <div className="modal-overlay" onClick={() => setGuideDetailModal(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h3 className="serif-title" style={{ fontSize: '1.3rem' }}>{guideDetailModal.title}</h3>
              <button className="icon-btn" onClick={() => setGuideDetailModal(null)} aria-label="Fechar">
                <X size={18} />
              </button>
            </div>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginBottom: '18px', lineHeight: 1.55 }}>
              {guideDetailModal.desc}
            </p>
            <div style={{ background: 'var(--bg-mint)', padding: '16px', borderRadius: '16px', marginBottom: '18px', border: '1px solid #C8D6CD' }}>
              <strong style={{ fontSize: '0.84rem', display: 'block', marginBottom: '8px', color: 'var(--primary-dark)' }}>
                Requisitos e Recomendações:
              </strong>
              <ul style={{ paddingLeft: '20px', fontSize: '0.8rem', color: 'var(--text-dark)', lineHeight: 1.65 }}>
                {guideDetailModal.tips.map((tip, idx) => (
                  <li key={idx} style={{ marginBottom: '4px' }}>{tip}</li>
                ))}
              </ul>
            </div>
            <button className="btn-green" onClick={() => setGuideDetailModal(null)}>
              Entendido
            </button>
          </div>
        </div>
      )}

      {/* BALÃOZINHO / POPOVER EXPLICATIVO DE SIGLA AO CLICAR EM (?) - SEM SAIR DA TELA */}
      {activeSiglaCode && (() => {
        const term = findGlossaryTerm(activeSiglaCode);
        if (!term) return null;
        return (
          <div className="sigla-balloon-popover" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div className="glossary-icon-badge">
                  {getGlossaryIcon(term.icon)}
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <strong style={{ fontSize: '1.15rem', color: '#111827' }}>{term.code}</strong>
                    <span style={{ fontSize: '0.68rem', background: '#ECFDF5', color: '#166534', padding: '2px 8px', borderRadius: '10px', fontWeight: 700 }}>
                      {term.category}
                    </span>
                  </div>
                  <span style={{ fontSize: '0.78rem', color: 'var(--primary-green)', fontWeight: 700 }}>
                    {term.name}
                  </span>
                </div>
              </div>
              <button
                type="button"
                className="icon-btn"
                style={{ width: '32px', height: '32px' }}
                onClick={() => setActiveSiglaCode(null)}
                aria-label="Fechar"
              >
                <X size={16} />
              </button>
            </div>

            <p style={{ fontSize: '0.86rem', color: '#374151', lineHeight: 1.5, margin: '10px 0 16px' }}>
              {lang === 'es' ? term.descEs : term.descPt}
            </p>

            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
              <button
                type="button"
                className="btn-outline"
                style={{ fontSize: '0.78rem', padding: '6px 12px', gap: '4px' }}
                onClick={() => {
                  setActiveSiglaCode(null);
                  setShowGlossaryModal(true);
                }}
              >
                <Search size={13} />
                <span>Ver Todas as Siglas</span>
              </button>
              <button
                type="button"
                className="btn-green"
                style={{ fontSize: '0.78rem', padding: '6px 14px' }}
                onClick={() => setActiveSiglaCode(null)}
              >
                Entendi
              </button>
            </div>
          </div>
        );
      })()}

      {/* MODAL: GLOSSÁRIO COMPLETO DE SIGLAS (CONFORME PRINT DO USUÁRIO) */}
      {showGlossaryModal && (
        <div className="modal-overlay" onClick={() => setShowGlossaryModal(false)}>
          <div
            className="modal-card"
            style={{ maxWidth: '560px', maxHeight: '88vh', overflowY: 'auto' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div>
                <span className="eyebrow" style={{ margin: 0 }}>
                  <HelpCircle size={14} />
                  <span>GUIA ADUANEIRO</span>
                </span>
                <h3 className="serif-title" style={{ fontSize: '1.4rem' }}>{t.glossaryTitle}</h3>
              </div>
              <button className="icon-btn" onClick={() => setShowGlossaryModal(false)} aria-label="Fechar">
                <X size={18} />
              </button>
            </div>

            {/* Campo de Busca conforme Print */}
            <div className="form-group" style={{ marginBottom: '12px' }}>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  placeholder={t.glossarySearchPlaceholder}
                  value={glossarySearch}
                  onChange={(e) => setGlossarySearch(e.target.value)}
                  style={{
                    paddingLeft: '44px',
                    fontSize: '0.92rem',
                    borderRadius: '16px',
                    border: '1px solid #D5D1C7',
                    background: '#FFFFFF'
                  }}
                />
                <Search
                  size={18}
                  style={{
                    position: 'absolute',
                    left: '14px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#6B7280'
                  }}
                />
                {glossarySearch && (
                  <button
                    type="button"
                    onClick={() => setGlossarySearch('')}
                    style={{
                      position: 'absolute',
                      right: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#9CA3AF'
                    }}
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </div>

            {/* Contador conforme Print: "8 termos no glossário" */}
            <div style={{ fontSize: '0.84rem', color: '#6B7280', fontWeight: 600, marginBottom: '14px' }}>
              {filteredGlossaryTerms.length} {t.glossaryTermsCount}
            </div>

            {/* Lista de Cards de Siglas conforme Print */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {filteredGlossaryTerms.map((term) => (
                <div key={term.code} className="glossary-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <strong style={{ fontSize: '1.25rem', color: '#111827', letterSpacing: '0.3px' }}>
                      {term.code}
                    </strong>
                    <div className="glossary-icon-badge">
                      {getGlossaryIcon(term.icon)}
                    </div>
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--primary-green)', fontWeight: 700 }}>
                    {term.name}
                  </div>
                  <p style={{ fontSize: '0.85rem', color: '#4B5563', lineHeight: 1.5, margin: 0 }}>
                    {lang === 'es' ? term.descEs : term.descPt}
                  </p>
                </div>
              ))}

              {filteredGlossaryTerms.length === 0 && (
                <div style={{ textAlign: 'center', padding: '32px 16px', color: 'var(--text-muted)' }}>
                  <Search size={32} style={{ margin: '0 auto 8px', opacity: 0.4 }} />
                  <p>Nenhuma sigla encontrada para "{glossarySearch}".</p>
                </div>
              )}
            </div>

            <div style={{ marginTop: '20px', textAlign: 'center' }}>
              <button className="btn-outline" style={{ width: '100%' }} onClick={() => setShowGlossaryModal(false)}>
                {t.glossaryCloseBtn}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* NAVBAR SUPERIOR RESPONSIVA (SEM TEXTOS AO LADO DO LOGO E SEM MENU HAMBÚRGUER) */}
      {currentScreen !== 'screen-login' && (
        <header id="main-navbar" className="navbar">
          {/* Logo BRAPEX sem borda ou caixa branca ao redor */}
          <div className="brand-logo-wrap" onClick={() => navigate('screen-dashboard')} title="BRAPEX Início">
            <img src="/brapex-logo.png" alt="BRAPEX" className="brand-logo-img" />
          </div>

          <div className="nav-actions">
            {/* Botão Glossário de Siglas */}
            <button
              className="btn-outline"
              style={{ padding: '8px 12px', fontSize: '0.8rem', gap: '6px' }}
              onClick={() => setShowGlossaryModal(true)}
              title="Abrir Glossário de Siglas (FOB, CIF, NCM...)"
            >
              <BookOpen size={14} className="text-emerald-700" />
              <span className="hidden sm:inline">Glossário</span>
              <span className="sigla-q-mark" style={{ width: '15px', height: '15px', fontSize: '0.6rem' }}>?</span>
            </button>
            {/* Live Market Indicator */}
            <div
              style={{
                display: 'none',
                alignItems: 'center',
                gap: '8px',
                background: 'var(--badge-green-bg)',
                color: 'var(--badge-green-text)',
                padding: '6px 14px',
                borderRadius: '20px',
                fontSize: '0.74rem',
                fontWeight: 800,
                border: '1px solid #C8E3D2'
              }}
              className="md:flex"
            >
              <span className="live-dot"></span>
              <span>1 R$ = {formatBrNumber(fxRate, 4)} S/.</span>
              <TrendingUp size={13} />
            </div>

            {/* Botão Unificado Ajuda & Contato */}
            <button
              className="btn-outline"
              style={{ padding: '8px 14px', fontSize: '0.8rem' }}
              onClick={() => setShowContactModal(true)}
              title="Ajuda e Contato (+55 15 99173-7379)"
            >
              <PhoneCall size={14} className="text-emerald-700" />
              <span>Ajuda</span>
            </button>

            {/* Alternador Rápido de Idioma / Perfil */}
            <button
              className="icon-btn"
              title="Alternar Idioma"
              onClick={() => {
                const nextLang = lang === 'pt' ? 'es' : 'pt';
                setLang(nextLang);
                showToast(nextLang === 'pt' ? 'Idioma: Português' : 'Idioma: Español');
              }}
            >
              <span style={{ fontSize: '1rem' }}>{lang === 'pt' ? '🇵🇪' : '🇧🇷'}</span>
            </button>

            <button className="icon-btn" title={t.navProfileTitle} onClick={() => navigate('screen-perfil')} aria-label="Perfil">
              <User size={18} />
            </button>
          </div>
        </header>
      )}

      {/* TELA 1: ENTRADA / LOGIN */}
      {currentScreen === 'screen-login' && (
        <section id="screen-login" style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: 0 }}>
          <div className="login-hero">
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(255,255,255,0.12)',
              border: '1px solid rgba(255,255,255,0.22)',
              borderRadius: '20px',
              padding: '6px 14px',
              fontSize: '0.72rem',
              fontWeight: 800,
              letterSpacing: '0.8px',
              textTransform: 'uppercase',
              color: '#FFFFFF',
              marginBottom: '16px',
              backdropFilter: 'blur(8px)'
            }}>
              <ShieldCheck size={14} className="text-emerald-400" />
              <span>Portal Oficial • Siscomex & ACE 58</span>
            </div>

            <div className="brand-logo-wrap" style={{ marginBottom: '16px' }}>
              <img
                src="/brapex-logo.png"
                alt="BRAPEX"
                className="brand-logo-img"
                style={{ height: '52px', maxWidth: '190px' }}
              />
            </div>

            <h1>{t.loginHero}</h1>
          </div>

          <div style={{ padding: '24px 16px', maxWidth: '600px', margin: '-35px auto 0', width: '100%' }}>
            <div className="card" style={{ textAlign: 'center', padding: '32px 24px' }}>
              <span className="eyebrow" style={{ justifyContent: 'center' }}>
                <ShieldCheck size={14} />
                <span>{t.loginEyebrow}</span>
              </span>

              <h2 className="serif-title" style={{ fontSize: '1.85rem', marginBottom: '10px' }}>
                {t.loginTitle}
              </h2>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '24px', lineHeight: 1.5 }}>
                {t.loginSub}
              </p>

              {/* Botão Principal: Entrar com Gov.br Funcional */}
              <button
                className="btn-primary"
                style={{ marginBottom: '12px', background: '#1351B4', fontSize: '0.98rem', padding: '16px 22px' }}
                onClick={() => setShowGovModal(true)}
              >
                <span style={{ fontWeight: 900, background: 'white', color: '#1351B4', padding: '2px 7px', borderRadius: '5px', fontSize: '0.8rem' }}>gov</span>
                <span>{t.loginGovBtn}</span>
                <ChevronRight size={18} />
              </button>

              {/* Botão Único de Ajuda & Contato (+55 15 99173-7379 / brapeximportaexporta.com.br) */}
              <button
                className="btn-outline"
                style={{ width: '100%', marginBottom: '18px', padding: '14px 18px' }}
                onClick={() => setShowContactModal(true)}
              >
                <PhoneCall size={16} className="text-emerald-700" />
                <span>{t.loginHelpContactBtn}</span>
              </button>

              {/* Banner de Contato Rápido Direto */}
              <div style={{
                background: '#FAF9F6',
                border: '1px solid var(--border-light)',
                borderRadius: '16px',
                padding: '14px 18px',
                fontSize: '0.8rem',
                color: 'var(--text-muted)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '10px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Phone size={14} className="text-emerald-700" />
                  <strong>+55 (15) 99173-7379</strong>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Mail size={14} className="text-emerald-700" />
                  <strong>brapeximportaexporta.com.br</strong>
                </div>
              </div>

              {/* Security Credentials Footer */}
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '14px',
                flexWrap: 'wrap',
                marginTop: '18px',
                fontSize: '0.72rem',
                color: 'var(--text-subtle)',
                fontWeight: 600
              }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <Check size={12} className="text-emerald-600" /> Acordo ACE 58
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <Check size={12} className="text-emerald-600" /> Siscomex Digital
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <Check size={12} className="text-emerald-600" /> Criptografia Gov.br
                </span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* TELA 2: DASHBOARD INICIAL */}
      {currentScreen === 'screen-dashboard' && (
        <section id="screen-dashboard" className="screen">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <span className="eyebrow">
                <Compass size={14} />
                <span>{t.dashEyebrow}</span>
              </span>
              <h2 className="serif-title" style={{ fontSize: '2rem' }}>{t.dashHello}</h2>
              <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>
                Portal de Operações e Comércio Exterior: Itapetininga ⇄ Peru.
              </p>
            </div>

            {/* Live Ticker Status */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: '#FFFFFF',
              padding: '8px 16px',
              borderRadius: '24px',
              border: '1px solid var(--border-light)',
              fontSize: '0.76rem',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <span className="live-dot"></span>
              <strong>{t.marketLiveBadge}</strong>
              <span style={{ color: 'var(--text-muted)' }}>{lastMarketTime ? `(${lastMarketTime})` : ''}</span>
            </div>
          </div>

          <div className="web-grid-2">
            {/* Inteligência Comercial Destaque */}
            <div className="card" style={{ cursor: 'pointer', transition: 'all 0.2s ease' }} onClick={() => navigate('screen-inteligencia')}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <span className="eyebrow" style={{ color: 'var(--primary-green)' }}>
                    <Sparkles size={14} />
                    <span>{t.highlightTag}</span>
                  </span>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '8px', color: 'var(--text-dark)' }}>{t.intelTitle}</h3>
                  <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{t.intelDesc}</p>
                </div>
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '12px',
                  background: '#ECFDF5',
                  color: 'var(--primary-green)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <ArrowUpRight size={20} />
                </div>
              </div>
            </div>

            {/* Radar de Mercado Mundial */}
            <a
              href="https://comexstat.mdic.gov.br/pt/home"
              target="_blank"
              rel="noopener noreferrer"
              className="card"
              style={{ cursor: 'pointer', display: 'block', textDecoration: 'none', color: 'inherit', transition: 'all 0.2s ease' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', height: '100%' }}>
                <div style={{
                  background: '#ECFDF5',
                  color: 'var(--primary-green)',
                  width: '52px',
                  height: '52px',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: 'var(--shadow-sm)'
                }}>
                  <Globe size={26} className="text-emerald-700" />
                </div>
                <div style={{ flex: 1 }}>
                  <span className="eyebrow" style={{ color: 'var(--primary-green)', margin: 0 }}>COMÉRCIO EXTERIOR</span>
                  <h3 style={{ fontSize: '1.15rem', margin: '4px 0 2px', color: 'var(--text-dark)' }}>{t.radarTitle}</h3>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{t.radarDesc}</p>
                </div>
                <ExternalLink size={18} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
              </div>
            </a>
          </div>

          {/* CONVERSOR DE MOEDAS COM ATUALIZAÇÃO AUTOMÁTICA DO MERCADO (DESIGN FINTECH) */}
          <div className="card-dark">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span className="eyebrow" style={{ color: '#A8BDB2', margin: 0 }}>
                  <TrendingUp size={13} />
                  <span>{t.fxTag}</span>
                </span>
                <span style={{ background: '#FFFFFF', color: 'var(--primary-dark)', fontSize: '0.68rem', fontWeight: 800, padding: '3px 10px', borderRadius: '20px' }}>
                  {isLiveApiRate ? t.fxBadgeLive : t.fxBadge}
                </span>
                <span className={fxDeltaPct >= 0 ? 'price-delta-up' : 'price-delta-down'}>
                  {fxDeltaPct >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                  <span>{fxDeltaPct >= 0 ? `+${fxDeltaPct}%` : `${fxDeltaPct}%`}</span>
                </span>
              </div>

              <div style={{ fontSize: '0.74rem', color: '#A8BDB2', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Clock size={12} />
                <span>{t.marketLastUpdate} {lastMarketTime}</span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px', flexWrap: 'wrap', gap: '6px' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '4px' }}>{t.fxTitle}</h3>
                <p style={{ fontSize: '0.84rem', color: '#D4DFD9' }}>
                  {brlParaPen
                    ? `1 R$ = ${formatBrNumber(fxRate, 4)} S/.`
                    : `1 S/. = R$ ${formatBrNumber(1 / fxRate, 4)}`}
                  {' · '}
                  <span>{t.fxSubLive}</span>
                </p>
              </div>
            </div>

            {/* Layout FinTech de Cotação */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
              {/* Box De */}
              <div className="fintech-box">
                <span style={{ fontSize: '0.72rem', color: '#A8BDB2', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {brlParaPen ? 'Você envia (Origem)' : 'Você envia (Origem)'}
                </span>
                <div className="fintech-input-group" style={{ marginTop: '6px' }}>
                  <div className="fintech-currency-pill">
                    <span style={{ fontSize: '1.2rem' }}>{brlParaPen ? '🇧🇷' : '🇵🇪'}</span>
                    <span>{brlParaPen ? 'BRL (Real)' : 'PEN (Sol)'}</span>
                  </div>
                  <input
                    type="text"
                    inputMode="decimal"
                    id="input-brl"
                    className="fintech-amount-input"
                    value={brlVal}
                    onChange={(e) => handleBrlChange(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') converterMoeda(); }}
                    placeholder="0,00"
                    style={{ background: 'transparent', color: '#FFFFFF', border: 'none', outline: 'none', boxShadow: 'none' }}
                  />
                </div>
              </div>

              {/* Botão Inverter Moedas */}
              <div style={{ display: 'flex', justifyContent: 'center', margin: '-14px 0', zIndex: 5 }}>
                <button
                  type="button"
                  onClick={inverterMoeda}
                  title="Inverter Moedas"
                  style={{
                    background: '#FFFFFF',
                    color: 'var(--primary-dark)',
                    border: '3px solid #0D2218',
                    borderRadius: '50%',
                    width: '42px',
                    height: '42px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                    transition: 'transform 0.2s ease'
                  }}
                >
                  <ArrowUpDown size={18} />
                </button>
              </div>

              {/* Box Para */}
              <div className="fintech-box">
                <span style={{ fontSize: '0.72rem', color: '#A8BDB2', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {brlParaPen ? 'Cotação convertida (Destino)' : 'Cotação convertida (Destino)'}
                </span>
                <div className="fintech-input-group" style={{ marginTop: '6px' }}>
                  <div className="fintech-currency-pill">
                    <span style={{ fontSize: '1.2rem' }}>{brlParaPen ? '🇵🇪' : '🇧🇷'}</span>
                    <span>{brlParaPen ? 'PEN (Sol)' : 'BRL (Real)'}</span>
                  </div>
                  <div style={{ fontSize: '1.55rem', fontWeight: 800, color: '#FFFFFF', textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>
                    {penVal}
                  </div>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="btn-outline"
              style={{ width: '100%', background: 'rgba(255,255,255,0.12)', color: '#FFFFFF', border: '1px solid rgba(255,255,255,0.2)' }}
              onClick={converterMoeda}
            >
              <Sparkles size={16} />
              <span>{t.fxBtn}</span>
            </button>

            {fxConvertedResult && (
              <div style={{
                marginTop: '14px',
                padding: '14px 18px',
                borderRadius: '14px',
                background: fxConvertedResult.valid ? 'rgba(230, 236, 231, 0.16)' : 'rgba(253, 240, 230, 0.16)',
                border: fxConvertedResult.valid ? '1px solid rgba(168, 189, 178, 0.45)' : '1px solid rgba(255, 190, 140, 0.45)',
                fontSize: '0.88rem',
                color: '#FFFFFF'
              }}>
                {fxConvertedResult.valid ? (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                    <span style={{ color: '#D4DFD9', fontSize: '0.8rem' }}>
                      {brlParaPen ? t.fxResultLabel : t.fxResultLabelBrl}
                    </span>
                    <strong style={{ fontSize: '1.05rem', color: '#FFFFFF' }}>
                      {fxConvertedResult.from} = {fxConvertedResult.to}
                    </strong>
                  </div>
                ) : (
                  <span style={{ color: '#FFD8B8', fontSize: '0.82rem', fontWeight: 600 }}>{t.fxEnterValid}</span>
                )}
              </div>
            )}
          </div>

          {/* GRID DE ATALHOS RÁPIDOS BENTO */}
          <div className="shortcut-grid">
            <div className="shortcut-card" onClick={() => navigate('screen-docs')}>
              <div className="shortcut-icon-circle">
                <FileText size={22} />
              </div>
              <h4>{t.shortDocsTitle}</h4>
              <p>{t.shortDocsDesc}</p>
            </div>
            <div className="shortcut-card" onClick={() => navigate('screen-rastreamento')}>
              <div className="shortcut-icon-circle">
                <Search size={22} />
              </div>
              <h4>{t.shortTrackTitle}</h4>
              <p>{t.shortTrackDesc}</p>
            </div>
            <div className="shortcut-card" onClick={() => navigate('screen-guia')}>
              <div className="shortcut-icon-circle">
                <Layers size={22} />
              </div>
              <h4>{t.shortNcmTitle}</h4>
              <p>{t.shortNcmDesc}</p>
            </div>
            <div className="shortcut-card" onClick={() => navigate('screen-produtos')}>
              <div className="shortcut-icon-circle">
                <Package size={22} />
              </div>
              <h4>{t.shortProductsTitle}</h4>
              <p>{t.shortProductsDesc}</p>
            </div>
            <div className="shortcut-card" onClick={() => navigate('screen-frete')}>
              <div className="shortcut-icon-circle">
                <Truck size={22} />
              </div>
              <h4>{t.shortFreightTitle}</h4>
              <p>{t.shortFreightDesc}</p>
            </div>
          </div>

          {/* Card Resumido de Rastreamento Ativo */}
          <div className="card-mint" style={{ cursor: 'pointer' }} onClick={() => navigate('screen-rastreamento')}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span className="eyebrow" style={{ margin: 0 }}>
                <Clock size={13} />
                <span>{t.trackCardEyebrow}</span>
              </span>
              <ArrowUpRight size={18} className="text-emerald-800" />
            </div>
            <p style={{ fontSize: '0.92rem', fontWeight: 800, marginBottom: '12px', color: 'var(--primary-dark)' }}>
              {t.trackCardSteps}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '10px', fontSize: '0.82rem' }}>
              <div style={{ background: '#FFFFFF', padding: '10px 12px', borderRadius: '12px', border: '1px solid #D2E0D6' }}>
                <strong style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.72rem' }}>{t.trackLotLabel}</strong>
                <span style={{ fontWeight: 800 }}>BRP-2026-001</span>
              </div>
              <div style={{ background: '#FFFFFF', padding: '10px 12px', borderRadius: '12px', border: '1px solid #D2E0D6' }}>
                <strong style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.72rem' }}>{t.trackProdLabel}</strong>
                <span style={{ fontWeight: 700 }}>{t.trackProdVal}</span>
              </div>
              <div style={{ background: '#FFFFFF', padding: '10px 12px', borderRadius: '12px', border: '1px solid #D2E0D6' }}>
                <strong style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.72rem' }}>{t.trackLocLabel}</strong>
                <span style={{ fontWeight: 700 }}>{t.trackLocVal}</span>
              </div>
              <div style={{ background: '#FFFFFF', padding: '10px 12px', borderRadius: '12px', border: '1px solid #D2E0D6' }}>
                <strong style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.72rem' }}>{t.trackEtaLabel}</strong>
                <span style={{ fontWeight: 800, color: 'var(--primary-green)' }}>{t.trackEtaVal}</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* TELA 3: INTELIGÊNCIA COMERCIAL */}
      {currentScreen === 'screen-inteligencia' && (
        <section id="screen-inteligencia" className="screen">
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="eyebrow" style={{ margin: 0 }}>
                <Sparkles size={14} />
                <span>{t.intelTitle.toUpperCase()}</span>
              </span>
              <span style={{ background: '#E6F2EB', color: '#19583D', fontSize: '0.72rem', fontWeight: 800, padding: '4px 12px', borderRadius: '20px' }}>
                {t.intelActive}
              </span>
            </div>
            <h2 className="serif-title" style={{ fontSize: '1.85rem', margin: '8px 0 16px' }}>{t.intelHeading}</h2>

            <div className="pill-switch">
              <button
                className={`pill-btn ${fluxoBrasil ? 'active' : ''}`}
                onClick={() => setFluxoBrasil(true)}
              >
                <span>🇧🇷 ➔ 🇵🇪</span>
                <span>{t.intelFlowBr}</span>
              </button>
              <button
                className={`pill-btn ${!fluxoBrasil ? 'active' : ''}`}
                onClick={() => setFluxoBrasil(false)}
              >
                <span>🇵🇪 ➔ 🇧🇷</span>
                <span>{t.intelFlowPe}</span>
              </button>
            </div>

            <div className="web-grid-2">
              <div className="form-group">
                <label>{t.intelCityLabel}</label>
                <input type="text" placeholder={t.intelCityPlaceholder} defaultValue="Itapetininga - SP, Brasil" />
              </div>

              <div className="form-group">
                <label>{t.intelSearchLabel}</label>
                <input
                  type="text"
                  placeholder={t.intelSearchPlaceholder}
                  value={intelSearchQuery}
                  onChange={(e) => setIntelSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div style={{ border: '1px solid var(--border-light)', borderRadius: '18px', overflow: 'hidden', marginBottom: '14px' }}>
              {t.intelItems
                .filter((item) => item.toLowerCase().includes(intelSearchQuery.toLowerCase()))
                .map((item, idx) => (
                  <div
                    key={idx}
                    className={`list-row ${selectedIntelItems[idx] ? 'selected' : ''}`}
                    onClick={() => setSelectedIntelItems((prev) => ({ ...prev, [idx]: !prev[idx] }))}
                  >
                    <span>{item}</span>
                    <span style={{
                      width: '26px',
                      height: '26px',
                      borderRadius: '50%',
                      background: selectedIntelItems[idx] ? 'var(--primary-green)' : '#F0EEE8',
                      color: selectedIntelItems[idx] ? '#FFFFFF' : 'var(--text-muted)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.85rem',
                      fontWeight: 800
                    }}>
                      {selectedIntelItems[idx] ? '✓' : '+'}
                    </span>
                  </div>
                ))}
            </div>

            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '18px', lineHeight: 1.5 }}>
              {t.intelHint}
            </p>

            <button className="btn-green" onClick={() => navigate('screen-produtos')}>
              <Package size={17} />
              <span>{t.intelSearchBtn}</span>
            </button>
          </div>
        </section>
      )}

      {/* TELA 4: PRODUTOS & COTAÇÕES (CORRIGIDO: O QUE VEM DE PERU PRA ITAPETININGA COM CARDS DE THUMBNAILS DO PRINT) */}
      {currentScreen === 'screen-produtos' && (
        <section id="screen-produtos" className="screen">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <span className="eyebrow">
                <Package size={14} />
                <span>{t.prodEyebrow}</span>
              </span>
              <h2 className="serif-title" style={{ fontSize: '1.85rem' }}>{t.prodTitle}</h2>
              <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>{t.prodSub}</p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--badge-green-bg)', padding: '8px 14px', borderRadius: '20px', fontSize: '0.76rem', fontWeight: 800 }}>
              <span className="live-dot"></span>
              <span>Mercado em Tempo Real</span>
            </div>
          </div>

          {/* Campo de Busca conforme Print */}
          <div className="form-group" style={{ margin: 0 }}>
            <label style={{ fontSize: '0.84rem', fontWeight: 700 }}>Pesquise um produto</label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="Pesquise um produto"
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                style={{ paddingLeft: '42px', fontSize: '0.94rem' }}
              />
              <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            </div>
          </div>

          {/* Botões de Alternância de Rota conforme Print */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button
              className={`route-btn ${routePeToItp ? 'active' : ''}`}
              onClick={() => setRoutePeToItp(true)}
            >
              <span>De: Peru ➔ Para: Itapetininga</span>
            </button>

            <button
              className={`route-btn ${!routePeToItp ? 'active' : ''}`}
              onClick={() => setRoutePeToItp(false)}
            >
              <span>De: Itapetininga ➔ Para: Peru</span>
            </button>
          </div>

          {/* Banner de Rota Ativa com Fornecedores (conforme o print do usuário) */}
          <div className="product-card-grid">
            {/* Card Informativo de Fornecedores */}
            <div style={{
              background: '#F6F4ED',
              border: '1px solid var(--border-card)',
              borderRadius: '20px',
              padding: '16px 18px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <strong style={{ fontSize: '0.96rem', color: 'var(--text-dark)', marginBottom: '4px' }}>
                {routePeToItp ? t.suppliersPeTitle : t.suppliersBrTitle}
              </strong>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                {routePeToItp ? t.suppliersPeSub : t.suppliersBrSub}
              </p>
            </div>

            {/* Listagem de Produtos com Thumbnails e Preços Dinâmicos */}
            {filteredProducts.map((item) => (
              <div
                key={item.id}
                className={`product-thumb-card ${selectedProductKey === item.id ? 'selected' : ''}`}
                onClick={() => {
                  setSelectedProductKey(item.id);
                  navigate('screen-docs');
                  showToast(`Item selecionado: ${item.name}`);
                }}
              >
                <img
                  src={item.imgUrl}
                  alt={item.name}
                  className="product-thumb-img"
                  onError={(e) => {
                    // Fallback to placeholder if offline
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=120&q=80';
                  }}
                />
                <div className="product-thumb-info">
                  <strong>{item.name}</strong>
                  <span>{item.supplier}</span>
                  <div className="product-price-tag">
                    <span>{item.currency} {formatBrNumber(item.price, 1)} {item.unit}</span>
                    <span className={item.deltaPct >= 0 ? 'price-delta-up' : 'price-delta-down'}>
                      {item.deltaPct >= 0 ? `▲ +${item.deltaPct}%` : `▼ ${item.deltaPct}%`}
                    </span>
                  </div>
                </div>
                <ChevronRight size={18} style={{ color: 'var(--primary-green)', opacity: 0.8 }} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* TELA 5: FLUXO DOCUMENTAL UNIFICADO (SEM REDUNDÂNCIAS) */}
      {currentScreen === 'screen-docs' && (
        <section id="screen-docs" className="screen">
          <div className="card-dark">
            <span className="eyebrow" style={{ color: '#A8BDB2' }}>
              <FileCheck size={14} />
              <span>{t.docsEyebrow}</span>
            </span>
            <h2 className="serif-title" style={{ fontSize: '1.75rem', marginBottom: '8px', color: '#FFFFFF' }}>{t.docsTitle}</h2>
            <p style={{ fontSize: '0.86rem', color: '#D4DFD9', marginBottom: '18px' }}>{t.docsSub}</p>

            {/* Stepper Visual */}
            <div className="stepper-bar">
              <div className="stepper-step completed">
                <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#A8BDB2' }}>1. Item</span>
              </div>
              <div className="stepper-step active">
                <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#FFFFFF' }}>2. Documentos</span>
              </div>
              <div className="stepper-step">
                <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'rgba(255,255,255,0.5)' }}>3. Taxas Gov</span>
              </div>
              <div className="stepper-step">
                <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'rgba(255,255,255,0.5)' }}>4. Despacho</span>
              </div>
            </div>

            <div style={{ background: '#FFFFFF', color: 'var(--text-dark)', borderRadius: '20px', padding: '20px' }}>
              <strong style={{ fontSize: '0.96rem', display: 'block', marginBottom: '6px' }}>
                {t.docsChecklistTitle}
              </strong>
              <label style={{ fontSize: '0.8rem', display: 'block', marginBottom: '6px', fontWeight: 600 }}>
                {t.docsChecklistLabel}
              </label>

              <select
                style={{ marginBottom: '14px', fontWeight: 700 }}
                value={selectedProductKey}
                onChange={(e) => setSelectedProductKey(e.target.value)}
              >
                <optgroup label="Importação (Peru ➔ Itapetininga)">
                  <option value="garlic">Alho Roxo Peruano (NCM 0703.20.90)</option>
                  <option value="copper">Cobre Refinado em Cátodos (NCM 7403.11.00)</option>
                  <option value="iron">Ferro e Pelotas Siderúrgicas (NCM 7200.00.00)</option>
                  <option value="fishmeal">Farinha de Peixe Premium (NCM 2301.20.90)</option>
                  <option value="fertilizer">Fertilizantes e Fosfatos (NCM 3105.20.00)</option>
                  <option value="zinc">Zinco e Minérios Refinados (NCM 7901.11.00)</option>
                </optgroup>
                <optgroup label="Exportação (Itapetininga ➔ Peru)">
                  <option value="corn">Milho em Grão a Granel (NCM 1005.90.10)</option>
                  <option value="pork">Carne Suína Resfriada (NCM 0203.11.00)</option>
                  <option value="wood">Madeira Serrada / Pinus (NCM 4407.11.00)</option>
                  <option value="soy">Soja em Grãos e Farelo (NCM 1201.90.00)</option>
                  <option value="orange">Suco de Laranja e Cítricos (NCM 2009.11.00)</option>
                </optgroup>
              </select>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-mint)', padding: '12px 16px', borderRadius: '14px', fontSize: '0.82rem', flexWrap: 'wrap', gap: '8px' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <strong>Código NCM:</strong>
                  {renderSiglaBadge('NCM')}
                  <span>{getNcmByProductKey(selectedProductKey)}</span>
                </span>
                <span style={{ background: '#FFFFFF', padding: '5px 10px', borderRadius: '8px', fontWeight: 800, color: 'var(--primary-green)', border: '1px solid #C8D6CD' }}>
                  Acordo ACE 58
                </span>
              </div>
            </div>
          </div>

          {/* AVISO ALFANDEGÁRIO & PRAZO DE VALIDAÇÃO DE DOCUMENTOS */}
          <div className="alert-warning-card">
            <AlertTriangle size={18} style={{ flexShrink: 0, marginTop: '2px', color: '#D97706' }} />
            <div>
              <strong style={{ display: 'block', marginBottom: '2px', color: '#92400E' }}>
                Aviso Oficial da Alfândega (Receita Federal & SUNAT):
              </strong>
              <span>{t.customsWarning}</span>
            </div>
          </div>

          <div className="alert-warning-card info" style={{ marginTop: '-6px' }}>
            <Clock size={18} style={{ flexShrink: 0, marginTop: '2px', color: '#2563EB' }} />
            <div>
              <strong style={{ display: 'block', marginBottom: '2px', color: '#1E40AF' }}>
                Prazo de Validação de Documentos:
              </strong>
              <span>{t.docsValidationNotice}</span>
            </div>
          </div>

          {/* Atalhos Rápidos para Siglas do Processo Aduaneiro */}
          <div style={{ background: '#FFFFFF', border: '1px solid var(--border-card)', borderRadius: '16px', padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-dark)' }}>
              <HelpCircle size={16} className="text-emerald-700" />
              <span>Dúvidas com as siglas? Clique para ver:</span>
            </div>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {renderSiglaBadge('Invoice')}
              {renderSiglaBadge('Packing List')}
              {renderSiglaBadge('DU-E')}
              {renderSiglaBadge('DUIMP')}
              {renderSiglaBadge('BL / AWB')}
              {renderSiglaBadge('NCM')}
              {renderSiglaBadge('FOB')}
              {renderSiglaBadge('CIF')}
            </div>
          </div>

          <div className="card">
            <span className="eyebrow">
              <Layers size={13} />
              <span>{t.docsFlowEyebrow}</span>
            </span>
            <h3 className="serif-title" style={{ fontSize: '1.4rem', marginBottom: '14px' }}>
              {t.docsFlowTitle}
            </h3>

            <div className="web-grid-2">
              <div className="form-group">
                <label>{t.docsQtyLabel}</label>
                <input
                  type="number"
                  id="doc-kg"
                  placeholder={t.docsQtyPlaceholder}
                  value={docQtyKg}
                  onChange={(e) => setDocQtyKg(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>{t.docsOriginLabel}</label>
                <input type="text" defaultValue={routePeToItp ? 'Porto de Callao / Lima, Peru' : 'Itapetininga - SP, Brasil'} />
              </div>
            </div>

            <div className="form-group">
              <label>{t.docsDestLabel}</label>
              <input type="text" defaultValue={routePeToItp ? 'Itapetininga - SP, Brasil' : 'Porto de Callao / Lima, Peru'} />
            </div>

            <div style={{ background: '#FAF3E3', padding: '14px 18px', borderRadius: '14px', fontSize: '0.8rem', color: '#7A5C20', marginBottom: '20px', border: '1px solid #EEDFBA', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <ShieldCheck size={18} style={{ flexShrink: 0 }} />
              <div>{t.docsNotice}</div>
            </div>

            {/* Checklist de Anexos Modernizados com Drag & Drop */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
              {/* Doc 1 */}
              <div className={`upload-dropzone ${doc1Attached ? 'attached' : ''}`} onClick={() => fileInputRef1.current?.click()}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: doc1Attached ? '#E6F2EB' : '#EEF2EE', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {doc1Attached ? <CheckCircle2 size={18} className="text-emerald-700" /> : <UploadCloud size={18} className="text-emerald-800" />}
                    </div>
                    <div style={{ textAlign: 'left' }}>
                      <strong style={{ fontSize: '0.94rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span>{t.doc1Title}</span>
                        {renderSiglaBadge('Invoice')}
                      </strong>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        {uploadedFiles[1] || t.docNoFile}
                      </span>
                    </div>
                  </div>
                  <span style={{
                    background: doc1Attached ? 'var(--badge-green-bg)' : 'var(--badge-orange-bg)',
                    color: doc1Attached ? 'var(--badge-green-text)' : 'var(--badge-orange-text)',
                    fontSize: '0.74rem', padding: '4px 12px', borderRadius: '12px', fontWeight: 800
                  }}>
                    {doc1Attached ? t.docAttached : t.docPending}
                  </span>
                </div>
                <input
                  type="file"
                  ref={fileInputRef1}
                  style={{ display: 'none' }}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setUploadedFiles((prev) => ({ ...prev, 1: file.name }));
                      setDoc1Attached(true);
                      showToast(`Arquivo "${file.name}" anexado com sucesso!`);
                    }
                  }}
                />
              </div>

              {/* Doc 2 */}
              <div className={`upload-dropzone ${doc2Attached ? 'attached' : ''}`} onClick={() => fileInputRef2.current?.click()}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: doc2Attached ? '#E6F2EB' : '#EEF2EE', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {doc2Attached ? <CheckCircle2 size={18} className="text-emerald-700" /> : <UploadCloud size={18} className="text-emerald-800" />}
                    </div>
                    <div style={{ textAlign: 'left' }}>
                      <strong style={{ fontSize: '0.94rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span>{t.doc2Title}</span>
                        {renderSiglaBadge('NCM')}
                      </strong>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        {uploadedFiles[2] || t.docNoFile}
                      </span>
                    </div>
                  </div>
                  <span style={{
                    background: doc2Attached ? 'var(--badge-green-bg)' : 'var(--badge-orange-bg)',
                    color: doc2Attached ? 'var(--badge-green-text)' : 'var(--badge-orange-text)',
                    fontSize: '0.74rem', padding: '4px 12px', borderRadius: '12px', fontWeight: 800
                  }}>
                    {doc2Attached ? t.docAttached : t.docPending}
                  </span>
                </div>
                <input
                  type="file"
                  ref={fileInputRef2}
                  style={{ display: 'none' }}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setUploadedFiles((prev) => ({ ...prev, 2: file.name }));
                      setDoc2Attached(true);
                      showToast(`Arquivo "${file.name}" anexado com sucesso!`);
                    }
                  }}
                />
              </div>

              {/* Doc 3 */}
              <div className={`upload-dropzone ${doc3Attached ? 'attached' : ''}`} onClick={() => fileInputRef3.current?.click()}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: doc3Attached ? '#E6F2EB' : '#EEF2EE', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {doc3Attached ? <CheckCircle2 size={18} className="text-emerald-700" /> : <UploadCloud size={18} className="text-emerald-800" />}
                    </div>
                    <div style={{ textAlign: 'left' }}>
                      <strong style={{ fontSize: '0.94rem', display: 'block' }}>{t.doc3Title}</strong>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        {uploadedFiles[3] || t.docNoFile}
                      </span>
                    </div>
                  </div>
                  <span style={{
                    background: doc3Attached ? 'var(--badge-green-bg)' : 'var(--badge-orange-bg)',
                    color: doc3Attached ? 'var(--badge-green-text)' : 'var(--badge-orange-text)',
                    fontSize: '0.74rem', padding: '4px 12px', borderRadius: '12px', fontWeight: 800
                  }}>
                    {doc3Attached ? t.docAttached : t.docPending}
                  </span>
                </div>
                <input
                  type="file"
                  ref={fileInputRef3}
                  style={{ display: 'none' }}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setUploadedFiles((prev) => ({ ...prev, 3: file.name }));
                      setDoc3Attached(true);
                      showToast(`Arquivo "${file.name}" anexado com sucesso!`);
                    }
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', fontSize: '0.9rem' }}>
              <strong>{totalDocs} {t.docCounterSuffix}</strong>
              <span style={{
                background: totalDocs === 3 ? 'var(--badge-green-bg)' : 'var(--badge-blue-bg)',
                color: totalDocs === 3 ? 'var(--badge-green-text)' : 'var(--badge-blue-text)',
                padding: '6px 14px', borderRadius: '16px', fontSize: '0.78rem', fontWeight: 800
              }}>
                {totalDocs === 3 ? t.docCompleted : t.docPending}
              </span>
            </div>

            <button
              className="btn-green"
              style={{ fontSize: '1rem', padding: '16px' }}
              onClick={() => navigate('screen-pagamento')}
            >
              <ShieldCheck size={18} />
              <span>{t.docsPayBtn}</span>
            </button>
          </div>
        </section>
      )}

      {/* TELA 6: PAGAMENTO DAS TAXAS ADUANEIRAS */}
      {currentScreen === 'screen-pagamento' && (
        <section id="screen-pagamento" className="screen">
          <div style={{ background: 'var(--primary-dark)', color: 'white', padding: '28px', borderRadius: '24px', boxShadow: 'var(--shadow-md)' }}>
            <span className="eyebrow" style={{ color: '#A8BDB2' }}>TAXAS FEDERAIS SISCOMEX</span>
            <h2 style={{ fontSize: '1.55rem', margin: '4px 0 6px', color: '#FFFFFF' }}>{t.payTitle}</h2>
            <p style={{ fontSize: '0.86rem', opacity: 0.9 }}>{t.paySub}</p>
          </div>

          <div className="card">
            <h3 style={{ fontSize: '1.2rem', marginBottom: '16px' }}>{t.paySummaryTitle}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.92rem', marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>{t.payFeeExport}</span>
                <strong>R$ 180,00</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>{t.payFeeGov}</span>
                <strong>R$ 45,00</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>{t.payFeeService}</span>
                <strong>R$ 20,00</strong>
              </div>
              <hr style={{ border: 'none', borderTop: '1px solid var(--border-light)' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem' }}>
                <strong>{t.payTotal}</strong>
                <strong style={{ color: 'var(--primary-green)' }}>R$ 245,00</strong>
              </div>
            </div>

            {/* Aviso de Atualização Alfandegária */}
            <div className="alert-warning-card" style={{ marginBottom: '18px' }}>
              <AlertTriangle size={18} style={{ flexShrink: 0, marginTop: '2px', color: '#D97706' }} />
              <div>
                <strong style={{ display: 'block', marginBottom: '2px', color: '#92400E' }}>
                  Aviso da Alfândega:
                </strong>
                <span>{t.customsWarning}</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
              <button
                className="btn-outline"
                style={{
                  flex: 1,
                  background: paymentMethod === 'pix' ? 'var(--primary-dark)' : '#FFFFFF',
                  color: paymentMethod === 'pix' ? '#FFFFFF' : 'var(--primary-dark)',
                  borderColor: paymentMethod === 'pix' ? 'var(--primary-dark)' : 'var(--border-light)'
                }}
                onClick={() => setPaymentMethod('pix')}
              >
                <span>{t.payMethodPix}</span>
              </button>
              <button
                className="btn-outline"
                style={{
                  flex: 1,
                  background: paymentMethod === 'qr' ? 'var(--primary-dark)' : '#FFFFFF',
                  color: paymentMethod === 'qr' ? '#FFFFFF' : 'var(--primary-dark)',
                  borderColor: paymentMethod === 'qr' ? 'var(--primary-dark)' : 'var(--border-light)'
                }}
                onClick={() => setPaymentMethod('qr')}
              >
                <span>{t.payMethodQr}</span>
              </button>
              <button
                className="btn-outline"
                style={{
                  flex: 1,
                  background: paymentMethod === 'boleto' ? 'var(--primary-dark)' : '#FFFFFF',
                  color: paymentMethod === 'boleto' ? '#FFFFFF' : 'var(--primary-dark)',
                  borderColor: paymentMethod === 'boleto' ? 'var(--primary-dark)' : 'var(--border-light)'
                }}
                onClick={() => setPaymentMethod('boleto')}
              >
                <span>{t.payMethodBoleto}</span>
              </button>
            </div>

            {/* Pix / QR / Boleto Details */}
            {paymentMethod !== 'boleto' ? (
              <div className="card" style={{ textAlign: 'center', background: '#FAF9F6', padding: '24px' }}>
                <span className="eyebrow" style={{ justifyContent: 'center' }}>{t.payPixEyebrow}</span>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '14px' }}>{t.payPixTitle}</h4>

                {/* Mensagem do Pix para o Peru */}
                <div className="alert-warning-card danger" style={{ textAlign: 'left', margin: '0 0 18px' }}>
                  <AlertTriangle size={18} style={{ flexShrink: 0, marginTop: '2px', color: '#DC2626' }} />
                  <div>
                    <strong style={{ display: 'block', marginBottom: '2px', color: '#991B1B' }}>
                      Atenção para Operações com o Peru:
                    </strong>
                    <span style={{ fontSize: '0.8rem', color: '#7F1D1D' }}>{t.payPixPeruWarning}</span>
                  </div>
                </div>

                <div style={{ background: 'white', padding: '18px', borderRadius: '18px', display: 'inline-block', boxShadow: '0 6px 18px rgba(0,0,0,0.06)', marginBottom: '16px' }}>
                  <svg width="160" height="160" viewBox="0 0 100 100" fill="#0D2218">
                    <rect x="5" y="5" width="25" height="25" fill="none" stroke="#0D2218" strokeWidth="5" />
                    <rect x="12" y="12" width="11" height="11" />
                    <rect x="70" y="5" width="25" height="25" fill="none" stroke="#0D2218" strokeWidth="5" />
                    <rect x="77" y="12" width="11" height="11" />
                    <rect x="5" y="70" width="25" height="25" fill="none" stroke="#0D2218" strokeWidth="5" />
                    <rect x="12" y="77" width="11" height="11" />
                    <rect x="40" y="10" width="8" height="8" /><rect x="52" y="22" width="8" height="8" />
                    <rect x="38" y="40" width="12" height="12" /><rect x="58" y="45" width="8" height="16" />
                    <rect x="10" y="42" width="14" height="8" /><rect x="42" y="68" width="10" height="10" />
                    <rect x="65" y="72" width="20" height="8" /><rect x="75" y="85" width="15" height="8" />
                  </svg>
                </div>

                <div style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--primary-dark)', marginBottom: '4px' }}>
                  R$ 245,00
                </div>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                  {t.payPixDesc}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <button className="btn-outline" style={{ width: '100%' }} onClick={copyPix}>
                    {pixCopied ? <Check size={16} className="text-emerald-700" /> : <Copy size={16} />}
                    <span>{pixCopied ? t.payCopiedFeedback : t.payCopyBtn}</span>
                  </button>

                  <button
                    className="btn-green"
                    style={{ width: '100%' }}
                    onClick={() => {
                      setPaymentDone(true);
                      showToast(t.paySuccessNotice);
                      setTimeout(() => navigate('screen-rastreamento'), 1000);
                    }}
                  >
                    <CheckCircle2 size={16} />
                    <span>{t.payConfirmSimBtn}</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="card" style={{ textAlign: 'center', background: '#FAF9F6', padding: '24px' }}>
                <span className="eyebrow" style={{ justifyContent: 'center' }}>BOLETO BANCÁRIO GOV.BR</span>
                <h4 style={{ fontSize: '1.15rem', marginBottom: '12px' }}>Linha Digitável Gerada</h4>
                <div style={{ fontFamily: 'monospace', background: 'white', padding: '14px', borderRadius: '12px', fontSize: '0.86rem', marginBottom: '16px', border: '1px dashed #C0BCB0' }}>
                  34191.79001 01043.510047 91020.150008 8 96540000024500
                </div>
                <button
                  className="btn-outline"
                  style={{ width: '100%', marginBottom: '10px' }}
                  onClick={() => {
                    navigator.clipboard?.writeText('34191.79001 01043.510047 91020.150008 8 96540000024500');
                    showToast('Linha digitável do boleto copiada!');
                  }}
                >
                  <Copy size={16} />
                  <span>Copiar Código de Barras</span>
                </button>
                <button
                  className="btn-green"
                  style={{ width: '100%' }}
                  onClick={() => {
                    setPaymentDone(true);
                    showToast('Boleto compensado com sucesso na demonstração!');
                    setTimeout(() => navigate('screen-rastreamento'), 1000);
                  }}
                >
                  <CheckCircle2 size={16} />
                  <span>Simular Compensação do Boleto →</span>
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* TELA 7: SIMULADOR DE FRETE FUNCIONAL */}
      {currentScreen === 'screen-frete' && (
        <section id="screen-frete" className="screen">
          <div className="card">
            <span className="eyebrow">
              <Truck size={14} />
              <span>{t.freightEyebrow}</span>
            </span>
            <h2 className="serif-title" style={{ fontSize: '1.85rem', marginBottom: '8px' }}>{t.freightTitle}</h2>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginBottom: '22px' }}>{t.freightSub}</p>

            <div className="web-grid-2">
              <div className="form-group">
                <label>{t.freightProdLabel}</label>
                <select id="frete-prod" value={freteProd} onChange={(e) => setFreteProd(e.target.value)}>
                  <option value="alho">Alho Roxo Peruano (Importação)</option>
                  <option value="cobre">Cobre Eletrolítico / Cátodos (Importação)</option>
                  <option value="ferro">Ferro e Siderurgia (Importação)</option>
                  <option value="peixe">Farinha de Peixe 68% (Importação)</option>
                  <option value="milho">Milho em Grão a Granel (Exportação)</option>
                  <option value="madeira">Madeira Serrada / Pinus (Exportação)</option>
                  <option value="suino">Carne Suína Resfriada (Exportação)</option>
                </select>
              </div>

              <div className="form-group">
                <label>{t.freightValLabel}</label>
                <input
                  type="number"
                  id="frete-valor"
                  placeholder="Ex: 5000"
                  value={freteValor}
                  onChange={(e) => setFreteValor(e.target.value)}
                />
              </div>
            </div>

            <div className="web-grid-3">
              <div className="form-group">
                <label>{t.freightWeightLabel}</label>
                <input
                  type="number"
                  id="frete-peso"
                  placeholder="Ex: 1200"
                  value={fretePeso}
                  onChange={(e) => setFretePeso(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>{t.freightOriginLabel}</label>
                <input type="text" value={freteOrigem} onChange={(e) => setFreteOrigem(e.target.value)} />
              </div>

              <div className="form-group">
                <label>{t.freightDestLabel}</label>
                <input type="text" value={freteDestino} onChange={(e) => setFreteDestino(e.target.value)} />
              </div>
            </div>

            <button className="btn-green" onClick={calcularFrete}>
              <Truck size={18} />
              <span>{t.freightBtn}</span>
            </button>

            {freteResultado && (
              <div
                id="frete-resultado"
                style={{
                  marginTop: '18px',
                  padding: '18px',
                  background: freteResultado.type === 'err' ? '#FDF0E6' : 'var(--bg-mint)',
                  borderRadius: '16px',
                  fontSize: '0.9rem',
                  color: freteResultado.type === 'err' ? '#C66A2C' : 'inherit',
                  border: freteResultado.type === 'err' ? '1px solid #F5C6A5' : '1px solid #C8D6CD'
                }}
              >
                {freteResultado.type === 'err' ? (
                  <strong>{t.freightWeightError}</strong>
                ) : (
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <strong>{t.freightEstimatePrefix}</strong>
                      <span style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--primary-green)' }}>
                        R$ {freteResultado.value}
                      </span>
                    </div>
                    <span style={{ fontSize: '0.8rem', color: '#5C6660' }}>{t.freightEstimateSuffix}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      )}

      {/* TELA 8: RASTREAMENTO & CHATBOT */}
      {currentScreen === 'screen-rastreamento' && (
        <section id="screen-rastreamento" className="screen">
          <div>
            <span className="eyebrow">
              <Search size={14} />
              <span>{t.trackEyebrow}</span>
            </span>
            <h2 className="serif-title" style={{ fontSize: '1.85rem', marginBottom: '6px' }}>{t.trackTitle}</h2>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginBottom: '8px' }}>{t.trackSub}</p>
            <p style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--primary-green)' }}>{t.trackTry}</p>
          </div>

          <div className="card">
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <input
                type="text"
                id="track-code"
                placeholder={t.trackPlaceholder}
                value={trackCode}
                onChange={(e) => setTrackCode(e.target.value)}
                style={{ flex: 1, minWidth: '200px' }}
              />
              <button className="btn-green" style={{ width: 'auto', padding: '12px 22px' }} onClick={animarRota}>
                <Search size={16} />
                <span>{t.trackBtn}</span>
              </button>
            </div>
          </div>

          {/* ANIMAÇÃO DE ROTA SIMPLIFICADA */}
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px', flexWrap: 'wrap', gap: '8px' }}>
              <div>
                <span className="eyebrow" style={{ margin: 0 }}>
                  <Truck size={13} />
                  <span>{t.routeEyebrow}</span>
                </span>
                <h3 style={{ fontSize: '1.25rem', margin: 0 }}>{t.routeTitle}</h3>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button className="btn-green" style={{ width: 'auto', padding: '8px 16px', fontSize: '0.82rem' }} onClick={animarRota}>
                  <Play size={14} />
                  <span>{t.routeAnimBtn}</span>
                </button>
                <button className="btn-outline" style={{ width: 'auto', padding: '8px 14px', fontSize: '0.82rem' }} onClick={resetarRota}>
                  <RotateCcw size={14} />
                  <span>{t.routeResetBtn}</span>
                </button>
              </div>
            </div>

            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '14px' }}>{t.routeDesc}</p>

            <div className="map-canvas">
              <svg width="100%" height="100%" viewBox="0 0 300 200" preserveAspectRatio="none">
                <path d="M 55 155 Q 140 100 235 45" stroke="#1F5F43" strokeWidth="3" strokeDasharray="6,6" fill="none" opacity="0.8" />
              </svg>
              <div className="map-pin" style={{ top: '20px', right: '20px', color: '#B91C1C' }}>
                <span style={{ fontSize: '0.9rem' }}>🇵🇪</span>
                <span>{t.routePinDest}</span>
              </div>
              <div
                id="truck-el"
                className="truck-marker"
                style={{ left: truckPos.left, bottom: truckPos.bottom }}
              >
                <Truck size={20} />
              </div>
              <div className="map-pin" style={{ bottom: '20px', left: '20px', color: '#19583D' }}>
                <span style={{ fontSize: '0.9rem' }}>🇧🇷</span>
                <span>{t.routePinOrigin}</span>
              </div>
              <span id="route-status" style={{ position: 'absolute', bottom: '16px', right: '18px', fontSize: '0.76rem', fontWeight: 800, color: 'var(--primary-dark)', background: 'white', padding: '6px 12px', borderRadius: '16px', boxShadow: 'var(--shadow-sm)' }}>
                {routeStatusText}
              </span>
            </div>

            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t.routeFooterNote}</p>
          </div>

          {/* Chatbot com Informações de Contato Oficiais */}
          <div className="card-mint">
            <span className="eyebrow">
              <MessageCircle size={14} />
              <span>{t.chatEyebrow}</span>
            </span>
            <h2 className="serif-title" style={{ fontSize: '1.65rem', marginBottom: '8px' }}>{t.chatTitle}</h2>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginBottom: '16px' }}>{t.chatSub}</p>

            <div className="card" style={{ padding: '18px' }}>
              <div
                id="chat-history"
                style={{
                  background: 'var(--bg-mint)',
                  borderRadius: '16px',
                  padding: '16px',
                  minHeight: '160px',
                  maxHeight: '260px',
                  overflowY: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  marginBottom: '14px'
                }}
              >
                {chatMessages.map((msg, i) => (
                  <div
                    key={i}
                    style={{
                      background: msg.sender === 'user' ? '#0D2218' : '#FFFFFF',
                      color: msg.sender === 'user' ? 'white' : 'inherit',
                      padding: '12px 16px',
                      borderRadius: '16px',
                      fontSize: '0.86rem',
                      lineHeight: 1.5,
                      maxWidth: '85%',
                      alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
                    }}
                  >
                    {getBotText(msg)}
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  id="chat-msg-input"
                  placeholder={t.chatPlaceholder}
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') enviarChat(); }}
                />
                <button className="btn-green" style={{ width: 'auto', padding: '12px 20px' }} onClick={enviarChat}>
                  <Send size={16} />
                  <span>{t.chatSendBtn}</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* TELA 9: GUIA ADUANEIRO DIGITAL */}
      {currentScreen === 'screen-guia' && (
        <section id="screen-guia" className="screen">
          <div>
            <span className="eyebrow">
              <Layers size={14} />
              <span>{t.guideEyebrow}</span>
            </span>
            <h2 className="serif-title" style={{ fontSize: '1.85rem', marginBottom: '12px' }}>{t.guideTitle}</h2>

            {/* Aviso da Alfândega */}
            <div className="alert-warning-card" style={{ marginBottom: '16px' }}>
              <AlertTriangle size={18} style={{ flexShrink: 0, marginTop: '2px', color: '#D97706' }} />
              <div>
                <strong style={{ display: 'block', marginBottom: '2px', color: '#92400E' }}>
                  Aviso Oficial da Alfândega (Receita Federal & SUNAT):
                </strong>
                <span>{t.customsWarning}</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '14px' }}>
              <button className="btn-green" onClick={() => setShowNcmInfo((v) => !v)}>
                <FileText size={16} />
                <span>{t.guideNcmBtn}</span>
              </button>

              <button
                className="btn-outline"
                onClick={() => setShowGlossaryModal(true)}
                title="Abrir Glossário com todas as siglas"
              >
                <BookOpen size={16} className="text-emerald-700" />
                <span>Glossário de Siglas (FOB, CIF, NCM...)</span>
                <span className="sigla-q-mark">?</span>
              </button>
            </div>

            {showNcmInfo && (
              <div style={{ background: 'var(--bg-mint)', border: '1px solid var(--primary-green)', padding: '16px', borderRadius: '16px', fontSize: '0.84rem', marginBottom: '16px', lineHeight: 1.55 }}>
                {t.guideNcmInfo}
              </div>
            )}

            {/* Balão de Siglas Interativo no Guia */}
            <div style={{ background: '#FFFFFF', border: '1px solid var(--border-card)', borderRadius: '16px', padding: '14px 16px', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-dark)' }}>
                <HelpCircle size={16} className="text-emerald-700" />
                <span>Consultar sigla rápida:</span>
              </div>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {renderSiglaBadge('FOB')}
                {renderSiglaBadge('CIF')}
                {renderSiglaBadge('NCM')}
                {renderSiglaBadge('DU-E')}
                {renderSiglaBadge('DUIMP')}
                {renderSiglaBadge('Invoice')}
                {renderSiglaBadge('Packing List')}
                {renderSiglaBadge('BL / AWB')}
              </div>
            </div>

            <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>{t.guideSub}</p>
          </div>

          <div className="web-grid-2">
            <div
              className="card"
              style={{ cursor: 'pointer' }}
              onClick={() => setGuideDetailModal({
                title: 'Documentos de Exportação Essenciais',
                desc: 'Toda operação comercial entre Brasil e Peru requer formalização digital para liberação rápida na Receita Federal e Aduana Peruana (SUNAT).',
                tips: [
                  'Invoice Comercial em inglês e espanhol com valores FOB/CIF.',
                  'Conhecimento de Transporte Internacional (CRT ou Conhecimento Aéreo/Marítimo).',
                  'Declaração Única de Exportação (DU-E) validada no Portal Único Siscomex.',
                  'Packing list discriminando peso bruto e peso líquido por fardo/contêiner.'
                ]
              })}
            >
              <strong style={{ fontSize: '0.98rem' }}>{t.guideDoc1Title}</strong>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '6px' }}>{t.guideDoc1Desc}</p>
              <span style={{ fontSize: '0.78rem', color: 'var(--primary-green)', fontWeight: 800, marginTop: '12px', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                <span>Ver requisitos detalhados</span>
                <ChevronRight size={14} />
              </span>
            </div>

            <div
              className="card"
              style={{ cursor: 'pointer' }}
              onClick={() => setGuideDetailModal({
                title: 'Certificado de Origem Digital (COD)',
                desc: 'O Acordo de Complementação Econômica Mercosul-Peru (ACE 58) prevê isenção e tarifas reduzidas mediante comprovação formal de origem.',
                tips: [
                  'Emissão por entidades autorizadas (FIESP, CIESP, ACSP ou autoridades certificadas).',
                  'Regra de origem específica por NCM (geralmente conteúdo regional mínimo de 50%).',
                  'Assinatura digital padrão ICP-Brasil válida nos sistemas aduaneiros peruanos.',
                  'Prazo de validade legal de 180 dias a contar da emissão.'
                ]
              })}
            >
              <strong style={{ fontSize: '0.98rem' }}>{t.guideDoc2Title}</strong>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '6px' }}>{t.guideDoc2Desc}</p>
              <span style={{ fontSize: '0.78rem', color: 'var(--primary-green)', fontWeight: 800, marginTop: '12px', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                <span>Ver regras do ACE 58</span>
                <ChevronRight size={14} />
              </span>
            </div>
          </div>

          <div className="card-dark" style={{ cursor: 'pointer' }} onClick={() => navigate('screen-perfil')}>
            <span className="eyebrow" style={{ color: '#A8BDB2' }}>{t.guideAccountEyebrow}</span>
            <h3 className="serif-title" style={{ fontSize: '1.45rem', marginBottom: '6px', color: '#FFFFFF' }}>{t.guideAccountTitle}</h3>
            <p style={{ fontSize: '0.86rem', color: '#D4DFD9', marginBottom: '16px' }}>{t.guideAccountDesc}</p>
            <div style={{ background: '#F7F1DC', color: '#5C4D26', padding: '14px 18px', borderRadius: '14px', fontSize: '0.8rem', fontWeight: 700, textAlign: 'center' }}>
              {t.guideAccountBanner}
            </div>
          </div>
        </section>
      )}

      {/* TELA 10: PERFIL DO USUÁRIO & IDIOMA */}
      {currentScreen === 'screen-perfil' && (
        <section id="screen-perfil" className="screen" style={{ padding: 0 }}>
          <div style={{ background: '#F6F4ED', padding: '36px 24px', textAlign: 'center', borderBottom: '1px solid var(--border-light)' }}>
            <div style={{
              width: '76px',
              height: '76px',
              background: 'var(--primary-green)',
              color: 'white',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.6rem',
              fontWeight: 800,
              margin: '0 auto 14px',
              boxShadow: '0 6px 18px rgba(31, 95, 67, 0.3)'
            }}>
              {userName.trim().toUpperCase() === 'BRAPEX'
                ? 'BX'
                : userName.split(' ').filter(Boolean).length > 1
                  ? userName.split(' ').filter(Boolean).map((n) => n[0]).slice(0, 2).join('').toUpperCase()
                  : userName.slice(0, 2).toUpperCase()}
            </div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800 }}>{userName}</h3>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>{userEmail}</p>
            <div style={{ marginTop: '8px' }}>
              <span style={{ background: '#E6F2EB', color: '#19583D', fontSize: '0.72rem', fontWeight: 800, padding: '4px 12px', borderRadius: '20px' }}>
                Operador Certificado Siscomex
              </span>
            </div>
          </div>

          <div style={{ padding: '24px 16px 105px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="card">
              <span className="eyebrow" style={{ marginBottom: '16px' }}>
                <User size={14} />
                <span>{t.profileInfoEyebrow}</span>
              </span>

              <div className="web-grid-2">
                <div className="form-group">
                  <label>{t.profileNameLabel}</label>
                  <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>{t.profileEmailLabel}</label>
                  <input type="email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
                </div>
              </div>

              <div className="web-grid-2">
                <div className="form-group">
                  <label>{t.profileDocLabel}</label>
                  <input type="text" value={userDoc} onChange={(e) => setUserDoc(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>{t.profileCompanyLabel}</label>
                  <input type="text" value={userCompany} onChange={(e) => setUserCompany(e.target.value)} />
                </div>
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label>{t.profileLocLabel}</label>
                <input type="text" value={userLocation} onChange={(e) => setUserLocation(e.target.value)} />
              </div>
            </div>

            {/* Alternar Idioma Português / Espanhol */}
            <div className="card">
              <span className="eyebrow">
                <Globe size={14} />
                <span>{t.profileQuickEyebrow}</span>
              </span>
              <div className="list-row" style={{ padding: '14px 0', cursor: 'default', flexWrap: 'wrap', gap: '14px' }}>
                <span style={{ fontWeight: 700 }}>{t.profileChangeLang}</span>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    type="button"
                    onClick={() => {
                      setLang('pt');
                      showToast('Idioma alterado para Português.');
                    }}
                    style={{
                      padding: '11px 20px',
                      borderRadius: '12px',
                      border: lang === 'pt' ? '2px solid var(--primary-dark)' : '1px solid var(--border-light)',
                      background: lang === 'pt' ? 'var(--primary-dark)' : '#FFFFFF',
                      color: lang === 'pt' ? '#FFFFFF' : 'var(--primary-dark)',
                      fontSize: '0.86rem',
                      fontWeight: 800,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <span>🇧🇷</span>
                    <span>{t.btnPortuguese}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setLang('es');
                      showToast('Idioma cambiado a Español.');
                    }}
                    style={{
                      padding: '11px 20px',
                      borderRadius: '12px',
                      border: lang === 'es' ? '2px solid var(--primary-dark)' : '1px solid var(--border-light)',
                      background: lang === 'es' ? 'var(--primary-dark)' : '#FFFFFF',
                      color: lang === 'es' ? '#FFFFFF' : 'var(--primary-dark)',
                      fontSize: '0.86rem',
                      fontWeight: 800,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <span>🇵🇪</span>
                    <span>{t.btnSpanish}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Card com os Canais Oficiais de Contato no Perfil */}
            <div className="card" style={{ background: '#FAF9F6' }}>
              <span className="eyebrow" style={{ color: 'var(--primary-green)' }}>
                <PhoneCall size={14} />
                <span>SUPORTE DIRETO</span>
              </span>
              <h4 style={{ fontSize: '1.1rem', margin: '4px 0 8px' }}>{t.profileContactCardTitle}</h4>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                {t.profileContactCardText}
              </p>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <button
                  className="btn-green"
                  style={{ width: 'auto', padding: '12px 18px', fontSize: '0.84rem' }}
                  onClick={() => setShowContactModal(true)}
                >
                  <PhoneCall size={16} />
                  <span>Central de Contato (+55 15 99173-7379)</span>
                </button>
                <button
                  className="btn-outline"
                  style={{ width: 'auto', padding: '12px 18px', fontSize: '0.84rem' }}
                  onClick={handleLogout}
                >
                  <Lock size={16} />
                  <span>Encerrar Sessão (Sair)</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FOOTER */}
      <footer className="app-footer">
        <div className="app-footer-content">
          <div>
            <div className="brand-logo-wrap" style={{ display: 'inline-flex', marginBottom: '8px', padding: 0 }}>
              <img src="/brapex-logo.png" alt="BRAPEX" className="brand-logo-img" style={{ height: '28px' }} />
            </div>
            <p>{t.footerText}</p>
          </div>
          <div style={{ textAlign: 'left', fontSize: '0.82rem', color: 'var(--text-dark)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
              <Phone size={13} className="text-emerald-700" />
              <span style={{ fontWeight: 600 }}>+55 (15) 99173-7379</span>
              <span>•</span>
              <Mail size={13} className="text-emerald-700" />
              <span style={{ fontWeight: 600 }}>brapeximportaexporta.com.br</span>
            </div>
            <div style={{ marginTop: '6px', fontSize: '0.74rem', color: 'var(--text-muted)' }}>
              Corredor Bioceânico • Sudoeste Paulista ⇄ Peru • Portal de Operações 2026
            </div>
          </div>
        </div>
      </footer>

      {/* NAVBAR INFERIOR (BOTTOM NAVIGATION) - PADRÃO ELGALY EXPRESS */}
      {currentScreen !== 'screen-login' && (
        <nav className="bottom-nav">
          <button
            className={`bottom-nav-item ${currentScreen === 'screen-dashboard' ? 'active' : ''}`}
            onClick={() => navigate('screen-dashboard')}
          >
            <Home size={20} />
            <span>{t.tabHome}</span>
          </button>

          <button
            className={`bottom-nav-item ${currentScreen === 'screen-inteligencia' ? 'active' : ''}`}
            onClick={() => navigate('screen-inteligencia')}
          >
            <Sparkles size={20} />
            <span>{t.tabRadar}</span>
          </button>

          <button
            className={`bottom-nav-item ${currentScreen === 'screen-produtos' ? 'active' : ''}`}
            onClick={() => navigate('screen-produtos')}
          >
            <Package size={20} />
            <span>{t.tabProducts}</span>
          </button>

          <button
            className={`bottom-nav-item ${currentScreen === 'screen-docs' ? 'active' : ''}`}
            onClick={() => navigate('screen-docs')}
          >
            <FileText size={20} />
            <span>{t.tabDocs}</span>
          </button>

          <button
            className={`bottom-nav-item ${currentScreen === 'screen-rastreamento' ? 'active' : ''}`}
            onClick={() => navigate('screen-rastreamento')}
          >
            <Truck size={20} />
            <span>{t.tabTracking}</span>
          </button>

          <button
            className={`bottom-nav-item ${currentScreen === 'screen-perfil' ? 'active' : ''}`}
            onClick={() => navigate('screen-perfil')}
          >
            <User size={20} />
            <span>{t.tabProfile}</span>
          </button>
        </nav>
      )}

    </div>
  );
}
