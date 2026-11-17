import React, { useState, useMemo } from 'react';
import { 
  Search, 
  ArrowRight, 
  TrendingUp, 
  Building, 
  MapPin, 
  ShieldCheck, 
  Tag, 
  Check, 
  Filter, 
  ChevronRight,
  Package,
  Layers,
  Sparkles
} from 'lucide-react';
import { PRODUCTS_CATALOG, ProductItem } from '../data/mockData';

interface ProductsQuotationsViewProps {
  onSelectProductForWorkflow: (product: ProductItem) => void;
  onOpenNcmDetails: (ncm: string) => void;
}

export const ProductsQuotationsView: React.FC<ProductsQuotationsViewProps> = ({
  onSelectProductForWorkflow,
  onOpenNcmDetails
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRoute, setSelectedRoute] = useState<'ALL' | 'PE_TO_ITP' | 'ITP_TO_PE'>('PE_TO_ITP');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredProducts = useMemo(() => {
    return PRODUCTS_CATALOG.filter((item) => {
      // Route filter
      if (selectedRoute !== 'ALL' && item.routeType !== selectedRoute) {
        return false;
      }
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Search term
      if (searchTerm.trim() !== '') {
        const query = searchTerm.toLowerCase();
        return (
          item.name.toLowerCase().includes(query) ||
          item.supplier.toLowerCase().includes(query) ||
          item.ncm.includes(query) ||
          item.origin.toLowerCase().includes(query) ||
          item.destination.toLowerCase().includes(query)
        );
      }
      return true;
    });
  }, [searchTerm, selectedRoute, selectedCategory]);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header with Title and Route Selector */}
      <div className="bg-white rounded-2xl border border-[#E5E1D8] p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider">
              <span>Bolsa de Mercadorias & Insumos Estratégicos</span>
              <span>·</span>
              <span className="text-[#697E72] font-normal">Preços FOT / CIF 2026</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#1A3026] mt-1">
              Produtos de Exportação & Cotações
            </h1>
            <p className="text-xs text-[#5C7065] mt-1">
              Selecione o insumo desejado para vincular automaticamente o código NCM e iniciar o fluxo de despacho documental aduaneiro.
            </p>
          </div>

          {/* Alternância de Rotas (Requisito Explícito) */}
          <div className="p-1 bg-[#F1EFEA] rounded-xl flex items-center gap-1 shrink-0 self-start md:self-auto">
            <button
              onClick={() => setSelectedRoute('PE_TO_ITP')}
              className={`px-3 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
                selectedRoute === 'PE_TO_ITP'
                  ? 'bg-[#1A3026] text-white shadow-sm'
                  : 'text-[#4A5F53] hover:text-[#1A3026]'
              }`}
            >
              <span>De: Peru ➔ Para: Itapetininga</span>
            </button>
            <button
              onClick={() => setSelectedRoute('ITP_TO_PE')}
              className={`px-3 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
                selectedRoute === 'ITP_TO_PE'
                  ? 'bg-[#1A3026] text-white shadow-sm'
                  : 'text-[#4A5F53] hover:text-[#1A3026]'
              }`}
            >
              <span>De: Itapetininga ➔ Para: Peru</span>
            </button>
            <button
              onClick={() => setSelectedRoute('ALL')}
              className={`px-2.5 py-2 text-xs font-medium rounded-lg transition-all ${
                selectedRoute === 'ALL'
                  ? 'bg-[#1A3026] text-white shadow-sm'
                  : 'text-[#4A5F53] hover:text-[#1A3026]'
              }`}
            >
              Todas
            </button>
          </div>
        </div>

        {/* Search Bar & Filters */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-2">
          {/* Search input */}
          <div className="md:col-span-8 relative">
            <Search className="w-4 h-4 text-[#7A8E82] absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Buscar por produto, fornecedor peruano/brasileiro ou NCM (ex: Cobre, Shougang, 7200, Alho)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#FBFBF9] border border-[#DDD9D0] rounded-xl text-xs sm:text-sm text-[#1A3026] placeholder-[#8A9C92] focus:border-[#1A3026] focus:ring-1 focus:ring-[#1A3026] outline-none"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-2.5 text-xs text-[#7A8E82] hover:text-[#1A3026]"
              >
                Limpar
              </button>
            )}
          </div>

          {/* Category Dropdown */}
          <div className="md:col-span-4 flex items-center gap-2">
            <div className="w-full">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full py-2.5 px-3 bg-[#FBFBF9] border border-[#DDD9D0] rounded-xl text-xs text-[#1A3026] font-medium outline-none focus:border-[#1A3026]"
              >
                <option value="all">Todas as Categorias</option>
                <option value="minerios">Minérios e Metais (Cobre, Ferro)</option>
                <option value="agro">Agronegócio e Hortifrúti (Alho, Grãos)</option>
                <option value="pesca">Pesca e Proteínas (Farinha de Peixe)</option>
                <option value="industria">Indústria, Máquinas e Têxtil</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl border border-[#E5E1D8] p-5 shadow-sm hover:border-[#1A3026] hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div>
              {/* Route Indicator & Category */}
              <div className="flex items-center justify-between text-xs text-[#697E72] mb-2.5">
                <div className="flex items-center gap-1.5 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                  <span className="truncate max-w-[200px]">
                    {product.routeType === 'PE_TO_ITP' ? 'Peru ➔ Itapetininga/SP' : 'Itapetininga/SP ➔ Peru'}
                  </span>
                </div>
                <button
                  onClick={() => onOpenNcmDetails(product.ncm)}
                  className="font-mono-num text-[11px] bg-[#EEEDE9] hover:bg-[#E2E0D8] text-[#1A3026] px-2 py-0.5 rounded font-semibold transition-colors"
                  title="Clique para ver regras tributárias do NCM"
                >
                  NCM {product.ncm}
                </button>
              </div>

              {/* Product Title */}
              <h2 className="font-display text-lg font-bold text-[#1A3026] group-hover:text-[#254436] transition-colors leading-snug">
                {product.name}
              </h2>

              <p className="text-xs text-[#5C7065] mt-1.5 line-clamp-2">
                {product.description}
              </p>

              {/* Supplier Info */}
              <div className="mt-3.5 p-3 rounded-xl bg-[#FBFBF9] border border-[#EBE8E0] space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs">
                  <Building className="w-3.5 h-3.5 text-[#5C7065] shrink-0" />
                  <span className="font-semibold text-[#1A3026] truncate">{product.supplier}</span>
                </div>
                <div className="text-[11px] text-[#7A8E82] pl-5">
                  Local: {product.location}
                </div>
                <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-medium pl-5">
                  <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{product.taxBenefit}</span>
                </div>
              </div>
            </div>

            {/* Price, Unit & Select Button */}
            <div className="mt-5 pt-4 border-t border-[#E8E6E1]">
              <div className="flex items-baseline justify-between mb-3">
                <div>
                  <span className="text-[10px] text-[#7A8E82] uppercase font-bold tracking-wider block">
                    Preço Indicativo Spot
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="font-mono-num text-xl font-bold text-[#1A3026]">
                      {product.currency} {product.pricePerUnit.toLocaleString('pt-BR')}
                    </span>
                    <span className="text-xs text-[#5C7065]">
                      / {product.unit}
                    </span>
                  </div>
                </div>

                <div className="text-right text-[11px] text-[#697E72]">
                  <div>Pedido mín: <span className="font-mono-num font-semibold text-[#1A3026]">{product.minOrder} {product.unit}s</span></div>
                  <div>Trânsito: <span className="font-mono-num font-semibold text-[#1A3026]">~{product.leadTimeDays} dias</span></div>
                </div>
              </div>

              {/* Action Button: Iniciar Fluxo Documental */}
              <button
                onClick={() => onSelectProductForWorkflow(product)}
                className="w-full py-2.5 px-3 bg-[#1A3026] hover:bg-[#254436] text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 group-hover:shadow"
              >
                <span>Selecionar para Cotação & Despacho</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="bg-white rounded-2xl border border-[#E5E1D8] p-12 text-center">
          <Package className="w-12 h-12 text-[#9AADA2] mx-auto mb-3" />
          <h3 className="text-base font-bold text-[#1A3026]">Nenhum produto encontrado</h3>
          <p className="text-xs text-[#5C7065] mt-1 max-w-sm mx-auto">
            Não encontramos itens para o termo pesquisado. Experimente buscar por "Cobre", "Alho", "Ferro" ou selecionar outra rota.
          </p>
          <button
            onClick={() => { setSearchTerm(''); setSelectedRoute('ALL'); setSelectedCategory('all'); }}
            className="mt-4 px-4 py-2 bg-[#EEEDE9] hover:bg-[#E2E0D8] text-xs font-semibold text-[#1A3026] rounded-lg transition-colors"
          >
            Limpar Filtros de Busca
          </button>
        </div>
      )}
    </div>
  );
};
