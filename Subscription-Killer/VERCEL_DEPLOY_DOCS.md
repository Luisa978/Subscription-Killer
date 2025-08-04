# Documentação de Implantação do PWA "Subscription Killer" no Vercel

Este documento detalha o processo de implantação do seu Progressive Web App (PWA) "Subscription Killer" na plataforma Vercel. O Vercel é uma excelente escolha para hospedar aplicações frontend como o seu PWA, oferecendo deploy contínuo, CDN global e SSL automático, tudo com uma configuração mínima.

## 1. Visão Geral do Projeto

O "Subscription Killer" é um PWA desenvolvido com HTML, CSS e JavaScript puro. Ele permite aos utilizadores gerir as suas subscrições, visualizar gráficos e exportar dados. O projeto inclui funcionalidades como:

-   Gestão de subscrições (adicionar, editar, remover)
-   Visualização de dados em tabela e gráfico
-   Funcionalidade de backup e restauro de dados
-   Alternância de tema (claro/escuro)
-   Registo de Service Worker para capacidades offline
-   Sistema de autenticação simples (admin/admin)

## 2. Estrutura de Ficheiros do Projeto

A pasta `Subscription-Killer` contém todos os ficheiros necessários para o seu PWA. A estrutura é a seguinte:

```
Subscription-Killer/
├── index.html             # Página principal da aplicação
├── styles.css             # Estilos CSS da aplicação
├── manifest.json          # Manifest do PWA (metadados, ícones, etc.)
├── sw.js                  # Service Worker para funcionalidades offline
├── netlify.toml           # (Opcional) Ficheiro de configuração para Netlify (pode ser ignorado para Vercel)
├── README.md              # Informações gerais do projeto
├── validation-checklist.md# Checklist de validação (pode ser removido após deploy)
├── icons/                 # Pasta contendo os ícones do PWA
│   ├── icon-192x192.png
│   └── icon-512x512.png
└── js/                    # Pasta contendo os scripts JavaScript
    ├── auth.js            # Lógica de autenticação
    ├── backup.js          # Lógica de backup e restauro
    ├── chart.js           # Lógica para gráficos
    ├── export.js          # Lógica de exportação de dados
    ├── main.js            # Script principal da aplicação
    ├── storage.js         # Lógica de armazenamento de dados
    ├── theme.js           # Lógica de alternância de tema
    └── ui.js              # Lógica de manipulação da interface do utilizador
```

**Ficheiros Removidos/Ignorados:**
-   O diretório `.git/` foi removido, pois é apenas para controle de versão local.
-   O ficheiro `_redirects` foi removido, pois a configuração de redirecionamento para Vercel é feita automaticamente ou via `vercel.json` (que não é necessário para este projeto simples).

## 3. Pré-requisitos para Implantação no Vercel

Para implantar o seu PWA no Vercel, você precisará de:

1.  **Repositório GitHub:** O código do seu PWA deve estar num repositório GitHub (ou GitLab/Bitbucket). O Vercel integra-se diretamente com esses serviços para deploy contínuo.
2.  **Conta Vercel:** Uma conta gratuita no Vercel. Você pode criar uma e iniciar sessão usando a sua conta GitHub, o que simplifica o processo de conexão.

## 4. Processo de Implantação no Vercel (Passo a Passo)

O Vercel torna o deploy de projetos estáticos e PWAs extremamente simples. Siga estes passos:

### Passo 1: Fazer Login no Vercel

1.  Abra o seu navegador e vá para [vercel.com](https://vercel.com/).
2.  Clique no botão **"Log In"** (Iniciar Sessão) no canto superior direito da página.
3.  Escolha a opção **"Continue with GitHub"** (Continuar com GitHub) para iniciar sessão usando a sua conta GitHub. Autorize o Vercel a aceder aos seus repositórios, se solicitado.

### Passo 2: Importar o seu Projeto Git

1.  Após o login, você será redirecionado para o seu Dashboard do Vercel.
2.  No Dashboard, procure o botão **"Add New..."** (Adicionar Novo...) e clique nele. Em seguida, selecione **"Project"** (Projeto).
3.  Na secção **"Import Git Repository"** (Importar Repositório Git), você verá uma lista dos seus repositórios GitHub. Encontre o repositório do seu PWA (provavelmente `Subscription-Killer`).
4.  Clique no botão **"Import"** ao lado do nome do seu repositório.

    *Se o seu repositório não aparecer, pode ser necessário instalar a Vercel GitHub App ou ajustar as permissões. Siga as instruções do Vercel para conceder acesso ao repositório.* 

### Passo 3: Configurar o Projeto (Configuração Mínima)

O Vercel é muito bom a detetar automaticamente as configurações para projetos estáticos como o seu PWA. Na página de configuração do projeto:

1.  **Project Name:** O Vercel irá sugerir um nome baseado no seu repositório (ex: `subscription-killer`). Pode deixá-lo como está ou alterá-lo para algo mais descritivo, como `subscription-killer-pwa`.
2.  **Root Directory:** Este é um ponto crucial. Como o seu `index.html` e todos os outros ficheiros do PWA estão na raiz do seu repositório, **deixe este campo em branco**.
3.  **Build and Output Settings:** Para o seu PWA, não é necessário um comando de build complexo. O Vercel irá servir os ficheiros estáticos diretamente. Pode deixar as opções padrão aqui. Não precisa de alterar nada.

    *O Vercel detetará que é um site estático e não tentará executar comandos de build desnecessários.*

4.  Clique no botão **"Deploy"** (Implantar) na parte inferior da página.

### Passo 4: Ver o seu PWA Online!

O Vercel iniciará o processo de construção e implantação do seu projeto. Você verá uma página de status de deploy. Este processo geralmente é muito rápido, levando de alguns segundos a um minuto.

-   Após a conclusão bem-sucedida do deploy, você será redirecionado para uma página de sucesso. Esta página incluirá uma pré-visualização ao vivo do seu PWA e o URL público onde ele está hospedado (ex: `https://subscription-killer.vercel.app`).
-   Clique no URL fornecido para abrir o seu PWA no navegador e verificar se tudo está a funcionar como esperado.

## 5. Funcionalidades Pós-Deploy no Vercel

### Deploy Contínuo (Git Integration)

Uma das maiores vantagens do Vercel é o deploy contínuo. Uma vez configurado, sempre que você fizer um `git push` para o branch principal do seu repositório (geralmente `main`), o Vercel detetará automaticamente as alterações e iniciará um novo deploy. O seu PWA será atualizado online sem qualquer intervenção manual adicional.

### URLs de Pré-visualização

Para cada pull request que você abrir no seu repositório GitHub, o Vercel criará automaticamente um URL de pré-visualização. Isso permite que você e a sua equipa testem as alterações antes de as mesclar no branch principal e implantá-las em produção.

### Domínios Personalizados

No seu Dashboard do Vercel, você pode facilmente adicionar um domínio personalizado ao seu PWA (ex: `minhasubscricoes.com`). O Vercel irá configurar automaticamente o SSL para o seu domínio.

### Service Worker e Manifest

O Vercel serve os seus ficheiros PWA diretamente, o que significa que o seu `sw.js` (Service Worker) e `manifest.json` funcionarão como esperado. Certifique-se de que os caminhos dentro desses ficheiros são relativos (ex: `./`) para garantir a compatibilidade em qualquer URL de deploy.

## 6. Ficheiros Finais para Deploy

A pasta `Subscription-Killer` que será entregue contém todos os ficheiros otimizados e necessários para o deploy no Vercel. Não há ficheiros desnecessários ou que possam causar conflitos.

--- 

Com estas instruções e a pasta de projeto fornecida, você deverá conseguir implantar o seu PWA no Vercel de forma rápida e sem dificuldades. Se tiver mais alguma questão, não hesite em perguntar!

