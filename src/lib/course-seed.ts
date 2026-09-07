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
    slug: "ajuste-de-cintura",
    title: "Ajuste de Cintura",
    tagline: "O serviço mais pedido do ateliê, resolvido de todas as formas.",
    steps: [
      "Prove a peça com o sapato e a blusa que o cliente vai usar.",
      "Alfinete pelo avesso, sempre em pares, respeitando a curva do corpo.",
      "Marque a cós inteiro antes de descosturar qualquer parte.",
      "Refaça o pesponto igual ao original e prove de novo antes de arrematar.",
    ],
    lessons: [
      ["Como diagnosticar a folga na cintura", "Onde sobra, onde falta e qual técnica usar em cada caso.", "cintura, diagnóstico"],
      ["Tirando as medidas da cintura e quadril", "Pontos de referência que evitam erro de centímetros.", "cintura, medidas"],
      ["Apertar cintura pelo centro das costas", "O ajuste clássico que preserva bolsos e passantes.", "cintura, calça"],
      ["Apertar cintura pelas laterais", "Quando dividir a folga em duas costuras dá melhor caimento.", "cintura, laterais"],
      ["Apertar cintura sem abrir o cós", "Técnica rápida para folgas de até três centímetros.", "cintura, rápido"],
      ["Abrindo e refazendo o cós completo", "Passo a passo do desmonte e da remontagem.", "cintura, cós"],
      ["Alargar cintura com folga interna", "Aproveitando as margens escondidas da peça.", "cintura, alargar"],
      ["Alargar cintura com recorte novo", "Inserindo tecido igual ou em contraste bem resolvido.", "cintura, alargar"],
      ["Cintura de calça jeans", "Pesponto duplo, linha grossa e agulha certa.", "cintura, jeans"],
      ["Cintura de alfaiataria", "Forro, entretela e acabamento interno impecável.", "cintura, alfaiataria"],
      ["Cintura elástica: apertar e trocar", "Elástico embutido, canaleta e franzido uniforme.", "cintura, elástico"],
      ["Passantes: remover e recolocar", "Reposicionando sem deixar marca do lugar antigo.", "cintura, passantes"],
      ["Gap nas costas da calça", "A folga em V e como eliminar de vez.", "cintura, caimento"],
      ["Cintura de saia com zíper lateral", "Ajustando sem comprometer o fechamento.", "cintura, saia"],
      ["Cintura alta a partir de peça média", "Subindo o cós e reequilibrando as proporções.", "cintura, modelagem"],
      ["Prova final e acabamento da cintura", "Vapor, arremate e conferência antes de entregar.", "cintura, acabamento"],
    ],
  },
  {
    slug: "ajustes-laterais",
    title: "Ajustes Laterais",
    tagline: "Afinar e alargar o corpo da peça mantendo o caimento original.",
    steps: [
      "Marque a nova linha lateral com a peça vestida.",
      "Distribua a diferença igualmente entre os dois lados.",
      "Costure em curva suave, nunca em ângulo.",
      "Passe a costura aberta antes de fechar o acabamento.",
    ],
    lessons: [
      ["Anatomia da costura lateral", "Como a lateral controla todo o caimento da peça.", "laterais, teoria"],
      ["Marcando a nova lateral no corpo", "Alfinetes, giz e o truque do espelho triplo.", "laterais, medidas"],
      ["Afinando camisa social", "Deixando a camisa no corpo sem apertar o movimento.", "laterais, camisa"],
      ["Afinando camiseta e malha", "Costura elástica que não estoura no uso.", "laterais, malha"],
      ["Afinando blusa com manga raglan", "Respeitando o encaixe diferente da cava.", "laterais, blusa"],
      ["Afinando vestido no corpo todo", "Do busto ao quadril em uma única linha contínua.", "laterais, vestido"],
      ["Afinando calça na coxa e perna", "Redistribuindo a folga entre lateral e entreperna.", "laterais, calça"],
      ["Alargando com as margens internas", "Quanto dá para ganhar sem inserir tecido.", "laterais, alargar"],
      ["Alargando com nesga lateral", "Inserção discreta que resolve dois números.", "laterais, alargar"],
      ["Recortes e pences a favor do ajuste", "Usando pences para afinar sem mexer na lateral.", "laterais, pences"],
      ["Ajuste lateral em peça forrada", "Trabalhando forro e tecido externo juntos.", "laterais, forro"],
      ["Cava e ombro: quando também ajustar", "Sinais de que o problema não é só a lateral.", "laterais, cava"],
      ["Laterais em jeans com pesponto", "Reproduzindo o pesponto original perfeitamente.", "laterais, jeans"],
      ["Erros comuns no ajuste lateral", "Costura em ângulo, tecido puxado e como evitar.", "laterais, correção"],
      ["Prova final e acabamento das laterais", "Overlock caseiro, vapor e conferência.", "laterais, acabamento"],
    ],
  },
  {
    slug: "ajustes-de-mangas",
    title: "Ajustes de Mangas",
    tagline: "Comprimento, largura e cava resolvidos com precisão.",
    steps: [
      "Meça a manga com o braço relaxado ao lado do corpo.",
      "Decida entre encurtar pela barra ou pela cava.",
      "Preserve o punho e os detalhes originais sempre que possível.",
      "Prove com o braço dobrado antes de arrematar.",
    ],
    lessons: [
      ["Medindo a manga corretamente", "Ombro, cotovelo e punho: os três pontos que importam.", "mangas, medidas"],
      ["Encurtar manga pela barra", "O caminho mais simples e quando ele funciona.", "mangas, comprimento"],
      ["Encurtar manga pela cava", "Preservando punho, botões e vista original.", "mangas, cava"],
      ["Manga de camisa com punho e carcela", "Desmontando e remontando sem perder o formato.", "mangas, camisa"],
      ["Manga de blazer com abertura e botões", "O ajuste mais técnico da alfaiataria.", "mangas, blazer"],
      ["Afinando manga larga", "Redistribuindo a folga sem apertar o bíceps.", "mangas, largura"],
      ["Alargando manga apertada", "Ganhando espaço na cava e no braço.", "mangas, largura"],
      ["Manga de malha e moletom", "Punho canelado, elasticidade e ponto correto.", "mangas, malha"],
      ["Manga bufante e franzida", "Controlando o volume do franzido no ajuste.", "mangas, modelagem"],
      ["Trocando manga longa por curta", "Recriando a barra e o acabamento do zero.", "mangas, transformação"],
      ["Cava alta demais ou baixa demais", "Corrigindo o desconforto de origem.", "mangas, cava"],
      ["Manga forrada de casaco", "Trabalhando tecido e forro no mesmo ajuste.", "mangas, forro"],
      ["Ombreiras: manter, reduzir ou tirar", "O impacto no caimento inteiro da peça.", "mangas, ombreiras"],
      ["Erros comuns em manga", "Torção, franzido indesejado e falta de simetria.", "mangas, correção"],
      ["Simetria entre as duas mangas", "Conferência final com a peça no manequim.", "mangas, acabamento"],
      ["Prova final das mangas", "Movimento, vapor e arremate profissional.", "mangas, acabamento"],
    ],
  },
  {
    slug: "barras-e-comprimento",
    title: "Barras e Comprimento",
    tagline: "Todos os tipos de barra, do ponto invisível ao pesponto original.",
    steps: [
      "Marque a barra com a peça vestida e o sapato certo.",
      "Confira o nivelamento em volta antes de cortar.",
      "Deixe sempre margem para futuros ajustes.",
      "Escolha o ponto de acordo com o tecido e o uso da peça.",
    ],
    lessons: [
      ["Tipos de barra e quando usar cada uma", "Simples, dupla, ponto invisível, rolotê e viés.", "barras, teoria"],
      ["Marcando a barra sem erro", "Régua de barra, giz e o método do chão.", "barras, medidas"],
      ["Barra com ponto invisível à mão", "O acabamento que não aparece pelo direito.", "barras, manual"],
      ["Barra invisível na máquina doméstica", "Usando o calcador e o ponto certo.", "barras, máquina"],
      ["Barra dupla e barra simples", "Dobra, medida e pesponto uniforme.", "barras, técnica"],
      ["Barra em tecido grosso", "Reduzindo volume nas dobras e nas costuras.", "barras, tecidos"],
      ["Barra em tecido fino e transparente", "Rolotê e barra estreita sem franzir.", "barras, tecidos"],
      ["Barra em malha sem ondular", "Agulha ballpoint, ponto elástico e estabilizador.", "barras, malha"],
      ["Barra com viés embutido", "Acabamento fino para peças sem margem.", "barras, viés"],
      ["Barra em peça com fenda", "Mantendo a fenda alinhada após encurtar.", "barras, fenda"],
      ["Barra em peça forrada", "Forro sempre mais curto e bem preso.", "barras, forro"],
      ["Barra circular e godê", "Domando o excesso de tecido na curva.", "barras, modelagem"],
      ["Alongando a barra ao máximo", "Recuperando cada centímetro escondido.", "barras, alongar"],
      ["Barra com renda ou detalhe original", "Removendo e recolocando o detalhe da peça.", "barras, detalhes"],
      ["Prova final e vapor na barra", "Marcando o vinco sem brilho no tecido.", "barras, acabamento"],
    ],
  },
  {
    slug: "encurtar-calcas",
    title: "Encurtar Calças",
    tagline: "Do jeans com barra original à alfaiataria com vinco perfeito.",
    steps: [
      "Meça com o sapato que a pessoa vai usar com a calça.",
      "Marque as duas pernas e confira se ficaram iguais.",
      "Escolha entre barra nova ou barra original mantida.",
      "Passe o vinco somente depois da prova final.",
    ],
    lessons: [
      ["Como medir o comprimento ideal", "Referências para reto, skinny, flare e pantalona.", "calça, medidas"],
      ["Encurtar calça social com barra simples", "O acabamento limpo da alfaiataria.", "calça, social"],
      ["Encurtar calça com barra dupla", "Medida da dobra e fixação invisível.", "calça, barra"],
      ["Jeans mantendo a barra original", "A técnica que preserva o desfiado e o pesponto.", "calça, jeans"],
      ["Jeans com barra nova pespontada", "Linha grossa, agulha jeans e tensão correta.", "calça, jeans"],
      ["Encurtar calça de moletom", "Punho, canaleta e cordão preservados.", "calça, moletom"],
      ["Encurtar legging e malha", "Barra elástica que acompanha o movimento.", "calça, malha"],
      ["Encurtar calça flare e pantalona", "Recalculando a boca para não perder o formato.", "calça, modelagem"],
      ["Encurtar calça com fenda ou detalhe", "Reposicionando o detalhe na nova altura.", "calça, detalhes"],
      ["Encurtar pela cintura em vez da barra", "Quando o excesso está na altura do gancho.", "calça, cintura"],
      ["Cropped a partir de calça longa", "Criando o comprimento da moda com acabamento.", "calça, transformação"],
      ["Afinando a boca da calça", "Do skinny ao reto na proporção correta.", "calça, boca"],
      ["Vinco permanente na calça social", "Vapor, pano úmido e fixação duradoura.", "calça, vinco"],
      ["Pernas com comprimento diferente", "Ajuste assimétrico feito sob medida.", "calça, assimetria"],
      ["Prova final da calça encurtada", "Conferência no espelho e arremate.", "calça, acabamento"],
    ],
  },
  {
    slug: "encurtar-vestidos-e-saias",
    title: "Encurtar Vestidos e Saias",
    tagline: "Comprimento novo com o caimento e as proporções preservadas.",
    steps: [
      "Prove com o sapato e a postura natural do cliente.",
      "Marque em volta com a fita nivelada do chão.",
      "Considere encurtar pela cintura em peças com detalhe na barra.",
      "Deixe a peça descansar no cabide antes de cortar o godê.",
    ],
    lessons: [
      ["Escolhendo o comprimento certo", "Proporção, altura e tipo de corpo.", "vestido, proporção"],
      ["Nivelando a barra em volta", "Método do chão e do manequim.", "saia, medidas"],
      ["Encurtar saia reta", "O ajuste mais direto, feito com precisão.", "saia, barra"],
      ["Encurtar saia godê e evasê", "Controlando a curva sem franzir.", "saia, godê"],
      ["Encurtar saia plissada", "Preservando o plissado até a nova barra.", "saia, plissado"],
      ["Encurtar vestido pela barra", "Quando a barra é o caminho mais simples.", "vestido, barra"],
      ["Encurtar vestido pela cintura", "Preservando renda, franja e barra original.", "vestido, cintura"],
      ["Vestido com forro e sobreposição", "Duas camadas, duas alturas, um só resultado.", "vestido, forro"],
      ["Vestido de festa com detalhes", "Pedraria, renda e tule sem estragar o desenho.", "vestido, festa"],
      ["Vestido de malha e viscose", "Tecidos que esticam e como estabilizar.", "vestido, malha"],
      ["Encurtar alças e decote", "Subindo o corpo do vestido no lugar certo.", "vestido, alças"],
      ["Midi a partir de vestido longo", "Recriando comprimento e proporção completos.", "vestido, transformação"],
      ["Saia a partir de vestido", "Aproveitando a parte de baixo em peça nova.", "saia, transformação"],
      ["Fendas: manter, subir ou fechar", "Ajustando a fenda ao novo comprimento.", "saia, fenda"],
      ["Prova final de vestidos e saias", "Movimento, giro e conferência no espelho.", "vestido, acabamento"],
    ],
  },
  {
    slug: "troca-de-ziper",
    title: "Troca de Zíper",
    tagline: "Trocar, consertar e instalar qualquer tipo de zíper.",
    steps: [
      "Identifique o tipo e o tamanho do zíper original.",
      "Descosture com cuidado, sem alargar o vão.",
      "Alinhave o zíper novo antes de costurar à máquina.",
      "Teste o fechamento várias vezes antes de arrematar.",
    ],
    lessons: [
      ["Tipos de zíper e como escolher", "Comum, invisível, destacável, de metal e de nylon.", "zíper, materiais"],
      ["Ferramentas e calcadores de zíper", "Calcador comum, de invisível e o truque do alinhavo.", "zíper, ferramentas"],
      ["Removendo o zíper sem danificar a peça", "Descosturando com segurança em qualquer tecido.", "zíper, remoção"],
      ["Zíper invisível em vestido", "A instalação que some na costura.", "zíper, vestido"],
      ["Zíper comum em saia", "Instalação embutida com acabamento limpo.", "zíper, saia"],
      ["Zíper de braguilha em calça", "O passo a passo completo da braguilha.", "zíper, calça"],
      ["Zíper de jaqueta destacável", "Trocando zíper de dois cursores.", "zíper, jaqueta"],
      ["Zíper de metal em jeans", "Pesponto, rebite e reforço nas pontas.", "zíper, jeans"],
      ["Zíper em almofada e bolsa", "Aplicações fora do vestuário.", "zíper, decoração"],
      ["Cursor solto ou quebrado", "Trocando só o cursor e economizando o zíper.", "zíper, conserto"],
      ["Zíper que abre sozinho", "Diagnóstico e correção definitiva.", "zíper, conserto"],
      ["Encurtando um zíper maior", "Criando novo batente pelo topo ou pela base.", "zíper, ajuste"],
      ["Zíper em peça forrada", "Trabalhando forro e vista juntos.", "zíper, forro"],
      ["Prova final e acabamento do zíper", "Arremate das pontas e vapor final.", "zíper, acabamento"],
    ],
  },
  {
    slug: "reforma-de-pecas",
    title: "Reforma de Peças",
    tagline: "Transformar, recuperar e modernizar roupas paradas no armário.",
    steps: [
      "Analise o tecido, as costuras e o que dá para aproveitar.",
      "Desenhe a peça nova antes de descosturar qualquer coisa.",
      "Reaproveite margens, forros e detalhes originais.",
      "Prove em cada etapa da transformação.",
    ],
    lessons: [
      ["Avaliando se a peça vale a reforma", "Tempo, custo e resultado esperado.", "reforma, diagnóstico"],
      ["Desmontando uma peça com segurança", "Descosturando para reaproveitar o tecido.", "reforma, desmonte"],
      ["Modernizando modelagem antiga", "Ombreiras, largura e comprimento atualizados.", "reforma, modelagem"],
      ["Camisa masculina virando blusa feminina", "Transformação clássica passo a passo.", "reforma, transformação"],
      ["Vestido virando conjunto", "Dois itens novos a partir de uma peça só.", "reforma, transformação"],
      ["Jeans virando saia", "Aproveitando o gancho e o pesponto original.", "reforma, jeans"],
      ["Reformando casaco e blazer", "Estrutura, forro e entretela renovados.", "reforma, alfaiataria"],
      ["Trocando forro gasto", "Copiando o forro velho como molde.", "reforma, forro"],
      ["Trocando botões e caseados", "Escolha, posição e caseado na doméstica.", "reforma, detalhes"],
      ["Consertando rasgos e furos", "Cerzido, remendo invisível e reforço.", "reforma, conserto"],
      ["Recuperando peça manchada", "Aplicações e recortes que resolvem a mancha.", "reforma, criatividade"],
      ["Peça infantil que ficou pequena", "Ganhando tamanho com recortes e barras.", "reforma, infantil"],
      ["Uniformes e peças de trabalho", "Reforço nos pontos de maior desgaste.", "reforma, uniforme"],
      ["Customização com aplicações", "Bordado, patch e recorte bem executados.", "reforma, customização"],
      ["Prova final da peça reformada", "Conferência completa antes da entrega.", "reforma, acabamento"],
    ],
  },
  {
    slug: "acabamentos-profissionais",
    title: "Acabamentos Profissionais em Máquina Doméstica",
    tagline: "Resultado de ateliê usando só a máquina que você já tem em casa.",
    steps: [
      "Teste sempre o ponto em um retalho da própria peça.",
      "Regule tensão, comprimento e pressão do calcador.",
      "Passe cada costura antes de fechar a próxima.",
      "Avalie o avesso: ele conta a qualidade do trabalho.",
    ],
    lessons: [
      ["O que separa um acabamento amador de um profissional", "Os detalhes que o cliente percebe na hora.", "acabamento, teoria"],
      ["Regulagem fina da máquina doméstica", "Tensão, pressão e comprimento de ponto.", "acabamento, máquina"],
      ["Overlock caseiro com zigue-zague", "Imitando o acabamento industrial.", "acabamento, overlock"],
      ["Costura francesa", "Avesso limpo em tecidos finos.", "acabamento, técnica"],
      ["Costura embutida e falso embutido", "Acabamento resistente para camisaria.", "acabamento, camisaria"],
      ["Viés: fazer, aplicar e arrematar", "Viés reto e viés de renda passo a passo.", "acabamento, viés"],
      ["Pesponto reto e uniforme", "Guias, calcadores e velocidade constante.", "acabamento, pesponto"],
      ["Caseado e pregar botão na doméstica", "Usando o recurso automático corretamente.", "acabamento, botões"],
      ["Entretela: escolher e aplicar", "Colante, costurável e o teste de retalho.", "acabamento, entretela"],
      ["Arremates invisíveis", "Início e fim de costura sem nó aparente.", "acabamento, arremate"],
      ["Ferro e vapor como acabamento", "Modelando o tecido, não só alisando.", "acabamento, ferro"],
      ["Costura em tecidos difíceis", "Cetim, couro sintético, tule e veludo.", "acabamento, tecidos"],
      ["Costura em malha sem ondular", "Ponto elástico, ballpoint e estabilizador.", "acabamento, malha"],
      ["Bolsos e vistas bem executados", "Cantos perfeitos e simetria.", "acabamento, detalhes"],
      ["Etiqueta e identidade do seu ateliê", "Toque final que valoriza o serviço.", "acabamento, ateliê"],
      ["Checklist final antes da entrega", "Lista de conferência para não passar nada.", "acabamento, qualidade"],
    ],
  },
  {
    slug: "bonus-como-cobrar",
    title: "Bônus: Como Cobrar pelos Seus Ajustes",
    tagline: "Precificar com segurança, fechar mais serviços e lucrar de verdade.",
    steps: [
      "Meça o tempo real gasto em cada tipo de ajuste.",
      "Some material, energia, desgaste e o seu valor por hora.",
      "Monte uma tabela e apresente com confiança.",
      "Reajuste os preços periodicamente, sem culpa.",
    ],
    lessons: [
      ["Por que costureira boa cobra pouco", "Quebrando as crenças que travam seu preço.", "negócio, mentalidade"],
      ["Calculando seu custo por hora", "A conta que sustenta toda a sua tabela.", "negócio, precificação"],
      ["Cronometrando cada tipo de ajuste", "Dados reais em vez de achismo.", "negócio, produtividade"],
      ["Custo de material e desgaste", "Linha, entretela, zíper, agulha e máquina.", "negócio, custos"],
      ["Montando sua tabela de preços", "Modelo pronto para adaptar ao seu ateliê.", "negócio, tabela"],
      ["Preço de urgência e de fim de semana", "Cobrando o justo pela pressa.", "negócio, precificação"],
      ["Orçamento presencial e pelo WhatsApp", "Roteiro que evita retrabalho e desconto.", "negócio, atendimento"],
      ["Como responder \"tá caro\"", "Argumentos que defendem seu valor.", "negócio, vendas"],
      ["Ficha de serviço e prazo", "Organização que evita conflito com o cliente.", "negócio, organização"],
      ["Sinal, pagamento e formas de receber", "Política clara desde o primeiro contato.", "negócio, financeiro"],
      ["Aumentando o preço dos clientes antigos", "Como comunicar sem perder ninguém.", "negócio, reajuste"],
      ["Fotos e portfólio dos seus ajustes", "Antes e depois que vendem sozinhos.", "negócio, marketing"],
      ["Divulgação local que funciona", "Vizinhança, indicação e redes sociais.", "negócio, marketing"],
      ["Metas e faturamento do ateliê", "Quantos serviços por mês para viver disso.", "negócio, metas"],
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

let demoVideoCursor = 0;

export const SEED_LESSONS: readonly Lesson[] = MODULE_SEEDS.flatMap((seed, moduleIndex) =>
  seed.lessons.map((lesson, lessonIndex) => ({
    id: `${seed.slug}-${lessonIndex + 1}`,
    moduleId: seed.slug,
    title: lesson[0],
    description: lesson[1],
    youtubeId: DEMO_VIDEO_IDS[demoVideoCursor++ % DEMO_VIDEO_IDS.length]!,
    duration: durationFor(moduleIndex, lessonIndex),
    order: lessonIndex + 1,
    tags: lesson[2].split(",").map((tag) => tag.trim()),
  })),
);


export const FEATURED_LESSON_ID = "ajuste-de-cintura-3";
