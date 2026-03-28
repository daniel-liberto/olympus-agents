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
  },
  {
    id: 'hermes',
    name: 'Hermes',
    god: 'Deus Mensageiro',
    role: 'Discovery & Requirements',
    stage: 1,
    image: hermesImg,
    status: 'idle',
  },
  {
    id: 'athena',
    name: 'Athena',
    god: 'Deusa da Sabedoria',
    role: 'Product Strategy',
    stage: 2,
    image: athenaImg,
    status: 'idle',
  },
  {
    id: 'apollo',
    name: 'Apollo',
    god: 'Deus das Artes',
    role: 'Desktop UI/UX',
    stage: 3,
    image: apolloImg,
    status: 'idle',
  },
  {
    id: 'artemis',
    name: 'Artemis',
    god: 'Deusa da Caça',
    role: 'Mobile UI/UX',
    stage: 4,
    image: artemisImg,
    status: 'idle',
  },
  {
    id: 'hephaestus',
    name: 'Hephaestus',
    god: 'Deus da Forja',
    role: 'Visual Refinement',
    stage: 5,
    image: hephaestusImg,
    status: 'idle',
  },
  {
    id: 'poseidon',
    name: 'Poseidon',
    god: 'Deus dos Mares',
    role: 'Frontend Development',
    stage: 6,
    image: poseidonImg,
    status: 'idle',
  },
  {
    id: 'hera',
    name: 'Hera',
    god: 'Rainha dos Deuses',
    role: 'Responsive Design',
    stage: 7,
    image: heraImg,
    status: 'idle',
  },
  {
    id: 'hestia',
    name: 'Hestia',
    god: 'Deusa do Lar',
    role: 'Animations & Polish',
    stage: 8,
    image: hestiaImg,
    status: 'idle',
  },
  {
    id: 'ares',
    name: 'Ares',
    god: 'Deus da Guerra',
    role: 'Frontend QA',
    stage: 9,
    image: aresImg,
    status: 'idle',
  },
  {
    id: 'hades',
    name: 'Hades',
    god: 'Deus do Submundo',
    role: 'Mobile Testing',
    stage: 10,
    image: hadesImg,
    status: 'idle',
  },
  {
    id: 'perseus',
    name: 'Perseus',
    god: 'Semideus',
    role: 'Desktop Testing',
    stage: 10,
    image: perseusImg,
    status: 'idle',
  },
];
