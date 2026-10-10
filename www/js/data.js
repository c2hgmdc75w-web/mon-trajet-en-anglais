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
   NIVEAUX — chaque niveau a ses propres modules et ses propres
   leçons gratuites. MODULES et FREE_LESSONS_PER_MODULE pointent
   vers le niveau actif ; app.js les réassigne au changement de
   niveau (voir switchLevel()).
   ============================================================ */
const LEVELS = [
  { id:1, name:"Niveau 1", modules: LEVEL1_MODULES, freeLessonsPerModule: LEVEL1_FREE_LESSONS },
  { id:2, name:"Niveau 2", modules: LEVEL2_MODULES, freeLessonsPerModule: LEVEL2_FREE_LESSONS }
];

let MODULES = LEVELS[0].modules;
let FREE_LESSONS_PER_MODULE = LEVELS[0].freeLessonsPerModule;
