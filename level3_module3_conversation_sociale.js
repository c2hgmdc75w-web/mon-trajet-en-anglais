/* ============================================================
   NIVEAU 3 — MODULE 3 "Conversation sociale"
   200 phrases, 20 leçons, 5 points de grammaire.
   Niveau avancé (B1-B2) : subjonctif anglais, inversion conditionnelle,
   "having" + participe passé, "it is said that", nuances modales.
   ============================================================ */

const level3Module3Lessons = [
  { title:"Donner un conseil avec nuance", phrases:[
    {fr:"Je suggère qu'elle réfléchisse encore un peu avant de décider.", en:"I suggest that she think it over a bit more before deciding."},
    {fr:"Il est important que chacun donne son avis librement.", en:"It's important that everyone give their opinion freely."},
    {fr:"Je recommande qu'il prenne un peu de recul sur la situation.", en:"I recommend that he take a step back from the situation."},
    {fr:"Il serait préférable qu'elle en parle directement avec lui.", en:"It would be better if she talked to him directly about it."},
    {fr:"On a proposé qu'il attende encore une semaine avant d'agir.", en:"It was proposed that he wait another week before acting."},
    {fr:"Je conseillerais qu'on évite ce sujet pour l'instant.", en:"I would advise that we avoid this topic for now."},
    {fr:"Il vaudrait mieux que tout le monde soit présent à cette réunion.", en:"It would be better if everyone were present at this meeting."},
    {fr:"Je préférerais qu'elle vienne me voir avant de prendre une décision.", en:"I would prefer that she come see me before making a decision."},
    {fr:"Il est essentiel que ce genre de discussion reste calme.", en:"It's essential that this kind of discussion stay calm."},
    {fr:"Chacun est libre de suivre ce conseil ou non, bien sûr.", en:"Everyone is free to follow this advice or not, of course."}
  ], tip:{
    title:"Le subjonctif anglais après « suggest », « recommend », « important that »",
    example:"Je suggère qu'elle réfléchisse encore un peu. — I suggest that she <b>think</b> it over a bit more.",
    body:"Après des verbes comme « suggest », « recommend », « propose », ou des expressions comme « it's important/essential that », l'anglais utilise une forme invariable du verbe (le subjonctif), sans « s » à la 3e personne : « I suggest that he go », pas « goes ». C'est une structure plus formelle, fréquente à l'écrit et dans un anglais soutenu."
  }},
  { title:"Rapporter une rumeur", phrases:[
    {fr:"On dit qu'il aurait démissionné la semaine dernière.", en:"It is said that he resigned last week."},
    {fr:"Il paraît qu'elle déménage bientôt à l'étranger.", en:"She is said to be moving abroad soon."},
    {fr:"On raconte que cette entreprise serait sur le point d'être rachetée.", en:"This company is said to be about to be bought out."},
    {fr:"Il semblerait que la situation ait beaucoup évolué récemment.", en:"The situation is believed to have changed a lot recently."},
    {fr:"On prétend qu'il connaîtrait très bien le nouveau directeur.", en:"He is rumoured to know the new director very well."},
    {fr:"Il se dit que des changements importants vont être annoncés.", en:"Important changes are expected to be announced."},
    {fr:"Je n'ai aucune idée si cette rumeur est vraie ou non.", en:"I have no idea whether this rumour is true or not."},
    {fr:"Ce genre d'information circule vite, qu'elle soit vraie ou fausse.", en:"This kind of information spreads fast, whether it's true or false."},
    {fr:"Mieux vaut ne pas répéter ce qu'on n'a pas vérifié soi-même.", en:"It's better not to repeat what you haven't verified yourself."},
    {fr:"On verra bien si tout ça se confirme dans les prochains jours.", en:"We'll see if all this is confirmed in the coming days."}
  ], tip:{
    title:"« It is said that » / « He is said to » pour rapporter une rumeur",
    example:"On dit qu'il aurait démissionné. — <b>It is said that</b> he resigned. / He <b>is said to have</b> resigned.",
    body:"Pour rapporter une information non confirmée, l'anglais utilise souvent « it is said/believed/rumoured that + sujet + verbe », ou la forme équivalente « sujet + is said/believed to + infinitif » : « She is believed to be in Paris ». Cette structure évite d'affirmer quelque chose comme un fait certain."
  }},
  { title:"Exprimer un regret formel", phrases:[
    {fr:"N'eût été votre aide, je n'y serais jamais arrivé.", en:"Had it not been for your help, I would never have made it."},
    {fr:"Si j'avais su, j'aurais agi tout autrement.", en:"Had I known, I would have acted completely differently."},
    {fr:"Eût-on pris cette décision plus tôt, tout aurait pu être évité.", en:"Had we made this decision earlier, everything could have been avoided."},
    {fr:"Ne serait-ce que pour cette raison, je regrette ce choix.", en:"If only for this reason, I regret this choice."},
    {fr:"Si seulement j'avais pris le temps d'y réfléchir davantage.", en:"If only I had taken the time to think it through more."},
    {fr:"Eussions-nous été prévenus, nous aurions pu nous préparer.", en:"Had we been warned, we could have prepared ourselves."},
    {fr:"Ce regret me poursuivra sans doute pendant longtemps.", en:"This regret will probably follow me for a long time."},
    {fr:"On ne peut malheureusement pas revenir en arrière.", en:"Unfortunately, you can't turn back time."},
    {fr:"Au moins, cette erreur nous aura appris quelque chose.", en:"At least this mistake will have taught us something."},
    {fr:"Mieux vaut regarder vers l'avenir désormais.", en:"It's better to look to the future from now on."}
  ], tip:{
    title:"L'inversion conditionnelle formelle : « Had + sujet »",
    example:"Si j'avais su, j'aurais agi autrement. — <b>Had I known</b>, I would have acted differently.",
    body:"Dans un registre soutenu, on peut omettre « if » dans une phrase au past perfect et inverser le sujet et l'auxiliaire : « Had I known » au lieu de « If I had known ». Cette structure, plus formelle et littéraire, est fréquente à l'écrit, dans les discours ou les textes officiels."
  }},
  { title:"Discuter d'un sujet sensible avec délicatesse", phrases:[
    {fr:"Je ne voudrais pas te mettre mal à l'aise en abordant ce sujet.", en:"I wouldn't want to make you uncomfortable by bringing this up."},
    {fr:"Si ça ne te dérange pas, j'aimerais qu'on en parle calmement.", en:"If you don't mind, I'd like us to talk about it calmly."},
    {fr:"Je comprendrais tout à fait que tu préfères ne pas en discuter.", en:"I would completely understand if you'd rather not discuss it."},
    {fr:"Loin de moi l'idée de te juger pour ce choix.", en:"Far be it from me to judge you for this choice."},
    {fr:"Je me permets d'aborder ce sujet par simple souci pour toi.", en:"I'm bringing this up purely out of concern for you."},
    {fr:"Si jamais tu as besoin d'en parler davantage, je suis là.", en:"If you ever need to talk about it more, I'm here."},
    {fr:"Ce n'est en aucun cas une critique, juste une observation.", en:"This is in no way a criticism, just an observation."},
    {fr:"Prends tout le temps qu'il te faut pour y réfléchir.", en:"Take all the time you need to think about it."},
    {fr:"Je préfère aborder ce genre de sujet en privé plutôt qu'en public.", en:"I prefer to address this kind of topic in private rather than in public."},
    {fr:"Merci d'avoir été si ouvert avec moi là-dessus.", en:"Thank you for being so open with me about this."}
  ]},
  { title:"Participer à un débat argumenté", phrases:[
    {fr:"S'il en était ainsi, on observerait des résultats bien différents.", en:"Were that the case, we would see very different results."},
    {fr:"Loin d'être convaincu, je reste assez sceptique sur ce point.", en:"Far from being convinced, I remain quite sceptical about this point."},
    {fr:"Ce que vous dites n'est pas sans fondement, je le reconnais.", en:"What you're saying isn't without merit, I'll admit that."},
    {fr:"Permettez-moi de nuancer légèrement cette affirmation.", en:"Allow me to slightly qualify that statement."},
    {fr:"Fût-ce vrai, cela ne changerait rien à mon raisonnement.", en:"Even if that were true, it wouldn't change my reasoning at all."},
    {fr:"Je rejoins votre avis sur certains points, mais pas sur tous.", en:"I agree with you on some points, but not all of them."},
    {fr:"Il convient de considérer également l'autre côté de la question.", en:"One should also consider the other side of the question."},
    {fr:"Cet argument mérite d'être approfondi davantage, à mon sens.", en:"This argument deserves to be explored further, in my view."},
    {fr:"Loin de moi l'idée de trancher définitivement ce débat.", en:"Far be it from me to settle this debate once and for all."},
    {fr:"Chacun repartira sans doute avec son opinion, et c'est très bien ainsi.", en:"Everyone will probably leave with their own opinion, and that's just fine."}
  ]},
  { title:"Décrire une personne avec précision", phrases:[
    {fr:"C'est quelqu'un qui, aussi discret soit-il, a une influence considérable.", en:"He's someone who, discreet as he is, has considerable influence."},
    {fr:"Elle est connue pour être d'une honnêteté à toute épreuve.", en:"She's known for being unfailingly honest."},
    {fr:"Il a beau paraître sévère, c'est en réalité quelqu'un de très bienveillant.", en:"Even though he may seem strict, he's actually a very kind person."},
    {fr:"Rares sont les personnes aussi généreuses qu'elle.", en:"Few people are as generous as she is."},
    {fr:"On ne saurait trouver quelqu'un de plus fiable que lui.", en:"One couldn't find anyone more reliable than him."},
    {fr:"Si imparfaite soit-elle, c'est quelqu'un que j'admire profondément.", en:"Imperfect as she may be, she's someone I deeply admire."},
    {fr:"C'est le genre de personne qui marque durablement ceux qui la croisent.", en:"She's the kind of person who leaves a lasting mark on those she meets."},
    {fr:"Peu de gens savent à quel point il est sensible, en réalité.", en:"Few people know how sensitive he actually is."},
    {fr:"Elle a ce don rare de mettre tout le monde à l'aise instantanément.", en:"She has that rare gift of putting everyone at ease instantly."},
    {fr:"Ce genre de qualités ne s'apprend pas, elles se cultivent avec le temps.", en:"This kind of quality can't be taught, it's cultivated over time."}
  ], tip:{
    title:"« However / as + adjectif + sujet + verbe » (concession)",
    example:"Si imparfaite soit-elle, c'est quelqu'un que j'admire. — <b>Imperfect as</b> she may be, she's someone I deeply admire.",
    body:"Pour exprimer une concession de façon soutenue (« aussi... soit-il »), l'anglais utilise « adjectif + as + sujet + verbe » : « Tired as I was, I kept working », « Strange as it may seem... ». C'est une alternative élégante à « although » dans un registre plus littéraire."
  }},
  { title:"Féliciter quelqu'un pour une réussite", phrases:[
    {fr:"Tous mes vœux de succès pour cette nouvelle étape de ta vie.", en:"All my best wishes for success in this new chapter of your life."},
    {fr:"C'est un accomplissement dont tu peux être fier, et à juste titre.", en:"This is an achievement you can be proud of, and rightly so."},
    {fr:"Rares sont ceux qui réussissent un tel exploit aussi jeunes.", en:"Few people achieve something like this at such a young age."},
    {fr:"Je suis sincèrement impressionné par tout le chemin parcouru.", en:"I'm genuinely impressed by how far you've come."},
    {fr:"Tu l'auras bien mérité, après tous ces efforts fournis.", en:"You'll have truly deserved it, after all this effort."},
    {fr:"Que cette réussite n'en annonce que d'autres encore plus belles.", en:"May this success be followed by even greater ones."},
    {fr:"Je lève mon verre à ta réussite, de tout cœur.", en:"I raise my glass to your success, wholeheartedly."},
    {fr:"Ton parcours est une véritable source d'inspiration pour nous tous.", en:"Your journey is a true source of inspiration for all of us."},
    {fr:"Tu as toutes les raisons du monde d'être fier aujourd'hui.", en:"You have every reason in the world to be proud today."},
    {fr:"Félicitations, encore une fois, pour cette magnifique réussite.", en:"Congratulations, once again, on this wonderful achievement."}
  ]},
  { title:"Consoler quelqu'un dans un moment difficile", phrases:[
    {fr:"Sache que je suis là pour toi, quoi qu'il arrive.", en:"Know that I'm here for you, no matter what happens."},
    {fr:"Il n'y a pas de bonne façon de traverser ce genre d'épreuve.", en:"There's no right way to go through this kind of ordeal."},
    {fr:"Prends tout le temps nécessaire, personne ne te presse.", en:"Take all the time you need, no one is rushing you."},
    {fr:"Aussi difficile que ce soit maintenant, ça finira par s'apaiser.", en:"As hard as it is right now, it will eventually get easier."},
    {fr:"N'hésite jamais à m'appeler, de jour comme de nuit.", en:"Never hesitate to call me, day or night."},
    {fr:"Tu n'as pas à être fort tout le temps, ce n'est pas grave de craquer.", en:"You don't have to be strong all the time, it's okay to break down."},
    {fr:"Chacun gère ce genre de situation à son propre rythme.", en:"Everyone handles this kind of situation at their own pace."},
    {fr:"Ce que tu ressens est tout à fait normal, ne te juge pas.", en:"What you're feeling is completely normal, don't judge yourself."},
    {fr:"On traversera ça ensemble, je ne te laisserai pas seul.", en:"We'll get through this together, I won't leave you alone."},
    {fr:"Prends soin de toi, c'est tout ce qui compte pour l'instant.", en:"Take care of yourself, that's all that matters right now."}
  ]},
  { title:"Animer une réunion de famille délicate", phrases:[
    {fr:"Proposons que chacun puisse s'exprimer sans être interrompu.", en:"Let's propose that everyone be allowed to speak without being interrupted."},
    {fr:"Il serait sage que nous évitions de raviver d'anciennes disputes.", en:"It would be wise for us to avoid reopening old arguments."},
    {fr:"Quoi qu'il soit décidé aujourd'hui, restons unis en tant que famille.", en:"Whatever is decided today, let's stay united as a family."},
    {fr:"Fût-ce difficile, cette conversation devait absolument avoir lieu.", en:"Difficult as it was, this conversation absolutely needed to happen."},
    {fr:"Il convient que chacun écoute l'autre avant de répondre.", en:"It's important that everyone listen to the other before responding."},
    {fr:"On gagnerait à aborder ce sujet avec plus de calme.", en:"We would benefit from approaching this topic more calmly."},
    {fr:"Rares sont les familles sans aucun désaccord, après tout.", en:"Few families have no disagreements at all, after all."},
    {fr:"Je suggère qu'on fasse une pause avant de reprendre cette discussion.", en:"I suggest we take a break before resuming this discussion."},
    {fr:"Ce qui compte, c'est qu'on en ressorte plus soudés qu'avant.", en:"What matters is that we come out of this closer than before."},
    {fr:"Je suis fier de la façon dont cette famille gère ses différends.", en:"I'm proud of the way this family handles its disagreements."}
  ]},
  { title:"Partager une opinion impopulaire avec tact", phrases:[
    {fr:"Je sais que mon avis risque de ne pas plaire à tout le monde.", en:"I know my opinion might not please everyone."},
    {fr:"Loin de vouloir provoquer qui que ce soit, je dis simplement ce que je pense.", en:"Far from wanting to provoke anyone, I'm simply saying what I think."},
    {fr:"Aussi impopulaire que soit mon avis, je tiens à le partager honnêtement.", en:"Unpopular as my opinion may be, I feel compelled to share it honestly."},
    {fr:"Je comprendrais que vous ne soyez pas d'accord avec moi sur ce point.", en:"I would understand if you disagreed with me on this point."},
    {fr:"Ce n'est que mon point de vue, et il n'engage que moi.", en:"It's only my point of view, and it only reflects on me."},
    {fr:"Permettez-moi d'exposer mon raisonnement avant qu'on me juge.", en:"Allow me to explain my reasoning before I'm judged."},
    {fr:"Rares sont les opinions qui font l'unanimité, de toute façon.", en:"Few opinions ever achieve unanimous agreement, anyway."},
    {fr:"Je préfère être honnête plutôt que de simplement plaire à tout le monde.", en:"I'd rather be honest than simply please everyone."},
    {fr:"Vous êtes évidemment libres de ne pas partager mon avis.", en:"You're obviously free not to share my opinion."},
    {fr:"Merci en tout cas d'avoir écouté jusqu'au bout.", en:"Thank you anyway for listening all the way through."}
  ]},
  { title:"Faire une demande délicate à un supérieur", phrases:[
    {fr:"Je me permets de vous solliciter pour une demande un peu particulière.", en:"I'm taking the liberty of approaching you with a rather particular request."},
    {fr:"Seriez-vous disposé à envisager un aménagement de mes horaires ?", en:"Would you be willing to consider an adjustment to my working hours?"},
    {fr:"Je comprendrais tout à fait un refus de votre part.", en:"I would completely understand a refusal on your part."},
    {fr:"Si cela était possible, cela m'aiderait considérablement.", en:"If this were possible, it would help me considerably."},
    {fr:"Loin de vouloir abuser de votre bienveillance, je sollicite simplement un conseil.", en:"Far from wanting to take advantage of your kindness, I'm simply seeking advice."},
    {fr:"Permettez-moi de vous exposer brièvement ma situation.", en:"Allow me to briefly explain my situation to you."},
    {fr:"Quelle que soit votre décision, je vous en remercie par avance.", en:"Whatever your decision, I thank you in advance."},
    {fr:"Je reste naturellement à votre disposition pour en discuter davantage.", en:"I naturally remain at your disposal to discuss this further."},
    {fr:"Je vous suis reconnaissant d'avoir pris le temps de me lire.", en:"I'm grateful to you for taking the time to read this."},
    {fr:"Dans l'attente de votre retour, je vous souhaite une excellente journée.", en:"Looking forward to your response, I wish you an excellent day."}
  ]},
  { title:"Réagir à une nouvelle inattendue", phrases:[
    {fr:"Je ne m'attendais absolument pas à une telle annonce.", en:"I absolutely wasn't expecting such an announcement."},
    {fr:"Ça m'a pris totalement de court, je dois l'avouer.", en:"It completely caught me off guard, I must admit."},
    {fr:"Aussi surprenant que cela puisse paraître, ça ne me déplaît pas.", en:"As surprising as it may seem, I don't mind it."},
    {fr:"Laissez-moi un instant pour digérer cette information.", en:"Let me take a moment to process this information."},
    {fr:"Je n'aurais jamais imaginé une chose pareille, honnêtement.", en:"I never would have imagined such a thing, honestly."},
    {fr:"Une fois la surprise passée, je trouve en fait ça plutôt positif.", en:"Once the surprise wore off, I actually find it quite positive."},
    {fr:"Il me faudra sans doute un peu de temps pour m'y faire.", en:"It will probably take me a while to get used to it."},
    {fr:"Fût-elle inattendue, cette nouvelle ne change rien à notre amitié.", en:"Unexpected as it is, this news doesn't change our friendship."},
    {fr:"Merci de m'en avoir parlé directement plutôt que je l'apprenne autrement.", en:"Thank you for telling me directly rather than me finding out another way."},
    {fr:"On en reparlera plus calmement une fois que j'aurai digéré tout ça.", en:"We'll talk about it more calmly once I've processed all of this."}
  ]},
  { title:"Reconnaître une erreur publiquement", phrases:[
    {fr:"Je tiens à reconnaître humblement m'être trompé sur ce point.", en:"I want to humbly acknowledge that I was wrong on this point."},
    {fr:"Il m'arrive, comme à tout le monde, de me tromper.", en:"Like everyone, I sometimes make mistakes."},
    {fr:"Loin de moi l'idée de minimiser l'impact de cette erreur.", en:"Far be it from me to downplay the impact of this mistake."},
    {fr:"J'assume pleinement la responsabilité de ce qui s'est passé.", en:"I fully take responsibility for what happened."},
    {fr:"Ayant pris conscience de mon erreur, je m'engage à ne pas la reproduire.", en:"Having realised my mistake, I commit to not repeating it."},
    {fr:"Il convient que je présente mes excuses à toutes les personnes concernées.", en:"It's only right that I apologise to everyone affected."},
    {fr:"Reconnaître ses torts n'est jamais facile, mais c'est nécessaire.", en:"Admitting one's mistakes is never easy, but it's necessary."},
    {fr:"J'espère sincèrement que vous pourrez accepter mes excuses.", en:"I sincerely hope you can accept my apologies."},
    {fr:"Je ferai tout mon possible pour regagner votre confiance.", en:"I will do everything I can to regain your trust."},
    {fr:"Merci à ceux qui m'ont fait confiance malgré tout.", en:"Thank you to those who trusted me despite everything."}
  ], tip:{
    title:"« Having + participe passé » pour exprimer une action antérieure",
    example:"Ayant pris conscience de mon erreur, je m'engage à ne pas la reproduire. — <b>Having realised</b> my mistake, I commit to not repeating it.",
    body:"« Having + participe passé » en début de phrase exprime une action terminée avant une autre, de façon concise et élégante : « Having finished the report, she went home ». C'est l'équivalent condensé de « After I had realised... » et appartient à un registre plus soutenu."
  }},
  { title:"Discuter d'un sujet philosophique autour d'un café", phrases:[
    {fr:"Qu'est-ce que le bonheur signifie réellement, selon toi ?", en:"What does happiness really mean, in your view?"},
    {fr:"Il me semble que la liberté totale n'existe nulle part vraiment.", en:"It seems to me that total freedom doesn't really exist anywhere."},
    {fr:"Serait-il juste de dire que le temps change tout, sauf nous-mêmes ?", en:"Would it be fair to say that time changes everything except ourselves?"},
    {fr:"Je me demande souvent ce qui donne vraiment un sens à la vie.", en:"I often wonder what really gives life meaning."},
    {fr:"Fût-elle imparfaite, notre perception reste la seule réalité qu'on connaisse.", en:"Imperfect as it is, our perception remains the only reality we know."},
    {fr:"Certains diraient que le bonheur se trouve dans les petites choses.", en:"Some would say that happiness lies in the small things."},
    {fr:"Ce genre de question n'a probablement pas de réponse unique.", en:"This kind of question probably has no single answer."},
    {fr:"Chacun construit sa propre vérité, en fin de compte.", en:"Everyone builds their own truth, in the end."},
    {fr:"Ces conversations me font réfléchir bien après qu'elles soient terminées.", en:"These conversations make me think long after they're over."},
    {fr:"On pourrait en discuter pendant des heures sans jamais s'ennuyer.", en:"We could discuss this for hours without ever getting bored."}
  ]},
  { title:"Encourager quelqu'un à persévérer", phrases:[
    {fr:"Ne laisse jamais un seul échec définir ta valeur.", en:"Never let a single failure define your worth."},
    {fr:"Aussi découragé que tu sois aujourd'hui, demain sera différent.", en:"Discouraged as you are today, tomorrow will be different."},
    {fr:"Rares sont ceux qui réussissent sans jamais connaître d'échec.", en:"Few people succeed without ever experiencing failure."},
    {fr:"Je crois sincèrement en toi, plus que tu ne le penses.", en:"I truly believe in you, more than you think."},
    {fr:"Chaque obstacle que tu rencontres te rend plus fort, pas plus faible.", en:"Every obstacle you face makes you stronger, not weaker."},
    {fr:"Fussent tes doutes nombreux, ta détermination l'a toujours emporté.", en:"Numerous as your doubts may be, your determination has always won out."},
    {fr:"Continue, même quand tout semble aller contre toi.", en:"Keep going, even when everything seems to be against you."},
    {fr:"Ce que tu construis prendra du temps, et c'est tout à fait normal.", en:"What you're building will take time, and that's completely normal."},
    {fr:"Je serai là à chaque étape, pour célébrer comme pour soutenir.", en:"I'll be there every step of the way, to celebrate and to support."},
    {fr:"N'abandonne jamais ce en quoi tu crois vraiment.", en:"Never give up on what you truly believe in."}
  ]},
  { title:"Négocier un désaccord de couple ou d'amitié", phrases:[
    {fr:"Il me semble important que nous écoutions chacun le point de vue de l'autre.", en:"It seems important to me that we each listen to the other's point of view."},
    {fr:"Loin de vouloir avoir raison à tout prix, je cherche juste à comprendre.", en:"Far from wanting to be right at all costs, I'm just trying to understand."},
    {fr:"Fussions-nous en désaccord, notre relation compte plus que cette dispute.", en:"Even though we may disagree, our relationship matters more than this argument."},
    {fr:"Je suggère que nous prenions chacun le temps d'y réfléchir séparément.", en:"I suggest we each take some time to think it over separately."},
    {fr:"Ce que tu ressens est tout aussi valable que ce que je ressens.", en:"What you feel is just as valid as what I feel."},
    {fr:"Il conviendrait peut-être que nous reportions cette conversation à plus tard.", en:"It might be best if we postponed this conversation until later."},
    {fr:"Aucun de nous deux n'a raison ou tort à cent pour cent, je pense.", en:"Neither of us is a hundred percent right or wrong, I think."},
    {fr:"Je préfère que nous trouvions un terrain d'entente plutôt qu'un gagnant.", en:"I'd rather we found common ground than a winner."},
    {fr:"Merci d'avoir eu la patience de m'écouter jusqu'au bout.", en:"Thank you for having the patience to hear me out."},
    {fr:"On en ressort toujours plus forts, je crois, après ce genre de moment.", en:"We always come out stronger, I believe, after this kind of moment."}
  ]},
  { title:"Faire ses adieux à un collègue ou ami proche", phrases:[
    {fr:"Il me sera difficile d'imaginer ce lieu sans ta présence.", en:"It will be hard for me to imagine this place without your presence."},
    {fr:"Fût notre temps ensemble bref, il restera gravé en moi.", en:"Short as our time together was, it will stay with me forever."},
    {fr:"Je garderai précieusement chaque souvenir partagé avec toi.", en:"I will treasure every memory shared with you."},
    {fr:"Que cette nouvelle étape t'apporte tout ce que tu mérites.", en:"May this new chapter bring you everything you deserve."},
    {fr:"Sache que la porte restera toujours ouverte, où que tu ailles.", en:"Know that the door will always remain open, wherever you go."},
    {fr:"Rien ne remplacera jamais vraiment ces moments passés ensemble.", en:"Nothing will ever truly replace the moments we spent together."},
    {fr:"Ayant partagé tant de choses, je sais que la distance n'y changera rien.", en:"Having shared so much, I know that distance won't change anything."},
    {fr:"Je te souhaite sincèrement le meilleur pour ce qui t'attend.", en:"I sincerely wish you the best for what lies ahead."},
    {fr:"Reste la personne que tu es, où que la vie te mène.", en:"Stay the person you are, wherever life takes you."},
    {fr:"Ce n'est qu'un au revoir, pas un adieu définitif.", en:"This is only a goodbye for now, not a final farewell."}
  ]},
  { title:"Gérer un malentendu entre amis", phrases:[
    {fr:"Je crois qu'il y a eu un malentendu entre nous deux.", en:"I think there's been a misunderstanding between the two of us."},
    {fr:"Ce n'est absolument pas ce que je voulais dire, laisse-moi m'expliquer.", en:"That's absolutely not what I meant, let me explain."},
    {fr:"Loin de moi l'idée de te blesser avec cette remarque.", en:"Far be it from me to hurt you with that remark."},
    {fr:"Peut-être me suis-je mal exprimé, je vais reformuler.", en:"Maybe I didn't express myself well, I'll rephrase it."},
    {fr:"Je comprends que tu aies pu le prendre ainsi, mais ce n'était pas mon intention.", en:"I understand you could have taken it that way, but that wasn't my intention."},
    {fr:"On devrait clarifier les choses avant que ça ne s'aggrave.", en:"We should clear things up before it gets worse."},
    {fr:"Aussi tendue soit la situation, je préfère qu'on en parle ouvertement.", en:"Tense as the situation is, I'd rather we talked about it openly."},
    {fr:"Je suis désolé si mes mots t'ont blessé sans le vouloir.", en:"I'm sorry if my words hurt you unintentionally."},
    {fr:"Reprenons depuis le début, ça ira plus vite.", en:"Let's start over from the beginning, it'll be quicker."},
    {fr:"Je préfère toujours éclaircir les choses plutôt que de laisser s'installer un malaise.", en:"I always prefer to clear things up rather than let an awkwardness settle in."}
  ]},
  { title:"Partager un souvenir marquant", phrases:[
    {fr:"Il y a des moments qui nous marquent pour le restant de notre vie.", en:"There are moments that mark us for the rest of our lives."},
    {fr:"Je me souviendrai toujours de ce jour-là, dans les moindres détails.", en:"I'll always remember that day, down to the smallest detail."},
    {fr:"Ayant vécu ça ensemble, nous partageons un lien particulier désormais.", en:"Having experienced that together, we now share a special bond."},
    {fr:"C'est le genre de souvenir qui me fait sourire encore aujourd'hui.", en:"It's the kind of memory that still makes me smile today."},
    {fr:"Si improbable que cela ait pu paraître, c'est vraiment arrivé.", en:"Unlikely as it may have seemed, it really happened."},
    {fr:"Je repense souvent à cette époque avec beaucoup de tendresse.", en:"I often think back on that time with a lot of fondness."},
    {fr:"Ce souvenir reste gravé dans ma mémoire comme si c'était hier.", en:"That memory stays etched in my mind as if it were yesterday."},
    {fr:"On en rira encore dans vingt ans, j'en suis certain.", en:"We'll still be laughing about it in twenty years, I'm sure."},
    {fr:"Certains moments valent bien plus que n'importe quel bien matériel.", en:"Some moments are worth far more than any material possession."},
    {fr:"Merci d'avoir fait partie de ce souvenir avec moi.", en:"Thank you for being part of that memory with me."}
  ]},
  { title:"Bilan du module conversation sociale, niveau 3", phrases:[
    {fr:"Ce dernier module nous a appris à manier des nuances très fines.", en:"This final module has taught us to handle very fine nuances."},
    {fr:"Rares sont les apprenants qui atteignent un tel niveau de précision.", en:"Few learners reach this level of precision."},
    {fr:"Ces structures, aussi complexes soient-elles, deviendront naturelles avec le temps.", en:"These structures, complex as they are, will become natural with time."},
    {fr:"Tu es désormais capable de t'exprimer avec une grande richesse de vocabulaire.", en:"You're now able to express yourself with great richness of vocabulary."},
    {fr:"Ayant terminé ce niveau, tu maîtrises une large partie de l'anglais courant.", en:"Having completed this level, you now master a large part of everyday English."},
    {fr:"Fût ce parcours long, chaque étape en valait vraiment la peine.", en:"Long as this journey was, every step was truly worth it."},
    {fr:"Félicitations pour être arrivé jusqu'à la toute fin de ce niveau 3.", en:"Congratulations on making it all the way to the end of this level 3."},
    {fr:"Bravo, tu as terminé le module « Conversation sociale » du niveau 3 !", en:"Well done, you've completed the level 3 \"Social conversation\" module!"},
    {fr:"Les trois niveaux sont désormais entièrement terminés.", en:"All three levels are now fully complete."},
    {fr:"Continue à pratiquer, l'anglais fait désormais partie de toi.", en:"Keep practising, English is now a part of who you are."}
  ]}
];
