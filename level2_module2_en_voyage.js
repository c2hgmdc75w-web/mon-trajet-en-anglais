/* ============================================================
   NIVEAU 2 — MODULE 2 "En voyage"
   200 phrases, 20 leçons, 5 points de grammaire.
   À insérer dans data.js, puis remplacer dans LEVEL2_MODULES :
   { id:2, name:"En voyage", desc:"...", totalPhrases:200, lessonsCount:20,
     lessons: level2Module2Lessons }
   ============================================================ */

const level2Module2Lessons = [
  { title:"Préparer un road trip", phrases:[
    {fr:"On était en train de planifier l'itinéraire quand tu as appelé.", en:"We were planning the route when you called."},
    {fr:"Je préparais la voiture pendant que tu faisais les valises.", en:"I was getting the car ready while you were packing."},
    {fr:"Il pleuvait quand on a quitté la maison.", en:"It was raining when we left the house."},
    {fr:"On roulait depuis deux heures quand on s'est arrêtés pour manger.", en:"We had been driving for two hours when we stopped to eat."},
    {fr:"Le soleil se couchait pendant qu'on cherchait un endroit où dormir.", en:"The sun was setting while we were looking for a place to sleep."},
    {fr:"On écoutait de la musique tout le long du trajet.", en:"We were listening to music the whole way."},
    {fr:"Je conduisais pendant que tu regardais la carte.", en:"I was driving while you were looking at the map."},
    {fr:"Il faisait déjà nuit quand on est arrivés.", en:"It was already dark when we arrived."},
    {fr:"On ne s'attendait pas à autant de circulation.", en:"We weren't expecting that much traffic."},
    {fr:"Malgré tout, le voyage a bien commencé.", en:"Still, the trip got off to a good start."}
  ], tip:{
    title:"Le passé continu (past continuous)",
    example:"On roulait depuis deux heures quand on s'est arrêtés. — We <b>were driving</b> for two hours when we stopped.",
    body:"Le passé continu (was/were + verbe en -ing) décrit une action en train de se dérouler dans le passé, souvent interrompue par un autre événement. On le forme avec « was » ou « were » selon le sujet, suivi du verbe en -ing : « I was driving », « They were packing »."
  }},
  { title:"Camper en pleine nature", phrases:[
    {fr:"On a monté la tente juste avant la tombée de la nuit.", en:"We set up the tent just before nightfall."},
    {fr:"S'il fait beau demain, on ira se baigner dans le lac.", en:"If it's nice tomorrow, we'll go swimming in the lake."},
    {fr:"Si le feu ne prend pas, on mangera froid.", en:"If the fire doesn't catch, we'll eat cold food."},
    {fr:"On entendait les bruits de la forêt toute la nuit.", en:"We could hear the sounds of the forest all night."},
    {fr:"Si tu as froid, prends mon sac de couchage en plus.", en:"If you're cold, take my extra sleeping bag."},
    {fr:"On dormira à la belle étoile s'il ne pleut pas.", en:"We'll sleep under the stars if it doesn't rain."},
    {fr:"Le camping le plus proche est à une heure de marche.", en:"The nearest campsite is an hour's walk away."},
    {fr:"Si on part tôt, on évitera la chaleur.", en:"If we leave early, we'll avoid the heat."},
    {fr:"On a vu des étoiles comme jamais en ville.", en:"We saw stars like never in the city."},
    {fr:"C'était simple, mais vraiment mémorable.", en:"It was simple, but truly memorable."}
  ], tip:{
    title:"Le first conditional : if + présent, will",
    example:"Si tu as froid, prends mon sac de couchage. — <b>If</b> you're cold, take my extra sleeping bag.",
    body:"Pour parler d'une conséquence probable dans le futur, on utilise « if » suivi du présent simple, puis « will » (ou un impératif) dans la deuxième partie : « If it rains, we will stay inside. » Contrairement au français, on n'utilise jamais « will » après « if »."
  }},
  { title:"Un vol retardé", phrases:[
    {fr:"Pourriez-vous me dire pourquoi le vol est retardé ?", en:"Could you tell me why the flight is delayed?"},
    {fr:"Je pourrais manquer ma correspondance à cause de ça.", en:"I could miss my connection because of this."},
    {fr:"Pourrais-je avoir des nouvelles sur l'écran d'affichage ?", en:"Could I get some updates on the departure board?"},
    {fr:"On pourrait nous proposer un vol de remplacement.", en:"We might be offered a replacement flight."},
    {fr:"Je ne pouvais pas y croire quand j'ai vu l'annonce.", en:"I couldn't believe it when I saw the announcement."},
    {fr:"Pourriez-vous vérifier s'il y a un autre vol ce soir ?", en:"Could you check if there's another flight tonight?"},
    {fr:"On pouvait au moins se détendre dans la salle d'attente.", en:"At least we could relax in the waiting area."},
    {fr:"Je pourrais essayer de réserver un hôtel, au cas où.", en:"I could try to book a hotel, just in case."},
    {fr:"Pourriez-vous m'indiquer où se trouve le comptoir d'information ?", en:"Could you tell me where the information desk is?"},
    {fr:"Finalement, on a pu embarquer deux heures plus tard.", en:"In the end, we were able to board two hours later."}
  ], tip:{
    title:"« Could » pour demander poliment",
    example:"Pourriez-vous me dire pourquoi le vol est retardé ? — <b>Could</b> you tell me why the flight is delayed?",
    body:"« Could » s'utilise pour formuler une demande polie, un peu comme le conditionnel français « pourriez-vous ». C'est plus courtois que « can » : « Could you help me? » sonne plus poli que « Can you help me? », tout en restant très naturel à l'oral."
  }},
  { title:"Petit marché local", phrases:[
    {fr:"Il y a trop de monde pour qu'on puisse bien regarder.", en:"There are too many people for us to look around properly."},
    {fr:"Ce stand a assez de fruits pour toute la semaine.", en:"This stall has enough fruit for the whole week."},
    {fr:"Je n'ai pas assez d'argent liquide sur moi.", en:"I don't have enough cash on me."},
    {fr:"Il reste quelques places où s'asseoir pour manger.", en:"There are a few spots left to sit down and eat."},
    {fr:"On a acheté un peu de fromage et de pain frais.", en:"We bought a little cheese and some fresh bread."},
    {fr:"Ce panier est trop lourd pour que je le porte seul.", en:"This basket is too heavy for me to carry alone."},
    {fr:"Il y a assez de choix pour satisfaire tout le monde.", en:"There's enough choice to satisfy everyone."},
    {fr:"On n'a pas assez de temps pour tout visiter.", en:"We don't have enough time to see everything."},
    {fr:"Quelques vendeurs parlaient un peu anglais.", en:"A few sellers spoke a little English."},
    {fr:"C'était bruyant, coloré, et plein de vie.", en:"It was noisy, colourful, and full of life."}
  ], tip:{
    title:"« Too » et « enough »",
    example:"Ce panier est trop lourd pour que je le porte. — This basket is <b>too</b> heavy for me to carry.",
    body:"« Too » (trop) se place avant un adjectif : « too heavy », « too expensive ». « Enough » (assez) se place après l'adjectif mais avant le nom : « enough fruit », « good enough ». Les deux sont souvent suivis de « for someone to do something »."
  }},
  { title:"S'orienter sans réseau", phrases:[
    {fr:"Je n'avais plus de batterie et donc plus de carte.", en:"My battery had died, so I no longer had a map."},
    {fr:"On avait déjà demandé notre chemin deux fois avant de se perdre.", en:"We had already asked for directions twice before getting lost."},
    {fr:"J'avais téléchargé une carte hors ligne, heureusement.", en:"I had downloaded an offline map, luckily."},
    {fr:"Quand on est arrivés, le soleil avait déjà disparu.", en:"By the time we arrived, the sun had already set."},
    {fr:"Personne n'avait prévu qu'on n'aurait pas de réseau ici.", en:"No one had expected us to have no signal here."},
    {fr:"On avait préparé un plan papier, juste au cas où.", en:"We had prepared a paper map, just in case."},
    {fr:"J'avais oublié à quel point se perdre peut être stressant.", en:"I had forgotten how stressful getting lost can be."},
    {fr:"Une fois qu'on avait retrouvé la route principale, tout allait mieux.", en:"Once we had found the main road again, everything felt better."},
    {fr:"On n'avait jamais eu autant besoin d'un habitant du coin.", en:"We had never needed a local so much."},
    {fr:"Heureusement, quelqu'un nous avait indiqué un raccourci.", en:"Luckily, someone had shown us a shortcut."}
  ]},
  { title:"Attendre un bus qui n'arrive jamais", phrases:[
    {fr:"Le bus aurait dû passer il y a vingt minutes.", en:"The bus should have come twenty minutes ago."},
    {fr:"Personne d'autre n'attendait à l'arrêt, ce qui n'était pas bon signe.", en:"No one else was waiting at the stop, which wasn't a good sign."},
    {fr:"On a fini par demander à un passant ce qu'il se passait.", en:"We eventually asked a passer-by what was going on."},
    {fr:"Apparemment, il y avait une grève ce jour-là.", en:"Apparently, there was a strike that day."},
    {fr:"On a décidé de marcher plutôt que d'attendre plus longtemps.", en:"We decided to walk rather than wait any longer."},
    {fr:"Ce n'était pas si loin, finalement.", en:"It wasn't that far, after all."},
    {fr:"On a découvert plein de petites rues sympas en chemin.", en:"We discovered lots of nice little streets along the way."},
    {fr:"Parfois, les imprévus mènent aux meilleures découvertes.", en:"Sometimes unexpected situations lead to the best discoveries."},
    {fr:"On est arrivés un peu en retard, mais de bonne humeur.", en:"We arrived a bit late, but in a good mood."},
    {fr:"La prochaine fois, on vérifiera les horaires à l'avance.", en:"Next time, we'll check the schedule in advance."}
  ]},
  { title:"Louer un vélo pour la journée", phrases:[
    {fr:"Est-ce que je peux louer un vélo pour la journée entière ?", en:"Can I rent a bike for the whole day?"},
    {fr:"Le casque est-il compris dans le prix ?", en:"Is the helmet included in the price?"},
    {fr:"Il faut le rendre avant quelle heure ?", en:"What time does it need to be returned by?"},
    {fr:"Les freins avant me semblent un peu faibles.", en:"The front brakes feel a bit weak to me."},
    {fr:"Vous auriez un plan des pistes cyclables ?", en:"Would you have a map of the cycling routes?"},
    {fr:"On a roulé le long de la rivière presque toute la matinée.", en:"We cycled along the river for almost the whole morning."},
    {fr:"La selle était un peu trop haute au départ.", en:"The seat was a bit too high at first."},
    {fr:"C'est un excellent moyen de découvrir la ville autrement.", en:"It's a great way to see the city differently."},
    {fr:"On s'est arrêtés plusieurs fois pour prendre des photos.", en:"We stopped several times to take pictures."},
    {fr:"Mes jambes vont s'en souvenir demain.", en:"My legs are going to remember this tomorrow."}
  ]},
  { title:"Décalage horaire", phrases:[
    {fr:"Je n'arrive pas à m'endormir avant minuit, ici.", en:"I can't fall asleep before midnight here."},
    {fr:"Mon corps pense encore qu'il est l'heure du déjeuner.", en:"My body still thinks it's lunchtime."},
    {fr:"Il vaut mieux rester éveillé jusqu'au soir le premier jour.", en:"It's best to stay awake until evening on the first day."},
    {fr:"Je me sens complètement décalé depuis qu'on est arrivés.", en:"I've felt completely out of sync since we arrived."},
    {fr:"Boire beaucoup d'eau aide à récupérer plus vite.", en:"Drinking plenty of water helps you recover faster."},
    {fr:"J'ai dormi douze heures d'affilée la première nuit.", en:"I slept twelve hours straight on the first night."},
    {fr:"Ça prend en général deux ou trois jours pour s'adapter.", en:"It usually takes two or three days to adjust."},
    {fr:"Le café ne m'a même pas réveillé ce matin.", en:"Coffee didn't even wake me up this morning."},
    {fr:"Je me suis réveillé à quatre heures du matin, en pleine forme.", en:"I woke up at four in the morning, wide awake."},
    {fr:"Ça devrait aller mieux d'ici la fin de la semaine.", en:"It should get better by the end of the week."}
  ]},
  { title:"Discuter avec un habitant du coin", phrases:[
    {fr:"Il m'a dit que ce quartier était très calme le soir.", en:"He told me that this neighbourhood was very quiet in the evening."},
    {fr:"Elle a expliqué qu'il fallait réserver plusieurs jours à l'avance.", en:"She explained that you needed to book several days in advance."},
    {fr:"Il a dit qu'il vivait ici depuis toujours.", en:"He said he had lived here all his life."},
    {fr:"Elle nous a conseillé d'éviter le centre pendant le week-end.", en:"She advised us to avoid the city centre over the weekend."},
    {fr:"Il a mentionné un petit restaurant que les touristes ne connaissent pas.", en:"He mentioned a small restaurant that tourists don't know about."},
    {fr:"Elle a dit que le marché fermait plus tôt le dimanche.", en:"She said the market closed earlier on Sundays."},
    {fr:"Il nous a demandé d'où on venait.", en:"He asked us where we were from."},
    {fr:"Elle a promis de nous envoyer la liste des bonnes adresses.", en:"She promised to send us the list of good places."},
    {fr:"Il a dit que les gens d'ici étaient plutôt accueillants.", en:"He said that people here were quite welcoming."},
    {fr:"C'était une des meilleures conversations de notre voyage.", en:"It was one of the best conversations of our trip."}
  ], tip:{
    title:"Le discours rapporté (reported speech)",
    example:"Il a dit qu'il vivait ici depuis toujours. — He said he <b>had lived</b> here all his life.",
    body:"Pour rapporter les paroles de quelqu'un, on utilise souvent « said that » ou « told me that », et le temps du verbe recule d'un cran : le présent devient du passé, le passé devient du past perfect. « I live here » devient « He said he lived here »."
  }},
  { title:"Négocier un prix", phrases:[
    {fr:"C'est un peu cher, vous pourriez faire un geste ?", en:"That's a bit expensive, could you do a little better?"},
    {fr:"Si j'en prends deux, vous me faites une réduction ?", en:"If I take two, would you give me a discount?"},
    {fr:"C'est mon dernier prix, je ne peux pas descendre plus bas.", en:"That's my final price, I can't go any lower."},
    {fr:"On s'est mis d'accord sur un prix raisonnable.", en:"We agreed on a fair price."},
    {fr:"Vous l'auriez en une autre couleur, par hasard ?", en:"Would you happen to have it in another colour?"},
    {fr:"Je vais réfléchir et repasser peut-être plus tard.", en:"I'll think about it and maybe come back later."},
    {fr:"C'est à peu près le même prix que dans l'autre boutique.", en:"It's about the same price as in the other shop."},
    {fr:"Marchander fait partie du jeu, ici.", en:"Haggling is part of the game here."},
    {fr:"Au final, on a eu un très bon prix.", en:"In the end, we got a really good price."},
    {fr:"Le vendeur avait l'air plutôt satisfait aussi.", en:"The seller seemed pretty happy too."}
  ]},
  { title:"Petits problèmes de voiture", phrases:[
    {fr:"La voiture a fait un bruit bizarre sur l'autoroute.", en:"The car made a strange noise on the motorway."},
    {fr:"On s'est arrêtés sur le bas-côté pour vérifier.", en:"We pulled over onto the shoulder to check."},
    {fr:"Le pneu avant gauche était complètement à plat.", en:"The front left tyre was completely flat."},
    {fr:"Heureusement, il y avait une roue de secours dans le coffre.", en:"Luckily, there was a spare wheel in the boot."},
    {fr:"On a appelé l'assistance pour qu'elle vienne nous aider.", en:"We called roadside assistance to come and help us."},
    {fr:"Le mécanicien est arrivé plus vite que prévu.", en:"The mechanic arrived faster than expected."},
    {fr:"Ça nous a fait perdre presque deux heures.", en:"It made us lose almost two hours."},
    {fr:"On a dû changer nos plans pour l'après-midi.", en:"We had to change our plans for the afternoon."},
    {fr:"Au moins, on était bien assurés pour ce genre de situation.", en:"At least we were well insured for this kind of situation."},
    {fr:"Le reste du trajet s'est passé sans problème.", en:"The rest of the journey went smoothly."}
  ]},
  { title:"Voyager avec un budget serré", phrases:[
    {fr:"On essaie de dépenser le moins possible sur ce voyage.", en:"We're trying to spend as little as possible on this trip."},
    {fr:"L'auberge de jeunesse était la moins chère des environs.", en:"The hostel was the cheapest one around."},
    {fr:"On cuisine nous-mêmes pour économiser sur les repas.", en:"We cook for ourselves to save money on meals."},
    {fr:"Les transports en commun reviennent bien moins cher qu'un taxi.", en:"Public transport works out much cheaper than a taxi."},
    {fr:"On a trouvé pas mal d'activités gratuites dans le coin.", en:"We found quite a few free activities around here."},
    {fr:"Ce marché propose les prix les plus bas de la ville.", en:"This market has the lowest prices in the city."},
    {fr:"On essaie de ne pas trop craquer sur les souvenirs.", en:"We're trying not to splurge too much on souvenirs."},
    {fr:"Voyager hors saison coûte vraiment moins cher.", en:"Travelling off-season is really much cheaper."},
    {fr:"C'est le petit-déjeuner le plus copieux qu'on ait eu jusqu'ici.", en:"It's the most generous breakfast we've had so far."},
    {fr:"Un petit budget n'empêche pas de passer un excellent voyage.", en:"A tight budget doesn't stop you from having a great trip."}
  ]},
  { title:"Visiter en dehors des sentiers battus", phrases:[
    {fr:"On voulait éviter les endroits trop touristiques.", en:"We wanted to avoid places that were too touristy."},
    {fr:"Ce village n'est même pas indiqué sur la plupart des cartes.", en:"This village isn't even marked on most maps."},
    {fr:"On a dû demander notre chemin plusieurs fois pour le trouver.", en:"We had to ask for directions several times to find it."},
    {fr:"Il n'y avait presque personne quand on est arrivés.", en:"There was almost no one when we arrived."},
    {fr:"Les habitants nous regardaient avec curiosité.", en:"The locals looked at us with curiosity."},
    {fr:"On a eu l'impression de découvrir un vrai secret.", en:"We felt like we had discovered a real secret."},
    {fr:"Ce genre d'endroit vaut vraiment le détour.", en:"This kind of place is really worth the detour."},
    {fr:"On a pris notre temps, sans horaire précis.", en:"We took our time, without a fixed schedule."},
    {fr:"C'était exactement le genre d'aventure qu'on cherchait.", en:"It was exactly the kind of adventure we were looking for."},
    {fr:"On en reparlera encore dans des années.", en:"We'll still be talking about it in years to come."}
  ]},
  { title:"Faire face à une urgence médicale mineure", phrases:[
    {fr:"Je me suis fait une petite entorse en marchant.", en:"I sprained my ankle slightly while walking."},
    {fr:"Y a-t-il une pharmacie ouverte près d'ici ?", en:"Is there a pharmacy open near here?"},
    {fr:"Je n'ai pas d'allergie connue, rassurez-vous.", en:"I don't have any known allergies, don't worry."},
    {fr:"On m'a conseillé de surélever ma cheville et de la glacer.", en:"I was advised to elevate my ankle and ice it."},
    {fr:"L'infirmière a été très rassurante.", en:"The nurse was very reassuring."},
    {fr:"Heureusement, mon assurance voyage couvre ce genre de frais.", en:"Luckily, my travel insurance covers this kind of expense."},
    {fr:"Ce n'était rien de grave, juste un peu douloureux.", en:"It was nothing serious, just a bit painful."},
    {fr:"Je marche avec une canne en attendant que ça passe.", en:"I'm walking with a cane until it gets better."},
    {fr:"Ça ne va pas m'empêcher de profiter du reste du voyage.", en:"It's not going to stop me from enjoying the rest of the trip."},
    {fr:"Mieux vaut prévenir que guérir, la prochaine fois je ferai attention.", en:"Better safe than sorry, I'll be more careful next time."}
  ]},
  { title:"Photographier ses voyages", phrases:[
    {fr:"La lumière était parfaite juste avant le coucher du soleil.", en:"The light was perfect just before sunset."},
    {fr:"J'ai pris des centaines de photos depuis le début du voyage.", en:"I've taken hundreds of photos since the start of the trip."},
    {fr:"Celle-ci est sans doute ma préférée jusqu'à présent.", en:"This one is probably my favourite so far."},
    {fr:"Je préfère photographier les gens plutôt que les monuments.", en:"I prefer photographing people rather than monuments."},
    {fr:"Mon appareil est tombé en panne de batterie au pire moment.", en:"My camera ran out of battery at the worst moment."},
    {fr:"J'ai failli rater le meilleur coucher de soleil du voyage.", en:"I nearly missed the best sunset of the trip."},
    {fr:"Certains endroits sont encore plus beaux en vrai qu'en photo.", en:"Some places are even more beautiful in person than in photos."},
    {fr:"Je trierai toutes ces photos une fois rentré.", en:"I'll sort through all these photos once I'm back home."},
    {fr:"Ces souvenirs valent bien plus que n'importe quel souvenir acheté.", en:"These memories are worth much more than any souvenir you could buy."},
    {fr:"J'ai hâte de tout partager avec mes proches.", en:"I can't wait to share everything with my family and friends."}
  ]},
  { title:"Rentrer plus tard que prévu", phrases:[
    {fr:"On a décidé de prolonger notre séjour de quelques jours.", en:"We decided to extend our stay by a few days."},
    {fr:"Le voyage nous plaisait tellement qu'on ne voulait pas rentrer.", en:"We were enjoying the trip so much that we didn't want to go home."},
    {fr:"On a dû changer notre billet de retour.", en:"We had to change our return ticket."},
    {fr:"Ça a coûté un peu plus cher, mais ça valait le coup.", en:"It cost a bit more, but it was worth it."},
    {fr:"On a prévenu notre famille qu'on rentrerait plus tard.", en:"We let our family know we'd be coming home later."},
    {fr:"Il nous restait encore tellement de choses à voir.", en:"There were still so many things left to see."},
    {fr:"Le travail peut attendre encore un peu.", en:"Work can wait a little longer."},
    {fr:"On ne regrette absolument pas ce choix.", en:"We don't regret that choice at all."},
    {fr:"Ce genre de décision, on ne la prend pas tous les jours.", en:"You don't make this kind of decision every day."},
    {fr:"Au final, ces quelques jours en plus ont tout changé.", en:"In the end, those extra few days changed everything."}
  ]},
  { title:"Dire au revoir à des amis de voyage", phrases:[
    {fr:"On s'est rencontrés complètement par hasard, dans une auberge.", en:"We met completely by chance, in a hostel."},
    {fr:"On a voyagé ensemble pendant presque une semaine.", en:"We travelled together for almost a week."},
    {fr:"C'est toujours difficile de dire au revoir après ça.", en:"It's always hard to say goodbye after that."},
    {fr:"On a échangé nos coordonnées avant de se séparer.", en:"We exchanged contact details before parting ways."},
    {fr:"Ils viennent d'un pays complètement différent du mien.", en:"They come from a completely different country from mine."},
    {fr:"On a promis de se revoir un jour, quelque part.", en:"We promised to meet again someday, somewhere."},
    {fr:"Ce genre de rencontre rend le voyage encore plus spécial.", en:"This kind of meeting makes the trip even more special."},
    {fr:"On garde contact régulièrement depuis.", en:"We've kept in touch regularly since then."},
    {fr:"Ils nous ont même invités chez eux, un jour.", en:"They even invited us to visit them one day."},
    {fr:"Ces amitiés improvisées sont souvent les plus belles.", en:"These unplanned friendships are often the best ones."}
  ]},
  { title:"S'adapter à la nourriture locale", phrases:[
    {fr:"On a goûté des plats qu'on n'avait jamais vus avant.", en:"We tried dishes we had never seen before."},
    {fr:"Certains plats étaient beaucoup plus épicés que ce à quoi on est habitués.", en:"Some dishes were much spicier than what we're used to."},
    {fr:"Je ne savais pas du tout à quoi m'attendre.", en:"I had no idea what to expect."},
    {fr:"Finalement, ça s'est avéré être l'un de mes plats préférés.", en:"In the end, it turned out to be one of my favourite dishes."},
    {fr:"On a appris à manger avec les mains, comme tout le monde ici.", en:"We learned to eat with our hands, like everyone here."},
    {fr:"Le serveur nous a expliqué ce qu'il y avait dans chaque plat.", en:"The waiter explained what was in each dish."},
    {fr:"Certaines odeurs étaient un peu déroutantes au début.", en:"Some smells were a bit confusing at first."},
    {fr:"On s'est vite habitués aux nouvelles saveurs.", en:"We quickly got used to the new flavours."},
    {fr:"Manger local, c'est aussi une façon de découvrir la culture.", en:"Eating local food is also a way of discovering the culture."},
    {fr:"Je vais sûrement essayer de reproduire ce plat une fois chez moi.", en:"I'll probably try to recreate this dish once I'm back home."}
  ]},
  { title:"Un changement de programme de dernière minute", phrases:[
    {fr:"Notre guide nous a prévenus que le site était fermé aujourd'hui.", en:"Our guide warned us that the site was closed today."},
    {fr:"On a dû revoir tout notre programme en quelques minutes.", en:"We had to rethink our whole schedule in a few minutes."},
    {fr:"Au final, on a trouvé une alternative encore meilleure.", en:"In the end, we found an even better alternative."},
    {fr:"Ce genre de changement fait partie du voyage, j'imagine.", en:"I guess this kind of change is just part of travelling."},
    {fr:"On a appris à ne pas trop s'attacher à nos plans.", en:"We learned not to get too attached to our plans."},
    {fr:"L'improvisation nous a souvent réussi, en fin de compte.", en:"Improvising often worked out well for us, in the end."},
    {fr:"On a fini la journée complètement différemment de ce qui était prévu.", en:"We ended the day completely differently from what was planned."},
    {fr:"Et honnêtement, c'était l'une de nos meilleures journées.", en:"And honestly, it was one of our best days."},
    {fr:"Ça nous a rappelé qu'il faut rester flexible en voyage.", en:"It reminded us that you have to stay flexible while travelling."},
    {fr:"On a hâte de voir ce que la suite nous réserve.", en:"We can't wait to see what comes next."}
  ]},
  { title:"Bilan du module voyage", phrases:[
    {fr:"Ce voyage nous a appris à être plus flexibles.", en:"This trip taught us to be more flexible."},
    {fr:"On a dû s'adapter à beaucoup d'imprévus, mais ça valait le coup.", en:"We had to deal with a lot of unexpected things, but it was worth it."},
    {fr:"Chaque étape nous a appris quelque chose de différent.", en:"Each stage taught us something different."},
    {fr:"On a rencontré des gens qu'on n'oubliera jamais.", en:"We met people we'll never forget."},
    {fr:"Certains imprévus se sont transformés en nos meilleurs souvenirs.", en:"Some unexpected moments turned into our best memories."},
    {fr:"On revient avec beaucoup plus de confiance en nous.", en:"We're coming back with a lot more self-confidence."},
    {fr:"Ce vocabulaire va nous servir pour tous nos futurs voyages.", en:"This vocabulary is going to be useful for all our future trips."},
    {fr:"Prochaine étape : le module « Conversation sociale ».", en:"Next stop: the \"Social conversation\" module."},
    {fr:"Bravo, tu as terminé le module « En voyage » du niveau 2 !", en:"Well done, you've completed the level 2 \"Travelling\" module!"},
    {fr:"On se retrouve très vite pour la suite.", en:"See you again very soon for what comes next."}
  ]}
];
