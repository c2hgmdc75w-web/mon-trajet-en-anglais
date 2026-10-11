/* ============================================================
   NIVEAU 3 — MODULE 1 "Le quotidien"
   200 phrases, 20 leçons, 5 points de grammaire.
   Niveau de langue plus avancé (B1-B2) : conditionnels, voix passive,
   present perfect continuous, phrasal verbs, regrets avec "wish".
   ============================================================ */

const level3Module1Lessons = [
  { title:"Passer un entretien d'embauche", phrases:[
    {fr:"Si j'avais plus d'expérience, je postulerais à des postes plus élevés.", en:"If I had more experience, I would apply for higher positions."},
    {fr:"Que ferais-tu si on t'offrait ce poste demain ?", en:"What would you do if you were offered this job tomorrow?"},
    {fr:"Si je décrochais cet emploi, je déménagerais sans hésiter.", en:"If I got this job, I would move without hesitation."},
    {fr:"On me poserait sûrement des questions sur mes points faibles.", en:"I would probably be asked about my weaknesses."},
    {fr:"Si j'étais le recruteur, je chercherais quelqu'un de motivé avant tout.", en:"If I were the recruiter, I would look for someone motivated above all."},
    {fr:"Je me sentirais plus confiant si j'avais mieux préparé mes réponses.", en:"I would feel more confident if I had prepared my answers better."},
    {fr:"S'ils me rappelaient aujourd'hui, je serais vraiment soulagé.", en:"If they called me back today, I would be really relieved."},
    {fr:"Je n'accepterais ce poste que si le salaire était correct.", en:"I wouldn't accept this position unless the salary was decent."},
    {fr:"Si on me demandait pourquoi ce poste m'intéresse, je saurais quoi répondre.", en:"If I were asked why this job interests me, I would know what to say."},
    {fr:"Avec un peu de chance, tout se passerait exactement comme prévu.", en:"With a bit of luck, everything would go exactly as planned."}
  ], tip:{
    title:"Le second conditionnel : if + prétérit, would",
    example:"Si j'avais plus d'expérience, je postulerais à des postes plus élevés. — <b>If</b> I <b>had</b> more experience, I <b>would apply</b> for higher positions.",
    body:"Le second conditionnel exprime une situation hypothétique ou peu probable dans le présent/futur. Structure : « if » + prétérit, puis « would » + verbe à l'infinitif. Contrairement au premier conditionnel (situation probable), celui-ci imagine un scénario : « If I won the lottery, I would travel the world »."
  }},
  { title:"Regretter une décision", phrases:[
    {fr:"J'aimerais avoir étudié une autre matière à l'université.", en:"I wish I had studied a different subject at university."},
    {fr:"Si seulement j'avais écouté mes parents à l'époque.", en:"I wish I had listened to my parents back then."},
    {fr:"Elle regrette de ne pas avoir voyagé plus jeune.", en:"She wishes she had travelled more when she was younger."},
    {fr:"J'aurais aimé prendre cette décision plus tôt.", en:"I wish I had made this decision earlier."},
    {fr:"Si seulement on avait su à quel point ce serait difficile.", en:"I wish we had known how difficult it would be."},
    {fr:"Il aimerait avoir accepté cette offre, maintenant qu'il y repense.", en:"He wishes he had accepted that offer, now that he thinks about it."},
    {fr:"J'aurais préféré ne jamais démissionner de ce poste.", en:"I wish I had never resigned from that position."},
    {fr:"On ne peut pas changer le passé, mais on peut en tirer des leçons.", en:"You can't change the past, but you can learn from it."},
    {fr:"Si seulement j'avais pris le temps d'y réfléchir davantage.", en:"I wish I had taken more time to think it through."},
    {fr:"Avec le recul, j'aurais fait les choses différemment.", en:"Looking back, I would have done things differently."}
  ], tip:{
    title:"« Wish » + past perfect pour exprimer un regret",
    example:"J'aimerais avoir étudié une autre matière. — I <b>wish</b> I <b>had studied</b> a different subject.",
    body:"Pour regretter quelque chose qui s'est passé (ou pas passé) dans le passé, on utilise « wish » + past perfect (had + participe passé) : « I wish I had known », « She wishes she hadn't said that ». C'est l'équivalent de « si seulement » en français."
  }},
  { title:"Gérer son budget", phrases:[
    {fr:"Nos dépenses sont suivies automatiquement par cette application.", en:"Our expenses are automatically tracked by this app."},
    {fr:"Le loyer est payé directement depuis mon compte chaque mois.", en:"The rent is paid directly from my account every month."},
    {fr:"Ce budget a été pensé pour durer toute l'année.", en:"This budget was designed to last the whole year."},
    {fr:"Les factures sont généralement envoyées en début de mois.", en:"Bills are usually sent out at the beginning of the month."},
    {fr:"Cet achat n'avait pas du tout été prévu dans le budget.", en:"This purchase hadn't been planned in the budget at all."},
    {fr:"Une partie de nos économies est investie chaque trimestre.", en:"Part of our savings is invested every quarter."},
    {fr:"Ce genre de dépense devrait toujours être évité si possible.", en:"This kind of expense should always be avoided if possible."},
    {fr:"Le compte a été vérifié deux fois avant d'être validé.", en:"The account was checked twice before being approved."},
    {fr:"Cette dette sera entièrement remboursée d'ici deux ans.", en:"This debt will be fully paid off within two years."},
    {fr:"Rien n'est laissé au hasard quand il s'agit d'argent.", en:"Nothing is left to chance when it comes to money."}
  ], tip:{
    title:"La voix passive au présent",
    example:"Nos dépenses sont suivies automatiquement par cette application. — Our expenses <b>are tracked</b> automatically by this app.",
    body:"La voix passive met l'accent sur l'action plutôt que sur qui l'accomplit. Structure : sujet + « to be » au présent + participe passé (+ « by » pour préciser l'auteur) : « The bills are sent », « The budget is checked by an accountant ». Très utilisée pour décrire des processus ou des règles."
  }},
  { title:"Rénover sa maison", phrases:[
    {fr:"On travaille sur ce projet de rénovation depuis plusieurs mois maintenant.", en:"We've been working on this renovation project for several months now."},
    {fr:"L'artisan répare la cuisine depuis le début de la semaine.", en:"The contractor has been fixing the kitchen since the start of the week."},
    {fr:"On attend la livraison des meubles depuis trois semaines.", en:"We've been waiting for the furniture delivery for three weeks."},
    {fr:"Je choisis les couleurs depuis des heures sans arriver à me décider.", en:"I've been choosing colours for hours without being able to decide."},
    {fr:"Les ouvriers travaillent sans interruption depuis ce matin.", en:"The workers have been working non-stop since this morning."},
    {fr:"On économise pour ces travaux depuis plus d'un an.", en:"We've been saving for this work for over a year."},
    {fr:"Le chantier traîne un peu plus que prévu, honnêtement.", en:"The building work has been dragging on a bit more than expected, honestly."},
    {fr:"On vit au milieu des cartons depuis le début des travaux.", en:"We've been living among boxes since the work started."},
    {fr:"Je rêve de cette nouvelle cuisine depuis si longtemps.", en:"I've been dreaming of this new kitchen for so long."},
    {fr:"Ça vaudra vraiment le coup, une fois terminé.", en:"It will really be worth it, once it's finished."}
  ], tip:{
    title:"Le present perfect continuous",
    example:"On travaille sur ce projet depuis plusieurs mois. — We <b>have been working</b> on this project for several months.",
    body:"Le present perfect continuous (have/has been + verbe en -ing) décrit une action commencée dans le passé et qui continue, ou vient tout juste de s'arrêter, en insistant sur sa durée. On l'utilise souvent avec « for » et « since » : « I've been waiting for an hour »."
  }},
  { title:"S'organiser au quotidien", phrases:[
    {fr:"Je n'arrive jamais à me débarrasser de mes vieux papiers.", en:"I can never get rid of my old papers."},
    {fr:"Il faut vraiment que je m'occupe de ce dossier aujourd'hui.", en:"I really need to deal with this file today."},
    {fr:"On a fini par se débrouiller sans aide extérieure.", en:"We ended up managing without any outside help."},
    {fr:"Je remets toujours ça à plus tard, c'est un vrai problème.", en:"I always put it off until later, it's a real problem."},
    {fr:"Il faut que je mette de côté un peu de temps chaque semaine.", en:"I need to set aside a bit of time each week."},
    {fr:"On s'y est enfin mis sérieusement ce weekend.", en:"We finally got down to it seriously this weekend."},
    {fr:"Je n'arrive pas à me motiver à ranger ce garage.", en:"I can't get myself motivated to tidy up this garage."},
    {fr:"Il a fallu que je m'en occupe moi-même, personne d'autre ne le ferait.", en:"I had to take care of it myself, no one else would."},
    {fr:"On finit toujours par trouver une solution, d'une manière ou d'une autre.", en:"We always end up finding a solution, one way or another."},
    {fr:"Ça fait du bien de se débarrasser de ce qu'on n'utilise plus.", en:"It feels good to get rid of what you no longer use."}
  ], tip:{
    title:"Les phrasal verbs du quotidien",
    example:"Je n'arrive jamais à me débarrasser de mes vieux papiers. — I can never <b>get rid of</b> my old papers.",
    body:"Les phrasal verbs (verbe + particule) sont essentiels à l'oral : « get rid of » (se débarrasser de), « put off » (reporter), « deal with » (s'occuper de), « get down to » (se mettre à), « end up » (finir par). Leur sens change souvent complètement selon la particule utilisée."
  }},
  { title:"Déclarer ses impôts", phrases:[
    {fr:"Ce formulaire doit être rempli avant la fin du mois.", en:"This form needs to be filled in before the end of the month."},
    {fr:"Si j'avais commencé plus tôt, je ne serais pas aussi stressé maintenant.", en:"If I had started earlier, I wouldn't be this stressed now."},
    {fr:"Certains documents sont encore demandés par l'administration.", en:"Some documents are still being requested by the authorities."},
    {fr:"J'aurais aimé comprendre ce système plus facilement.", en:"I wish I understood this system more easily."},
    {fr:"Ce genre de démarche est souvent compliqué sans aide.", en:"This kind of process is often complicated without help."},
    {fr:"On m'a recommandé de garder tous mes justificatifs.", en:"I was advised to keep all my receipts."},
    {fr:"Si tout était plus simple, les gens feraient moins d'erreurs.", en:"If everything were simpler, people would make fewer mistakes."},
    {fr:"Cette déclaration est vérifiée automatiquement par le système.", en:"This declaration is automatically checked by the system."},
    {fr:"Je m'en occupe depuis des heures et je ne suis toujours pas sûr.", en:"I've been dealing with it for hours and I'm still not sure."},
    {fr:"Au moins, c'est fait pour cette année.", en:"At least it's done for this year."}
  ]},
  { title:"Faire du bénévolat", phrases:[
    {fr:"Je me suis engagé dans cette association il y a deux ans.", en:"I got involved with this charity two years ago."},
    {fr:"On aide des familles dans le besoin chaque weekend.", en:"We help families in need every weekend."},
    {fr:"Ça m'apporte énormément, bien plus que je ne l'imaginais.", en:"It gives me so much, way more than I imagined."},
    {fr:"Les repas sont préparés par des bénévoles chaque matin.", en:"Meals are prepared by volunteers every morning."},
    {fr:"Si je n'avais pas essayé, je n'aurais jamais su à quel point ça me plairait.", en:"If I hadn't tried, I would never have known how much I'd enjoy it."},
    {fr:"On collecte des dons depuis le début de l'année.", en:"We've been collecting donations since the start of the year."},
    {fr:"J'aimerais avoir plus de temps libre à y consacrer.", en:"I wish I had more free time to dedicate to it."},
    {fr:"Chaque petit geste compte énormément pour ces familles.", en:"Every small gesture means a lot to these families."},
    {fr:"Je recommande vraiment à tout le monde d'essayer, au moins une fois.", en:"I really recommend everyone try it, at least once."},
    {fr:"Ça change complètement la façon dont on voit les choses.", en:"It completely changes the way you see things."}
  ]},
  { title:"Résoudre un conflit au travail", phrases:[
    {fr:"Si on en avait parlé plus tôt, ça ne serait jamais allé aussi loin.", en:"If we had talked about it earlier, it would never have gone this far."},
    {fr:"Cette décision a été prise sans qu'on soit consultés.", en:"This decision was made without us being consulted."},
    {fr:"J'aurais préféré être mis au courant avant tout le monde.", en:"I wish I had been informed before everyone else."},
    {fr:"On s'est finalement mis d'accord sur un compromis raisonnable.", en:"We eventually agreed on a reasonable compromise."},
    {fr:"Le malentendu a été réglé lors d'une réunion la semaine dernière.", en:"The misunderstanding was resolved during a meeting last week."},
    {fr:"Si j'étais toi, je laisserais tomber et passerais à autre chose.", en:"If I were you, I would let it go and move on."},
    {fr:"Cette tension est présente depuis plusieurs semaines maintenant.", en:"This tension has been present for several weeks now."},
    {fr:"J'aurais aimé que les choses se passent autrement.", en:"I wish things had gone differently."},
    {fr:"Au final, tout le monde a su rester professionnel.", en:"In the end, everyone managed to stay professional."},
    {fr:"On en est sortis plus soudés qu'avant, je trouve.", en:"We came out of it closer-knit than before, I think."}
  ]},
  { title:"Équilibrer vie professionnelle et personnelle", phrases:[
    {fr:"Je travaille depuis chez moi deux jours par semaine maintenant.", en:"I've been working from home two days a week now."},
    {fr:"Si j'avais su plus tôt à quel point c'était important, j'aurais changé bien avant.", en:"If I had known sooner how important it was, I would have changed much earlier."},
    {fr:"Mes horaires ont été aménagés par mon employeur.", en:"My schedule has been adjusted by my employer."},
    {fr:"On remarque enfin les effets positifs sur ma famille.", en:"We're finally noticing the positive effects on my family."},
    {fr:"J'aurais aimé apprendre à mieux déconnecter plus tôt dans ma carrière.", en:"I wish I had learned to disconnect better earlier in my career."},
    {fr:"Cette nouvelle organisation a été mise en place il y a trois mois.", en:"This new setup was put in place three months ago."},
    {fr:"Je laisse tomber mon téléphone professionnel le weekend, désormais.", en:"I now put down my work phone at weekends."},
    {fr:"Si ce changement n'avait pas eu lieu, je serais probablement épuisé aujourd'hui.", en:"If this change hadn't happened, I'd probably be exhausted today."},
    {fr:"On consacre vraiment plus de temps à ce qui compte.", en:"We really spend more time on what matters."},
    {fr:"Ce n'est jamais parfait, mais c'est bien mieux qu'avant.", en:"It's never perfect, but it's much better than before."}
  ]},
  { title:"Déménager dans une nouvelle ville", phrases:[
    {fr:"Si on n'avait pas pris ce risque, on ne l'aurait jamais su.", en:"If we hadn't taken that risk, we would never have known."},
    {fr:"Tous nos meubles ont été transportés par la même entreprise.", en:"All our furniture was moved by the same company."},
    {fr:"Je cherche un nouvel appartement depuis plus d'un mois.", en:"I've been looking for a new flat for over a month."},
    {fr:"J'aurais aimé connaître quelqu'un ici avant d'arriver.", en:"I wish I had known someone here before arriving."},
    {fr:"Cette ville a été entièrement transformée ces dernières années.", en:"This city has been completely transformed in recent years."},
    {fr:"Si tout se passe bien, on s'installera définitivement ici.", en:"If everything goes well, we'll settle here for good."},
    {fr:"On s'habitue petit à petit à ce nouveau rythme de vie.", en:"We're gradually getting used to this new pace of life."},
    {fr:"J'essaie de me faire de nouveaux amis depuis notre arrivée.", en:"I've been trying to make new friends since we arrived."},
    {fr:"Si j'avais hésité plus longtemps, l'opportunité serait passée.", en:"If I had hesitated any longer, the opportunity would have passed."},
    {fr:"Au final, on ne regrette absolument pas ce choix.", en:"In the end, we don't regret that choice at all."}
  ]},
  { title:"Apprendre une nouvelle compétence à l'âge adulte", phrases:[
    {fr:"Je prends des cours de poterie depuis le début de l'année.", en:"I've been taking pottery classes since the start of the year."},
    {fr:"Si j'avais commencé plus tôt, je serais sans doute bien meilleur aujourd'hui.", en:"If I had started earlier, I'd probably be much better by now."},
    {fr:"Cette compétence n'est jamais trop tard à apprendre, j'imagine.", en:"I guess this skill is never too late to learn."},
    {fr:"Mes progrès sont suivis chaque semaine par mon professeur.", en:"My progress is reviewed every week by my teacher."},
    {fr:"J'aurais aimé essayer ça il y a des années.", en:"I wish I had tried this years ago."},
    {fr:"On apprend énormément en se trompant, finalement.", en:"You actually learn a lot from making mistakes."},
    {fr:"Je m'entraîne depuis des semaines et je commence enfin à voir des résultats.", en:"I've been practising for weeks and I'm finally starting to see results."},
    {fr:"Si on ne sort jamais de sa zone de confort, on n'apprend jamais rien.", en:"If you never step outside your comfort zone, you never learn anything."},
    {fr:"Ça demande beaucoup de patience, mais ça en vaut la peine.", en:"It takes a lot of patience, but it's worth it."},
    {fr:"Je suis vraiment fier du chemin parcouru jusqu'ici.", en:"I'm really proud of how far I've come."}
  ]},
  { title:"Faire face à un voisin difficile", phrases:[
    {fr:"Ce bruit est entendu dans tout l'immeuble chaque soir.", en:"This noise is heard throughout the building every evening."},
    {fr:"Si j'avais su que ce serait si compliqué, j'aurais choisi un autre appartement.", en:"If I had known it would be this complicated, I would have chosen a different flat."},
    {fr:"On essaie de rester polis, même quand c'est difficile.", en:"We try to stay polite, even when it's hard."},
    {fr:"Cette situation a été signalée au syndic la semaine dernière.", en:"This situation was reported to the building manager last week."},
    {fr:"J'aurais préféré régler ça directement avec lui, sans tiers.", en:"I wish I had sorted it out directly with him, without a third party."},
    {fr:"On supporte ce bruit depuis plusieurs mois maintenant.", en:"We've been putting up with this noise for several months now."},
    {fr:"Si les choses ne changent pas, on devra agir autrement.", en:"If things don't change, we'll have to act differently."},
    {fr:"Une lettre officielle a finalement été envoyée par l'agence.", en:"An official letter was finally sent by the agency."},
    {fr:"On espère que ça va enfin se calmer un peu.", en:"We're hoping things will finally calm down a bit."},
    {fr:"Vivre en communauté demande parfois beaucoup de patience.", en:"Living in a community sometimes requires a lot of patience."}
  ]},
  { title:"Planifier un grand changement de vie", phrases:[
    {fr:"Si j'avais plus de certitudes, je me lancerais sans hésiter.", en:"If I had more certainty, I would go for it without hesitating."},
    {fr:"On y réfléchit sérieusement depuis le début de l'année.", en:"We've been seriously thinking about it since the start of the year."},
    {fr:"Ce genre de décision ne devrait jamais être prise à la légère.", en:"This kind of decision should never be taken lightly."},
    {fr:"J'aurais aimé avoir ce courage bien plus tôt dans ma vie.", en:"I wish I had had this courage much earlier in my life."},
    {fr:"Si tout se passe comme prévu, on changera complètement de vie l'année prochaine.", en:"If everything goes as planned, our lives will change completely next year."},
    {fr:"Cette opportunité ne sera peut-être jamais revue.", en:"This opportunity might never come around again."},
    {fr:"On en parle avec nos proches depuis des semaines.", en:"We've been talking about it with our loved ones for weeks."},
    {fr:"Si on ne tente rien, on ne saura jamais ce qu'on aurait pu accomplir.", en:"If we don't try anything, we'll never know what we could have achieved."},
    {fr:"Chaque grand changement a toujours commencé par une petite décision.", en:"Every big change has always started with one small decision."},
    {fr:"On a enfin décidé de sauter le pas.", en:"We've finally decided to take the plunge."}
  ]},
  { title:"Gérer le stress du quotidien", phrases:[
    {fr:"Je médite quelques minutes chaque matin depuis trois mois.", en:"I've been meditating for a few minutes every morning for three months."},
    {fr:"Si je n'avais pas appris à ralentir, je serais sans doute épuisé.", en:"If I hadn't learned to slow down, I'd probably be exhausted."},
    {fr:"Ces techniques de respiration m'ont été recommandées par un ami.", en:"These breathing techniques were recommended to me by a friend."},
    {fr:"J'aurais aimé découvrir ça bien plus tôt.", en:"I wish I had discovered this much earlier."},
    {fr:"On sous-estime souvent l'impact du stress sur la santé.", en:"We often underestimate the impact of stress on health."},
    {fr:"Je mets de côté un peu de temps pour moi chaque jour, désormais.", en:"I now set aside a bit of time for myself every day."},
    {fr:"Si j'avais continué comme avant, ça aurait fini par poser un vrai problème.", en:"If I had carried on like before, it would eventually have caused a real problem."},
    {fr:"Certaines habitudes ont été complètement changées cette année.", en:"Some habits have been completely changed this year."},
    {fr:"On apprend petit à petit à mieux gérer la pression.", en:"We're gradually learning to handle pressure better."},
    {fr:"Ça ne résout pas tout, mais ça aide vraiment énormément.", en:"It doesn't solve everything, but it really helps a lot."}
  ]},
  { title:"Transmettre une compétence à quelqu'un", phrases:[
    {fr:"J'apprends à mon neveu à cuisiner depuis cet été.", en:"I've been teaching my nephew to cook since this summer."},
    {fr:"Si j'avais eu ce mentor plus tôt, j'aurais progressé bien plus vite.", en:"If I had had this mentor earlier, I would have progressed much faster."},
    {fr:"Chaque erreur est expliquée calmement, sans jamais juger.", en:"Every mistake is explained calmly, without ever judging."},
    {fr:"J'aurais aimé avoir quelqu'un pour me guider à son âge.", en:"I wish I had had someone to guide me at his age."},
    {fr:"On apprend souvent autant en enseignant qu'en étant enseigné.", en:"You often learn as much by teaching as by being taught."},
    {fr:"Cette patience a été cultivée au fil de nombreuses années.", en:"This patience was cultivated over many years."},
    {fr:"Si je n'expliquais pas les choses clairement, il se découragerait vite.", en:"If I didn't explain things clearly, he would get discouraged quickly."},
    {fr:"Voir ses progrès me rend vraiment fier.", en:"Seeing his progress really makes me proud."},
    {fr:"Transmettre ce qu'on sait, c'est aussi une façon de le faire perdurer.", en:"Passing on what you know is also a way of keeping it alive."},
    {fr:"J'espère qu'il transmettra ça à son tour, un jour.", en:"I hope he'll pass it on in turn, one day."}
  ]},
  { title:"Faire face à une démarche administrative", phrases:[
    {fr:"Ce document doit être signé en présence d'un officiel.", en:"This document needs to be signed in the presence of an official."},
    {fr:"Si j'avais apporté tous les papiers du premier coup, ça aurait été réglé plus vite.", en:"If I had brought all the papers the first time, it would have been sorted out faster."},
    {fr:"On m'a demandé de revenir avec une pièce d'identité supplémentaire.", en:"I was asked to come back with an extra piece of ID."},
    {fr:"J'aurais préféré faire tout ça en ligne, franchement.", en:"I wish I could have done all this online, honestly."},
    {fr:"Cette demande est traitée généralement sous quinze jours.", en:"This request is usually processed within two weeks."},
    {fr:"On attend une réponse depuis presque un mois maintenant.", en:"We've been waiting for a response for almost a month now."},
    {fr:"Si le système était plus simple, tout le monde gagnerait du temps.", en:"If the system were simpler, everyone would save time."},
    {fr:"Le dossier a finalement été approuvé hier après-midi.", en:"The file was finally approved yesterday afternoon."},
    {fr:"Quel soulagement d'en avoir enfin terminé avec tout ça.", en:"What a relief to finally be done with all of this."},
    {fr:"On ne réalise jamais à quel point c'est compliqué avant de le vivre.", en:"You never realise how complicated it is until you go through it."}
  ]},
  { title:"Repenser ses habitudes de consommation", phrases:[
    {fr:"J'achète beaucoup moins d'objets neufs depuis l'année dernière.", en:"I've been buying far fewer new items since last year."},
    {fr:"Si j'avais réfléchi avant, j'aurais économisé beaucoup d'argent.", en:"If I had thought about it beforehand, I would have saved a lot of money."},
    {fr:"La plupart de mes vêtements sont désormais achetés d'occasion.", en:"Most of my clothes are now bought second-hand."},
    {fr:"J'aurais aimé adopter ces habitudes bien plus tôt.", en:"I wish I had adopted these habits much earlier."},
    {fr:"On réfléchit à deux fois avant chaque achat, maintenant.", en:"We think twice before every purchase now."},
    {fr:"Cette évolution a été progressive, pas du jour au lendemain.", en:"This change has been gradual, not overnight."},
    {fr:"Si tout le monde faisait un petit effort, ça changerait beaucoup de choses.", en:"If everyone made a small effort, it would change a lot of things."},
    {fr:"On se sent beaucoup plus légers depuis qu'on a moins d'objets.", en:"We feel much lighter since we have fewer belongings."},
    {fr:"Ce changement a aussi eu un bon impact sur notre budget.", en:"This change has also had a good impact on our budget."},
    {fr:"On ne reviendrait pas en arrière pour rien au monde.", en:"We wouldn't go back for anything in the world."}
  ]},
  { title:"Négocier une augmentation", phrases:[
    {fr:"Si je n'avais jamais demandé, je n'aurais jamais rien obtenu.", en:"If I had never asked, I would never have got anything."},
    {fr:"Ce chiffre a été calculé en fonction de mes résultats cette année.", en:"This figure was calculated based on my results this year."},
    {fr:"J'aurais aimé aborder ce sujet bien plus tôt avec mon manager.", en:"I wish I had brought this up with my manager much earlier."},
    {fr:"On m'a conseillé de préparer des exemples concrets avant d'y aller.", en:"I was advised to prepare concrete examples before going in."},
    {fr:"Si je n'obtiens pas de réponse claire, je reviendrai à la charge plus tard.", en:"If I don't get a clear answer, I'll bring it up again later."},
    {fr:"Cette demande a été prise très au sérieux par la direction.", en:"This request was taken very seriously by management."},
    {fr:"J'ai préparé cet entretien depuis plusieurs semaines.", en:"I've been preparing for this meeting for several weeks."},
    {fr:"Si j'avais plus confiance en moi, ce serait sans doute plus simple.", en:"If I had more confidence in myself, it would probably be easier."},
    {fr:"On m'a enfin proposé une augmentation correcte.", en:"I was finally offered a decent raise."},
    {fr:"Tout ce travail de préparation a fini par payer.", en:"All that preparation work finally paid off."}
  ]},
  { title:"S'adapter à un nouvel outil au travail", phrases:[
    {fr:"Ce logiciel est utilisé par toute l'équipe depuis le mois dernier.", en:"This software has been used by the whole team since last month."},
    {fr:"Si on nous avait mieux formés, la transition aurait été plus simple.", en:"If we had been better trained, the transition would have been easier."},
    {fr:"J'apprends encore de nouvelles fonctionnalités chaque semaine.", en:"I'm still learning new features every week."},
    {fr:"J'aurais aimé avoir ce genre d'outil bien plus tôt dans ma carrière.", en:"I wish I had had this kind of tool much earlier in my career."},
    {fr:"Toutes les données ont été transférées sans aucun problème.", en:"All the data was transferred without any problems."},
    {fr:"Si quelque chose ne fonctionne pas, le support technique est très réactif.", en:"If something doesn't work, technical support is very responsive."},
    {fr:"On s'habitue petit à petit à cette nouvelle façon de travailler.", en:"We're gradually getting used to this new way of working."},
    {fr:"Ça nous fait gagner un temps précieux chaque jour, en réalité.", en:"It actually saves us valuable time every day."},
    {fr:"Certains collègues ont eu plus de mal à s'y habituer que d'autres.", en:"Some colleagues found it harder to adapt than others."},
    {fr:"Avec le recul, ce changement était vraiment nécessaire.", en:"Looking back, this change was really necessary."}
  ]},
  { title:"Bilan du module quotidien, niveau 3", phrases:[
    {fr:"Ce module nous a appris à parler de situations bien plus nuancées.", en:"This module taught us to talk about much more nuanced situations."},
    {fr:"On sait désormais exprimer des regrets et des hypothèses avec aisance.", en:"We can now express regrets and hypotheses with ease."},
    {fr:"Ces structures demandent de la pratique, mais deviennent vite naturelles.", en:"These structures take practice, but quickly become natural."},
    {fr:"Chaque situation du quotidien devient une occasion de progresser.", en:"Every everyday situation becomes a chance to improve."},
    {fr:"Si tu es arrivé jusqu'ici, c'est que tu as fait d'énormes progrès.", en:"If you've made it this far, it's because you've made huge progress."},
    {fr:"N'hésite pas à revenir sur ces leçons autant que nécessaire.", en:"Don't hesitate to go back over these lessons as much as needed."},
    {fr:"Le niveau 3 commence vraiment à ressembler à de l'anglais courant.", en:"Level 3 is really starting to feel like fluent English."},
    {fr:"Bravo, tu as terminé le module « Le quotidien » du niveau 3 !", en:"Well done, you've completed the level 3 \"Everyday life\" module!"},
    {fr:"Deux autres modules t'attendent pour continuer sur ta lancée.", en:"Two more modules are waiting for you to keep up the momentum."},
    {fr:"On se retrouve très vite pour la suite.", en:"See you again very soon for what comes next."}
  ]}
];
