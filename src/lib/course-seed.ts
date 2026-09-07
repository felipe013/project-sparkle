import type { CourseModule, Lesson } from "./course-types";

/**
 * Sample data for the demo.
 * The YouTube ids below are real, public sewing/alteration videos used only to
 * demonstrate the player and thumbnails — swap them in the admin panel.
 */
const DEMO_VIDEO_IDS = [
  "WXwb3lod_RQ",
  "LlSAJvPLW20",
  "IRW24pjLs2U",
  "psnGzh0jaQQ",
  "56S5Oym8oz4",
  "O-4_UTdctC4",
  "A4BZYIn3rUM",
] as const;

type LessonSeed = readonly [title: string, description: string, tags: string];

interface ModuleSeed {
  readonly slug: string;
  readonly title: string;
  readonly tagline: string;
  readonly steps: readonly string[];
  readonly lessons: readonly LessonSeed[];
}

const MODULE_SEEDS: readonly ModuleSeed[] = [
  {
    slug: "primeiros-passos",
    title: "Primeiros Passos",
    tagline: "Ferramentas, máquina regulada e as bases de um ajuste bem feito.",
    steps: [
      "Separe a peça, a régua, o giz e os alfinetes antes de começar.",
      "Regule a máquina com o tecido da própria peça em um retalho.",
      "Faça a marcação completa antes de qualquer corte.",
      "Prove a peça no corpo ou no manequim para conferir.",
    ],
    lessons: [
      ["Boas-vindas ao curso", "Como a plataforma funciona e o melhor caminho para estudar.", "introdução, iniciante"],
      ["Kit básico de ferramentas", "Tesouras, réguas, giz, alfinetes e o que realmente vale investir.", "ferramentas, iniciante"],
      ["Conhecendo sua máquina", "Partes da máquina, regulagens e manutenção rápida do dia a dia.", "máquina, iniciante"],
      ["Escolha de linhas e agulhas", "Combinações certas para jeans, malha, alfaiataria e tecidos finos.", "materiais, tecidos"],
      ["Tipos de tecido e comportamento", "Como cada tecido reage ao corte, ao vapor e à costura.", "tecidos, teoria"],
      ["Pontos essenciais à máquina", "Reto, zigue-zague, caseado e overlock caseiro na prática.", "técnica, iniciante"],
      ["Pontos à mão indispensáveis", "Alinhavo, ponto invisível, pesponto manual e arremate.", "técnica, manual"],
      ["Ferro e vapor: metade do resultado", "Abrir costura, modelar e fixar sem marcar o tecido.", "acabamento, ferro"],
      ["Organizando o espaço de trabalho", "Bancada, iluminação e fluxo para produzir mais rápido.", "organização, ateliê"],
      ["Precificando um ajuste", "Como calcular tempo, material e lucro em cada serviço.", "negócio, precificação"],
    ],
  },
  {
    slug: "medidas-e-identificacao",
    title: "Medidas e Identificação do Ajuste",
    tagline: "Ler o corpo do cliente e descobrir exatamente o que precisa mudar.",
    steps: [
      "Peça para o cliente vestir a peça com o sapato que vai usar.",
      "Marque com alfinete pelo direito da peça, sempre em pares.",
      "Anote as medidas em ficha antes de soltar os alfinetes.",
      "Confirme o resultado esperado com o cliente antes de cortar.",
    ],
    lessons: [
      ["Como tirar medidas corretamente", "Fita métrica, pontos de referência e erros que arruínam o ajuste.", "medidas, iniciante"],
      ["Ficha de atendimento do cliente", "Registrando medidas, prazo e o que foi combinado.", "negócio, medidas"],
      ["Prova com alfinetes", "A técnica de alfinetar no corpo sem machucar nem deformar.", "prova, medidas"],
      ["Lendo o caimento da peça", "Rugas, repuxos e sobras: o que cada defeito está dizendo.", "diagnóstico, caimento"],
      ["Diferenças entre corpos", "Ombro caído, quadril alto, barriga e costas largas.", "diagnóstico, anatomia"],
      ["Quando o ajuste não compensa", "Reconhecendo peças que não valem o serviço.", "diagnóstico, negócio"],
      ["Marcação com giz e alfinete", "Marcações precisas que sobrevivem até a máquina.", "marcação, técnica"],
      ["Desmontando a peça com segurança", "Descosturar sem furar, esgarçar ou perder referência.", "descosturar, técnica"],
      ["Registro fotográfico do antes", "Fotos que protegem você e vendem o seu trabalho.", "negócio, organização"],
    ],
  },
  {
    slug: "ajustes-de-cintura",
    title: "Ajustes de Cintura",
    tagline: "Apertar, alargar e reposicionar o cós em qualquer peça.",
    steps: [
      "Marque a folga total e divida igualmente entre as laterais ou o centro.",
      "Descosture apenas o trecho necessário do cós.",
      "Costure, prove e só então corte o excesso.",
      "Feche o cós e finalize com pesponto igual ao original.",
    ],
    lessons: [
      ["Apertar cintura pelo centro das costas", "O ajuste clássico que preserva bolsos e passantes.", "cintura, calça"],
      ["Apertar cintura pelas laterais", "Quando a lateral é o caminho mais limpo.", "cintura, calça"],
      ["Alargar cintura com nesga", "Ganhando centímetros sem deformar o cós.", "cintura, alargar"],
      ["Cós de calça jeans passo a passo", "Trabalhando com pesponto duplo e linha grossa.", "cintura, jeans"],
      ["Cintura de saia sem forro", "Ajuste rápido em saia reta e evasê.", "cintura, saia"],
      ["Cintura com elástico embutido", "Substituição e regulagem de elástico interno.", "cintura, elástico"],
      ["Ajuste de cós em alfaiataria", "Cuidados com entretela, forro e vinco.", "cintura, alfaiataria"],
      ["Reposicionando passantes", "Mantendo o visual original depois do ajuste.", "cintura, acabamento"],
      ["Pences na cintura", "Criando pences discretas para modelar o corpo.", "cintura, pences"],
      ["Cintura em vestido justo", "Ajustando sem perder o alinhamento do zíper.", "cintura, vestido"],
    ],
  },
  {
    slug: "ajustes-laterais",
    title: "Ajustes Laterais",
    tagline: "Afinar e alargar peças pela costura lateral com caimento perfeito.",
    steps: [
      "Vire a peça pelo avesso e alfinete a nova linha lateral.",
      "Faça uma linha suave, sem degraus, do busto até a barra.",
      "Alinhave e prove antes de costurar definitivo.",
      "Corte a sobra, overloque e passe a costura aberta.",
    ],
    lessons: [
      ["Afinando camisa social", "Deixando a camisa no corpo sem apertar o movimento.", "lateral, camisa"],
      ["Afinando camiseta de malha", "Costura elástica e overlock para não estourar.", "lateral, malha"],
      ["Alargando peça pela lateral", "Aproveitando margens de costura escondidas.", "lateral, alargar"],
      ["Ajuste lateral de vestido", "Curvas do busto e cintura em uma linha só.", "lateral, vestido"],
      ["Lateral de blazer", "Trabalhando com forro solto e ombro estruturado.", "lateral, alfaiataria"],
      ["Lateral de calça reta", "Afinando a perna sem perder o gancho.", "lateral, calça"],
      ["Pences laterais nas costas", "Eliminando sobra nas costas de camisas.", "lateral, pences"],
      ["Lateral com bolso embutido", "Ajustando sem fechar ou deformar o bolso.", "lateral, bolso"],
      ["Corrigindo lateral torta", "Quando a costura original já veio errada de fábrica.", "lateral, correção"],
    ],
  },
  {
    slug: "ajustes-de-mangas",
    title: "Ajustes de Mangas",
    tagline: "Comprimento, largura e cava com acabamento de fábrica.",
    steps: [
      "Meça o comprimento final com o braço relaxado.",
      "Descosture o punho ou a barra preservando o formato.",
      "Ajuste a largura mantendo a curva da cava.",
      "Remonte o punho e passe com vapor para assentar.",
    ],
    lessons: [
      ["Encurtar manga de camisa pelo punho", "O método profissional que mantém a prega original.", "manga, camisa"],
      ["Encurtar manga de blazer", "Com botões funcionais e forro interno.", "manga, alfaiataria"],
      ["Afinar manga larga", "Reduzindo a largura sem apertar o cotovelo.", "manga, afinar"],
      ["Manga de malha e camiseta", "Barra dupla e ponto elástico.", "manga, malha"],
      ["Ajuste de cava apertada", "Ganhando conforto sem refazer a manga.", "manga, cava"],
      ["Manga bufante e franzida", "Redistribuindo o franzido depois do ajuste.", "manga, franzido"],
      ["Trocar punho danificado", "Reconstruindo punho gasto de camisa social.", "manga, conserto"],
      ["Manga de vestido de festa", "Tecidos delicados, forro e transparência.", "manga, festa"],
      ["Manga raglã", "Particularidades do corte raglã no ajuste.", "manga, raglã"],
      ["Manga de jaqueta com zíper", "Trabalhando o punho com zíper e elástico.", "manga, jaqueta"],
    ],
  },
  {
    slug: "barras-e-comprimento",
    title: "Barras e Comprimento",
    tagline: "Todos os tipos de barra, do ponto invisível à barra original.",
    steps: [
      "Marque o comprimento com o cliente de pé e calçado.",
      "Confira o nivelamento pelo chão, não pela peça.",
      "Corte deixando a margem correta para o tipo de barra.",
      "Passe bem antes e depois de costurar.",
    ],
    lessons: [
      ["Barra simples à máquina", "A base que serve para quase todo tecido leve.", "barra, iniciante"],
      ["Barra invisível à mão", "O ponto que não aparece pelo direito.", "barra, manual"],
      ["Barra invisível na máquina", "Usando o calcador específico com precisão.", "barra, máquina"],
      ["Barra original de jeans", "Preservando o desfiado e o pesponto de fábrica.", "barra, jeans"],
      ["Barra de calça social com vinco", "Mantendo o vinco alinhado e a boca correta.", "barra, alfaiataria"],
      ["Barra de saia rodada", "Barra estreita em curva sem enrugar.", "barra, saia"],
      ["Barra de vestido longo", "Nivelando peças com caimento em viés.", "barra, vestido"],
      ["Barra de malha com ponto duplo", "Sem ondular e sem estourar.", "barra, malha"],
      ["Barra em tecido transparente", "Barra rolotê e acabamentos finos.", "barra, delicado"],
      ["Alongar peça curta demais", "Soluções com faixa, viés e recorte.", "barra, alongar"],
    ],
  },
  {
    slug: "calcas",
    title: "Calças",
    tagline: "Gancho, coxa, boca e todos os ajustes que mais chegam no ateliê.",
    steps: [
      "Identifique se o problema é de gancho, quadril ou coxa.",
      "Alfinete pelo avesso respeitando a curva do corpo.",
      "Teste sentado e em pé antes de finalizar.",
      "Refaça o pesponto igual ao original.",
    ],
    lessons: [
      ["Tirar o papo do gancho", "O ajuste mais pedido em calças femininas.", "calça, gancho"],
      ["Afinar a coxa", "Redistribuindo a folga entre lateral e entrepernas.", "calça, coxa"],
      ["Afinar a boca da calça", "Do skinny ao reto, com proporção correta.", "calça, boca"],
      ["Aumentar o gancho", "Ganhando conforto em calças apertadas.", "calça, gancho"],
      ["Ajuste de calça jeans completo", "Cintura, coxa e barra na mesma peça.", "calça, jeans"],
      ["Calça de alfaiataria", "Vinco, forro e caimento de tecido nobre.", "calça, alfaiataria"],
      ["Calça pantalona", "Ajustando volume sem perder o movimento.", "calça, pantalona"],
      ["Calça legging e malha", "Costura elástica e ponto que acompanha o corpo.", "calça, malha"],
      ["Bolso que abre demais", "Corrigindo bolso escancarado no quadril.", "calça, bolso"],
      ["Calça masculina social", "Padrões de acabamento da alfaiataria masculina.", "calça, masculino"],
    ],
  },
  {
    slug: "saias",
    title: "Saias",
    tagline: "Cintura, quadril, fenda e forro em todos os modelos.",
    steps: [
      "Prove a saia na altura real de uso da cintura.",
      "Ajuste o forro junto com o tecido externo.",
      "Confira a fenda e o zíper depois de cada mudança.",
      "Passe com vapor para assentar a curva do quadril.",
    ],
    lessons: [
      ["Apertar saia reta", "Ajuste limpo em lateral e centro das costas.", "saia, cintura"],
      ["Ajuste de saia com forro", "Trabalhando as duas camadas em conjunto.", "saia, forro"],
      ["Saia lápis no quadril", "Modelando a curva sem repuxar.", "saia, quadril"],
      ["Encurtar saia godê", "Nivelando o rodado corretamente.", "saia, comprimento"],
      ["Ajustar fenda", "Reposicionar, encurtar ou fechar a fenda.", "saia, fenda"],
      ["Saia plissada", "Preservando as pregas durante o ajuste.", "saia, plissado"],
      ["Saia jeans", "Cós reforçado e pesponto aparente.", "saia, jeans"],
      ["Saia de festa", "Tecidos nobres, camadas e transparência.", "saia, festa"],
      ["Trocar cós de saia", "Reconstruindo cós gasto ou apertado.", "saia, cós"],
    ],
  },
  {
    slug: "vestidos",
    title: "Vestidos",
    tagline: "Busto, alças, costas e caimento em peças do dia a dia e de festa.",
    steps: [
      "Comece o ajuste sempre de cima para baixo: ombro, busto, cintura.",
      "Solte o forro antes de mexer no tecido externo.",
      "Prove após cada etapa, nunca só no final.",
      "Feche o forro à mão para um acabamento invisível.",
    ],
    lessons: [
      ["Ajuste de busto", "Ganhando ou reduzindo espaço sem deformar o decote.", "vestido, busto"],
      ["Ombro caído e alças", "Encurtando alças e corrigindo o ombro.", "vestido, ombro"],
      ["Vestido com zíper invisível", "Ajustando sem estragar o zíper.", "vestido, zíper"],
      ["Costas abertas e nadador", "Ajustes em modelagens com pouca sustentação.", "vestido, costas"],
      ["Vestido de malha", "Costuras elásticas em peças coladas ao corpo.", "vestido, malha"],
      ["Vestido de festa longo", "Camadas, forro e barra nivelada.", "vestido, festa"],
      ["Vestido de noiva: ajustes básicos", "Cuidados com renda, corpete e cauda.", "vestido, noiva"],
      ["Decote que abre", "Corrigindo decote que não fica no lugar.", "vestido, decote"],
      ["Cintura marcada do vestido", "Realinhando a cintura ao corpo do cliente.", "vestido, cintura"],
      ["Transformar vestido largo", "Reduzindo vários números com harmonia.", "vestido, transformação"],
    ],
  },
  {
    slug: "ziperes",
    title: "Zíperes",
    tagline: "Trocar, consertar e instalar qualquer tipo de zíper.",
    steps: [
      "Escolha o zíper do mesmo tipo, cor e comprimento.",
      "Descosture registrando a posição original com alfinete.",
      "Use o calcador de zíper e costure devagar.",
      "Teste a abertura antes de fechar o forro.",
    ],
    lessons: [
      ["Tipos de zíper", "Comum, invisível, destacável e de jaqueta.", "zíper, teoria"],
      ["Trocar zíper de calça", "Passo a passo completo em jeans e social.", "zíper, calça"],
      ["Zíper invisível em vestido", "Instalação perfeita sem marcar o tecido.", "zíper, vestido"],
      ["Zíper de jaqueta destacável", "Substituição em peças de moletom e nylon.", "zíper, jaqueta"],
      ["Zíper de saia", "Instalação lateral e nas costas.", "zíper, saia"],
      ["Consertar cursor solto", "Recuperando o zíper sem trocar tudo.", "zíper, conserto"],
      ["Encurtar zíper", "Adaptando o comprimento com segurança.", "zíper, ajuste"],
      ["Zíper em couro e sintético", "Agulha, calcador e cuidados especiais.", "zíper, couro"],
      ["Zíper de bolso e almofada", "Aplicações rápidas e lucrativas.", "zíper, bolso"],
    ],
  },
  {
    slug: "acabamentos",
    title: "Acabamentos",
    tagline: "O detalhe que separa o amador do profissional.",
    steps: [
      "Limpe todas as linhas soltas antes de passar.",
      "Passe cada costura assim que fechar.",
      "Confira o direito e o avesso da peça.",
      "Embale a peça pronta para entrega.",
    ],
    lessons: [
      ["Overlock e alternativas caseiras", "Acabamento de borda sem máquina industrial.", "acabamento, borda"],
      ["Viés: aplicação profissional", "Viés simples, embutido e decorativo.", "acabamento, viés"],
      ["Casas e botões", "Marcação, tamanho e reforço correto.", "acabamento, botões"],
      ["Pesponto perfeito", "Linha, tensão e velocidade para pesponto reto.", "acabamento, pesponto"],
      ["Forro bem colocado", "Fechando forro à mão e à máquina.", "acabamento, forro"],
      ["Entretela na medida certa", "Escolha e aplicação sem bolhas.", "acabamento, entretela"],
      ["Passadoria profissional", "Sequência de passar que valoriza a peça.", "acabamento, ferro"],
      ["Etiquetas e identidade", "Marcando suas peças e serviços.", "acabamento, negócio"],
      ["Checklist de entrega", "Conferência final antes de devolver ao cliente.", "acabamento, negócio"],
    ],
  },
  {
    slug: "correcao-de-erros",
    title: "Correção de Erros",
    tagline: "Como salvar a peça quando o ajuste não sai como planejado.",
    steps: [
      "Pare e analise antes de costurar por cima do erro.",
      "Descosture com cuidado e avalie o tecido.",
      "Escolha entre corrigir, disfarçar ou recriar o detalhe.",
      "Refaça a prova antes de finalizar.",
    ],
    lessons: [
      ["Cortei demais, e agora?", "Soluções reais para peças cortadas a mais.", "correção, emergência"],
      ["Costura torta ou franzida", "Descosturando e refazendo sem marcar.", "correção, costura"],
      ["Furos de agulha aparentes", "Recuperando tecido marcado por alfinete e agulha.", "correção, tecido"],
      ["Tecido esgarçado", "Reforço com entretela e cerzido invisível.", "correção, reforço"],
      ["Peça que encolheu", "Recuperando o caimento após a lavagem.", "correção, lavagem"],
      ["Cor da linha errada", "Quando refazer e quando disfarçar.", "correção, acabamento"],
      ["Ajuste ficou apertado", "Recuperando centímetros das margens.", "correção, medidas"],
      ["Cliente insatisfeito", "Diagnóstico, conversa e retrabalho.", "correção, negócio"],
      ["Remendos invisíveis", "Cerzido e aplicações que somem no tecido.", "correção, remendo"],
    ],
  },
];

function durationFor(moduleIndex: number, lessonIndex: number): string {
  const minutes = 7 + ((moduleIndex * 5 + lessonIndex * 3) % 22);
  const seconds = (lessonIndex * 17 + moduleIndex * 7) % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

export const COURSE_MODULES: readonly CourseModule[] = MODULE_SEEDS.map((seed, index) => ({
  id: seed.slug,
  slug: seed.slug,
  title: seed.title,
  tagline: seed.tagline,
  steps: seed.steps,
  order: index + 1,
}));

export const SEED_LESSONS: readonly Lesson[] = MODULE_SEEDS.flatMap((seed, moduleIndex) =>
  seed.lessons.map((lesson, lessonIndex) => ({
    id: `${seed.slug}-${lessonIndex + 1}`,
    moduleId: seed.slug,
    title: lesson[0],
    description: lesson[1],
    youtubeId: DEMO_VIDEO_IDS[(moduleIndex * 3 + lessonIndex) % DEMO_VIDEO_IDS.length]!,
    duration: durationFor(moduleIndex, lessonIndex),
    order: lessonIndex + 1,
    tags: lesson[2].split(",").map((tag) => tag.trim()),
  })),
);

export const FEATURED_LESSON_ID = "medidas-e-identificacao-1";
