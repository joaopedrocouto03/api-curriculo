# API de Currículos

API REST para um aplicativo de currículos, feita com **Express 5**, **Sequelize** e **PostgreSQL** (NeonDB), publicada na **Vercel**. Projeto da disciplina *Aplicações Orientadas a Serviços* (UNICAP).

## Entidades e relacionamentos

```
Person (pessoa)
 ├── 1:N  Education   (formações acadêmicas)
 ├── 1:N  Experience  (experiências profissionais)
 ├── 1:N  Project     (projetos)
 ├── 1:N  Skill       (habilidades)
 └── 1:N  Language    (idiomas)
```

Todos os itens pertencem a uma pessoa (`personId`). Ao excluir uma pessoa, seus itens são excluídos em cascata.

| Entidade | Campos principais |
| --- | --- |
| `Person` | `name`*, `email`* (único), `phone`, `headline`, `summary`, `city`, `linkedinUrl`, `githubUrl` |
| `Education` | `institution`*, `course`*, `level`*, `startDate`*, `endDate`, `description` |
| `Experience` | `company`*, `role`*, `startDate`*, `endDate`, `description` |
| `Project` | `name`*, `description`, `technologies`, `repositoryUrl`, `deployUrl` |
| `Skill` | `name`*, `level`* |
| `Language` | `name`*, `proficiency`* |

`*` = obrigatório. Datas no formato `AAAA-MM-DD`; `endDate` vazio (`null`) indica algo em andamento.

Valores aceitos:

- `Education.level`: Ensino Médio, Técnico, Graduação, Pós-graduação, Mestrado, Doutorado, Curso livre
- `Skill.level`: Básico, Intermediário, Avançado
- `Language.proficiency`: Básico, Intermediário, Avançado, Fluente, Nativo

## Endpoints

### Pessoas

| Método | Rota | Descrição |
| --- | --- | --- |
| GET | `/people` | Lista as pessoas |
| GET | `/people/:personId` | **Currículo completo** (pessoa com formações, experiências, projetos, habilidades e idiomas) |
| POST | `/people` | Cria uma pessoa |
| PUT | `/people/:personId` | Atualiza uma pessoa (campos enviados) |
| DELETE | `/people/:personId` | Exclui a pessoa e tudo que pertence a ela |

### Itens do currículo (CRUD de cada entidade)

As rotas abaixo valem para `/educations`, `/experiences`, `/projects`, `/skills` e `/languages` (troque `:id` pelo id do item):

| Método | Rota | Descrição |
| --- | --- | --- |
| GET | `/educations` | Lista todos |
| GET | `/educations/:id` | Busca um |
| POST | `/educations` | Cria (enviar `personId` no corpo) |
| PUT | `/educations/:id` | Atualiza (campos enviados) |
| DELETE | `/educations/:id` | Exclui |

### Relacionamentos (itens de uma pessoa)

| Método | Rota | Descrição |
| --- | --- | --- |
| GET | `/people/:personId/educations` | Formações da pessoa |
| POST | `/people/:personId/educations` | Cria formação para a pessoa |
| GET / POST | `/people/:personId/experiences` | Experiências da pessoa |
| GET / POST | `/people/:personId/projects` | Projetos da pessoa |
| GET / POST | `/people/:personId/skills` | Habilidades da pessoa |
| GET / POST | `/people/:personId/languages` | Idiomas da pessoa |

### Exemplos de corpo (JSON)

```json
// POST /people
{ "name": "Maria Silva", "email": "maria@email.com", "headline": "Desenvolvedora" }

// POST /people/:personId/experiences
{ "company": "Empresa X", "role": "Estagiária", "startDate": "2025-01-10", "endDate": null }

// POST /skills
{ "personId": "<id da pessoa>", "name": "Node.js", "level": "Intermediário" }
```

## Respostas de erro

Todas as falhas seguem o mesmo formato JSON:

```json
{
  "status": "fail",
  "message": "Pessoa não encontrada."
}
```

| Situação | Código |
| --- | --- |
| Erro de validação (campo obrigatório, valor inválido, JSON inválido, ID mal formatado) | 400 |
| Recurso ou rota não encontrada | 404 |
| Registro duplicado (e-mail já cadastrado) | 409 |
| Erro inesperado | 500 (`"Algo deu errado no servidor."`) |

O campo `stack` só aparece quando `NODE_ENV=development`.

## Como rodar

Requisitos: Node.js 20+ e um banco PostgreSQL (NeonDB).

```bash
npm install
cp .env.sample .env   # depois edite o .env com a sua DATABASE_URL
npm run seed          # cria as tabelas e cadastra os dois currículos de exemplo
npm run dev           # inicia a API em http://localhost:3000
```

### Variáveis de ambiente

| Variável | Descrição |
| --- | --- |
| `DATABASE_URL` | Connection string do PostgreSQL (NeonDB) |
| `NODE_ENV` | `development` mostra o `stack` nos erros; em produção não defina ou use `production` |
| `SYNC_DATABASE` | `true` sincroniza os models com o banco ao iniciar |
| `ERASE_DATABASE_ON_SYNC` | `true` apaga e recria as tabelas e roda o seed ao iniciar (**use com cuidado**) |
| `PORT` | Porta do servidor (padrão `3000`) |

### Scripts

| Comando | O que faz |
| --- | --- |
| `npm run dev` | Servidor em desenvolvimento (nodemon + Babel) |
| `npm run build` | Compila `src` para `dist` |
| `npm start` | Executa a versão compilada |
| `npm run seed` | **Apaga e recria** as tabelas e cadastra os currículos de exemplo |

## Dados de exemplo

O seed (`src/seeds/people.js`) cadastra **duas pessoas fictícias** com currículo completo: Mariana Albuquerque Souza e Rafael Tavares Lima. Para usar dados reais, edite esse arquivo e rode `npm run seed` de novo.

## Deploy na Vercel

1. Importe o repositório na Vercel.
2. Em *Settings → Environment Variables*, cadastre `DATABASE_URL` (e não defina `SYNC_DATABASE` nem `ERASE_DATABASE_ON_SYNC`).
3. Faça o deploy. As tabelas já devem existir no Neon (criadas pelo `npm run seed`).

## Estrutura

```
src/
├── index.js          # servidor Express
├── models/           # models Sequelize e relacionamentos
├── routes/           # rotas
├── controllers/      # camada HTTP
├── services/         # acesso ao banco
├── middlewares/      # cors, log, 404 e tratamento global de erros
├── seeds/            # dados de exemplo
├── scripts/          # seed.js (npm run seed)
└── utils/            # AppError e validadores
```
