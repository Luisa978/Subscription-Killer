# Subscription Killer PWA

Um Progressive Web App (PWA) completo para gerenciamento de assinaturas, desenvolvido com HTML, CSS e JavaScript puro.

## 🚀 Funcionalidades

- **Login simulado** com localStorage (usuário: `demo`, senha: `123`)
- **Dashboard completo** com resumo financeiro
- **Tabela interativa** com filtros por nome, categoria e status
- **Gráficos visuais** (gastos mensais e distribuição por categoria)
- **Modo escuro/claro** com persistência
- **Exportação CSV** dos dados
- **Sistema de backup** completo
- **PWA completo** com manifest e service worker
- **Design responsivo** sem frameworks externos

## 📱 Instalação como PWA

1. Abra o aplicativo no navegador
2. No Chrome/Edge: clique no ícone de instalação na barra de endereços
3. No Safari (iOS): toque em "Compartilhar" > "Adicionar à Tela de Início"
4. No Android: toque no menu > "Adicionar à tela inicial"

## 🛠️ Deploy

### Opção 1: Servidor Web Simples
```bash
# Navegue até a pasta do projeto
cd subscription-killer-pwa

# Inicie um servidor HTTP (Python 3)
python3 -m http.server 8080

# Ou use Node.js
npx serve -s . -l 8080
```

### Opção 2: Netlify
1. Faça upload da pasta completa para o Netlify
2. Configure a pasta raiz como `subscription-killer-pwa`
3. O app estará disponível em `https://seu-site.netlify.app`

### Opção 3: GitHub Pages
1. Faça upload dos arquivos para um repositório GitHub
2. Ative o GitHub Pages nas configurações
3. O app estará disponível em `https://usuario.github.io/repositorio`

## 📁 Estrutura do Projeto

```
subscription-killer-pwa/
├── index.html          # Página principal
├── styles.css          # Estilos CSS
├── app.js             # Lógica JavaScript
├── manifest.json      # Manifest PWA
├── sw.js             # Service Worker
├── icons/            # Ícones do PWA
│   ├── icon-192x192.png
│   └── icon-512x512.png
└── README.md         # Este arquivo
```

## 🎯 Como Usar

1. **Login**: Use `demo` como usuário e `123` como senha
2. **Adicionar Assinatura**: Clique no botão "Nova Assinatura"
3. **Filtrar**: Use os campos de pesquisa e filtros
4. **Exportar**: Clique em "Exportar" para baixar CSV
5. **Backup**: Clique em "Backup" para salvar todos os dados
6. **Tema**: Clique no ícone de lua/sol para alternar tema

## 💾 Armazenamento

- **Login**: Salvo no localStorage como `sk_user`
- **Assinaturas**: Salvas no localStorage como `sk_subscriptions`
- **Tema**: Salvo no localStorage como `sk_theme`

## 🔧 Personalização

### Cores do Tema
Edite as variáveis CSS em `styles.css`:
```css
:root {
  --primary-color: #2563eb;
  --success-color: #16a34a;
  --danger-color: #dc2626;
  /* ... */
}
```

### Dados Iniciais
Modifique o array `subscriptions` em `app.js` para alterar os dados de exemplo.

### Categorias
Adicione novas categorias editando os selects no HTML e a função `getCategoryLabel()` no JavaScript.

## 🌐 Compatibilidade

- **Chrome/Edge**: Suporte completo
- **Firefox**: Suporte completo
- **Safari**: Suporte completo (iOS 11.3+)
- **Mobile**: Totalmente responsivo

## 📊 Recursos Avançados

- **Service Worker**: Cache offline e notificações
- **Manifest**: Instalação como app nativo
- **Responsivo**: Funciona em todos os dispositivos
- **Acessível**: Suporte a leitores de tela
- **Performance**: Carregamento rápido e cache inteligente

## 🔒 Segurança

- Login simulado apenas para demonstração
- Dados armazenados localmente no navegador
- Sem conexão com servidores externos
- Código aberto e auditável

## 📞 Suporte

Para dúvidas ou sugestões, consulte o código-fonte ou adapte conforme necessário.

---

**Desenvolvido com ❤️ usando tecnologias web modernas**

