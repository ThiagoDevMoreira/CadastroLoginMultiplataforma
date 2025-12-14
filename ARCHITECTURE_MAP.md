# Diagrama de arquitetura e oportunidades de enxugamento

```mermaid
flowchart TD
  subgraph UI
    Start[StartRalPageComponent]\n    Login[LoginPageComponent]\n    Register[RegisterPageComponent]
  end

  subgraph Domínio (ral-app)
    Facade[AuthFacadeService]\n    Ports[Ports: AuthApiPort / CryptoPort / KvStorePort]
  end

  subgraph Infra (ral-infra)
    AuthApi[AuthApiMockService]\n    Crypto[CryptoService]\n    Store[IndexeddbStoreService]
  end

  Start -->|Router| Login
  Login -->|navigateByUrl| Start
  Register -->|navigateByUrl| Login

  Start --> Facade
  Login --> Facade
  Register --> Facade

  Facade --> Ports
  Ports --> AuthApi
  Ports --> Crypto
  Ports --> Store

  Store -->|dados| IndexedDB[(IndexedDB)]
  Crypto -->|Web Crypto| Browser[(Navegador)]
```

## Pontos de atenção
- As páginas de UI consomem diretamente `AuthFacadeService`, mas cada uma replica strings de rota (`/login`, `/register`, `/start`) e lógica de navegação.
- O bootstrap (`app.config.ts`) faz o binding dos tokens `AUTH_API`, `KV_STORE` e `CRYPTO` para implementações mock, sem variação por ambiente.
- A camada de domínio concentra `AuthFacadeService` que controla `BehaviorSubject` de sessão em memória, mas não há inicialização automática em `main.ts` para carregar sessão persistida na abertura do app.

## Recomendações para deixar o código mais enxuto e organizado
1. **Centralizar rotas e redirecionamentos**: criar um util ou enum compartilhado com as rotas (`/login`, `/register`, `/start`) e usar helpers para navegação nos componentes de UI, evitando strings duplicadas.
2. **Inicialização única da sessão**: chamar `auth.init()` no bootstrap (p.ex. em `main.ts` ou num `APP_INITIALIZER`) para hidratar a sessão persistida antes do primeiro render, removendo chamadas ad-hoc.
3. **Perfil de injeção por ambiente**: mover o binding dos tokens para uma função de providers que permita alternar `AuthApiPort`/`KvStorePort`/`CryptoPort` por ambiente (mock vs. real), reduzindo acoplamento no `app.config.ts`.
4. **Componentes mais enxutos**: extrair um componente/form compartilhado para email/senha e botões de ação, reutilizado por Login e Register para reduzir markup repetido e garantir consistência de validação.
5. **Remover código morto/duplicado**: revisar a `HomePage` não roteada e remover se não fizer parte do fluxo; alinhar `withPreloading` às rotas atuais para eliminar configuração ociosa.
