// Currículos de exemplo (pessoas fictícias) cadastrados no banco.
// Para usar seus próprios dados, basta editar este arquivo e rodar "npm run seed".

const people = [
  {
    name: "Mariana Albuquerque Souza",
    email: "mariana.albuquerque@email.com",
    phone: "(81) 99999-0001",
    headline: "Desenvolvedora Back-end Júnior",
    summary:
      "Estudante de Ciência da Computação com foco em desenvolvimento back-end, APIs REST e bancos de dados relacionais. Gosto de transformar problemas reais em software simples e bem organizado.",
    city: "Recife - PE",
    linkedinUrl: "https://www.linkedin.com/in/mariana-albuquerque-exemplo",
    githubUrl: "https://github.com/mariana-albuquerque-exemplo",
    educations: [
      {
        institution: "Universidade Católica de Pernambuco (UNICAP)",
        course: "Bacharelado em Ciência da Computação",
        level: "Graduação",
        startDate: "2022-02-01",
        endDate: null,
        description:
          "Curso em andamento, com ênfase em engenharia de software e banco de dados.",
      },
      {
        institution: "Escola Técnica Estadual de Pernambuco",
        course: "Técnico em Informática",
        level: "Técnico",
        startDate: "2018-02-01",
        endDate: "2020-12-15",
        description:
          "Formação em lógica de programação, redes e manutenção de computadores.",
      },
    ],
    experiences: [
      {
        company: "Nuvem Azul Tecnologia",
        role: "Estagiária de Desenvolvimento Back-end",
        startDate: "2025-03-01",
        endDate: null,
        description:
          "Desenvolvimento e manutenção de APIs REST em Node.js e PostgreSQL, com documentação e testes de endpoints.",
      },
      {
        company: "Alfa Sistemas",
        role: "Estagiária de Suporte Técnico",
        startDate: "2024-01-15",
        endDate: "2025-02-28",
        description:
          "Atendimento a usuários, diagnóstico de problemas e documentação de procedimentos internos.",
      },
    ],
    projects: [
      {
        name: "API de Biblioteca",
        description:
          "API REST para controle de empréstimos de livros, com cadastro de usuários, livros e histórico de empréstimos.",
        technologies: "Node.js, Express, PostgreSQL, Sequelize",
        repositoryUrl:
          "https://github.com/mariana-albuquerque-exemplo/api-biblioteca",
        deployUrl: null,
      },
      {
        name: "Painel de Tarefas",
        description:
          "Aplicação web para organização de tarefas pessoais com quadro estilo kanban.",
        technologies: "React, Node.js, PostgreSQL",
        repositoryUrl:
          "https://github.com/mariana-albuquerque-exemplo/painel-de-tarefas",
        deployUrl: "https://painel-de-tarefas-exemplo.vercel.app",
      },
    ],
    skills: [
      { name: "JavaScript", level: "Intermediário" },
      { name: "Node.js", level: "Intermediário" },
      { name: "PostgreSQL", level: "Intermediário" },
      { name: "Git e GitHub", level: "Intermediário" },
      { name: "Docker", level: "Básico" },
    ],
    languages: [
      { name: "Português", proficiency: "Nativo" },
      { name: "Inglês", proficiency: "Intermediário" },
      { name: "Espanhol", proficiency: "Básico" },
    ],
  },
  {
    name: "Rafael Tavares Lima",
    email: "rafael.tavares@email.com",
    phone: "(81) 99999-0002",
    headline: "Desenvolvedor Front-end e Mobile",
    summary:
      "Desenvolvedor com experiência em interfaces web e aplicativos mobile. Interesse especial por design de interfaces, acessibilidade e experiência do usuário.",
    city: "Olinda - PE",
    linkedinUrl: "https://www.linkedin.com/in/rafael-tavares-exemplo",
    githubUrl: "https://github.com/rafael-tavares-exemplo",
    educations: [
      {
        institution: "Instituto Federal de Pernambuco (IFPE)",
        course: "Tecnologia em Análise e Desenvolvimento de Sistemas",
        level: "Graduação",
        startDate: "2019-02-01",
        endDate: "2022-12-15",
        description:
          "Formação voltada ao desenvolvimento de sistemas web e mobile, com trabalho de conclusão sobre acessibilidade em aplicativos.",
      },
      {
        institution: "Plataforma de Cursos Online",
        course: "Desenvolvimento de Aplicativos com React Native",
        level: "Curso livre",
        startDate: "2023-03-01",
        endDate: "2023-06-30",
        description: "Curso de 60 horas com projeto final publicado.",
      },
    ],
    experiences: [
      {
        company: "Estúdio Pixel Criativo",
        role: "Desenvolvedor Front-end Pleno",
        startDate: "2023-01-02",
        endDate: null,
        description:
          "Desenvolvimento de interfaces web com React e de aplicativos mobile com React Native para clientes de diferentes segmentos.",
      },
      {
        company: "Loja Virtual Conecta",
        role: "Desenvolvedor Front-end Júnior",
        startDate: "2021-06-01",
        endDate: "2022-12-31",
        description:
          "Manutenção do site da loja, criação de componentes reutilizáveis e melhoria de desempenho das páginas.",
      },
    ],
    projects: [
      {
        name: "App de Delivery",
        description:
          "Aplicativo mobile de pedidos para restaurantes locais, com carrinho, acompanhamento do pedido e pagamento simulado.",
        technologies: "React Native, Expo, TypeScript",
        repositoryUrl: "https://github.com/rafael-tavares-exemplo/app-delivery",
        deployUrl: null,
      },
      {
        name: "Portfólio Pessoal",
        description:
          "Site pessoal responsivo e acessível apresentando projetos, experiências e contatos.",
        technologies: "React, CSS, JavaScript",
        repositoryUrl: "https://github.com/rafael-tavares-exemplo/portfolio",
        deployUrl: "https://rafael-tavares-exemplo.vercel.app",
      },
    ],
    skills: [
      { name: "React", level: "Avançado" },
      { name: "React Native", level: "Intermediário" },
      { name: "TypeScript", level: "Intermediário" },
      { name: "CSS", level: "Avançado" },
      { name: "Figma", level: "Básico" },
    ],
    languages: [
      { name: "Português", proficiency: "Nativo" },
      { name: "Inglês", proficiency: "Avançado" },
    ],
  },
];

export default people;
