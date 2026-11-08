/* ============================================================
   MON TRAJET EN ANGLAIS — données de contenu
   Structure multi-niveaux : LEVELS[] contient un tableau de niveaux,
   chacun avec ses propres MODULES (même forme que l'ancien système
   à un seul niveau). Voir README.md pour l'état d'avancement détaillé.

   NIVEAU 1 (terminé) : 600 phrases, 3 modules x 200 phrases x 20
   leçons de 10, 15 points de grammaire.

   NIVEAU 2 (en cours) : même structure, vocabulaire un peu plus
   riche et phrases un peu plus complexes que le niveau 1 (sans
   viser le niveau 3, qui ira plus loin). Module 1 "Le quotidien"
   terminé (200 phrases, 5 points de grammaire) ; modules 2 et 3 en
   attente de rédaction.
   ============================================================ */

const ICONS = {
  headphones:'<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 14v-2a9 9 0 0118 0v2"/><path d="M21 14a2 2 0 01-2 2h-1a2 2 0 01-2-2v-1a2 2 0 012-2h3v3z"/><path d="M3 14a2 2 0 002 2h1a2 2 0 002-2v-1a2 2 0 00-2-2H3v3z"/></svg>',
  speaker:'<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07"/></svg>',
  repeat:'<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 2l4 4-4 4"/><path d="M3 11V9a4 4 0 014-4h14"/><path d="M7 22l-4-4 4-4"/><path d="M21 13v2a4 4 0 01-4 4H3"/></svg>',
  check:'<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>',
  lock:'<svg viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V7a4 4 0 018 0v4"/></svg>'
};

/* --- Module 1 : leçons 1 à 10 (gratuites) --- */
const module1Lessons = [
  { title:"Bienvenue en Amérique", phrases:[
    {fr:"Bienvenue aux États-Unis !", en:"Welcome to the United States!"},
    {fr:"J'ai réservé une voiture.", en:"I have booked a car."},
    {fr:"Voici mon passeport.", en:"Here is my passport."},
    {fr:"Combien de temps restez-vous ?", en:"How long are you staying?"},
    {fr:"Je reste deux semaines.", en:"I'm staying for two weeks."},
    {fr:"Où puis-je récupérer mes bagages ?", en:"Where can I pick up my luggage?"},
    {fr:"Avez-vous quelque chose à déclarer ?", en:"Do you have anything to declare?"},
    {fr:"Non, rien à déclarer.", en:"No, nothing to declare."},
    {fr:"Profitez de votre séjour !", en:"Enjoy your stay!"},
    {fr:"Merci, à vous aussi.", en:"Thank you, you too."}
  ]},
  { title:"Sur la Route 66", phrases:[
    {fr:"On prend la Route 66 ?", en:"Shall we take Route 66?"},
    {fr:"Il faut faire le plein d'essence.", en:"We need to fill up the gas tank."},
    {fr:"La prochaine station-service est loin ?", en:"Is the next gas station far?"},
    {fr:"Tournez à gauche après le pont.", en:"Turn left after the bridge."},
    {fr:"La route est magnifique.", en:"The road is beautiful."},
    {fr:"On roule vers l'ouest.", en:"We're driving west."},
    {fr:"Il y a un panneau \"bienvenue en Arizona\".", en:"There's a sign that says \"welcome to Arizona.\""},
    {fr:"Le désert s'étend à perte de vue.", en:"The desert stretches as far as the eye can see."},
    {fr:"On s'arrête pour prendre une photo ?", en:"Shall we stop to take a picture?"},
    {fr:"Le coucher de soleil est incroyable.", en:"The sunset is incredible."}
  ]},
  { title:"Le diner américain", phrases:[
    {fr:"Une table pour deux, s'il vous plaît.", en:"A table for two, please."},
    {fr:"Qu'est-ce que vous recommandez ?", en:"What do you recommend?"},
    {fr:"Je voudrais des pancakes.", en:"I would like some pancakes."},
    {fr:"Avec du sirop d'érable, s'il vous plaît.", en:"With maple syrup, please."},
    {fr:"Vous avez du pudding au chocolat ?", en:"Do you have chocolate pudding?"},
    {fr:"L'addition, s'il vous plaît.", en:"The check, please."},
    {fr:"C'est délicieux.", en:"This is delicious."},
    {fr:"Je meurs de faim.", en:"I'm starving."},
    {fr:"On partage une part de tarte aux pommes ?", en:"Shall we share a slice of apple pie?"},
    {fr:"Le service était excellent.", en:"The service was excellent."}
  ], tip:{
    title:"« The check » ou « the bill » ?",
    example:"L'addition, s'il vous plaît. — <b>The check</b>, please.",
    body:"Aux États-Unis, on demande « the check ». Au Royaume-Uni, on dira plutôt « the bill ». Les deux sont compris partout, mais utiliser le bon mot selon le pays rend ton anglais plus naturel."
  }},
  { title:"Direction l'Arizona", phrases:[
    {fr:"Le Grand Canyon est juste devant nous.", en:"The Grand Canyon is right in front of us."},
    {fr:"C'est plus grand que je ne l'imaginais.", en:"It's bigger than I imagined."},
    {fr:"Fais attention au bord.", en:"Be careful near the edge."},
    {fr:"Il fait très chaud aujourd'hui.", en:"It's very hot today."},
    {fr:"N'oublie pas de boire de l'eau.", en:"Don't forget to drink water."},
    {fr:"On peut faire une randonnée ?", en:"Can we go for a hike?"},
    {fr:"Le sentier est assez difficile.", en:"The trail is quite difficult."},
    {fr:"Regarde ce cactus énorme !", en:"Look at that huge cactus!"},
    {fr:"Le ciel est complètement dégagé.", en:"The sky is completely clear."},
    {fr:"Cet endroit est magique.", en:"This place is magical."}
  ]},
  { title:"Soirée à la belle étoile", phrases:[
    {fr:"On installe le camp ici.", en:"Let's set up camp here."},
    {fr:"Peux-tu allumer le feu ?", en:"Can you light the fire?"},
    {fr:"Il commence à faire froid.", en:"It's starting to get cold."},
    {fr:"Regarde toutes ces étoiles.", en:"Look at all these stars."},
    {fr:"On dirait la Voie lactée.", en:"It looks like the Milky Way."},
    {fr:"Raconte-moi une histoire.", en:"Tell me a story."},
    {fr:"J'entends un coyote au loin.", en:"I hear a coyote in the distance."},
    {fr:"Ce voyage restera gravé dans ma mémoire.", en:"This trip will stay in my memory."},
    {fr:"Demain, on continue vers la Californie.", en:"Tomorrow, we continue toward California."},
    {fr:"Bonne nuit, dors bien.", en:"Good night, sleep well."}
  ]},
  { title:"Achats et shopping", phrases:[
    {fr:"Je cherche une pharmacie.", en:"I'm looking for a pharmacy."},
    {fr:"Avez-vous ceci en taille moyenne ?", en:"Do you have this in medium?"},
    {fr:"Puis-je l'essayer ?", en:"Can I try it on?"},
    {fr:"C'est en solde ?", en:"Is this on sale?"},
    {fr:"Je prends celui-ci.", en:"I'll take this one."},
    {fr:"Acceptez-vous les cartes de crédit ?", en:"Do you accept credit cards?"},
    {fr:"Voici votre monnaie.", en:"Here is your change."},
    {fr:"Le magasin ferme à quelle heure ?", en:"What time does the store close?"},
    {fr:"Puis-je avoir un sac ?", en:"Can I get a bag?"},
    {fr:"Merci pour votre aide.", en:"Thank you for your help."}
  ], tip:{
    title:"Poser une question avec « do / does »",
    example:"Avez-vous ceci en taille moyenne ? — <b>Do</b> you have this in medium?",
    body:"En français, on inverse simplement le sujet et le verbe (« Avez-vous »). En anglais, il faut ajouter l'auxiliaire « do » (ou « does » à la 3e personne du singulier) devant le sujet : « Do you have... », « Does she like... »."
  }},
  { title:"Au téléphone", phrases:[
    {fr:"Allô, qui est à l'appareil ?", en:"Hello, who's calling?"},
    {fr:"Pouvez-vous patienter un instant ?", en:"Can you hold on a moment?"},
    {fr:"Je rappelle plus tard.", en:"I'll call back later."},
    {fr:"Vous avez fait un mauvais numéro.", en:"You have the wrong number."},
    {fr:"Je n'ai plus de batterie.", en:"My battery is dead."},
    {fr:"La ligne est mauvaise.", en:"The line is bad."},
    {fr:"Pouvez-vous parler plus fort ?", en:"Can you speak louder?"},
    {fr:"Je vous envoie un message.", en:"I'll send you a text."},
    {fr:"Laissez un message après le bip.", en:"Leave a message after the beep."},
    {fr:"À plus tard !", en:"Talk to you later!"}
  ]},
  { title:"À l'hôtel", phrases:[
    {fr:"J'ai une réservation au nom de Dupont.", en:"I have a reservation under the name Dupont."},
    {fr:"Avez-vous une chambre avec vue ?", en:"Do you have a room with a view?"},
    {fr:"Le petit-déjeuner est-il inclus ?", en:"Is breakfast included?"},
    {fr:"À quelle heure est le check-out ?", en:"What time is check-out?"},
    {fr:"Le Wi-Fi est-il gratuit ?", en:"Is the Wi-Fi free?"},
    {fr:"Pouvez-vous appeler un taxi ?", en:"Can you call a taxi?"},
    {fr:"Il y a un problème avec la climatisation.", en:"There's a problem with the air conditioning."},
    {fr:"Pouvez-vous monter mes bagages ?", en:"Can you bring up my luggage?"},
    {fr:"Je voudrais prolonger mon séjour.", en:"I would like to extend my stay."},
    {fr:"Merci pour votre accueil.", en:"Thank you for your hospitality."}
  ]},
  { title:"Petits imprévus", phrases:[
    {fr:"J'ai perdu mes clés.", en:"I lost my keys."},
    {fr:"Ma valise n'est pas arrivée.", en:"My suitcase didn't arrive."},
    {fr:"Je me suis trompé de route.", en:"I took the wrong road."},
    {fr:"La voiture ne démarre pas.", en:"The car won't start."},
    {fr:"Il me faut un mécanicien.", en:"I need a mechanic."},
    {fr:"Où est le poste de police le plus proche ?", en:"Where is the nearest police station?"},
    {fr:"J'ai besoin d'un médecin.", en:"I need a doctor."},
    {fr:"Ce n'est pas grave.", en:"It's not a big deal."},
    {fr:"Tout va s'arranger.", en:"Everything will work out."},
    {fr:"On trouvera une solution.", en:"We'll find a solution."}
  ], tip:{
    title:"« Won't » = will not",
    example:"La voiture ne démarre pas. — The car <b>won't</b> start.",
    body:"« Won't » est la contraction de « will not ». On l'utilise pour dire qu'une chose refuse de fonctionner ou n'arrivera pas — un peu comme « ne veut pas » en français familier : « the car won't start » = « la voiture ne veut pas démarrer »."
  }},
  { title:"Bilan et petite conversation", phrases:[
    {fr:"Comment se passe ton séjour ?", en:"How is your stay going?"},
    {fr:"Ça se passe très bien, merci.", en:"It's going very well, thank you."},
    {fr:"Qu'est-ce que tu as préféré ?", en:"What did you like the most?"},
    {fr:"J'ai adoré le Grand Canyon.", en:"I loved the Grand Canyon."},
    {fr:"On devrait revenir un jour.", en:"We should come back someday."},
    {fr:"Je suis fatigué mais heureux.", en:"I'm tired but happy."},
    {fr:"C'était un super voyage.", en:"It was a great trip."},
    {fr:"J'ai hâte de raconter ça à mes amis.", en:"I can't wait to tell my friends about this."},
    {fr:"On se refait ça l'année prochaine ?", en:"Shall we do this again next year?"},
    {fr:"Bravo, tu as terminé les leçons gratuites !", en:"Well done, you've finished the free lessons!"}
  ]}
];

/* --- Module 1 : leçons 11 à 20 (version complète, payante) --- */
const module1Lessons11to20 = [
  { title:"Prendre le bus et le métro", phrases:[
    {fr:"Où est l'arrêt de bus le plus proche ?", en:"Where is the nearest bus stop?"},
    {fr:"Ce bus va au centre-ville ?", en:"Does this bus go downtown?"},
    {fr:"Combien coûte un ticket ?", en:"How much does a ticket cost?"},
    {fr:"Je dois changer de ligne ?", en:"Do I need to change lines?"},
    {fr:"C'est quoi, la prochaine station ?", en:"What's the next station?"},
    {fr:"Vous descendez ici ?", en:"Are you getting off here?"},
    {fr:"Le métro est bondé aux heures de pointe.", en:"The subway is crowded during rush hour."},
    {fr:"Il faut valider son ticket.", en:"You need to validate your ticket."},
    {fr:"J'ai raté ma correspondance.", en:"I missed my connection."},
    {fr:"On y est presque.", en:"We're almost there."}
  ]},
  { title:"Louer un logement", phrases:[
    {fr:"Je cherche un appartement à louer.", en:"I'm looking for an apartment to rent."},
    {fr:"Combien coûte le loyer par mois ?", en:"How much is the rent per month?"},
    {fr:"Les charges sont-elles incluses ?", en:"Are utilities included?"},
    {fr:"Puis-je visiter cet après-midi ?", en:"Can I visit this afternoon?"},
    {fr:"Le quartier est-il calme ?", en:"Is the neighborhood quiet?"},
    {fr:"Y a-t-il un parking ?", en:"Is there parking?"},
    {fr:"Le bail dure combien de temps ?", en:"How long is the lease?"},
    {fr:"Je voudrais signer le contrat.", en:"I would like to sign the contract."},
    {fr:"Quand puis-je emménager ?", en:"When can I move in?"},
    {fr:"C'est exactement ce que je cherchais.", en:"This is exactly what I was looking for."}
  ]},
  { title:"Au travail", phrases:[
    {fr:"J'ai une réunion à dix heures.", en:"I have a meeting at ten o'clock."},
    {fr:"Pouvez-vous m'envoyer le rapport ?", en:"Can you send me the report?"},
    {fr:"Le projet avance bien.", en:"The project is going well."},
    {fr:"Nous avons un délai serré.", en:"We have a tight deadline."},
    {fr:"Je travaille de chez moi aujourd'hui.", en:"I'm working from home today."},
    {fr:"Mon collègue est en congé.", en:"My colleague is on vacation."},
    {fr:"Pouvons-nous reporter la réunion ?", en:"Can we reschedule the meeting?"},
    {fr:"J'ai terminé la présentation.", en:"I finished the presentation."},
    {fr:"C'est une belle opportunité.", en:"It's a great opportunity."},
    {fr:"Bon travail aujourd'hui.", en:"Good work today."}
  ]},
  { title:"Chez le médecin", phrases:[
    {fr:"J'ai rendez-vous à quinze heures.", en:"I have an appointment at three o'clock."},
    {fr:"Où avez-vous mal ?", en:"Where does it hurt?"},
    {fr:"J'ai mal à la tête depuis ce matin.", en:"I've had a headache since this morning."},
    {fr:"Êtes-vous allergique à un médicament ?", en:"Are you allergic to any medication?"},
    {fr:"Prenez ce médicament deux fois par jour.", en:"Take this medicine twice a day."},
    {fr:"Ce n'est rien de grave.", en:"It's nothing serious."},
    {fr:"Je me sens beaucoup mieux.", en:"I feel much better."},
    {fr:"Vous devez vous reposer.", en:"You need to rest."},
    {fr:"Voici votre ordonnance.", en:"Here is your prescription."},
    {fr:"Prenez soin de vous.", en:"Take care of yourself."}
  ]},
  { title:"Faire du sport", phrases:[
    {fr:"Je vais courir tous les matins.", en:"I go running every morning."},
    {fr:"Tu fais quel sport ?", en:"What sport do you do?"},
    {fr:"On joue au tennis ce week-end ?", en:"Shall we play tennis this weekend?"},
    {fr:"J'ai couru dix kilomètres hier.", en:"I ran ten kilometers yesterday."},
    {fr:"Elle nage depuis son enfance.", en:"She has been swimming since childhood."},
    {fr:"Je vais à la salle de sport après le travail.", en:"I go to the gym after work."},
    {fr:"Il faut s'échauffer avant de commencer.", en:"You need to warm up before starting."},
    {fr:"Je suis épuisé après cet entraînement.", en:"I'm exhausted after this workout."},
    {fr:"Continue, tu y es presque !", en:"Keep going, you're almost there!"},
    {fr:"Le sport me fait du bien.", en:"Exercise makes me feel good."}
  ], tip:{
    title:"« Depuis » → present perfect en anglais",
    example:"Elle nage depuis son enfance. — She <b>has been swimming</b> since childhood.",
    body:"Quand une action a commencé dans le passé et continue encore aujourd'hui, le français reste au présent (« nage depuis »), mais l'anglais passe au present perfect (continuous) : « has been swimming ». C'est un des pièges les plus fréquents pour un francophone."
  }},
  { title:"Parler de la météo", phrases:[
    {fr:"Quel temps fait-il aujourd'hui ?", en:"What's the weather like today?"},
    {fr:"Il pleut depuis ce matin.", en:"It's been raining since this morning."},
    {fr:"Le ciel est nuageux.", en:"The sky is cloudy."},
    {fr:"Il va faire beau demain.", en:"It's going to be nice tomorrow."},
    {fr:"N'oublie pas ton parapluie.", en:"Don't forget your umbrella."},
    {fr:"Il fait un froid glacial.", en:"It's freezing cold."},
    {fr:"La météo annonce de la neige.", en:"The forecast says snow."},
    {fr:"J'adore les journées ensoleillées.", en:"I love sunny days."},
    {fr:"Le vent souffle fort ce soir.", en:"The wind is blowing hard tonight."},
    {fr:"On dirait qu'un orage arrive.", en:"It looks like a storm is coming."}
  ]},
  { title:"Inviter des amis", phrases:[
    {fr:"Tu es libre samedi soir ?", en:"Are you free Saturday night?"},
    {fr:"Ça te dit de venir dîner ?", en:"Would you like to come for dinner?"},
    {fr:"J'organise une petite fête.", en:"I'm throwing a small party."},
    {fr:"Amène qui tu veux.", en:"Bring whoever you want."},
    {fr:"À quelle heure on se retrouve ?", en:"What time shall we meet?"},
    {fr:"J'ai hâte de te revoir.", en:"I can't wait to see you again."},
    {fr:"Merci de m'avoir invité.", en:"Thanks for inviting me."},
    {fr:"On s'est bien amusés hier soir.", en:"We had a lot of fun last night."},
    {fr:"La prochaine fois, c'est chez moi.", en:"Next time, it's at my place."},
    {fr:"Prends soin de toi et à bientôt.", en:"Take care and see you soon."}
  ]},
  { title:"Au restaurant, niveau 2", phrases:[
    {fr:"Avez-vous une table en terrasse ?", en:"Do you have a table on the terrace?"},
    {fr:"Quel est le plat du jour ?", en:"What's today's special?"},
    {fr:"Je suis végétarien.", en:"I'm a vegetarian."},
    {fr:"Sans gluten, si possible.", en:"Gluten-free, if possible."},
    {fr:"Le plat était un peu trop salé.", en:"The dish was a bit too salty."},
    {fr:"Pouvons-nous avoir plus de pain ?", en:"Can we have more bread?"},
    {fr:"C'était un repas mémorable.", en:"It was a memorable meal."},
    {fr:"Séparément ou ensemble, l'addition ?", en:"Separate checks or together?"},
    {fr:"Gardez la monnaie.", en:"Keep the change."},
    {fr:"On reviendra, c'est certain.", en:"We'll definitely come back."}
  ]},
  { title:"Donner son avis", phrases:[
    {fr:"À mon avis, c'est une bonne idée.", en:"In my opinion, it's a good idea."},
    {fr:"Je ne suis pas tout à fait d'accord.", en:"I don't completely agree."},
    {fr:"Ça dépend du point de vue.", en:"It depends on your point of view."},
    {fr:"Tu as raison sur ce point.", en:"You're right about that."},
    {fr:"Honnêtement, je préfère l'autre option.", en:"Honestly, I prefer the other option."},
    {fr:"Ce n'est pas si simple.", en:"It's not that simple."},
    {fr:"Je comprends ton point de vue.", en:"I understand your point of view."},
    {fr:"On devrait en discuter davantage.", en:"We should discuss it more."},
    {fr:"Chacun voit midi à sa porte.", en:"To each their own."},
    {fr:"Au final, c'est toi qui décides.", en:"In the end, it's your decision."}
  ]},
  { title:"Réserver des vacances", phrases:[
    {fr:"Je voudrais réserver un vol pour Londres.", en:"I would like to book a flight to London."},
    {fr:"Quelle est la meilleure période pour y aller ?", en:"What's the best time to go?"},
    {fr:"L'hôtel est-il proche de la plage ?", en:"Is the hotel close to the beach?"},
    {fr:"Je préfère un vol direct.", en:"I prefer a direct flight."},
    {fr:"Faut-il un visa pour ce pays ?", en:"Do I need a visa for this country?"},
    {fr:"Le séjour dure combien de temps ?", en:"How long is the trip?"},
    {fr:"J'ai déjà fait ma valise.", en:"I've already packed my suitcase."},
    {fr:"On part dans une semaine !", en:"We leave in a week!"},
    {fr:"Ce voyage, je l'attends depuis longtemps.", en:"I've been waiting for this trip for a long time."},
    {fr:"Bienvenue dans la version complète de Mon Trajet en Anglais !", en:"Welcome to the full version of My English Journey!"}
  ], tip:{
    title:"« For » vs « since »",
    example:"Je l'attends depuis longtemps. — I've been waiting <b>for</b> a long time.",
    body:"« For » précise une durée (« for a long time », « for three years »). « Since » précise un point de départ dans le temps (« since childhood », « since Monday »). Les deux s'utilisent avec le present perfect, mais ne se confondent pas : durée = for, point de départ = since."
  }}
];

/* --- Module 2 : "En voyage" — 20 leçons, 200 phrases (version complète) --- */
const module2Lessons = [
  { title:"À l'aéroport (enregistrement)", phrases:[
    {fr:"Où est le comptoir d'enregistrement ?", en:"Where is the check-in counter?"},
    {fr:"Voici mon billet et mon passeport.", en:"Here is my ticket and my passport."},
    {fr:"Combien de bagages puis-je enregistrer ?", en:"How many bags can I check in?"},
    {fr:"Ce sac est-il trop lourd ?", en:"Is this bag too heavy?"},
    {fr:"Je voudrais un siège côté couloir.", en:"I would like an aisle seat."},
    {fr:"À quelle porte dois-je me rendre ?", en:"Which gate should I go to?"},
    {fr:"Le vol est-il à l'heure ?", en:"Is the flight on time?"},
    {fr:"L'embarquement commence à quelle heure ?", en:"What time does boarding start?"},
    {fr:"J'ai un vol de correspondance à prendre.", en:"I have a connecting flight to catch."},
    {fr:"Bon voyage !", en:"Have a nice flight!"}
  ]},
  { title:"Passer la douane et la sécurité", phrases:[
    {fr:"Veuillez retirer vos chaussures.", en:"Please take off your shoes."},
    {fr:"Videz vos poches, s'il vous plaît.", en:"Empty your pockets, please."},
    {fr:"Mettez votre ordinateur portable dans le bac.", en:"Put your laptop in the tray."},
    {fr:"Quel est le motif de votre visite ?", en:"What is the purpose of your visit?"},
    {fr:"Je suis ici pour le tourisme.", en:"I'm here for tourism."},
    {fr:"Où logerez-vous ?", en:"Where will you be staying?"},
    {fr:"Voici mon billet retour.", en:"Here is my return ticket."},
    {fr:"Je n'ai rien à déclarer.", en:"I have nothing to declare."},
    {fr:"Puis-je passer maintenant ?", en:"Can I go through now?"},
    {fr:"Merci, bon séjour.", en:"Thank you, enjoy your stay."}
  ]},
  { title:"Dans l'avion", phrases:[
    {fr:"Excusez-moi, c'est ma place.", en:"Excuse me, this is my seat."},
    {fr:"Pouvez-vous m'aider avec mon bagage à main ?", en:"Can you help me with my carry-on?"},
    {fr:"Voulez-vous quelque chose à boire ?", en:"Would you like something to drink?"},
    {fr:"De l'eau, s'il vous plaît.", en:"Water, please."},
    {fr:"Attachez votre ceinture.", en:"Fasten your seatbelt."},
    {fr:"Combien de temps dure le vol ?", en:"How long is the flight?"},
    {fr:"Je ne me sens pas très bien.", en:"I don't feel very well."},
    {fr:"Avez-vous un sac pour le mal des transports ?", en:"Do you have a sickness bag?"},
    {fr:"Nous allons atterrir dans dix minutes.", en:"We're landing in ten minutes."},
    {fr:"Merci d'avoir volé avec nous.", en:"Thank you for flying with us."}
  ], tip:{
    title:"« Be going to » pour le futur proche",
    example:"Nous allons atterrir dans dix minutes. — We <b>are going to</b> land in ten minutes.",
    body:"Bonne nouvelle : cette structure ressemble beaucoup au français ! « Aller + infinitif » devient « to be going to + verbe ». On l'utilise pour une action prévue ou sur le point de se produire : « we're going to land », « it's going to rain »."
  }},
  { title:"Récupérer ses bagages", phrases:[
    {fr:"Où récupère-t-on les bagages ?", en:"Where do we pick up the luggage?"},
    {fr:"Mon sac n'est pas sorti.", en:"My bag hasn't come out."},
    {fr:"Il a été perdu, je crois.", en:"I think it's been lost."},
    {fr:"Voici mon reçu de bagage.", en:"Here is my luggage receipt."},
    {fr:"Où est la sortie ?", en:"Where is the exit?"},
    {fr:"Y a-t-il un bureau d'information touristique ?", en:"Is there a tourist information desk?"},
    {fr:"Où puis-je trouver un chariot ?", en:"Where can I find a cart?"},
    {fr:"La navette pour le centre-ville part d'où ?", en:"Where does the shuttle to downtown leave from?"},
    {fr:"J'ai hâte de découvrir la ville.", en:"I can't wait to explore the city."},
    {fr:"Enfin arrivés !", en:"We finally made it!"}
  ]},
  { title:"Prendre un taxi ou un VTC", phrases:[
    {fr:"Pouvez-vous m'emmener à cette adresse ?", en:"Can you take me to this address?"},
    {fr:"Combien coûte la course ?", en:"How much is the ride?"},
    {fr:"C'est loin d'ici ?", en:"Is it far from here?"},
    {fr:"Pouvez-vous allumer le compteur ?", en:"Can you turn on the meter?"},
    {fr:"Prenez le chemin le plus rapide, s'il vous plaît.", en:"Take the fastest way, please."},
    {fr:"Pouvez-vous vous arrêter ici ?", en:"Can you stop here?"},
    {fr:"Gardez la monnaie.", en:"Keep the change."},
    {fr:"J'ai commandé une voiture.", en:"I ordered a car."},
    {fr:"Le chauffeur arrive dans deux minutes.", en:"The driver is arriving in two minutes."},
    {fr:"Merci pour la course.", en:"Thanks for the ride."}
  ]},
  { title:"Louer une voiture", phrases:[
    {fr:"Je voudrais louer une voiture pour trois jours.", en:"I would like to rent a car for three days."},
    {fr:"Avez-vous un permis de conduire international ?", en:"Do you have an international driver's license?"},
    {fr:"L'assurance est-elle incluse ?", en:"Is insurance included?"},
    {fr:"La voiture est-elle automatique ou manuelle ?", en:"Is the car automatic or manual?"},
    {fr:"Le réservoir est-il plein ?", en:"Is the tank full?"},
    {fr:"Où dois-je rendre la voiture ?", en:"Where do I return the car?"},
    {fr:"Que dois-je faire en cas d'accident ?", en:"What should I do in case of an accident?"},
    {fr:"Le kilométrage est-il illimité ?", en:"Is the mileage unlimited?"},
    {fr:"Voici les clés.", en:"Here are the keys."},
    {fr:"Bonne route !", en:"Safe travels!"}
  ], tip:{
    title:"Question avec « to be » : pas besoin de « do »",
    example:"L'assurance est-elle incluse ? — <b>Is</b> insurance included?",
    body:"On avait vu que « do/does » s'ajoute pour la plupart des verbes. Mais avec le verbe « to be » (être), pas besoin de « do » : on inverse juste « is/are » avec le sujet, comme en français — « Is insurance included? », « Are you ready? »."
  }},
  { title:"Trouver son chemin", phrases:[
    {fr:"Excusez-moi, je suis perdu.", en:"Excuse me, I'm lost."},
    {fr:"Comment puis-je aller au centre-ville ?", en:"How can I get downtown?"},
    {fr:"Est-ce que c'est loin à pied ?", en:"Is it far on foot?"},
    {fr:"Continuez tout droit.", en:"Keep going straight."},
    {fr:"Tournez à droite au feu.", en:"Turn right at the traffic light."},
    {fr:"C'est juste après le pont.", en:"It's just after the bridge."},
    {fr:"Vous ne pouvez pas le rater.", en:"You can't miss it."},
    {fr:"Avez-vous un plan de la ville ?", en:"Do you have a map of the city?"},
    {fr:"Merci pour les indications.", en:"Thanks for the directions."},
    {fr:"J'ai trouvé, merci !", en:"I found it, thanks!"}
  ]},
  { title:"Prendre le train", phrases:[
    {fr:"Un billet pour Boston, s'il vous plaît.", en:"A ticket to Boston, please."},
    {fr:"Aller simple ou aller-retour ?", en:"One-way or round trip?"},
    {fr:"À quel quai part le train ?", en:"Which platform does the train leave from?"},
    {fr:"Le train a du retard.", en:"The train is delayed."},
    {fr:"Est-ce que cette place est libre ?", en:"Is this seat free?"},
    {fr:"Où est la voiture-restaurant ?", en:"Where is the dining car?"},
    {fr:"Prochain arrêt, dans dix minutes.", en:"Next stop, in ten minutes."},
    {fr:"N'oubliez pas vos affaires.", en:"Don't forget your belongings."},
    {fr:"Le contrôleur vérifie les billets.", en:"The conductor is checking tickets."},
    {fr:"Terminus, tout le monde descend.", en:"Last stop, everyone off."}
  ]},
  { title:"À la gare routière", phrases:[
    {fr:"À quelle heure part le prochain bus ?", en:"What time does the next bus leave?"},
    {fr:"Combien de temps dure le trajet ?", en:"How long is the ride?"},
    {fr:"Y a-t-il des arrêts en chemin ?", en:"Are there stops along the way?"},
    {fr:"Puis-je mettre ma valise en soute ?", en:"Can I put my suitcase in the hold?"},
    {fr:"Le bus est complet.", en:"The bus is full."},
    {fr:"Y a-t-il des toilettes à bord ?", en:"Is there a bathroom on board?"},
    {fr:"Combien de temps dure la pause ?", en:"How long is the break?"},
    {fr:"On arrive bientôt ?", en:"Are we almost there?"},
    {fr:"Le chauffeur est très sympathique.", en:"The driver is very friendly."},
    {fr:"Merci, bonne continuation.", en:"Thank you, take care."}
  ], tip:{
    title:"« There is » / « there are »",
    example:"Y a-t-il des toilettes à bord ? — <b>Is there</b> a bathroom on board?",
    body:"« Il y a » se traduit par « there is » (singulier) ou « there are » (pluriel). À la forme interrogative, on inverse : « Is there... ? » / « Are there... ? ». C'est une des structures les plus utiles à automatiser en anglais."
  }},
  { title:"Arriver à l'hôtel", phrases:[
    {fr:"Bonjour, j'ai une réservation.", en:"Hello, I have a reservation."},
    {fr:"À quel nom, s'il vous plaît ?", en:"Under what name, please?"},
    {fr:"Puis-je voir une pièce d'identité ?", en:"May I see some ID?"},
    {fr:"Voici votre clé de chambre.", en:"Here is your room key."},
    {fr:"Votre chambre est au troisième étage.", en:"Your room is on the third floor."},
    {fr:"Où se trouve l'ascenseur ?", en:"Where is the elevator?"},
    {fr:"Le service en chambre est disponible toute la nuit.", en:"Room service is available all night."},
    {fr:"Puis-je avoir un réveil demain matin ?", en:"Can I get a wake-up call tomorrow morning?"},
    {fr:"Profitez de votre séjour parmi nous.", en:"Enjoy your stay with us."},
    {fr:"Merci beaucoup, à bientôt.", en:"Thank you very much, see you soon."}
  ]},
  { title:"Problèmes à l'hôtel", phrases:[
    {fr:"Il n'y a pas d'eau chaude.", en:"There's no hot water."},
    {fr:"La chambre n'est pas propre.", en:"The room isn't clean."},
    {fr:"Puis-je changer de chambre ?", en:"Can I change rooms?"},
    {fr:"La climatisation ne fonctionne pas.", en:"The air conditioning isn't working."},
    {fr:"Il y a trop de bruit dans le couloir.", en:"There's too much noise in the hallway."},
    {fr:"Pouvez-vous envoyer quelqu'un ?", en:"Can you send someone?"},
    {fr:"Je suis désolé pour le désagrément.", en:"I'm sorry for the inconvenience."},
    {fr:"Nous allons résoudre ça rapidement.", en:"We'll fix that quickly."},
    {fr:"Merci de votre compréhension.", en:"Thank you for your understanding."},
    {fr:"Tout est réglé maintenant.", en:"Everything is sorted now."}
  ]},
  { title:"Visiter un musée", phrases:[
    {fr:"Un billet adulte, s'il vous plaît.", en:"One adult ticket, please."},
    {fr:"Y a-t-il une réduction étudiant ?", en:"Is there a student discount?"},
    {fr:"À quelle heure ferme le musée ?", en:"What time does the museum close?"},
    {fr:"Peut-on prendre des photos ?", en:"Can we take pictures?"},
    {fr:"Où se trouve l'exposition temporaire ?", en:"Where is the temporary exhibition?"},
    {fr:"Avez-vous un audioguide en français ?", en:"Do you have an audio guide in French?"},
    {fr:"Cette œuvre est magnifique.", en:"This artwork is beautiful."},
    {fr:"Il y a énormément à voir.", en:"There is so much to see."},
    {fr:"On pourrait passer la journée ici.", en:"We could spend the whole day here."},
    {fr:"Merci pour la visite.", en:"Thank you for the visit."}
  ]},
  { title:"Faire du tourisme en ville", phrases:[
    {fr:"Quels sont les incontournables à voir ?", en:"What are the must-see sights?"},
    {fr:"Y a-t-il une visite guidée ?", en:"Is there a guided tour?"},
    {fr:"Combien de temps dure la visite ?", en:"How long does the tour last?"},
    {fr:"Ce quartier est très animé.", en:"This neighborhood is very lively."},
    {fr:"On monte au sommet pour la vue ?", en:"Shall we go up for the view?"},
    {fr:"La vue d'ici est à couper le souffle.", en:"The view from here is breathtaking."},
    {fr:"Je pourrais rester ici des heures.", en:"I could stay here for hours."},
    {fr:"Il y a beaucoup de monde aujourd'hui.", en:"There are a lot of people today."},
    {fr:"N'oublie pas de prendre une photo.", en:"Don't forget to take a picture."},
    {fr:"Cette ville est vraiment magnifique.", en:"This city is really beautiful."}
  ]},
  { title:"Acheter des souvenirs", phrases:[
    {fr:"Je cherche un souvenir pour ma famille.", en:"I'm looking for a souvenir for my family."},
    {fr:"Combien coûte cette carte postale ?", en:"How much is this postcard?"},
    {fr:"Avez-vous quelque chose de typique de la région ?", en:"Do you have something typical of the region?"},
    {fr:"C'est fait à la main ?", en:"Is this handmade?"},
    {fr:"Pouvez-vous l'emballer, s'il vous plaît ?", en:"Can you wrap it, please?"},
    {fr:"Je vais en prendre deux.", en:"I'll take two."},
    {fr:"Est-ce que vous expédiez à l'étranger ?", en:"Do you ship abroad?"},
    {fr:"Ce marché est fantastique.", en:"This market is fantastic."},
    {fr:"J'ai trouvé le cadeau parfait.", en:"I found the perfect gift."},
    {fr:"Merci, bonne journée à vous aussi.", en:"Thank you, have a good day too."}
  ]},
  { title:"Réserver une excursion", phrases:[
    {fr:"Je voudrais réserver une excursion en bateau.", en:"I would like to book a boat tour."},
    {fr:"À quelle heure est le départ ?", en:"What time is the departure?"},
    {fr:"Le déjeuner est-il compris ?", en:"Is lunch included?"},
    {fr:"Combien de personnes participent ?", en:"How many people are joining?"},
    {fr:"Faut-il réserver à l'avance ?", en:"Do we need to book in advance?"},
    {fr:"Où doit-on se retrouver ?", en:"Where should we meet?"},
    {fr:"Que se passe-t-il s'il pleut ?", en:"What happens if it rains?"},
    {fr:"J'ai déjà réservé en ligne.", en:"I've already booked online."},
    {fr:"Cette excursion a été le meilleur moment du voyage.", en:"This tour was the best part of the trip."},
    {fr:"Je la recommande vivement.", en:"I highly recommend it."}
  ], tip:{
    title:"« Already » avec le present perfect",
    example:"J'ai déjà réservé en ligne. — I've <b>already</b> booked online.",
    body:"« Already » (déjà) se glisse entre l'auxiliaire et le verbe au present perfect : « I have already booked », jamais en fin de phrase comme en français familier. Il souligne qu'une action est faite plus tôt que prévu."
  }},
  { title:"Changer de l'argent, à la banque", phrases:[
    {fr:"Où puis-je changer de l'argent ?", en:"Where can I exchange money?"},
    {fr:"Quel est le taux de change aujourd'hui ?", en:"What's today's exchange rate?"},
    {fr:"Y a-t-il des frais de commission ?", en:"Are there any commission fees?"},
    {fr:"Je voudrais retirer de l'argent.", en:"I would like to withdraw money."},
    {fr:"Le distributeur ne fonctionne pas.", en:"The ATM isn't working."},
    {fr:"Acceptez-vous les chèques de voyage ?", en:"Do you accept traveler's checks?"},
    {fr:"Puis-je payer par carte ici ?", en:"Can I pay by card here?"},
    {fr:"Ma carte a été refusée.", en:"My card was declined."},
    {fr:"Pouvez-vous vérifier avec la banque ?", en:"Can you check with the bank?"},
    {fr:"Merci pour votre patience.", en:"Thank you for your patience."}
  ]},
  { title:"Urgences et sécurité en voyage", phrases:[
    {fr:"J'ai besoin d'aide, c'est urgent.", en:"I need help, it's urgent."},
    {fr:"Appelez une ambulance, s'il vous plaît.", en:"Please call an ambulance."},
    {fr:"On m'a volé mon sac.", en:"My bag was stolen."},
    {fr:"Où est le commissariat le plus proche ?", en:"Where is the nearest police station?"},
    {fr:"J'ai perdu mon passeport.", en:"I lost my passport."},
    {fr:"Pouvez-vous contacter l'ambassade ?", en:"Can you contact the embassy?"},
    {fr:"Restez calme, tout va bien se passer.", en:"Stay calm, everything will be fine."},
    {fr:"Avez-vous une assurance voyage ?", en:"Do you have travel insurance?"},
    {fr:"Merci de m'avoir aidé si vite.", en:"Thank you for helping me so quickly."},
    {fr:"Je me sens en sécurité maintenant.", en:"I feel safe now."}
  ]},
  { title:"Rencontrer des gens en voyage", phrases:[
    {fr:"D'où viens-tu ?", en:"Where are you from?"},
    {fr:"Je viens de France.", en:"I'm from France."},
    {fr:"C'est mon premier voyage ici.", en:"This is my first trip here."},
    {fr:"Qu'est-ce qui t'amène ici ?", en:"What brings you here?"},
    {fr:"On pourrait voyager ensemble demain.", en:"We could travel together tomorrow."},
    {fr:"Tu as des recommandations ?", en:"Do you have any recommendations?"},
    {fr:"Restons en contact.", en:"Let's stay in touch."},
    {fr:"Voici mon numéro.", en:"Here's my number."},
    {fr:"Ce fut un plaisir de te rencontrer.", en:"It was a pleasure meeting you."},
    {fr:"Bon voyage à toi aussi.", en:"Safe travels to you too."}
  ]},
  { title:"Prendre l'avion retour", phrases:[
    {fr:"Je dois confirmer mon vol retour.", en:"I need to confirm my return flight."},
    {fr:"À quelle heure dois-je être à l'aéroport ?", en:"What time do I need to be at the airport?"},
    {fr:"Ai-je un excédent de bagage ?", en:"Do I have excess baggage?"},
    {fr:"Puis-je changer la date de mon vol ?", en:"Can I change my flight date?"},
    {fr:"Il y a des frais supplémentaires.", en:"There are extra fees."},
    {fr:"Mon vol a été annulé.", en:"My flight was cancelled."},
    {fr:"Y a-t-il un autre vol aujourd'hui ?", en:"Is there another flight today?"},
    {fr:"Je suis triste de partir.", en:"I'm sad to leave."},
    {fr:"Ce voyage restera inoubliable.", en:"This trip will be unforgettable."},
    {fr:"À la prochaine aventure.", en:"Until the next adventure."}
  ]},
  { title:"Bilan du voyage", phrases:[
    {fr:"Ce voyage a changé ma vision des choses.", en:"This trip has changed my outlook."},
    {fr:"J'ai rencontré des gens incroyables.", en:"I've met amazing people."},
    {fr:"J'ai appris tellement de choses.", en:"I've learned so many things."},
    {fr:"Ce pays va me manquer.", en:"I'm going to miss this country."},
    {fr:"Je reviendrai, c'est certain.", en:"I will come back, for sure."},
    {fr:"Merci de m'avoir accompagné jusqu'ici.", en:"Thank you for coming with me this far."},
    {fr:"On a vécu des moments incroyables ensemble.", en:"We've had amazing moments together."},
    {fr:"L'aventure ne fait que commencer.", en:"The adventure is just beginning."},
    {fr:"Prochaine destination : le module 3.", en:"Next destination: module 3."},
    {fr:"Bravo, tu as terminé le module « En voyage » !", en:"Well done, you've completed the \"Travelling\" module!"}
  ], tip:{
    title:"Participes passés irréguliers",
    example:"J'ai rencontré des gens incroyables. — I've <b>met</b> amazing people.",
    body:"« Meet » devient « met » au participe passé — pas de « -ed ». Beaucoup de verbes anglais courants sont irréguliers (go→gone, see→seen, meet→met). Il n'y a pas de règle magique : ça s'apprend par la pratique, phrase après phrase, exactement comme tu le fais ici."
  }}
];

/* --- Module 3 : "Conversation sociale" — 20 leçons, 200 phrases (version complète) --- */
const module3Lessons = [
  { title:"Se présenter en détail", phrases:[
    {fr:"Je m'appelle Sarah, et toi ?", en:"My name is Sarah, what's yours?"},
    {fr:"J'ai vingt-huit ans.", en:"I'm twenty-eight years old."},
    {fr:"Je viens d'une petite ville en France.", en:"I come from a small town in France."},
    {fr:"J'habite ici depuis deux ans.", en:"I've been living here for two years."},
    {fr:"Je suis plutôt quelqu'un de discret.", en:"I'm rather a quiet person."},
    {fr:"On dit que je suis très curieux.", en:"People say I'm very curious."},
    {fr:"J'apprends l'anglais depuis quelques mois.", en:"I've been learning English for a few months."},
    {fr:"Raconte-moi un peu qui tu es.", en:"Tell me a bit about who you are."},
    {fr:"C'est un plaisir de faire ta connaissance.", en:"It's a pleasure to meet you."},
    {fr:"J'espère qu'on se reverra bientôt.", en:"I hope we'll see each other again soon."}
  ]},
  { title:"Parler de sa famille", phrases:[
    {fr:"J'ai deux frères et une sœur.", en:"I have two brothers and a sister."},
    {fr:"Je suis l'aîné de la famille.", en:"I'm the oldest in the family."},
    {fr:"Mes parents habitent à la campagne.", en:"My parents live in the countryside."},
    {fr:"Ma sœur vient d'avoir un bébé.", en:"My sister just had a baby."},
    {fr:"Nous sommes très proches.", en:"We're very close."},
    {fr:"On se voit tous les dimanches.", en:"We see each other every Sunday."},
    {fr:"Mon grand-père me manque beaucoup.", en:"I miss my grandfather a lot."},
    {fr:"As-tu des frères et sœurs ?", en:"Do you have any siblings?"},
    {fr:"Ma famille compte énormément pour moi.", en:"My family means a lot to me."},
    {fr:"C'est compliqué mais on s'aime.", en:"It's complicated but we love each other."}
  ]},
  { title:"Parler de son travail et ses études", phrases:[
    {fr:"Je travaille dans le marketing.", en:"I work in marketing."},
    {fr:"J'étudie encore à l'université.", en:"I'm still studying at university."},
    {fr:"C'est le bureau de mon frère.", en:"It's my brother's office."},
    {fr:"Mon travail me plaît beaucoup.", en:"I really enjoy my job."},
    {fr:"J'ai changé de carrière l'année dernière.", en:"I changed careers last year."},
    {fr:"C'est le projet de mon équipe.", en:"It's my team's project."},
    {fr:"Je cherche un nouvel emploi.", en:"I'm looking for a new job."},
    {fr:"Les études de ma sœur sont exigeantes.", en:"My sister's studies are demanding."},
    {fr:"Je rêve de créer ma propre entreprise.", en:"I dream of starting my own business."},
    {fr:"Ça te plaît, ce que tu fais ?", en:"Do you like what you do?"}
  ], tip:{
    title:"Le cas possessif : « 's »",
    example:"C'est le bureau de mon frère. — It's my <b>brother's</b> office.",
    body:"En anglais, on ajoute « 's » à une personne pour montrer la possession, et l'ordre s'inverse par rapport au français : « le bureau de mon frère » devient « my brother's office » (le possesseur d'abord). Au pluriel finissant déjà par « s », on ajoute juste une apostrophe : « my sister's studies », « the students' books »."
  }},
  { title:"Parler de ses loisirs et passions", phrases:[
    {fr:"Qu'est-ce que tu aimes faire pendant ton temps libre ?", en:"What do you like to do in your free time?"},
    {fr:"Je passe beaucoup de temps à lire.", en:"I spend a lot of time reading."},
    {fr:"J'ai commencé la photographie récemment.", en:"I recently started photography."},
    {fr:"J'adore cuisiner le week-end.", en:"I love cooking on weekends."},
    {fr:"Je joue de la guitare depuis dix ans.", en:"I've been playing guitar for ten years."},
    {fr:"Ça me détend complètement.", en:"It completely relaxes me."},
    {fr:"Tu devrais essayer, c'est génial.", en:"You should try it, it's great."},
    {fr:"Je n'ai jamais assez de temps pour tout.", en:"I never have enough time for everything."},
    {fr:"C'est ma passion depuis toujours.", en:"It's been my passion forever."},
    {fr:"On devrait s'y mettre ensemble.", en:"We should start doing it together."}
  ]},
  { title:"Faire des compliments", phrases:[
    {fr:"Tu as l'air en pleine forme.", en:"You look great."},
    {fr:"J'adore ta façon de voir les choses.", en:"I love the way you see things."},
    {fr:"Tu cuisines vraiment très bien.", en:"You're a really good cook."},
    {fr:"C'est une excellente idée.", en:"That's an excellent idea."},
    {fr:"Tu as beaucoup de talent.", en:"You have a lot of talent."},
    {fr:"Ce que tu as fait est impressionnant.", en:"What you did is impressive."},
    {fr:"J'admire ta patience.", en:"I admire your patience."},
    {fr:"Tu m'inspires vraiment.", en:"You really inspire me."},
    {fr:"Merci, ça me touche beaucoup.", en:"Thank you, that means a lot to me."},
    {fr:"Tu le mérites amplement.", en:"You truly deserve it."}
  ]},
  { title:"Parler de ses goûts", phrases:[
    {fr:"Quel genre de musique tu écoutes ?", en:"What kind of music do you listen to?"},
    {fr:"Je préfère le jazz au rock.", en:"I prefer jazz to rock."},
    {fr:"Ce film est plus intéressant que l'autre.", en:"This movie is more interesting than the other one."},
    {fr:"C'est le meilleur album qu'il ait sorti.", en:"It's the best album he's released."},
    {fr:"Je trouve ce livre plus émouvant que le film.", en:"I find this book more moving than the movie."},
    {fr:"Elle chante mieux que moi.", en:"She sings better than me."},
    {fr:"C'est plus calme ici que chez moi.", en:"It's quieter here than at my place."},
    {fr:"Tu as des recommandations à me faire ?", en:"Do you have any recommendations for me?"},
    {fr:"On a des goûts assez similaires.", en:"We have pretty similar tastes."},
    {fr:"Je vais l'ajouter à ma liste.", en:"I'll add it to my list."}
  ], tip:{
    title:"Le comparatif : « more... than » / « -er than »",
    example:"Ce film est plus intéressant que l'autre. — This movie is <b>more interesting than</b> the other one.",
    body:"Pour un adjectif court (une syllabe), on ajoute « -er » : « quiet → quieter ». Pour un adjectif plus long, on utilise « more... than » : « interesting → more interesting than ». Attention aux irréguliers : « good → better », « bad → worse »."
  }},
  { title:"Raconter sa journée", phrases:[
    {fr:"Comment s'est passée ta journée ?", en:"How was your day?"},
    {fr:"Je me suis levé tôt ce matin.", en:"I woke up early this morning."},
    {fr:"J'ai eu une journée assez chargée.", en:"I had a pretty busy day."},
    {fr:"J'ai déjeuné avec un ami.", en:"I had lunch with a friend."},
    {fr:"Le travail était plutôt calme aujourd'hui.", en:"Work was pretty quiet today."},
    {fr:"J'ai fait une petite sieste cet après-midi.", en:"I took a short nap this afternoon."},
    {fr:"Rien de spécial à signaler.", en:"Nothing special to report."},
    {fr:"Ça a été une bonne journée dans l'ensemble.", en:"It was a good day overall."},
    {fr:"Et toi, quoi de neuf ?", en:"What about you, what's new?"},
    {fr:"Je suis content que la journée soit finie.", en:"I'm glad the day is over."}
  ]},
  { title:"Parler de ses projets d'avenir", phrases:[
    {fr:"Qu'est-ce que tu comptes faire l'année prochaine ?", en:"What are you planning to do next year?"},
    {fr:"J'aimerais voyager davantage.", en:"I would like to travel more."},
    {fr:"Je pense déménager bientôt.", en:"I'm thinking about moving soon."},
    {fr:"On prévoit de se marier au printemps.", en:"We're planning to get married in spring."},
    {fr:"J'espère décrocher ce poste.", en:"I hope to get that job."},
    {fr:"Mes projets ne sont pas encore clairs.", en:"My plans aren't clear yet."},
    {fr:"Je vise à apprendre une nouvelle langue.", en:"I'm aiming to learn a new language."},
    {fr:"On verra ce que l'avenir nous réserve.", en:"We'll see what the future holds."},
    {fr:"J'ai hâte de voir où tout ça va me mener.", en:"I can't wait to see where it all leads."},
    {fr:"Une chose à la fois.", en:"One thing at a time."}
  ]},
  { title:"Exprimer ses émotions", phrases:[
    {fr:"Je me sens un peu stressé aujourd'hui.", en:"I feel a bit stressed today."},
    {fr:"Je suis vraiment content pour toi.", en:"I'm really happy for you."},
    {fr:"Ça m'a rendu triste d'apprendre ça.", en:"That made me sad to hear."},
    {fr:"Je suis nerveux avant l'entretien.", en:"I'm nervous before the interview."},
    {fr:"Tu ne devrais pas t'inquiéter autant.", en:"You shouldn't worry so much."},
    {fr:"Tu devrais en parler à quelqu'un.", en:"You should talk to someone about it."},
    {fr:"Ça va aller, je te le promets.", en:"It's going to be okay, I promise."},
    {fr:"Je me sens beaucoup mieux maintenant.", en:"I feel much better now."},
    {fr:"Merci de m'avoir écouté.", en:"Thank you for listening to me."},
    {fr:"Parler, ça fait toujours du bien.", en:"Talking always helps."}
  ], tip:{
    title:"« Should » pour donner un conseil",
    example:"Tu devrais en parler à quelqu'un. — You <b>should</b> talk to someone about it.",
    body:"« Should » sert à donner un conseil ou une recommandation, en douceur — proche du français « devrais ». À la forme négative : « shouldn't » (« you shouldn't worry »). C'est un des modaux les plus utiles en conversation."
  }},
  { title:"Bilan de mi-parcours", phrases:[
    {fr:"On a couvert beaucoup de sujets ensemble.", en:"We've covered a lot of topics together."},
    {fr:"Tu te sens plus à l'aise en anglais maintenant ?", en:"Do you feel more comfortable in English now?"},
    {fr:"Je suis fier du chemin parcouru.", en:"I'm proud of how far I've come."},
    {fr:"C'était un excellent entraînement jusqu'ici.", en:"It's been great practice so far."},
    {fr:"Il reste encore beaucoup à apprendre.", en:"There's still a lot to learn."},
    {fr:"Continuons sur cette lancée.", en:"Let's keep this momentum going."},
    {fr:"La pratique régulière fait toute la différence.", en:"Regular practice makes all the difference."},
    {fr:"Bravo pour ta persévérance.", en:"Well done for your perseverance."},
    {fr:"La suite s'annonce passionnante.", en:"What's next looks exciting."},
    {fr:"Prêt pour la deuxième moitié ?", en:"Ready for the second half?"}
  ]},
  { title:"Parler de la vie de couple et d'amitié", phrases:[
    {fr:"Comment t'es-tu rencontré avec ton copain ?", en:"How did you meet your boyfriend?"},
    {fr:"On s'est rencontrés à l'université.", en:"We met at university."},
    {fr:"C'est un ami de longue date.", en:"He's a long-time friend."},
    {fr:"On se soutient toujours l'un l'autre.", en:"We always support each other."},
    {fr:"La confiance est essentielle dans une relation.", en:"Trust is essential in a relationship."},
    {fr:"On a traversé des hauts et des bas.", en:"We've been through ups and downs."},
    {fr:"Elle est toujours là pour moi.", en:"She's always there for me."},
    {fr:"C'est rare de trouver une amitié pareille.", en:"It's rare to find a friendship like that."},
    {fr:"On se comprend sans même parler.", en:"We understand each other without even talking."},
    {fr:"J'ai de la chance de l'avoir dans ma vie.", en:"I'm lucky to have her in my life."}
  ]},
  { title:"Faire la conversation lors d'une fête", phrases:[
    {fr:"Belle soirée, non ?", en:"Great party, isn't it?"},
    {fr:"Tu connais beaucoup de monde ici ?", en:"Do you know a lot of people here?"},
    {fr:"Comment connais-tu l'hôte de la soirée ?", en:"How do you know the host?"},
    {fr:"On travaille ensemble depuis un an.", en:"We've been working together for a year."},
    {fr:"La musique est super ce soir.", en:"The music is great tonight."},
    {fr:"Tu veux qu'on aille prendre l'air ?", en:"Do you want to go get some fresh air?"},
    {fr:"Ce gâteau a l'air délicieux.", en:"This cake looks delicious."},
    {fr:"Je ne connaissais personne en arrivant.", en:"I didn't know anyone when I arrived."},
    {fr:"Je suis content d'être venu.", en:"I'm glad I came."},
    {fr:"On garde contact après ce soir ?", en:"Shall we stay in touch after tonight?"}
  ]},
  { title:"Débattre poliment", phrases:[
    {fr:"Je comprends ton point de vue, mais je vois les choses différemment.", en:"I understand your point of view, but I see things differently."},
    {fr:"Ce n'est pas tout à fait comme ça que je le vois.", en:"That's not quite how I see it."},
    {fr:"Tu marques un bon point, cependant...", en:"You make a good point, however..."},
    {fr:"Je ne suis pas totalement convaincu.", en:"I'm not entirely convinced."},
    {fr:"Est-ce qu'on pourrait envisager une autre option ?", en:"Could we consider another option?"},
    {fr:"Je respecte ton opinion, même si je ne suis pas d'accord.", en:"I respect your opinion, even though I disagree."},
    {fr:"On n'est pas obligés d'être d'accord sur tout.", en:"We don't have to agree on everything."},
    {fr:"C'est un sujet plus nuancé qu'il n'y paraît.", en:"It's a more nuanced topic than it seems."},
    {fr:"Discutons-en calmement.", en:"Let's discuss it calmly."},
    {fr:"Merci d'avoir partagé ton avis.", en:"Thanks for sharing your view."}
  ]},
  { title:"Raconter une anecdote drôle", phrases:[
    {fr:"Il m'est arrivé un truc hilarant hier.", en:"Something hilarious happened to me yesterday."},
    {fr:"Tu ne vas jamais croire ce qui s'est passé.", en:"You'll never believe what happened."},
    {fr:"J'ai complètement raté mon entrée.", en:"I completely messed up my entrance."},
    {fr:"Tout le monde a éclaté de rire.", en:"Everyone burst out laughing."},
    {fr:"J'étais tellement gêné sur le moment.", en:"I was so embarrassed at the time."},
    {fr:"Avec le recul, c'est vraiment drôle.", en:"Looking back, it's really funny."},
    {fr:"Ça me fait encore rire aujourd'hui.", en:"It still makes me laugh today."},
    {fr:"Tu aurais dû voir ta tête.", en:"You should have seen your face."},
    {fr:"On en rit encore avec mes amis.", en:"My friends and I still laugh about it."},
    {fr:"Ce genre de moment, ça ne s'invente pas.", en:"You can't make this stuff up."}
  ]},
  { title:"Parler de ses peurs et rêves", phrases:[
    {fr:"J'ai peur de parler en public.", en:"I'm afraid of public speaking."},
    {fr:"Mais j'essaie de sortir de ma zone de confort.", en:"But I try to step out of my comfort zone."},
    {fr:"Mon rêve serait de vivre à l'étranger.", en:"My dream would be to live abroad."},
    {fr:"J'ai un peu peur de l'échec.", en:"I'm a bit afraid of failure."},
    {fr:"Donc je préfère avancer doucement.", en:"So I prefer to move forward slowly."},
    {fr:"Bien que ce soit effrayant, ça vaut le coup.", en:"Although it's scary, it's worth it."},
    {fr:"Parce que la vie est trop courte pour hésiter.", en:"Because life is too short to hesitate."},
    {fr:"J'aimerais un jour écrire un livre.", en:"I would like to write a book someday."},
    {fr:"Tout le monde a des peurs, c'est normal.", en:"Everyone has fears, it's normal."},
    {fr:"On avance malgré la peur.", en:"We move forward despite the fear."}
  ], tip:{
    title:"Les mots de liaison : because, so, although",
    example:"Bien que ce soit effrayant, ça vaut le coup. — <b>Although</b> it's scary, it's worth it.",
    body:"Comme en français, des mots de liaison structurent ton raisonnement en anglais : « because » (parce que), « so » (donc), « but » (mais), « although » (bien que). Les utiliser rend tes phrases plus naturelles qu'une suite de phrases courtes juxtaposées."
  }},
  { title:"Réconforter quelqu'un", phrases:[
    {fr:"Je suis désolé, ça a l'air difficile.", en:"I'm sorry, that sounds difficult."},
    {fr:"Je suis là pour toi, quoi qu'il arrive.", en:"I'm here for you, no matter what."},
    {fr:"Ça va s'arranger avec le temps.", en:"It'll get better with time."},
    {fr:"Tu n'es pas seul dans cette épreuve.", en:"You're not alone in this."},
    {fr:"Prends le temps qu'il te faut.", en:"Take all the time you need."},
    {fr:"N'hésite pas à m'appeler si besoin.", en:"Don't hesitate to call me if you need to."},
    {fr:"Tu as le droit d'être triste.", en:"You're allowed to be sad."},
    {fr:"Ça montre à quel point tu es fort.", en:"It shows how strong you are."},
    {fr:"On traversera ça ensemble.", en:"We'll get through this together."},
    {fr:"Je pense fort à toi.", en:"I'm thinking of you."}
  ]},
  { title:"Faire des excuses", phrases:[
    {fr:"Je suis vraiment désolé pour hier.", en:"I'm really sorry about yesterday."},
    {fr:"Je n'aurais pas dû dire ça.", en:"I shouldn't have said that."},
    {fr:"Ce n'était pas mon intention de te blesser.", en:"It wasn't my intention to hurt you."},
    {fr:"Peux-tu me pardonner ?", en:"Can you forgive me?"},
    {fr:"J'aurais dû t'écouter davantage.", en:"I should have listened to you more."},
    {fr:"Je vais faire des efforts pour changer.", en:"I'm going to make an effort to change."},
    {fr:"Merci de me donner une seconde chance.", en:"Thank you for giving me a second chance."},
    {fr:"C'est entièrement ma faute.", en:"It's entirely my fault."},
    {fr:"J'apprécie ta patience envers moi.", en:"I appreciate your patience with me."},
    {fr:"On tourne la page ensemble.", en:"Let's turn the page together."}
  ]},
  { title:"Féliciter quelqu'un", phrases:[
    {fr:"Félicitations pour ta promotion !", en:"Congratulations on your promotion!"},
    {fr:"Tu l'as tellement mérité.", en:"You deserved it so much."},
    {fr:"Je suis fier de toi.", en:"I'm proud of you."},
    {fr:"Tout ce travail a enfin payé.", en:"All that hard work finally paid off."},
    {fr:"C'est une grande nouvelle !", en:"That's big news!"},
    {fr:"Tu as toujours cru en toi, et ça se voit.", en:"You always believed in yourself, and it shows."},
    {fr:"On doit fêter ça !", en:"We have to celebrate this!"},
    {fr:"Je savais que tu réussirais.", en:"I knew you would succeed."},
    {fr:"Continue comme ça.", en:"Keep it up."},
    {fr:"Toutes mes félicitations.", en:"My warmest congratulations."}
  ]},
  { title:"Parler de sujets d'actualité léger", phrases:[
    {fr:"Tu as suivi le match hier soir ?", en:"Did you watch the game last night?"},
    {fr:"Le film est sorti ce week-end.", en:"The movie came out this weekend."},
    {fr:"Tout le monde en parle en ce moment.", en:"Everyone's talking about it right now."},
    {fr:"Je n'ai pas encore eu le temps de le voir.", en:"I haven't had time to watch it yet."},
    {fr:"Les critiques sont plutôt bonnes.", en:"The reviews are pretty good."},
    {fr:"Qu'en penses-tu, toi ?", en:"What do you think about it?"},
    {fr:"Je reste assez neutre sur le sujet.", en:"I'm pretty neutral on the subject."},
    {fr:"Ça pourrait faire un bon sujet de conversation.", en:"It could make good conversation."},
    {fr:"On en reparlera une fois que tu l'auras vu.", en:"We'll talk about it once you've seen it."},
    {fr:"Passons à autre chose pour l'instant.", en:"Let's move on to something else for now."}
  ]},
  { title:"Une conversation profonde entre amis", phrases:[
    {fr:"On ne se parle pas assez souvent comme ça, tu ne trouves pas ?", en:"We don't talk like this often enough, don't you think?"},
    {fr:"Tu es quelqu'un d'important pour moi.", en:"You're someone important to me."},
    {fr:"On a beaucoup grandi tous les deux.", en:"We've both grown a lot."},
    {fr:"La vie passe vite, non ?", en:"Life goes by fast, doesn't it?"},
    {fr:"J'apprécie chaque moment passé avec toi.", en:"I appreciate every moment spent with you."},
    {fr:"Tu es fier de ce chemin parcouru, non ?", en:"You're proud of how far you've come, aren't you?"},
    {fr:"On continuera cette aventure ensemble.", en:"We'll continue this adventure together."},
    {fr:"Merci d'avoir été là depuis le début.", en:"Thank you for being here from the start."},
    {fr:"Les 600 phrases, on les a faites ensemble.", en:"We did all 600 phrases together."},
    {fr:"Félicitations, tu as terminé Mon Trajet en Anglais !", en:"Congratulations, you've completed My English Journey!"}
  ], tip:{
    title:"Les question tags : « isn't it? », « don't you? »",
    example:"La vie passe vite, non ? — Life goes by fast, <b>doesn't it?</b>",
    body:"Le français utilise « non ? » pour presque tout. L'anglais utilise des « question tags » qui reprennent le verbe : phrase positive → tag négatif (« doesn't it? »), phrase négative → tag positif (« isn't it? », « don't you? »). Ça demande un peu de pratique, mais ça rend ton anglais beaucoup plus naturel à l'oral."
  }}
];

function buildLockedLessons(titles, count){
  const arr = titles.map(t=>({title:t, phrases:null}));
  while(arr.length < count) arr.push({title:"Leçon à venir", phrases:null});
  return arr.slice(0, count);
}

const LEVEL1_MODULES = [
  {
    id:1, name:"Le quotidien",
    desc:"Un road trip aux États-Unis pour démarrer, puis les phrases du quotidien.",
    totalPhrases:200, lessonsCount:20,
    lessons:[ ...module1Lessons, ...module1Lessons11to20 ]
  },
  {
    id:2, name:"En voyage",
    desc:"Aéroport, hôtel, transports : de quoi se débrouiller partout.",
    totalPhrases:200, lessonsCount:20,
    lessons: module2Lessons
  },
  {
    id:3, name:"Conversation sociale",
    desc:"Parler de soi, faire connaissance, échanger avec aisance.",
    totalPhrases:200, lessonsCount:20,
    lessons: module3Lessons
  }
];
const LEVEL1_FREE_LESSONS = { 1: 10, 2: 0, 3: 0 }; // seul le module 1 a des leçons gratuites

/* ============================================================
   NIVEAU 2 — mêmes 3 thèmes que le niveau 1, mais avec de
   nouvelles situations (jamais un remake des mêmes scènes) et un
   vocabulaire/grammaire un cran plus riche. Structure identique :
   20 leçons de 10 phrases par module, leçons 1-10 gratuites pour
   le module 1 uniquement.
   ============================================================ */

/* --- Niveau 2 / Module 1 : "Le quotidien" — leçons 1 à 10 (gratuites) --- */
const level2Module1Lessons1to10 = [
  { title:"Une matinée bien remplie", phrases:[
    {fr:"Je me suis réveillé plus tôt que d'habitude ce matin.", en:"I woke up earlier than usual this morning."},
    {fr:"J'ai pris un café rapide avant de partir.", en:"I had a quick coffee before leaving."},
    {fr:"Le bus était bondé, comme souvent le lundi.", en:"The bus was crowded, as it often is on Mondays."},
    {fr:"J'ai failli rater ma correspondance.", en:"I nearly missed my connection."},
    {fr:"Heureusement, je suis arrivé à l'heure.", en:"Luckily, I arrived on time."},
    {fr:"La journée commence plutôt bien, finalement.", en:"The day is actually starting off pretty well."},
    {fr:"J'ai encore beaucoup de choses à faire avant midi.", en:"I still have a lot to do before noon."},
    {fr:"Je vais essayer de tout finir à temps.", en:"I'm going to try to finish everything on time."},
    {fr:"Une matinée chargée, mais ça va.", en:"A busy morning, but it's fine."},
    {fr:"On verra comment se passe le reste de la journée.", en:"We'll see how the rest of the day goes."}
  ]},
  { title:"Prendre des nouvelles", phrases:[
    {fr:"Ça fait longtemps qu'on ne s'est pas parlé.", en:"It's been a while since we last talked."},
    {fr:"Comment vont les choses de ton côté ?", en:"How are things on your end?"},
    {fr:"Je pensais justement à toi récemment.", en:"I was actually thinking about you recently."},
    {fr:"Avant, on se voyait beaucoup plus souvent.", en:"We used to see each other much more often."},
    {fr:"La vie est devenue tellement occupée.", en:"Life has become so busy."},
    {fr:"Il faudrait qu'on se retrouve un de ces jours.", en:"We should meet up one of these days."},
    {fr:"Je suis curieux de savoir ce que tu deviens.", en:"I'm curious to know how you're doing these days."},
    {fr:"Raconte-moi ce qui a changé depuis la dernière fois.", en:"Tell me what's changed since last time."},
    {fr:"Ça me ferait vraiment plaisir de te revoir.", en:"It would really make me happy to see you again."},
    {fr:"On se rappelle très vite, promis.", en:"We'll talk again very soon, I promise."}
  ]},
  { title:"Organiser son emploi du temps", phrases:[
    {fr:"Je suis en train de revoir mon planning pour la semaine.", en:"I'm currently going through my schedule for the week."},
    {fr:"Je retrouve un ami samedi après-midi.", en:"I'm meeting a friend on Saturday afternoon."},
    {fr:"Ma sœur vient dîner mercredi soir.", en:"My sister is coming for dinner on Wednesday evening."},
    {fr:"J'ai un rendez-vous important jeudi matin.", en:"I have an important appointment on Thursday morning."},
    {fr:"On part en week-end vendredi prochain.", en:"We're going away for the weekend next Friday."},
    {fr:"Il faut que je réorganise deux ou trois choses.", en:"I need to rearrange a couple of things."},
    {fr:"Ce mois-ci va être particulièrement chargé.", en:"This month is going to be especially busy."},
    {fr:"Je préfère tout planifier à l'avance.", en:"I prefer to plan everything in advance."},
    {fr:"Comme ça, je ne suis jamais pris au dépourvu.", en:"That way, I'm never caught off guard."},
    {fr:"Voilà, mon emploi du temps est enfin prêt.", en:"There we go, my schedule is finally ready."}
  ], tip:{
    title:"Le présent continu pour parler du futur proche",
    example:"Ma sœur vient dîner mercredi soir. — My sister <b>is coming</b> for dinner on Wednesday evening.",
    body:"Pour un rendez-vous ou un projet déjà organisé (date et heure fixées), l'anglais utilise souvent le présent continu plutôt que « going to » : « I'm meeting a friend on Saturday », « She's coming for dinner ». C'est très courant à l'oral pour parler de son emploi du temps."
  }},
  { title:"Un imprévu au travail", phrases:[
    {fr:"Un problème est apparu juste avant la réunion.", en:"A problem came up just before the meeting."},
    {fr:"Personne ne s'y attendait vraiment.", en:"Nobody really expected it."},
    {fr:"Il a fallu trouver une solution rapidement.", en:"We had to find a solution quickly."},
    {fr:"Mon collègue m'a beaucoup aidé sur ce coup-là.", en:"My colleague helped me a lot with that."},
    {fr:"On a réussi à régler ça avant la fin de la journée.", en:"We managed to sort it out before the end of the day."},
    {fr:"Ce genre de situation arrive plus souvent qu'on ne le pense.", en:"This kind of situation happens more often than you'd think."},
    {fr:"Ça demande de rester calme et de bien réfléchir.", en:"It requires staying calm and thinking things through."},
    {fr:"Au final, on a même appris quelque chose.", en:"In the end, we even learned something."},
    {fr:"La journée n'a pas été de tout repos.", en:"The day wasn't exactly relaxing."},
    {fr:"Mais on s'en est bien sortis.", en:"But we handled it well."}
  ]},
  { title:"Cuisiner un repas ensemble", phrases:[
    {fr:"On a décidé de préparer le dîner ensemble ce soir.", en:"We decided to make dinner together tonight."},
    {fr:"Il manque un ou deux ingrédients dans le frigo.", en:"We're missing one or two ingredients in the fridge."},
    {fr:"Pendant que tu coupes les légumes, je m'occupe de la sauce.", en:"While you're cutting the vegetables, I'll take care of the sauce."},
    {fr:"Ça sent déjà très bon.", en:"It already smells really good."},
    {fr:"Attention, ça risque de brûler si on ne surveille pas.", en:"Careful, it might burn if we don't keep an eye on it."},
    {fr:"Goûte pour voir si ça manque de sel.", en:"Taste it to see if it needs more salt."},
    {fr:"On devrait laisser mijoter encore un peu.", en:"We should let it simmer a bit longer."},
    {fr:"La table est mise, on peut passer à table.", en:"The table is set, we can sit down to eat."},
    {fr:"C'est encore meilleur quand on cuisine à deux.", en:"It's even better when you cook together."},
    {fr:"On recommence la semaine prochaine ?", en:"Shall we do it again next week?"}
  ]},
  { title:"Petits soucis techniques", phrases:[
    {fr:"Mon ordinateur a planté juste avant que je sauvegarde.", en:"My computer crashed right before I saved."},
    {fr:"Je dois absolument le réparer avant demain.", en:"I absolutely have to fix it before tomorrow."},
    {fr:"Il faut que je réinstalle le logiciel depuis le début.", en:"I have to reinstall the software from scratch."},
    {fr:"Tu dois redémarrer l'appareil pour que ça fonctionne.", en:"You have to restart the device for it to work."},
    {fr:"On ne doit jamais oublier de faire des sauvegardes régulières.", en:"You must never forget to back things up regularly."},
    {fr:"J'ai dû appeler le support technique.", en:"I had to call technical support."},
    {fr:"Ils m'ont dit que je devais mettre à jour le système.", en:"They told me I had to update the system."},
    {fr:"Heureusement, je n'ai pas dû tout recommencer.", en:"Luckily, I didn't have to start everything over."},
    {fr:"Ces pépins techniques me font perdre un temps fou.", en:"These technical glitches waste so much of my time."},
    {fr:"La prochaine fois, je ferai plus attention.", en:"Next time, I'll be more careful."}
  ], tip:{
    title:"L'obligation : have to / must",
    example:"Je dois absolument le réparer avant demain. — I <b>have to</b> fix it before tomorrow.",
    body:"« Have to » et « must » expriment tous les deux une obligation. « Have to » est le plus courant à l'oral et se conjugue avec « do/does » à la forme négative et interrogative (« I don't have to »). « Must » est plus fort ou plus formel, et au passé, on utilise toujours « had to » (must n'a pas de forme passée)."
  }},
  { title:"Sortir en ville le soir", phrases:[
    {fr:"Ça te dit d'aller boire un verre après le travail ?", en:"Do you feel like grabbing a drink after work?"},
    {fr:"Il y a un nouveau bar qui vient d'ouvrir près d'ici.", en:"There's a new bar that just opened near here."},
    {fr:"L'ambiance a l'air vraiment sympa.", en:"The atmosphere looks really nice."},
    {fr:"On pourrait aussi aller au cinéma à la place.", en:"We could also go to the movies instead."},
    {fr:"Je n'ai pas vraiment de préférence, ça me va.", en:"I don't really have a preference, that works for me."},
    {fr:"Il faudrait réserver une table avant d'y aller.", en:"We should book a table before we go."},
    {fr:"On se retrouve directement là-bas vers vingt heures ?", en:"Shall we meet there around eight?"},
    {fr:"Prends un pull, il risque de faire frais plus tard.", en:"Bring a sweater, it might get chilly later."},
    {fr:"J'ai hâte de voir tout le monde ce soir.", en:"I can't wait to see everyone tonight."},
    {fr:"Ça va être une bonne soirée.", en:"It's going to be a good evening."}
  ]},
  { title:"Prendre soin de sa maison", phrases:[
    {fr:"Le week-end, je m'occupe souvent du ménage.", en:"On weekends, I often take care of the cleaning."},
    {fr:"Il faudrait vraiment ranger le garage un jour.", en:"We should really tidy up the garage one day."},
    {fr:"J'ai repeint la chambre le mois dernier.", en:"I repainted the bedroom last month."},
    {fr:"Le jardin a besoin d'être un peu entretenu.", en:"The garden needs a bit of maintenance."},
    {fr:"On devrait changer cette ampoule qui grille tout le temps.", en:"We should change that light bulb that keeps burning out."},
    {fr:"Prendre soin de sa maison demande du temps.", en:"Taking care of your home takes time."},
    {fr:"Mais ça fait plaisir de voir le résultat.", en:"But it feels good to see the result."},
    {fr:"Chaque pièce a enfin sa place.", en:"Every room finally has its place."},
    {fr:"La maison est beaucoup plus agréable comme ça.", en:"The house is much nicer this way."},
    {fr:"Encore quelques travaux et ce sera parfait.", en:"A few more projects and it'll be perfect."}
  ]},
  { title:"Un souvenir d'enfance", phrases:[
    {fr:"Quand j'étais petit, j'habitais près de la mer.", en:"When I was little, I lived near the sea."},
    {fr:"On allait à la plage presque tous les étés.", en:"We used to go to the beach almost every summer."},
    {fr:"Mes grands-parents nous racontaient toujours des histoires.", en:"My grandparents always used to tell us stories."},
    {fr:"Je jouais dehors du matin jusqu'au soir.", en:"I used to play outside from morning until evening."},
    {fr:"Les journées me semblaient beaucoup plus longues à l'époque.", en:"Days used to feel so much longer back then."},
    {fr:"On n'avait pas de téléphone, et ça ne nous manquait pas.", en:"We didn't use to have a phone, and we didn't miss it."},
    {fr:"Ces souvenirs restent parmi mes préférés.", en:"Those memories remain among my favorites."},
    {fr:"Le temps passe vraiment très vite.", en:"Time really does go by fast."},
    {fr:"Parfois, j'aimerais retrouver cette simplicité.", en:"Sometimes I wish I could find that simplicity again."},
    {fr:"Mais je garde tout ça précieusement en mémoire.", en:"But I keep all of that close to my heart."}
  ], tip:{
    title:"« Used to » pour parler d'habitudes passées",
    example:"On allait à la plage presque tous les étés. — We <b>used to go</b> to the beach almost every summer.",
    body:"« Used to + verbe de base » décrit une habitude ou un état qui existait dans le passé mais qui n'est plus vrai aujourd'hui : « I used to play outside », « We used to go to the beach ». À la forme négative : « didn't use to » (sans -d)."
  }},
  { title:"Bilan de la semaine, niveau 2", phrases:[
    {fr:"Cette semaine est passée à toute vitesse.", en:"This week has gone by so fast."},
    {fr:"J'ai réussi à accomplir presque tout ce que je voulais.", en:"I managed to get almost everything I wanted done."},
    {fr:"Certains jours ont été plus difficiles que d'autres.", en:"Some days were harder than others."},
    {fr:"Mais dans l'ensemble, je suis plutôt satisfait.", en:"But overall, I'm pretty satisfied."},
    {fr:"J'ai appris à mieux organiser mon temps.", en:"I've learned to manage my time better."},
    {fr:"Il reste encore quelques petites choses à régler.", en:"There are still a few small things left to sort out."},
    {fr:"Le week-end arrive à point nommé.", en:"The weekend is coming at just the right time."},
    {fr:"J'ai hâte de me reposer un peu.", en:"I can't wait to rest a bit."},
    {fr:"Bravo, tu as terminé les dix premières leçons du niveau 2 !", en:"Well done, you've finished the first ten lessons of level 2!"},
    {fr:"La suite t'attend dans la version complète.", en:"The rest is waiting for you in the full version."}
  ]}
];

/* --- Niveau 2 / Module 1 : "Le quotidien" — leçons 11 à 20 (payantes) --- */
const level2Module1Lessons11to20 = [
  { title:"Faire connaissance avec un voisin", phrases:[
    {fr:"On a un nouveau voisin depuis la semaine dernière.", en:"We've had a new neighbor since last week."},
    {fr:"Il a l'air plutôt sympathique, au premier abord.", en:"He seems pretty friendly, at first glance."},
    {fr:"Je suis allé me présenter hier soir.", en:"I went to introduce myself last night."},
    {fr:"Il vient de s'installer dans le quartier.", en:"He just moved into the neighborhood."},
    {fr:"On a discuté un bon moment sur le pas de la porte.", en:"We talked for quite a while on the doorstep."},
    {fr:"Il travaille dans le même domaine que moi, apparemment.", en:"He works in the same field as me, apparently."},
    {fr:"On s'est dit qu'on pourrait prendre un café un de ces jours.", en:"We said we could grab a coffee sometime."},
    {fr:"C'est toujours agréable de bien s'entendre avec ses voisins.", en:"It's always nice to get along well with your neighbors."},
    {fr:"Le quartier me semble encore plus chaleureux qu'avant.", en:"The neighborhood feels even friendlier than before."},
    {fr:"J'espère qu'on deviendra bons amis.", en:"I hope we'll become good friends."}
  ]},
  { title:"Résoudre un désaccord", phrases:[
    {fr:"On n'était pas d'accord sur la façon de faire.", en:"We didn't agree on how to do it."},
    {fr:"Le ton est un peu monté au début.", en:"Things got a little heated at first."},
    {fr:"Mais on a réussi à se calmer assez vite.", en:"But we managed to calm down pretty quickly."},
    {fr:"Chacun a expliqué son point de vue calmement.", en:"Each of us calmly explained our point of view."},
    {fr:"Finalement, on a trouvé un compromis.", en:"In the end, we found a compromise."},
    {fr:"Ce n'était pas si grave, avec le recul.", en:"It wasn't such a big deal, looking back."},
    {fr:"Il vaut mieux en parler plutôt que d'ignorer le problème.", en:"It's better to talk about it than to ignore the problem."},
    {fr:"On en ressort même plus proches, je trouve.", en:"I think we actually came out of it closer."},
    {fr:"Les désaccords font partie de toute relation.", en:"Disagreements are part of any relationship."},
    {fr:"L'important, c'est de savoir se réconcilier.", en:"What matters is knowing how to make up."}
  ]},
  { title:"Organiser une sortie entre amis", phrases:[
    {fr:"On essaie d'organiser quelque chose pour tout le groupe.", en:"We're trying to organize something for the whole group."},
    {fr:"Ce n'est pas facile de trouver une date qui convient à tous.", en:"It's not easy to find a date that works for everyone."},
    {fr:"Certains préfèrent un dîner tranquille, d'autres une soirée dansante.", en:"Some prefer a quiet dinner, others a night out dancing."},
    {fr:"On pourrait faire les deux, en fait.", en:"We could actually do both."},
    {fr:"Je m'occupe de réserver le restaurant.", en:"I'll take care of booking the restaurant."},
    {fr:"Peux-tu prévenir les autres pour l'heure ?", en:"Can you let the others know about the time?"},
    {fr:"Ce serait bien si tout le monde pouvait venir.", en:"It would be great if everyone could come."},
    {fr:"On ne se retrouve pas assez souvent tous ensemble.", en:"We don't get together as a whole group often enough."},
    {fr:"Ça promet d'être une belle soirée.", en:"It's going to be a lovely evening."},
    {fr:"J'ai hâte d'y être.", en:"I can't wait for it."}
  ]},
  { title:"S'occuper d'un animal de compagnie", phrases:[
    {fr:"On a adopté un chien il y a environ un mois.", en:"We adopted a dog about a month ago."},
    {fr:"Il faut le sortir au moins deux fois par jour.", en:"He needs to be walked at least twice a day."},
    {fr:"Il a déjà appris quelques ordres de base.", en:"He's already learned a few basic commands."},
    {fr:"Il adore jouer dans le jardin pendant des heures.", en:"He loves playing in the garden for hours."},
    {fr:"Parfois, il fait des bêtises quand on n'est pas là.", en:"Sometimes he gets into mischief when we're not around."},
    {fr:"Mais on ne peut vraiment pas lui en vouloir.", en:"But you really can't stay mad at him."},
    {fr:"Prendre soin d'un animal demande beaucoup de patience.", en:"Taking care of a pet takes a lot of patience."},
    {fr:"Ça change complètement notre routine du quotidien.", en:"It completely changes our daily routine."},
    {fr:"Mais on ne pourrait plus s'en passer maintenant.", en:"But we couldn't do without him now."},
    {fr:"Il fait vraiment partie de la famille.", en:"He's really become part of the family."}
  ]},
  { title:"Réparer quelque chose soi-même", phrases:[
    {fr:"Le robinet fuit depuis quelques jours déjà.", en:"The faucet has been leaking for a few days already."},
    {fr:"J'ai regardé quelques tutoriels avant de m'y mettre.", en:"I watched a few tutorials before getting started."},
    {fr:"C'est la réparation la plus simple que j'aie jamais faite.", en:"This is the easiest repair I've ever done."},
    {fr:"Cet outil-là est de loin le plus utile de la boîte.", en:"That tool is by far the most useful in the box."},
    {fr:"C'était plus rapide que ce que je pensais.", en:"It was quicker than I thought."},
    {fr:"Le pire moment, c'était de trouver la bonne pièce.", en:"The worst part was finding the right piece."},
    {fr:"Au final, tout fonctionne parfaitement.", en:"In the end, everything works perfectly."},
    {fr:"C'est la satisfaction la plus grande de faire les choses soi-même.", en:"It's the greatest satisfaction, doing things yourself."},
    {fr:"Je me sens vraiment fier du résultat.", en:"I feel really proud of the result."},
    {fr:"La prochaine réparation ne me fait plus du tout peur.", en:"The next repair doesn't scare me at all anymore."}
  ], tip:{
    title:"Le superlatif : the most... / the -est",
    example:"C'est la réparation la plus simple que j'aie jamais faite. — This is the <b>easiest</b> repair I've ever done.",
    body:"Comme pour le comparatif, un adjectif court prend « -est » (« easy → the easiest »), et un adjectif plus long utilise « the most » (« useful → the most useful »). On ajoute toujours « the » devant : « the easiest », « the most useful ». Attention aux irréguliers : « good → the best », « bad → the worst »."
  }},
  { title:"Gérer les tâches ménagères", phrases:[
    {fr:"On se partage les tâches ménagères depuis peu.", en:"We've been sharing the household chores recently."},
    {fr:"Chacun a sa liste pour la semaine.", en:"Everyone has their own list for the week."},
    {fr:"Ça évite pas mal de discussions inutiles.", en:"It avoids quite a few unnecessary arguments."},
    {fr:"La vaisselle, c'est plutôt mon rayon.", en:"Doing the dishes is more my thing."},
    {fr:"Lui, il préfère s'occuper du linge.", en:"He prefers taking care of the laundry."},
    {fr:"On essaie de rester justes l'un envers l'autre.", en:"We try to be fair to each other."},
    {fr:"Ce n'est pas toujours équilibré, mais on s'ajuste.", en:"It's not always balanced, but we adjust."},
    {fr:"Une maison bien organisée, c'est quand même plus agréable.", en:"A well-organized home is just more pleasant."},
    {fr:"Ça demande un peu de communication au début.", en:"It takes a bit of communication at first."},
    {fr:"Mais au final, tout le monde y trouve son compte.", en:"But in the end, everyone benefits."}
  ]},
  { title:"Discuter de projets pour le week-end", phrases:[
    {fr:"Qu'est-ce que tu comptes faire ce week-end ?", en:"What are you planning to do this weekend?"},
    {fr:"Je n'ai encore rien décidé de précis.", en:"I haven't decided on anything specific yet."},
    {fr:"On pourrait faire une randonnée si le temps le permet.", en:"We could go hiking if the weather allows it."},
    {fr:"Sinon, on reste tranquillement à la maison.", en:"Otherwise, we'll just stay home quietly."},
    {fr:"J'aimerais bien essayer ce nouveau restaurant dont tout le monde parle.", en:"I'd love to try that new restaurant everyone's talking about."},
    {fr:"On pourrait combiner les deux, en fait.", en:"We could actually combine both."},
    {fr:"Il faudrait vérifier la météo avant de se décider.", en:"We should check the weather before deciding."},
    {fr:"Un week-end sans plan, ça a aussi son charme.", en:"A weekend with no plans has its own charm too."},
    {fr:"On improvisera selon l'humeur du moment.", en:"We'll improvise depending on the mood."},
    {fr:"En tout cas, ça va faire du bien de se reposer.", en:"Either way, it'll be good to rest."}
  ]},
  { title:"Faire du bénévolat", phrases:[
    {fr:"Je me suis inscrit comme bénévole dans une association locale.", en:"I signed up as a volunteer at a local charity."},
    {fr:"On aide surtout des familles dans le besoin.", en:"We mainly help families in need."},
    {fr:"Je donne un peu de mon temps chaque semaine.", en:"I give a bit of my time each week."},
    {fr:"Ça me fait sortir de mon quotidien habituel.", en:"It gets me out of my usual routine."},
    {fr:"J'ai rencontré des gens formidables grâce à ça.", en:"I've met wonderful people because of it."},
    {fr:"Ce n'est pas toujours facile, mais c'est très gratifiant.", en:"It's not always easy, but it's very rewarding."},
    {fr:"On se sent utile, et ça compte énormément.", en:"You feel useful, and that matters a lot."},
    {fr:"Je recommande vraiment cette expérience à tout le monde.", en:"I really recommend this experience to everyone."},
    {fr:"Ça change complètement la manière de voir les choses.", en:"It completely changes the way you see things."},
    {fr:"Je continuerai tant que je le pourrai.", en:"I'll keep doing it as long as I can."}
  ]},
  { title:"Parler de ses habitudes de santé", phrases:[
    {fr:"J'essaie de manger plus équilibré depuis quelque temps.", en:"I've been trying to eat more balanced meals for a while."},
    {fr:"Je bois beaucoup plus d'eau qu'avant.", en:"I drink a lot more water than before."},
    {fr:"Je marche presque tous les jours, même un peu.", en:"I walk almost every day, even just a little."},
    {fr:"Le sommeil, c'est ce qui me manque le plus en ce moment.", en:"Sleep is what I'm lacking the most right now."},
    {fr:"Je me couche un peu trop tard, je le sais.", en:"I go to bed a bit too late, I know that."},
    {fr:"J'essaie de réduire le sucre petit à petit.", en:"I'm trying to cut down on sugar little by little."},
    {fr:"Ce n'est pas toujours évident de tenir de bonnes habitudes.", en:"It's not always easy to stick to good habits."},
    {fr:"Mais chaque petit progrès compte.", en:"But every small improvement counts."},
    {fr:"Je me sens déjà un peu mieux qu'avant.", en:"I already feel a bit better than before."},
    {fr:"L'objectif, c'est la régularité, pas la perfection.", en:"The goal is consistency, not perfection."}
  ]},
  { title:"Bilan complet du niveau 2 - module 1", phrases:[
    {fr:"On a couvert énormément de situations du quotidien.", en:"We've covered so many everyday situations."},
    {fr:"Le vocabulaire que tu as appris est déjà beaucoup plus riche.", en:"The vocabulary you've learned is already much richer."},
    {fr:"Les phrases que tu formules sonnent de plus en plus naturelles.", en:"The sentences you're forming sound more and more natural."},
    {fr:"C'est exactement le genre de progrès qui compte vraiment.", en:"That's exactly the kind of progress that really matters."},
    {fr:"La personne qui pratique régulièrement progresse toujours plus vite.", en:"The person who practices regularly always progresses faster."},
    {fr:"Les efforts que tu as fournis commencent à porter leurs fruits.", en:"The efforts you've put in are starting to pay off."},
    {fr:"Il reste encore deux modules passionnants à découvrir.", en:"There are still two exciting modules left to discover."},
    {fr:"Continue sur cette lancée, tu es sur la bonne voie.", en:"Keep up this momentum, you're on the right track."},
    {fr:"Le module qui t'attend ensuite parle des voyages.", en:"The module that's waiting for you next is about traveling."},
    {fr:"Bravo, tu as terminé le module « Le quotidien » du niveau 2 !", en:"Well done, you've completed the \"Everyday Life\" module of level 2!"}
  ], tip:{
    title:"Les pronoms relatifs : who / which / that",
    example:"La personne qui pratique régulièrement progresse toujours plus vite. — The person <b>who</b> practices regularly always progresses faster.",
    body:"« Who » s'utilise pour une personne (« the person who... »), « which » pour une chose (« the book which... »), et « that » peut remplacer les deux à l'oral, de façon plus informelle. Ces mots permettent de relier deux idées en une seule phrase plus fluide, exactement comme « qui » ou « que » en français."
  }}
];

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

const LEVEL2_MODULES = [
  {
    id:1, name:"Le quotidien",
    desc:"Les mêmes situations de vie qu'au niveau 1, en plus riche : de nouvelles scènes, un vocabulaire plus varié.",
    totalPhrases:200, lessonsCount:20,
    lessons:[ ...level2Module1Lessons1to10, ...level2Module1Lessons11to20 ]
  },
  {
    id:2, name:"En voyage",
    desc:"De nouvelles aventures, un vocabulaire de voyage plus riche et des situations imprévues.",
    totalPhrases:200, lessonsCount:20,
    lessons: level2Module2Lessons
  },
  {
    id:3, name:"Conversation sociale",
    desc:"Exprime tes opinions, tes émotions et gère les petites situations sociales du quotidien avec plus d'aisance.",
    totalPhrases:200, lessonsCount:20,
    lessons: level2Module3Lessons
  }
];
const LEVEL2_FREE_LESSONS = { 1: 3, 2: 0, 3: 0 }; // à partir du niveau 2, seulement 3 leçons gratuites

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

/* ============================================================
   NIVEAU 3 — MODULE 2 "En voyage"
   200 phrases, 20 leçons, 5 points de grammaire.
   Niveau avancé (B1-B2) : conditionnels mixtes, voix passive au passé,
   inversion, participes en -ing, "as if/as though".
   ============================================================ */

const level3Module2Lessons = [
  { title:"Un vol annulé à la dernière minute", phrases:[
    {fr:"Si j'avais vérifié mes mails plus tôt, je l'aurais su avant d'arriver à l'aéroport.", en:"If I had checked my emails earlier, I would have known before getting to the airport."},
    {fr:"Le vol a été annulé sans aucune explication claire.", en:"The flight was cancelled without any clear explanation."},
    {fr:"Si on n'avait pas une assurance voyage, on serait dans une situation bien pire.", en:"If we didn't have travel insurance, we'd be in a much worse situation now."},
    {fr:"Tous les passagers ont été redirigés vers un autre terminal.", en:"All passengers were redirected to another terminal."},
    {fr:"Debout dans cette file depuis des heures, je commençais à perdre patience.", en:"Standing in this queue for hours, I was starting to lose patience."},
    {fr:"Si j'avais réservé un vol plus tôt dans la journée, ça ne serait jamais arrivé.", en:"If I had booked an earlier flight, this would never have happened."},
    {fr:"Un hôtel nous a finalement été proposé par la compagnie.", en:"A hotel was eventually offered to us by the airline."},
    {fr:"Épuisés par cette longue attente, on a fini par accepter n'importe quelle solution.", en:"Exhausted by this long wait, we ended up accepting any solution at all."},
    {fr:"Si tout s'était passé comme prévu, on serait déjà arrivés à destination.", en:"If everything had gone as planned, we would already be at our destination."},
    {fr:"Au moins, une leçon a été apprise pour la prochaine fois.", en:"At least a lesson was learned for next time."}
  ], tip:{
    title:"Le conditionnel mixte (mixed conditional)",
    example:"Si on n'avait pas une assurance voyage, on serait dans une situation bien pire maintenant. — If we <b>didn't have</b> travel insurance, we<b>'d be</b> in a much worse situation now.",
    body:"Le conditionnel mixte combine une condition passée (ou présente) avec une conséquence présente (ou passée) : « If + prétérit, would + verbe » pour une situation présente résultant d'une condition générale, ou « If + past perfect, would + verbe » pour une conséquence présente d'un événement passé. Utile pour exprimer des liens de cause à effet complexes entre passé et présent."
  }},
  { title:"Visiter un site historique", phrases:[
    {fr:"Ce château a été construit il y a plus de six cents ans.", en:"This castle was built more than six hundred years ago."},
    {fr:"Les ruines ont été découvertes par hasard au siècle dernier.", en:"The ruins were discovered by chance last century."},
    {fr:"Debout devant ces vestiges, on ressentait vraiment le poids de l'histoire.", en:"Standing in front of these remains, you could really feel the weight of history."},
    {fr:"Cette fresque a été restaurée avec un soin incroyable.", en:"This fresco was restored with incredible care."},
    {fr:"Le site est visité chaque année par des millions de touristes.", en:"The site is visited by millions of tourists every year."},
    {fr:"Marchant dans ces anciennes rues, on imaginait facilement la vie d'autrefois.", en:"Walking through these ancient streets, you could easily picture life back then."},
    {fr:"Certaines parties du monument n'ont jamais été entièrement expliquées.", en:"Some parts of the monument have never been fully explained."},
    {fr:"Ce genre de lieu ne laisse jamais indifférent.", en:"This kind of place never leaves you indifferent."},
    {fr:"Si peu de touristes visitaient ce coin-ci qu'on s'y sentait presque seuls.", en:"So few tourists were visiting this part that we almost felt alone there."},
    {fr:"On en garde un souvenir qui ne s'effacera jamais vraiment.", en:"We'll keep a memory of it that will never really fade."}
  ], tip:{
    title:"La proposition participiale (-ing en début de phrase)",
    example:"Debout devant ces vestiges, on ressentait le poids de l'histoire. — <b>Standing</b> in front of these remains, you could really feel the weight of history.",
    body:"On peut remplacer une proposition de temps ou de cause par un participe en -ing en début de phrase, pour un style plus fluide et littéraire : « Walking through the streets, we discovered... » au lieu de « While we were walking... ». Très courant dans les récits de voyage."
  }},
  { title:"Faire face à un vol de bagages", phrases:[
    {fr:"Mon sac avait été laissé sans surveillance à peine deux minutes.", en:"My bag had been left unattended for barely two minutes."},
    {fr:"Si j'avais gardé un œil dessus, rien de tout ça ne serait arrivé.", en:"If I had kept an eye on it, none of this would have happened."},
    {fr:"Le vol a été signalé à la police locale dans l'heure.", en:"The theft was reported to the local police within the hour."},
    {fr:"Debout face à l'officier, j'essayais de me souvenir de chaque détail.", en:"Standing in front of the officer, I was trying to remember every detail."},
    {fr:"Heureusement, mes documents importants avaient été gardés sur moi.", en:"Luckily, my important documents had been kept on me."},
    {fr:"Si l'assurance ne couvrait pas ce genre d'incident, ce serait une vraie catastrophe.", en:"If the insurance didn't cover this kind of incident, it would be a real disaster."},
    {fr:"Plusieurs autres touristes avaient apparemment vécu la même mésaventure.", en:"Several other tourists had apparently had the same misadventure."},
    {fr:"Ça nous a appris à être bien plus vigilants désormais.", en:"It taught us to be much more careful from now on."},
    {fr:"Le reste du voyage a été géré sans l'équipement volé.", en:"The rest of the trip was managed without the stolen equipment."},
    {fr:"Au final, ce n'était qu'un objet, pas une vie gâchée.", en:"In the end, it was just an object, not a ruined life."}
  ]},
  { title:"S'immerger dans une culture très différente", phrases:[
    {fr:"Si on n'avait jamais quitté notre zone de confort, on n'aurait jamais compris ça.", en:"If we had never left our comfort zone, we would never have understood this."},
    {fr:"Certaines coutumes locales nous ont été expliquées par notre hôte.", en:"Some local customs were explained to us by our host."},
    {fr:"Assis par terre pour le repas, on se sentait un peu maladroits au début.", en:"Sitting on the floor for the meal, we felt a bit clumsy at first."},
    {fr:"Ce rituel est pratiqué dans cette région depuis des générations.", en:"This ritual has been practised in this region for generations."},
    {fr:"Si on avait jugé trop vite, on serait passés à côté de tellement de choses.", en:"If we had judged too quickly, we would have missed out on so much."},
    {fr:"Certains gestes ont dû être appris pour éviter d'offenser qui que ce soit.", en:"Some gestures had to be learned to avoid offending anyone."},
    {fr:"Observant attentivement les habitants, on a fini par comprendre leurs habitudes.", en:"Watching the locals closely, we eventually understood their habits."},
    {fr:"Ce voyage nous a changés bien plus qu'on ne l'imaginait.", en:"This trip changed us far more than we ever imagined."},
    {fr:"On a été accueillis avec une générosité qu'on n'oubliera jamais.", en:"We were welcomed with a generosity we'll never forget."},
    {fr:"Rentrer chez soi n'a jamais semblé aussi étrange qu'après ce voyage.", en:"Going home never felt as strange as after this trip."}
  ]},
  { title:"Gérer une situation d'urgence à l'étranger", phrases:[
    {fr:"Si on n'avait pas eu les numéros d'urgence sur nous, ça aurait été bien plus difficile.", en:"If we hadn't had the emergency numbers on us, it would have been much harder."},
    {fr:"L'ambassade a été contactée dès que la situation est devenue claire.", en:"The embassy was contacted as soon as the situation became clear."},
    {fr:"Assis dans la salle d'attente, on essayait de rester calmes malgré tout.", en:"Sitting in the waiting room, we tried to stay calm despite everything."},
    {fr:"Cette procédure est généralement suivie dans ce genre de cas.", en:"This procedure is usually followed in this kind of case."},
    {fr:"Si personne ne parlait anglais, on aurait vraiment été perdus.", en:"If no one had spoken English, we would have been truly lost."},
    {fr:"Heureusement, un interprète nous a été fourni assez rapidement.", en:"Luckily, an interpreter was provided to us fairly quickly."},
    {fr:"Agissant vite, on a réussi à régler le problème en une journée.", en:"Acting quickly, we managed to sort the problem out in one day."},
    {fr:"Ce genre d'expérience teste vraiment les nerfs.", en:"This kind of experience really tests your nerves."},
    {fr:"On en est ressortis avec encore plus de confiance en nous.", en:"We came out of it with even more confidence in ourselves."},
    {fr:"Rarement un voyage ne nous a appris autant sur nous-mêmes.", en:"Rarely has a trip taught us this much about ourselves."}
  ], tip:{
    title:"L'inversion après « rarely », « never », « seldom »",
    example:"Rarement un voyage ne nous a appris autant. — <b>Rarely has a trip</b> taught us this much.",
    body:"Quand une phrase commence par un adverbe négatif ou restrictif (« rarely », « never », « seldom », « hardly »), l'ordre sujet-verbe s'inverse, comme dans une question : « Never have I seen... », « Rarely does she complain ». Ce style est plus formel et littéraire, courant dans les récits."
  }},
  { title:"Choisir entre plusieurs destinations", phrases:[
    {fr:"Si j'avais plus de budget, j'irais directement en Asie du Sud-Est.", en:"If I had a bigger budget, I would go straight to Southeast Asia."},
    {fr:"Cette destination m'a été recommandée par plusieurs amis.", en:"This destination was recommended to me by several friends."},
    {fr:"Hésitant entre deux pays, j'ai fini par lancer une pièce.", en:"Hesitating between two countries, I ended up flipping a coin."},
    {fr:"Si le climat n'était pas un facteur, ce choix serait bien plus simple.", en:"If climate weren't a factor, this choice would be much simpler."},
    {fr:"Chaque option a ses propres avantages et inconvénients.", en:"Each option has its own advantages and drawbacks."},
    {fr:"Les vols ont déjà été comparés sur plusieurs sites différents.", en:"Flights have already been compared on several different websites."},
    {fr:"Si l'argent n'était pas un problème, je visiterais tous ces endroits à la fois.", en:"If money weren't an issue, I would visit all these places at once."},
    {fr:"Pesant le pour et le contre, j'ai enfin pris ma décision.", en:"Weighing the pros and cons, I've finally made my decision."},
    {fr:"On ne peut jamais vraiment se tromper en voyageant, de toute façon.", en:"You can never really go wrong by travelling, anyway."},
    {fr:"Vivement la prochaine étape de ce périple.", en:"Looking forward to the next stage of this journey."}
  ]},
  { title:"Participer à un festival local", phrases:[
    {fr:"Si on n'avait pas vérifié le calendrier, on aurait complètement raté cet événement.", en:"If we hadn't checked the calendar, we would have completely missed this event."},
    {fr:"Ce festival est célébré ici depuis des siècles.", en:"This festival has been celebrated here for centuries."},
    {fr:"Entourés de couleurs et de musique, on s'est vite laissés emporter.", en:"Surrounded by colour and music, we quickly got swept up in it."},
    {fr:"Certains costumes sont transmis de génération en génération.", en:"Some costumes are passed down from generation to generation."},
    {fr:"Si on avait su à quel point c'était populaire, on serait arrivés bien plus tôt.", en:"If we had known how popular it was, we would have arrived much earlier."},
    {fr:"On nous a offert de la nourriture typique tout au long de la soirée.", en:"We were offered traditional food throughout the evening."},
    {fr:"Dansant au milieu de la foule, on s'est sentis complètement intégrés.", en:"Dancing in the middle of the crowd, we felt completely part of it."},
    {fr:"Ce genre d'événement en dit long sur une culture.", en:"This kind of event says a lot about a culture."},
    {fr:"Jamais on n'avait vu une telle énergie collective.", en:"Never had we seen such collective energy."},
    {fr:"Ce souvenir restera gravé en nous pour très longtemps.", en:"This memory will stay with us for a very long time."}
  ]},
  { title:"Faire une randonnée exigeante", phrases:[
    {fr:"Si on n'avait pas aussi bien préparé notre équipement, on n'aurait jamais tenu.", en:"If we hadn't prepared our gear so well, we would never have made it."},
    {fr:"Le sentier avait été marqué seulement quelques années auparavant.", en:"The trail had only been marked a few years before."},
    {fr:"Grimpant depuis l'aube, on commençait vraiment à sentir la fatigue.", en:"Having been climbing since dawn, we were really starting to feel the fatigue."},
    {fr:"Cette vue n'est accessible qu'après plusieurs heures d'effort.", en:"This view can only be reached after several hours of effort."},
    {fr:"Si la météo avait tourné, on aurait dû rebrousser chemin immédiatement.", en:"If the weather had turned, we would have had to turn back immediately."},
    {fr:"Chaque pas semblait être récompensé par un paysage plus beau encore.", en:"Every step seemed to be rewarded by an even more beautiful view."},
    {fr:"Essoufflés mais heureux, on a enfin atteint le sommet.", en:"Out of breath but happy, we finally reached the summit."},
    {fr:"Rarement un effort physique n'a procuré une telle satisfaction.", en:"Rarely has physical effort brought such satisfaction."},
    {fr:"Cette randonnée restera sans doute la plus dure de toute notre vie.", en:"This hike will probably remain the hardest of our whole lives."},
    {fr:"On redescend fatigués, mais avec un sentiment d'accomplissement immense.", en:"We're heading back down tired, but with an immense sense of achievement."}
  ]},
  { title:"Se faire arnaquer et en tirer une leçon", phrases:[
    {fr:"Si j'avais été plus méfiant, je n'aurais jamais payé ce prix-là.", en:"If I had been more wary, I would never have paid that price."},
    {fr:"Ce genre d'arnaque est malheureusement assez courant dans les zones touristiques.", en:"This kind of scam is unfortunately quite common in touristy areas."},
    {fr:"Debout là, réalisant ce qui venait de se passer, je me sentais stupide.", en:"Standing there, realising what had just happened, I felt stupid."},
    {fr:"On m'avait pourtant prévenu de faire attention à ce genre de situation.", en:"I had been warned to watch out for this kind of situation though."},
    {fr:"Si je n'en avais pas parlé à d'autres voyageurs, je n'aurais jamais compris le piège.", en:"If I hadn't talked about it to other travellers, I would never have understood the trick."},
    {fr:"Cette expérience, aussi désagréable soit-elle, m'a rendu plus prudent.", en:"This experience, unpleasant as it was, made me more careful."},
    {fr:"Ayant appris ma leçon, je vérifie désormais tout deux fois.", en:"Having learned my lesson, I now check everything twice."},
    {fr:"Ce genre de mésaventure arrive à presque tous les voyageurs un jour ou l'autre.", en:"This kind of mishap happens to almost every traveller at some point."},
    {fr:"Au moins, ça ne m'a pas coûté une fortune.", en:"At least it didn't cost me a fortune."},
    {fr:"On en rit maintenant, mais sur le moment, ça n'avait rien de drôle.", en:"We laugh about it now, but at the time, it was nothing funny."}
  ]},
  { title:"Voyager seul pour la première fois", phrases:[
    {fr:"Si je n'avais jamais osé partir seul, je n'aurais jamais découvert cette force en moi.", en:"If I had never dared to go alone, I would never have discovered this strength in myself."},
    {fr:"Ce voyage a été entièrement organisé par mes soins, du début à la fin.", en:"This trip was entirely organised by me, from start to finish."},
    {fr:"Marchant seul dans ces rues inconnues, j'ai ressenti une liberté incroyable.", en:"Walking alone through these unfamiliar streets, I felt an incredible sense of freedom."},
    {fr:"Chaque décision devait être prise sans l'avis de personne d'autre.", en:"Every decision had to be made without anyone else's input."},
    {fr:"Si j'avais eu peur, je serais probablement resté chez moi.", en:"If I had been scared, I would probably have stayed home."},
    {fr:"On rencontre des gens bien plus facilement quand on voyage seul.", en:"You meet people much more easily when you travel alone."},
    {fr:"Apprenant à me débrouiller seul, j'ai gagné une confiance que je n'avais jamais eue.", en:"Learning to manage on my own, I gained a confidence I'd never had."},
    {fr:"Jamais je ne m'étais senti aussi vivant qu'au cours de ce voyage.", en:"Never had I felt so alive as during this trip."},
    {fr:"Ce genre d'expérience change durablement la façon dont on voit le monde.", en:"This kind of experience permanently changes the way you see the world."},
    {fr:"Je recommande ce voyage à quiconque hésite encore à se lancer.", en:"I recommend this trip to anyone still hesitating to take the leap."}
  ]},
  { title:"Rentrer d'un long voyage", phrases:[
    {fr:"Si ce voyage n'avait duré qu'une semaine, rien de tout ça ne se serait passé.", en:"If this trip had only lasted a week, none of this would have happened."},
    {fr:"Tant de souvenirs ont été accumulés en si peu de temps.", en:"So many memories have been built up in such a short time."},
    {fr:"Assis dans l'avion du retour, je réalisais à peine que c'était terminé.", en:"Sitting on the flight home, I could barely believe it was over."},
    {fr:"Cette version de moi-même n'est plus tout à fait celle qui était partie.", en:"This version of myself is no longer quite the one who left."},
    {fr:"Si je n'avais jamais quitté ma routine, je n'aurais jamais changé autant.", en:"If I had never left my routine, I would never have changed this much."},
    {fr:"Certaines habitudes locales m'ont été si naturelles que j'ai du mal à les abandonner.", en:"Some local habits became so natural to me that I find it hard to let them go."},
    {fr:"Repensant à tout ce chemin parcouru, je me sens vraiment transformé.", en:"Looking back on this whole journey, I feel truly transformed."},
    {fr:"Le décalage culturel au retour est presque plus fort que celui du départ.", en:"The culture shock on returning is almost stronger than the one on leaving."},
    {fr:"Ce voyage restera sans doute le tournant d'une bonne partie de ma vie.", en:"This trip will probably remain a turning point in a large part of my life."},
    {fr:"Déjà, une nouvelle destination me trotte dans la tête.", en:"Already, a new destination is on my mind."}
  ]},
  { title:"Partager son expérience de voyage avec des proches", phrases:[
    {fr:"Si je racontais tout en détail, on y passerait la nuit entière.", en:"If I told everything in detail, we'd be here all night."},
    {fr:"Ces photos ont été prises dans des endroits que je n'oublierai jamais.", en:"These photos were taken in places I'll never forget."},
    {fr:"Assis autour de la table, mes amis buvaient littéralement mes paroles.", en:"Sitting around the table, my friends were literally hanging on my every word."},
    {fr:"Certaines histoires semblent presque inventées tant elles sont incroyables.", en:"Some stories seem almost made up, they're so incredible."},
    {fr:"Si on n'avait pas vécu ça nous-mêmes, on aurait du mal à y croire aussi.", en:"If we hadn't experienced it ourselves, we'd find it hard to believe too."},
    {fr:"Essayant de résumer trois mois de voyage, je ne savais même pas par où commencer.", en:"Trying to sum up three months of travel, I didn't even know where to start."},
    {fr:"Certains moments ne peuvent tout simplement pas être mis en mots.", en:"Some moments simply can't be put into words."},
    {fr:"Ils m'écoutaient comme s'ils vivaient l'aventure à travers moi.", en:"They listened to me as if they were living the adventure through me."},
    {fr:"Ce genre de conversation donne vraiment envie de repartir.", en:"This kind of conversation really makes you want to leave again."},
    {fr:"Je crois que je viens de leur donner, à eux aussi, l'envie de voyager.", en:"I think I've just given them the travel bug too."}
  ], tip:{
    title:"« As if » / « as though » pour exprimer une impression",
    example:"Ils m'écoutaient comme s'ils vivaient l'aventure à travers moi. — They listened to me <b>as if</b> they were living the adventure through me.",
    body:"« As if » et « as though » (interchangeables) introduisent une comparaison ou une impression, souvent suivis du prétérit même pour parler du présent : « He talks as if he knew everything », « She looked as though she had seen a ghost »."
  }},
  { title:"Louer un logement atypique", phrases:[
    {fr:"Si on avait réservé un hôtel classique, on n'aurait jamais vécu ça.", en:"If we had booked a regular hotel, we would never have experienced this."},
    {fr:"Cette cabane a été construite entièrement à la main par le propriétaire.", en:"This cabin was built entirely by hand by the owner."},
    {fr:"Allongés sous les étoiles, on avait l'impression de dormir en plein ciel.", en:"Lying under the stars, we felt like we were sleeping in the open sky."},
    {fr:"Aucune électricité n'était disponible, ce qui rendait l'expérience encore plus authentique.", en:"No electricity was available, which made the experience even more authentic."},
    {fr:"Si le confort nous importait plus que l'originalité, on aurait fait un autre choix.", en:"If comfort had mattered more to us than originality, we would have made a different choice."},
    {fr:"L'eau était chauffée directement par un petit poêle à bois.", en:"The water was heated directly by a small wood stove."},
    {fr:"Vivant comme ça, ne serait-ce que quelques jours, change vraiment la perspective.", en:"Living like that, even for just a few days, really changes your perspective."},
    {fr:"Ce genre d'hébergement se réserve souvent des mois à l'avance.", en:"This kind of accommodation is often booked months in advance."},
    {fr:"Jamais un simple hôtel ne nous aurait offert un tel souvenir.", en:"Never would a simple hotel have given us such a memory."},
    {fr:"On cherche déjà le prochain logement insolite pour notre prochain voyage.", en:"We're already looking for the next unusual place to stay for our next trip."}
  ]},
  { title:"Traverser une frontière terrestre", phrases:[
    {fr:"Si on n'avait pas tous nos papiers sur nous, on n'aurait jamais pu passer.", en:"If we hadn't had all our papers on us, we would never have been able to cross."},
    {fr:"Ce poste-frontière est traversé par des milliers de personnes chaque jour.", en:"This border crossing is used by thousands of people every day."},
    {fr:"Debout dans la file depuis des heures, on observait tout ce petit monde.", en:"Standing in the queue for hours, we watched all these people."},
    {fr:"Certains documents ont dû être traduits avant notre arrivée.", en:"Some documents had to be translated before our arrival."},
    {fr:"Si on avait choisi un autre point de passage, ça aurait sans doute été plus rapide.", en:"If we had chosen a different crossing point, it would probably have been faster."},
    {fr:"Le changement d'ambiance de l'autre côté était presque immédiat.", en:"The change in atmosphere on the other side was almost immediate."},
    {fr:"Attendant patiemment notre tour, on a fini par sympathiser avec d'autres voyageurs.", en:"Waiting patiently for our turn, we ended up chatting with other travellers."},
    {fr:"Ce genre de passage terrestre offre une perspective que l'avion ne donne jamais.", en:"This kind of overland crossing offers a perspective that flying never gives you."},
    {fr:"Rarement un simple tampon sur un passeport n'a semblé aussi symbolique.", en:"Rarely has a simple stamp on a passport felt so symbolic."},
    {fr:"On est officiellement dans un tout nouveau pays, et ça se sent immédiatement.", en:"We're officially in a brand new country, and you can feel it right away."}
  ]},
  { title:"Apprendre quelques mots de la langue locale", phrases:[
    {fr:"Si je n'avais appris que l'anglais, je serais passé à côté de tant de choses.", en:"If I had only learned English, I would have missed out on so much."},
    {fr:"Ces quelques phrases m'ont été enseignées par un ami avant le départ.", en:"These few phrases were taught to me by a friend before leaving."},
    {fr:"Essayant maladroitement de parler la langue, les gens souriaient immédiatement.", en:"Clumsily trying to speak the language, people would smile right away."},
    {fr:"Ce simple effort est toujours perçu comme un signe de respect.", en:"This simple effort is always seen as a sign of respect."},
    {fr:"Si je m'étais limité à l'anglais, les échanges auraient été bien plus froids.", en:"If I had stuck to English, the exchanges would have been much colder."},
    {fr:"Certains mots sont plus difficiles à prononcer correctement que d'autres.", en:"Some words are harder to pronounce correctly than others."},
    {fr:"Riant de mes propres erreurs, j'ai fini par apprendre encore plus vite.", en:"Laughing at my own mistakes, I ended up learning even faster."},
    {fr:"Même quelques mots suffisent à transformer complètement une rencontre.", en:"Even just a few words are enough to completely transform an encounter."},
    {fr:"Jamais je n'aurais cru qu'apprendre si peu pourrait changer autant de choses.", en:"Never would I have thought that learning so little could change so much."},
    {fr:"Je continue d'apprendre, même maintenant que je suis rentré.", en:"I'm still learning, even now that I'm back home."}
  ]},
  { title:"Organiser un voyage en groupe", phrases:[
    {fr:"Si on n'avait pas réparti les tâches, rien n'aurait jamais été organisé à temps.", en:"If we hadn't split up the tasks, nothing would ever have been organised in time."},
    {fr:"Chaque détail a été discuté pendant des semaines avant le départ.", en:"Every detail was discussed for weeks before leaving."},
    {fr:"Essayant de satisfaire tout le monde, on a parfois dû faire des compromis.", en:"Trying to please everyone, we sometimes had to make compromises."},
    {fr:"Les préférences de chacun ont été prises en compte autant que possible.", en:"Everyone's preferences were taken into account as much as possible."},
    {fr:"Si on avait laissé une seule personne tout décider, ça aurait créé des tensions.", en:"If we had let just one person decide everything, it would have caused tension."},
    {fr:"Voyager en groupe demande une organisation bien plus poussée qu'en solo.", en:"Travelling in a group requires far more planning than solo travel."},
    {fr:"Négociant chaque étape ensemble, on a fini par tous être satisfaits.", en:"Negotiating each stage together, we all ended up satisfied."},
    {fr:"Ce genre d'aventure partagée crée des liens particulièrement forts.", en:"This kind of shared adventure creates particularly strong bonds."},
    {fr:"Rarement un groupe aussi hétéroclite ne s'était aussi bien entendu.", en:"Rarely had such a varied group got on so well together."},
    {fr:"On parle déjà d'organiser le prochain voyage ensemble.", en:"We're already talking about organising the next trip together."}
  ]},
  { title:"Faire du bénévolat pendant un voyage", phrases:[
    {fr:"Si je n'avais pas cherché ce genre de programme, je n'aurais jamais vécu ça.", en:"If I hadn't looked for this kind of programme, I would never have experienced this."},
    {fr:"Cette école a été entièrement reconstruite grâce à des bénévoles internationaux.", en:"This school was entirely rebuilt thanks to international volunteers."},
    {fr:"Travaillant aux côtés des habitants, j'ai appris bien plus que je n'ai enseigné.", en:"Working alongside the locals, I learned far more than I taught."},
    {fr:"Ces enfants ont été particulièrement touchés par notre présence, je crois.", en:"These children were particularly moved by our presence, I think."},
    {fr:"Si j'avais choisi un simple circuit touristique, je n'aurais jamais créé ces liens.", en:"If I had chosen a regular tourist tour, I would never have formed these connections."},
    {fr:"Ce genre d'expérience donne un sens complètement différent au mot « voyage ».", en:"This kind of experience gives a completely different meaning to the word \"travel\"."},
    {fr:"Repartant de cet endroit, j'avais les larmes aux yeux.", en:"Leaving that place, I had tears in my eyes."},
    {fr:"On garde contact avec certaines personnes rencontrées là-bas encore aujourd'hui.", en:"We're still in touch with some of the people we met there even today."},
    {fr:"Jamais un voyage ne m'avait rendu aussi humble.", en:"Never had a trip made me feel so humble."},
    {fr:"Je recommencerai ce genre d'expérience à la première occasion.", en:"I'll do this kind of experience again at the first opportunity."}
  ]},
  { title:"Vivre un décalage culturel au retour", phrases:[
    {fr:"Si je n'avais pas vécu là-bas si longtemps, le retour aurait été bien plus facile.", en:"If I hadn't lived there for so long, the return would have been much easier."},
    {fr:"Mes propres habitudes m'ont semblé étranges une fois rentré.", en:"My own habits felt strange to me once I was back."},
    {fr:"Marchant dans les rues de ma ville, tout me paraissait différent.", en:"Walking through the streets of my own city, everything felt different."},
    {fr:"Ce sentiment n'avait jamais été aussi fort lors d'un précédent voyage.", en:"This feeling had never been this strong after a previous trip."},
    {fr:"Si personne ne m'avait prévenu, je n'aurais jamais compris ce qui m'arrivait.", en:"If no one had warned me, I would never have understood what was happening to me."},
    {fr:"Certaines personnes ne comprenaient tout simplement pas ce que j'avais vécu.", en:"Some people simply didn't understand what I had been through."},
    {fr:"Essayant de retrouver mes repères, ça m'a pris bien plus de temps que prévu.", en:"Trying to find my footing again, it took me much longer than expected."},
    {fr:"Ce genre de choc en dit long sur l'ampleur du voyage qu'on vient de vivre.", en:"This kind of shock says a lot about how significant the trip you've just had was."},
    {fr:"Jamais je n'aurais imaginé que revenir serait plus difficile que partir.", en:"Never would I have imagined that coming back would be harder than leaving."},
    {fr:"Avec le temps, les deux mondes ont fini par trouver leur équilibre en moi.", en:"Over time, the two worlds eventually found their balance within me."}
  ]},
  { title:"Préparer un très long voyage à l'avance", phrases:[
    {fr:"Si on n'avait pas commencé à préparer ce voyage un an à l'avance, on n'aurait jamais été prêts.", en:"If we hadn't started preparing this trip a year in advance, we would never have been ready."},
    {fr:"Chaque étape a été minutieusement planifiée avant notre départ.", en:"Every stage was carefully planned before we left."},
    {fr:"Économisant chaque mois, on a fini par réunir le budget nécessaire.", en:"Saving every month, we eventually put together the necessary budget."},
    {fr:"Certains vaccins ont dû être faits plusieurs semaines avant le départ.", en:"Some vaccinations had to be done several weeks before leaving."},
    {fr:"Si on avait improvisé davantage, on aurait sans doute économisé du temps de préparation.", en:"If we had improvised more, we probably would have saved some preparation time."},
    {fr:"Tout l'équipement a été testé plusieurs fois avant le grand départ.", en:"All the equipment was tested several times before the big departure."},
    {fr:"Rêvant de ce voyage depuis des années, le moment semblait presque irréel.", en:"Having dreamed of this trip for years, the moment felt almost unreal."},
    {fr:"Ce niveau de préparation nous a évité bien des mauvaises surprises.", en:"This level of preparation saved us from many unpleasant surprises."},
    {fr:"Rarement un voyage n'avait été attendu avec autant d'impatience.", en:"Rarely had a trip been anticipated with so much excitement."},
    {fr:"Le jour du départ est enfin arrivé, après tant de mois d'attente.", en:"Departure day has finally arrived, after so many months of waiting."}
  ], tip:{
    title:"Le gérondif après certains verbes (« enjoy », « avoid », « keep »...)",
    example:"Économisant chaque mois, on a fini par réunir le budget. — <b>Saving</b> every month, we eventually put together the budget.",
    body:"En anglais, certains verbes sont toujours suivis d'un verbe en -ing (gérondif), jamais de l'infinitif : « avoid doing », « enjoy travelling », « keep trying », « finish packing ». C'est une source fréquente d'erreurs pour les francophones, habitués à l'infinitif après la plupart des verbes."
  }},
  { title:"Bilan du module voyage, niveau 3", phrases:[
    {fr:"Ce module nous a appris à raconter nos expériences avec plus de nuance.", en:"This module has taught us to recount our experiences with more nuance."},
    {fr:"Si on avait commencé ce niveau sans les deux précédents, ça aurait été bien plus difficile.", en:"If we had started this level without the previous two, it would have been much harder."},
    {fr:"Ces structures complexes deviennent naturelles avec de la pratique régulière.", en:"These complex structures become natural with regular practice."},
    {fr:"Chaque leçon nous rapproche un peu plus d'un anglais vraiment fluide.", en:"Each lesson brings us a little closer to truly fluent English."},
    {fr:"Rarement un module n'aura couvert autant de situations de voyage réelles.", en:"Rarely will a module have covered so many real travel situations."},
    {fr:"Si tu es arrivé jusqu'ici, continue, la fin est proche.", en:"If you've made it this far, keep going, the end is near."},
    {fr:"Ce vocabulaire te sera utile pour absolument tous tes futurs voyages.", en:"This vocabulary will be useful for absolutely all your future trips."},
    {fr:"Bravo, tu as terminé le module « En voyage » du niveau 3 !", en:"Well done, you've completed the level 3 \"Travelling\" module!"},
    {fr:"Un dernier module t'attend pour achever ce niveau.", en:"One last module awaits you to complete this level."},
    {fr:"On se retrouve très vite pour la dernière ligne droite.", en:"See you again very soon for the final stretch."}
  ]}
];

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

const LEVEL3_MODULES = [
  {
    id:1, name:"Le quotidien",
    desc:"Exprime-toi avec plus de nuance dans les situations de la vie de tous les jours : hypothèses, regrets, voix passive et tournures idiomatiques.",
    totalPhrases:200, lessonsCount:20,
    lessons: level3Module1Lessons
  },
  {
    id:2, name:"En voyage",
    desc:"Raconte tes voyages avec un anglais plus riche : conditions mixtes, inversions et expressions imagées.",
    totalPhrases:200, lessonsCount:20,
    lessons: level3Module2Lessons
  },
  {
    id:3, name:"Conversation sociale",
    desc:"Maîtrise les nuances d'un anglais soutenu pour les discussions délicates, les débats et les moments importants de la vie.",
    totalPhrases:200, lessonsCount:20,
    lessons: level3Module3Lessons
  }
];
const LEVEL3_FREE_LESSONS = { 1: 3, 2: 0, 3: 0 }; // comme au niveau 2 : seulement 3 leçons gratuites dans le premier module

/* ============================================================
   NIVEAUX — chaque niveau a ses propres modules et ses propres
   leçons gratuites. MODULES et FREE_LESSONS_PER_MODULE pointent
   vers le niveau actif ; app.js les réassigne au changement de
   niveau (voir switchLevel()).
   ============================================================ */
const LEVELS = [
  { id:1, name:"Niveau 1", modules: LEVEL1_MODULES, freeLessonsPerModule: LEVEL1_FREE_LESSONS },
  { id:2, name:"Niveau 2", modules: LEVEL2_MODULES, freeLessonsPerModule: LEVEL2_FREE_LESSONS },
  { id:3, name:"Niveau 3", modules: LEVEL3_MODULES, freeLessonsPerModule: LEVEL3_FREE_LESSONS }
];

let MODULES = LEVELS[0].modules;
let FREE_LESSONS_PER_MODULE = LEVELS[0].freeLessonsPerModule;
