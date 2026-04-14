import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Image as ImageIcon, Type, Smartphone, ChevronRight, ShieldCheck, Clock, CheckCircle2, Upload, PlayCircle, Video } from 'lucide-react';

// --- DATA ---
const feedPosts = [
  {
    id: 1,
    week: 1,
    headline: "Você tem R$ 40.000 sobrando hoje?",
    art: "Imagem estática com fundo escuro e elegante. Em destaque, a headline em letras garrafais e a foto de um carro popular moderno. O visual deve transmitir seriedade e inteligência financeira.",
    caption: "Vamos falar de inteligência financeira? Muitos motoristas encaram a proteção veicular como um \"gasto a mais\" no mês. Mas a verdadeira pergunta é: se o seu carro for furtado hoje, você tem o valor dele à vista para comprar outro amanhã? Na ABV, nós blindamos o seu patrimônio por um valor que cabe no seu orçamento, através do associativismo inteligente. Não conte com a sorte, conte com a matemática. Proteja sua conquista hoje mesmo. Link na bio! 📊🚗"
  },
  {
    id: 2,
    week: 1,
    headline: "SEXTA FEIRA SANTA | Tempo de silêncio e respeito.",
    art: "Imagem estática minimalista e escurecida. Um feixe de luz iluminando a silhueta de uma cruz ao longe. Tipografia elegante e silenciosa, transmitindo paz.",
    caption: "Hoje o mundo faz silêncio. A Sexta-feira Santa é um convite para pausarmos nossas rotinas e refletirmos sobre o maior ato de amor e sacrifício já feito por nós. Que hoje seja um dia de paz, de perdão e de olhar para dentro. A ABV deseja a você e sua família um dia de profundo respeito e reflexão. 🙏🖤"
  },
  {
    id: 3,
    week: 1,
    headline: "PÁSCOA | Porque Ele vive, podemos crer no amanhã.",
    art: "Imagem estática radiante, como um nascer do sol rompendo a escuridão ou a representação do sepulcro vazio iluminado. Visual que transmita esperança e luz.",
    caption: "A verdadeira Páscoa não se resume a chocolates. Hoje celebramos o milagre da vida, a ressurreição de Jesus Cristo e a vitória do amor sobre a morte! É tempo de renovar a nossa fé, a nossa esperança e agradecer pela proteção divina que nos guia todos os dias. Que o Cristo ressuscitado abençoe o seu lar, proteja a sua família e ilumine os seus caminhos. A família ABV deseja uma Feliz e Santa Páscoa! ✝️🤍🕊️"
  },
  {
    id: 4,
    week: 2,
    headline: "Qualidade internacional certificada para proteger o seu veículo.",
    art: "Imagem estática corporativa e de confiança. O selo dourado/azul do ISO 9001 em destaque ao lado do logo da ABV, com um fundo de uma equipe trabalhando ou um veículo protegido.",
    caption: "Na ABV Proteção Veicular, seguimos e somos certificados pelo ISO 9001, um sistema de gestão que estabelece padrões internacionais de qualidade nas organizações, garantindo a otimização de processos, maior agilidade no desenvolvimento de produtos e uma produção mais ágil. Não entregue seu patrimônio a amadores. Escolha quem tem a qualidade atestada internacionalmente para cuidar do seu veículo. 🏆🚗"
  },
  {
    id: 5,
    week: 2,
    headline: "Muito mais que proteção: um ecossistema de cuidado para o seu carro.",
    art: "Imagem estática de um carro protegido por um escudo ou redoma digital. Ao redor, ícones flutuantes representando os benefícios (guincho, chaveiro, carro reserva, proteção contra roubo/colisão).",
    caption: "Proteger o seu carro com a ABV é garantir que nenhum imprevisto vai parar a sua vida. Como especialistas, oferecemos uma cobertura completa que vai muito além do básico: proteção contra roubo, furto, colisão, incêndio e fenômenos da natureza. Além disso, você conta com Assistência 24h em todo o Brasil, reboque, chaveiro, socorro mecânico e até carro reserva. Tudo isso sem burocracia, sem análise de perfil e com um valor justo. Seu patrimônio merece essa blindagem. Faça sua cotação no link da bio! 🛡️🤝"
  },
  {
    id: 6,
    week: 2,
    headline: "A \"Hora de Ouro\" do imprevisto.",
    art: "Foto estática noturna de alta qualidade mostrando um reboque da ABV chegando para socorrer um veículo em uma rodovia escura. Clima de \"resgate rápido\".",
    caption: "Especialistas em proteção chamam os primeiros minutos após uma pane de \"Hora de Ouro\". É o momento de maior vulnerabilidade do motorista. É por isso que a Assistência 24h da ABV não é apenas um \"serviço de guincho\", é uma operação de resgate. Nossa central funciona 24/7, mapeando o prestador mais próximo para garantir que você e sua família saiam da rua o mais rápido possível. Não dirija contando com a sorte. Dirija com a ABV. 🚨📞"
  },
  {
    id: 7,
    week: 3,
    headline: "A rua é imprevisível. A sua proteção não pode ser.",
    art: "Imagem estática com visão em primeira pessoa (POV) do guidão de uma moto no trânsito urbano ou um motociclista equipado. Foco na sensação de pilotagem.",
    caption: "Quem pilota sabe: a moto é agilidade, é trabalho, é paixão. Mas também é um dos alvos preferidos nas ruas. Enquanto o mercado tradicional vira as costas ou cobra fortunas para proteger motos, a ABV desenvolveu planos específicos para quem vive sobre duas rodas. Cobertura completa contra roubo, furto, colisão e rastreamento de ponta. Acelere com a mente tranquila. A gente cuida da sua moto. 🏍️💨"
  },
  {
    id: 8,
    week: 3,
    headline: "A maior liberdade é poder ir e vir sem medo.",
    art: "Imagem estática de uma estrada aberta e convidativa, vista de dentro do carro em um dia ensolarado. Clima de viagem e tranquilidade.",
    caption: "Hoje, no feriado de Tiradentes, celebramos um marco histórico de luta pela liberdade. E para nós, especialistas em proteção, liberdade no século 21 é poder pegar a estrada com a sua família ou viajar no feriado com a certeza absoluta de que o seu patrimônio está blindado. Aproveite o seu descanso com tranquilidade. A ABV está na escuta 24 horas por dia! Bom feriado! 🛣️🇧🇷"
  },
  {
    id: 9,
    week: 3,
    headline: "Quanto custa ficar 15 dias a pé?",
    art: "Imagem estática dividida: de um lado, uma pessoa calculando gastos no celular com expressão de preocupação; do outro, a chave de um carro sendo entregue em suas mãos (a solução).",
    caption: "Já parou para calcular? Se o seu carro for para a oficina hoje, quanto você gastaria de aplicativo de transporte durante 15 dias para levar as crianças na escola e ir trabalhar? A conta fica alta. É por isso que o benefício de Carro Reserva da ABV é um investimento na sua rotina. Nós garantimos a sua mobilidade enquanto o seu veículo é reparado. Inteligência é não parar a sua vida por causa de um imprevisto. 🔑🚙"
  },
  {
    id: 10,
    week: 4,
    headline: "Não é sorte. É tecnologia de ponta.",
    art: "Imagem estática de um mockup de smartphone mostrando um mapa com a localização de um carro em tempo real, com grafismos sutis que remetem a satélites e conexão.",
    caption: "Você sabe como funciona a nossa tecnologia de recuperação? 🛰️ Não dependemos de sorte. Nossos equipamentos utilizam telemetria avançada, combinando sinais de GPS e GPRS para emitir a localização exata do seu veículo em tempo real para a nossa Central de Monitoramento. Em caso de roubo ou furto, nossa equipe de pronta-resposta age em minutos. Tecnologia de ponta aplicada à sua paz de espírito. 📱🔒"
  },
  {
    id: 11,
    week: 4,
    headline: "Proteção e respaldo da maior entidade do setor.",
    art: "Imagem estática institucional. O logo da ABV ao lado do logo da AAAPV, transmitindo parceria e solidez. Fundo limpo e profissional.",
    caption: "A ABV é uma associação filiada à AAAPV (Agência de Autorregulamentação das Entidades de Autogestão de Planos de Proteção Contra Riscos Patrimoniais), a principal entidade representativa do setor associativista. A agência foi fundada em 4 de maio de 2016 e não possui fins lucrativos, mas sim o compromisso de fortalecer o movimento associativista, contribuindo para o desenvolvimento econômico, social e sustentável do país. A AAAPV atua no sentido de garantir a satisfação de seus associados, colaboradores e partes interessadas, melhorando continuamente os processos, produtos e serviços. Estar na ABV é ter a certeza de excelência. 🏛️✅"
  },
  {
    id: 12,
    week: 4,
    headline: "Nós somos o associativismo levado a sério.",
    art: "Arte estática limpa e corporativa. O logo da ABV em grande destaque no centro, ladeado por selos de conformidade, legalidade e anos de mercado. Transmitir solidez institucional.",
    caption: "O mercado de proteção veicular cresceu, e com ele, muitas promessas vazias. Mas a ABV nasceu com um propósito inegociável: Transparência e Legalidade. Somos uma associação sólida, com base jurídica firme e um compromisso real com cada associado. Não vendemos ilusão, entregamos proteção de verdade, amparada por lei e executada por especialistas. Quando você escolhe a ABV, você escolhe dormir tranquilo. Faça parte da associação que é referência. 💙🏛️"
  }
];

const mayFeedPosts = [
  {
    id: 1,
    week: 1,
    headline: "Maio Amarelo: A sua atenção salva vidas. A nossa proteção salva o seu patrimônio.",
    art: "Imagem estática com o laço do Maio Amarelo sutilmente integrado. Um carro em movimento protegido em uma via bem sinalizada. Cores da ABV mescladas com o tom da campanha.\n\n⚠️ OBS: Arte com predominância da cor AMARELA e inclusão obrigatória do selo 'Maio Amarelo'.",
    caption: "Começamos o Maio Amarelo, o mês internacional de conscientização para redução de acidentes de trânsito. Como especialistas em proteção veicular, nosso papel vai além de indenizar: queremos você protegido. No trânsito, a sua atenção e prudência salvam vidas. Mas para os imprevistos que fogem do seu controle, a ABV está aqui para blindar o seu patrimônio. Dirija com responsabilidade e conte com a gente. 💛🚗"
  },
  {
    id: 2,
    week: 1,
    headline: "FELIZ DIA DO TRABALHADOR",
    art: "Imagem estática de um trabalhador (pode ser motorista, entregador ou outro profissional) sorrindo, com um visual inspirador. Selo de 'Feliz Dia do Trabalhador'.",
    caption: "O suor do seu trabalho é o que constrói o seu futuro e o do nosso país. Hoje celebramos a força, a dedicação e a garra de cada trabalhador brasileiro. Que o seu esforço seja sempre recompensado e que suas conquistas estejam sempre bem protegidas. A ABV deseja um Feliz Dia do Trabalhador a todos que fazem o Brasil acontecer! 💼🤝"
  },
  {
    id: 3,
    week: 1,
    headline: "No trânsito, a prevenção é sua. O resgate é nosso.",
    art: "Foto estática de um reboque da ABV em ação durante o dia. Foco na agilidade e no profissionalismo do atendimento.\n\n⚠️ OBS: Arte com predominância da cor AMARELA e inclusão obrigatória do selo 'Maio Amarelo'.",
    caption: "Mesmo o motorista mais prudente está sujeito a imprevistos. Uma pane elétrica, um pneu furado ou uma bateria que descarrega do nada. É por isso que a nossa Assistência 24h funciona como uma verdadeira operação de resgate. Você faz a sua parte dirigindo com prudência, e nós fazemos a nossa garantindo que você nunca fique na mão, em qualquer lugar do Brasil. Precisou? É só chamar a ABV! 🚨📞"
  },
  {
    id: 4,
    week: 2,
    headline: "Feliz Dia das Mães! A maior especialista em proteção que existe.",
    art: "Imagem estática emocionante de uma mãe ajeitando o cinto do filho no banco de trás do carro. Clima de cuidado e amor.",
    caption: "Neste Dia das Mães, a ABV homenageia aquelas que nos ensinaram o verdadeiro significado da palavra 'proteção'. O instinto de cuidar de quem se ama é a força mais poderosa do mundo. E é inspirados nesse cuidado que trabalhamos todos os dias para proteger o veículo que transporta o que você tem de mais valioso: a sua família. Um Feliz Dia das Mães a todas as mulheres que guiam nossos caminhos! ❤️👩‍👧‍👦"
  },
  {
    id: 5,
    week: 2,
    headline: "Proteção que não julga o seu CEP ou o seu CPF.",
    art: "Imagem estática direta e empática. Um carimbo de 'Aprovado' sobre um mapa ou documento. Foco na ausência de burocracia.\n\n⚠️ OBS: Arte com predominância da cor AMARELA e inclusão obrigatória do selo 'Maio Amarelo'.",
    caption: "O mercado tradicional adora colocar barreiras. Eles cobram mais caro dependendo de onde você mora, da sua idade e até recusam a sua proteção se o seu CPF tiver alguma restrição. Na ABV, nós somos diferentes. O associativismo é inclusivo. Nós protegemos o seu veículo com um valor justo, sem análise de perfil e sem consulta ao SPC/Serasa. Porque o seu direito de estar protegido não deve ter barreiras. ✅📄"
  },
  {
    id: 6,
    week: 2,
    headline: "A rotina da sua família não pode parar.",
    art: "Imagem estática de uma pessoa recebendo a chave de um carro reserva. Expressão de alívio e tranquilidade.\n\n⚠️ OBS: Arte com predominância da cor AMARELA e inclusão obrigatória do selo 'Maio Amarelo'.",
    caption: "Bateu o carro e ele vai precisar ficar dias na oficina? Se você não tem ABV, isso significa dor de cabeça e muito gasto com transporte. Mas com o nosso benefício de Carro Reserva, a sua rotina continua intacta. Você continua levando as crianças na escola e indo para o trabalho com conforto, enquanto nós cuidamos do reparo do seu veículo. Inteligência é estar preparado. 🔑🚙"
  },
  {
    id: 7,
    week: 3,
    headline: "Você confia na sua direção. Mas e na dos outros?",
    art: "Imagem estática com visão de dentro do carro, mostrando o trânsito à frente. Foco na imprevisibilidade das ruas.\n\n⚠️ OBS: Arte com predominância da cor AMARELA e inclusão obrigatória do selo 'Maio Amarelo'.",
    caption: "No Maio Amarelo, sempre lembramos: a direção defensiva é essencial. Você pode ser o motorista mais cuidadoso do mundo, mas não tem controle sobre as ações dos outros motoristas. Uma distração de terceiros pode causar uma colisão no seu veículo. É por isso que a proteção veicular da ABV é indispensável. Nós cobrimos colisão e danos a terceiros para que o erro de outra pessoa não se transforme no seu prejuízo financeiro. 🛡️🚦"
  },
  {
    id: 8,
    week: 3,
    headline: "Indicação Premiada ABV: Concorra a uma CG 160 Start 0km!",
    art: "Imagem estática chamativa com a foto de uma moto Honda CG 160 Start 0km em destaque. Textos grandes: 'SORTEIO' e 'Indique e Concorra'.\n\n⚠️ OBS: Arte com predominância da cor AMARELA e inclusão obrigatória do selo 'Maio Amarelo'.",
    caption: "Já pensou em colocar uma CG 160 Start 0km na garagem? Na Indicação Premiada ABV, isso é possível! É muito fácil participar: a cada amigo que você indica e que fecha a proteção veicular com a gente, você ganha um cupom para concorrer a essa moto incrível. Quanto mais indicar, mais chances de ganhar! Não fique de fora dessa. Chame a gente no direct ou no link da bio para saber todas as regras e começar a indicar agora mesmo! 🏍️✨"
  },
  {
    id: 9,
    week: 3,
    headline: "Duas rodas, atenção redobrada e proteção garantida.",
    art: "Imagem estática de um motociclista equipado no trânsito. Foco na tranquilidade e na liberdade de pilotar protegido.\n\n⚠️ OBS: Arte com predominância da cor AMARELA e inclusão obrigatória do selo 'Maio Amarelo'.",
    caption: "Motociclista, o Maio Amarelo também é para você! Sabemos que a vulnerabilidade sobre duas rodas é maior, tanto para acidentes quanto para furtos e roubos. Enquanto o mercado tradicional recusa motos, a ABV abraça você. Temos planos completos com rastreamento de ponta, assistência 24h e cobertura total para que você possa rodar com a mente tranquila. Acelere com prudência, a gente cuida da sua moto! 🏍️💨"
  },
  {
    id: 10,
    week: 4,
    headline: "Monitoramento 24h: O seu carro nunca está sozinho.",
    art: "Imagem estática de um smartphone mostrando a localização do veículo em tempo real no mapa, com grafismos de tecnologia e satélite.\n\n⚠️ OBS: Arte com predominância da cor AMARELA e inclusão obrigatória do selo 'Maio Amarelo'.",
    caption: "A tecnologia é a nossa maior aliada na proteção do seu patrimônio. Com o sistema de rastreamento e telemetria da ABV, você tem o controle do seu veículo na palma da mão, 24 horas por dia. Em caso de roubo ou furto, nossa central de pronta-resposta é acionada imediatamente, aumentando drasticamente as chances de recuperação. É tecnologia de ponta trabalhando pela sua paz de espírito. 📱🛰️"
  },
  {
    id: 11,
    week: 4,
    headline: "A sua indicação vale uma CG 160 Start 0km!",
    art: "Imagem estática mostrando uma pessoa feliz segurando uma chave de moto ou um capacete, com a CG 160 Start ao fundo. Grafismos de sorteio e promoção.\n\n⚠️ OBS: Arte com predominância da cor AMARELA e inclusão obrigatória do selo 'Maio Amarelo'.",
    caption: "A campanha Indicação Premiada ABV está a todo vapor! Você confia na nossa proteção, seu amigo protege o veículo dele com a melhor associação, e você ainda concorre a uma Honda CG 160 Start novinha em folha. É vantagem para todo mundo! Já fez a sua indicação hoje? Corre que ainda dá tempo de acumular cupons. Acesse o link da bio e participe! 🍀🛵"
  },
  {
    id: 12,
    week: 4,
    headline: "Por que milhares de associados confiam na ABV?",
    art: "Arte estática institucional, limpa e corporativa. Logo da ABV em destaque com os selos ISO 9001 e AAAPV.\n\n⚠️ OBS: Arte com predominância da cor AMARELA e inclusão obrigatória do selo 'Maio Amarelo'.",
    caption: "A confiança não se compra, se constrói com transparência e legalidade. A ABV é uma associação sólida, certificada pelo ISO 9001 e filiada à AAAPV (Agência de Autorregulamentação das Entidades de Autogestão). Isso significa que nossos processos são auditados e seguimos rigorosos padrões de qualidade internacional. Quando você escolhe a ABV, você escolhe a certeza de que será amparado nos momentos mais difíceis. Faça parte da associação que é referência no Brasil. 💙🏛️"
  }
];

const abrilStories = [
  {
    id: "s1",
    title: "Feriado Sexta-feira Santa",
    dateClosed: "03/04",
    dateReturn: "06 de Abril",
    phones: ["0800 606 5979", "0800 030 6672"],
    customCopy: (
      <>
        Informamos que no dia <br/>
        <span className="font-bold text-xl">03/04</span> não haverá <br/>
        <span className="font-bold text-xl">expediente</span> em nossos <br/>
        escritórios físicos, estaremos <br/>
        em recesso.
      </>
    )
  },
  {
    id: "s2",
    title: "Feriado de Tiradentes",
    dateClosed: "21/04",
    dateReturn: "22 de Abril",
    phones: ["0800 606 5979", "0800 030 6672"],
    customCopy: (
      <>
        Informamos que no dia <br/>
        <span className="font-bold text-xl">21/04</span> não haverá <br/>
        <span className="font-bold text-xl">expediente</span> em nossos <br/>
        escritórios físicos, estaremos <br/>
        em recesso.
      </>
    )
  }
];

const mayStories = [
  {
    id: "s3",
    title: "Feriado Dia do Trabalhador",
    dateClosed: "01/05",
    dateReturn: "02 de Maio",
    phones: ["0800 606 5979", "0800 030 6672"],
    customCopy: (
      <>
        Informamos que no dia <br/>
        <span className="font-bold text-xl">01/05</span>, em virtude do <br/>
        <span className="font-bold text-xl">feriado nacional</span>, <br/>
        não haverá expediente <br/>
        em nossos escritórios.
      </>
    )
  }
];

const abrilVideoScripts = [
  {
    id: 1,
    title: "A Ilusão do 'Gasto a Mais'",
    hook: "Se o seu carro for roubado hoje, você tem o valor dele à vista na sua conta para comprar outro amanhã?",
    body: "A grande maioria dos motoristas não tem. E é exatamente por isso que tratar a proteção veicular como um 'gasto a mais' é um erro perigoso. Proteção veicular é inteligência financeira. É você pagar um valor pequeno por mês que cabe no seu bolso, para garantir que o seu patrimônio de 40, 50, 100 mil reais não vire pó da noite pro dia.",
    cta: "Não conte com a sorte, conte com a matemática. Clica no link da bio e faça uma cotação com a ABV.",
    visuals: "Cenário: Gravado dentro do carro ou em um escritório. Tom de voz: Sério, consultivo e direto."
  },
  {
    id: 2,
    title: "A Hora de Ouro (Assistência 24h)",
    hook: "Você sabe o que especialistas em proteção chamam de 'Hora de Ouro'?",
    body: "São os primeiros minutos logo depois que o seu carro dá uma pane no meio de uma rodovia escura. É o momento em que você e sua família estão mais vulneráveis. Por isso, a Assistência 24 horas da ABV não é só um 'serviço de guincho'. É uma operação de resgate. Nossa central funciona 24 horas por dia, 7 dias por semana, para mapear o socorro mais rápido e tirar você da rua.",
    cta: "Sua família não pode ficar esperando no escuro. Proteja seu carro com a ABV. Link na bio.",
    visuals: "Cenário: Caminhando em direção à câmera em um ambiente externo ou com um reboque ao fundo (se possível). Tom de voz: Urgente, protetor e confiante."
  },
  {
    id: 3,
    title: "O Custo de Ficar a Pé",
    hook: "Já parou pra calcular quanto você gastaria de aplicativo de transporte se ficasse 15 dias sem o seu carro?",
    body: "Pensa comigo: levar as crianças na escola, ir pro trabalho, ir ao mercado... a conta no final desses 15 dias fica absurda! Imprevistos acontecem, o carro pode precisar ir pra oficina depois de uma colisão. Mas a sua vida não pode parar. É por isso que na ABV nós oferecemos o benefício de Carro Reserva. O seu carro parou? A gente garante a sua mobilidade.",
    cta: "Inteligência é não parar a sua rotina. Clica no botão aqui embaixo e vem pra ABV.",
    visuals: "Cenário: Segurando a chave do carro, gesticulando. Tom de voz: Empático, provocativo (fazendo a pessoa pensar)."
  },
  {
    id: 4,
    title: "Atenção Motociclistas",
    hook: "Se você pilota moto, você sabe: o trânsito não perdoa. Mas por que o mercado tradicional te cobra uma fortuna pra proteger a sua moto?",
    body: "Enquanto muitos viram as costas para os motociclistas, a ABV entende que a sua moto é sua agilidade, seu trabalho e sua paixão. Nós desenvolvemos planos específicos para quem vive sobre duas rodas. Cobertura completa contra roubo, furto, colisão e rastreamento de ponta com um valor justo e sem burocracia.",
    cta: "Acelere com a mente tranquila. A gente cuida da sua moto. Cotação no link da bio.",
    visuals: "Cenário: Ao lado de uma moto ou segurando um capacete. Tom de voz: Dinâmico, parceiro, direto ao ponto."
  },
  {
    id: 5,
    title: "Associativismo Levado a Sério",
    hook: "O mercado de proteção veicular cresceu muito. E com ele, as promessas vazias. Como saber se a sua associação é realmente séria?",
    body: "Não acredite só em palavras, exija certificações. A ABV possui o selo ISO 9001 de qualidade internacional e é filiada à AAAPV, a maior entidade reguladora do setor no Brasil. Aqui não tem amadorismo. Nós somos o associativismo levado a sério, com base jurídica firme, transparência e estrutura real para te indenizar quando você mais precisar.",
    cta: "Não entregue seu patrimônio na mão de qualquer um. Escolha a ABV. Link na bio.",
    visuals: "Cenário: Ambiente corporativo, mostrando a estrutura da ABV ou os selos impressos/na tela. Tom de voz: Institucional, firme, passando muita credibilidade."
  }
];

const mayVideoScripts = [
  {
    id: 1,
    title: "Maio Amarelo: A Vida em Primeiro Lugar",
    hook: "Você sabia que a cor amarela no semáforo significa atenção? E no mês de maio, ela significa a vida.",
    body: "Neste Maio Amarelo, a ABV te convida a refletir. A pressa não vale a sua vida. Dirija com cuidado, respeite as leis de trânsito. E para aquilo que você não pode controlar, conte com a nossa proteção veicular. Nós cuidamos do seu patrimônio para você focar no que mais importa: chegar bem em casa.",
    cta: "Faça a sua parte no trânsito. Da proteção do seu carro, a gente cuida. Link na bio.",
    visuals: "Cenário: Rua movimentada ao fundo ou dentro do carro com cinto. Tom de voz: Conscientização, sério e protetor."
  },
  {
    id: 2,
    title: "Maio Amarelo: O Erro dos Outros",
    hook: "O maior erro no trânsito é achar que o acidente só acontece com os outros.",
    body: "O Maio Amarelo está aí para nos lembrar que a proteção no trânsito é responsabilidade de todos. Mas mesmo sendo o melhor motorista, imprevistos acontecem. É por isso que rodar sem proteção veicular hoje em dia é loucura. A ABV garante que um momento de desatenção de terceiros não acabe com o seu patrimônio.",
    cta: "Proteja seu bem mais valioso. Faça uma cotação com a ABV hoje mesmo.",
    visuals: "Cenário: Mostrando o trânsito pelo retrovisor ou segurando a chave do carro. Tom de voz: Alerta, educativo e direto."
  },
  {
    id: 3,
    title: "Dia das Mães: A Maior Especialista",
    hook: "Se tem alguém que entende de proteção, esse alguém é a sua mãe.",
    body: "Desde que você nasceu, ela faz de tudo para te manter protegido. Neste Dia das Mães, a ABV quer homenagear esse cuidado incondicional. E te fazer uma pergunta: você está cuidando do veículo que transporta a sua família com a mesma dedicação? Nossa proteção garante tranquilidade para você e para quem você ama.",
    cta: "Feliz Dia das Mães! Garanta a proteção da sua família com a ABV. Link na bio.",
    visuals: "Cenário: Ambiente familiar, aconchegante, talvez com uma foto de família ao fundo. Tom de voz: Emocionante, acolhedor e afetuoso."
  },
  {
    id: 4,
    title: "Indique e Ganhe: Especial Maio Amarelo",
    hook: "Quer ganhar benefícios exclusivos neste mês só por indicar um amigo?",
    body: "A campanha Indique e Ganhe da ABV está com tudo! Se você já sabe que a nossa proteção é a melhor e mais confiável, por que não espalhar essa tranquilidade? Indique amigos para a ABV e, a cada proteção fechada, você ganha vantagens direto na sua mensalidade. É proteção pra eles e economia pra você!",
    cta: "Chama a gente no direct ou clique no link da bio para saber as regras e começar a indicar!",
    visuals: "Cenário: Dinâmico, segurando o celular mostrando o app ou logo da ABV. Tom de voz: Animado, promocional e convidativo."
  },
  {
    id: 5,
    title: "Sorteio CG 160 Start 0km",
    hook: "E se eu te disser que a sua indicação pode virar uma moto 0km na sua garagem?",
    body: "É isso mesmo! Na Indicação Premiada da ABV, você indica um amigo para proteger o veículo com a gente e ganha um cupom para concorrer a uma Honda CG 160 Start novinha. Você ajuda um amigo a ficar protegido e ainda pode sair motorizado.",
    cta: "Não perde tempo! Clica no link da bio, veja como participar e comece a indicar agora.",
    visuals: "Cenário: Ao lado de uma moto ou segurando um capacete. Tom de voz: Muito animado, energia alta."
  },
  {
    id: 6,
    title: "Como ganhar a CG 160 Start",
    hook: "Quer saber o segredo para aumentar suas chances de ganhar uma CG 160 Start 0km?",
    body: "A regra é simples: quanto mais amigos você indicar para a ABV, mais cupons você ganha. Não tem limite de indicação! Pensa nos seus amigos da firma, no grupo da família, na galera do futebol. Todo mundo precisa de proteção veicular. Você indica, eles protegem o carro, e você acumula chances pro sorteio.",
    cta: "Manda o nosso contato pra galera e garanta seus cupons. Link na bio!",
    visuals: "Cenário: Com o celular na mão, simulando o envio de mensagens. Tom de voz: Descontraído, dando uma 'dica de ouro'."
  }
];

// --- COMPONENTS ---

const Logo = ({ customLogo, onUpload }: { customLogo: string | null, onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void }) => (
  <div className="flex items-center gap-3 relative group cursor-pointer">
    <input 
      type="file" 
      accept="image/*" 
      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
      onChange={onUpload} 
      title="Clique para alterar a logo" 
    />
    {customLogo ? (
      <img src={customLogo} alt="Logo ABV" className="h-16 object-contain" />
    ) : (
      <div className="relative flex items-center justify-center w-16 h-16">
        <div className="absolute inset-0 bg-[#1A5F7A] rounded-full opacity-20 blur-md"></div>
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
          <circle cx="30" cy="50" r="20" fill="none" stroke="#1A5F7A" strokeWidth="12" />
          <circle cx="55" cy="50" r="20" fill="none" stroke="#D34345" strokeWidth="12" />
          <path d="M 75 30 L 85 70 L 95 30" fill="none" stroke="#E89D25" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="55" cy="70" r="8" fill="#2D3748" />
        </svg>
      </div>
    )}
    {!customLogo && (
      <div className="flex flex-col border-l-2 border-gray-300 pl-3">
        <span className="text-gray-600 font-bold text-sm tracking-widest uppercase leading-tight">Proteção</span>
        <span className="text-gray-600 font-bold text-sm tracking-widest uppercase leading-tight">Veicular e</span>
        <span className="text-gray-600 font-bold text-sm tracking-widest uppercase leading-tight">Benefícios</span>
      </div>
    )}
    <div className="absolute inset-0 bg-black/60 text-white text-xs font-bold flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg pointer-events-none z-20">
      <Upload size={20} className="mb-1" />
      Trocar Logo
    </div>
  </div>
);

export default function App() {
  const [selectedMonth, setSelectedMonth] = useState('abril');
  const [activeTab, setActiveTab] = useState('week1');
  const [customLogo, setCustomLogo] = useState<string | null>(null);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCustomLogo(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const tabsAbril = [
    { id: 'week1', label: 'Semana 1', icon: Calendar },
    { id: 'week2', label: 'Semana 2', icon: Calendar },
    { id: 'week3', label: 'Semana 3', icon: Calendar },
    { id: 'week4', label: 'Semana 4', icon: Calendar },
    { id: 'stories', label: 'Stories (Comunicados)', icon: Smartphone },
    { id: 'videos', label: 'Roteiros de Vídeo', icon: Video },
  ];

  const tabsMaio = [
    { id: 'week1', label: 'Semana 1', icon: Calendar },
    { id: 'week2', label: 'Semana 2', icon: Calendar },
    { id: 'week3', label: 'Semana 3', icon: Calendar },
    { id: 'week4', label: 'Semana 4', icon: Calendar },
    { id: 'stories', label: 'Stories (Comunicados)', icon: Smartphone },
    { id: 'videos', label: 'Roteiros de Vídeo', icon: Video },
  ];

  const currentTabs = selectedMonth === 'abril' ? tabsAbril : tabsMaio;

  const renderFeedPosts = (week: number) => {
    const sourcePosts = selectedMonth === 'abril' ? feedPosts : mayFeedPosts;
    const posts = sourcePosts.filter(p => p.week === week);
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {posts.map((post, index) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            key={post.id} 
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col"
          >
            <div className="bg-[#1A5F7A] text-white px-4 py-2 text-xs font-bold tracking-wider uppercase flex justify-between items-center">
              <span>Post {post.id < 10 ? `0${post.id}` : post.id}</span>
              <span className="bg-white/20 px-2 py-1 rounded-md">Feed</span>
            </div>
            
            <div className="p-6 flex-1 flex flex-col gap-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900 leading-tight mb-2">
                  {post.headline}
                </h3>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <div className="flex items-center gap-2 mb-2 text-[#D34345] font-semibold text-sm">
                  <ImageIcon size={16} />
                  <span>Direcionamento de Arte</span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {post.art}
                </p>
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2 text-[#1A5F7A] font-semibold text-sm">
                  <Type size={16} />
                  <span>Legenda</span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {post.caption}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  };

  const renderStories = () => {
    const currentStories = selectedMonth === 'abril' ? abrilStories : mayStories;
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {currentStories.map((story, index) => (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            key={story.id}
            className="relative mx-auto w-full max-w-[360px] aspect-[9/16] bg-[#0A3D5D] rounded-3xl shadow-2xl overflow-hidden border-8 border-gray-900 flex flex-col"
          >
            {/* Story Content matching the reference */}
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
              <h2 className="text-white text-4xl font-black mb-2 tracking-tight">Comunicado</h2>
              <div className="bg-[#E89D25] text-[#0A3D5D] font-bold px-4 py-1 text-lg mb-10">
                {story.title}
              </div>

              <p className="text-white text-lg leading-snug mb-8">
                {story.customCopy}
              </p>

              <p className="text-white text-lg leading-snug mb-10">
                Retomaremos o atendimento <br/>
                presencial no dia <span className="font-bold text-xl">{story.dateReturn}</span>.
              </p>

              <div className="bg-white rounded-2xl p-4 w-full mb-8">
                <p className="text-[#0A3D5D] text-sm leading-tight">
                  Para assistência 24 horas, como reboque ou comunicado sobre furto e roubo, nossa central estará disponível nos seguintes contatos:
                </p>
              </div>

              <div className="flex flex-col gap-2 mb-10">
                {story.phones.map((phone, i) => (
                  <div key={i} className="flex items-center justify-center gap-3 text-[#E89D25] font-black text-2xl">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                      <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
                    </svg>
                    {phone}
                  </div>
                ))}
              </div>

              <div className="mt-auto opacity-50">
                <svg viewBox="0 0 100 40" className="w-24 h-10">
                  <circle cx="20" cy="20" r="15" fill="none" stroke="#fff" strokeWidth="4" />
                  <circle cx="45" cy="20" r="15" fill="none" stroke="#fff" strokeWidth="4" />
                  <path d="M 65 5 L 75 35 L 85 5" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  };

  const renderVideoScripts = () => {
    const currentVideos = selectedMonth === 'abril' ? abrilVideoScripts : mayVideoScripts;
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {currentVideos.map((script, index) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            key={script.id}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col"
          >
            <div className="bg-[#D34345] text-white px-4 py-3 text-sm font-bold tracking-wider uppercase flex items-center gap-2">
              <PlayCircle size={18} />
              <span>Vídeo {script.id}: {script.title}</span>
            </div>
            <div className="p-6 flex-1 flex flex-col gap-4">
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <div className="text-[#1A5F7A] font-bold text-xs uppercase tracking-wider mb-1">🎬 Cenário & Tom</div>
                <p className="text-sm text-gray-600 italic">{script.visuals}</p>
              </div>
              
              <div>
                <div className="text-[#D34345] font-bold text-xs uppercase tracking-wider mb-1">🪝 Gancho (0-3s)</div>
                <p className="text-base font-bold text-gray-900 leading-snug">{script.hook}</p>
              </div>
              
              <div>
                <div className="text-[#1A5F7A] font-bold text-xs uppercase tracking-wider mb-1">🗣️ Desenvolvimento</div>
                <p className="text-sm text-gray-700 leading-relaxed">{script.body}</p>
              </div>
              
              <div className="bg-[#1A5F7A]/5 rounded-xl p-4 border border-[#1A5F7A]/10 mt-auto">
                <div className="text-[#1A5F7A] font-bold text-xs uppercase tracking-wider mb-1">🎯 Chamada para Ação (CTA)</div>
                <p className="text-sm font-bold text-[#1A5F7A]">{script.cta}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Logo customLogo={customLogo} onUpload={handleLogoUpload} />
          <div className="text-right hidden sm:block">
            <h1 className="text-xl font-bold text-gray-900">Planejamento de Social Media</h1>
            <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">{selectedMonth === 'abril' ? 'Abril 2026' : 'Maio 2026'}</p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Intro Section */}
        <div className="mb-10 bg-gradient-to-r from-[#1A5F7A] to-[#2A7A9A] rounded-3xl p-8 text-white shadow-lg">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold mb-4">Estratégia do Mês</h2>
            <p className="text-blue-100 text-lg leading-relaxed mb-6">
              Posicionamento focado em <strong>Autoridade</strong>, <strong>Inteligência Financeira</strong> e <strong>Empatia</strong>. 
              Substituímos o formato panfleto por conteúdo que educa e converte, falando diretamente com a dor do motorista.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm font-medium">
                <CheckCircle2 size={18} className="text-[#E89D25]" />
                12 Posts no Feed
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm font-medium">
                <Clock size={18} className="text-[#E89D25]" />
                3 Posts por Semana
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm font-medium">
                <ShieldCheck size={18} className="text-[#E89D25]" />
                {selectedMonth === 'abril' ? '2 Comunicados (Stories)' : '1 Comunicado (Story)'}
              </div>
            </div>
          </div>
        </div>

        {/* Month Toggle */}
        <div className="flex items-center mb-6">
          <div className="flex bg-white rounded-xl p-1 shadow-sm border border-gray-200">
            <button
              onClick={() => { setSelectedMonth('abril'); setActiveTab('week1'); }}
              className={`px-8 py-2.5 rounded-lg font-bold text-sm transition-all ${selectedMonth === 'abril' ? 'bg-[#1A5F7A] text-white shadow-md' : 'text-gray-500 hover:text-gray-900'}`}
            >
              Abril
            </button>
            <button
              onClick={() => { setSelectedMonth('maio'); setActiveTab('week1'); }}
              className={`px-8 py-2.5 rounded-lg font-bold text-sm transition-all flex items-center gap-2 ${selectedMonth === 'maio' ? 'bg-[#1A5F7A] text-white shadow-md' : 'text-gray-500 hover:text-gray-900'}`}
            >
              Maio <span className="bg-[#E89D25] text-white text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider">Novo</span>
            </button>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex overflow-x-auto hide-scrollbar mb-8 bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
          {currentTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm transition-all whitespace-nowrap ${
                  isActive 
                    ? 'bg-[#1A5F7A] text-white shadow-md' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon size={18} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="min-h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab.startsWith('week') && renderFeedPosts(parseInt(activeTab.replace('week', '')))}
              {activeTab === 'stories' && renderStories()}
              {activeTab === 'videos' && renderVideoScripts()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
