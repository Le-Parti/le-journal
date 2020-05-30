import { Injectable } from '@angular/core';

export interface IArticlesServiceItemInfoComment {
  author?: string
  isAuthorDeleted?: boolean
  content: string
  /**
   * Tells the number of people who reported this message to the State.
   */
  report?: number
  replies?: IArticlesServiceItemInfoComment[]
}
export interface IArticlesServiceItemInfo {
  id: number
  content: string
  title: string
  htmlTitle?: string
  comments?: IArticlesServiceItemInfoComment[]
}

function transformTextToHTML(text: string, paragraph = true, link = true) {
  let result = text
    .trim()
    .replace(/^ +/img, '')
    .replace(/Etat/mg, 'État')
    .replace(/([^ \n])"/img, '$1&nbsp;»')
    .replace(/"([^ \n])/img, '«&nbsp;$1')
    .replace(/ ([!?;:])/img, '&nbsp;$1')
    .replace(/@(.+)@((?:.|\n)+)@/img, '<div class="citation"><div class="header">$1</div>$2</div>')
    .replace(/@((?:.|\n)+)@/img, '<div class="citation">$1</div>');
    

  if(paragraph) {
    result = result
      .replace(/^\s*#\s+(.+)$/img, '</p><h2>$1</h2><p>')
      .replace(/\n\n/img, '</p><p>')
  }

  if(link) {
    result = result
      .replace(/CapSafe/img, '<a class="capsafe special" href="/article/7">CapSafe</a>')
      .replace(/CovidSafeApp/img, `<a class="covidsafeapp special" href="/article/28-application-de-suivi-covidsafeapp">CovidSafeApp</a>`)
  } else {
    result = result
      .replace(/CapSafe/img, '<span class="capsafe special">CapSafe</span>')
      .replace(/CovidSafeApp/img, '<span class="covidsafeapp special">CovidSafeApp</span>')
  }

  if(paragraph) {
    result = `<p>${result}</p>`;
  }

  return result;
}

export class ArticlesServiceItemComment {
  public constructor(info: IArticlesServiceItemInfoComment) {
    this.info = info;
  }

  public info: IArticlesServiceItemInfoComment;

  public get content() {
    return this.info.content;
  }

  public get contentHtml() {
    return transformTextToHTML(this.content)
  }

  public get banned() {
    return this.info.isAuthorDeleted;
  }

  public get author() {
    return this.banned && 'Compte banni' || this.info.author || 'Anonyme';
  }

  public get replies() {
    return (this.info.replies || [])
      .map(comment => new ArticlesServiceItemComment(comment))
  }
}

export class ArticlesServiceItem {
  public constructor(info: IArticlesServiceItemInfo) {
    this.info = info;
  }

  public info: IArticlesServiceItemInfo;

  public get id() {
    return this.info.id;
  }

  public get routeEntry() {
    return {
      path: `/article/${this.id}-${this.titleUrl}`
    }
  }

  public date: string;
  public dateNum: number;

  public get content() {
    return this.info.content;
  }

  public get contentHtml() {
    return transformTextToHTML(this.content)
  }

  public get titleUrl() {
    return this.info.title
      .replace(/[\s\-'".:,;/?!)(=+&]+/img, '-')
      .toLocaleLowerCase();
  }

  public getDescription(nbChars: number) {
    const content = this.content
      .trim()
      .replace(/^ +/img, '')
      .replace(/\n\n/img, ':::RET:::')
      .replace(/\n/img, ' ')
      .replace(/:::RET:::/img, '\n')

    if(content.length < nbChars) {
      return content;
    } else {
      const trunc = content.substr(0, nbChars - 3);
      const spaceIndex = trunc.lastIndexOf(' ');

      return trunc.substr(0, spaceIndex).trim() + '...';
    }
  }

  public get titlePage() {
    return this.info.title;
  }

  public get canonicalPath() {
    return this.routeEntry.path || '/';
  }
  public get canonicalUrl() {
    const base = window.location.toString().split(/\/+/img);
    return `${base[0]}//${base[1]}${this.canonicalPath}`;
  }

  public get titleHtml() {
    return transformTextToHTML(this.info.title, false, false);
  }

  public get comments() {
    return (this.info.comments || [])
      .map(comment => new ArticlesServiceItemComment(comment));
  }
}

const profCapitalistSmart = `Professeur en économie - Londrik`;
const leJournal = `La rédaction - Le Journal`;

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  constructor() { }

  public getArticleById(id: number) {
    this.init();

    return this.articles.find(article => article.info.id === id);
  }

  protected readonly articles: ArticlesServiceItem[] = [
    new ArticlesServiceItem({
      id: 2,
      title: `Création de l'état d'urgence économique`,
      content: `L'économie du pays a été grandement touchée par le COVID-19.
      Il est urgent que la situation revienne à un état acceptable, mais, malheureusement, de nombreux mécanismes de la république ne permettent pas
      au gouvernement d'être réactifs, laissant probablement de nombreux citoyens sur le bord de la route.
      Le peuple souffre et le gouvernement vient à son aide.

      C'est pour cette raison que le gouvernement vient de créer un nouvel état de gouvernance : l'état d'urgence économique.
      Ce statut permet de s'affranchir de nombreuses lourdeurs administratives et favorise l'utilisation de procédures rapides et directives.
      Ainsi, le 49-3 se voit modifié pour ne plus autoriser de motion de censure, permettant ainsi au gouvernement
      de prendre des décisions sans être retissant à utiliser les démarches rapides.

      Le peuple a élu ce gouvernement, et la démocratie ne doit pas être bloquée par la lenteur du système politique actuel.`,
      comments: [{
        content: `Pour rappel, la motion de censure du 49-3, si elle est votée, impose la démission du gouvernement.
        Personne ne voterait un truc pareil sachant que la présence du gouvernement au pouvoir est le résultat d'une élection.
        Sauf que cette motion de censure est le seul mécanisme pour interdire le passage en force d'une loi inacceptable, mais c'est aussi
        une menace faite pour éviter que le gouvernement n'abuse de cette procédure.

        Du coup, nombre de personnes à l'Assemblée nationale n'osent s'opposer aux lois passées avec le 49-3 seulement parce que cela aurait des
        conséquences bien plus vastes que simplement refuser le forcing. C'est un véritable problème dans le fonctionnement de la république.`
      }]
    }),
    new ArticlesServiceItem({
      id: 3,
      title: `Relance économique après le confinement`,
      content: `Il est nécessaire de relancer l'économie après ce confinement.
      Le gouvernement a décidé de prendre des mesures exceptionnelles pour une situation exceptionnelle.
      
      Le code du travail vient donc d'être allégé, permettant à l'employeur de licencier un employé sans avoir besoin de préciser son motif et sans avoir à fournir une
      prime de licenciement. Cela va permettre de faciliter l'embauche et de fluidifier la reprise économique.
      
      Les réglementations sur l'écologie ont elles aussi été revues pour, finalement, être toutes les supprimer.
      
      @Citation du Premier ministre@Le peuple passe avant tout, et si le peuple
      meurt de faim à cause du manque d'échanges économiques, il n'en aura rien à faire que des insectes porteurs de nombreuses maladies aient été sauvés au prix de
      nombreuses vies humaines.@`,
      comments: [{
        isAuthorDeleted: true,
        content: `Super le Premier ministre ! Si le système économique s'effondre et provoque des morts, ce n'est pas parce qu'il est tout simplement nul, non,
        c'est parce qu'on aura voulu l'empêcher de détruire tout ce qui nous est cher. Super mentalité !`
      }]
    }),
    new ArticlesServiceItem({
      id: 4,
      title: `Les aides bloquent le pays`,
      content: `Toute personne intelligente comprendra sans difficulté que si nous donnons des aides, alors les assistés n'auront aucune raison de participer à
      l'effort de la relance économique. Il est donc indispensable que le pays encourage la recherche d'emploi en réformant drastiquement les aides apportées.
      Dans le passé, le pays pouvait se permettre de tels cadeaux dignes du communisme, doctrine qui rappelle les heures les plus sombres de notre histoire, mais cela n'est plus
      soutenable financièrement par la population.
      
      Le gouvernement a donc décidé de supprimer toutes les aides dans le but de financer la relance.`,
      comments: [{
        isAuthorDeleted: true,
        content: `On fait des cadeaux fiscaux à ceux qui peuvent se permettre de payer plus et on supprime les aides de ceux qui en ont besoin.`,
        replies: [{
          content: `Qu'ils se bougent pour ne plus en avoir besoin. C'est pas compliqué, il y a plein de travail, il suffit de traverser la rue.`
        }, {
          isAuthorDeleted: true,
          content: `C'est sûr qu'il y a du travail, payé à coup de lance-pierre pour finir avec le corps en compote et une retraite même pas suffisante pour survivre.
          Autant mourir tout de suite si c'est pour être obligé de vivre comme les esclaves du 18ᵉ siècle.`
        }]
      }, {
        author: profCapitalistSmart,
        content: `Il suffit de regarder ce que ça donne les pays sans aides sociales : de nombreux enfants en état de malnutrition, une population SDF qui explose tous les records,
        une précarité qui favorise le marché noir (objets moins chers car volés), des souffrances sociales qui provoquent la violence (gangs, vols, meurtres, etc.),
        et surtout, moins de gens pour consommer vu que moins de gens ont assez pour vivre.
        
        Conclusion : ça n'aidera personne, même pas le capitalisme, et ça ne fera plaisir qu'à ceux qui n'ont jamais eu besoin d'aide, et donc,
        à ceux qui ne savent pas ce que c'est que d'être dans le besoin, bref, ceux qui sont déconnectés de la réalité du peuple.`,
        replies: [{
          content: `Intéressant. Vous voulez dire que le capitalisme ne peut fonctionner à son plein régime sans aides de l'Etat ?`
        }, {
          author: profCapitalistSmart,
          content: `Oui, c'est ce qu'on déduit si on regarde les différentes sociétés capitalistes du monde. Le pays qui donne le plus d'aides est aussi la 6e puissance
          économique mondiale et la seconde d'Europe : la France. De plus, le chômage de ce pays est pratiquement le même que la moyenne mondiale et il a été montré que sa
          stabilité (capacité à résister aux crises) est exceptionnelle grâce à ses aides.
          
          Autant dire que les aides sont une véritable bénédiction pour le capitalisme, et que supprimer les nôtres va rendre le pays particulièrement instable à la moindre
          crise économique (et il va y en avoir de nombreuses) tout en réduisant l'esprit consumériste la population.`
        }, {
          content: `Même le capitalisme, basé sur une doctrine purement égoïste, a besoin de l'entraide pour être optimal. C'est une belle leçon je trouve.`
        }]
      }]
    }),
    new ArticlesServiceItem({
      id: 5,
      title: `Relancer l'économie par la défiscalisation`,
      content: `Quelqu'un de riche, c'est-à-dire une personne qui possède beaucoup d'argent, est un individu qui a obtenu sa fortune en cherchant à gagner toujours plus.
      Ainsi, un riche cherche à devenir toujours plus riche, et ça, le gouvernement l'a bien compris. Ainsi, pour favoriser la relance économique, les personnes touchant plus
      de 100.000 € brute par an n'auront plus aucun impôt à payer, ni aucune cotisation ; tout sera pris en charge par l'Etat.
      
      Favoriser les gains de certains permettra de réduire leur frilosité à gagner toujours plus, les encourageant à investir plus et à créer de nouvelles entreprises.
      Le ruissellement qui en découlera sera bénéfique pour tout le pays, et surtout pour les plus pauvres.

      Si vous n'êtes pas riche, et que, par conséquent, vous participez de façon moins bénéfique qu'eux au système économique, vous pourrez toujours être utile à la cause commune
      en payant des impôts et en travaillant comme il se doit.`,
      comments: [{
        isAuthorDeleted: true,
        content: `Les actionnaires de mon entreprise ne font qu'injecter un peu d'argent, une fois, puis ils ne vont faire qu'attendre et récupérer la quasi-totalité des
        revenus que moi, simple employé, arrive à produire en bossant toute la journée, 5 jours sur 7, au prix de la santé de mon dos et de mes articulations.
        Je suis récompensé avec un salaire minable qui est en plus ponctionné par l'Etat alors que mon entreprise n'en paie plus, ni même les actionnaires maintenant.
        
        Nous, les employés, nous n'aurons que les miettes alors que nous faisons absolument tout le travail, et tout est fait pour que nous ne rejoignions pas
        le club des riches, des puissants, comme pour nous maintenir la tête hors de l'eau juste assez pour survivre et servir de radeau aux bourgeois.`,
        replies: [{
          content: `Devenez riche au lieu de vous plaindre.`
        }, {
          isAuthorDeleted: true,
          content: `Facile à dire. La plupart des riches sont nés riches ou se sont mariés avec des riches. Et pour tout nouveau riche, il y a eu des millions de personnes
          qui ont eux aussi essayé avant de tout perdre.
          
          De plus, tout le monde n'aspire pas à écraser les autres. Je rappelle que si quelqu'un a beaucoup d'argent, c'est que beaucoup n'en ont pas, donc pour qu'une personne
          devienne riche, il faut que beaucoup deviennent pauvres.`
        }]
      }]
    }),
    new ArticlesServiceItem({
      id: 6,
      title: `Prime de réussite`,
      content: `Comment motiver le peuple à travailler mieux et plus longtemps ? Le gouvernement a trouvé une façon simple et éthique d'arriver à ce résultat en
      donnant une prime de réussite plutôt conséquente à ceux qui arriveront à gagner une certaine somme d'argent.
      
      Ainsi, si vous travaillez et que votre activité fonctionne bien, le salaire que vous vous versez, ou que votre employeur vous donne, peut vous permettre d'obtenir
      cette prime. Au-dessus de 60.000 € de salaire annuel, votre prime s'élèvera à 100.000 €.
      
      Cela motivera les moins rapides d'entre nous à travailler mieux et plus longtemps, pour gagner tout simplement plus.
      
      Comme si cela ne suffisait pas, cette prime va permettre à ceux qui atteignent le pallier de la prime de réussite de se payer moins pour récompenser davantage
      les salariés investis dans leur activité.
      
      Gagnez plus pour gagner encore plus, tout simplement.`,
      comments: [{
        isAuthorDeleted: true,
        content: `Mon patron s'est augmenté de 100% pour toucher sa prime de réussite. Pour faire ça, il a été obligé de réduire nos salaires en prétendant
        que s'il ne le faisait pas, l'entreprise allait faire faillite. On n'est pas dupes, nous !`
      }, {
        content: `Enfin un gouvernement qui récompense le travail et la réussite !`
      }, {
        isAuthorDeleted: true,
        content: `Les cadres de mon entreprise touchent la prime, et ils ont tout de même été augmentés, mais toujours
        aucune retombée économique sur les salaires plus bas, c'est-à-dire ceux qui gagnent un salaire décent et qui bûchent le plus pour la réussite de l'entreprise.`,
        replies: [{
          content: `Si vous étiez vraiment utile à l'entreprise, vous seriez payé en conséquence.`
        }, {
          isAuthorDeleted: true,
          content: `C'est un paralogisme, ça. Ce n'est pas votre utilité qui détermine votre salaire mais votre ancienneté et votre poste. Vous pouvez être dans l'entreprise
          depuis cinquante ans, si vous n'êtes pas cadre, vous n'atteindrez jamais le salaire de la prime. Et même en travaillant comme un dingue, vous risquez de ne jamais
          être assez augmenté pour recevoir autant d'argent.
          
          Dites-vous que si vous gagnez autant, c'est qu'à côté, il y a quelqu'un qui est payé à coup de lance-pierre pour un travail tout aussi utile.
          
          Et puis, qui voudrait travailler pour un salaire médiocre tout en faisant un travail inutile, et qui, souvent, bousillera vos articulations tout en étant
          au contact de produits chimiques ? Psychologiquement, c'est insoutenable. On comprend pourquoi
          le gouvernement réforme les aides, c'est pour obliger les gens à faire ce que personne ne souhaite faire. C'est ce qu'on appelle de l'esclavage.`
        }]
      }]
    }),
    new ArticlesServiceItem({
      id: 7,
      title: `L'anonymat contre le peuple ; loi CapSafe`,
      content: `Certaines personnes se cachent derrière l'anonymat d'internet pour proférer des accusations et des propos anti-capitalistes à l'encontre d'entreprises ou
      de notre société. Cela nuit grandement au système économique et doit s'arrêter immédiatement.
      
      Récemment, un employé a même critiqué l'entreprise dans laquelle il se trouvait ! Comment une personne peut-elle mordre la main de celui qui le nourrit ?
      Il est nécessaire que la partie ingrate de la population apprenne à respecter ceux qui, par leur réussite, permettent un ruissellement vers leurs
      employés, leur permettant d'être payés, et donc de se nourrir et de se loger.
      
      C'est dans le but de corriger ces injustices et ces comportements irresponsables que le gouvernement a créé une loi, la loi CapSafe, pour obliger chaque
      individu, même mineur, à fournir la liste de ses comptes sur internet à l'Etat ainsi qu'à ses employeurs. Ceux-ci pourront, ensuite, porter
      plainte et obtenir réparation en cas de propos jugés déplacés.
      
      La liberté de chacun s'arrête là où celle des autres commence.`,
      comments: [{
        isAuthorDeleted: true,
        content: `"la main de celui qui le nourrit"... On croirait qu'on est payés par bonté, et pas parce qu'on travaille (on dort 1/3 de notre vie et on travaille un autre tiers,
        donc c'est loin d'être un petit sacrifice). Je rappelle tout de même que si
        un employeur réussit, c'est parce que ses employés bossent ! Il ne serait rien et ne réussirait rien si nous n'avions pas décidé de nous lever
        chaque matin pour aller faire son job de merde. L'ingratitude n'est clairement pas là où certains semblent l'imaginer.`
      }, {
        content: `Du coup, on n'a pas le droit de critiquer les autres entreprises aussi ou seulement celle dans laquelle nous sommes ?`,
        replies: [{
          isAuthorDeleted: true,
          content: `Une question qui suffit à révéler l'état de la liberté d'expression dans notre pays !`
        }, {
          author: leJournal,
          content: `Non. L'objectif est de protéger toutes les entreprises de tous les troube-fêtes. Donc même si vous n'êtes pas employé par l'entreprise, vous lui devez
          allégeance.`
        }]
      }, {
        isAuthorDeleted: true,
        content: `L'anonymat qui nuit à la lute anti-terroriste, puis on nous dit que ça nuit à la démocratie, maintenant c'est un frein à l'économie.
        Moi, je ne vois que des excuses d'un fascisme lattant, si ce n'est déjà présent.`
      }]
    }),
    new ArticlesServiceItem({
      id: 8,
      title: `Première condamnation pour crime contre le capitalisme`,
      content: `La première condamnation a été prononcée contre un habitant du pays, suivie par de nombreuses autres.
      Il propageait des messages anti-capitalistes et faisait la propagande de systèmes déviants, tel que le socialisme.
      
      Comme tout le monde le sait, le capitalisme est la seule solution possible dans un monde comme le nôtre. Le nier et agir contre celui-ci sont des
      comportements dangereux contre la nation toute entière. Ces personnes qui refusent de voir la vérité en face ne sont que des communistes qui cherchent à rétablir les goulags.
      Le gouvernement ne laissera pas ces individus sévir en toute impunité, c'est ainsi que la première condamnation est tombée, suivie par des milliers d'autres,
      conformément à la loi CapSafe.
      
      Ces gens sont des ennemis du peuple, des terroristes de la pensée. Protégeons nos libertés.`,
      comments: [{
        isAuthorDeleted: true,
        content: `Je viens de recevoir une condamnation de 30.000 € en dommage et intérêt, sans avoir été convoqué dans un tribunal pour me défendre,
        et ce, seulement parce que mon fils de 8 ans
        a dit, sur Twitter : "Le poisson ça rend bête". L'entreprise qui a porté plainte est anonyme, elle, et nous rackette comme ça, au calme, avec l'approbation
        de la justice. Il est facile d'en déduire l'entreprise qui se cache derrière ça.
        
        On va où comme ça ?`,
        replies: [{
          isAuthorDeleted: true,
          content: `Ce que vous dites me rappelle ce qui se passe sur YouTube en ce moment même avec les entreprises qui volent l'intégralité des revenues d'une vidéo
          si celle-ci contient un extrait, même microscopique, d'une œuvre dont ils détiennent les droits.`
        }]
      }]
    }),
    /*new ArticlesServiceItem({
      id: 10,
      title: `Création de la taxe rétrocédée`,
      contentHtml: `La taxe rétrocédée est un concept très simple : une taxe peut-être mise sur un produit, augmentant considérable son prix, mais elle n'est pas déduite du compte de
      l'acheteur. Cela permet de réduire l'accès à certains produits dans le but de motiver le désir de richesse.
      
      En effet, si vous souhaitez acheter un produit qui coute 10.000 €, mais que vous ne possédez que 12.000 € sur votre compte, vous ne pourrez y accéder.
      
      Gagnez plus pour acheter plus.`
    }),*/
    new ArticlesServiceItem({
      id: 11,
      title: `Service Travailleur`,
      content: `Avec l'aide d'un groupe d'économistes, le gouvernement a créé un nouveau service révolutionnaire : le Service Travailleur.
      
      Toute personne en âge de travailler, qui a quitté les cours, mais qui est sans emploi, sera automatiquement affilié au Service Travailleur.
      Ce service donnera régulièrement des missions aux citoyens pour participer à l'effort économique du pays.
      
      Si vous êtes un membre d'une entreprise et que vous souhaitez avoir recours au Service Travailleur, il vous suffit de contacter le service et 
      de l'informer du poste, de la période et du salaire pour que celui-ci vous envoie un travailleur désigné.`,
      comments: [{
        isAuthorDeleted: true,
        content: `J'étais mère au foyer, et le Service Travailleur m'a obligée à rejoindre une entreprise à deux heures de trajet de chez moi pour un salaire de 1000 € par mois,
        à 39 h. Vu que mon trajet coûte plus que ce que l'entreprise me donne, après impôts, je me retrouve à payer pour travailler ! En plus, c'est dans un job qui ne me plaît
        pas du tout ! Et comme si ça ne suffisait pas, je suis obligée de payer une nounou pour s'occuper de mes enfants et, du coup, je ne les vois pas grandir.`
      }, {
        content: `Le gouvernement a cerné les réels besoins des entreprises. Certains se plaignaient que les immigrés prenaient leur travail, maintenant c'est terminé.
        Tout le monde y gagne. Les entreprises qui ont besoin de main d'œuvre pas chère l'obtient très rapidement et les gens qui ne travaillent pas se font un peu d'argent.
        C'est donnant-donnant, et c'est en ça que le capitalisme est supérieur à tout autre système.`
      }]
    }),
    new ArticlesServiceItem({
      id: 12,
      title: `Privatiser pour améliorer`,
      content: `Depuis le confinement, le pays a pris du retard sur l'éducation et les hôpitaux sont surchargés.
      Il serait stupide, voir immorale, de ne pas rendre ces deux activités, en plein boom, lucratives pour supporter l'effort économique.
      C'est pour cela que le gouvernement a annoncé, ce matin, la privatisation de toutes les écoles et de tous les centres hospitaliers.
      Ainsi, les entrepreneurs pourront saisir l'opportunité d'accroître les revenus de ces services et d'en faire profiter la nation toute entière.`,
      comments: [{
        isAuthorDeleted: true,
        content: `Ma grand-mère était à l'hôpital, atteinte du COVID-19. Elle a été expulsée par le nouveau directeur... un multimillionnaire, juste parce qu'elle ne pouvait pas payer
        les nouveaux tarifs en hausse. Il a aussi annoncé qu'ils allaient arrêter certains soins, jugés "pas assez rentables".
        Si on n'est pas un bourgeois, on n'a plus accès à rien.`
      }, {
        isAuthorDeleted: true,
        content: `Mon enfant ne peut plus aller à l'école... Pourquoi ? Parce que je n'ai pas assez d'argent pour payer la moins chère des écoles à 2000 € par an.
        C'est une honte !
        Je suis obligée de m'endetter... On voit que les banques ont toujours des profits à se faire sur la misère des pauvres... misère organisée toujours plus
        durement par les gouvernements qui se succèdent.`
      }]
    }),
    new ArticlesServiceItem({
      id: 12.1,
      title: `Le gouvernement de la justice sociale`,
      content: `Les privilèges sont un véritable problème dans ce pays. D'après les sondages récents, 98% de la population considère que les privilégies sont une réalité,
      et tout autant souhaiteraient voir ces avantages disparaîtres. Le gouvernement a entendu cet appel et y a répondu avec toute l'efficacité qui le caractérise.

      Ainsi, il a été annoncé la suppression du statut de fonctionnaire, même pour ceux qui sont encore en poste.
      Les régimes spéciaux seront eux aussi réformés pour disparaitre.`,
      comments: [{
        isAuthorDeleted: true,
        content: `J'étais enseignant dans le public. On nous disait : "vous partez plus tôt à la retraite, en contrepartie, votre salaire sera figé jusqu'à la fin".
        C'est pas un privilège, c'est un compromis. En plus, on est obligés de travailler plus longtemps pour pouvoir gagner assez à la retraite pour pouvoir en vivre.
        Il faut arrêter de penser que les régimes spéciaux sont des avantages. Du coup, on se retrouve avec un salaire merdique sans aucune contrepartie.
        
        Bonne chance maintenant pour trouver de nouveaux enseignants, déjà que personne ne voulait venir avant ça !`
      }, {
        isAuthorDeleted: true,
        content: `Je suis cheminot et je n'ai pas arrêté d'entendre parler de la prime de charbon. Oui, la prime de charbon est stupide étant donné qu'il n'y a plus
        de charbon, mais vous savez quoi ? Il n'y a pas eu de prime de charbon qui ait été versée à qui que ce soit depuis des dizaines d'années, alors, arrêtez de parler
        de choses qui ne sont plus d'actualité. Et c'est comme ça pour beaucoup d'autres choses, tout comme le départ à la retraite. Vous êtes très mal informés !`
      }, {
        isAuthorDeleted: true,
        content: `Je suis chauffeur à la capitale. C'est épuisant, et il n'y a pas de week-end ou de jours fériés, car il faut que les transports fonctionnent
        toute l'année. La plupart des privilèges qu'on nous jette à la figure ne sont pas appliqués ou tout simplement réformés depuis longtemps.
        Ils ne trouvent plus personne à embaucher, car, à force de nous traiter de faignants et de privilégiés alors qu'on en bave, personne ne reste longtemps
        sans avoir une obligation (dette à rembourser ou un âge avancé).

        Moi aussi je pensais que j'allais être bien loti lorsque j'ai postulé, et j'ai très vite déchanté. Malheureusement, j'ai un crédit à rembourser et une
        famille à loger et à nourrir, donc je suis obligé de rester, mais pour rien au monde je souhaiterais voir mes enfants me rejoindre...
        et on veut rendre mon poste encore moins vivable... On se croirait dans ces entreprises qui cherchent à ce que vous vous suicidiez, sauf que là, la population
        est complice avec leur haine des services publics.
        
        Bientôt, vous n'aurez plus personne pour conduire vos bus, métro, tramway, etc. Et vous l'aurez bien cherché.`
      }, {
        content: `Je rajouterai à cet article que l'impôt sur la fortune, qui a été supprimé bien avant cette réforme, faisait partie des discriminations du pays, tout comme la
        taxe carbon qui faisait culpabiliser ceux qui avaient les moyens de se payer de gros véhicules. On peut dire que l'égalité est au cœur même des préoccupations du
        gouvernement, et ça, ça fait plaisir à voir.`
      }]
    }),
    new ArticlesServiceItem({
      id: 13,
      title: `Appel d'offre au placard`,
      content: `Un appel d'offre est une procédure qui prend du temps et nécessite beaucoup de gestion, et donc, de l'argent.
      Dans le but de favoriser la fluidité des échanges économiques, le gouvernement a décidé de supprimer la nécessite de faire des appels d'offre, réduisant ainsi
      le temps nécessaire pour trouver un maitre d'œuvre et l'investissement pécunier dans cette recherche.`
    }),
    new ArticlesServiceItem({
      id: 14,
      title: `Prime à l'optimisation`,
      content: `Le gouvernement alloue une prime à l'optimisation aux entreprises qui peuvent prouver, chaque année, qu'elles opèrent une optimisation dans leur
      fonctionnement pour supporter l'effort économique de la relance.
      Cette prime a pour but de motiver les entreprises peu soucieuses du contexte de crise de faire des démarches en faveur du capitalisme, et tout particulièrement
      du rendement opérationnel. Licencier les employés peu performants, relocaliser dans les lieux où la main d'œuvre est moins onéreuse, faire appel au Service
      Travailleur autant que possible... bref, faire en sorte que l'entreprise soit la plus rentable possible pour fournir un maximum de chiffre d'affaires, et par
      conséquent, augmenter l'efficacité de la production de biens et de services dans le pays.
      
      Pour que la démarche soit complète, le gouvernement a fondé un service de conseil pour les patrons.`,
      comments: [{
        content: `Je travaillais dans une usine où on produisait des masques à la chaîne. J'ai fabriqué le mois dernier 50 masques en plus que tous les autres.
        Le chef a alors augmenté mes objectifs en disant que si je peux faire autant, alors je dois pouvoir continuer comme ça. Évidemment, c'est pas le genre d'exploit
        que l'on peut faire tous les jours, à la demande. J'ai été viré... c'était les recommandations du service de conseil de l'Etat...
        et mon chef était désolé pour moi. Il a dit que s'ils ne faisaient pas
        ce que le service leur demandait, ils allaient perdre la prime. Cette ingérence me dégoûte... Le pire, dans tout ça, c'est que le Service Travailleur m'a
        assigné dans la même entreprise, au même poste, avec des objectifs toujours aussi élevés, pour un salaire qui m'oblige à aller me nourrir auprès des associations.`
      }]
    }),
    new ArticlesServiceItem({
      id: 15,
      title: `Suppression des restrictions économiques`,
      content: `Lors d'une crise économique, il faut savoir repérer les pistes qui permettront de remonter la pente. C'est ce qu'a fait le gouvernement en
      retirant les restrictions d'âge pour l'achat d'alcool, les contraintes et les taxes sur le tabac et les interdictions de vendre de la drogues, des
      médicaments et des armes. Les publicités sont elles aussi débridées pour favoriser la consommation.

      Pour pouvoir vendre les produits qui étaient jusqu'alors illégaux, il faudra disposer d'une entreprise, donc d'un numéro SIRET, et rien de plus.
      
      Évidemment, le gouvernement est conscient des dangers liés aux armes, et c'est pour cela que leur vente est réglementée. Pour pouvoir s'en procurer, il
      faut être un citoyen responsable, c'est-à-dire qu'il faut gagner au minimum 130.000 € par an et posséder un casier judiciaire vierge à l'égard du capitalisme.
      Les bonnes actions comme la création d'une entreprise qui fonctionne bien permettront à certaines personnes qui se seraient égarés durant leur
      jeunesse d'obtenir le pardon des autorités.

      L'objectif est ici de ramener à la surface des échanges économiques qui étaient cachés, et donc, difficiles à quantifier, pour pouvoir enfin les ajouter
      au PIB du pays. Les nouveaux commerçants pourront, bien entendu, bénéficier de la prime à l'optimisation et du Service Travailleur.`
    }),
    new ArticlesServiceItem({
      id: 16,
      title: `Privatisation de la justice`,
      content: `La justice représente une grande partie de l'activité du pays.
      Il serait indécent, et même criminel, de se priver d'un tel secteur pour la relance économique.
      L'économie sait mieux que personne commence se gérer, ainsi, il faut laisser la justice aux mains du capital pour lui donner une nouvelle jeunesse.

      De plus, la privatisation obligera les personnes qui veulent porter plainte à devoir payer le tribunal,
      ce qui évitera tous les abus actuels envers les patrons de nos entreprises, principalement aux Prud'hommes.`,
      comments: [{
        isAuthorDeleted: true,
        content: `Mon patron refusait de payer mes congés payés. J'ai été obligé de payer 3000 € pour avoir accès à un juge, et il a demandé que je paye une compensation
        pour le préjudice moral que j'aurais soi-disant fait subir à mon patron en le faisant convoquer au tribunal. Je suspecte le juge d'avoir été acheté,
        je ne vois pas d'autre explication, surtout maintenant que ce sont des entrepreneurs qui jouent ce rôle.`,
        report: 2758,
        replies: [{
          content: `Si vous avez été condamné, c'est que vous le méritiez. Remettez-vous en cause au lieu d'incriminer les autres.`
        }]
      }, {
        isAuthorDeleted: true,
        content: `Le principe fondateur de la justice c'est de résoudre un conflit.

        Deux personnes ont un problème à résoudre.
        On fait appel à la justice pour décider comment le résoudre.
        Le juge tranche et les deux partis appliquent la décision.
        
        Si on ne peut plus demander l'aide à la justice sans devoir se ruiner ou s'endetter, alors des gens se mettront à faire la justice eux même.
        C'est le prix à payer quand on refuse de fournir un service de base pareil à tout le monde.
        Et mettre un prix nécessaire à payer pour filtrer les demandes au tribunal c'est du même niveau, ça ne fait que favoriser les injustices.
        
        Le tribunal est là pour résoudre des problèmes, et personne n'a le droit de filtrer les demandes, car tout conflit est un conflit, quelle que soit sa nature.`
      }]
    }),
    new ArticlesServiceItem({
      id: 17,
      title: `Politique libérée`,
      content: `La contrainte du temps de parole, du financement et des obligations de divulgations des comptes de campagnes des partis politiques sont des
      choses qui alourdissent le débat public. C'est pour cela, dans un soucis de démocratie, que le gouvernement a décidé d'abolir ces contraintes,
      dynamisant ainsi la tribune politique et évitant les problèmes qui ont été constatés dans le passé, c'est-à-dire, les partis politiques qui ont échoués à
      conquérir les citoyens uniquement à cause de petits problèmes de financement alternatif ou d'utilisation d'argent communautaire. Ce genre de problème
      désert grandement les intérêts du pays et cela peut permettre à des groupes de gauche de gagner.

      @Citation du gouvernement@Ne laissons ni l'extrême droite, ni la gauche créer leurs camps de concentration et leurs camps de travail. Il est de notre devoir de protéger le
      peuple de ces serpents manipulateurs.@`,
      comments: [{
        isAuthorDeleted: true,
        content: `Mais... vu que le gouvernement contrôle maintenant l'information avec sa "loi fake news", cela signifie que seul le parti au pouvoir
        sera autorisé à parler sans censure.`
      }, {
        content: `Enfin une bonne chose. Finis la langue de bois. On pourra enfin dire que le problème du pays, ce n'est pas les riches, mais les pauvres.
        S'ils sont pauvres, c'est pas sans raison. Vivement les élections.`
      }]
    }),
    new ArticlesServiceItem({
      id: 18,
      title: `Cours de citoyenneté`,
      content: `Pour qu'une personne devienne un bon citoyen, il faut qu'il soit éduqué de la bonne façon. Il a été prouvé que les enfants des personnes dans le
      besoin finissent eux aussi pauvres. Dans notre société où tout le monde possède les mêmes chances, il faut conclure de cet échec un manque flagrant
      d'éducation qui, visiblement, ne manque pas dans les familles plus fortunées.

      C'est pour cette raison que le gouvernement a instauré l'obligation, à l'école, d'assister à un cours mensuel sur la citoyenneté, dans le but d'offrir
      à tout le monde les armes pour réussir dans la vie. On y apprendra l'art de l'économie et de l'entreprenariat, on leur donnera goût à l'argent et la
      volonté de s'enrichir toujours plus, on leur enseignera comment gérer leur argent et le fonctionnement de la bourse et des banques. À noter que le plus
      important, et qui fera l'office d'un cours par semaine, sera basé sur l'apprentissage des bienfaits du capitalisme et de sa supériorité face aux
      autres régimes barbares.

      Le gouvernement compte faire des jeunes d'aujourd'hui les citoyens modèles de demain.`,
      comments: [{
        content: `"tout le monde possède les mêmes chances"
        
        Vive le capitalisme.`,
        replies: [{
          content: `Vous sous-entendez quelque chose ?`
        }, {
          content: `Je voulais juste mettre l'accent sur cette phrase. Naitre dans une famille déjà riche n'aide pas à être riche, ça serait bien trop évident.
          Et puis, montrer une entreprise qui fonctionne ça ne nécessite pas d'avoir tenté plusieurs fois en ayant échoué, et donc, avoir eu assez de capital
          à gaspiller pour pouvoir se permettre des erreurs, c'est bien connu.
        
          Vive le capitalisme.`
        }, {
          content: `Hum... C'est une critique ?`
        }, {
          content: `Non, un constat.
          
          Vive le capitalisme.`
        }]
      }]
    }),
    new ArticlesServiceItem({
      id: 19,
      title: `Responsabiliser les mouvements atypiques`,
      content: `La bio, le végétarisme, le véganisme, le zéro-déchet, c'est bien, mais lorsque l'on entend les défenseurs du bio dire que le non-bio est mauvais
      pour la santé, ou que la viande donne le cancer, ou que le plastique pollu, on est en droit de se demander s'il n'y aurait pas une doctrine anti-capitaliste
      derrière ces propos honteux. Il est néanmoins indéniable que ces mouvements ont tendance à desservir les entreprises du pays qui cherchent à aider de façon
      classique le système économique en crise.

      @Citation du Premier ministre@Nous n'avons rien contre les produits bio, au contraire, cela apporte une nouvelle dimension marketing et un vent nouveau au secteur
      de l'offre et de la demande, mais certains propos doivent être réprimé pour ne pas causer du tort aux autres entreprises, et donc, au pays.@

      En effet, les consommateurs peuvent se sentir touchés par ce genre de propos moralisateurs et se retrouvent incités à consommer moins. Cela
      représente un grand danger pour l'économie et pourrait provoquer la perte de nombreux emplois ainsi que participer à la crise économique.

      Ainsi, de nouvelles lois contre le propagande anti-économique ont été votées pour punir ces agissements irresponsables.`,
      comments: [{
        content: `Rectification : "[...] ont été 'votées' [...]", parce que, si je ne me trompe pas, tout passe par le 49-3 ces derniers temps.`,
        replies: [{
          content: `Et heureusement, sinon on n'aurait jamais eu aucune réforme. Le peuple n'aime pas le changement, c'est bien connu !`
        }, {
          isAuthorDeleted: true,
          content: `Si le changement n'était pas toujours en faveur des mêmes, peut-être que le peuple serait moins réticent, non ?`
        }]
      }, {
        content: `Enfin, on condamne ceux qui veulent m'empêcher de me faire plaisir librement !`,
        replies: [{
          isAuthorDeleted: true,
          content: `Lorsque ce "plaisir" coûte la vie de milliers de milliards d'êtres vivants par an, on réfléchi avant de se faire "plaisir".

          Avec ce genre de propos, on peut justifier les viols et la pédophilie : "Bah ouais, c'était son plaisir, alors peu importe ce que ça a coûté."`,
        }, {
          content: `Oui mais, sale bobo de merde, la viande, il nous en faut pour vivre.`
        }, {
          isAuthorDeleted: true,
          content: `Renseignez-vous avant d'affirmer des choses pareilles. Ce n'est pas comme si c'était difficile de trouver la réponse sur internet.
          Un peu d'hygiène mentale, voyons.`
        }]
      }]
    }),
    new ArticlesServiceItem({
      id: 20,
      title: `Signature du premier pacte de libre échange avec l'Afrique`,
      content: `Nous avons le plaisir d'annoncer l'ouverture des échanges sans restriction avec les pays d'Afrique.
      Le libre-échange proposé et signé par le gouvernement va favoriser le commerce et les échanges.
      Nos entreprises pourraient s'inquiéter des règles liberticides sur le plan économique que pourraient adopter les Etats partenaires, mais
      qu'ils soient rassurés : les traités signés permettent aux entreprises de porter plainte contre un pays, au tribunal du commerce, et ainsi obtenir
      un dédommagement et une obligation de suppression des lois problématiques. De cette façon, le gouvernement n'a pas seulement aidé notre pays à relancer
      son économie, mais il a fait de notre système le moteur pour les Etats partenaires qui, parfois, ne disposent pas du courage nécessaire pour adopter
      les mêmes lois que les nôtres.

      Le gouvernement est en train de proposer le même traité à d'autres pays d'Europe, d'Amérique et d'Asie, espérant qu'ils accepteront ce cadeau que notre
      beau pays leur fait.`,
      comments: [{
        isAuthorDeleted: true,
        content: `Les pauvres...`
      }]
    }),
    new ArticlesServiceItem({
      id: 21,
      title: `Blocage par FAI`,
      content: `Le téléchargement illégal et la mise à disposition gratuite de contenus payants sont des atteintes fondamentales au marché de l'offre et de la demande.
      Cela représente une perte monumentale d'argent pour les entreprises et les créateurs.
      
      C'est pour cela que le gouvernement a imposé aux fournisseurs d'accès Internet (FAI) de bloquer le peer-to-peer et les sites de streaming. Un organisme
      va être créé pour mettre à jour et fournir une liste de sites et protocoles à bannir du réseau internet du pays.
      
      Protégeons ceux qui construisent notre culture en abolissant les pratiques barbares du vol numérique. Pirater, c'est voler.`,
      comments: [{
        isAuthorDeleted: true,
        content: `Sans le téléchargement illégal et les sites de streaming, je n'aurais jamais eu les moyens de me payer un accès à toute cette culture.`,
        replies: [{
          content: `Si tu consommes la culture illégalement, ça revient à tuer les auteurs.`
        }, {
          isAuthorDeleted: true,
          content: `Je ne crois pas que vous soyez un créateur d'œuvres pour dire que ça tue. La plupart ne sont pas milliardaires ni ne sont connus, ce qui fait que
          la moindre publicité est une bénédiction pour eux. Le système ne fonctionne pas sur la rentabilité d'une seule œuvre mais sur celle de l'ensemble.
          Si vous arrivez à faire connaître l'une d'entre elles, cela peut aider à promouvoir les autres. Ainsi, quelqu'un qui a eu
          accès à un contenu de façon illégal pourra s'intéresser au reste des œuvres. S'il y a autant de gens qui aiment les films et séries, c'est
          uniquement grâce aux sites de streaming illégal. Sans eux, les salles de cinéma seraient désertes et les films se vendraient bien moins.
          
          C'est combattre ces distributions illégales qui tue les petits créateurs, et ça enrichira ceux qui n'ont pas besoin de se faire connaître.`
        }]
      }]
    }),
    new ArticlesServiceItem({
      id: 22,
      title: `Rendre le Parlement efficace`,
      content: `Une toute nouvelle réforme majeure vient modifier le fonctionnement de la république.
      Le Parlement, c'est-à-dire l'Assemblée nationale et le Sénat, va se voir modifié pour accueillir les réels acteurs de notre société : les dirigeants d'entreprise.
      Ainsi, ne pourront siéger que les premières entreprises du pays, en termes de chiffre d'affaires, permettant de recentrer les débats et les objectifs de la démocratie
      dans le but d'assurer des discussions matures sur les réels problèmes de notre société.
      
      Nous avons interviewé les chefs d'entreprises majeures qui semblent tous ravis par cette réforme, ce qui montre bien que le gouvernement écoute son peuple.`,
      comments: [{
        isAuthorDeleted: true,
        content: `Patrons ≠ Peuple`,
        replies: [{
          content: `Sans eux, le peuple mourrait de faim dans les rues. Ils sont plus que jamais à l'avant-garde de la république, et ils méritent leurs privilèges.`
        }, {
          isAuthorDeleted: true,
          content: `Sauf qu'ils gagnent leur statut de privilégié en exploitant l'obligation qu'on leur impose de se procurer de l'argent pour survivre,
          asservissant de cette façon la quasi-totalité de la population. Et pire encore, beaucoup de petits patrons sont les esclaves d'eux-mêmes, cherchant simplement
          à survivre au système d'une autre façon que par le salariat, idéalisant souvent le capitalisme tel un syndrome de Stockholm.`
        }, {
          isAuthorDeleted: true,
          content: `L'Humanité a vécu des millions d'années sans entreprise, sans capitalisme et sans argent, dans des conditions bien pires que celles qu'on connaît
          aujourd'hui, et vous savez quoi ? On a survécu ! C'est étonnant, non ? Sans pour autant revenir à cette époque, c'est bien la preuve que si les gens meurent sans
          argent, ce n'est pas parce que c'est nécessaire d'en avoir, mais parce que le capitalisme nous tue si nous n'en avons pas. Il ne faut pas confondre entre un
          besoin naturel et un menace de mort. Le capitalisme tue, et ce n'est pas une métaphore.`
        }]
      }]
    }),
    new ArticlesServiceItem({
      id: 23,
      title: `Suppression de la concurrence déloyale`,
      content: `Imaginez que vous soyez un éléphant et que vous avanciez. Vous avez de grandes chances d'écraser des insectes, sans le vouloir, à cause de votre
      corpulence. Si vous deviez vous soucier de cela ou si quelqu'un venait vous imposer de ne pas tuer d'insecte, la seule chose que vous pourriez faire
      pour vous conformer à cette exigence est de ne plus avancer, de rester sur place, et donc, de mourir de faim (la nourriture ne vous viendra pas toute seule).
      
      Voilà pourquoi, une grande entreprise (l'éléphant) peut parfois écraser de plus petites entreprises ou des personnes (insectes). Ce n'est pas de sa faute, mais
      de celle de sa corpulence, et vouloir lui interdire d'écraser reviendrait à lui interdire de vivre, car une entreprise doit avancer pour survivre.
      
      C'est pour cela que le gouvernement, dans toute sa clairvoyance, a décidé d'abolir le concept de concurrence déloyale.
      N'ayez plus honte d'être imposant. Les dictateurs de l'éthique ne sont pas les défenseurs du capitalisme. Le monde n'est pas celui des Bisounours.
      Vous devez vous battre pour survivre, et cela peut coûter la vie à d'autres. Il faut l'accepter et vivre avec.
      
      Quelque part, faire injure aux grosses entreprises est une forme de grossophobie, une discrimination insupportable.`,
      comments: [{
        isAuthorDeleted: true,
        report: 3695,
        content: `Ceux qui croient que le capitalisme n'est pas si mal et que ça peut fonctionner vivent dans un monde de Bisounours, pas les autres.
        Lorsqu'on n'est même pas capable de voir tout le mal que l'on inflige avec un système économique pareil, on ne peut pas prétendre être clairvoyant
        et accuser les autres d'être aveugles.`
      }]
    }),
    new ArticlesServiceItem({
      id: 24,
      title: `Supression des impôts pour les grandes entreprises`,
      content: `Les grandes entreprises sont les locomotives du pays, de l'économie, de la culture, du droit, etc. Malheureusement, notre pays n'en compte pas assez.
      C'est pour cela que le gouvernement a décidé de supprimer les impôts pour les entreprises d'une certaine taille, permettant de motiver la croissance des plus modestes
      et de faire revenir les entreprises étrangères.
      
      "Pourquoi ne pas supprimer les impôts pour les petites entreprises ?", vous vous demanderez peut-être.
      Imaginez que vous distribuiez de la nourriture gratuitement, que se passera-t-il ? Les pauvres viendront. Mais,
      ce qui fait tourner une économie, ce ne sont pas ceux qui ne pourront rien acheter, mais ceux qui dépenseront sans compter. Ainsi, supprimer les impôts pour les petites
      entreprises reviendrait à faire venir aussi les petits organismes étrangers, sans pour autant les inciter à gagner plus étant donné qu'il n'y a pas de condition
      pour bénéficier de cet avantage.
      
      Ainsi, favoriser fiscalement les grandes entreprises revient à tous nous favoriser.`
    }),
    new ArticlesServiceItem({
      id: 25,
      title: `Suppression de la sécurité sociale et de la retraite`,
      content: `Des dizaines de millions de citoyens vont, un jour, devenir vieux, et nombre d'entre eux seront malades, même si personne ne leur souhaite.

      Pour leur permettre une retraite décente et un service médicale de qualité, le gouvernement a décidé de supprimer la sécurité sociale et la retraite publique.
      En laissant les entreprises s'occuper de ces secteurs, la pression de la concurrence va permettre de réduire les coûts pour nos citoyens et d'obtenir
      des prestations de bien meilleure qualité. Après tout, toute entreprise doit se démarquer par les services qu'elle propose et par son prix.

      Les innovations sont aussi à prévoir, et pour favoriser au maximum ce développement, le gouvernement a aboli certaines restrictions sur l'utilisation et
      la revente des données personnelles. Rien n'empêchera, maintenant, à un médecin ou un hôpital du privé, de revendre les données collectées pour fournir
      à sa clientèle des services de meilleure qualité et un suivi généralisé.`,
      comments: [{
        isAuthorDeleted: true,
        content: `Impossible que ça marche. Lorsque le marché de l'énergie a été ouvert à la concurrence, les prix ont augmenté et le service est de bien moindre qualité
        étant donné que plus rien n'est centralisé. Le service public, ça coûte moins chère, car il n'y a pas d'actionnaire à payer et pas de besoin de rentabilité.`
      }, {
        isAuthorDeleted: true,
        content: `Tous les organismes de retraite viennent d'augmenter leurs tarifs à l'annonce de cette nouvelle, prétendant que c'est pour assurer le service des futurs
        nouveaux clients. On parie que le prix ne redescendra jamais ?`
      }, {
        content: `Super ! Enfin, on va arrêter de prendre mon argent pour financer la fin de vie des autres. Je ne travaille pas pour eux, mais pour moi.`
      }]
    }),
    new ArticlesServiceItem({
      id: 26,
      title: `Création d'un indicateur commercial`,
      content: `Pour la relance économique, il faut consommer plus. Cela passe par acheter plus mais aussi utiliser plus d'énergie.
      Les différents gouvernements qui ont précédé l'actuel ont instauré de nombreux systèmes pour faire culpabiliser la population lors de leurs achats.
      C'est pour cela que les logos écologiques et énergétiques seront supprimés, par exemple sur les réfrigérateurs, et il sera maintenant obligatoire d'apposer,
      sur tout produit, le logo fair-economy.
      
      Ce nouveau logo permet, en un coup d'œil, de savoir si un produit est bénéfique à l'économie ou s'il est néfaste. Ainsi, si vous voyez une pastille verte, c'est que l'article
      contribue à la relance économique, c'est-à-dire que
      vous saurez que le produit que vous êtes sur le point d'acheter consommera beaucoup d'énergie et qu'il aura nécessité de nombreux autres produits et services pour
      sa fabrication.
      
      # Consommer plus c'est payer moins.
      En effet, si vous vous retrouvez à acheter un produit avec un pastille verte, certes, vous consommerez plus d'électricité, et donc, votre facture à la fin du
      mois sera plus importante, mais la retombée économique sera telle sur le pays que vous gagnerez plus d'argent, et donc, proportionnellement à vos dépenses, cette augmentation
      de coût sera ressenti en réalité comme une diminution.
      
      Payez plus pour gagner plus.
      
      # Dissuasion incitative
      Dans le but d'inciter les personnes encore réticentes à consommer plus, une taxe est en train d'être créée sur tous les produits dits économiques et écologiques.`,
      comments: [{
        isAuthorDeleted: true,
        content: `J'ai lu "fair-economy", j'ai tout de suite pensé que le gouvernement venait de changer radicalement de direction, mais ce n'était qu'une illusion de l'esprit.
        Ce n'est "fair" qu'en considérant l'économie en dehors de tout autre contexte, parce que, dès que l'on ajoute le peuple ou l'écologie, c'est immédiatement un terme
        mensonger, trompeur, digne des agences publicitaires qui pondent un nom de produit opposé à ce qu'il fait vraiment.
        
        On voit tout de suite la carrière de comptable et de marketeux du
        gouvernement. Ils ne pensent qu'aux chiffres et essaient de nous faire passer leurs décisions honteuses avec des méthodes publicitaires.`
      }]
    }),
    new ArticlesServiceItem({
      id: 27,
      title: `Revalorisation du travail de policier`,
      content: `En ces temps de crise, le peuple peut avoir tendance à perdre de vue les objectifs du bien commun.
      Le gouvernement, lorsqu'il doit proposer une loi, s'appuie sur des experts et des conseillers, lui permettant de toujours toucher juste.
      Le peuple, quant à lui, ne possède pas de tels outils, ce qui peut engendrer des demandes et des critiques inappropriées, basées sur aucune réalité.
      Ces comportements déviants, souvent anti-capitalistes et terroristes du bien commun, peuvent avoir des conséquences majeures sur l'économie.
      Cela peut aller jusqu'à bloquer le pays entier. Souvenez-vous des gilets jaunes.

      Le gouvernement a alors décidé de soutenir les protecteurs de la démocratie et les intérêts du plus grand nombre en renforçant le corps policier.
      De nouveaux outils seront mis à leur disposition ainsi que des primes de risques. Une obligation de cacher l'identité des forces de l'ordre sera imposée
      pour leur éviter des représailles.
      
      Il n'y a pas de violence policière, contrairement au fantasme de certains. Il n'y a qu'une action face à des terroristes, qui cherchent à plonger le pays
      dans la peur du capitalisme, et motivés par l'ignorance des bienfaits apportés par les réformes menées.`,
      comments: [{
        isAuthorDeleted: true,
        content: `"Pas de violence policière", allez dire ça à mon œil qui a été crevé lorsque j'ai manifesté pacifiquement, avec l'autorisation de la mairie,
        pour que je puisse avoir une retraite suffisante pour me loger et me nourrir. Voilà la réponse que j'ai eu du gouvernement... Et après c'est nous les terroristes.
        Maintenant, comme la plupart des gens, j'ai peur d'aller manifester. Si ça ce n'est pas de la terreur... Les vrais terroristes ont gagné, et ils sont au pouvoir.`
      }, {
        content: `Espérons que cela sera suffisant pour faire sortir les jeunes de cité de leurs trafics de drogues pour enfin trouver un vrai travail.`,
        replies: [{
          content: `Je suis ce que vous appelez un jeune de cité, et je cherche activement un travail, mais, vu ma couleur de peau, mon accent et mon adresse, toutes les
          entreprises ont peur de m'embaucher. Du coup, impossible de trouver un travail, mais, en attendant, j'ai un loyer à payer et de la nourriture à acheter.
          Je fais comment, moi ? Les seuls qui ne discriminent pas au recrutement sont ceux qui vendent de la drogue... Maintenant, à qui la faute s'il y a des dealers ?`
        }]
      }]
    }),
    new ArticlesServiceItem({
      id: 28,
      title: `Application de suivi CovidSafeApp`,
      content: `Le gouvernement vient de déployer l'application CovidSafeApp qui permettra de prévenir de nombreux cas de maladie.
      Le principe est simple : la population installe CovidSafeApp sur leur smartphone,
      puis l'application détecte, à l'aide du Bluetooth, les différents téléphones à proximité.
      Si vous vous retrouvez à proximité d'une personne connue pour être contaminée, vous recevrez une alerte.
      
      Dans un premier temps, l'installation de CovidSafeApp se fera sur le volontariat.
      Pour rassurer la population, le gouvernement a voulu insister sur le fait que les données sont anonymes et que la géolocalisation de l'appareil ne
      sera pas récupérée.

      Pour les personnes qui ne disposeraient pas de smartphone, le gouvernement envisage l'utilisation de bracelets électroniques.
      ${/*Ceux qui choisiront de l'installer auront le droit de circuler
      plus loin de leur domicile.*/''}`,
      comments: [/*{
        isAuthorDeleted: true,
        content: `"Plus loin de leur domicile" ? Je ne comprends pas, la distance qui a été établie pour tous n'est pas une sécurité pour éviter les contaminations ?
        Alors, pourquoi on autorise les porteurs de l'application à enfreindre cette règle de sûreté ? Soit on augmente la distance pour tout le monde, soit on
        considère que c'est pour la sécurité de tous de la respecter, mais on ne crée pas des privilèges pour ceux qui ont un smartphone et une application
        de tracking. Bientôt, il y aura des réductions d'impôts pour ceux qui ont voté pour le président actuel !`
      }, */{
        content: `L'organisme responsable de la sécurité des données est formel au sujet de CovidSafeApp : tout est en règle.`,
        replies: [{
          content: `Vous savez que la détection des téléphones à proximité est une forme de géolocalisation, non ?
          Et si vous arrivez à déterminer la position d'un seul individu, alors vous pouvez en déduire la position de tous les autres.`
        }, {
          content: `Le risque zéro n'existe pas. Si des géants comme Facebook, Amazon et Google ont subi des fuites de données monumentales, qu'est-ce
          qui nous dit que les nôtres seront à l'abri ? Le traçage des interactions sociales est dangereux, et il est évident que d'autres y auront accès,
          que le gouvernement le veuille (comme lorsqu'ils vendent les données des cartes grises) ou non.`
        }, {
          content: `Ce qui m'inquiète, ce n'est pas la sécurité des données collectées, c'est ce qui en sera fait.

          Même s'il s'avère que le gouvernement a des projets bienveillants, qu'est-ce qui nous dit que le prochain n'utilisera pas ces données
          pour traquer des opposants politiques ou tout simplement les vendre à d'autres entreprises ? C'est déjà ce que fait l'Etat en vendant les informations
          de la carte grise au secteur privé : nom, âge, adresse postale, numéro de téléphone et les informations sur le véhicule !`
        }, {
          content: `On parle ici de sauver des gens. Au diable les données personnelles si ça sauve des vies.`,
          replies: [{
            content: `Tous les systèmes similaires qui ont été installés dans de nombreux pays se sont révélés inutiles, et même néfastes (allez voir la Russie).
            Donc, imaginer que seule notre application fonctionnera dans le monde entier, c'est ne pas être capable d'apprendre des erreurs des autres.
            
            C'est comme lorsque vous allez chez le médecin et qu'il ne sait pas ce que vous avez. S'il vous prescrit un médicament et que ça ne soigne pas
            votre maladie, les seuls effets qu'il pourra avoir sur vous sont les effets secondaires. Autant vous dire qu'il est immorale de prescrire
            un médicament à quelqu'un si on n'a pas identifié la cause, et encore pire si on sait déjà qu'il ne guériera pas.
            Donc, le seul effet que pourra produire l'application, c'est les effets secondaires, et personne ne souhaite ça.`
          }]
        }]
      }]
    }),
    new ArticlesServiceItem({
      id: 29,
      title: `Premières condamnations grâce à CovidSafeApp`,
      content: `Les données collectées par l'application de surveillance des maladies, CovidSafeApp, a permis d'arrêter des terroristes de la pensée.
      
      En effet, étant donné que l'application est capable de détecter la présence d'autres téléphones, il a été possible aux policiers de déterminer
      la présence d'une réunion à caractère anti-capitaliste. L'un des membres présents était connu pour être un sympathisant communiste. Un dispositif a immédiatement
      alerté la police d'une situation potentiellement illégale.
      
      Les forces de l'ordre ont simplement récupéré les communications audios, grâce aux accès larges de l'application, et ont identifié des propos à caractère
      anti-capitaliste. Grâce au nom des détenteurs d'abonnement téléphonique, ces gens ont pu être convoqués au tribunal et condamnés comme il se doit.
      
      Nous pouvons le dire : l'application CovidSafeApp a une utilité publique et nous permet de garantir notre liberté.
      
      En voyant ces résultats exceptionnels, le gouvernement compte imposer l'installation de l'application chez les fabricants de tous les téléphones et
      d'interdire sa désinstallation.
      Il en va de la sécurité de tous.`,
      comments: [{
        isAuthorDeleted: true,
        content: `J'ai peur de parler avec ma famille, mes amis, mes collègues, maintenant que l'application est installée. Surtout que l'on ne sait pas qui possède l'a
        installée, du coup, tout le monde devient suspect.`,
        replies: [{
          content: `Si vous avez peur, c'est que vous avez quelque chose à cacher.`
        }, {
          isAuthorDeleted: true,
          content: `Pareil. J'ai remarqué que les rapports sociaux ont bien changé depuis. Avant, on faisait des blagues, on rigolait, on discutait de politique et on
          n'hésitait pas à critiquer ce qui n'allait pas. Maintenant, on parle de la pluie et du beau temps, c'est tout, de peur que nos propos soient mal
          interprétés.
          
          Surtout que c'est une intelligence artificielle qui s'occupe de repérer les situations potentiellement illégales et de prévenir les autorités,
          donc des erreurs, elle en fait beaucoup.`
        }]
      }]
    }),
    new ArticlesServiceItem({
      id: 30,
      title: `Injection dans les entreprises pour la relance`,
      content: `Après le creux d'activité dû au confinement, de nombreuses entreprises ont perdu beaucoup d'argent et d'employés.
      Pour leur permettre une relance rapide et fulgurante, le gouvernement a décidé d'injecter beaucoup d'argent dans les secteurs prometteurs tels que
      le domaine de l'automobile, celui de l'intelligence artificielle et le système bancaire.`,
      comments: [{
        isAuthorDeleted: true,
        content: `Dans 100% des cas où un pays ou un groupe de pays (comme l'Europe) injecte des fonds dans le privé, la quasi-totalité des sommes vont
        dans la bulle spéculative. C'est systématique ! Il n'y a absolument rien à faire. Vous dites aux entreprises d'investir et d'embaucher, mais elles ne sont pas
        bêtes : ça rapporte bien plus de tout mettre dans des fonds d'investissement plutôt que dans l'économie réelle.

        Je vous rappelle qu'on parle d'entreprises capitalistes, là, pas du secteur public, donc il n'y a aucune illusion à se faire sur ce qu'il adviendra de tout cet argent
        qui vient de nos impôts.`
      }]
    }),
    new ArticlesServiceItem({
      id: 31,
      title: `Défendre la démocratie`,
      content: `La démocratie n'est pas un terrain de jeu, il faut être sérieux et ne pas fausser l'opinion des autres avec des mensonges.
      Pour que chacun puisse débattre sans contrainte, il faut que la population puisse être bien informée.
      Ainsi, pour protéger la démocratie, le gouvernement a décidé d'instaurer une loi contre les fake news. Un organisme a été créé pour réguler
      les informations dites mensongères pour permettre de nettoyer l'accès aux propos parasites et dangereux.`,
      comments: [{
        isAuthorDeleted: true,
        content: `Donc, le gouvernement veut s'emparer du pouvoir de nous dire ce qu'on a le droit de dire et ce qu'on n'a pas le droit de dire, et ce, soi-disant pour
        défendre la démocratie. Je dois être stupide de ne pas comprendre parce que, pour moi, quand on supprime la liberté d'expression, on supprime la démocratie.`
      }, {
        isAuthorDeleted: true,
        content: `Loi contre les fake news, mais on en parle des fakes news proférées par le gouvernement ? Je cite : "Il n'y a pas de violence policière", propos
        mensongers dit sans honte par de nombreuses personnes au gouvernement. Après cette loi, plus personne n'aura le droit de parler de violence policière sans être
        censuré, c'est une certitude ! Ils pourront déblatérer leurs mensonges, et plus personne n'aura le droit d'y répondre.`
      }]
    }),
    /*
    new ArticlesServiceItem({
      id: 0,
      title: ``,
      content: ``
    }),
    */
  ]

  public readonly orderes: number[] = [

    /* Covid */
    28, // Application de suivi CovidSafeApp //',
    31, // Défendre la démocratie
    2, // Création de l\'état d\'urgence économique //',
    3, // Relance économique après le confinement //',  
    30, // Injection dans les entreprises pour la relance //'
    12, // Privatiser pour améliorer //',
    19, // Responsabiliser les mouvements atypiques //',
    24, // Supression des impôts pour les grosses entreprises //',
    12.1, // Le gouvernement de la justice sociale //',
    27, // Revalorisation du travail de policier //',
    4, // Les aides bloquent le pays //',
    6, // Prime de réussite //',

    7, // L\'anonymat contre le peuple //',
    5, // Favoriser l\'économie par la défiscalisation //',
    8, // Première condamnation pour crime contre le capitalisme //',
    21, // Blocage par FAI //',
    29, // Premières condamnations grâce à CovidSafeApp //',

    /* Service Travailleur */
    11, // Service Travailleur //',
    18, // Cours de citoyenneté //',
    14, // Prime à l\'optimisation //',
    15, // Suppression des restrictions économiques //',

    25, // Suppression de la sécurité sociale et de la retraite //',
    26, // Création d\'un indicateur commercial //',
    //13, // Appel d\'offre au placard //',

    16, // Privatisation de la justice //',
    17, // Politique libérée //',
    22, // Rendre le parlement efficace //',
    23, // Suppression de l\'abus de position dominante //',
    
    20, // Signature du premier pacte de libre échange avec l\'Afrique //',
  ];

  protected _initialized = false;
  protected init() {
    if(this._initialized) {
      return;
    }

    this._initialized = true;

    this._orderedAricles = this.orderes
      .map(id => this.articles.find(a => a.info.id === id))
      .filter(a => a);
      
    const months = [
      'janv.',
      'févr.',
      'mars',
      'avr.',
      'mai',
      'juin',
      'juill.',
      'août',
      'sept.',
      'oct.',
      'nov.',
      'déc.',
    ];

    let date = new Date(2020, 5, 2).getTime();
    for(const article of this._orderedAricles) {
      const localDate = new Date(date);
      article.date = `${localDate.getDate()} ${months[localDate.getMonth()]} ${localDate.getFullYear()}`;
      article.dateNum = date;
      date += 1000 * 60 * 60 * 24 * 7 * 3;
    }
  }

  private _orderedAricles: ArticlesServiceItem[];
  public get orderedAricles() {
    if(!this._orderedAricles) {
      this.init();
    }

    return this._orderedAricles//.filter(article => article.dateNum <= Date.now());
  }
}
