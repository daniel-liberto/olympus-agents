import type { AgentInfo } from '@/types/agents';

import zeusImg from '@/assets/gods/Zeus.jpg';
import hermesImg from '@/assets/gods/Hermes.jpg';
import athenaImg from '@/assets/gods/Athena.jpg';
import apolloImg from '@/assets/gods/Apollo.jpg';
import artemisImg from '@/assets/gods/Artemis.jpg';
import hephaestusImg from '@/assets/gods/Hephaestus.jpg';
import poseidonImg from '@/assets/gods/Poseidon.jpg';
import heraImg from '@/assets/gods/Hera.jpg';
import hestiaImg from '@/assets/gods/Hestia.jpg';
import aresImg from '@/assets/gods/Ares.jpg';
import hadesImg from '@/assets/gods/Hades.jpg';
import perseusImg from '@/assets/gods/Perseus.jpg';

export const PIPELINE_AGENTS: AgentInfo[] = [
  {
    id: 'zeus',
    name: 'Zeus',
    god: 'Rei dos Deuses',
    role: 'Master Orchestrator',
    stage: 0,
    image: zeusImg,
    status: 'idle',
    description: 'Zeus supervisiona todo o pipeline de produção, coordenando a entrada e saída de cada subagente e garantindo que o fluxo siga em ordem do início ao fim.',
    tools: ['Pipeline Control', 'Agent Coordination', 'Quality Gate'],
  },
  {
    id: 'hermes',
    name: 'Hermes',
    god: 'Deus Mensageiro',
    role: 'Discovery & Requirements',
    stage: 1,
    image: hermesImg,
    status: 'idle',
    description: 'Hermes interpreta o briefing do cliente e extrai requisitos detalhados — escopo, sitemap e fluxos de usuário iniciais que alimentam todo o pipeline.',
    tools: ['Análise Textual', 'Extração de Requisitos'],
  },
  {
    id: 'athena',
    name: 'Athena',
    god: 'Deusa da Sabedoria',
    role: 'Product Strategy',
    stage: 2,
    image: athenaImg,
    status: 'idle',
    description: 'Athena transforma o escopo em estratégia de produto — fluxos detalhados step-by-step, mapa de interações, modais, formulários e estados de erro.',
    tools: ['Análise Estratégica', 'Mapeamento de Fluxos'],
  },
  {
    id: 'apollo',
    name: 'Apollo',
    god: 'Deus das Artes',
    role: 'Desktop UI/UX',
    stage: 3,
    image: apolloImg,
    status: 'idle',
    description: 'Apollo projeta a interface desktop — layouts, especificação de componentes e design tokens, referenciando shadcn/ui e TailwindCSS.',
    tools: ['shadcn/ui', 'TailwindCSS', 'Lucide Icons', 'Recharts'],
  },
  {
    id: 'artemis',
    name: 'Artemis',
    god: 'Deusa da Caça',
    role: 'Mobile UI/UX',
    stage: 4,
    image: artemisImg,
    status: 'idle',
    description: 'Artemis adapta o design para dispositivos móveis — layouts touch-friendly, gestos, bottom sheets e navegação fluida.',
    tools: ['shadcn/ui', 'TailwindCSS', 'Vaul (Drawer)', 'Embla Carousel'],
  },
  {
    id: 'hephaestus',
    name: 'Hephaestus',
    god: 'Deus da Forja',
    role: 'Visual Refinement',
    stage: 5,
    image: hephaestusImg,
    status: 'idle',
    description: 'Hephaestus unifica e refina os designs de Apollo e Artemis em um design system coeso — cores, tipografia, espaçamentos consistentes.',
    tools: ['CSS Variables (HSL)', 'TailwindCSS', 'Design Tokens'],
  },
  {
    id: 'poseidon',
    name: 'Poseidon',
    god: 'Deus dos Mares',
    role: 'Frontend Development',
    stage: 6,
    image: poseidonImg,
    status: 'idle',
    description: 'Poseidon implementa o código frontend — componentes React, rotas, formulários, integração de dados e toda a lógica da aplicação.',
    tools: ['React 18', 'Vite', 'TypeScript', 'TailwindCSS', 'shadcn/ui', 'React Query', 'React Hook Form', 'Zod', 'React Router'],
  },
  {
    id: 'hera',
    name: 'Hera',
    god: 'Rainha dos Deuses',
    role: 'Responsive Design',
    stage: 7,
    image: heraImg,
    status: 'idle',
    description: 'Hera garante que a interface funcione perfeitamente em todos os dispositivos — ajustando breakpoints, overflow e navegação responsiva.',
    tools: ['TailwindCSS Breakpoints', 'useIsMobile() Hook', 'Chrome DevTools'],
  },
  {
    id: 'hestia',
    name: 'Hestia',
    god: 'Deusa do Lar',
    role: 'Animations & Polish',
    stage: 8,
    image: hestiaImg,
    status: 'idle',
    description: 'Hestia adiciona animações sutis e micro-interações — transições de página, hover states, loading states — tudo com performance em mente.',
    tools: ['Motion (Framer)', 'tailwindcss-animate', 'CSS Transitions'],
  },
  {
    id: 'ares',
    name: 'Ares',
    god: 'Deus da Guerra',
    role: 'Frontend QA',
    stage: 9,
    image: aresImg,
    status: 'idle',
    description: 'Ares conduz testes rigorosos de qualidade — build, TypeScript, linting, performance via Lighthouse e testes funcionais completos.',
    tools: ['Vite Build', 'TypeScript', 'ESLint', 'Lighthouse'],
  },
  {
    id: 'hades',
    name: 'Hades',
    god: 'Deus do Submundo',
    role: 'Mobile Testing',
    stage: 10,
    image: hadesImg,
    status: 'idle',
    description: 'Hades testa todas as interações mobile nas sombras — garantindo que cada fluxo funcione em diferentes dispositivos sem erros.',
    tools: ['Chrome DevTools', 'Device Emulation', 'Touch Testing'],
  },
  {
    id: 'perseus',
    name: 'Perseus',
    god: 'Semideus',
    role: 'Desktop Testing',
    stage: 10,
    image: perseusImg,
    status: 'idle',
    description: 'Perseus foca nos testes desktop — verificando layouts em diferentes resoluções, navegação por teclado e hover states.',
    tools: ['Chrome DevTools', 'Keyboard Navigation', 'Resolution Testing'],
  },
];
