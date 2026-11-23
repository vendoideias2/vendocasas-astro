# VendoCasas Astro

Portal imobiliário moderno, leve e SEO-ready para VendoCasas.

## Stack
- Astro 4.x (Static Site Generation)
- TypeScript
- Tailwind CSS (via custom tokens)
- Sharp para otimização de imagens
- pnpm como package manager

## Desenvolvimento
```bash
pnpm install
pnpm dev
```

## Build
```bash
pnpm build
```

## Deploy
Deploy automático via Coolify com Dockerfile multi-stage (Node builder + nginx runner).

## Estrutura
```
src/
  components/     # Componentes UI e PropertyCard
  layouts/        # BaseLayout com SEO
  pages/          # Rotas (index, comprar, busca, imovel, mcmv, alto-padrao, corretores, contato, admin, api)
  styles/         # tokens.css (design system) + global.css
  utils/          # seo.ts (structured data)
  lib/            # supabase.ts
public/
  fonts/          # Fraunces VF + Manrope VF
  images/         # Heroes, placeholders, corretores
```

## Design System
Ver `design-plan.md` para paleta, tipografia, componentes, motion, acessibilidade e SEO.

## Licença
Proprietário - VendoCasas