# Project Initializer — Setup Guide

## Propósito
Este módulo inicializa um novo projeto dentro do pipeline Olympus. Ele é **reutilizável** — execute-o toda vez que um novo projeto precisar ser configurado.

## Pré-requisitos
- Documento de briefing do cliente (Markdown ou PDF)
- Username do GitHub configurado
- Acesso ao terminal com Git instalado

## Passo a Passo

### 1. Preparar o Briefing
O briefing deve conter obrigatoriamente:
- Nome do projeto
- Objetivos do cliente
- Features requeridas
- Restrições e limitações
- Referências visuais (opcional)

### 2. Executar Inicialização
1. Coloque o briefing em `cursor/agents/init_project/input/briefing.md`
2. Siga o `init_project.md` na raiz de `cursor/agents/`
3. O inicializador vai:
   - Desvincular o Git antigo
   - Limpar todas as pastas de agentes
   - Criar novo repositório
   - Copiar briefing para Zeus
   - Iniciar o pipeline

### 3. Verificar
Após a inicialização, confirme:
- [ ] Novo remote Git configurado
- [ ] Briefing em `cursor/agents/zeus/input/briefing.md`
- [ ] Todas as pastas input/output estão limpas
- [ ] Pipeline pronto para iniciar

## Output
Após inicialização bem-sucedida:
```
cursor/agents/init_project/output/
  └── init-log.md    (log da inicialização com timestamp e configurações)
```

## Próximo Passo
Zeus recebe o briefing e delega para Hermes (Discovery) — o pipeline começa automaticamente.
