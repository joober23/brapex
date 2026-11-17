export interface ProductItem {
  id: string;
  name: string;
  category: 'minerios' | 'agro' | 'pesca' | 'industria';
  origin: string;
  destination: string;
  supplier: string;
  location: string;
  ncm: string;
  ncmDescription: string;
  pricePerUnit: number;
  unit: string;
  currency: 'USD' | 'BRL';
  minOrder: number;
  stockStatus: string;
  leadTimeDays: number;
  routeType: 'PE_TO_ITP' | 'ITP_TO_PE';
  description: string;
  taxBenefit: string;
}

export interface TrackingShipment {
  code: string;
  title: string;
  route: string;
  origin: string;
  destination: string;
  status: 'EM_TRANSITO' | 'DESEMBARACO' | 'ENTREGUE' | 'EMBARCANDO';
  statusLabel: string;
  progressPercent: number;
  carrier: string;
  transportMode: 'RODOVIARIO' | 'MARITIMO';
  eta: string;
  updatedAt: string;
  currentLocation: string;
  coordinates: { lat: number; lng: number };
  telemetry: {
    temperature?: string;
    speed?: string;
    lastCheckpoint: string;
  };
  events: {
    date: string;
    time: string;
    location: string;
    description: string;
    completed: boolean;
  }[];
}

export const PRODUCTS_CATALOG: ProductItem[] = [
  {
    id: 'prod-1',
    name: 'Ferro & Insumos Minerais Concentrados',
    category: 'minerios',
    origin: 'San Juan de Marcona, Peru',
    destination: 'Itapetininga, SP - Brasil',
    supplier: 'Shougang Hierro Perú S.A.A.',
    location: 'Ica / Porto de San Nicolás, Peru',
    ncm: '7201.10.00',
    ncmDescription: 'Ferro fundido bruto não ligado, com teor de fósforo ≤ 0,5% em peso',
    pricePerUnit: 850,
    unit: 'tonelada',
    currency: 'USD',
    minOrder: 25,
    stockStatus: 'Disponível em lote para embarque imediato',
    leadTimeDays: 16,
    routeType: 'PE_TO_ITP',
    description: 'Minério de ferro de alta pureza (Fe 66.5%), granulometria controlada para aciarias e fundições do interior paulista.',
    taxBenefit: 'Acordo ACE 58: Isenção de I.I. (0%)'
  },
  {
    id: 'prod-2',
    name: 'Cobre Eletrolítico (Catodos Grau A)',
    category: 'minerios',
    origin: 'Arequipa / Moquegua, Peru',
    destination: 'Itapetininga, SP - Brasil',
    supplier: 'Southern Copper Corp / Cerro Verde',
    location: 'Porto de Ilo / Callao, Peru',
    ncm: '7403.11.00',
    ncmDescription: 'Cobre refinado em forma de catodos e seções de catodos (Pureza 99,99%)',
    pricePerUnit: 9150,
    unit: 'tonelada',
    currency: 'USD',
    minOrder: 10,
    stockStatus: 'Contratos spot e futuros homologados',
    leadTimeDays: 14,
    routeType: 'PE_TO_ITP',
    description: 'Catodos de cobre de altíssima condutividade elétrica certificados pela LME para indústrias condutoras e energia.',
    taxBenefit: 'Acordo ACE 58: Tarifa Preferencial Mercosul-Peru'
  },
  {
    id: 'prod-3',
    name: 'Alho Roxo Peruano Selecionado (Calibre Extra)',
    category: 'agro',
    origin: 'Arequipa, Peru',
    destination: 'Itapetininga, SP - Brasil',
    supplier: 'Agrícola Don Ricardo SAC',
    location: 'Vale do Rio Chili, Arequipa, Peru',
    ncm: '0703.20.90',
    ncmDescription: 'Alho fresco ou refrigerado, outros (Roxo / Ajo Morado)',
    pricePerUnit: 1820,
    unit: 'tonelada',
    currency: 'USD',
    minOrder: 15,
    stockStatus: 'Safra nova com inspeção fitossanitária SENASA/MAPA',
    leadTimeDays: 11,
    routeType: 'PE_TO_ITP',
    description: 'Alho roxo nobre de grande durabilidade pós-colheita, ideal para entrepostos e distribuidoras do Sudoeste Paulista.',
    taxBenefit: 'Certificado Fitossanitário Integrado MAPA-SENASA'
  },
  {
    id: 'prod-4',
    name: 'Farinha de Peixe Premium (Proteína 68%)',
    category: 'pesca',
    origin: 'Chimbote, Peru',
    destination: 'Itapetininga, SP - Brasil',
    supplier: 'Pesquera Exalmar / TASA',
    location: 'Porto de Callao / Chimbote, Peru',
    ncm: '2301.20.10',
    ncmDescription: 'Farinhas e pellets de peixe, próprios para alimentação de animais',
    pricePerUnit: 1480,
    unit: 'tonelada',
    currency: 'USD',
    minOrder: 20,
    stockStatus: 'Pronta entrega com laudo bromatológico',
    leadTimeDays: 18,
    routeType: 'PE_TO_ITP',
    description: 'Insumo de altíssimo teor proteico e digestibilidade para fábricas de ração e nutrição animal no Sudoeste Paulista.',
    taxBenefit: 'Certificado de Origem Digital ACE 58'
  },
  {
    id: 'prod-5',
    name: 'Fibras e Fios Nobres de Alpaca',
    category: 'industria',
    origin: 'Arequipa / Cusco, Peru',
    destination: 'Itapetininga, SP - Brasil',
    supplier: 'Michell y Cía S.A.',
    location: 'Arequipa, Peru',
    ncm: '5102.19.00',
    ncmDescription: 'Pelos finos de alpaca ou lhama, não cardados nem penteados',
    pricePerUnit: 24500,
    unit: 'tonelada',
    currency: 'USD',
    minOrder: 2,
    stockStatus: 'Estoque regular sob encomenda',
    leadTimeDays: 20,
    routeType: 'PE_TO_ITP',
    description: 'Fibras de lã natural super macias e térmicas para a indústria têxtil e de confecções regional.',
    taxBenefit: 'Benefício tarifário bilateral'
  },
  // Rota Inversa: De Itapetininga/SP para Peru
  {
    id: 'prod-6',
    name: 'Milho em Grão & Soja Especial (Não-OGM)',
    category: 'agro',
    origin: 'Itapetininga, SP - Brasil',
    destination: 'Lima / Callao, Peru',
    supplier: 'Cooperativa Agrícola do Sudoeste Paulista',
    location: 'Terminal Ferroviário / Armazéns de Itapetininga-SP',
    ncm: '1005.90.10',
    ncmDescription: 'Milho em grão, exceto para semeadura',
    pricePerUnit: 285,
    unit: 'tonelada',
    currency: 'USD',
    minOrder: 50,
    stockStatus: 'Volume garantido safra 2026',
    leadTimeDays: 15,
    routeType: 'ITP_TO_PE',
    description: 'Grãos padronizados com alta energia metabolizável produzidos na bacia produtiva de Itapetininga para a indústria avícola peruana.',
    taxBenefit: 'Desoneração de PIS/COFINS na Exportação'
  },
  {
    id: 'prod-7',
    name: 'Máquinas & Implementos Agrícolas de Precisão',
    category: 'industria',
    origin: 'Itapetininga, SP - Brasil',
    destination: 'Trujillo / Arequipa, Peru',
    supplier: 'Indústrias Metal-Mecânicas do Sudoeste Paulista',
    location: 'Distrito Industrial de Itapetininga-SP',
    ncm: '8433.59.90',
    ncmDescription: 'Máquinas e aparelhos para colheita agrícola e debulha',
    pricePerUnit: 34500,
    unit: 'unidade',
    currency: 'USD',
    minOrder: 1,
    stockStatus: 'Fabricação sob demanda com garantia de peças',
    leadTimeDays: 22,
    routeType: 'ITP_TO_PE',
    description: 'Equipamentos robustos desenvolvidos para agricultura tropical e adaptados para o relevo andino e costeiro do Peru.',
    taxBenefit: 'Acordo ACE 58 com certificado Siscomex'
  },
  {
    id: 'prod-8',
    name: 'Embalagens Biodegradáveis & Papel Cartão',
    category: 'industria',
    origin: 'Itapetininga, SP - Brasil',
    destination: 'Lima, Peru',
    supplier: 'Polo Papeleiro & Celulose do Sudoeste Paulista',
    location: 'Itapetininga / Angatuba-SP',
    ncm: '4819.10.00',
    ncmDescription: 'Caixas de papel ou cartão, ondulados',
    pricePerUnit: 980,
    unit: 'tonelada',
    currency: 'USD',
    minOrder: 10,
    stockStatus: 'Em estoque pronto para exportação',
    leadTimeDays: 14,
    routeType: 'ITP_TO_PE',
    description: 'Caixas de alta resistência à umidade para transporte seguro de frutas e hortaliças no mercado andino.',
    taxBenefit: 'Tarifa zero Mercosul-Comunidade Andina'
  }
];

export const NCM_DATABASE = [
  { code: '7200.00.00', name: 'Ferro fundido, ferro e aço (Capítulo Geral)', ii: '0% a 12%', ipi: '0%', ace58: '0% (Isento)' },
  { code: '7201.10.00', name: 'Ferro fundido bruto não ligado (≤0,5% P)', ii: '0%', ipi: '0%', ace58: '0% (Isento)' },
  { code: '7403.11.00', name: 'Cobre refinado: Catodos e seções de catodos', ii: '0%', ipi: '0%', ace58: '0% (Isento)' },
  { code: '0703.20.90', name: 'Alhos frescos ou refrigerados (Roxo/Ajo Morado)', ii: '10%', ipi: '0%', ace58: '0% (Isento)' },
  { code: '2301.20.10', name: 'Farinhas e pellets de peixe p/ ração animal', ii: '6%', ipi: '0%', ace58: '0% (Isento)' },
  { code: '2601.11.00', name: 'Minérios de ferro não aglomerados e concentrados', ii: '0%', ipi: '0%', ace58: '0% (Isento)' },
  { code: '1005.90.10', name: 'Milho em grão, exceto para semeadura', ii: '8%', ipi: '0%', ace58: '0% (Isento)' },
  { code: '1201.90.00', name: 'Soja, mesmo triturada, exceto para semeadura', ii: '8%', ipi: '0%', ace58: '0% (Isento)' },
  { code: '8433.59.90', name: 'Máquinas e implementos de colheita agrícola', ii: '14%', ipi: '0%', ace58: '0% (Isento ACE 58)' },
  { code: '4819.10.00', name: 'Caixas e cartonagens de papel ondulado', ii: '10%', ipi: '0%', ace58: '0% (Isento)' },
  { code: '5102.19.00', name: 'Pelos finos de alpaca ou lhama não cardados', ii: '4%', ipi: '0%', ace58: '0% (Isento)' }
];

export const TRACKING_RECORDS: Record<string, TrackingShipment> = {
  'BRAPEX2026': {
    code: 'BRAPEX2026',
    title: 'Carga de Cobre Eletrolítico (Catodos Grau A)',
    route: 'Porto de Callao (Peru) ➔ Itapetininga (SP)',
    origin: 'Terminal Portuário DP World - Callao, Peru',
    destination: 'Polo Industrial de Cobre e Condutores - Itapetininga, SP',
    status: 'EM_TRANSITO',
    statusLabel: 'Em Trânsito Alfandegário no Porto de Santos',
    progressPercent: 78,
    carrier: 'Brapex Intermodal & Transoceanic Logistics',
    transportMode: 'MARITIMO',
    eta: '16/11/2026 (Previsão de Desova e Entrega)',
    updatedAt: 'Há 18 minutos',
    currentLocation: 'Canal de Santos / Pátio Alfandegado BTP, SP',
    coordinates: { lat: -23.9618, lng: -46.3322 },
    telemetry: {
      temperature: '23.4°C (Normal)',
      speed: '14 nós (Atracado p/ Despacho)',
      lastCheckpoint: 'Vistoria RFB / Liberação Canal Verde Siscomex'
    },
    events: [
      { date: '12/11/2026', time: '08:45', location: 'Santos, SP', description: 'Atracação e registro de Declaração de Importação (DI)', completed: true },
      { date: '08/11/2026', time: '14:20', location: 'Oceano Atlântico / Costa Sul', description: 'Em trânsito de navegação costeira internacional', completed: true },
      { date: '02/11/2026', time: '19:10', location: 'Porto de Callao, Peru', description: 'Embarque em navio porta-contêineres e emissão de Bill of Lading', completed: true },
      { date: '30/10/2026', time: '10:00', location: 'Cerro Verde / Arequipa, Peru', description: 'Coleta de carga e inspeção de conformidade técnica', completed: true },
      { date: '16/11/2026', time: '16:00', location: 'Itapetininga, SP', description: 'Entrega final agendada no Centro de Distribuição', completed: false }
    ]
  },
  'BR-PE-001': {
    code: 'BR-PE-001',
    title: 'Lote de Alho Roxo Peruano Selecionado (Safra Especial)',
    route: 'Arequipa (Peru) ➔ Entreposto Hortifrúti Itapetininga (SP)',
    origin: 'Agrícola Don Ricardo - Arequipa, Peru',
    destination: 'Entreposto Regional de Distribuição - Itapetininga, SP',
    status: 'DESEMBARACO',
    statusLabel: 'Desembaraço Concluído / Em Viagem Rodoviária',
    progressPercent: 62,
    carrier: 'Expresso Bioceânico dos Andes',
    transportMode: 'RODOVIARIO',
    eta: '15/11/2026 (Pontual)',
    updatedAt: 'Há 45 minutos',
    currentLocation: 'Posto Fiscal Aduaneiro / Foz do Iguaçu - Rodovia BR-277',
    coordinates: { lat: -25.5163, lng: -54.5854 },
    telemetry: {
      temperature: '3.8°C (Câmara Fria Ativa)',
      speed: '76 km/h',
      lastCheckpoint: 'Inspeção Fitossanitária MAPA Vigiagro - Aprovado'
    },
    events: [
      { date: '12/11/2026', time: '05:30', location: 'Foz do Iguaçu, PR', description: 'Liberação aduaneira Vigiagro e saída em comboio refrigerado', completed: true },
      { date: '10/11/2026', time: '16:40', location: 'Corumbá / Fronteira Brasil-Bolívia', description: 'Passagem fronteiriça pelo Corredor Bioceânico', completed: true },
      { date: '06/11/2026', time: '09:00', location: 'Arequipa, Peru', description: 'Carregamento com termógrafo certificado e lacre aduaneiro', completed: true },
      { date: '15/11/2026', time: '11:00', location: 'Itapetininga, SP', description: 'Descarregamento na câmara fria de Itapetininga', completed: false }
    ]
  },
  'LOG-ITP-789': {
    code: 'LOG-ITP-789',
    title: 'Implementos e Máquinas Agrícolas para Trujillo (Peru)',
    route: 'Itapetininga (SP) ➔ Trujillo / Lima (Peru)',
    origin: 'Distrito Industrial de Itapetininga, SP',
    destination: 'Valle Chicama - Trujillo, Peru',
    status: 'EMBARCANDO',
    statusLabel: 'Conferência Física e Estufagem em Contêiner Flat Rack',
    progressPercent: 35,
    carrier: 'Brapex Multimodal Paulista',
    transportMode: 'MARITIMO',
    eta: '24/11/2026',
    updatedAt: 'Há 2 horas',
    currentLocation: 'Terminal Retroportuário de Santos / Pátio Cubatão',
    coordinates: { lat: -23.8824, lng: -46.4253 },
    telemetry: {
      temperature: '25.0°C (Carga Seca Maquinário)',
      speed: '0 km/h (Pátio Aduaneiro)',
      lastCheckpoint: 'Vistoria de Amarração de Carga Pesada'
    },
    events: [
      { date: '11/11/2026', time: '17:00', location: 'Itapetininga, SP', description: 'Emissão de DU-E (Declaração Única de Exportação) no Siscomex', completed: true },
      { date: '12/11/2026', time: '07:20', location: 'Santos, SP', description: 'Entrada no recinto alfandegado e conferência documental', completed: true },
      { date: '14/11/2026', time: '18:00', location: 'Porto de Santos, SP', description: 'Carregamento programado em navio com destino a Callao', completed: false },
      { date: '24/11/2026', time: '14:00', location: 'Trujillo, Peru', description: 'Entrega final ao comprador peruano', completed: false }
    ]
  }
};

export const CHATBOT_KNOWLEDGE = [
  {
    keywords: ['documento', 'documentos', 'invoice', 'certificado', 'origem', 'qualidade'],
    response: 'Para exportar ou importar via Brapex são exigidos 3 documentos principais: 1) Invoice Comercial (Fatura Proforma com NCM e Incoterm); 2) Certificado de Origem Digital ACE 58 (garante isenção de imposto entre Brasil e Peru); 3) Certificado de Qualidade/Fitossanitário (MAPA para alimentos e grãos, ou SENASA no Peru). Todos podem ser anexados diretamente no nosso fluxo documental.'
  },
  {
    keywords: ['ncm', 'classificacao', 'fiscal', 'codigo', 'aliquota'],
    response: 'O código NCM (Nomenclatura Comum do Mercosul) classifica a mercadoria para fins aduaneiros e fiscais. Graças ao Acordo de Complementação Econômica ACE 58 entre Brasil e Peru, mais de 98% dos produtos possuem alíquota 0% de Imposto de Importação! Você pode consultar qualquer NCM na ferramenta "Consulta NCM" no menu acima.'
  },
  {
    keywords: ['rastreio', 'rastreamento', 'onde esta', 'codigo', 'brapex2026', 'prazo', 'tempo'],
    response: 'Você pode rastrear qualquer carga digitando o código na aba "Rastreamento". Experimente testar com BRAPEX2026 (Cobre no Porto de Santos) ou BR-PE-001 (Alho Peruano no Corredor Bioceânico). Nossos prazos médios são: 10 a 14 dias para o modal Rodoviário Transoceânico e 18 a 22 dias para o modal Marítimo Santos-Callao.'
  },
  {
    keywords: ['moeda', 'cambio', 'sol', 'peruano', 'real', 'cotacao', 'dolar'],
    response: 'Nossa taxa de referência do Sol Peruano (PEN) em relação ao Real (BRL) é de 1 BRL = 0,68 PEN (ou 1 PEN ≈ 1,47 BRL). No nosso Conversor de Moedas, você pode simular a troca instantânea com o cálculo do IOF aduaneiro de 0,38% e taxa de câmbio interbancária PTAX.'
  },
  {
    keywords: ['taxa', 'pagamento', 'pix', '245', 'gov.br', 'emolumentos', 'custo'],
    response: 'As taxas governamentais padrão para o trâmite aduaneiro simplificado são: Taxa de Exportação (R$ 180,00), Emolumentos GOV (R$ 45,00) e Taxa de Serviço Siscomex (R$ 20,00), totalizando R$ 245,00. O pagamento pode ser feito via Pix instantâneo, QR Code ou GRU/Boleto Bancário diretamente pelo portal.'
  },
  {
    keywords: ['itapetininga', 'sudoeste', 'paulista', 'porto', 'santos'],
    response: 'Itapetininga é o polo estratégico do Sudoeste Paulista, com ligação direta pelas rodovias Raposo Tavares e Castelo Branco até o Porto de Santos, além de conexão com o Corredor Bioceânico rumo ao Peru. A Brapex oferece um entreposto aduaneiro dedicado na região para facilitar a logística de pequenos e grandes produtores.'
  }
];
