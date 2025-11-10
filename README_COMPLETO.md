# 🔧 Bad Smells JS Refactoring - Projeto Completo

Projeto educacional sobre detecção e correção de Bad Smells em código JavaScript, utilizando análise estática (ESLint + SonarJS) e refatoração segura com suíte de testes.

## 📋 Sobre o Projeto

Este projeto demonstra o processo completo de:

1. **Identificação manual** de bad smells no código
2. **Detecção automática** usando ESLint + SonarJS
3. **Refatoração segura** aplicando técnicas de Martin Fowler
4. **Validação** através de suíte de testes robusta

## 🎯 Resultados Alcançados

### ❌ Antes da Refatoração

- Complexidade cognitiva: **27** (limite: 5)
- **2 erros** detectados pelo ESLint
- Duplicação de código em múltiplos pontos
- Condicionais aninhadas e números mágicos

### ✅ Depois da Refatoração

- Complexidade cognitiva: **~5 por método** (-81%)
- **0 erros** no ESLint (-100%)
- Código sem duplicação
- **100% dos testes passando** (10/10)

## 🚀 Como Executar

```bash
# Instalar dependências
npm install

# Executar todos os testes
npm test

# Analisar código original (mostra 2 erros)
npx eslint src/ReportGenerator.js

# Analisar código refatorado (mostra 0 erros)
npx eslint src/ReportGenerator.refactored.js
```

## 📁 Estrutura do Projeto

```
├── src/
│   ├── ReportGenerator.js              # ❌ Código original (com bad smells)
│   └── ReportGenerator.refactored.js   # ✅ Código refatorado (limpo)
├── tests/
│   ├── ReportGenerator.test.js         # Testes do código original
│   └── ReportGenerator.refactored.test.js # Testes do código refatorado
├── .eslintrc.json                       # Configuração ESLint + SonarJS
├── RELATORIO.md                         # 📄 Relatório completo (2-4 páginas)
├── SUMARIO.md                           # 📊 Sumário executivo
└── package.json                         # Dependências e scripts
```

## 🛠️ Técnicas de Refatoração Aplicadas

### 1. Strategy Pattern (Replace Conditional with Polymorphism)

Eliminou condicionais repetidas de tipo de relatório criando estratégias específicas:

- `CSVReportStrategy` para formato CSV
- `HTMLReportStrategy` para formato HTML

### 2. Extract Method

Quebrou o método gigante `generateReport()` em métodos menores:

- `filterItemsByUserRole()` - Filtra items por permissão
- `processAdminItems()` - Lógica específica de admin
- `processUserItems()` - Lógica específica de user
- `buildReport()` - Constrói o relatório final

### 3. Replace Magic Numbers with Named Constants

```javascript
const USER_VALUE_LIMIT = 500; // Limite de valor para usuários comuns
const PRIORITY_THRESHOLD = 1000; // Threshold para itens prioritários
```

### 4. Guard Clauses

Simplificou condicionais aninhadas com retornos antecipados

## 📊 Bad Smells Identificados e Corrigidos

| Bad Smell                       | Localização                          | Status       |
| ------------------------------- | ------------------------------------ | ------------ |
| **Alta Complexidade Cognitiva** | Método `generateReport()` (linha 11) | ✅ Corrigido |
| **Duplicação de Código**        | Formatação CSV/HTML repetida         | ✅ Corrigido |
| **Condicionais Aninhadas**      | Bloco USER (linha 43)                | ✅ Corrigido |
| **Números Mágicos**             | Valores 500 e 1000 hardcoded         | ✅ Corrigido |

## 📈 Métricas de Qualidade

| Métrica                    | Antes | Depois | Melhoria     |
| -------------------------- | ----- | ------ | ------------ |
| Complexidade Cognitiva     | 27    | ~5     | **↓ 81%**    |
| Linhas no método principal | 60+   | 5      | **↓ 92%**    |
| Erros ESLint               | 2     | 0      | **↓ 100%**   |
| Duplicação                 | Alta  | Zero   | **↓ 100%**   |
| Níveis de aninhamento      | 4     | 1-2    | **↓ 50-75%** |

## 🧪 Suíte de Testes

### Cobertura

- ✅ Relatórios CSV para ADMIN (todos os items)
- ✅ Relatórios HTML para ADMIN (com priorização)
- ✅ Relatórios CSV para USER (filtrados por valor)
- ✅ Relatórios HTML para USER (filtrados por valor)
- ✅ Casos de borda (arrays vazios)

### Resultado

```
Test Suites: 2 passed, 2 total
Tests:       10 passed, 10 total
Time:        0.852s
```

**100% dos testes passam** tanto no código original quanto no refatorado! ✅

## 📚 Documentação Completa

### RELATORIO.md (Documento Principal)

Contém:

- ✅ Capa com informações do aluno
- ✅ Análise detalhada de 3+ bad smells
- ✅ Screenshots dos resultados do ESLint
- ✅ Processo de refatoração (antes/depois)
- ✅ Explicação das técnicas aplicadas
- ✅ Conclusões e reflexões

### SUMARIO.md (Visão Rápida)

- Métricas de melhoria
- Status dos testes
- Checklist de entregáveis

## 🔍 Análise ESLint Antes/Depois

### Código Original

```bash
$ npx eslint src/ReportGenerator.js

D:\bad-smells-js-refactoring\src\ReportGenerator.js
  11:3   error  Refactor this function to reduce its Cognitive Complexity
                from 27 to the 5 allowed  sonarjs/cognitive-complexity
  43:14  error  Merge this if statement with the nested one
                sonarjs/no-collapsible-if

✖ 2 problems (2 errors, 0 warnings)
```

### Código Refatorado

```bash
$ npx eslint src/ReportGenerator.refactored.js

✨ No errors found!
```

## 🎓 Conceitos Aplicados

### Princípios SOLID

- **Single Responsibility:** Cada método tem uma responsabilidade
- **Open/Closed:** Fácil adicionar novos formatos sem modificar código existente
- **Strategy Pattern:** Abstração de algoritmos de formatação

### Clean Code

- Métodos pequenos e focados
- Nomes descritivos
- Constantes em vez de números mágicos
- Baixo acoplamento, alta coesão

### Test-Driven Refactoring

- Testes como rede de segurança
- Refatoração incremental validada por testes
- Comportamento preservado, design melhorado

## 📖 Referências

- **Martin Fowler** - Refactoring: Improving the Design of Existing Code (2ª ed., 2019)
- **Catálogo de Refatoração** - https://refactoring.com/catalog/
- **ESLint Plugin SonarJS** - https://github.com/SonarSource/eslint-plugin-sonarjs
- **Repositório Original** - https://github.com/CleitonSilvaT/bad-smells-js-refactoring

## 👨‍💻 Autor

**Pedro Máximo Campos**  
Trabalho de Engenharia de Software / Qualidade de Código  
Novembro 2025

## 📦 Entregáveis

- ✅ Repositório GitHub: https://github.com/pedromaximocampos/bad-smells-js-refactoring
- ✅ Código refatorado: `src/ReportGenerator.refactored.js`
- ✅ Testes: `tests/ReportGenerator.refactored.test.js`
- ✅ Relatório completo: `RELATORIO.md` (pronto para converter em PDF)
- ✅ Configuração ESLint: `.eslintrc.json`
- ✅ Todos os commits documentados

---

## 🚀 Começar do Zero (Para Reproduzir)

```bash
# 1. Clonar o repositório
git clone https://github.com/pedromaximocampos/bad-smells-js-refactoring
cd bad-smells-js-refactoring

# 2. Instalar dependências
npm install

# 3. Ver os testes passando
npm test

# 4. Comparar código original vs refatorado
npx eslint src/ReportGenerator.js          # 2 erros
npx eslint src/ReportGenerator.refactored.js  # 0 erros
```

**Status:** ✅ Projeto completo e pronto para entrega!
