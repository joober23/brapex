export interface GlossaryTerm {
  code: string;
  name: string;
  category: string;
  icon: 'ship' | 'shield' | 'hash' | 'upload' | 'download' | 'receipt' | 'package' | 'plane';
  descPt: string;
  descEs: string;
  tags: string[];
}

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    code: 'FOB',
    name: 'Free On Board',
    category: 'Incoterm (Origem)',
    icon: 'ship',
    descPt: 'O vendedor entrega a carga no navio no porto de origem. A partir daí, o frete, o seguro e os riscos ficam por conta do comprador.',
    descEs: 'El vendedor entrega la carga en el buque en el puerto de origen. A partir de allí, el flete, el seguro y los riesgos corren por cuenta del comprador.',
    tags: ['incoterm', 'frete', 'porto', 'navio', 'porto de callao', 'santos', 'transporte', 'comprador']
  },
  {
    code: 'CIF',
    name: 'Cost, Insurance and Freight',
    category: 'Incoterm (Destino)',
    icon: 'shield',
    descPt: 'O vendedor paga todos os custos, o seguro e o frete até o porto de destino do comprador.',
    descEs: 'El vendedor paga todos los costos, el seguro y el flete hasta el puerto de destino del comprador.',
    tags: ['incoterm', 'seguro', 'frete', 'custo', 'destino', 'entrega', 'internacional']
  },
  {
    code: 'NCM',
    name: 'Nomenclatura Comum do Mercosul',
    category: 'Classificação Fiscal',
    icon: 'hash',
    descPt: 'Código de 8 dígitos que identifica qualquer produto comercializado no Brasil e no Mercosul, definindo seus impostos.',
    descEs: 'Código de 8 dígitos que identifica cualquier producto comercializado en Brasil y Mercosur, definiendo sus aranceles e impuestos.',
    tags: ['imposto', 'código', 'tributo', 'classificação', 'tarifa', 'mercadoria', 'siscomex']
  },
  {
    code: 'DU-E',
    name: 'Declaração Única de Exportação',
    category: 'Documento Digital Siscomex',
    icon: 'upload',
    descPt: 'Documento eletrônico obrigatório que reúne as informações aduaneiras, fiscais e logísticas para liberar a saída do produto do país.',
    descEs: 'Documento electrónico obligatorio que reúne la información aduanera, fiscal y logística para liberar la salida del producto del país.',
    tags: ['exportação', 'siscomex', 'receita federal', 'declaração', 'despacho', 'aduana']
  },
  {
    code: 'DUIMP',
    name: 'Declaração Única de Importação',
    category: 'Documento Digital Siscomex',
    icon: 'download',
    descPt: 'Documento digital que centraliza o registro e o controle da entrada de mercadorias importadas no Brasil.',
    descEs: 'Documento digital que centraliza el registro y control del ingreso de mercancías importadas a Brasil.',
    tags: ['importação', 'siscomex', 'entrada', 'desembaraço', 'alfândega', 'registro']
  },
  {
    code: 'Invoice',
    name: 'Fatura Comercial Internacional',
    category: 'Comprovante Comercial',
    icon: 'receipt',
    descPt: 'Documento emitido pelo exportador que funciona como uma "nota fiscal internacional", comprovando a venda e o valor da carga.',
    descEs: 'Documento emitido por el exportador que funciona como una "factura internacional", acreditando la venta y el valor de la carga.',
    tags: ['fatura', 'nota fiscal', 'comercial', 'valor', 'câmbio', 'venda', 'pagamento']
  },
  {
    code: 'Packing List',
    name: 'Romaneio de Carga',
    category: 'Controle de Embalagem',
    icon: 'package',
    descPt: 'Lista detalhada que informa tudo o que está dentro de cada caixa ou contêiner (peso, volume e quantidade).',
    descEs: 'Lista detallada que informa todo lo que está dentro de cada bulto o contenedor (peso, volumen y cantidad).',
    tags: ['romaneio', 'caixa', 'peso', 'volume', 'contêiner', 'quantidade', 'embalagem']
  },
  {
    code: 'BL / AWB',
    name: 'Conhecimento de Embarque',
    category: 'Transporte Internacional',
    icon: 'plane',
    descPt: 'Recibo oficial emitido pela transportadora que comprova o embarque da mercadoria (BL para navio, AWB para avião).',
    descEs: 'Recibo oficial emitido por la transportadora que acredita el embarque de la mercancía (BL para barco, AWB para avión).',
    tags: ['conhecimento', 'bill of lading', 'airway bill', 'navio', 'avião', 'transportadora', 'recibo']
  }
];

export function findGlossaryTerm(codeOrKeyword: string): GlossaryTerm | undefined {
  const clean = codeOrKeyword.trim().toLowerCase();
  return GLOSSARY_TERMS.find(
    (t) =>
      t.code.toLowerCase() === clean ||
      t.name.toLowerCase().includes(clean) ||
      t.tags.some((tag) => tag.includes(clean))
  );
}
