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

function transformTextToHTML(text: string) {
  return '<p>' + text
    .trim()
    .replace(/^ +/img, '')
    .replace(/^\s*#\s+(.+)$/img, '</p><h2>$1</h2><p>')
    .replace(/\n\n/img, '</p><p>')
    .replace(/([^ \n])"/img, '$1 »')
    .replace(/"([^ \n])/img, '« $1')
    + '</p>'
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

  public get date() {
    return '';
  }

  public get content() {
    return this.info.content;
  }

  public get contentHtml() {
    return transformTextToHTML(this.content)
  }

  public get titleUrl() {
    return this.info.title
      .replace(/\s+/img, '-')
      .toLocaleLowerCase();
  }

  public get titlePage() {
    return this.info.title;
  }

  public get titleHtml() {
    return this.info.title;
  }

  public get comments() {
    return (this.info.comments || [])
      .map(comment => new ArticlesServiceItemComment(comment));
  }
}

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  constructor() { }

  public getArticleById(id: number) {
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
      Cet statut permet de s'affranchir de nombreuses lourdeurs administratives et favorise l'utilisation de procédures rapides et directives.
      Ainsi, le 49-3 se voit modifié pour ne plus autoriser de motion de sensure lorsqu'il est appliqué, permettant ainsi au gouvernement
      de prendre des décisions sans être rétissant à utiliser le 49-3.
      Le peuple a élu ce gouvernement, et la démocratie ne doit être bloquée par la lenteur du système politique actuel.`
    }),
    new ArticlesServiceItem({
      id: 3,
      title: `Relance économique après le confinement`,
      content: `Il est nécessaire de relancer l'économie après ce confinement.
      Le gouvernement a décidé de prendre des mesures exceptionnelles pour une situation exceptionnelle.
      
      Le code du travail vient donc d'être allégé, permettant à l'employeur de licensier un employé sans avoir besoin de préciser son motif et sans avoir à fournir une
      prime de licensiement. Cela va permettre de faciliter l'embauche et de fuluidifier la reprise économique.
      
      Les règlementations sur l'écologie ont elles aussi été revues pour, finalement, toutes les supprimer. "Le peuple passe avant tout, et si le peuple
      meurt de faim à cause du manque d'échanges économiques, il n'en aura rien à faire que des insectes porteurs de nombreuses maladies aient été sauvés au prix de
      nombreuses vies humaines."`,
      comments: [{
        isAuthorDeleted: true,
        content: `Super la citation ! On met les meurtres provoqués par le système économique sur le dos de l'écologie...`
      }]
    }),
    new ArticlesServiceItem({
      id: 4,
      title: `Les aides bloquent le pays`,
      content: `Toute personne intelligente comprendra sans difficulté que si nous donnons des aides, alors les assistés n'auront aucune raison de participer à
      l'effort de la relance économique. Il est donc indispenssable que le pays encorage la recherche d'emploi en réformant drastiquement les aides apportées.
      Dans le passé, le pays pouvait se permettre de tels cadeaux dignes du communisme qui rappelle les heures les plus sombres de notre histoire, mais cela n'est plus
      soutenable par le peuple.
      
      Le gouvernement a donc décidé de supprimer toutes les aides dans le but de financer la relance.`
    }),
    new ArticlesServiceItem({
      id: 5,
      title: `Favoriser l'économie par la défiscalisation`,
      content: `Quelqu'un de riche, c'est-à-dire une personne qui possède beaucoup d'argent, est un individu qui a obtenu sa fortune en cherchant à gagner toujours plus.
      Ainsi, un riche cherche à devenir toujours plus riche, et ça, le gouvernement l'a compris. Ainsi, pour favoriser la relance économique, les personnes touchant plus
      de 100.000€ brute par an n'auront plus aucun impôt à payer, ni aucune cotisation ; tout sera pris en charge par l'Etat.
      
      Favoriser les gains de certains permettra de réduire leur frilosité à gagner toujours plus, les encourageants à investir plus et à créer de nouvelles entreprises.
      Le ruissellement qui en découlera sera bénéfique pour tout le pays, et surtout pour les plus pauvres.

      Si vous n'êtes pas riche, et que, par conséquent, vous ne participez aussi bénéfiquement qu'eux au système économique, vous pourrez toujours être utile à la cause commune
      en payant des impots et en travaillant comme il se doit.`,
      comments: [{
        isAuthorDeleted: true,
        content: `Mon patron met de l'argent en surplus dans une entreprise et il se la coule douce le temps que moi, qui paie mes impots et bosse comme pas permis, va produire
        et vendre pour lui, lui permettant de récupérer presque la totalité des gains. Nous, les employés, nous n'aurons que les miettes.`
      }]
    }),
    new ArticlesServiceItem({
      id: 6,
      title: `Prime de réussite`,
      content: `Comment motiver le peuple à travailler mieux et plus longtemps ? Le gouvernement a trouvé une façon simple et éthique d'arriver à ce résultat en
      donnant une prime de réussite plutôt conséquente à ceux qui arriveront à gagner une certaine somme d'argent.
      
      Ainsi, si vous travaillez et que votre activité fonctionne bien, le salaire que vous vous verssez, ou que votre employé vous donne, peut vous permettre d'obtenir
      cette prime. Au dessus de 60.000€ de salaire annuel, votre prime s'élèvera à 100.000€.
      
      Cela motivera les moins rapides d'entre nous à travailler mieux et plus longtemps, pour gagner tout simplement plus.
      
      Comme si cela ne suffisait pas, cette prime va permettre à ceux qui atteignent le pallier de la prime de réussite de se payer moins pour récompenser davantage
      les salariés investis dans leur activité.`,
      comments: [{
        isAuthorDeleted: true,
        content: `Mon patron s'est augmenté de 100% pour toucher sa prime de réussite. Pour faire ça, il a été obligé de réduire nos salaires en prétendant
        que s'il ne faisait pas ça, l'entreprise allait faire faillite. On n'est pas dupes, nous !`
      }]
    }),
    new ArticlesServiceItem({
      id: 7,
      title: `L'anonymat contre le peuple`,
      content: `Certaines personnes se cachent derrière l'anonymat d'internet pour proférer des accusations et des propos anti-capitalistes à l'encontre
      de nore société ou d'entreprises. Cela nuit grandement au système économique et doit s'arrêter immédiatement.
      
      Un employé a même critiqué l'entreprise dans laquelle il se trouvait ! Comment une personne peut-elle mordre la main de celui qui le nourrit ?
      Il est nécessaire que la partie ingrate de la population apprène à respecter ceux qui, par leur réussite, permettent un ruissellement vers leurs
      employés, leur permettrant d'être payés.
      
      C'est dans le but de corriger ces injustices et ces comportements irresponssables que le gouvernement a créé une loi, la loi CapSafe, pour obliger chaque
      individu, même mineur, à fournir la liste des ses comptes sur internet à l'Etat ainsi qu'à ses employeurs. Ceux-ci pourront, ensuite, porter
      plainte et obtenir réparation en cas propos jugés déplacés.
      
      La liberté de chacun s'arrête là où celle des autres commence.`,
      comments: [{
        isAuthorDeleted: true,
        content: `On croirait qu'on est payés par bonté, et pas parce qu'on travail le plus clair de notre temps. Je rappelle tout de même que si
        un employeur réussit, c'est parceque les employés bossent ! Il ne serait rien et ne réussirait rien si nous n'avions pas décidés de nous lever
        chaque matin pour aller faire son job de merde. L'ingratitude n'est clairement pas là où certains semblent penser.`
      }]
    }),
    new ArticlesServiceItem({
      id: 8,
      title: `Première condamnation pour crime contre le capitalisme`,
      content: `La première condamnation a été prononcée contre un habitant du pays.
      Il propageait des messages anti-capitalistes et faisait la propagande de systèmes déviants, tel que le socialisme.
      
      Comme tout le monde le sait, la capitalisme est la seule solution possible dans un monde comme le nôtre. Le nier et agir contre celui-ci est dangereux
      pour la nation toute entière. Ces personnes qui refusent de voir la vérité en face ne sont que des communistes qui cherchent à rétablir les goulags.
      Le gouvernement ne laissera pas ces individus sévir en toute impunité, c'est ainsi que la première condamnation est tombée, suivie par des milliers d'autres,
      conformément à la loi CapSafe.
      
      Ces gens sont des ennemis du peuple, des terroristes de la pensée.`,
      comments: [{
        isAuthorDeleted: true,
        content: `Je vien de recevoir une ammande de 30.000€ et une condamnation à deux ans dans une prison qui ne se trouve sur aucune carte, sans avoir été appelé
        à un tribunal pour me défendre, et ce, seulement parceque mon fils de 8 ans
        a dit, sur Twitter : "j'aime pas les épinards". L'entreprise qui a porté plainte est anonyme, elle, et nous raquette comme ça, au calme, avec l'approbation
        de la justice. On va où comme ça ?`
      }]
    }),
    /*new ArticlesServiceItem({
      id: 10,
      title: `Création de la taxe rétrocédée`,
      contentHtml: `La taxe rétrocédée est un concept très simple : une taxe peut-être mise sur un produit, augmentant considérable son prix, mais elle n'est pas déduite du compte de
      l'acheteur. Cela permet de réduire l'accès à certains produits dans le but de motiver le désir de richesse.
      
      En effet, si vous souhaitez acheter un produit qui coute 10.000€, mais que vous ne possédez que 12.000€ sur votre compte, vous ne pourrez y accéder.
      
      Gagnez plus pour acheter plus.`
    }),*/
    new ArticlesServiceItem({
      id: 11,
      title: `Service Travailleur`,
      content: `Le gouvernement a créé un nouveau service révolutionnaire : le Service Travailleur.
      
      Toute personne en âge de travailler, qui a quitté les cours, mais qui est sans emploi, sera automatiquement affilié au Service Travailleur.
      Ce service donnera régulièrement des missions aux citoyens pour participer à l'effort économique du pays.
      
      Si vous êtes un membre d'une entreprise et que vous souhaitez avoir recour au Service Travailleur, il vous suffit de contacter le service et 
      de l'informer du poste, de la période et du salaire pour que celui-ci vous envoit un travailleur désigné.`,
      comments: [{
        isAuthorDeleted: true,
        content: `J'étais mère au foyer, et le Service Travailleur m'a obligée à rejoindre une entreprise à deux heures de trajet de chez moi pour un salaire de 200€ par mois,
        à 39h. Vu que mon trajet coute plus que ce que l'entreprise me donne, je me retrouver à payer pour travailler dans un job qui ne me plait pas du tout. Et comme si
        ça ne suffisait pas, je suis obligée de payer une nounou pour s'occuper de mes enfants et du coup je ne les vois pas grandir.`
      }, {
        content: `Le gouvernement a cerné les réels besoins des entreprises. Certains se plaignaient que les immigrés prennaient leur travail, maintenant c'est terminé.
        Tout le monde y gagne. Les entreprises qui ont besoin de main d'oeuvre pas chère l'obtient très rapidement et les gens qui ne travaillent pas se font un peu d'argent.
        C'est donnant donnant, et c'est en ça que le capitalisme est supérieur à tout autre système.`
      }]
    }),
    new ArticlesServiceItem({
      id: 12,
      title: `Privatiser pour améliorer`,
      content: `Le pays a pris du retard sur l'éducation avec le confinement et les hopitaux sont surchargés depuis l'apparition du COVID-19 sur le territoire.
      Il aurait stupide, voir immorale, de ne pas rendre ces deux activités en plein boom lucratives pour supporter l'effort économique.
      C'est pour cela que le gouvernement a annoncé, ce matin, la privatisation de toutes les écoles et de tous les centres hospitaliers.
      Ainsi, les entrepreneurs pourront saisir l'opportunité d'accroitre les revenus de ces services et d'en faire profiter le pays.`,
      comments: [{
        isAuthorDeleted: true,
        content: `Ma grand-mère était à l'hopital, atteinte du COVID-19. Elle a été expulsée par le nouveau directeur... un multimillionnaire, juste parce qu'elle ne pouvait pas payer
        les nouveaux tarifs en hausse. Il a aussi annoncé qu'ils allaient arrêter certains soins, jugés "pas assez rentables".
        Si on n'est pas un bourgeois, on n'a plus accès à rien.`
      }, {
        isAuthorDeleted: true,
        content: `Mon enfant ne peut plus aller à l'école... Pourquoi ? Parce que je n'ai pas assez d'argent pour payer la moins chère des écoles à 2000€ par an.
        C'est une honte !`
      }]
    }),
    new ArticlesServiceItem({
      id: 12.1,
      title: `Le gouvernement de la justice sociale`,
      content: `Les privilèges sont un véritable problème dans ce pays. D'après les sondages, 98% de la population considère que le pays compte des privilégiers et
      tout autant souhaiteraient voir ces avantages disparaitres. Le gouvernement a entendu cet appel et y a répondu avec toute l'efficacité qui le carractérise.

      Ainsi, il a été annoncé la supprimession du statut de fonctionnaire, même pour ceux qui sont encore en poste.
      Les régimes spéciaux seront eux aussi réformés pour disparaitre.`,
      comments: [{
        isAuthorDeleted: true,
        content: `J'étais enseignant dans le publique. On nous disait : "vous partez plus tôt à la retraite, en contrepartie, votre salaire sera figé jusqu'à la fin".
        C'est pas un privilège, c'est un compromis. En plus, on est obligés de travailler plus longtemps pour pouvoir gagner assez à la retraite pour pouvoir en vivre.
        Il faut arrêter de penser que les régimes spéciaux sont des avantages. Du coup, on se retrouve avec un salaire merdique sans aucune contrepartie. Bonne chance pour
        trouver de nouveaux enseignants, déjà que personne ne voulait venir avant ça !`
      }, {
        isAuthorDeleted: true,
        content: `Je suis cheminaux et je n'ai pas arrêté d'entendre parler de la prime de charbon. Oui, la prime de charbon est stupide étant donné qu'il n'y a plus
        de charbon, mais vous savez quoi ? Il n'y a pas eu de prime de charbon qui a été verssée à qui que ce soit depuis des dizaines d'années, alors arrêtez de parler
        de choses qui ne sont plus d'actualité. Et c'est comme ça pour beaucoup d'autres choses, tout comme le départ à la retraite. Vous êtes très mal informés !`
      }, {
        isAuthorDeleted: true,
        content: `Je suis chauffeur de bus à la capitale. C'est épuisant. Les voitures, les klaxons, les gens qui parfois font beaucoup de bruit sur les sièges arrières.
        A la fin de la journée, c'est insoutenable. On a un régime spécial pour nous, car notre travail est bien plus difficile que celui des gens à la campagne ou des
        personnes qui travaillent dans un bureau, a calme. On n'a pas le même travail, voilà pourquoi on a des régimes différents.`
      }, {
        content: `Je rajouterai à cet article que l'impot sur la fortune a été supprimé bien avan, mais qu'il faisait partie des discriminations du pays, tout comme la
        taxe carbon qui faisait culpabiliser ceux qui avaient les moyens de se payer de gros véhicules. On peut dire que l'égalité est au coeur même des préoccuptions du
        gouvernement, et ça fait plaisir à voir.`
      }]
    }),
    new ArticlesServiceItem({
      id: 13,
      title: `Appel d'offre au placard`,
      content: `Un appel d'offre est une procédure qui prend du temps et nécessite beaucoup de gestion, et donc, de l'argent.
      Dans le but de favoriser la fluidité des échanges économiques, le gouvernement a décidé de supprimer la nécessite de faire des appels d'offre, réduisant ainsi
      le temps nécessaire pour trouver un maitre d'oeuvre et l'investissement pécunier dans cette recherche.`
    }),
    new ArticlesServiceItem({
      id: 14,
      title: `Prime à l'optimisation`,
      content: `Le gouvernement alloue une prime à l'optimisation aux entreprises qui peuvent prouver, chaque année, qu'elles opèrent une optimisation dans leur
      fonctionnement pour supporter l'effort économique de la relance.
      Cette prime a pour but de motiver les entreprises peu soucieuses du contexte de crise de faire des démarches en faveur du capitalisme, et tout particulièrement
      du rendement opérationnel. Licencier les employés peu performants, relocaliser dans les lieux où la main d'oeuvre est moins onéreuse, faire appel au Service
      Travailleur autant que possible... bref, faire en sorte que l'entreprise soit la plus rentable possible pour fournir un maximum de chiffre d'affaire, et par
      conséquent, augmenter l'efficacité de la production de biens et de services dans le pays.
      
      Pour que la démarche soit complète, le gouvernement a fondé un service de conseil pour les patrons.`,
      comments: [{
        content: `Je travaillais dans une usine où on produisait des masques à la chaine. J'ai fabriqué le mois dernier 50 masques en plus que tous les autres.
        Le chef a alors augmenté mes objecifs en disant que si je peux faire autant, alors je dois pouvoir continuer comme ça. Evidemment, je n'ai pas réussi, malgré tous
        mes efforts. J'ai été viré... c'était les recommandations du service de conseil de l'Etat... et mon chef était désolé pour moi. Il a dit que s'ils ne faisaient pas
        ce que le service leur disait, ils allaient perdre la prime. Cette ingérance me dégoute... Le prire, dans tout ça, c'est que le Service Travailleur m'a
        assigné dans la même entreprise, au même poste, avec des objetifs toujours aussi élevés, pour un salaire qui m'oblige à aller me nourir auprès des associations.`
      }]
    }),
    new ArticlesServiceItem({
      id: 15,
      title: `Suppression des restrictions économiques`,
      content: `Lors d'une crise économique, il faut savoir repérer les pristes qui permettront de remonter la pente. C'est ce qu'a fait le gouvernement en
      retirant les restrictions d'âge pour l'achat d'alcool, les contraintes et les taxes sur le tabac et les interdictions de vendre de la drogues, des
      médicaments et des armes.

      Pour pouvoir vendre les produits qui étaient jusqu'alors illégaux, il faudra disposer d'une entreprise, donc d'un numéro SIRET, rien de plus.
      
      Evidemment, le gouvernement est conscient des problèmes liées aux armes, et c'est pour cela que leur vente est réglementée. Pour pouvoir s'en procurer, il
      être un citoyen responssable, c'est-à-dire qu'il faut gagner au minimum 130.000€ par an et posséder un casier judiciaire vierge à l'égard du capitalisme.
      Les bonnes actions comme la création d'une entreprise optimisée qui fonctionne bien permettront à certaines personnes qui se seraient égarés durant leur
      jeunesse d'obtenir le pardon des authorités.

      L'objectif est ici de mettre à la surface des échanges économiques qui étaient cachés, et donc, difficiles à contrôler. Les nouveaux commerçants pourront,
      bien entendu, bénéficier de la prime à l'optimisation et du Service Travailleur.`
    }),
    new ArticlesServiceItem({
      id: 16,
      title: `Privatisation de la justice`,
      content: `La justice représente une grande partie de l'activité du pays.
      Il serait indéscent de se priver d'un tel secteur pour la relance économique.

      De plus, la privatisation obligera les personnes qui veulent porter plainte à devoir payer le tribunal,
      ce qui évitera tous les abus actuels envers les patrons de nos entreprises, principalement aux prudhommes.`,
      comments: [{
        isAuthorDeleted: true,
        content: `Mon patron refusait de payer mes congés payé. J'ai été obligé de payer 3000€ pour avoir accès à un juge, et il a demandé que je paye une compentation
        pour le préjudice moral que j'aurais soit disant fait subir à mon patron en le faisant convoquer au tribunal. Je suspecte le juge d'avoir été acheté,
        je ne vois pas d'autre explication.`,
        report: 2758,
        replies: [{
          content: `Si vous avez été condamné, c'est que vous le méritiez. Remettez-vous en cause au lieu d'incriminer les autres.`
        }]
      }]
    }),
    new ArticlesServiceItem({
      id: 17,
      title: `Politique libérée`,
      content: `La contrainte du temps de parole, de financement et les obligations de divulgations des comptes de campagnes des partis politiques sont des
      choses qui alourdissent le débat publique. C'est pour cela, dans un soucis de démocratie, que le gouvernement a décidé d'abolir ces contraintes,
      dynamisant ainsi la tribune politique et évitant les problèmes qui ont éé constatés dans le passé, c'est-à-dire, les partis politiques qui ont échoués à
      conquérir les citoyens uniquement à cause de petits problèmes de financement alternatif ou d'utilisation d'argent communautaire. Ce genre de problème
      décert grandement les intérêts du pays et cela peut permettre à des groupes de gauche de gagner. Comme le dit le gouvernement :
      "Ne laissons ni l'extrême droite, ni la gauche créer leurs camps de concentration et leurs camps de travail. Il est de notre devoir de protéger le
      peuple de ces serpents manipulateurs."`,
      comments: [{
        isAuthorDeleted: true,
        content: `Mais... vu que la première chose qu'a fait le gouvernement c'est d'obliger tous les médias à être financés par l'Etat, cela signifie que
        seul le parti au pouvoir sera authorisé à parler publiquement, vu qu'il arrêtera tout financement de ceux qui lui font de l'ombre !`
      }, {
        content: `Enfin une bonne chose. Fini la langue de bois. On pourra enfin dire que le problème du pays, ce n'est pas les riches, mais les pauvres.
        S'ils sont pauvres, c'est pas sans raison. J'ai hate de voir la prochaine campagne présidentielle.`
      }]
    }),
    new ArticlesServiceItem({
      id: 18,
      title: `Cours de citoyenneté`,
      content: `Pour qu'une personne devienne un bon citoyen, il faut qu'il soit éduqué de la bonne façon. Il a été prouvé que les enfants des personnes dans le
      besoin finissent eux aussi pauvres. Dans notre société où tout le monde possède les mêmes chances, il faut conclure de leur échec un manque flagrant
      d'éducation qui, visiblement, ne manque pas dans les familles plus fortunées.

      C'est pour cette raison que le gouvernement a instauré l'obligation, à l'école, d'assister à un cours mensuel sur la citoyenneté, dans le but d'offrir
      à tout le monde les armes pour réussir dans la vie. On y apprendra l'art de l'économie et de l'entrepreunariat, on leur donnera gout à l'argent et la
      volonté de s'enrichir toujours plus, on leur enseignera comment gérer leurs argent et le fonctionnement de la bourse et des banques. A noter que le plus
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
          Et puis, montrer une entreprise qui fonctionne ça ne nécessite pas d'avoir tanté plusieurs fois en ayant échoué, et donc, avoir eu assez de capital
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
      content: `Le bio, le végétarisme, le véganisme, le zéro-déchet, c'est bien, mais lorsque l'on entend les défenseurs du bio dire que le non-bio est mauvais
      pour la santé, ou que la viande donne le cancer, ou que le plastique pollu, on est en droit de se demander s'il n'y aurait pas une doctrine anti-capitaliste
      derrière ces propos honteux. Il est néanmoins indégnables que ces mouvements ont tendance à décervir les entreprises du pays qui cherchent à aider de façon
      classique le système économique en crise.

      Le gouvernement l'a dit lui même : "Nous n'avons rien contre le bio, au contraire, cela apporte une nouvelle dimension marketing et un vent nouveau au secteur
      de l'offre et de le demande, mais certains propos doivent être réprimé pour ne pas causer de tors au pays."

      Ainsi, de nouvelles lois contre le propagante anti-économique ont été votées pour punir ces agissements irresponssables.`,
      comments: [{
        content: `Rectification : "[...] ont été 'votées' [...]", parce que, si je ne me trompe pas, tout passe par le 49-3 ces derniers temps.`,
        replies: [{
          content: `Et heureusement, sinon on n'aurait jamais eu aucune réforme. Le peuple n'aime pas le changement, c'est bien connu !`
        }]
      }]
    }),
    new ArticlesServiceItem({
      id: 20,
      title: `Signature du premier pacte de libre échange avec l'Afrique`,
      content: `Nous avons le plaisir d'annoncer l'ouverture des échanges sans restriction avec les d'Agfrique.
      Le libre échange proposé et signé par le gouvernement va favoriser le commercer et les échanges.
      Nos entreprises pourraient s'inquiéter des règles liberticides sur le plan économique que pourraient adopter les états partenaires, mais
      qu'ils soient rassurés : les traités signés permettent aux entreprises de porter plainte contre un pays, au tribunal du commerce, et ainsi obtenir
      un dédomagement et une obligation de suppression des lois problématiques. De cette façon, le gouvernement n'a pas seulement aidé notre pays à relancer
      son économie, mais il a fait de notre système le moteur pour les états partenaires qui, parfois, ne disposent pas du courage nécessaire pour adopter
      les mêmes lois que les nôtres.

      Le gouvernement est en train de proposer le même traité à d'autres pays d'Europe, d'Amérique et d'Asie, espérant qu'ils acceperon ce cadeau que notre
      beau pays leur fait.`,
      comments: [{
        isAuthorDeleted: true,
        content: `Les pauvres...`
      }]
    }),
    new ArticlesServiceItem({
      id: 21,
      title: `Blocage par FAI`,
      content: `Le téléchargement illégal et la mise à disposition gratuite de contenus payants sont des atteintes fondamentales au marcher de l'offre et de la demande.
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
          content: `Je ne crois pas que vous soyez un créateur d'oeuvres pour dire que ça tue. La plupart ne sont pas milliardaires ni ne sont connus, ce qui fait que
          la moindre publicité est une bénédiction pour eux. Le système ne fonctionne pas sur la rentabilité d'une seule oeuvre mais sur la rentabilité
          de toutes les oeuvres. Si vous arrivez à faire connaitre l'une d'entre elles, cela peut aider à promouvoir les autres. Ainsi, quelqu'un qui a eu
          accès à un contenu de façon illégal pourra s'intéresser au reste des oeuvres. S'il y a autant de gens qui aiment les films et séries, c'est
          uniquement grace aux sites de streaming illégal. Sans eux, les salles de cinéma seraient désertent et les films se vendraient bien moins.
          
          Combattre ces distributions illégales tue les petits créateurs et enrichit ceux qui n'ont pas besoin de se faire connaitre.`
        }]
      }]
    }),
    new ArticlesServiceItem({
      id: 22,
      title: `Rendre le parlement efficace`,
      content: `Une toute nouvelle réforme majeure vient modifier le fonctionnement de la république.
      Le parlement, c'est à dire l'assemblée nationnale et le sénat, va se voir modifié pour accueilir les réels acteurs de notre société : les dirigeants d'entreprise.
      Ainsi, ne pourront siéger que les premières entreprises du pays, en terme de chiffre d'affaire, permettant de recentrer les débats et les objectifs de la démocratie
      dans le but d'assurer des discussions matures sur les réels problèmes de notre société.
      
      Nous avons interviewé les chefs d'entreprises majeures qui semblent tous ravis par cette réforme, ce qui montre bien que le gouvernement écoute son peuple.`,
      comments: [{
        isAuthorDeleted: true,
        content: `Patrons =/= Peuple`,
        replies: [{
          content: `Sans eux, le peuple mourrerait de faim dans les rues. Ils sont plus que jamais à l'avant-garde de la république, et ils méritent leurs privilèges.`
        }]
      }]
    }),
    new ArticlesServiceItem({
      id: 23,
      title: `Suppression de l'abus de position dominante`,
      content: `Imaginez que vous soyez une éléphant et que vous avanciez. Vous avez de grandes chances d'écraser des insectes, sans le vouloir, à cause de votre
      corpulance. Si vous deviez vous soucier de cela ou si quelqu'un venait vous imposer de ne pas tuer d'insecte, la seule chose que vous pourriez faire est de
      ne plus avancer, de rester sur place, et donc, de mourir de faim.
      
      Voilà pourquoi, une grande entreprise (l'éléphant) peut parfois écraser des plus petites entreprises ou des personnes (insectes). Ce n'est pas de sa faute, mais
      de celle de sa corpulance, et vouloir lui interdire d'écraser reviendrait à lui interdir de vivre, car une entreprise doit avancer pour survivre.
      
      C'estpour cela que le gouvernement, dans toute sa clairvoyance, a décidé d'abolir le concept d'abus de position dominante.
      N'ayez plus honte d'être imposant. Les dictateurs de l'éthique ne sont pas les défenseurs du capitalisme. Le monde n'est pas celui des bisounours.
      Vous devez battre pour survivre, et cela peut couter la vie à d'autre. Il faut l'accepter et vivre avec.`,
      comments: [{
        isAuthorDeleted: true,
        report: 3695,
        content: `Ceux qui croient que le capitalisme n'est pas si mal et que ça peut fonctionner vivent dans un monde de bisounours, pas les autres.
        Lorsqu'on n'est même pas capable de voir tout le monde que l'on inflige avec un système économique pareil, on ne peut pas accuser les autres de ne
        pas voir clair...`
      }]
    }),
    new ArticlesServiceItem({
      id: 24,
      title: `Supression des impots pour les grosses entreprises`,
      content: `Les grande entreprises sont les locomotives du pays, de l'économie, de la culture, du droit, etc. Malheureusement, notre pays n'en compte pas assez.
      C'est pour cela que le gouvernement a décidé de supprimer les impots pour les entreprises d'une certaine taile, permettant de motiver la croissance des plus modestes
      et de faire revenir les entreprises étrangères.
      
      Pourquoi ne pas supprimer les impots pour les petites entreprises ? Imaginez que vous donniez à manger gratuitement, que ce passera-t-il ? Les pauvres viendront. Mais,
      ce qui fait tourner une économie, ce ne sont pas ceux qui ne pourront rien acheter, mais ceux qui dépenseront sans compter. Ainsi, supprimer les impots pour les petites
      entreprises reviendrait à faire venir aussi les petits organismes entrangers sans pour autant les inciter à gagner plus.
      
      Ainsi, favoriser fiscalement les grandes entreprises revient à tous nous favoriser.`
    }),
    new ArticlesServiceItem({
      id: 25,
      title: `Suppression de la sécurité sociale et de la retraite`,
      content: `Des dizaines de millions de citoyens vont, un jour, devenir vieux, et nombre d'entre eux seront malades, même si personne ne leur souhaite.

      Pour leur permettre une retraite décente et un service médiale de qualité, le gouvernement a décidé de supprimer la sécurité sociale et la retraite publique.
      En laissant les entreprises s'occuper de ce secteur, la pression de la concurrence va permettre de réduire les coûts pour nos citoyens et d'obtenir
      des prestations de bien meilleures qualité. Après tout, toute entreprise doit se démarcher par le service qu'elle propose et son prix.

      Les innovations sont aussi à prévoir, et pour favoriser au maximum ce développement, le gouvernement a aboli certaines restrictions sur l'utilisation et
      la revente des données personnelles. Rien n'empêchera, maintenant, à un médecin ou un hopital du privé, de revendre les données collectée pour fournir
      à sa clientelle des services de meilleure qualité et un suivi généralisé.`,
      comments: [{
        isAuthorDeleted: true,
        content: `Impossible que ça marche. Lorsque le marcher de l'électricité a été ouvert à la concurrence, les prix ont augmenté et le service est de bien moindre qualité
        étant donné que plus rien n'est centralisé. Le service publique, ça coute moins chère, car il n'y a pas d'actionnaire à payer et pas de besoin de rentabilité.`
      }, {
        isAuthorDeleted: true,
        content: `Tous les organismes de retraite vienne d'augmenter leurs tarifs à l'annonce de cette nouvelle, prétendant que c'est pour assurer le service des futurs
        nouveaux clients. On parrit que le prix ne redescendra pas ?`
      }, {
        content: `Super ! Enfin, on va arrêter de prendre mon argent pour financer la fin de vie des autres. Je ne travaille pas pour eux, mais pour moi.`
      }]
    }),
    new ArticlesServiceItem({
      id: 26,
      title: `Création d'un indicateur commercial`,
      content: `Pour la relance économique, il faut consommer plus. Cela passe par acheter plus mais aussi utiliser plus d'énergie.
      Les différents gouvernements qui ont précédé l'actuel ont instauré de nombreux systèmes pour faire culpabiliser la population lors de leurs achats.
      C'est pour cela que les logos écologiques et énergétiques seront supprimés, par exemple sur les réfrégirateurs, et sera maintenant obligatoire d'apposer,
      sur tout produit, le logo fair-economy.
      
      Ce nouveau logo permet, en un coup d'oeil, de savoir si un produit est bénéfique à l'économie ou néfaste. Ainsi, si vous voyez une pastille verte,
      vous saurez que le produit que vous êtes sur le point d'acheter consommera beaucoup d'énergie et qu'il a nécessité de nombreux autres produits et services pour
      sa fabrication.
      
      # Consommer plus c'est payer moins.
      En effet, si vous vous retrouvez à acheter un produit avec un pastille verte, certes, vous consommerez plus d'électricité, et donc, votre facture à la fin du
      mois sera plus importante, mais la retombée économique sera telle que vous gagnerez plus d'argent, et donc, proportionnellement à vos dépenses, cette augmentation
      de coût sera ressentit en réalité comme une diminution.
      
      Payez plus pour gagner plus.`
    }),
    new ArticlesServiceItem({
      id: 27,
      title: `Revalorisation du travail de policier`,
      content: `En ces temps de crise, le peuple peut avoir tendance à perdre de vue les objectifs du bien commun.
      Le gouvernement, lorsqu'il doit proposer une loi, s'appuit sur des experts et des conseillers, lui permettant de toujours toucher juste.
      Le peuple, quant à lui, ne possède pas de tels outils, ce qui peut engendrer des demandes et des critiques inapproriées, basées sur aucune réalité.
      Ces comportements déviants, souvent anti-capitalistes et terroristes du bien commun, peuvent avoir des conséquences majeures du l'économie.
      Cela peut aller jusqu'à bloquer le pays entier. Souvenez-vous des gilets jaunes.

      Le gouvernement a alors décidé de soutenir les protecteurs de la démocratie et les intérêts du plus grand nombre en renforçant le corps policier.
      De nouvaux outils seront mis à leur disposition ainsi que des primes de risques.
      
      Il n'y a pas de violence policière, contrairement au fantasme de certains. Il n'y a qu'une action face à des terroristes, qui cherchent à plonger le pays
      dans la peur du capitalisme.`,
      comments: [{
        isAuthorDeleted: true,
        content: `"Pas de violence policière", allez dire ça à mon oeil qui a été creuvé lorsque j'ai manifesté passifiquement, avec l'autorisation de la mairie,
        pour que je puisse avoir une retraite suffisante pour me loger et me nourir. Voilà la réponse que j'ai eu du gouvernement... Et après c'est nous les terroristes.
        Maintenant, j'ai peur d'aller manifester, comme la plupart des gens. Si ça ce n'est pas de la terreur... Les vrais terroristes ont gagnés, et ils ont été élus par
        le peuple.`
      }, {
        content: `Espérons que cela sera suffisant pour faire sortir les jeunes de cité de leurs trafiques de drogues pour enfin trouver un vrai travaille.`,
        replies: [{
          content: `Je suis ce que vous appelez un jeune de cité, et je cherche activement un travail, mais, vu ma couleur de peau, mon accent et mon adresse, toutes les
          entreprises ont peur de m'embaucher. Du coup, impossible de trouver un travail, mais, en attendant, j'ai un loyer à payer et de la nourriture à acheter.
          Je fais comment, moi ? Les seuls qui ne discréminent pas au recrutement sont ceux qui vendent de la drogue... Maintenant, à qui la faute s'il y a des
          vendeurs de drogues ?`
        }]
      }]
    }),
    /*
    new ArticlesServiceItem({
      id: 0,
      title: ``,
      contentHtml: ``
    }),
    */
  ]

  public readonly orderes: number[] = [
    27,
    2,
    3,

  ]

  public get orderedAricles() {
    return this.orderes
      .map(id => this.articles.find(a => a.info.id === id))
      .filter(a => a);
  }
}
