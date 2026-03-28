# Sitemap — CryptoFolio

## Estrutura de Navegação

```
CryptoFolio App
│
├── 📊 Dashboard (Tela Inicial) [/]
│   ├── Saldo Total Consolidado
│   ├── Campo de Busca Rápida
│   ├── Lista de Moedas do Portfólio
│   │   ├── Nome da moeda
│   │   ├── Valor atual
│   │   ├── Variação (%) — indicador visual
│   │   └── Quantidade possuída
│   └── Atalhos Rápidos (Converter / Sacar)
│
├── 🔄 Conversão [/convert]
│   ├── Seleção de moeda origem
│   ├── Seleção de moeda destino
│   ├── Input de valor
│   ├── Pré-visualização da taxa e valor final
│   └── Confirmação da conversão
│       └── Tela de sucesso / erro
│
├── 💸 Saque [/withdraw]
│   ├── Seleção de moeda
│   ├── Input de valor
│   ├── Dados de destino (conta/carteira)
│   ├── Revisão do saque
│   └── Confirmação
│       └── Tela de sucesso / status
│
├── 🔔 Alertas [/alerts]
│   ├── Lista de alertas ativos
│   ├── Criar novo alerta
│   │   ├── Selecionar moeda
│   │   ├── Definir tipo (alta / baixa)
│   │   ├── Definir limiar (%)
│   │   └── Confirmar
│   ├── Editar alerta existente
│   └── Toggle ativar/desativar
│
└── ⚙️ Configurações [/settings] (mínimo)
    ├── Preferências de moeda padrão (USD/BRL)
    └── Sobre o app
```

## Navegação Principal

### Mobile (Bottom Navigation Bar)
| Ícone | Label | Rota |
|-------|-------|------|
| 📊 | Dashboard | `/` |
| 🔄 | Converter | `/convert` |
| 💸 | Sacar | `/withdraw` |
| 🔔 | Alertas | `/alerts` |

### Desktop (Sidebar)
| Ícone | Label | Rota |
|-------|-------|------|
| 📊 | Dashboard | `/` |
| 🔄 | Converter | `/convert` |
| 💸 | Sacar | `/withdraw` |
| 🔔 | Alertas | `/alerts` |
| ⚙️ | Config | `/settings` |

## Hierarquia de Páginas

| Nível | Página | Tipo | Notas |
|-------|--------|------|-------|
| L0 | Dashboard | Pública* | Tela principal, acesso direto |
| L0 | Conversão | Pública* | Fluxo de 3 passos |
| L0 | Saque | Pública* | Fluxo de 4 passos |
| L0 | Alertas | Pública* | CRUD simples |
| L0 | Configurações | Pública* | Configurações mínimas |

*\*Sem autenticação — todas as telas são acessíveis diretamente.*

## Modais e Overlays
- **Modal de confirmação de conversão** — Antes de executar a troca
- **Modal de confirmação de saque** — Antes de enviar
- **Toast de alerta disparado** — Notificação quando preço atinge limiar
- **Modal de sucesso** — Feedback pós-ação (conversão/saque)
