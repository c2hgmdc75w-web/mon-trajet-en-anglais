/* ============================================================
   NIVEAU 2 — MODULE 3 "Conversation sociale"
   200 phrases, 20 leçons, 5 points de grammaire.
   À insérer dans data.js, puis remplacer dans LEVEL2_MODULES :
   { id:3, name:"Conversation sociale", desc:"...", totalPhrases:200, lessonsCount:20,
     lessons: level2Module3Lessons }
   ============================================================ */

const level2Module3Lessons = [
  { title:"Aborder un inconnu lors d'un événement", phrases:[
    {fr:"Je ne crois pas qu'on se soit déjà rencontrés.", en:"I don't think we've met before."},
    {fr:"Ça ne vous dérange pas si je me joins à vous ?", en:"Would you mind if I joined you?"},
    {fr:"Qu'est-ce qui vous amène à cet événement ?", en:"What brings you to this event?"},
    {fr:"Vous aimeriez peut-être qu'on échange nos coordonnées ?", en:"Would you like to exchange contact details, maybe?"},
    {fr:"J'aimerais bien en savoir plus sur ce que vous faites.", en:"I'd like to hear more about what you do."},
    {fr:"Vous voudriez boire quelque chose pendant qu'on discute ?", en:"Would you like something to drink while we talk?"},
    {fr:"Ça vous dirait de continuer cette conversation autour d'un café ?", en:"Would you like to continue this conversation over coffee?"},
    {fr:"J'aimerais vraiment rester en contact.", en:"I'd really like to stay in touch."},
    {fr:"Vous aimeriez qu'on se revoie la semaine prochaine ?", en:"Would you like us to meet again next week?"},
    {fr:"Ravi d'avoir fait votre connaissance.", en:"It was great meeting you."}
  ], tip:{
    title:"« Would like to » pour proposer poliment",
    example:"Vous aimeriez qu'on échange nos coordonnées ? — Would <b>you like to</b> exchange contact details?",
    body:"« Would like to » (suivi d'un verbe à l'infinitif) est une façon polie d'exprimer un souhait ou de faire une proposition, plus douce que « want to » : « I would like to help » sonne plus courtois que « I want to help ». On le contracte souvent à l'oral : « I'd like to »."
  }},
  { title:"Donner son avis sur un sujet léger", phrases:[
    {fr:"À mon avis, les séries sont souvent mieux que les films en ce moment.", en:"In my opinion, TV shows are often better than movies these days."},
    {fr:"Je pense que les réseaux sociaux ont du bon et du moins bon.", en:"I think social media has both good and bad sides."},
    {fr:"Personnellement, je trouve ça plutôt positif.", en:"Personally, I find it rather positive."},
    {fr:"Je ne suis pas vraiment d'accord avec toi sur ce point.", en:"I don't really agree with you on that."},
    {fr:"Moi aussi, je pense que c'est une bonne idée.", en:"I think it's a good idea too."},
    {fr:"Moi non plus, je n'aime pas vraiment ça.", en:"I don't really like it either."},
    {fr:"C'est intéressant, je n'avais jamais vu les choses comme ça.", en:"That's interesting, I'd never looked at it that way."},
    {fr:"Chacun son avis, je suppose.", en:"To each their own, I guess."},
    {fr:"Tu as peut-être raison, finalement.", en:"You might be right, after all."},
    {fr:"On pourrait en débattre pendant des heures.", en:"We could debate this for hours."}
  ], tip:{
    title:"« So do I » et « Neither do I »",
    example:"Moi aussi, je pense que c'est une bonne idée. — I think it's a good idea too. / <b>So do I</b>.",
    body:"Pour dire « moi aussi » après une phrase affirmative, on utilise « So + auxiliaire + sujet » : « So do I », « So am I ». Pour dire « moi non plus » après une phrase négative, on utilise « Neither + auxiliaire + sujet » : « Neither do I », « Neither am I »."
  }},
  { title:"Parler de ses habitudes du matin", phrases:[
    {fr:"Je me lève généralement vers sept heures.", en:"I usually get up around seven."},
    {fr:"Le weekend, j'ai tendance à faire la grasse matinée.", en:"On weekends, I tend to sleep in."},
    {fr:"Je ne peux pas commencer ma journée sans un café.", en:"I can't start my day without a coffee."},
    {fr:"Certaines personnes sont du matin, d'autres pas du tout.", en:"Some people are morning people, others aren't at all."},
    {fr:"Je préfère me lever tôt pour avoir du temps pour moi.", en:"I prefer getting up early to have some time for myself."},
    {fr:"Mes habitudes ont beaucoup changé depuis que je travaille de chez moi.", en:"My habits have changed a lot since I started working from home."},
    {fr:"Je mets toujours plusieurs alarmes, juste au cas où.", en:"I always set several alarms, just in case."},
    {fr:"Rien ne vaut un bon petit-déjeuner pour bien commencer.", en:"Nothing beats a good breakfast to start the day right."},
    {fr:"Tu es plutôt du matin ou du soir ?", en:"Are you more of a morning person or an evening person?"},
    {fr:"Chacun son rythme, après tout.", en:"Everyone has their own rhythm, after all."}
  ]},
  { title:"Proposer son aide", phrases:[
    {fr:"Tu veux un coup de main pour porter ça ?", en:"Do you want a hand carrying that?"},
    {fr:"N'hésite pas à me demander si tu as besoin de quoi que ce soit.", en:"Don't hesitate to ask me if you need anything."},
    {fr:"Je peux rester un peu plus tard si ça peut aider.", en:"I can stay a bit later if that would help."},
    {fr:"Laisse-moi t'aider, ça ira plus vite à deux.", en:"Let me help you, it'll be quicker with two of us."},
    {fr:"Préviens-moi si jamais la situation change.", en:"Let me know if the situation changes at all."},
    {fr:"C'est vraiment gentil, mais ça va aller, merci.", en:"That's really kind, but I'll manage, thanks."},
    {fr:"Je serais ravi de t'accompagner si tu veux.", en:"I'd be happy to go with you if you want."},
    {fr:"Appelle-moi dès que tu en as besoin.", en:"Call me as soon as you need to."},
    {fr:"C'est toujours agréable de pouvoir compter sur quelqu'un.", en:"It's always nice to be able to count on someone."},
    {fr:"Merci infiniment, ça me touche beaucoup.", en:"Thank you so much, that really means a lot to me."}
  ]},
  { title:"Exprimer un désaccord avec tact", phrases:[
    {fr:"Je vois ce que tu veux dire, mais je ne suis pas totalement d'accord.", en:"I see what you mean, but I don't totally agree."},
    {fr:"C'est un bon point, même si je le vois un peu différemment.", en:"That's a good point, even though I see it a bit differently."},
    {fr:"Je comprends ta position, mais laisse-moi t'expliquer la mienne.", en:"I understand your position, but let me explain mine."},
    {fr:"Ce n'est peut-être pas tout à fait ce que je pense.", en:"That's maybe not quite what I think."},
    {fr:"On pourrait voir les choses sous un autre angle.", en:"We could look at this from another angle."},
    {fr:"Je ne veux pas te contredire, mais j'ai un avis un peu différent.", en:"I don't want to contradict you, but I have a slightly different view."},
    {fr:"Chacun a le droit d'avoir son opinion, après tout.", en:"Everyone has the right to their own opinion, after all."},
    {fr:"On n'est pas obligés d'être d'accord sur tout.", en:"We don't have to agree on everything."},
    {fr:"Je respecte totalement ton point de vue.", en:"I completely respect your point of view."},
    {fr:"On en reparlera une autre fois, ça ne presse pas.", en:"We'll talk about it again another time, there's no rush."}
  ]},
  { title:"Parler de ses souvenirs d'enfance", phrases:[
    {fr:"Quand j'étais petit, on passait tous les étés chez mes grands-parents.", en:"When I was little, we used to spend every summer at my grandparents' house."},
    {fr:"Je me souviens encore très bien de cette odeur.", en:"I still remember that smell very well."},
    {fr:"On avait l'habitude de jouer dehors jusqu'à la tombée de la nuit.", en:"We used to play outside until nightfall."},
    {fr:"Ma grand-mère me racontait toujours la même histoire avant de dormir.", en:"My grandmother always used to tell me the same story before bed."},
    {fr:"Ça me manque, cette époque sans trop de soucis.", en:"I miss that time, with so few worries."},
    {fr:"Je revois encore très clairement cette maison dans ma tête.", en:"I can still picture that house very clearly in my mind."},
    {fr:"On n'avait pas grand-chose, mais on était heureux.", en:"We didn't have much, but we were happy."},
    {fr:"Certains souvenirs restent gravés pour toujours.", en:"Some memories stay with you forever."},
    {fr:"J'aimerais que mes enfants vivent des souvenirs aussi forts.", en:"I'd like my children to have memories just as strong."},
    {fr:"Repenser à tout ça me rend vraiment nostalgique.", en:"Thinking back on all that makes me really nostalgic."}
  ], tip:{
    title:"« Used to » pour les habitudes passées (rappel approfondi)",
    example:"On avait l'habitude de jouer dehors jusqu'à la tombée de la nuit. — We <b>used to</b> play outside until nightfall.",
    body:"« Used to » + verbe à l'infinitif décrit une habitude ou un état du passé qui n'est plus vrai aujourd'hui. Attention à ne pas confondre avec « to be used to » (être habitué à) + verbe en -ing, qui a un sens différent : « I used to live there » (j'y vivais avant) vs « I'm used to living there » (j'ai l'habitude d'y vivre)."
  }},
  { title:"Discuter des réseaux sociaux", phrases:[
    {fr:"Je passe sans doute un peu trop de temps sur mon téléphone.", en:"I probably spend a little too much time on my phone."},
    {fr:"Ça pourrait bien m'aider à rester en contact avec des gens que j'ai perdus de vue.", en:"It could well help me stay in touch with people I've lost touch with."},
    {fr:"Il se pourrait que je ferme mon compte un de ces jours.", en:"I might close my account one of these days."},
    {fr:"Certaines personnes pourraient se sentir dépassées par toutes ces notifications.", en:"Some people might feel overwhelmed by all these notifications."},
    {fr:"Ça pourrait avoir du bon, si on l'utilise avec modération.", en:"It could be a good thing, if used in moderation."},
    {fr:"Il se peut que je sois un peu trop connecté, pour être honnête.", en:"I might be a bit too connected, to be honest."},
    {fr:"Ça pourrait changer complètement la façon dont les gens communiquent.", en:"It could completely change the way people communicate."},
    {fr:"On pourrait bien finir par passer plus de temps en ligne qu'en vrai.", en:"We might well end up spending more time online than in person."},
    {fr:"Ça pourrait valoir le coup de faire une pause de temps en temps.", en:"It might be worth taking a break from time to time."},
    {fr:"Qui sait ce que ça deviendra dans dix ans.", en:"Who knows what it will become in ten years."}
  ], tip:{
    title:"« Might » et « could » pour la possibilité",
    example:"Il se pourrait que je ferme mon compte. — I <b>might</b> close my account.",
    body:"« Might » et « could » expriment une possibilité, quelque chose qui pourrait arriver sans certitude : « It might rain », « She could be right ». Ils sont suivis du verbe à l'infinitif sans « to » et sont plus hésitants que « will »."
  }},
  { title:"Parler de ses objectifs personnels", phrases:[
    {fr:"Mon objectif cette année est d'apprendre une nouvelle langue.", en:"My goal this year is to learn a new language."},
    {fr:"Je me suis fixé des étapes plus petites pour y arriver.", en:"I've set myself smaller steps to get there."},
    {fr:"Ce n'est pas facile de rester motivé sur le long terme.", en:"It's not easy to stay motivated in the long run."},
    {fr:"J'essaie de faire un petit progrès chaque jour.", en:"I try to make a small bit of progress every day."},
    {fr:"Parfois, je doute un peu de moi-même.", en:"Sometimes, I doubt myself a little."},
    {fr:"Mais je continue, même quand c'est difficile.", en:"But I keep going, even when it's hard."},
    {fr:"Avoir un objectif clair m'aide vraiment à avancer.", en:"Having a clear goal really helps me move forward."},
    {fr:"J'aime bien célébrer les petites victoires au passage.", en:"I like celebrating small wins along the way."},
    {fr:"Ce qui compte, c'est de ne jamais abandonner complètement.", en:"What matters is never giving up completely."},
    {fr:"Dans un an, j'espère pouvoir regarder en arrière avec fierté.", en:"In a year, I hope to be able to look back with pride."}
  ]},
  { title:"Faire un compliment et y répondre", phrases:[
    {fr:"J'adore vraiment la façon dont tu as organisé tout ça.", en:"I really love the way you organised all of this."},
    {fr:"Tu as fait un travail remarquable, honnêtement.", en:"You did a remarkable job, honestly."},
    {fr:"Oh, c'est gentil, merci beaucoup.", en:"Oh, that's kind, thank you very much."},
    {fr:"Ça me touche que tu l'aies remarqué.", en:"It means a lot that you noticed."},
    {fr:"Tu mérites vraiment ce compliment.", en:"You really deserve that compliment."},
    {fr:"J'ai beaucoup appris en travaillant avec toi sur ce projet.", en:"I learned a lot working with you on this project."},
    {fr:"C'est toi qui as fait le plus gros du travail, en réalité.", en:"You actually did most of the work, really."},
    {fr:"On forme une bonne équipe, je trouve.", en:"We make a good team, I think."},
    {fr:"Merci, venant de toi, ça compte double.", en:"Thanks, coming from you, that means double."},
    {fr:"J'espère qu'on retravaillera ensemble bientôt.", en:"I hope we'll work together again soon."}
  ]},
  { title:"Discuter d'un livre ou d'un film récent", phrases:[
    {fr:"Tu as lu quelque chose d'intéressant dernièrement ?", en:"Have you read anything interesting lately?"},
    {fr:"L'histoire m'a complètement surpris, je ne m'attendais pas à cette fin.", en:"The story completely surprised me, I wasn't expecting that ending."},
    {fr:"Les personnages sont vraiment bien écrits, à mon avis.", en:"The characters are really well written, in my opinion."},
    {fr:"Je n'ai pas réussi à le lâcher avant de l'avoir fini.", en:"I couldn't put it down until I finished it."},
    {fr:"Le film était bien, mais le livre est encore meilleur.", en:"The film was good, but the book is even better."},
    {fr:"Je te le recommande vraiment si tu as un peu de temps.", en:"I'd really recommend it if you have a bit of time."},
    {fr:"Ce n'est pas vraiment mon genre d'habitude, mais j'ai adoré.", en:"It's not usually my kind of thing, but I loved it."},
    {fr:"La fin m'a un peu déçu, pour être honnête.", en:"The ending disappointed me a bit, to be honest."},
    {fr:"Tu devrais vraiment y jeter un œil.", en:"You should really check it out."},
    {fr:"On pourrait en discuter davantage autour d'un café.", en:"We could talk about it more over coffee."}
  ]},
  { title:"Organiser une sortie entre amis", phrases:[
    {fr:"Ça vous dirait de se retrouver ce weekend ?", en:"Would you fancy meeting up this weekend?"},
    {fr:"On pourrait essayer ce nouveau restaurant dont tout le monde parle.", en:"We could try that new restaurant everyone's talking about."},
    {fr:"Samedi m'arrange mieux que dimanche, personnellement.", en:"Saturday suits me better than Sunday, personally."},
    {fr:"Est-ce que ça convient à tout le monde ?", en:"Does that work for everyone?"},
    {fr:"On peut toujours changer de date si besoin.", en:"We can always change the date if needed."},
    {fr:"Je vais prévenir les autres pour voir ce qu'ils en pensent.", en:"I'll let the others know to see what they think."},
    {fr:"On se retrouve directement là-bas ou on part ensemble ?", en:"Shall we meet there directly or go together?"},
    {fr:"N'oublie pas de nous confirmer ta présence.", en:"Don't forget to confirm you'll be there."},
    {fr:"J'ai vraiment hâte qu'on se retrouve tous.", en:"I'm really looking forward to us all getting together."},
    {fr:"Ça fait trop longtemps qu'on ne s'est pas tous vus.", en:"It's been far too long since we've all seen each other."}
  ]},
  { title:"Gérer un petit malentendu", phrases:[
    {fr:"Je crois qu'il y a eu un malentendu entre nous.", en:"I think there's been a misunderstanding between us."},
    {fr:"Ce n'est pas du tout ce que je voulais dire.", en:"That's not at all what I meant."},
    {fr:"Désolé si ça a pu sembler blessant, ce n'était pas mon intention.", en:"Sorry if that sounded hurtful, that wasn't my intention."},
    {fr:"Peut-être que je me suis mal exprimé.", en:"Maybe I expressed myself badly."},
    {fr:"Je pense qu'on a juste mal interprété les mots de l'autre.", en:"I think we just misread each other's words."},
    {fr:"Parlons-en calmement, ça vaut mieux.", en:"Let's talk about it calmly, that's for the best."},
    {fr:"Je ne t'en veux absolument pas, ne t'inquiète pas.", en:"I'm not at all upset with you, don't worry."},
    {fr:"Ça arrive à tout le monde de mal se comprendre parfois.", en:"It happens to everyone to misunderstand each other sometimes."},
    {fr:"Content qu'on ait pu clarifier tout ça.", en:"Glad we could clear all of this up."},
    {fr:"Ça nous rapproche, en fin de compte.", en:"It actually brings us closer, in the end."}
  ]},
  { title:"Parler de ses traditions familiales", phrases:[
    {fr:"Chez nous, on se réunit toujours en famille le dimanche.", en:"In our family, we always get together on Sundays."},
    {fr:"Cette tradition se transmet depuis plusieurs générations.", en:"This tradition has been passed down for several generations."},
    {fr:"Chaque famille a ses propres petites habitudes.", en:"Every family has its own little habits."},
    {fr:"On prépare toujours le même plat pour les grandes occasions.", en:"We always make the same dish for big occasions."},
    {fr:"Ça me rappelle beaucoup de souvenirs d'enfance.", en:"It brings back a lot of childhood memories."},
    {fr:"J'espère pouvoir continuer cette tradition avec mes propres enfants.", en:"I hope to be able to continue this tradition with my own children."},
    {fr:"Certaines traditions évoluent un peu au fil du temps.", en:"Some traditions change a little over time."},
    {fr:"C'est ce genre de moment qui rapproche vraiment une famille.", en:"It's this kind of moment that really brings a family together."},
    {fr:"Vous avez des traditions particulières, dans votre famille ?", en:"Do you have any particular traditions in your family?"},
    {fr:"J'adorerais en apprendre davantage sur les vôtres.", en:"I'd love to learn more about yours."}
  ]},
  { title:"Reprendre contact après longtemps", phrases:[
    {fr:"Ça fait une éternité qu'on ne s'est pas parlé !", en:"It's been ages since we last spoke!"},
    {fr:"Qu'est-ce que tu deviens depuis tout ce temps ?", en:"What have you been up to all this time?"},
    {fr:"Je pensais justement à toi l'autre jour.", en:"I was actually thinking about you the other day."},
    {fr:"Tellement de choses ont changé depuis la dernière fois.", en:"So much has changed since last time."},
    {fr:"Il faut vraiment qu'on se raconte tout ça en détail.", en:"We really need to catch up on everything in detail."},
    {fr:"On devrait essayer de se voir plus souvent, maintenant.", en:"We should try to see each other more often now."},
    {fr:"Le temps passe tellement vite, c'est fou.", en:"Time goes by so fast, it's crazy."},
    {fr:"Ça me fait vraiment plaisir d'avoir de tes nouvelles.", en:"It's really great to hear from you."},
    {fr:"On ne devrait plus jamais se perdre de vue comme ça.", en:"We should never lose touch like that again."},
    {fr:"Vivement notre prochaine rencontre.", en:"Looking forward to our next meeting."}
  ]},
  { title:"Exprimer sa gratitude", phrases:[
    {fr:"Je ne sais vraiment pas comment te remercier.", en:"I really don't know how to thank you."},
    {fr:"Ça a énormément compté pour moi, ce que tu as fait.", en:"What you did meant an enormous amount to me."},
    {fr:"Je suis profondément reconnaissant pour ton soutien.", en:"I'm deeply grateful for your support."},
    {fr:"Sans toi, je n'y serais jamais arrivé.", en:"Without you, I would never have made it."},
    {fr:"Tu as toujours été là pour moi, et je ne l'oublie pas.", en:"You've always been there for me, and I don't forget that."},
    {fr:"Merci d'avoir pris le temps de m'écouter.", en:"Thank you for taking the time to listen to me."},
    {fr:"J'aimerais pouvoir te rendre la pareille un jour.", en:"I'd like to be able to return the favour one day."},
    {fr:"Ça me touche vraiment, plus que tu ne l'imagines.", en:"It really touches me, more than you can imagine."},
    {fr:"Je me sens vraiment chanceux de t'avoir dans ma vie.", en:"I feel really lucky to have you in my life."},
    {fr:"Merci du fond du cœur.", en:"Thank you from the bottom of my heart."}
  ]},
  { title:"Parler de ses animaux de compagnie", phrases:[
    {fr:"On a adopté notre chien il y a presque trois ans.", en:"We adopted our dog almost three years ago."},
    {fr:"Il nous a vraiment changé la vie, d'une belle façon.", en:"He really changed our lives, in a good way."},
    {fr:"Elle est un peu craintive avec les inconnus, au début.", en:"She's a bit shy with strangers, at first."},
    {fr:"Il faut sortir le chien matin et soir, sans exception.", en:"The dog needs to be walked morning and evening, without exception."},
    {fr:"Mon chat passe littéralement sa vie à dormir.", en:"My cat literally spends its life sleeping."},
    {fr:"Avoir un animal demande beaucoup de responsabilité.", en:"Having a pet requires a lot of responsibility."},
    {fr:"Il nous accueille toujours à la porte en rentrant.", en:"He always greets us at the door when we get home."},
    {fr:"Elle fait vraiment partie de la famille, à présent.", en:"She's really part of the family now."},
    {fr:"Je ne pourrais plus imaginer la maison sans lui.", en:"I couldn't imagine the house without him anymore."},
    {fr:"Les animaux apportent tellement de joie au quotidien.", en:"Pets bring so much joy to everyday life."}
  ]},
  { title:"Discuter d'un choix de carrière", phrases:[
    {fr:"Je réfléchis sérieusement à changer de métier.", en:"I'm seriously thinking about changing careers."},
    {fr:"Ce n'est pas une décision facile à prendre.", en:"It's not an easy decision to make."},
    {fr:"J'ai besoin de quelque chose qui ait plus de sens pour moi.", en:"I need something that feels more meaningful to me."},
    {fr:"Ma famille me soutient complètement dans ce choix.", en:"My family fully supports me in this choice."},
    {fr:"Ça implique pas mal de risques, je ne vais pas le nier.", en:"It involves quite a lot of risk, I won't deny it."},
    {fr:"Mais je pense que ça en vaut vraiment la peine.", en:"But I think it's really worth it."},
    {fr:"Certains de mes amis ont fait le même choix avant moi.", en:"Some of my friends made the same choice before me."},
    {fr:"Ils semblent beaucoup plus épanouis depuis.", en:"They seem a lot happier since then."},
    {fr:"J'ai encore besoin d'un peu de temps pour me décider.", en:"I still need a bit of time to decide."},
    {fr:"Quoi qu'il arrive, je sais que ça se passera bien.", en:"Whatever happens, I know it'll turn out fine."}
  ]},
  { title:"Faire la paix après une dispute", phrases:[
    {fr:"On a eu des mots un peu durs hier, je le regrette.", en:"We said some harsh things yesterday, I regret it."},
    {fr:"Je suis désolé pour ce que j'ai dit, ce n'était pas juste.", en:"I'm sorry for what I said, it wasn't fair."},
    {fr:"On était tous les deux fatigués, je crois.", en:"I think we were both tired."},
    {fr:"Ça ne vaut vraiment pas la peine de se fâcher pour ça.", en:"It's really not worth falling out over this."},
    {fr:"On devrait vraiment en reparler calmement.", en:"We should really talk about it calmly."},
    {fr:"J'aimerais qu'on tourne la page ensemble.", en:"I'd like us to move past this together."},
    {fr:"Notre amitié compte bien plus que cette dispute.", en:"Our friendship matters far more than this argument."},
    {fr:"Merci d'avoir fait le premier pas.", en:"Thank you for taking the first step."},
    {fr:"On en ressort même plus proches, je trouve.", en:"We actually come out of it even closer, I think."},
    {fr:"Content que tout soit rentré dans l'ordre.", en:"Glad everything is back to normal."}
  ]},
  { title:"Parler de l'avenir et de ses incertitudes", phrases:[
    {fr:"Je ne sais pas encore ce que je ferai dans cinq ans.", en:"I don't know yet what I'll be doing in five years."},
    {fr:"Est-ce que tu sais où tu aimerais vivre plus tard ?", en:"Do you know where you'd like to live later on?"},
    {fr:"Je me demande parfois si j'ai fait les bons choix.", en:"I sometimes wonder if I've made the right choices."},
    {fr:"Personne ne sait vraiment de quoi demain sera fait.", en:"Nobody really knows what tomorrow will bring."},
    {fr:"Pourrais-tu me dire ce que toi, tu envisages pour l'avenir ?", en:"Could you tell me what you're planning for the future?"},
    {fr:"L'incertitude peut faire peur, mais aussi être excitante.", en:"Uncertainty can be scary, but also exciting."},
    {fr:"Je ne sais pas si je dois suivre mon instinct ou être plus raisonnable.", en:"I don't know whether I should follow my instinct or be more sensible."},
    {fr:"On verra bien ce que la vie nous réserve.", en:"We'll just have to see what life has in store for us."},
    {fr:"J'essaie de rester ouvert à toutes les possibilités.", en:"I try to stay open to every possibility."},
    {fr:"Au fond, personne n'a vraiment toutes les réponses.", en:"Deep down, nobody really has all the answers."}
  ], tip:{
    title:"Les questions indirectes",
    example:"Pourrais-tu me dire ce que toi, tu envisages ? — Could you tell me what <b>you're planning</b>?",
    body:"Dans une question indirecte (introduite par « Do you know... », « Could you tell me... », « I wonder... »), l'ordre des mots redevient celui d'une phrase affirmative, sans inversion : on ne dit pas « Could you tell me what are you planning? » mais « Could you tell me what you are planning? »."
  }},
  { title:"Bilan du module conversation sociale", phrases:[
    {fr:"Ce module nous a appris à mieux exprimer nos émotions.", en:"This module taught us to better express our emotions."},
    {fr:"On sait désormais engager une conversation avec plus d'aisance.", en:"We can now start a conversation with more ease."},
    {fr:"Donner son avis, poliment, devient de plus en plus naturel.", en:"Giving your opinion politely is becoming more and more natural."},
    {fr:"Ces expressions seront utiles dans énormément de situations.", en:"These expressions will be useful in a huge number of situations."},
    {fr:"Chaque conversation est une occasion de progresser un peu plus.", en:"Every conversation is a chance to improve a little more."},
    {fr:"N'hésite pas à revenir sur ces leçons autant de fois que nécessaire.", en:"Don't hesitate to go back over these lessons as many times as needed."},
    {fr:"Tu as fait énormément de chemin depuis le début du niveau 2.", en:"You've come a very long way since the start of level 2."},
    {fr:"Bravo, tu as terminé le module « Conversation sociale » du niveau 2 !", en:"Well done, you've completed the level 2 \"Social conversation\" module!"},
    {fr:"Le niveau 2 est maintenant complet dans son intégralité.", en:"Level 2 is now entirely complete."},
    {fr:"On se retrouve bientôt pour la suite de l'aventure.", en:"See you again soon for the next part of the adventure."}
  ]}
];
