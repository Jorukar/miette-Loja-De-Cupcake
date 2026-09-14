import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Menu, Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";

type View = "inicio" | "menu" | "historia" | "catering";
type Product = { name: string; detail: string; price: number; tone: string; badge?: string; category: "cupcake" | "acessório" };
type CartItem = Product & { quantity: number };

const products: Product[] = [
  { name: "Chocolate Dream", detail: "Chocolate intenso · Ganache cremosa", price: 6.5, tone: "brown", badge: "Mais pedido", category: "cupcake" },
  { name: "Strawberry Kiss", detail: "Baunilha · Buttercream de morango", price: 6.5, tone: "pink", badge: "Queridinho", category: "cupcake" },
  { name: "White Chocolate Bliss", detail: "Baunilha · Chocolate branco", price: 7, tone: "white", category: "cupcake" },
  { name: "Mint Frost", detail: "Chocolate · Creme de menta", price: 6.5, tone: "mint", category: "cupcake" },
  { name: "Banana Foster", detail: "Banana caramelizada · Canela", price: 7, tone: "yellow", category: "cupcake" },
  { name: "Double Chocolate", detail: "Bolo de chocolate · Fudge duplo", price: 7, tone: "dark", badge: "Novo", category: "cupcake" },
  { name: "Sticker Pack", detail: "6 adesivos para espalhar doçura", price: 8, tone: "sticker", category: "acessório" },
  { name: "Sweet Notes Notebook", detail: "Caderno pautado · Capa ilustrada", price: 24, tone: "notebook", category: "acessório" },
];

const money = (value: number) => value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

function CupcakeArt({ tone, small = false }: { tone: string; small?: boolean }) {
  return <div className={`cupcake-art cupcake-${tone} ${small ? "cupcake-small" : ""}`} aria-hidden="true"><div className="cupcake-sprinkle sprinkle-one" /><div className="cupcake-sprinkle sprinkle-two" /><div className="cupcake-sprinkle sprinkle-three" /><div className="cupcake-frosting" /><div className="cupcake-cake" /><div className="cupcake-wrapper" /></div>;
}

function ProductVisual({ product, small = false }: { product: Product; small?: boolean }) {
  if (product.category === "acessório") return <div className={`accessory-art accessory-${product.tone}`}><span>{product.tone === "sticker" ? "✦ ♥ ✿" : "notas<br />doces"}</span></div>;
  return <CupcakeArt tone={product.tone} small={small} />;
}

export default function Index() {
  const [view, setView] = useState<View>("inicio");
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const cupcakes = useMemo(() => products.filter((product) => product.category === "cupcake"), []);
  const accessories = useMemo(() => products.filter((product) => product.category === "acessório"), []);

  const goTo = (nextView: View) => { setView(nextView); setMenuOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const addToCart = (product: Product) => { setCart((items) => { const existing = items.find((item) => item.name === product.name); return existing ? items.map((item) => item.name === product.name ? { ...item, quantity: item.quantity + 1 } : item) : [...items, { ...product, quantity: 1 }]; }); setCartOpen(true); };
  const updateQuantity = (name: string, delta: number) => setCart((items) => items.map((item) => item.name === name ? { ...item, quantity: item.quantity + delta } : item).filter((item) => item.quantity > 0));

  return <main className="min-h-screen overflow-hidden bg-[#fffaf4] text-[#30231f]">
    <div className="top-note">Entrega grátis em pedidos acima de R$ 180 <span>✦</span> Feito fresquinho todos os dias</div>
    <header className="site-header">
      <button className="brand" onClick={() => goTo("inicio")} aria-label="Ir para o início"><span className="brand-mark">M</span><span>miette</span></button>
      <nav className="desktop-nav" aria-label="Navegação principal"><button className={view === "menu" ? "active" : ""} onClick={() => goTo("menu")}>Nosso menu</button><button className={view === "historia" ? "active" : ""} onClick={() => goTo("historia")}>Nossa história</button><button className={view === "catering" ? "active" : ""} onClick={() => goTo("catering")}>Para festas</button></nav>
      <div className="header-actions"><button className="bag-button" onClick={() => setCartOpen(true)} aria-label="Abrir sacola"><ShoppingBag size={19} strokeWidth={1.7} /><span>{cartCount}</span></button><button className="order-button" onClick={() => goTo("menu")}>Pedir cupcakes <ArrowRight size={16} /></button><button className="mobile-menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menu">{menuOpen ? <X size={22} /> : <Menu size={22} />}</button></div>
      {menuOpen && <nav className="mobile-nav"><button onClick={() => goTo("inicio")}>Início</button><button onClick={() => goTo("menu")}>Nosso menu</button><button onClick={() => goTo("historia")}>Nossa história</button><button onClick={() => goTo("catering")}>Para festas</button></nav>}
    </header>

    {view === "inicio" && <><section id="top" className="hero-section"><div className="hero-copy"><p className="eyebrow">Bolinhos pequenos, sentimentos enormes</p><h1>Um pouco de<br /><em>doçura</em><br />faz bem.</h1><p className="hero-description">Bolinhos especiais para todos os momentos bonitos da vida. Feitos à mão, compartilhados com alegria e assados fresquinhos toda manhã.</p><button className="dark-button" onClick={() => goTo("menu")}>Conheça o menu <ArrowRight size={17} /></button><div className="hero-note"><span className="tiny-avatar">✦</span><span><strong>Amado por mais de 2.000 clientes</strong><br /><span className="stars">★★★★★</span> <small>4,9 no Google</small></span></div></div><div className="hero-art-wrap"><div className="hero-blob" /><div className="hero-sun">✦</div><CupcakeArt tone="hero" /><div className="hero-caption"><span>01</span><span>Feito com<br />um pouco de magia</span></div></div></section><section className="marquee"><div>FEITO COM AMOR <span>✦</span> COMPARTILHADO COM ALEGRIA <span>✦</span> FEITO COM AMOR <span>✦</span> COMPARTILHADO COM ALEGRIA</div></section><section className="home-feature section-pad"><div><p className="eyebrow">O melhor da casa</p><h2>Seu novo<br /><em>cupcake favorito.</em></h2><p>Escolha seu sabor, monte sua caixinha e transforme qualquer dia em uma pequena celebração.</p><button className="text-link" onClick={() => goTo("menu")}>Ver todos os sabores <ArrowRight size={17} /></button></div><div className="feature-cards"><div className="mini-feature visual-pink"><CupcakeArt tone="pink" small /></div><div className="mini-feature visual-yellow"><CupcakeArt tone="yellow" small /></div></div></section></>}

    {view === "menu" && <section className="menu-section section-pad view-page"><div className="view-back"><button onClick={() => goTo("inicio")}><ArrowLeft size={16} /> Voltar ao início</button><span>Menu / 08 itens</span></div><div className="section-heading"><div><p className="eyebrow">Escolha com carinho</p><h2>O nosso <em>menu.</em></h2></div><p className="menu-intro">Clique em qualquer item para adicionar à sua sacola.</p></div><h3 className="category-title">Cupcakes</h3><div className="product-grid">{cupcakes.map((product) => <ProductCard key={product.name} product={product} onAdd={addToCart} />)}</div><h3 className="category-title accessories-title">Acessórios fofos</h3><div className="product-grid accessories-grid">{accessories.map((product) => <ProductCard key={product.name} product={product} onAdd={addToCart} />)}</div></section>}

    {view === "historia" && <section className="story-section section-pad view-page"><div className="view-back"><button onClick={() => goTo("inicio")}><ArrowLeft size={16} /> Voltar ao início</button><span>Nossa história</span></div><div className="story-content"><div className="story-art"><div className="story-circle" /><CupcakeArt tone="yellow" /><span className="story-sticker">Feito<br />fresco<br /><b>todo dia</b></span></div><div className="story-copy"><p className="eyebrow">Uma confeitaria pequena, com um coração enorme</p><h2>Feito para os<br /><em>intervalos</em> da vida.</h2><p>A gente acredita que cupcakes fazem os dias comuns ficarem um pouco mais especiais. Por isso, fazemos os nossos em pequenos lotes, com manteiga de verdade, frutas da estação e muito cuidado.</p><p>Venha escolher um (ou uma caixa com seis) e fique para o bom humor.</p><button className="outline-button" onClick={() => goTo("catering")}>Conheça nossas festas <ArrowRight size={17} /></button></div></div></section>}

    {view === "catering" && <section className="catering-page view-page"><div className="view-back"><button onClick={() => goTo("inicio")}><ArrowLeft size={16} /> Voltar ao início</button><span>Para festas</span></div><div className="catering-section"><div><p className="eyebrow">Para suas comemorações mais doces</p><h2>Vamos criar<br /><em>algo lindo.</em></h2><p>Aniversários, chás de bebê, casamentos ou terças-feiras. Nossas caixas personalizadas e mesas de festa existem para fazer seu pessoal sorrir.</p><button className="cream-button" onClick={() => goTo("menu")}>Montar meu pedido <ArrowRight size={17} /></button></div><div className="catering-checks"><span><Check size={15} /> Caixas com sabores personalizados</span><span><Check size={15} /> Entrega em toda a cidade</span><span><Check size={15} /> Pedidos de 6 a 600 unidades</span></div></div></section>}

    <footer className="site-footer"><div className="footer-brand"><button className="brand" onClick={() => goTo("inicio")}><span className="brand-mark">M</span><span>miette</span></button><p>Bolinhos pequenos.<br />Sentimentos enormes.</p></div><div className="footer-links"><div><b>Visite</b><span>Rua dos Doces, 184</span><span>São Paulo, SP</span><span>Ter–Dom · 9h–18h</span></div><div><b>Fale com a gente</b><span>oi@miettecakes.com</span><span>(11) 5555-0148</span><span className="social">◎ @miettecakes</span></div></div><div className="newsletter"><b>Notinhas doces, de vez em quando.</b><p>Novos sabores e coisas boas no seu e-mail.</p>{subscribed ? <div className="subscribed"><Check size={15} /> Você está na lista!</div> : <div className="email-form"><input aria-label="Seu e-mail" placeholder="Seu endereço de e-mail" type="email" /><button onClick={() => setSubscribed(true)} aria-label="Assinar"><ArrowRight size={17} /></button></div>}</div><div className="footer-bottom"><span>© 2024 Miette Cakes</span><span>Feito com manteiga e amor</span><span>Privacidade</span></div></footer>

    {cartOpen && <div className="cart-overlay" onClick={() => setCartOpen(false)}><aside className="cart-drawer" onClick={(event) => event.stopPropagation()}><div className="cart-header"><div><p className="eyebrow">Sua seleção</p><h3>Sua sacola <span>{cartCount}</span></h3></div><button onClick={() => setCartOpen(false)} aria-label="Fechar sacola"><X size={21} /></button></div>{cart.length === 0 ? <div className="empty-cart"><div className="empty-bag"><ShoppingBag size={30} /></div><h4>Sua sacola está vazia</h4><p>Escolha um docinho para começar.</p><button className="dark-button" onClick={() => { setCartOpen(false); goTo("menu"); }}>Ver o menu <ArrowRight size={16} /></button></div> : <><div className="cart-items">{cart.map((item) => <div className="cart-item" key={item.name}><div className={`cart-thumb visual-${item.tone}`}><ProductVisual product={item} small /></div><div className="cart-item-copy"><strong>{item.name}</strong><span>{money(item.price)}</span><div className="quantity"><button onClick={() => updateQuantity(item.name, -1)} aria-label="Diminuir quantidade">{item.quantity === 1 ? <Trash2 size={13} /> : <Minus size={13} />}</button><span>{item.quantity}</span><button onClick={() => updateQuantity(item.name, 1)} aria-label="Aumentar quantidade"><Plus size={13} /></button></div></div></div>)}</div><div className="cart-summary"><div><span>Subtotal</span><strong>{money(cartTotal)}</strong></div><small>Entrega calculada no checkout.</small><button className="dark-button checkout-button" onClick={() => alert("Obrigada! Seu pedido está pronto para ser finalizado.")}>Finalizar pedido <ArrowRight size={17} /></button></div></>}</aside></div>}
  </main>;
}

function ProductCard({ product, onAdd }: { product: Product; onAdd: (product: Product) => void }) {
  return <button className="product-card" onClick={() => onAdd(product)} aria-label={`Adicionar ${product.name} à sacola`}><div className={`product-visual visual-${product.tone}`}>{product.badge && <span className="product-badge">{product.badge}</span>}<ProductVisual product={product} small /><span className="add-hint">+ Adicionar</span></div><div className="product-info"><div><h3>{product.name}</h3><p>{product.detail}</p></div><strong>{money(product.price)}</strong></div></button>;
}
