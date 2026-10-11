(() => {
  'use strict';
  const $ = (s, root=document) => root.querySelector(s);
  const $$ = (s, root=document) => Array.from(root.querySelectorAll(s));
  const STORAGE_KEY = 'deutschA1MasteryProgressV1';
  const TOPICS = [
    {id:'aussage',name:'Aussagesatz',subtitle:'Build clear German statements',icon:'↗',level:'FOUNDATION',desc:'Subject, finite verb, objects, time and the verb-second rule.'},
    {id:'wfrage',name:'W-Frage',subtitle:'Ask for specific information',icon:'?',level:'FOUNDATION',desc:'Choose the correct question word and place the finite verb.'},
    {id:'ja-frage',name:'Satzfrage / Ja-Nein-Frage',subtitle:'Questions answered yes or no',icon:'↗?',level:'FOUNDATION',desc:'Put the conjugated verb first; learn ja, nein and doch.'},
    {id:'imperativ',name:'Imperativ',subtitle:'Commands and polite requests',icon:'!',level:'A1 CORE',desc:'du, ihr and formal Sie forms, including irregular verbs.'},
    {id:'separable',name:'Trennbare Verben',subtitle:'Keep prefixes in the right place',icon:'⇄',level:'A1 CORE',desc:'Verb prefixes across statements, questions and modal sentences.'},
    {id:'modal',name:'Modalverben',subtitle:'Can, must, may, want and should',icon:'＋',level:'A1 CORE',desc:'Conjugate the modal and move the infinitive to the end.'},
    {id:'personal',name:'Personalpronomen',subtitle:'Personal pronouns by case',icon:'ich',level:'A1 CORE',desc:'Choose ich/mich/mir, du/dich/dir and all other forms.'},
    {id:'possessive',name:'Possessivbegleiter',subtitle:'Say my, your, his and her',icon:'♥',level:'A1 CORE',desc:'Possessive endings change with the noun, number and case.'},
    {id:'nominativ',name:'Nominativ',subtitle:'Identify the subject',icon:'1',level:'CASES',desc:'Find who or what performs the action.'},
    {id:'akkusativ',name:'Akkusativ',subtitle:'Direct objects and articles',icon:'2',level:'CASES',desc:'Learn den/einen and the object forms of pronouns.'},
    {id:'dativ',name:'Dativ',subtitle:'Indirect objects and dative verbs',icon:'3',level:'CASES',desc:'Practise dem/der/den and common dative verbs.'},
    {id:'ordinal',name:'Ordinalzahlen',subtitle:'Dates, birthdays and sequence',icon:'31',level:'A1 CORE',desc:'Build first through thirty-first and write calendar dates.'}
  ];
  const LESSONS = {
    'aussage': {title:'Aussagesatz',subtitle:'The statement sentence',definition:'An Aussagesatz is a sentence that gives information. In a normal German main clause, the conjugated (finite) verb is in position 2—not necessarily the second word.',why:'German uses the position of the finite verb to signal sentence structure. You can move a time phrase to the beginning, but the conjugated verb still stays in position 2.',formula:'SUBJECT / OTHER ELEMENT + FINITE VERB (POSITION 2) + REMAINDER',steps:['Find the verb that is conjugated for ich, du, er/sie/es, wir, ihr or Sie.','Put that finite verb in position 2. The first position may contain the subject or one other element such as heute.','Place direct objects and other information after the finite verb.','With a separable verb, send the prefix to the end. With a modal verb, put the second verb in the infinitive at the end.'],examples:[['Ich wohne in Berlin.','I live in Berlin.'],['Heute lerne ich Deutsch.','Today I am learning German.'],['Ich stehe um sieben Uhr auf.','I get up at seven o’clock.'],['Ich muss heute einkaufen.','I have to do the shopping today.'],['Meine Mutter kauft einen Apfel.','My mother buys an apple.'],['Am Montag fährt er mit dem Bus zur Uni.','On Monday he goes to university by bus.']],common:['❌ Heute ich lerne Deutsch. → ✅ Heute lerne ich Deutsch.','❌ Ich aufstehe um sieben Uhr. → ✅ Ich stehe um sieben Uhr auf.','❌ Ich muss einkaufe. → ✅ Ich muss einkaufen.'],exceptions:['Position 2 means the second sentence element, not always the second written word. “Am frühen Morgen” counts as one first element.','In a main clause with a modal verb, the modal is finite and the main verb is an infinitive at the end.'],table:{headers:['First position','Position 2','Remainder'],rows:[['Ich','lerne','heute Deutsch.'],['Heute','lerne','ich Deutsch.'],['Um sieben Uhr','stehe','ich auf.'],['Heute','muss','ich einkaufen.']]}} ,
    'wfrage': {title:'W-Frage',subtitle:'Ask for specific information',definition:'A W-Frage begins with a question word such as wo, wann, warum or wie. It asks for information rather than a simple yes/no answer.',why:'The question word tells the listener what information is missing. Pick the word based on the answer you want—not simply because the English translation feels familiar.',formula:'QUESTION WORD + FINITE VERB + SUBJECT + REMAINDER?',steps:['Decide what information is missing: person, place, time, reason, object or quantity.','Choose the matching question word.','Put the conjugated verb directly after the question word.','Keep a separable prefix at the end; with a modal verb, keep the infinitive at the end.'],examples:[['Wo wohnst du?','Where do you live?'],['Wann stehst du auf?','When do you get up?'],['Warum musst du lernen?','Why do you have to study?'],['Wen rufst du an?','Whom are you calling?'],['Wem gibst du das Buch?','To whom are you giving the book?'],['Um wie viel Uhr fängt der Kurs an?','At what time does the course begin?']],common:['❌ Wo du wohnst? → ✅ Wo wohnst du?','❌ Wann du stehst auf? → ✅ Wann stehst du auf?','❌ Warum du musst lernen? → ✅ Warum musst du lernen?'],exceptions:['Wer asks who in the nominative; wen is accusative; wem is dative.','Wie viel is used with uncountable amounts or prices; wie viele is used with countable plural nouns.','More than one W-question can be grammatically correct if the task does not specify which information to ask about.'],table:{headers:['Question word','Ask about','Example'],rows:[['wer / wen / wem','person / case','Wem hilfst du?'],['wo / wohin / woher','place / destination / origin','Wo wohnst du?'],['wann / wie spät','time / clock time','Wann beginnt der Kurs?'],['warum / wie','reason / manner','Warum lernst du Deutsch?'],['wie viel / wie viele','amount / count','Wie viele Bücher hast du?']]}},
    'ja-frage': {title:'Satzfrage / Ja-Nein-Frage',subtitle:'Questions that can be answered yes or no',definition:'A Satzfrage asks whether something is true. It normally begins with the conjugated verb and can be answered with ja or nein.',why:'Moving the finite verb to the first position signals that the speaker is asking a yes/no question.',formula:'FINITE VERB + SUBJECT + REMAINDER?',steps:['Find the conjugated verb.','Move it to the first position.','Keep the subject immediately after it.','Keep a separable prefix at the end; a modal infinitive stays at the end.'],examples:[['Wohnst du in Berlin?','Do you live in Berlin?'],['Kaufst du den Apfel?','Are you buying the apple?'],['Musst du heute arbeiten?','Do you have to work today?'],['Rufst du deine Mutter an?','Are you calling your mother?'],['Kannst du mir helfen?','Can you help me?'],['Hast du einen Bruder?','Do you have a brother?']],common:['Aussage: Du wohnst in Berlin.','Satzfrage: Wohnst du in Berlin?','W-Frage: Wo wohnst du?'],exceptions:['Ja confirms a positive question; nein rejects it.','Doch is useful to contradict a negative question: “Wohnst du nicht hier?” — “Doch!” (= Yes, I do live here.)','The word order differs from an English question. Do not add an English-style “do” auxiliary.'],table:{headers:['Type','Pattern','Example'],rows:[['Statement','Subject + verb + …','Du lernst Deutsch.'],['Yes/no question','Verb + subject + …?','Lernst du Deutsch?'],['W-question','Question word + verb + subject','Was lernst du?']] }},
    'imperativ': {title:'Imperativ',subtitle:'Commands, instructions and requests',definition:'The imperative is a verb form used to tell someone to do something, give instructions or make a request. German has informal singular (du), informal plural (ihr) and formal (Sie) forms.',why:'The form changes depending on whom you address. In a du-command the subject du is normally omitted; the formal Sie form keeps Sie.',formula:'du: VERB STEM (often) · ihr: VERB + -t · Sie: VERB + Sie',steps:['For du, use the appropriate imperative form; do not just remove -en mechanically.','For ihr, use the ihr verb form without the subject ihr.','For formal requests, use the infinitive + Sie.','For separable verbs, the prefix goes to the end. Add bitte for politeness when natural.'],examples:[['Lern Deutsch!','Learn German!'],['Mach bitte die Tür auf!','Please open the door!'],['Nimm den Apfel!','Take the apple!'],['Lies den Text!','Read the text!'],['Kommt bitte herein!','Please come in, everyone!'],['Öffnen Sie bitte das Fenster.','Please open the window.']],common:['❌ Nehm den Apfel! → ✅ Nimm den Apfel!','❌ Du mach die Tür auf! → ✅ Mach die Tür auf!','❌ Rufen Sie an die Mutter! → ✅ Rufen Sie die Mutter an!'],exceptions:['Common irregular du forms include nimm (nehmen), lies (lesen), gib (geben), iss (essen), sprich (sprechen), and fahr (fahren).','Some verbs keep an -e in the du imperative (for example, arbeite!) and spelling/pronunciation rules can affect the form.','A statement does not always naturally imply a command. Transform only when the prompt clearly asks for an instruction.'],table:{headers:['Addressed person','Typical form','Example'],rows:[['du (one person, informal)','verb stem / special form','Steh früh auf!'],['ihr (several people, informal)','ihr form without ihr','Steht früh auf!'],['Sie (formal)','infinitive + Sie','Stehen Sie früh auf!']] }},
    'separable': {title:'Trennbare Verben',subtitle:'One verb, two parts',definition:'A separable verb has a prefix that separates from its verb in many present-tense main clauses. The prefix carries meaning, while the verb part is conjugated.',why:'German keeps the finite verb in the main-clause position and places a separable prefix at the end. After a modal verb, the full infinitive stays together.',formula:'MAIN CLAUSE: conjugated verb … PREFIX  |  MODAL: modal … full infinitive',steps:['Learn the verb together with its prefix: aufstehen, anrufen, einkaufen.','Conjugate only the verb part in a simple main clause.','Place the prefix at the end in statements and questions; the prefix stays at the end in imperatives too.','After a modal verb or in a zu-free infinitive construction, keep the separable infinitive together at the end.'],examples:[['Ich stehe um sieben Uhr auf.','I get up at seven o’clock.'],['Stehst du um sieben Uhr auf?','Do you get up at seven o’clock?'],['Wann rufst du deine Mutter an?','When do you call your mother?'],['Kauf bitte Brot ein!','Please buy groceries!'],['Ich muss um sieben Uhr aufstehen.','I have to get up at seven o’clock.'],['Wir sehen am Abend fern.','We watch television in the evening.']],common:['❌ Ich aufstehe früh. → ✅ Ich stehe früh auf.','❌ Ich muss stehe früh auf. → ✅ Ich muss früh aufstehen.','❌ Ruf an deine Mutter! → ✅ Ruf deine Mutter an!'],exceptions:['Not every prefix is separable. This module focuses on common A1 separable verbs.','In the perfect tense and more advanced constructions, placement can differ; this lesson focuses on the A1 patterns listed here.'],table:{headers:['Sentence type','Pattern','Example'],rows:[['Statement','verb part … prefix','Ich rufe dich an.'],['W-question','W-word + verb + subject … prefix','Wann rufst du an?'],['Yes/no question','verb + subject … prefix?','Rufst du mich an?'],['With modal','modal … infinitive together','Ich muss dich anrufen.'],['Imperative','command … prefix','Ruf mich an!']] }},
    'modal': {title:'Modalverben',subtitle:'The modal is conjugated; the main verb stays infinitive',definition:'Modal verbs add meanings such as ability, obligation, permission, intention or preference. The modal verb is conjugated and the second verb generally stays in the infinitive at the end.',why:'German places the conjugated modal in position 2 in statements (or position 1 in yes/no questions); the action verb moves to the end.',formula:'SUBJECT + CONJUGATED MODAL + … + INFINITIVE',steps:['Choose the modal that expresses the meaning.','Conjugate the modal for the subject. Note that ich and er/sie/es forms often look identical.','Keep the main verb in its infinitive form at the end.','In a yes/no question, move the modal to the beginning; in a W-question, put it after the question word.'],examples:[['Ich kann Deutsch sprechen.','I can speak German.'],['Du musst heute lernen.','You have to study today.'],['Wir wollen Pizza essen.','We want to eat pizza.'],['Darf ich hier sitzen?','May I sit here?'],['Soll ich dich abholen?','Should I pick you up?'],['Ich möchte einen Kaffee trinken.','I would like to drink a coffee.'],['Kannst du bitte die Tür aufmachen?','Can you please open the door?']],common:['❌ Ich kann spreche Deutsch. → ✅ Ich kann Deutsch sprechen.','❌ Heute ich muss lernen. → ✅ Heute muss ich lernen.','❌ Musst du aufstehst? → ✅ Musst du aufstehen?'],exceptions:['möchten is a polite “would like” form often taught alongside modal verbs.','mögen can take a noun directly: Ich mag Pizza. If you add an action, a structure such as Ich mag tanzen is possible, but use the course pattern being tested.','Modal verbs have irregular present-tense forms; memorize the conjugation table.'],table:{headers:['Verb','ich','du','er/sie/es','wir','ihr','sie / Sie'],rows:[['können','kann','kannst','kann','können','könnt','können'],['müssen','muss','musst','muss','müssen','müsst','müssen'],['wollen','will','willst','will','wollen','wollt','wollen'],['dürfen','darf','darfst','darf','dürfen','dürft','dürfen'],['sollen','soll','sollst','soll','sollen','sollt','sollen'],['mögen','mag','magst','mag','mögen','mögt','mögen'],['möchten','möchte','möchtest','möchte','möchten','möchtet','möchten']] }},
    'personal': {title:'Personalpronomen',subtitle:'Use the right pronoun for the grammatical case',definition:'Personal pronouns replace people or things: ich, du, er, sie, es, wir, ihr, sie and Sie. Their form changes depending on whether they are the subject, a direct object or an indirect object.',why:'A German verb or sentence structure determines the case. Use nominative for the subject, accusative for the direct object and dative after verbs such as helfen.',formula:'NOMINATIV = WHO ACTS · AKKUSATIV = WHO/WHAT IS DIRECTLY AFFECTED · DATIV = TO WHOM',steps:['Ask who performs the action: choose a nominative pronoun.','For a direct object, identify the case required by the verb, then choose the accusative pronoun.','For helfen, danken, gefallen and similar dative patterns, use the dative form.','When replacing a noun phrase, preserve its case and number/gender features.'],examples:[['Ich sehe dich.','I see you.'],['Er kennt mich.','He knows me.'],['Ich helfe dir.','I help you.'],['Sie gibt mir das Buch.','She gives me the book.'],['Kannst du mir helfen?','Can you help me?'],['Ich rufe ihn an.','I call him.'],['Wir besuchen sie.','We visit her/them, depending on context.']],common:['❌ Ich helfe du. → ✅ Ich helfe dir.','❌ Ich sehe er. → ✅ Ich sehe ihn.','❌ Sie gibt ich das Buch. → ✅ Sie gibt mir das Buch.'],exceptions:['sie may mean she or they; Sie with a capital S is the formal you. Context tells the meaning.','Dative plural is ihnen; formal dative is Ihnen.','Some verbs require a fixed case. Do not choose a pronoun only by its English translation.'],table:{headers:['Nominativ','Akkusativ','Dativ'],rows:[['ich','mich','mir'],['du','dich','dir'],['er','ihn','ihm'],['sie','sie','ihr'],['es','es','ihm'],['wir','uns','uns'],['ihr','euch','euch'],['sie','sie','ihnen'],['Sie','Sie','Ihnen']] }},
    'possessive': {title:'Possessivbegleiter',subtitle:'Possessive determiners: mein, dein, sein…',definition:'Possessive determiners show ownership and stand before a noun. Their endings agree with the noun they accompany—not simply with the owner.',why:'The owner chooses the base (mein, dein, sein, ihr, unser, euer, Ihr); the noun’s gender, number and case determine the ending.',formula:'POSSESSIVE BASE + ENDING THAT MATCHES THE NOUN + NOUN',steps:['Identify the owner: ich → mein, du → dein, er/es → sein, sie → ihr, wir → unser, ihr → euer, formal Sie → Ihr.','Identify the noun’s gender and number.','Identify the grammatical case.','Add the correct ending: feminine and plural nominative often take -e; masculine accusative takes -en.'],examples:[['Das ist mein Bruder.','This is my brother.'],['Das ist meine Schwester.','This is my sister.'],['Ich besuche meine Mutter.','I am visiting my mother.'],['Er ruft seine Freundin an.','He calls his girlfriend.'],['Wir besuchen unsere Großeltern.','We are visiting our grandparents.'],['Ist das dein Buch?','Is that your book?']],common:['❌ Das ist mein Schwester. → ✅ Das ist meine Schwester.','❌ Ich sehe mein Bruder. → ✅ Ich sehe meinen Bruder.','❌ Das ist ihre Vater. → ✅ Das ist ihr Vater.'],exceptions:['euer often loses the second e before an ending: euer Bruder, eure Mutter, euren Vater.','sein belongs to he/it as the owner; ihr can belong to she or they. Capital Ihr is formal “your”.','Before a noun, mein/dein etc. are possessive determiners. Independent possessive pronouns (mine, yours) are a separate use and are not the main focus here.'],table:{headers:['Case / noun','Masculine: Bruder','Feminine: Schwester','Neuter: Buch','Plural: Eltern'],rows:[['Nominativ','mein Bruder','meine Schwester','mein Buch','meine Eltern'],['Akkusativ','meinen Bruder','meine Schwester','mein Buch','meine Eltern'],['Dativ','meinem Bruder','meiner Schwester','meinem Buch','meinen Eltern']] }},
    'nominativ': {title:'Nominativ',subtitle:'Find the subject of the sentence',definition:'Nominativ is the case used for the subject: the person or thing that the sentence is about and that performs the action in a typical active sentence.',why:'German marks grammatical roles with article and pronoun forms. Find the subject before deciding what case the objects need.',formula:'WHO / WHAT + FINITE VERB? → LIKELY THE NOMINATIVE SUBJECT',steps:['Find the conjugated verb.','Ask who or what does the action (Wer? / Was?).','That noun or pronoun is usually the nominative subject.','Use nominative articles: der/ein, die/eine, das/ein; plural die.'],examples:[['Der Mann kauft einen Apfel.','The man buys an apple. — Der Mann = nominative.'],['Meine Mutter kocht das Essen.','My mother cooks the food. — Meine Mutter = nominative.'],['Wir lernen Deutsch.','We are learning German. — Wir = nominative.'],['Das Kind gibt dem Mann ein Buch.','The child gives the man a book. — Das Kind = nominative.']],common:['Do not confuse the first noun with the subject in every possible sentence; use the role and the verb.','After sein, a noun complement can also be nominative: Er ist ein Lehrer.'],exceptions:['A simple A1 shortcut: find who does the action, but confirm that the sentence is an ordinary active clause.','In a question, the subject may follow the verb: Kaufst du den Apfel? — du is still nominative.'],table:{headers:['Gender / number','Definite','Indefinite','Example'],rows:[['Masculine','der','ein','Der Mann arbeitet.'],['Feminine','die','eine','Die Frau arbeitet.'],['Neuter','das','ein','Das Kind spielt.'],['Plural','die','— / einige','Die Kinder spielen.']] }},
    'akkusativ': {title:'Akkusativ',subtitle:'The direct object case',definition:'Akkusativ commonly marks the direct object: the person or thing directly seen, bought, visited, needed or otherwise affected. Some verbs require it.',why:'The article changes make the role clearer. The most visible beginner-level change is masculine: der/ein → den/einen.',formula:'SUBJECT + VERB + WHO/WHAT? (WEN? / WAS?) → OFTEN AKKUSATIV',steps:['Find the verb and identify whether it takes an accusative object.','Ask wen? or was? after the verb.','Use the accusative article: masculine den/einen; feminine die/eine; neuter das/ein; plural die.','Use accusative pronouns such as mich, dich, ihn, sie, es, uns and euch.'],examples:[['Ich kaufe einen Apfel.','I buy an apple. — einen Apfel = accusative.'],['Ich sehe den Mann.','I see the man. — den Mann = accusative.'],['Wir besuchen unsere Großeltern.','We visit our grandparents.'],['Ich rufe ihn an.','I call him. — ihn = accusative.'],['Hast du eine Schwester?','Do you have a sister?']],common:['❌ Ich sehe der Mann. → ✅ Ich sehe den Mann.','❌ Ich habe ein Bruder. → ✅ Ich habe einen Bruder.','❌ Ich besuche er. → ✅ Ich besuche ihn.'],exceptions:['Akkusativ is not simply “anything that moves” or “the thing after every preposition.” Verbs and prepositions govern cases.','Feminine, neuter and plural definite articles look the same in nominative and accusative; use the sentence role to identify the case.'],table:{headers:['Gender / number','Nominativ','Akkusativ','Example'],rows:[['Masculine','der / ein','den / einen','Ich sehe den Mann.'],['Feminine','die / eine','die / eine','Ich sehe die Frau.'],['Neuter','das / ein','das / ein','Ich sehe das Kind.'],['Plural','die','die','Ich sehe die Kinder.']] }},
    'dativ': {title:'Dativ',subtitle:'Indirect objects and dative-governing verbs',definition:'Dativ is used for the indirect object in sentences such as giving someone something. It is also required by certain verbs, including helfen, danken and gefallen.',why:'Some German verbs require dative even when English uses a direct-object structure. Learn common verb patterns together with their case.',formula:'GEBEN / SCHENKEN: SUBJECT + VERB + DATIV (TO WHOM?) + AKKUSATIV (WHAT?)',steps:['Learn common dative verbs: helfen, danken, gefallen.','For give/gift sentences, ask wem? (to whom?) for the recipient.','Choose dative articles: dem/einem masculine or neuter; der/einer feminine; den + often -n for plural.','Choose dative pronouns: mir, dir, ihm, ihr, ihm, uns, euch, ihnen/Ihnen.'],examples:[['Ich helfe der Mutter.','I help the mother. — helfen takes dative.'],['Sie gibt mir das Buch.','She gives me the book. — mir = dative; das Buch = accusative.'],['Wir danken dem Lehrer.','We thank the teacher.'],['Der Film gefällt meinem Bruder.','My brother likes the film (literally: the film is pleasing to my brother).'],['Ich schenke den Kindern Bücher.','I give the children books as gifts.']],common:['❌ Ich helfe die Mutter. → ✅ Ich helfe der Mutter.','❌ Sie gibt ich das Buch. → ✅ Sie gibt mir das Buch.','❌ Ich danke den Lehrer. → ✅ Ich danke dem Lehrer.'],exceptions:['Dative plural normally uses den and often adds -n to the noun: mit den Kindern. If the plural already ends in -n or -s, do not add another -n.','Not every English “to” phrase requires dative and not every movement verb requires accusative. Learn the German construction.'],table:{headers:['Gender / number','Nominativ','Akkusativ','Dativ'],rows:[['Masculine','der / ein','den / einen','dem / einem'],['Feminine','die / eine','die / eine','der / einer'],['Neuter','das / ein','das / ein','dem / einem'],['Plural','die','die','den (+ noun often -n)']] }},
    'ordinal': {title:'Ordinalzahlen',subtitle:'Dates, birthdays and order',definition:'Ordinal numbers describe position or sequence: first, second, third, and so on. They are often written with an ordinal suffix in German.',why:'German ordinal numbers behave like adjectives and take endings based on the grammar around them. Dates most commonly use am + ordinal ending in -en.',formula:'DATE: AM + ORDINAL(-EN) + MONTH  |  TODAY: HEUTE IST DER + ORDINAL',steps:['Memorize the irregular early forms: erste, zweite, dritte.','For many numbers from 4 onwards, add -te (vierte, fünfte … zwanzigste).','For 21st and later, build the number and use -ste: einundzwanzigste.','For a date with am, use the dative form ending -en: am fünften Mai, am achtzehnten Oktober.'],examples:[['der erste Tag','the first day'],['der zweite Stock','the second floor'],['Heute ist der dritte Oktober.','Today is the third of October.'],['Mein Geburtstag ist am achtzehnten Oktober.','My birthday is on the eighteenth of October.'],['Der Kurs beginnt am fünften Mai.','The course starts on the fifth of May.']],common:['❌ am fünf Mai → ✅ am fünften Mai','❌ am achtzehnte Oktober → ✅ am achtzehnten Oktober','❌ der drei Tag → ✅ der dritte Tag'],exceptions:['1st–19th commonly use -te, with irregular forms 1st–3rd; 20th is zwanzigste. From 21st onward use -ste (einundzwanzigste).','For appointments and dates, the -en ending after am is especially important.','“Heute ist der dritte Oktober” and “am dritten Oktober” use different forms because the grammar differs.'],table:{headers:['Number','Ordinal form','Number','Ordinal form'],rows:[['1','erste','16','sechzehnte'],['2','zweite','17','siebzehnte'],['3','dritte','18','achtzehnte'],['4','vierte','19','neunzehnte'],['5','fünfte','20','zwanzigste'],['6','sechste','21','einundzwanzigste'],['7','siebte','22','zweiundzwanzigste'],['8','achte','23','dreiundzwanzigste'],['9','neunte','24','vierundzwanzigste'],['10','zehnte','25','fünfundzwanzigste'],['11','elfte','26','sechsundzwanzigste'],['12','zwölfte','27','siebenundzwanzigste'],['13','dreizehnte','28','achtundzwanzigste'],['14','vierzehnte','29','neunundzwanzigste'],['15','fünfzehnte','30','dreißigste'],['31','einunddreißigste','','']]}}
  };

  let state = loadState();
  let currentPage = 'home';
  let selectedLesson = 'aussage';
  let vocabPage = 1;
  let vocabSearch = '';
  let vocabCategory = 'all';
  let vocabKind = 'all';
  let vocabSort = 'course';
  let vocabReveal = true;
  let activeQuiz = null;
  let quizTimer = null;
  let transformIndex = 0;
  let transformFeedback = null;
  let flashIndex = 0;
  let flashOrder = [];
  let flashBack = false;
  let toastTimer = null;
  const PAGE_NAMES = {home:'Dashboard',lessons:'Grammar lessons',vocabulary:'Vocabulary lab',transform:'Sentence lab',practice:'Practice centre',flashcards:'Flashcards',quick:'Quick revision',mistakes:'Mistake notebook',mock:'Mock examination'};
  const TODAY = dateKey(new Date());

  function loadState(){
    const base={theme:'dark',completedTopics:[],learnedWords:[],starredWords:[],reviewWords:[],mistakes:[],scores:[],recentActivity:[],lastStudyDate:'',streak:0,dailyTarget:10,todayAnswered:0,todayDate:'',lastTopic:'aussage',transformCorrect:0,transformTried:0};
    try { const saved=JSON.parse(localStorage.getItem(STORAGE_KEY)||'{}'); return {...base,...saved}; } catch(e){ return base; }
  }
  function saveState(){ try { localStorage.setItem(STORAGE_KEY,JSON.stringify(state)); } catch(e){} updateNavCounts(); }
  function dateKey(d){return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;}
  function touchStudy(label){
    const today=dateKey(new Date());
    if(state.lastStudyDate!==today){
      const yesterday=new Date();yesterday.setDate(yesterday.getDate()-1);
      state.streak=state.lastStudyDate===dateKey(yesterday)?(state.streak||0)+1:1;
      state.lastStudyDate=today;
    }
    if(state.todayDate!==today){state.todayDate=today;state.todayAnswered=0;}
    if(label){state.recentActivity.unshift({label,date:today,time:new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})});state.recentActivity=state.recentActivity.slice(0,8);}
    saveState();
  }
  function todayCompleted(){ if(state.todayDate!==TODAY){state.todayDate=TODAY;state.todayAnswered=0;saveState();} return state.todayAnswered||0; }
  function escapeHtml(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
  function shuffle(arr){const a=arr.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
  function uniq(arr){return [...new Set(arr)];}
  function norm(s){return String(s||'').toLocaleLowerCase('de-DE').replace(/[.!?¡¿,;:]+$/g,'').replace(/\s+/g,' ').trim();}
  function toast(msg){const el=$('#toast');el.textContent=msg;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),2500);}
  function setTheme(theme){state.theme=theme;document.body.dataset.theme=theme;$('#theme-label').textContent=theme==='dark'?'Switch to light mode':'Switch to dark mode';$('#theme-icon').textContent=theme==='dark'?'☼':'☾';saveState();}
  function updateNavCounts(){const a=$('#nav-mistakes');if(a)a.textContent=state.mistakes.length;const n=$('#sidebar-streak-count');if(n)n.textContent=`${state.streak||0} day streak`;const lc=$('#nav-lesson-count');if(lc)lc.textContent=`${state.completedTopics.length}/12`;}
  function activateNav(page){currentPage=page;$$('.nav-item').forEach(b=>b.classList.toggle('active',b.dataset.page===page));$('#page-crumb').textContent=PAGE_NAMES[page]||'Dashboard';$('#sidebar').classList.remove('open');renderPage();window.scrollTo({top:0,behavior:'smooth'});}
  function renderPage(){
    const root=$('#app-content');
    if(activeQuiz){renderQuiz(root);return;}
    if(currentPage==='home')root.innerHTML=renderDashboard();
    else if(currentPage==='lessons')root.innerHTML=renderLessonPage();
    else if(currentPage==='vocabulary')root.innerHTML=renderVocabulary();
    else if(currentPage==='transform')root.innerHTML=renderTransform();
    else if(currentPage==='practice')root.innerHTML=renderPracticeSetup();
    else if(currentPage==='flashcards')root.innerHTML=renderFlashcards();
    else if(currentPage==='quick')root.innerHTML=renderQuickRevision();
    else if(currentPage==='mistakes')root.innerHTML=renderMistakes();
    else if(currentPage==='mock')root.innerHTML=renderMock();
    updateNavCounts();
  }
  function progressPercent(){return Math.round(((state.completedTopics.length/TOPICS.length)*.5+(state.learnedWords.length/295)*.5)*100);}
  function topicProgress(id){return state.completedTopics.includes(id)?100:0;}
  function statCard(label,value,icon,sub,progress){return `<div class="stat-card"><div class="stat-top"><span>${label}</span><span class="stat-icon">${icon}</span></div><div class="stat-value">${value}</div><div class="stat-sub">${sub}</div>${progress!==undefined?`<div class="progress-bar"><span style="width:${progress}%"></span></div>`:''}</div>`;}
  function renderDashboard(){
    const learned=state.learnedWords.length, done=state.completedTopics.length, scoreCount=state.scores.length, today=todayCompleted(), dailyPct=Math.min(100,Math.round(today/(state.dailyTarget||10)*100));
    const recent=state.recentActivity.length?`<div class="activity-list">${state.recentActivity.slice(0,5).map((a,i)=>`<div class="activity-item"><div class="activity-icon">${['✓','◉','Aa','⇄','✦'][i%5]}</div><div><strong>${escapeHtml(a.label)}</strong><small>${escapeHtml(a.date)} ${a.time?`· ${escapeHtml(a.time)}`:''}</small></div></div>`).join('')}</div>`:`<div class="empty-activity">Your recent learning activity will appear here.<br><br>Complete a lesson or quiz to start your learning history.</div>`;
    const path=[['01','Learn grammar',done?`${done}/12 topics complete`:'Build your foundations',done>=12],['02','Study vocabulary',`${learned}/295 words learned`,learned>=295],['03','Transform sentences','Practise word order',state.transformTried>0],['04','Topic tests',`${scoreCount} quiz results saved`,scoreCount>0],['05','Mock examination','Check your exam readiness',state.scores.some(s=>s.mock)]];
    return `<div class="page-heading"><div><div class="eyebrow">YOUR LEARNING SPACE · A1 EXAM PREP</div><h1>Guten Tag, learner<span class="text-accent">.</span></h1><p>Learn the rule, practise it in context, then test whether you can use it without memorising an answer.</p></div><div class="title-actions"><button class="btn ghost" data-action="go-quick">☷ Quick revision</button><button class="btn" data-action="start-random-practice">↻ Random practice</button><button class="btn primary" data-action="start-daily">✦ Daily challenge</button></div></div>
      <div class="grid stats">${statCard('Overall progress',`${progressPercent()}%`,'◔',`${done} grammar topics · ${learned} words`,progressPercent())}${statCard('Vocabulary learned',`${learned}<span style="font-size:13px;color:var(--muted)"> / 295</span>`,'Aa',`${Math.round(learned/295*100)}% of course list`,Math.round(learned/295*100))}${statCard('Quiz attempts',scoreCount,'✓',scoreCount?`Latest: ${state.scores[0].score}/${state.scores[0].total}`:'Your first score is waiting',scoreCount?Math.round(state.scores[0].score/state.scores[0].total*100):0)}${statCard('Daily revision',`${Math.min(today,state.dailyTarget)}<span style="font-size:13px;color:var(--muted)"> / ${state.dailyTarget}</span>`,'✦',today>=state.dailyTarget?'<span class="positive">Daily target complete</span>':'Questions answered today',dailyPct)}</div>
      <div class="dashboard-grid"><div><section class="panel hero-panel"><div class="eyebrow"><span class="live-dot"></span> YOUR NEXT STEP</div><h2>Small rules. Clear sentences. Confident German.</h2><p>Work through the essentials—from verb position to cases—then bring them together in exam-style challenges. Your progress stays in this browser.</p><div class="hero-actions"><button class="btn primary" data-action="continue-learning">${done===12?'Review a lesson':'Continue learning'} <span>→</span></button><button class="btn" data-page="mock">Take mock test ↗</button></div></section>
      <div class="section-row"><div><h2>Your learning path</h2><p>Five stages from understanding to exam practice.</p></div><span class="tag gold">${progressPercent()}% complete</span></div><div class="learning-path">${path.map(p=>`<div class="path-step ${p[3]?'done':''}"><div class="step-number">${p[0]} ${p[3]?'✓':''}</div><strong>${p[1]}</strong><span>${p[2]}</span></div>`).join('')}</div>
      </div><section class="panel"><div class="panel-head"><div><h2>Recent activity</h2><p>Real activity from this browser</p></div><span class="tag">LOCAL</span></div>${recent}<div class="divider"></div><label class="field-label" for="daily-target">Daily question target</label><select class="select" id="daily-target" style="width:100%"><option value="5" ${state.dailyTarget===5?'selected':''}>5 questions · quick review</option><option value="10" ${state.dailyTarget===10?'selected':''}>10 questions · steady practice</option><option value="15" ${state.dailyTarget===15?'selected':''}>15 questions · focused session</option><option value="20" ${state.dailyTarget===20?'selected':''}>20 questions · exam push</option></select><div class="progress-bar"><span style="width:${dailyPct}%"></span></div><p class="muted" style="font-size:9px">${Math.min(today,state.dailyTarget)} of ${state.dailyTarget} questions answered today. Streak: ${state.streak||0} day(s).</p></section></div>
      <div class="section-row"><div><h2>Grammar learning centre</h2><p>Open a module, study the examples, then mark it complete or launch a topic quiz.</p></div><button class="link-btn" data-page="lessons">View all lessons →</button></div><div class="topic-grid">${TOPICS.slice(0,6).map((t)=>topicCard(t)).join('')}</div><div class="section-row"><div><h2>Jump back in</h2><p>Choose the tool that fits the kind of revision you need right now.</p></div></div><div class="topic-grid">${[{id:'vocabulary',name:'Vocabulary lab',icon:'Aa',desc:'Search all 295 words, articles, plurals and examples.'},{id:'transform',name:'Sentence lab',icon:'⇄',desc:'Transform statements, questions, commands and more.'},{id:'practice',name:'Practice centre',icon:'◉',desc:`Choose from ${allQuestions().length}+ available grammar and vocabulary items.`}].map(t=>`<button class="topic-card" data-page="${t.id}"><div class="topic-icon">${t.icon}</div><h3>${t.name}</h3><p>${t.desc}</p><div class="topic-foot"><span>OPEN TOOL</span><span>→</span></div></button>`).join('')}</div>`;
  }
  function topicCard(t){const done=state.completedTopics.includes(t.id);return `<button class="topic-card" data-action="open-lesson" data-topic="${t.id}"><div class="topic-icon">${t.icon}</div><div class="topic-foot" style="margin:0 0 8px"><span>${t.level}</span>${done?'<span class="tag green">✓ DONE</span>':'<span class="tag">LESSON</span>'}</div><h3>${t.name}</h3><p>${t.desc}</p><div class="progress-bar"><span style="width:${done?100:0}%"></span></div><div class="topic-foot"><span>${done?'COMPLETED':'STUDY & PRACTISE'}</span><span>→</span></div></button>`;}
  function renderCaseDiagram(topic){
    if(!['nominativ','akkusativ','dativ'].includes(topic))return '';
    const intro=topic==='nominativ'?'Nominativ identifies who performs the action.':topic==='akkusativ'?'Akkusativ identifies the direct object in this example.':'Dativ marks the recipient after geben: to whom is the apple given?';
    return `<div class="case-diagram"><div class="case-diagram-head"><strong>Colour-coded sentence map</strong><span>${intro}</span></div><div class="case-sentence"><div class="case-part"><span class="component subject">Der Mann</span><small>Nominativ · who gives?</small></div><div class="case-part"><span class="component verb">gibt</span><small>Conjugated verb</small></div><div class="case-part"><span class="component dative">dem Kind</span><small>Dativ · to whom?</small></div><div class="case-part"><span class="component object">einen Apfel</span><small>Akkusativ · what?</small></div></div><div class="case-legend"><span><b style="color:var(--green)">Green</b> · subject / Nominativ</span><span><b style="color:var(--accent)">Gold</b> · verb</span><span><b style="color:var(--purple)">Purple</b> · Dativ</span><span><b style="color:var(--blue)">Blue</b> · Akkusativ</span></div><p class="muted" style="font-size:10px;margin:12px 0 0">Der Mann gibt dem Kind einen Apfel. — The man gives the child an apple.</p></div>`;
  }
  function renderLessonPage(){
    const active=LESSONS[selectedLesson]||LESSONS.aussage;const top=TOPICS.find(t=>t.id===selectedLesson)||TOPICS[0];
    const examples=active.examples.map((e,i)=>`<div class="example-row"><div><div class="example-de">${highlightSentence(e[0],selectedLesson)}</div><div class="example-en">${escapeHtml(e[1])}</div></div><div><span class="tag">EXAMPLE ${String(i+1).padStart(2,'0')}</span></div></div>`).join('');
    const table=active.table?`<h4>Reference table</h4><table class="data-table"><thead><tr>${active.table.headers.map(h=>`<th>${escapeHtml(h)}</th>`).join('')}</tr></thead><tbody>${active.table.rows.map(row=>`<tr>${row.map((x,i)=>`<td>${i===0?`<strong>${escapeHtml(x)}</strong>`:escapeHtml(x)}</td>`).join('')}</tr>`).join('')}</tbody></table>`:'';
    return `<div class="page-heading"><div><div class="eyebrow">GRAMMAR LEARNING CENTRE · ${TOPICS.findIndex(t=>t.id===selectedLesson)+1} OF ${TOPICS.length}</div><h1>Grammar lessons<span class="text-accent">.</span></h1><p>Clear rules, examples, common traps and a quick way to practise each topic.</p></div><div class="title-actions"><button class="btn" data-page="practice">◉ Practice centre</button></div></div><div class="lesson-layout"><aside class="panel lesson-index"><h3>ALL GRAMMAR TOPICS</h3>${TOPICS.map((t,i)=>`<button class="lesson-index-item ${t.id===selectedLesson?'active':''}" data-action="open-lesson" data-topic="${t.id}"><span>${String(i+1).padStart(2,'0')}</span><span>${t.name}</span>${state.completedTopics.includes(t.id)?'<span class="check">✓</span>':''}</button>`).join('')}</aside><div class="lesson-main"><div class="lesson-hero"><div class="lesson-chips"><span class="tag gold">${top.level}</span><span class="tag">A1 GRAMMAR</span>${state.completedTopics.includes(selectedLesson)?'<span class="tag green">✓ COMPLETED</span>':''}</div><h2>${active.title}</h2><p>${active.subtitle}. ${active.definition}</p></div><section class="panel lesson-section"><h3>01 · The rule, in plain English</h3><p>${active.definition}</p><p>${active.why}</p><div class="formula">${active.formula}</div><h4>A reliable way to solve questions</h4><ol class="bullet-list">${active.steps.map(s=>`<li>${escapeHtml(s)}</li>`).join('')}</ol></section><section class="panel lesson-section"><h3>02 · Learn through examples</h3><p>Read the German sentence first. Pay attention to the verb position and the highlighted grammatical role, then check the translation.</p><div class="example-list">${examples}</div>${renderCaseDiagram(selectedLesson)}${table}</section><div class="info-grid"><section class="panel lesson-section"><h3>03 · Common mistakes</h3><ul class="bullet-list">${active.common.map(x=>`<li>${escapeHtml(x)}</li>`).join('')}</ul></section><section class="panel lesson-section"><h3>04 · Important details</h3><ul class="bullet-list">${active.exceptions.map(x=>`<li>${escapeHtml(x)}</li>`).join('')}</ul></section></div><section class="panel lesson-section"><h3>05 · Check your understanding</h3><p>Try a short topic quiz. The quiz marks selected answers and explains the grammar behind them.</p><div class="lesson-bottom"><button class="btn" data-action="start-topic-quiz" data-topic="${selectedLesson}">◉ Start ${active.title} quiz</button><button class="btn primary" data-action="complete-topic" data-topic="${selectedLesson}">${state.completedTopics.includes(selectedLesson)?'✓ Marked complete':'Mark lesson complete ✓'}</button></div></section><div class="lesson-bottom"><button class="btn ghost" data-action="prev-topic" data-topic="${selectedLesson}">← Previous topic</button><button class="btn" data-action="next-topic" data-topic="${selectedLesson}">Next topic →</button></div></div></div>`;
  }
  function highlightSentence(sent,topic){
    // Emphasise the finite verb or selected case where a useful, conservative match exists.
    let s=escapeHtml(sent);
    if(topic==='aussage'||topic==='ja-frage'||topic==='wfrage'||topic==='separable'){
      const words=['wohne','lerne','stehe','muss','kauft','wohnst','Stehst','Warum','rufe','rufst','kannst','Kaufst','Musst','fängt','fährt','lerne','steht','ruft','sehe','helfe','gibt','besuche','hast','Lern'];
      for(const w of words){const re=new RegExp(`(?<![A-Za-zÄÖÜäöüß])(${w})(?![A-Za-zÄÖÜäöüß])`);if(re.test(sent)){s=s.replace(re,'<span class="component verb">$1</span>');break;}}
    }
    return s;
  }
  function renderVocabulary(){
    const cats=uniq(VOCABULARY.map(v=>v.category));
    let items=VOCABULARY.filter(v=>{
      const query=vocabSearch.toLocaleLowerCase('de-DE');const match=!query||[v.term,v.meaning,v.category,v.example,v.translation].join(' ').toLocaleLowerCase('de-DE').includes(query);
      const cat=vocabCategory==='all'||v.category===vocabCategory;
      const kind=vocabKind==='all'||(vocabKind==='time'?(/times of day|clock time/i.test(v.category)||[172,173,176,177,181,185,186,198,203].includes(v.id)):vocabKind==='Noun'?v.kind==='Noun':vocabKind==='Verb'?v.kind==='Verb':vocabKind==='Expression'?v.kind==='Expression':v.kind==='Adjective / adverb'?v.kind==='Adjective / adverb':false);
      return match&&cat&&kind;
    });
    if(vocabSort==='alpha')items.sort((a,b)=>a.word.localeCompare(b.word,'de'));
    if(vocabSort==='learned')items.sort((a,b)=>state.learnedWords.includes(b.id)-state.learnedWords.includes(a.id)||a.id-b.id);
    if(vocabSort==='starred')items=items.filter(v=>state.starredWords.includes(v.id));
    const pages=Math.max(1,Math.ceil(items.length/24));vocabPage=Math.min(vocabPage,pages);const visible=items.slice((vocabPage-1)*24,vocabPage*24);
    const cards=visible.map(v=>{const learned=state.learnedWords.includes(v.id),star=state.starredWords.includes(v.id);return `<article class="vocab-card"><div class="vocab-kicker"><span>#${String(v.id).padStart(3,'0')} · ${escapeHtml(v.category)}</span><span class="tag">${escapeHtml(v.kind.toUpperCase())}</span></div><button class="star-action ${star?'active':''}" title="${star?'Remove from revision list':'Add to revision list'}" data-action="star-word" data-id="${v.id}">${star?'★':'☆'}</button><h3>${escapeHtml(v.term)}</h3><div class="meaning">${vocabReveal?escapeHtml(v.meaning):'<span class="muted">Translation hidden</span>'}</div>${v.plural?`<div class="plural"><b>Plural:</b> ${escapeHtml(v.plural)}</div>`:v.article?`<div class="plural"><b>Article:</b> ${escapeHtml(v.article)}${v.pluralOnly?' · plural form':''}</div>`:''}<div class="example"><strong>${escapeHtml(v.example)}</strong><span>${vocabReveal?escapeHtml(v.translation):'Reveal translation to check your understanding.'}</span></div><div class="vocab-actions"><button class="mini-action ${learned?'active':''}" data-action="learn-word" data-id="${v.id}">${learned?'✓ Learned':'+ Mark learned'}</button><button class="mini-action" data-action="review-word" data-id="${v.id}">${state.reviewWords.includes(v.id)?'In review list':'↺ Revise'}</button></div></article>`;}).join('');
    return `<div class="page-heading"><div><div class="eyebrow">COURSE VOCABULARY · 295 ENTRIES</div><h1>Vocabulary lab<span class="text-accent">.</span></h1><p>Search the complete course list. Study the article, plural, English meaning and an A1 example sentence for each item.</p></div><div class="title-actions"><button class="btn" data-action="start-vocab-quiz" data-mode="meaning">Aa Vocabulary quiz</button><button class="btn primary" data-action="go-flashcards">▣ Flashcards</button></div></div><section class="panel"><div class="search-row"><input class="input search-input" id="vocab-search" type="search" value="${escapeHtml(vocabSearch)}" placeholder="Search German, English, phrase or example…" aria-label="Search vocabulary"/><select class="select" id="vocab-category"><option value="all">All categories</option>${cats.map(c=>`<option value="${escapeHtml(c)}" ${vocabCategory===c?'selected':''}>${escapeHtml(c)}</option>`).join('')}</select><select class="select" id="vocab-kind"><option value="all" ${vocabKind==='all'?'selected':''}>All word types</option><option value="Noun" ${vocabKind==='Noun'?'selected':''}>Nouns</option><option value="Verb" ${vocabKind==='Verb'?'selected':''}>Verbs</option><option value="Adjective / adverb" ${vocabKind==='Adjective / adverb'?'selected':''}>Adjectives / adverbs</option><option value="Expression" ${vocabKind==='Expression'?'selected':''}>Expressions</option><option value="time" ${vocabKind==='time'?'selected':''}>Time words</option></select><select class="select" id="vocab-sort"><option value="course" ${vocabSort==='course'?'selected':''}>Course order</option><option value="alpha" ${vocabSort==='alpha'?'selected':''}>A–Z</option><option value="learned" ${vocabSort==='learned'?'selected':''}>Learned first</option><option value="starred" ${vocabSort==='starred'?'selected':''}>Revision list</option></select></div><div class="vocab-summary"><span class="tag gold">${items.length} matches</span><span class="tag green">${learnedCount(items)} learned</span><span class="tag">${state.starredWords.length} saved for revision</span><button class="link-btn" data-action="toggle-vocab-translation">${vocabReveal?'Hide translations':'Reveal translations'}</button><span style="flex:1"></span><span class="muted" style="font-size:9px">Examples are for study; read each sentence in context.</span></div></section><div class="vocab-grid" style="margin-top:14px">${cards||`<div class="empty-state" style="grid-column:1/-1"><h3>No vocabulary found</h3><p>Try another search term or clear the filters.</p><button class="btn" data-action="clear-vocab-filter">Clear filters</button></div>`}</div><div class="vocab-pager"><button class="btn small" data-action="vocab-prev" ${vocabPage===1?'disabled':''}>← Previous</button><span>Page ${vocabPage} of ${pages} · showing ${items.length?((vocabPage-1)*24+1):0}–${Math.min(vocabPage*24,items.length)} of ${items.length}</span><button class="btn small" data-action="vocab-next" ${vocabPage===pages?'disabled':''}>Next →</button></div><p class="muted" style="font-size:9px;margin-top:17px">Progress is saved in this browser on this device. Use “Revision list” to filter starred words, or “Mark learned” to track vocabulary you know.</p>`;
  }
  function learnedCount(items){return items.filter(v=>state.learnedWords.includes(v.id)).length;}

  const GRAMMAR_Q=[];
  function addQ(topic,prompt,correct,distractors,why,level=2){
    let options=uniq([String(correct),...(distractors||[]).map(String).filter(x=>String(x)!==String(correct))]);
    if(options.length<4){for(const x of ['None of these','All answers are correct','Not enough information','—']){if(!options.includes(x)){options.push(x);if(options.length>=4)break;}}}
    options=shuffle(options.slice(0,4));GRAMMAR_Q.push({id:'g'+String(GRAMMAR_Q.length+1).padStart(3,'0'),topic,prompt,correct:String(correct),options,explanation:why,level,kind:'grammar'});
  }
  // W-Frage: select a question word according to the information requested.
  [
    ['wfrage','___ wohnst du? (ask about place)','Wo',['Wann','Warum','Wohin'],'Wo asks where someone lives or is located.'],
    ['wfrage','___ stehst du auf? (ask about time)','Wann',['Wo','Wem','Was'],'Wann asks when. The separable prefix auf remains at the end.'],
    ['wfrage','___ kostet der Kaffee? (ask about price)','Wie viel',['Wie viele','Woher','Wer'],'Use wie viel for a price or amount.'],
    ['wfrage','___ rufst du an? (ask about the person you call)','Wen',['Wer','Wem','Warum'],'Anrufen takes an accusative object: wen?'],
    ['wfrage','___ gibst du das Buch? (ask who receives it)','Wem',['Wen','Wer','Wie'],'The receiver of geben is dative: wem?'],
    ['wfrage','___ lernst du Deutsch? (ask for a reason)','Warum',['Wann','Wohin','Wie viele'],'Warum asks why.'],
    ['wfrage','___ kommst du? (ask about origin)','Woher',['Wohin','Wo','Wie spät'],'Woher asks where someone/something comes from.'],
    ['wfrage','___ fährst du morgen? (ask destination)','Wohin',['Woher','Wer','Warum'],'Wohin asks where to.'],
    ['wfrage','___ Geschwister hast du? (ask for a count)','Wie viele',['Wie viel','Welche','Wem'],'Wie viele is used with countable plural nouns.'],
    ['wfrage','___ heißt du? (ask for a name)','Wie',['Wo','Wann','Wen'],'Wie heißt du? means “What is your name?” literally “How are you called?”'],
    ['wfrage','___ ist der Kurs? (ask for clock time)','Um wie viel Uhr',['Wie viele Uhr','Woher','Wen'],'Um wie viel Uhr asks at what time.'],
    ['wfrage','___ hilft dir? (ask who performs the action)','Wer',['Wen','Wem','Was'],'Wer is nominative for the person doing the action.'],
    ['wfrage','___ oft gehst du ins Kino? (ask about frequency)','Wie oft',['Wie lange','Wie viel','Wo'],'Wie oft asks how often.'],
    ['wfrage','___ dauert der Film? (ask about duration)','Wie lange',['Wie oft','Wie viel','Wohin'],'Wie lange asks how long.'],
    ['wfrage','___ Apfel möchtest du: den roten oder den grünen?','Welchen',['Welche','Welches','Wer'],'Welcher changes form; with masculine accusative Apfel, use welchen.'],
    ['wfrage','___ ist deine Mutter? (ask her identity)','Wer',['Wen','Wem','Warum'],'Wer is nominative when asking who someone is.'],
    ['wfrage','___ Buch ist das? (ask which book)','Welches',['Welcher','Welche','Wen'],'Buch is neuter, so use welches.'],
    ['wfrage','___ spät ist es?','Wie',['Wer','Wen','Wohin'],'Wie spät ist es? asks what time it is.'],
    ['wfrage','___ isst du zum Frühstück? (ask about a thing)','Was',['Wen','Wem','Woher'],'Was asks what.'],
    ['wfrage','___ hast du heute keine Zeit? (ask for a reason)','Warum',['Wohin','Wie viele','Wer'],'Warum asks why.']
  ].forEach(x=>addQ(...x));
  // Yes/no question formation.
  [
    ['ja-frage','Choose the correct yes/no question for “Du wohnst in Berlin.”','Wohnst du in Berlin?',['Du wohnst in Berlin?','Wo wohnst du?','Wohnst in Berlin du?'],'In a yes/no question, the finite verb goes first and the subject follows.'],
    ['ja-frage','Turn “Du musst heute arbeiten.” into a yes/no question.','Musst du heute arbeiten?',['Du musst heute arbeiten?','Musst heute du arbeiten?','Musst du heute arbeitest?'],'The modal muss/musst is finite and moves to position 1; arbeiten stays infinitive at the end.'],
    ['ja-frage','Turn “Er ruft seine Mutter an.” into a yes/no question.','Ruft er seine Mutter an?',['Ruft seine Mutter er an?','Er ruft seine Mutter an?','Ruft er an seine Mutter?'],'The verb part ruft goes first, and an remains at the end.'],
    ['ja-frage','Choose the correct question for “Ihr habt einen Hund.”','Habt ihr einen Hund?',['Ihr habt einen Hund?','Habt einen Hund ihr?','Haben ihr einen Hund?'],'The correct finite form for ihr is habt.'],
    ['ja-frage','Choose the correct question for “Sie kann mir helfen.” (formal Sie)','Können Sie mir helfen?',['Kann Sie mir helfen?','Sie können mir helfen?','Können mir Sie helfen?'],'Formal Sie uses können; in a yes/no question the verb comes first.'],
    ['ja-frage','A friend asks “Wohnst du nicht hier?” You DO live here. What is the natural contradiction?','Doch!',['Ja!','Nein!','Nicht!'],'Doch can contradict a negative question and confirm the positive meaning.'],
    ['ja-frage','Choose the correct sentence-question pair.','Du lernst Deutsch. → Lernst du Deutsch?',['Du lernst Deutsch. → Lernst Deutsch du?','Du lernst Deutsch. → Wo lernst du?','Du lernst Deutsch. → Lernst du Deutsch.'],'A statement becomes a yes/no question by placing the finite verb first and using a question mark.'],
    ['ja-frage','Choose the correct question for “Du kaufst einen Apfel ein.”','Kaufst du einen Apfel ein?',['Kaufst du ein einen Apfel?','Du kaufst einen Apfel ein?','Kaufst einen Apfel du ein?'],'Einkaufen separates: kaufst … ein.'],
    ['ja-frage','Choose the correct question for “Wir dürfen hier sitzen.”','Dürfen wir hier sitzen?',['Darf wir hier sitzen?','Wir dürfen hier sitzen?','Dürfen hier wir sitzen?'],'For wir, the modal form is dürfen.'],
    ['ja-frage','Which answer rejects “Hast du Hunger?”','Nein, ich habe keinen Hunger.',['Doch, ich habe Hunger.','Ja, ich habe keinen Hunger.','Ja, ich habe Hunger.'],'Nein rejects the proposition; keinen is the negative accusative form for masculine Hunger.'],
    ['ja-frage','Choose a grammatical yes/no question.','Kannst du mir helfen?',['Kannst mir du helfen?','Kann du mir helfen?','Du kannst mir helfen?'],'For du, können becomes kannst; the pronoun mir is dative with helfen.'],
    ['ja-frage','Turn “Fängt der Kurs um neun Uhr an.” into a question correctly.','Fängt der Kurs um neun Uhr an?',['Fängt an der Kurs um neun Uhr?','Fängt der Kurs an um neun Uhr?','Der Kurs fängt um neun Uhr an?'],'The verb part fängt is first; an is at the end.'],
    ['ja-frage','Which sentence asks a yes/no question?','Kaufst du das Brot?',['Wo kaufst du das Brot?','Du kaufst das Brot.','Wann kaufst du das Brot?'],'A Satzfrage has the finite verb in first position and invites yes/no.'],
    ['ja-frage','Choose the correct question for “Er will Pizza essen.”','Will er Pizza essen?',['Wollen er Pizza essen?','Er will Pizza essen?','Will er isst Pizza?'],'The finite modal will moves first; essen remains infinitive.'],
    ['ja-frage','Choose the correct question for “Ihr steht früh auf.”','Steht ihr früh auf?',['Stehen ihr früh auf?','Steht früh ihr auf?','Ihr steht früh auf?'],'For ihr, the form is steht; prefix auf remains at the end.']
  ].forEach(x=>addQ(...x));
  // Statement word order.
  [
    ['aussage','Choose the correct statement: “today / I / German / learn”.','Heute lerne ich Deutsch.',['Heute ich lerne Deutsch.','Lerne heute ich Deutsch.','Heute lerne Deutsch ich.'],'If heute is in position 1, the finite verb lerne must be in position 2, followed by the subject.'],
    ['aussage','Choose the correct statement with a separable verb.','Ich stehe um sieben Uhr auf.',['Ich aufstehe um sieben Uhr.','Ich stehe auf um sieben Uhr.','Ich auf um sieben Uhr stehe.'],'The finite part stehe follows the subject; auf goes at the end.'],
    ['aussage','Choose the correct modal-verb statement.','Ich muss heute einkaufen.',['Ich muss heute einkaufe.','Ich einkaufen muss heute.','Ich muss einkauft heute.'],'After a modal verb, the second verb stays in the infinitive at the end.'],
    ['aussage','Choose the correct statement: “On Monday, he goes to university by bus.”','Am Montag fährt er mit dem Bus zur Uni.',['Am Montag er fährt mit dem Bus zur Uni.','Am Montag fährt mit dem Bus er zur Uni.','Am Montag fahren er mit dem Bus zur Uni.'],'When a time phrase starts the sentence, the finite verb still takes position 2.'],
    ['aussage','Choose the correct statement.','Meine Mutter kauft einen Apfel.',['Meine Mutter einen Apfel kauft.','Meine Mutter kaufen einen Apfel.','Meine Mutter kauft ein Apfel.'],'The subject is singular; kaufen becomes kauft, and masculine accusative is einen Apfel.'],
    ['aussage','Choose the correct German order.','Wir sehen am Abend fern.',['Wir fernsehen am Abend.','Wir sehen fern am Abend.','Wir am Abend fernsehen.'],'In a main clause, the finite part sehen is conjugated and fern goes to the end.'],
    ['aussage','Choose the correct statement.','Heute muss ich Deutsch lernen.',['Heute ich muss Deutsch lernen.','Heute muss Deutsch ich lernen.','Heute muss ich Deutsch lerne.'],'The modal must be finite in position 2; lernen stays infinitive at the end.'],
    ['aussage','Choose the correct statement with a dative recipient.','Sie gibt mir das Buch.',['Sie gibt ich das Buch.','Sie mir gibt das Buch.','Sie gibt mich das Buch.'],'Mir is dative after geben for the recipient.'],
    ['aussage','Choose the correct statement with a time phrase first.','Morgens trinke ich Kaffee.',['Morgens ich trinke Kaffee.','Morgens trinke Kaffee ich.','Morgens trinkst ich Kaffee.'],'The finite verb trinke remains in position 2.'],
    ['aussage','Choose the correct word order.','Der Kurs beginnt um neun Uhr.',['Der Kurs um neun Uhr beginnt.','Der Kurs beginnen um neun Uhr.','Beginnt der Kurs um neun Uhr.'],'A statement starts with the subject then the finite verb.'],
    ['aussage','Choose the correct sentence.','Er lädt seine Freunde ein.',['Er einlädt seine Freunde.','Er ladet seine Freunde ein.','Er lädt ein seine Freunde.'],'Einladen has the stem change lädt and separates as lädt … ein.'],
    ['aussage','Choose the correct sentence with a possessive determiner.','Ich besuche meine Mutter.',['Ich besuche mein Mutter.','Ich meine Mutter besuche.','Ich besuche meiner Mutter.'],'Mutter is feminine accusative; meine is the correct possessive form.']
  ].forEach(x=>addQ(...x));
  // Imperatives.
  [
    ['imperativ','Choose the correct du imperative of “lernen”.','Lern Deutsch!',['Lernst Deutsch!','Lernen Deutsch!','Du lern Deutsch!'],'The informal du subject is normally omitted; lernen → Lern! is a common imperative form.'],
    ['imperativ','Choose the correct du imperative of “nehmen”.','Nimm den Apfel!',['Nehm den Apfel!','Nehmen den Apfel!','Nimmst den Apfel!'],'Nehmen has an irregular du imperative: Nimm!'],
    ['imperativ','Choose the correct du imperative of “lesen”.','Lies den Text!',['Les den Text!','Lest den Text!','Liest den Text!'],'Lesen changes to Lies! in the du imperative.'],
    ['imperativ','Choose the correct ihr imperative of “kommen”.','Kommt bitte herein!',['Komm bitte herein!','Kommen bitte herein!','Ihr kommt bitte herein!'],'For ihr, use the ihr verb form but omit the subject: kommt.'],
    ['imperativ','Choose the formal imperative.','Öffnen Sie bitte das Fenster!',['Öffnen bitte das Fenster!','Öffnet Sie bitte das Fenster!','Sie öffnen bitte das Fenster!'],'Formal imperative = infinitive + Sie.'],
    ['imperativ','Make a natural du command from “Du machst bitte die Tür auf.”','Mach bitte die Tür auf!',['Machst bitte die Tür auf!','Machen Sie bitte die Tür auf!','Mach bitte auf die Tür!'],'The informal imperative omits du; the separable prefix auf is placed at the end.'],
    ['imperativ','Choose the correct du imperative of “geben”.','Gib mir das Buch!',['Geb mir das Buch!','Gebe mir das Buch!','Gibst mir das Buch!'],'Geben has the irregular du imperative Gib!'],
    ['imperativ','Choose the correct du imperative of “essen”.','Iss den Apfel!',['Ess den Apfel!','Isst den Apfel!','Essen den Apfel!'],'Essen has the irregular du imperative Iss!'],
    ['imperativ','Choose the correct ihr command.','Ruft eure Mutter an!',['Ruf eure Mutter an!','Rufen eure Mutter an!','Ruft an eure Mutter!'],'For ihr: ruft; an is separated to the end.'],
    ['imperativ','Choose the correct polite request.','Kaufen Sie bitte Brot ein!',['Kauf Sie bitte Brot ein!','Kaufen bitte Sie Brot ein!','Kaufen Sie ein bitte Brot!'],'Formal Sie is retained and the prefix of einkaufen goes to the end.'],
    ['imperativ','Choose the correct du command for “aufstehen”.','Steh früh auf!',['Stehst früh auf!','Steh auf früh!','Aufsteh früh!'],'The finite command form is Steh; the prefix auf is at the end.'],
    ['imperativ','Which is the correct negative command to one friend?','Ruf mich nicht so spät an!',['Nicht ruf mich so spät an!','Rufst mich nicht so spät an!','Ruf nicht an mich so spät!'],'The command verb is first; nicht negates the action; the prefix remains at the end.'],
    ['imperativ','Which is correct for several friends (ihr)?','Macht eure Zimmer auf!',['Mach eure Zimmer auf!','Machen eure Zimmer auf!','Macht auf eure Zimmer!'],'The ihr form macht is used without ihr; auf goes to the end.'],
    ['imperativ','Choose the standard du imperative of “fahren”.','Fahr vorsichtig!',['Fährst vorsichtig!','Fahre du vorsichtig!','Fahrt vorsichtig!'],'Fahren has a common du imperative Fahr!'],
    ['imperativ','Choose a grammatical polite request.','Warten Sie bitte hier.',['Wartest Sie bitte hier.','Warten bitte hier Sie.','Sie warten bitte hier?'],'A formal imperative uses infinitive + Sie; bitte makes it polite.']
  ].forEach(x=>addQ(...x));
  // Separable verbs.
  [
    ['separable','Complete: Ich stehe um sieben Uhr ___.','auf',['aufstehen','stehe auf','aufsteht'],'In a simple main clause the conjugated verb part is in position 2; the prefix goes at the end.'],
    ['separable','Complete: Wann rufst du deine Mutter ___?','an',['anrufen','rufst an','anrufst'],'W-question order still places the prefix at the end.'],
    ['separable','Choose the correct sentence with “einkaufen”.','Ich kaufe am Samstag ein.',['Ich einkaufe am Samstag.','Ich kaufe ein am Samstag.','Ich einkaufen am Samstag.'],'The verb is split in this present-tense statement.'],
    ['separable','Complete: Ich muss morgen früh ___.','aufstehen',['stehe auf','aufstehe','steht auf'],'After the modal muss, use the full infinitive aufstehen at the end.'],
    ['separable','Choose the correct yes/no question.','Rufst du mich heute an?',['Rufst du an mich heute?','Du rufst mich heute an?','Anrufst du mich heute?'],'Anrufen separates in a main-clause yes/no question: rufst … an.'],
    ['separable','Choose the correct statement with fernsehen.','Wir sehen am Abend fern.',['Wir fernsehen am Abend.','Wir sehen fern am Abend.','Wir am Abend fernsehen.'],'The finite part sehen is conjugated; fern goes at the end.'],
    ['separable','Choose the correct modal construction.','Kannst du bitte die Tür aufmachen?',['Kannst du bitte die Tür machst auf?','Kannst du bitte aufmachst die Tür?','Kannst du bitte die Tür aufmachst?'],'With modal können, the separable verb remains whole in infinitive form: aufmachen.'],
    ['separable','Complete the imperative: ___ bitte dein Zimmer auf!','Räum',['Räumst','Aufräum','Räumen Sie'],'For a du command, use Räum … auf! with the prefix at the end.'],
    ['separable','Choose the correct statement.','Der Zug kommt um acht Uhr an.',['Der Zug ankommt um acht Uhr.','Der Zug kommt an um acht Uhr.','Der Zug an um acht Uhr kommt.'],'Ankommen splits: kommt … an.'],
    ['separable','Choose the correct sentence with anrufen.','Ich rufe meinen Bruder an.',['Ich anrufe meinen Bruder.','Ich rufe an meinen Bruder.','Ich an meinen Bruder rufe.'],'Anrufen splits in a simple main clause.'],
    ['separable','Choose the correct sentence with mitbringen.','Ich bringe einen Kuchen mit.',['Ich mitbringe einen Kuchen.','Ich bringe mit einen Kuchen.','Ich mit einen Kuchen bringe.'],'Mit is the separable prefix and goes at the end.'],
    ['separable','Complete: Wir wollen heute zusammen ___.','einkaufen',['kaufen ein','einkaufen wir','einkauft'],'After wollen the infinitive einkaufen remains together at the end.'],
    ['separable','Choose the correct question.','Wann fängt der Film an?',['Wann anfängt der Film?','Wann fängt an der Film?','Wann anfangen der Film?'],'The finite part fängt follows the W-word; an is at the end.'],
    ['separable','Choose the correct imperative.','Steig bitte hier aus!',['Aussteig bitte hier!','Steigst bitte hier aus!','Steige aus bitte hier!'],'The du imperative of aussteigen is Steig … aus!'],
    ['separable','Choose the correct sentence with stattfinden.','Der Kurs findet am Montag statt.',['Der Kurs stattfindet am Montag.','Der Kurs findet statt am Montag.','Der Kurs finden am Montag statt.'],'The verb findet is conjugated and statt goes to the end.'],
    ['separable','Which infinitive is correct after “müssen”?','Ich muss dich abholen.',['Ich muss dich hole ab.','Ich muss dich abholst.','Ich muss abhole dich.'],'The full infinitive abholen stays together after the modal.'],
    ['separable','Choose the correct present-tense sentence.','Sie zieht ihre Jacke an.',['Sie anzieht ihre Jacke.','Sie zieht an ihre Jacke.','Sie ziehen ihre Jacke an.'],'Anziehen splits; for sie (she), the form is zieht … an.'],
    ['separable','Choose the correct question with mitkommen.','Kommst du heute mit?',['Mitkommst du heute?','Du kommst heute mit?','Kommst mit du heute?'],'In a yes/no question, the verb part comes first and mit stays at the end.']
  ].forEach(x=>addQ(...x));
  // Modal verbs.
  [
    ['modal','Complete: Ich ___ Deutsch sprechen. (can)','kann',['könne','kannst','können'],'The modal können conjugates to kann with ich; sprechen stays infinitive.'],
    ['modal','Complete: Du ___ heute lernen. (must)','musst',['muss','müssen','müsst'],'With du, müssen becomes musst.'],
    ['modal','Complete: Wir ___ Pizza essen. (want)','wollen',['will','wollt','willst'],'With wir, wollen remains wollen.'],
    ['modal','Complete: ___ ich hier sitzen? (may)','Darf',['Dürfen','Darfst','Dürft'],'A yes/no question places the finite modal first; with ich use darf.'],
    ['modal','Complete: Ich ___ einen Kaffee trinken. (would like)','möchte',['möchtest','möchten','magst'],'The polite form with ich is möchte.'],
    ['modal','Choose the correct modal construction.','Kannst du mir helfen?',['Kannst du mir hilfst?','Kannst mir du helfen?','Können du mir helfen?'],'Kannst is conjugated; helfen remains an infinitive.'],
    ['modal','Choose the correct negative sentence.','Ich kann heute nicht kommen.',['Ich kann heute nicht komme.','Ich nicht kann heute kommen.','Ich kann nicht heute komme.'],'The infinitive kommen remains at the end; nicht negates the action.'],
    ['modal','Choose the correct word order.','Heute muss ich einkaufen.',['Heute ich muss einkaufen.','Heute muss einkaufe ich.','Heute muss ich kaufe ein.'],'The finite modal is in position 2; the infinitive is at the end.'],
    ['modal','Choose the correct question.','Warum musst du früh aufstehen?',['Warum du musst früh aufstehen?','Warum musst du früh stehst auf?','Warum musst früh du aufstehen?'],'W-word first, modal second, subject third; infinitive at the end.'],
    ['modal','Complete: Ihr ___ hier nicht rauchen. (may not)','dürft',['darf','dürfen','darfst'],'With ihr, dürfen becomes dürft.'],
    ['modal','Complete: Er ___ seine Hausaufgaben machen. (should)','soll',['sollen','sollst','sollt'],'With er, sollen becomes soll.'],
    ['modal','Choose the correct sentence.','Wir möchten einen Tisch reservieren.',['Wir möchtet einen Tisch reservieren.','Wir möchten einen Tisch reserviert.','Wir möchten reservieren einen Tisch.'],'Möchten is conjugated for wir, and reservieren stays infinitive at the end.'],
    ['modal','Choose the correct question with a separable infinitive.','Musst du deine Mutter anrufen?',['Musst du deine Mutter rufst an?','Musst du anrufen deine Mutter?','Du musst deine Mutter anrufen?'],'The modal moves first in a yes/no question; anrufen remains a complete infinitive at the end.'],
    ['modal','Which is the correct form for “he can”?','er kann',['er können','er kannst','er könnt'],'Können is irregular: ich kann and er/sie/es kann.'],
    ['modal','Choose the correct sentence.','Darf ich das Fenster öffnen?',['Dürfen ich das Fenster öffnen?','Darf ich das Fenster öffne?','Ich darf das Fenster öffnen?'],'Darf is the ich form and moves to the beginning in a yes/no question.'],
    ['modal','Complete: Meine Freunde ___ heute kommen. (want)','wollen',['will','wollt','wollst'],'Meine Freunde is plural, so use wollen.'],
    ['modal','Choose the correct sentence.','Ich mag Schokolade.',['Ich möchte Schokolade essen?','Ich magst Schokolade.','Ich mögen Schokolade.'],'Mögen with ich is mag and can take a noun directly.'],
    ['modal','Choose the correct construction for “We have to call him.”','Wir müssen ihn anrufen.',['Wir müssen ihn rufen an.','Wir muss ihn anrufen.','Wir müssen ihn anruft.'],'The modal is müssen; anrufen remains together at the end.']
  ].forEach(x=>addQ(...x));
  // Personal pronouns.
  [
    ['personal','Replace “den Mann”: Ich sehe den Mann. → Ich sehe ___.','ihn',['er','ihm','sie'],'Den Mann is masculine accusative; the pronoun is ihn.'],
    ['personal','Replace “die Frau”: Ich besuche die Frau. → Ich besuche ___.','sie',['ihr','ihr(e)','ihnen'],'Die Frau is feminine accusative; the pronoun stays sie.'],
    ['personal','Complete: Ich helfe ___. (du)','dir',['dich','du','dein'],'Helfen takes dative; du becomes dir.'],
    ['personal','Complete: Kannst du ___ helfen? (ich)','mir',['mich','ich','mein'],'Helfen takes a dative object: mir.'],
    ['personal','Replace “das Kind”: Ich sehe das Kind. → Ich sehe ___.','es',['ihm','er','sie'],'Das Kind is neuter accusative; it becomes es.'],
    ['personal','Complete: Sie gibt ___ das Buch. (ich)','mir',['mich','mein','ich'],'The recipient of geben is dative: mir.'],
    ['personal','Complete: Ich rufe ___ an. (er)','ihn',['ihm','er','sie'],'Anrufen takes accusative: ihn.'],
    ['personal','Complete: Wir danken ___. (Sie, formal)','Ihnen',['Sie','Ihr','ihnen'],'Danken takes dative; formal Ihnen is capitalized.'],
    ['personal','Complete: Der Lehrer hilft ___. (wir)','uns',['wir','unser','euch'],'Helfen takes dative; wir becomes uns.'],
    ['personal','Complete: Ich kenne ___. (ihr)','euch',['ihr','ihnen','sie'],'Kennen takes accusative; ihr becomes euch.'],
    ['personal','Replace “meine Eltern”: Ich besuche meine Eltern. → Ich besuche ___.','sie',['ihnen','ihr','es'],'Plural parents are the accusative object; sie replaces them.'],
    ['personal','Complete: Er gibt ___ einen Apfel. (du)','dir',['dich','du','dein'],'Du is dative dir as the receiver of geben.'],
    ['personal','Complete: Ich sehe ___. (du)','dich',['dir','du','dein'],'Sehen takes accusative; du becomes dich.'],
    ['personal','Complete: Die Kinder hören ___. (wir)','uns',['wir','unser','Ihnen'],'Hören takes accusative; wir becomes uns.'],
    ['personal','Choose the correct pair: “I see him. I help him.”','Ich sehe ihn. Ich helfe ihm.',['Ich sehe ihm. Ich helfe ihn.','Ich sehe er. Ich helfe er.','Ich sehe ihn. Ich helfe ihn.'],'Sehen takes accusative ihn; helfen takes dative ihm.'],
    ['personal','Complete: Gefällt ___ das Buch? (du)','dir',['dich','du','dein'],'Gefallen takes dative for the person who likes something.'],
    ['personal','Complete: Meine Schwester besucht ___. (ich)','mich',['mir','ich','mein'],'Besuchen takes an accusative object: mich.'],
    ['personal','Complete: Wir schreiben ___ eine Nachricht. (sie, singular)','ihr',['sie','ihre','ihnen'],'In this sentence, ihr is the dative recipient: we write her a message.']
  ].forEach(x=>addQ(...x));
  // Possessives.
  [
    ['possessive','Das ist ___ Schwester. (ich)','meine',['mein','meinen','meiner'],'Schwester is feminine nominative; use meine.'],
    ['possessive','Ich sehe ___ Bruder. (du)','deinen',['dein','deine','deinem'],'Bruder is masculine accusative; use deinen.'],
    ['possessive','Das ist ___ Buch. (er)','sein',['seine','seinen','seinem'],'Buch is neuter nominative; use sein.'],
    ['possessive','Er besucht ___ Mutter. (er)','seine',['sein','seinen','seiner'],'Mutter is feminine accusative; use seine.'],
    ['possessive','Wir besuchen ___ Großeltern. (wir)','unsere',['unser','unseren','unserem'],'Großeltern is plural accusative; use unsere.'],
    ['possessive','Ist das ___ Tasche? (du)','deine',['dein','deinen','deiner'],'Tasche is feminine nominative; use deine.'],
    ['possessive','Ich helfe ___ Vater. (ich)','meinem',['mein','meinen','meiner'],'Vater is masculine dative with helfen; use meinem.'],
    ['possessive','Sie gibt ___ Kind ein Buch. (sie, her)','ihrem',['ihr','ihren','ihre'],'Kind is neuter dative; use ihrem.'],
    ['possessive','Das ist ___ Auto. (ihr, plural informal)','euer',['eure','euren','eurem'],'Auto is neuter nominative; euer is used before a neuter noun without an ending.'],
    ['possessive','Wir danken ___ Lehrerin. (wir)','unserer',['unsere','unseren','unserem'],'Lehrerin is feminine dative; use unserer.'],
    ['possessive','Ist das ___ Hund? (Sie, formal)','Ihr',['Ihre','Ihren','Ihrem'],'Hund is masculine nominative; formal possessive Ihr is capitalized.'],
    ['possessive','Er gibt ___ Freunden Geschenke. (er)','seinen',['sein','seine','seinem'],'Freunden is dative plural; use seinen.'],
    ['possessive','Ich kaufe ___ Apfel. (I)','meinen',['mein','meinem','meine'],'Apfel is masculine accusative, so mein takes the ending -en: meinen Apfel.'],
    ['possessive','Choose the correct sentence.','Das ist ihr Vater.',['Das ist ihre Vater.','Das ist ihren Vater.','Das ist ihrer Vater.'],'Vater is masculine nominative; the possessive determiner has no ending: ihr Vater.'],
    ['possessive','Complete: Wo ist ___ Schlüssel? (I)','mein',['meine','meinen','meinem'],'Schlüssel is masculine nominative; mein is correct.']
  ].forEach(x=>addQ(...x));
  // Cases and article selection, evenly spread over all three cases.
  [
    ['nominativ','___ Mann kauft einen Apfel.','Der',['Den','Dem','Die'],'Der Mann is the subject performing the buying.'],
    ['nominativ','___ Frau lernt Deutsch.','Die',['Der','Den','Dem'],'Frau is feminine nominative: die Frau.'],
    ['nominativ','___ Kind spielt im Garten.','Das',['Den','Dem','Die'],'Kind is neuter nominative: das Kind.'],
    ['nominativ','___ Kinder lernen Deutsch.','Die',['Den','Dem','Das'],'Plural nominative uses die.'],
    ['nominativ','___ Lehrer hilft mir.','Der',['Den','Dem','Die'],'The teacher is the subject; dative mir is the recipient of helfen.'],
    ['nominativ','Choose the nominative pronoun: ___ bin Shivam.','Ich',['Mich','Mir','Mein'],'The person speaking as subject uses ich.'],
    ['nominativ','___ Apfel ist frisch.','Der',['Den','Dem','Die'],'Apfel is masculine nominative when it is the subject.'],
    ['nominativ','___ Mädchen singt.','Das',['Die','Den','Dem'],'Mädchen is grammatically neuter, so use das.'],
    ['akkusativ','Ich sehe ___ Mann.','den',['der','dem','die'],'Sehen takes accusative; masculine der changes to den.'],
    ['akkusativ','Ich habe ___ Bruder.','einen',['ein','einem','eine'],'Haben takes accusative; masculine ein becomes einen.'],
    ['akkusativ','Sie kauft ___ Banane.','eine',['einen','ein','einer'],'Banane is feminine; accusative indefinite remains eine.'],
    ['akkusativ','Wir besuchen ___ Großeltern.','die',['den','der','dem'],'Plural accusative article is die.'],
    ['akkusativ','Ich brauche ___ Buch.','ein',['einen','einem','eine'],'Buch is neuter; accusative indefinite remains ein.'],
    ['akkusativ','Er ruft ___ an. (she)','sie',['ihr','ihr(e)','ihnen'],'Anrufen takes accusative; feminine sie remains sie.'],
    ['akkusativ','Ich esse ___ Apfel.','einen',['ein','einem','einer'],'Apfel is masculine accusative: einen Apfel.'],
    ['akkusativ','Wir trinken ___ Kaffee.','den',['dem','der','das'],'With a definite masculine object, accusative is den Kaffee.'],
    ['akkusativ','Sie kauft ___ Tomaten.','die',['den','dem','der'],'Plural accusative is die Tomaten.'],
    ['akkusativ','Ich sehe ___ Kind.','das',['dem','den','die'],'Neuter article stays das in accusative.'],
    ['dativ','Ich helfe ___ Mutter.','der',['die','den','dem'],'Helfen requires dative; feminine die becomes der.'],
    ['dativ','Ich danke ___ Lehrer.','dem',['den','der','die'],'Danken requires dative; masculine der becomes dem.'],
    ['dativ','Sie gibt ___ Kind ein Buch.','dem',['den','das','der'],'The receiver of geben is dative; neuter das becomes dem.'],
    ['dativ','Ich helfe ___ Kindern.','den',['die','der','dem'],'Dative plural uses den; the noun has -n: Kindern.'],
    ['dativ','Kannst du ___ helfen? (ich)','mir',['mich','mein','ich'],'Helfen takes dative; ich becomes mir.'],
    ['dativ','Der Kaffee schmeckt ___ Mann.','dem',['den','der','die'],'The person experiencing the taste is dative in this construction.'],
    ['dativ','Ich schenke ___ Schwester Blumen.','meiner',['meine','meinen','meinem'],'Schwester is the dative recipient; possessive is meiner.'],
    ['dativ','Wir fahren mit ___ Bus.','dem',['den','der','die'],'Mit always takes dative; der Bus → dem Bus.'],
    ['dativ','Das Buch gehört ___. (du)','dir',['dich','du','dein'],'Gehören takes dative for the owner: dir.'],
    ['dativ','Ich spreche mit ___ Frau.','der',['die','den','dem'],'Mit requires dative; feminine die becomes der.'],
    ['dativ','Er gibt ___ Freunden die Karten.','den',['die','der','dem'],'Plural recipient is dative; use den Freunden.'],
    ['dativ','Welche pronoun fits: Ich danke ___. (Sie, formal)','Ihnen',['Sie','Ihr','ihnen'],'Danken takes dative; formal pronoun is Ihnen.'],
    ['akkusativ','Choose the correct negative article: Ich habe ___ Bruder.','keinen',['kein','keinem','keine'],'Masculine accusative kein becomes keinen.'],
    ['akkusativ','Complete: Er besucht ___ (his mother).','seine Mutter',['seiner Mutter','seinen Mutter','sein Mutter'],'Besuchen takes accusative; feminine possessive is seine Mutter.'],
    ['dativ','Complete: Ich schreibe ___ eine Mail. (my brother)','meinem Bruder',['meinen Bruder','mein Bruder','meiner Bruder'],'The recipient is dative; masculine mein becomes meinem.'],
    ['nominativ','Choose the correct subject: ___ gibt dem Kind einen Apfel.','Der Mann',['Den Mann','Dem Mann','Den Apfel'],'Der Mann performs the action, so it is nominative.'],
    ['akkusativ','In “Der Mann kauft einen Apfel”, which phrase is accusative?','einen Apfel',['Der Mann','kauft','Der Mann kauft'],'The thing bought is the direct object: einen Apfel.'],
    ['dativ','In “Der Mann gibt dem Kind einen Apfel”, which phrase is dative?','dem Kind',['Der Mann','einen Apfel','gibt'],'The recipient of the apple is dem Kind, dative.'],
    ['akkusativ','Choose the correct sentence with besuchen.','Ich besuche meinen Bruder.',['Ich besuche meinem Bruder.','Ich besuche mein Bruder.','Ich besuche meiner Bruder.'],'Besuchen takes accusative; masculine meinen Bruder.'],
    ['dativ','Choose the correct sentence with helfen.','Sie hilft ihrem Vater.',['Sie hilft ihren Vater.','Sie hilft ihr Vater.','Sie helfen ihrem Vater.'],'Helfen takes dative; Vater becomes ihrem Vater with the possessive.'],
    ['akkusativ','Choose the correct sentence with brauchen.','Wir brauchen einen Tisch.',['Wir brauchen einem Tisch.','Wir brauchen ein Tisch.','Wir brauchen einer Tisch.'],'Brauchen takes accusative; masculine einen Tisch.'],
    ['dativ','Choose the correct sentence.','Das gefällt meiner Schwester.',['Das gefällt meine Schwester.','Das gefällt meinen Schwester.','Das gefällt mein Schwester.'],'Gefallen takes dative for the person who likes it.'],
    ['akkusativ','Which pronoun replaces “das Buch” in “Ich kaufe das Buch”?','es',['ihm','ihn','sie'],'Buch is neuter accusative; the pronoun is es.'],
    ['dativ','Choose the correct recipient pronoun.','Er gibt ihnen die Schlüssel.',['Er gibt sie die Schlüssel.','Er gibt ihnen sie die Schlüssel.','Er gibt ihr die Schlüssel.'],'Ihnen is the dative plural recipient (to them).'],
    ['nominativ','Which noun is nominative in “Heute lernt meine Schwester Deutsch”?','meine Schwester',['Heute','Deutsch','lernt'],'The subject remains nominative even when the time expression starts the sentence.'],
    ['akkusativ','Choose the correct definite article: Ich kaufe ___ Käse.','den',['dem','der','die'],'In a complete noun phrase, Käse is masculine; definite accusative is den Käse.'],
    ['dativ','Complete: Ich fahre zu ___ Arzt.','dem',['den','der','die'],'Zu always takes dative; der Arzt becomes dem Arzt.'],
    ['dativ','Complete: Ich bin bei ___ Familie.','der',['die','den','dem'],'Bei takes dative; die Familie becomes der Familie.'],
    ['akkusativ','Complete: Ich gehe durch ___ Park.','den',['dem','der','die'],'Durch takes accusative; der Park becomes den Park.'],
    ['dativ','Complete: Das Geschenk ist von ___ Eltern.','meinen',['meine','meiner','mein'],'Von takes dative; plural possessive is meinen Eltern.'],
    ['akkusativ','Choose the correct pronoun: Er sieht Anna. Er sieht ___.','sie',['ihr','ihnen','es'],'Anna is the accusative object and is replaced by sie.'],
    ['dativ','Choose the correct pronoun: Anna hilft Peter. Anna hilft ___.','ihm',['ihn','er','sie'],'Helfen takes dative; Peter becomes ihm.']
  ].forEach(x=>addQ(...x,3));
  // Ordinal number and date questions.
  [
    ['ordinal','What is the German ordinal for 1st?','erste',['einste','einte','einsste'],'The ordinal for one is erste.'],
    ['ordinal','Choose the correct phrase: the third day.','der dritte Tag',['der drei Tag','der dreite Tag','der dritten Tag'],'Drei has the irregular ordinal dritte.'],
    ['ordinal','Complete: Mein Geburtstag ist am ___ Oktober. (18th)','achtzehnten',['achtzehnte','achtzehn','achtzehnsten'],'After am, the ordinal takes the dative ending -en: am achtzehnten Oktober.'],
    ['ordinal','Complete: Der Kurs beginnt am ___ Mai. (5th)','fünften',['fünfte','fünf','fünfter'],'Dates with am use the -en ending.'],
    ['ordinal','Which form means “the twentieth”?','zwanzigste',['zwanzigste(n)','zwanzigsten','zwanzigstee'],'20th is zwanzigste; in a date it becomes am zwanzigsten.'],
    ['ordinal','Choose the correct phrase: on the 21st of March.','am einundzwanzigsten März',['am einundzwanzigste März','am einundzwanzig März','am einundzwanzigsten am März'],'From 21 onward use -ste, and with am the ending is -en.'],
    ['ordinal','What is the correct ordinal for 2nd?','zweite',['zwoite','zweit','zweieste'],'The second is zweite.'],
    ['ordinal','What is the correct ordinal for 4th?','vierte',['vierste','vierte(n)','vierete'],'The fourth is vierte; a date uses vierten after am.'],
    ['ordinal','Complete: Heute ist der ___ Oktober. (3rd)','dritte',['dritten','drei','dreiste'],'With der in this nominative date statement, use dritte.'],
    ['ordinal','Complete: Heute ist der ___ Mai. (12th)','zwölfte',['zwölften','zwölf','zwölfste'],'The 12th is zwölfte.'],
    ['ordinal','What is 30th in German?','dreißigste',['dreißigste(n)','dreißigteste','dreißigste'], 'Thirty is dreißig; the ordinal is dreißigste.'],
    ['ordinal','Complete: Der Termin ist am ___ Juni. (1st)','ersten',['erste','eins','erst'],'Am takes dative -en: am ersten Juni.'],
    ['ordinal','What is the correct ordinal for 8th?','achte',['achtste','achtete','acht'], 'Eight is achte.'],
    ['ordinal','What is the correct ordinal for 7th?','siebte',['siebente','siebenste','siebten'],'Seven is usually siebte; the form siebente also exists.'],
    ['ordinal','Complete: Mein Geburtstag ist am ___ Oktober. (18th)','achtzehnten',['achtzehnte','achtzehn','achtzehnste'],'Dates with am require -en.'],
    ['ordinal','Choose the correct form: the first floor / storey.','der erste Stock',['der eins Stock','der ersten Stock','der erst Stock'],'Use der erste Stock for the first floor.'],
    ['ordinal','Choose the correct date.','am dritten Oktober',['am dritte Oktober','am drei Oktober','am dreiten Oktober'],'Use ordinal plus -en after am.'],
    ['ordinal','What is the correct ordinal for 31st?','einunddreißigste',['einunddreißigsten','einunddreißig','einunddreißigste(n)'],'31st is einunddreißigste; in a date: am einunddreißigsten.'],
    ['ordinal','Complete: Der Geburtstag ist am ___ August. (22nd)','zweiundzwanzigsten',['zweiundzwanzigste','zweiundzwanzig','zweiundzwanzigste(n)'],'22nd is zweiundzwanzigste; after am use zweiundzwanzigsten.'],
    ['ordinal','Choose the grammatically correct pair.','der fünfte Tag · am fünften Tag',['der fünf Tag · am fünf Tag','der fünften Tag · am fünfte Tag','der fünfte Tag · am fünf Tag'],'Nominative adjective ending: fünfte; dative after am: fünften.']
  ].forEach(x=>addQ(...x,3));

  // Additional unique questions bring each major grammar area close to the revision counts in the syllabus.
  [
    ['wfrage','___ kommt der Zug? (ask where it comes from)','Woher',['Wohin','Wo','Wann'],'Woher asks about the origin or starting point.'],
    ['wfrage','___ dauert die Pause?','Wie lange',['Wie oft','Wie viel','Wann'],'Wie lange asks for duration.'],
    ['wfrage','___ Getränke kaufst du? (ask for a number)','Wie viele',['Wie viel','Wem','Woher'],'Getränke is countable plural, so use wie viele.'],
    ['wfrage','___ gibst du den Schlüssel? (ask for the recipient)','Wem',['Wen','Wer','Was'],'The person receiving something with geben is dative: wem?'],
    ['wfrage','___ Buch liest du: das rote oder das blaue?','Welches',['Welcher','Welche','Wen'],'Buch is neuter, so the matching question word is welches.']
  ].forEach(x=>addQ(...x,3));
  [
    ['ja-frage','Choose the correct question for “Du hast morgen Zeit.”','Hast du morgen Zeit?',['Du hast morgen Zeit?','Hast morgen du Zeit?','Haben du morgen Zeit?'],'Haben for du is hast; the finite verb moves to the first position.'],
    ['ja-frage','Choose the correct question for “Sie sind verheiratet.” (she)','Ist sie verheiratet?',['Sind sie verheiratet?','Sie ist verheiratet?','Ist verheiratet sie?'],'For singular sie (she), sein becomes ist.'],
    ['ja-frage','Choose the correct question for “Er darf hier rauchen.”','Darf er hier rauchen?',['Dürfen er hier rauchen?','Er darf hier rauchen?','Darf er hier raucht?'],'The modal darf goes first; rauchen stays infinitive.'],
    ['ja-frage','Choose the correct question for “Ihr fahrt am Montag nach Berlin.”','Fahrt ihr am Montag nach Berlin?',['Fahren ihr am Montag nach Berlin?','Ihr fahrt am Montag nach Berlin?','Fahrt am Montag ihr nach Berlin?'],'For ihr, fahren becomes fahrt and moves to position 1.'],
    ['ja-frage','Choose the correct question for “Sie möchten einen Tee.” (formal Sie)','Möchten Sie einen Tee?',['Möchtest Sie einen Tee?','Sie möchten einen Tee?','Möchten einen Tee Sie?'],'Formal Sie uses möchten; the finite verb starts the question.'],
    ['ja-frage','Choose the correct question for “Das Kind schläft.”','Schläft das Kind?',['Schlafen das Kind?','Das Kind schläft?','Schläft das Kind.'],'Schlafen changes to schläft for singular das Kind.'],
    ['ja-frage','Turn “Du kennst mich.” into a yes/no question.','Kennst du mich?',['Du kennst mich?','Kennst mich du?','Kennen du mich?'],'The finite verb kennst moves first; du follows.'],
    ['ja-frage','Choose the correct question for “Der Zug kommt um acht Uhr an.”','Kommt der Zug um acht Uhr an?',['Ankommt der Zug um acht Uhr?','Kommt an der Zug um acht Uhr?','Der Zug kommt um acht Uhr an?'],'Ankommen splits into kommt … an.'],
    ['ja-frage','Choose the correct question for “Wir gehen ins Kino.”','Gehen wir ins Kino?',['Geht wir ins Kino?','Wir gehen ins Kino?','Gehen ins Kino wir?'],'With wir, gehen is the correct finite form and moves to the front.'],
    ['ja-frage','Choose the correct question for “Du bist müde.”','Bist du müde?',['Bin du müde?','Du bist müde?','Bist müde du?'],'With du, sein becomes bist.']
  ].forEach(x=>addQ(...x,3));
  [
    ['aussage','Choose the correct statement: “My sister is learning German.”','Meine Schwester lernt Deutsch.',['Meine Schwester lernen Deutsch.','Meine Schwester Deutsch lernt.','Meine Schwester lernst Deutsch.'],'Meine Schwester is singular, so lernen becomes lernt; the finite verb is in position 2.'],
    ['aussage','Choose the correct statement with a dative verb.','Ich helfe meinem Bruder.',['Ich helfe meinen Bruder.','Ich meinem Bruder helfe.','Ich helfe mein Bruder.'],'Helfen takes dative; masculine mein becomes meinem.'],
    ['aussage','Choose the correct statement: “The meeting begins at ten.”','Die Besprechung beginnt um zehn Uhr.',['Die Besprechung um zehn Uhr beginnt.','Die Besprechung beginnen um zehn Uhr.','Beginnt die Besprechung um zehn Uhr.'],'A statement uses the subject first and the finite verb second.'],
    ['aussage','Choose the correct statement using “heute” first.','Heute fährt mein Vater zur Arbeit.',['Heute mein Vater fährt zur Arbeit.','Heute fahren mein Vater zur Arbeit.','Heute fährt zur Arbeit mein Vater.'],'A time phrase in position 1 is followed by the finite verb in position 2.'],
    ['aussage','Choose the correct statement with wollen.','Meine Freunde wollen heute kommen.',['Meine Freunde will heute kommen.','Meine Freunde wollen heute kommt.','Meine Freunde heute wollen kommen.'],'For a plural subject, use wollen; kommen remains infinitive at the end.'],
    ['aussage','Choose the correct statement with a dative recipient and accusative object.','Er gibt seiner Schwester das Buch.',['Er gibt seine Schwester dem Buch.','Er seiner Schwester gibt das Buch.','Er gibt seiner Schwester dem Buch.'],'The recipient is dative seiner Schwester; the thing given is accusative das Buch.'],
    ['aussage','Choose the correct sentence using “mit” and dative.','Ich fahre mit dem Bus.',['Ich fahre mit den Bus.','Ich mit dem Bus fahre.','Ich fahre mit der Bus.'],'Mit always takes dative; der Bus becomes dem Bus.'],
    ['aussage','Choose the correct statement with anfangen.','Der Film fängt um acht Uhr an.',['Der Film anfängt um acht Uhr.','Der Film fängt an um acht Uhr.','Der Film fangen um acht Uhr an.'],'Anfangen is separable: fängt … an.']
  ].forEach(x=>addQ(...x,3));
  [
    ['imperativ','Choose the correct du imperative of “sprechen”.','Sprich bitte langsam!',['Sprech bitte langsam!','Sprichst bitte langsam!','Sprechen bitte langsam!'],'Sprechen has the irregular du imperative sprich.'],
    ['imperativ','Choose the correct du imperative of “sein”.','Sei bitte pünktlich!',['Bist bitte pünktlich!','Sein bitte pünktlich!','Seid bitte pünktlich!'],'The imperative of sein for du is sei.'],
    ['imperativ','Choose the correct ihr imperative of “lesen”.','Lest den Text!',['Lies den Text!','Lesen den Text!','Liest den Text!'],'For several people (ihr), use lest.'],
    ['imperativ','Choose the correct formal command for “wait here”.','Warten Sie bitte hier!',['Wart Sie bitte hier!','Warten bitte hier Sie!','Wartet Sie bitte hier!'],'The formal imperative uses the infinitive plus Sie.'],
    ['imperativ','Choose the correct du imperative of “essen”.','Iss bitte die Suppe!',['Esst bitte die Suppe!','Isst bitte die Suppe!','Essen bitte die Suppe!'],'Essen has the irregular du imperative iss.'],
    ['imperativ','Choose the correct ihr command with “aufmachen”.','Macht bitte das Fenster auf!',['Mach bitte das Fenster auf!','Macht bitte auf das Fenster!','Aufmacht bitte das Fenster!'],'For ihr, use macht; the separable prefix auf goes at the end.'],
    ['imperativ','Choose the correct du imperative of “geben”.','Gib mir bitte den Stift!',['Geb mir bitte den Stift!','Gibst mir bitte den Stift!','Geben mir bitte den Stift!'],'The imperative form is Gib!; mir is dative for the receiver.'],
    ['imperativ','Choose the correct formal imperative with a separable verb.','Rufen Sie mich bitte morgen an!',['Anrufen Sie mich bitte morgen!','Rufen mich bitte morgen Sie an!','Ruf Sie mich bitte morgen an!'],'Formal imperative: Rufen Sie … an; the prefix is at the end.'],
    ['imperativ','Choose the correct du imperative of “fahren”.','Fahr bitte vorsichtig!',['Fährst bitte vorsichtig!','Fahrt bitte vorsichtig!','Fahren bitte vorsichtig!'],'Fahren has the common du imperative fahr.'],
    ['imperativ','Which is the correct negative command to one friend?','Iss nicht so schnell!',['Du isst nicht so schnell!','Isst nicht so schnell!','Nicht iss so schnell!'],'Use the du imperative iss; the informal subject is omitted.']
  ].forEach(x=>addQ(...x,3));
  [
    ['separable','Choose the correct statement with zumachen.','Mach bitte die Tür zu.',['Mach bitte zu die Tür.','Zumach bitte die Tür.','Du machst zu bitte die Tür.'],'For an imperative with zumachen, use Mach … zu.'],
    ['separable','Choose the correct sentence with zurückkommen.','Wann kommst du zurück?',['Wann zurückkommst du?','Wann kommst zurück du?','Wann zurück kommst du?'],'The finite verb kommt comes after the W-word; zurück is at the end.'],
    ['separable','Complete: Der Unterricht ___ um neun Uhr ___. (anfangen)','fängt … an',['anfangen … fängt','fangt … an','fängt … anfang'],'Anfangen is separable: fängt … an.'],
    ['separable','Choose the correct sentence with ausfüllen.','Bitte füll das Formular aus!',['Bitte ausfüll das Formular!','Bitte füll aus das Formular!','Bitte füllst das Formular aus!'],'Imperative: füll … aus; the prefix is at the end.'],
    ['separable','Choose the correct sentence with einladen.','Ich lade meine Freunde ein.',['Ich einlade meine Freunde.','Ich lade ein meine Freunde.','Ich lädt meine Freunde ein.'],'Einladen splits in a main clause: lade … ein.'],
    ['separable','Choose the correct sentence with abholen after a modal.','Ich kann dich um fünf Uhr abholen.',['Ich kann dich abhole um fünf Uhr.','Ich kann dich hole ab um fünf Uhr.','Ich kann abhole dich um fünf Uhr.'],'After kann, the complete infinitive abholen goes at the end.'],
    ['separable','Choose the correct question with aufwachen.','Wachst du früh auf?',['Aufwachst du früh?','Wachst auf du früh?','Wachst du auf früh?'],'Aufwachen splits in the yes/no question; the prefix auf is last.'],
    ['separable','Choose the correct sentence with aussteigen.','Wir steigen an der nächsten Haltestelle aus.',['Wir aussteigen an der nächsten Haltestelle.','Wir steigen aus an der nächsten Haltestelle.','Wir steigst an der nächsten Haltestelle aus.'],'With wir, steigen is finite; aus stays at the end.'],
    ['separable','Choose the correct question with aufräumen.','Räumst du dein Zimmer auf?',['Aufräumst du dein Zimmer?','Räumst auf du dein Zimmer?','Räumst du auf dein Zimmer?'],'The finite part räumst follows the yes/no position; auf ends the clause.'],
    ['separable','Choose the correct sentence with losfahren.','Der Bus fährt um sechs Uhr los.',['Der Bus losfährt um sechs Uhr.','Der Bus fährt los um sechs Uhr.','Der Bus fahren um sechs Uhr los.'],'Losfahren splits: fährt … los.'],
    ['separable','Choose the correct statement with aufhören.','Der Film hört um zehn Uhr auf.',['Der Film aufhört um zehn Uhr.','Der Film hört auf um zehn Uhr.','Der Film hören um zehn Uhr auf.'],'Aufhören separates into hört … auf.'],
    ['separable','Choose the correct question with abholen.','Holst du mich vom Bahnhof ab?',['Abholst du mich vom Bahnhof?','Holst du ab mich vom Bahnhof?','Holst mich du vom Bahnhof ab?'],'Abholen splits in a yes/no question: holst … ab.']
  ].forEach(x=>addQ(...x,3));
  [
    ['modal','Complete: Ich ___ heute nicht ausgehen. (may)','darf',['dürfen','darfst','dürft'],'With ich, dürfen becomes darf; ausgehen is an infinitive at the end.'],
    ['modal','Complete: Du ___ deine Hausaufgaben machen. (should)','sollst',['soll','sollen','sollt'],'With du, sollen becomes sollst.'],
    ['modal','Complete: Wir ___ am Sonntag wandern. (want)','wollen',['will','wollt','willst'],'With wir, wollen stays wollen.'],
    ['modal','Complete: Er ___ sehr gut schwimmen. (can)','kann',['kannst','können','könnt'],'With er, können becomes kann.'],
    ['modal','Choose the correct yes/no question.','Darf ich das Fenster öffnen?',['Darf ich das Fenster öffne?','Dürfen ich das Fenster öffnen?','Ich darf das Fenster öffnen?'],'Darf is the finite modal for ich; öffnen stays infinitive.'],
    ['modal','Choose the correct statement with wollen.','Ich will heute fernsehen.',['Ich will heute sehe fern.','Ich wollen heute fernsehen.','Ich will heute fernsehe.'],'Will is the ich form; the full separable infinitive fernsehen is at the end.'],
    ['modal','Choose the correct negative modal sentence.','Wir dürfen hier nicht parken.',['Wir dürfen hier nicht parken?','Wir dürft hier nicht parken.','Wir nicht dürfen hier parken.'],'Wir takes dürfen; parken stays infinitive at the end.'],
    ['modal','Complete: ___ du heute mitkommen? (want)','Willst',['Will','Wollen','Wollt'],'With du, wollen becomes willst; mitkommen remains an infinitive.'],
    ['modal','Choose the correct sentence with mögen.','Meine Schwester mag Schokolade.',['Meine Schwester mögen Schokolade.','Meine Schwester magt Schokolade.','Meine Schwester mag Schokolade essen gern.'],'Mögen becomes mag for er/sie/es; it can take a noun object.'],
    ['modal','Choose the correct sentence.','Ich möchte einen Tisch reservieren.',['Ich möchte reserviere einen Tisch.','Ich möchten einen Tisch reservieren.','Ich möchte einen Tisch reserviert.'],'Möchte is the first-person form, while reservieren is infinitive at the end.'],
    ['modal','Complete: Ihr ___ pünktlich kommen. (must)','müsst',['muss','musst','müssen'],'With ihr, müssen becomes müsst.'],
    ['modal','Choose the correct W-question with a modal verb.','Wann kannst du mich abholen?',['Wann du kannst mich abholen?','Wann kannst du mich holst ab?','Wann können du mich abholen?'],'W-word first, modal second, subject third, infinitive abholen at the end.']
  ].forEach(x=>addQ(...x,3));
  [
    ['personal','Complete: Ich sehe Paul. Ich sehe ___.','ihn',['ihm','er','sie'],'Paul is the masculine accusative object: ihn.'],
    ['personal','Complete: Wir helfen Anna. Wir helfen ___.','ihr',['sie','ihr(e)','ihnen'],'Helfen takes dative; Anna becomes ihr.'],
    ['personal','Complete: Der Lehrer besucht ___. (we)','uns',['wir','unser','euch'],'Besuchen takes accusative; wir becomes uns.'],
    ['personal','Complete: Kannst du ___ bitte anrufen? (I)','mich',['mir','ich','mein'],'Anrufen takes accusative; ich becomes mich.'],
    ['personal','Complete: Meine Eltern geben ___ Geld. (I)','mir',['mich','ich','mein'],'The receiver of geben is dative: mir.'],
    ['personal','Choose the correct pair for the object “the children” after sehen / helfen.','Ich sehe sie. Ich helfe ihnen.',['Ich sehe ihnen. Ich helfe sie.','Ich sehe sie. Ich helfe sie.','Ich sehe ihnen. Ich helfe ihnen.'],'Sie is accusative plural; ihnen is dative plural.'],
    ['personal','Complete: Der Film gefällt ___. (he)','ihm',['ihn','er','sein'],'Gefallen takes dative; er becomes ihm.']
  ].forEach(x=>addQ(...x,3));
  [
    ['possessive','Ich sehe ___ Vater. (sie, her)','ihren',['ihr','ihrem','ihre'],'Vater is masculine accusative, so ihr becomes ihren.'],
    ['possessive','Das ist ___ Auto. (wir)','unser',['unsere','unseren','unserem'],'Auto is neuter nominative; use unser.'],
    ['possessive','Ich helfe ___ Schwester. (du)','deiner',['deine','deinen','deinem'],'Schwester is feminine dative; dein becomes deiner.'],
    ['possessive','Er besucht ___ Großeltern. (er)','seine',['seinen','seiner','seinem'],'Großeltern is plural accusative; use seine.'],
    ['possessive','Wir geben ___ Kind ein Buch. (we)','unserem',['unser','unseren','unsere'],'Kind is neuter dative; use unserem.'],
    ['possessive','___ Bruder ist 19 Jahre alt. (I)','Mein',['Meine','Meinen','Meinem'],'Bruder is masculine nominative; use Mein Bruder.'],
    ['possessive','Sie ruft ___ Vater an. (she)','ihren',['ihr','ihrem','ihre'],'Vater is masculine accusative; use ihren.'],
    ['possessive','Wo sind ___ Schlüssel? (you, informal singular)','deine',['dein','deinen','deinem'],'Schlüssel is plural here; use deine Schlüssel.'],
    ['possessive','Das ist ___ Mutter. (he)','seine',['sein','seiner','seinen'],'Mutter is feminine nominative; use seine.'],
    ['possessive','Ich spreche mit ___ Eltern. (I)','meinen',['meine','meiner','mein'],'Mit takes dative; plural possessive is meinen Eltern.']
  ].forEach(x=>addQ(...x,3));

  // Generate one searchable, automatically scored German → English question for every supplied vocabulary item.
  const vocabById=new Map(VOCABULARY.map(v=>[v.id,v]));
  function makeVocabularyBank(){
    return VOCABULARY.map(v=>{
      const correct=v.meaning;
      const distractors=shuffle(VOCABULARY.filter(x=>x.id!==v.id&&x.meaning.toLocaleLowerCase('en')!==correct.toLocaleLowerCase('en')).map(x=>x.meaning)).filter((x,i,a)=>a.indexOf(x)===i).slice(0,3);
      return {id:`v${v.id}`,topic:'vocabulary',prompt:`What does “${v.term}” mean?`,correct,options:shuffle([correct,...distractors]),explanation:`${v.term} means “${v.meaning}”. Example: ${v.example} — ${v.translation}`,level:2,kind:'vocabulary',vocabId:v.id};
    });
  }
  const VOCAB_Q=makeVocabularyBank();
  function allQuestions(){return [...GRAMMAR_Q,...VOCAB_Q];}
  function filteredQuestions(topic='all') {return topic==='all'?allQuestions():allQuestions().filter(q=>q.topic===topic);}
  function wordOptions(correct, pool, labelFn){const c=labelFn?labelFn(correct):correct;const candidates=shuffle(pool.filter(x=>x.id!==correct.id).map(x=>labelFn?labelFn(x):x)).filter(x=>x!==c&&String(x).toLocaleLowerCase()!==String(c).toLocaleLowerCase());return shuffle([c,...uniq(candidates).slice(0,3)]);}
  function makeVocabMode(mode){
    const nouns=VOCABULARY.filter(v=>v.kind==='Noun'&&v.article);
    const out=[];
    if(mode==='english-de'){
      for(const v of VOCABULARY){const distract=shuffle(VOCABULARY.filter(x=>x.id!==v.id).map(x=>x.term)).filter(x=>x!==v.term).slice(0,3);out.push({id:`ve${v.id}`,topic:'vocabulary',prompt:`Choose the German word for “${v.meaning}”.`,correct:v.term,options:shuffle([v.term,...distr]),explanation:`${v.term} means “${v.meaning}”. ${v.example} — ${v.translation}`,kind:'vocabulary',vocabId:v.id});}return out;
    }
    if(mode==='article'){
      return nouns.filter(v=>v.article).map(v=>({id:`va${v.id}`,topic:'vocabulary',prompt:`Which article belongs to “${v.base}”?`,correct:v.article,options:shuffle(uniq([v.article,'der','die','das'])),explanation:`The supplied course form is ${v.term}${v.plural?`, plural: ${v.plural}`:''}. ${v.example}`,kind:'vocabulary',vocabId:v.id}));
    }
    if(mode==='plural'){
      return nouns.filter(v=>v.plural).map(v=>({id:`vp${v.id}`,topic:'vocabulary',prompt:`Choose the plural form of “${v.word}”.`,correct:v.plural,options:shuffle([v.plural,...shuffle(nouns.filter(x=>x.id!==v.id&&x.plural).map(x=>x.plural)).filter(x=>x!==v.plural).slice(0,3)]),explanation:`The course list gives: ${v.term}. ${v.example}`,kind:'vocabulary',vocabId:v.id}));
    }
    if(mode==='fill'){
      const cloze=[];
      for(const v of VOCABULARY){
        let token=v.base||v.word;
        if(!token||token.length<3)continue;
        const re=new RegExp(token.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),'i');
        if(!re.test(v.example))continue;
        const blanked=v.example.replace(re,'_____');
        const correct=v.example.match(re)?.[0]||token;
        const others=shuffle(VOCABULARY.filter(x=>x.id!==v.id).map(x=>x.base||x.word)).filter(x=>x&&x.toLocaleLowerCase()!==correct.toLocaleLowerCase()).slice(0,3);
        cloze.push({id:`vf${v.id}`,topic:'vocabulary',prompt:`Fill the missing word: “${blanked}”`,correct,options:shuffle([correct,...others]),explanation:`${v.term} means “${v.meaning}”. Full sentence: ${v.example} — ${v.translation}`,kind:'vocabulary',vocabId:v.id});
      }
      return cloze;
    }
    if(mode==='context'){
      return VOCABULARY.map(v=>({id:`vc${v.id}`,topic:'vocabulary',prompt:`Choose the option that correctly completes this sentence: “${v.example.replace(/[.!?]$/,'')}”`,correct:v.example,options:shuffle([v.example,...shuffle(VOCABULARY.filter(x=>x.id!==v.id).map(x=>x.example)).filter(x=>x!==v.example).slice(0,3)]),explanation:`${v.term}: ${v.meaning}. Translation: ${v.translation}`,kind:'vocabulary',vocabId:v.id}));
    }
    return VOCAB_Q;
  }
  function getPool(topic,mode){
    if(topic==='vocabulary'||['meaning','english-de','article','plural','context','fill'].includes(mode)){
      if(mode==='english-de'||mode==='article'||mode==='plural'||mode==='context'||mode==='fill')return makeVocabMode(mode);
      return VOCAB_Q;
    }
    if(topic==='all')return allQuestions();
    return allQuestions().filter(q=>q.topic===topic);
  }
  function beginQuiz({topic='all',count=10,mode='meaning',title='',mock=false,timed=false,questions=null}={}){
    let pool=questions||getPool(topic,mode);
    if(!pool.length){toast('No questions in that filter yet. Try all topics.');return;}
    let selected;
    if(mock){
      const grammar=shuffle(GRAMMAR_Q).slice(0,Math.min(count-8,22));
      const vocab=shuffle(VOCAB_Q).slice(0,Math.max(0,count-grammar.length));selected=shuffle([...grammar,...vocab]).slice(0,count);
    } else selected=shuffle(pool).slice(0,Math.min(Number(count)||10,pool.length));
    activeQuiz={questions:selected,index:0,answers:[],feedback:null,selected:null,topic,title:title||'Practice quiz',mock,timed,started:Date.now(),seconds:timed?20*60:0,deadline:timed?Date.now()+20*60*1000:null};
    touchStudy(`Started ${activeQuiz.title}`);
    currentPage='quiz';$('#page-crumb').textContent=activeQuiz.title;
    if(quizTimer)clearInterval(quizTimer);
    if(timed)quizTimer=setInterval(()=>{if(!activeQuiz)return;const remain=Math.max(0,Math.ceil((activeQuiz.deadline-Date.now())/1000));const el=$('#quiz-time');if(el)el.textContent=formatTime(remain);if(remain<=0){clearInterval(quizTimer);finishQuiz(true);}},1000);
    renderPage();window.scrollTo({top:0,behavior:'smooth'});
  }
  function formatTime(s){return `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;}
  function renderQuiz(root){
    const q=activeQuiz.questions[activeQuiz.index];const idx=activeQuiz.index+1;const currentAnswer=activeQuiz.answers[activeQuiz.index];const hasFeedback=!!activeQuiz.feedback;const isMock=activeQuiz.mock;
    const options=q.options.map((o,i)=>`<label class="answer-option ${activeQuiz.selected===o?'selected':''} ${hasFeedback&&o===q.correct?'correct-answer':''}"><input type="radio" name="quiz-option" value="${escapeHtml(o)}" ${activeQuiz.selected===o?'checked':''} ${hasFeedback?'disabled':''}/><span class="option-key">${String.fromCharCode(65+i)}</span><span>${escapeHtml(o)}</span></label>`).join('');
    let feedback='';if(hasFeedback&&!isMock){const correct=activeQuiz.feedback.correct;feedback=`<div class="quiz-feedback ${correct?'correct':'incorrect'}"><strong>${correct?'✓ Correct answer':'✕ Not quite — review the rule'}</strong><p>${correct?'Well done. ':`Correct answer: ${escapeHtml(q.correct)}. `}${escapeHtml(q.explanation)}</p></div>`;}
    const nav=isMock?`<div class="divider"></div><div class="quiz-question-nav">${activeQuiz.questions.map((_,i)=>`<button class="btn small ${i===activeQuiz.index?'primary':''} ${activeQuiz.answers[i]?'':'ghost'}" data-action="mock-jump" data-index="${i}" ${i===activeQuiz.index?'disabled':''}>${i+1}</button>`).join('')}</div>`:'';
    root.innerHTML=`<div class="page-heading"><div><div class="eyebrow">${isMock?'CUSTOM CLASSROOM MOCK EXAM':'ACTIVE PRACTICE SESSION'}</div><h1>${escapeHtml(activeQuiz.title)}<span class="text-accent">.</span></h1><p>${isMock?'Answers and explanations remain hidden until you submit the examination.':'Choose the best answer. Feedback explains the rule, not just the answer.'}</p></div><div class="title-actions"><button class="btn ghost" data-action="exit-quiz">${isMock?'Exit test':'End session'}</button></div></div><div class="quiz-shell"><div class="quiz-topline"><div class="quiz-progress"><span style="width:${Math.round(idx/activeQuiz.questions.length*100)}%"></span></div><div class="quiz-meta">${idx} / ${activeQuiz.questions.length}</div>${activeQuiz.timed?`<div class="quiz-meta tag gold" id="quiz-time">${formatTime(Math.max(0,Math.ceil((activeQuiz.deadline-Date.now())/1000)))}</div>`:''}</div><section class="panel quiz-card"><div class="quiz-context"><span class="tag ${q.kind==='vocabulary'?'blue':'gold'}">${q.topic==='vocabulary'?'VOCABULARY':(TOPICS.find(t=>t.id===q.topic)?.name||q.topic).toUpperCase()}</span><span class="tag">LEVEL ${q.level||2}</span></div><h2>${escapeHtml(q.prompt)}</h2><div class="answer-options">${options}</div>${feedback}${nav}<div class="quiz-actions"><span class="quiz-hint">${isMock?'No answers are shown until the test ends.':'One best answer · Read the explanation after checking.'}</span>${hasFeedback?`<button class="btn primary" data-action="quiz-next">${idx===activeQuiz.questions.length?'See results':'Next question'} →</button>`:`<button class="btn primary" data-action="quiz-submit">${isMock?'Save answer & continue':'Check answer'} →</button>`}</div></section></div>`;
  }
  function submitQuizAnswer(){
    if(!activeQuiz)return;
    const q=activeQuiz.questions[activeQuiz.index];const chosen=$('input[name="quiz-option"]:checked')?.value||activeQuiz.selected;
    if(!chosen){toast('Choose an answer before continuing.');return;}
    activeQuiz.selected=chosen;activeQuiz.answers[activeQuiz.index]=chosen;
    state.todayAnswered=(state.todayAnswered||0)+1;state.todayDate=dateKey(new Date());saveState();
    if(activeQuiz.mock){if(activeQuiz.index>=activeQuiz.questions.length-1)finishQuiz(false);else{activeQuiz.index++;activeQuiz.selected=null;renderPage();}return;}
    const correct=chosen===q.correct;activeQuiz.feedback={correct,chosen};
    if(!correct){const item={id:q.id,question:q,picked:chosen,correct:q.correct,explanation:q.explanation,date:dateKey(new Date())};state.mistakes=state.mistakes.filter(m=>m.id!==item.id);state.mistakes.unshift(item);state.mistakes=state.mistakes.slice(0,120);saveState();}
    renderPage();
  }
  function nextQuizQuestion(){
    if(!activeQuiz)return;
    if(activeQuiz.index>=activeQuiz.questions.length-1){finishQuiz(false);return;}
    activeQuiz.index++;activeQuiz.selected=null;activeQuiz.feedback=null;renderPage();
  }
  function finishQuiz(timeExpired=false){
    if(!activeQuiz)return;
    if(quizTimer){clearInterval(quizTimer);quizTimer=null;}
    const quiz=activeQuiz;const rows=quiz.questions.map((q,i)=>({q,answer:quiz.answers[i]||'',correct:quiz.answers[i]===q.correct}));const score=rows.filter(r=>r.correct).length;
    const topicStats={};for(const r of rows){topicStats[r.q.topic] ||= {total:0,correct:0};topicStats[r.q.topic].total++;if(r.correct)topicStats[r.q.topic].correct++;}
    const record={date:dateKey(new Date()),title:quiz.title,score,total:rows.length,percent:Math.round(score/Math.max(1,rows.length)*100),topics:Object.keys(topicStats),topicStats,mock:quiz.mock,timeExpired};state.scores.unshift(record);state.scores=state.scores.slice(0,50);touchStudy(`Completed ${quiz.title} · ${score}/${rows.length}`);
    activeQuiz=null;
    $('#page-crumb').textContent='Results';
    $('#app-content').innerHTML=renderResults(record,rows);
  }
  function renderResults(record,rows){
    const pct=record.percent;const label=pct>=90?'Excellent work':pct>=75?'Strong progress':pct>=55?'Good foundation':'Review and try again';
    const breakdown=Object.entries(record.topicStats).map(([topic,s])=>{const name=topic==='vocabulary'?'Vocabulary':TOPICS.find(t=>t.id===topic)?.name||topic;const pc=Math.round(s.correct/s.total*100);return `<div style="margin:10px 0"><div style="display:flex;justify-content:space-between;gap:10px;font-size:10px"><strong>${escapeHtml(name)}</strong><span class="muted">${s.correct}/${s.total} · ${pc}%</span></div><div class="progress-bar"><span style="width:${pc}%;background:${pc>=70?'var(--green)':'var(--accent)'}"></span></div></div>`;}).join('');
    const review=rows.map((r,i)=>`<div class="mistake-row"><div><strong>${i+1}. ${escapeHtml(r.q.prompt)}</strong><small class="${r.correct?'text-green':'text-red'}">Your answer: ${escapeHtml(r.answer||'No answer')} ${r.correct?'✓':'· Correct: '+escapeHtml(r.q.correct)}</small><small>${escapeHtml(r.q.explanation)}</small></div><span class="tag ${r.correct?'green':'red'}">${r.correct?'CORRECT':'REVIEW'}</span></div>`).join('');
    const weak=Object.entries(record.topicStats).filter(([t,s])=>s.correct/s.total<.7).map(([t])=>TOPICS.find(x=>x.id===t)?.name||'Vocabulary');
    return `<div class="page-heading"><div><div class="eyebrow">SESSION COMPLETE · SAVED LOCALLY</div><h1>Your results<span class="text-accent">.</span></h1><p>${record.timeExpired?'The timer ended; the test has been submitted.':'Review what you know and use the topic breakdown to decide what to revise next.'}</p></div><div class="title-actions"><button class="btn" data-page="practice">New practice</button><button class="btn primary" data-action="retake-last">Retake quiz ↻</button></div></div><div class="quiz-shell"><section class="panel result-hero"><span class="tag ${pct>=70?'green':'gold'}">${record.mock?'MOCK EXAMINATION':'PRACTICE RESULT'}</span><div class="result-score">${pct}%</div><h2>${label}</h2><p>You answered <strong>${record.score} of ${record.total}</strong> questions correctly.</p><div class="result-grid"><div class="result-stat"><strong>${record.score}</strong><span>Correct answers</span></div><div class="result-stat"><strong>${record.total-record.score}</strong><span>Incorrect answers</span></div><div class="result-stat"><strong>${record.total}</strong><span>Total questions</span></div></div>${weak.length?`<div class="notice" style="text-align:left"><strong>Topics to revisit:</strong> ${escapeHtml(uniq(weak).join(', '))}. Open a lesson or use “Practise mistakes again”.</div>`:`<div class="notice">Strong performance across the topics tested. Try a fresh version to confirm consistency.</div>`}</section><div class="grid" style="grid-template-columns:minmax(0,1fr);margin-top:14px"><section class="panel"><div class="panel-head"><div><h2>Topic performance</h2><p>Accuracy is calculated from answers in this session.</p></div></div>${breakdown}</section><section class="panel"><div class="panel-head"><div><h2>Answer review</h2><p>Every answer includes feedback so you can understand the rule.</p></div><button class="btn small" data-action="practice-mistakes-from-results">Practise missed answers</button></div>${review}</section></div></div>`;
  }

  const TRANSFORMS = [
    {target:'Aussagesatz → Satzfrage',source:'Du musst deine Mutter heute anrufen.',answer:'Musst du deine Mutter heute anrufen?',alts:['Musst du heute deine Mutter anrufen?'],why:'The modal musst moves to position 1, the subject du follows, and anrufen stays as a complete infinitive at the end.'},
    {target:'Aussagesatz → W-Frage (ask when)',source:'Du stehst morgen um sieben Uhr auf.',answer:'Wann stehst du morgen auf?',alts:['Wann stehst du um sieben Uhr auf?'],why:'The question word wann asks for the time. The finite verb stehst follows the W-word; the prefix auf remains at the end.'},
    {target:'Aussagesatz → Imperativ (du)',source:'Du machst bitte die Tür auf.',answer:'Mach bitte die Tür auf!',alts:['Mach bitte die Tür auf.'],why:'The du imperative omits du. Mach is the command form, and the separable prefix auf stays at the end.'},
    {target:'Aussagesatz → Satzfrage',source:'Du kaufst einen Apfel ein.',answer:'Kaufst du einen Apfel ein?',alts:['Kaufst du einen Apfel ein.'],why:'Move kaufst to the first position; keep the subject du after it and the prefix ein at the end.'},
    {target:'Aussagesatz → W-Frage (ask where)',source:'Du wohnst in Berlin.',answer:'Wo wohnst du?',alts:[],why:'Wo asks about a place. The W-word comes first, followed by the finite verb and the subject.'},
    {target:'Satzfrage → Aussagesatz',source:'Kannst du mir helfen?',answer:'Du kannst mir helfen.',alts:['Du kannst mir helfen'],why:'Return the subject to position 1 and put the conjugated modal kannst in position 2. Helfen remains the infinitive at the end.'},
    {target:'Aussagesatz → Satzfrage',source:'Er ruft seine Mutter an.',answer:'Ruft er seine Mutter an?',alts:['Ruft er seine Mutter an'],why:'The finite verb part ruft moves to position 1; an remains at the end.'},
    {target:'W-Frage → Aussagesatz',source:'Wann beginnt der Kurs?',answer:'Der Kurs beginnt.',alts:[],why:'A statement normally places the subject first and the conjugated verb second. The information asked about can be omitted.'},
    {target:'Aussagesatz → W-Frage (ask why)',source:'Du musst heute lernen.',answer:'Warum musst du heute lernen?',alts:['Warum musst du lernen?'],why:'Warum replaces the reason. The modal musst follows the W-word; lernen stays infinitive at the end.'},
    {target:'Aussagesatz → Imperativ (Sie)',source:'Sie öffnen bitte das Fenster.',answer:'Öffnen Sie bitte das Fenster!',alts:['Öffnen Sie bitte das Fenster.'],why:'The formal imperative is infinitive + Sie. Keep the polite word bitte if it is in the prompt.'},
    {target:'Aussagesatz → Imperativ (ihr)',source:'Ihr kommt bitte herein.',answer:'Kommt bitte herein!',alts:['Kommt bitte herein.'],why:'Use the ihr verb form kommt but omit the subject ihr.'},
    {target:'Aussagesatz → Satzfrage',source:'Ihr habt einen Hund.',answer:'Habt ihr einen Hund?',alts:['Habt ihr einen Hund'],why:'Habt is the finite verb for ihr and moves to the first position in a yes/no question.'},
    {target:'Aussagesatz → W-Frage (ask whom)',source:'Du rufst deinen Bruder an.',answer:'Wen rufst du an?',alts:[],why:'Wen asks for the accusative person being called. The object is replaced by the question word; an stays at the end.'},
    {target:'Replace noun with personal pronoun',source:'Ich sehe den Mann.',answer:'Ich sehe ihn.',alts:['Ich sehe ihn'],why:'Den Mann is masculine accusative, so replace it with ihn—not er or ihm.'},
    {target:'Replace noun with personal pronoun',source:'Ich helfe der Mutter.',answer:'Ich helfe ihr.',alts:['Ich helfe ihr'],why:'Helfen requires dative. Die Mutter becomes der Mutter, then ihr as a pronoun.'},
    {target:'Add a possessive determiner',source:'Das ist ___ Schwester. (ich)',answer:'Das ist meine Schwester.',alts:['Das ist meine Schwester'],why:'Schwester is feminine nominative, so mein takes -e: meine Schwester.'},
    {target:'Use a modal verb',source:'Ich / morgen / früh / aufstehen (müssen)',answer:'Ich muss morgen früh aufstehen.',alts:['Morgen muss ich früh aufstehen.'],why:'Conjugate müssen to muss; keep the separable infinitive aufstehen together at the end.'},
    {target:'Correct the case',source:'Ich helfe die Mutter.',answer:'Ich helfe der Mutter.',alts:['Ich helfe der Mutter'],why:'Helfen takes dative. Feminine die becomes der in dative.'},
    {target:'Correct the case',source:'Ich sehe der Mann.',answer:'Ich sehe den Mann.',alts:['Ich sehe den Mann'],why:'Sehen takes accusative. Masculine der changes to den.'},
    {target:'Use the dative and accusative objects',source:'Der Mann / dem Kind / einen Apfel / geben',answer:'Der Mann gibt dem Kind einen Apfel.',alts:['Der Mann gibt dem Kind einen Apfel'],why:'The subject is Der Mann (nominative); the recipient dem Kind is dative; the thing given einen Apfel is accusative.'},
    {target:'Aussagesatz → Satzfrage',source:'Du darfst hier sitzen.',answer:'Darfst du hier sitzen?',alts:['Darfst du hier sitzen'],why:'Move the finite modal darfst to the beginning. Sitzen remains infinitive.'},
    {target:'Aussagesatz → W-Frage (ask the time)',source:'Der Kurs fängt um neun Uhr an.',answer:'Um wie viel Uhr fängt der Kurs an?',alts:['Wann fängt der Kurs an?'],why:'The finite part fängt follows the question phrase; an stays at the end. Wann is also valid if the task asks generally “when”.'},
    {target:'Aussagesatz → Imperativ (du)',source:'Du rufst deine Mutter an.',answer:'Ruf deine Mutter an!',alts:['Ruf deine Mutter an.'],why:'Use the du imperative Ruf and move the prefix an to the end.'},
    {target:'Aussagesatz with time in position 1',source:'Ich lerne heute Deutsch. (start with Heute)',answer:'Heute lerne ich Deutsch.',alts:['Heute lerne ich Deutsch'],why:'When Heute takes first position, the finite verb lerne must still be in position 2, so the subject follows it.'},
    {target:'Aussagesatz → Satzfrage',source:'Wir wollen Pizza essen.',answer:'Wollen wir Pizza essen?',alts:['Wollen wir Pizza essen'],why:'Wollen is the conjugated modal for wir and moves first. Essen remains infinitive.'},
    {target:'Use an ordinal in a date',source:'My birthday is on October 18th.',answer:'Mein Geburtstag ist am achtzehnten Oktober.',alts:['Mein Geburtstag ist am 18. Oktober.','Mein Geburtstag ist am achtzehnten Oktober'],why:'For a date after am, use the ordinal with the -en ending: am achtzehnten Oktober.'},
    {target:'Aussagesatz → W-Frage (ask the recipient)',source:'Du gibst deiner Schwester das Buch.',answer:'Wem gibst du das Buch?',alts:[],why:'Wem asks for the dative recipient; the recipient phrase is replaced by wem.'},
    {target:'Add a possessive determiner in Akkusativ',source:'Ich besuche ___ Vater. (ich)',answer:'Ich besuche meinen Vater.',alts:['Ich besuche meinen Vater'],why:'Besuchen takes accusative. Masculine Vater takes meinen in accusative.'},
    {target:'Use the correct modal form',source:'Er / nicht / kommen / können',answer:'Er kann nicht kommen.',alts:['Er kann nicht kommen'],why:'For er, können becomes kann; kommen is the infinitive at the end.'},
    {target:'Correct verb position',source:'Heute ich muss einkaufen.',answer:'Heute muss ich einkaufen.',alts:['Heute muss ich einkaufen'],why:'In a main clause, the finite verb is in position 2. A time phrase in position 1 means the subject comes after the verb.'},
    {target:'Statement → W-question (ask what)',source:'Du kaufst einen Apfel.',answer:'Was kaufst du?',alts:[],why:'Was replaces the object being bought. Do not keep the same object after the question word.'},
    {target:'Imperativ with irregular verb',source:'Du nimmst den Apfel.',answer:'Nimm den Apfel!',alts:['Nimm den Apfel'],why:'Nehmen has the irregular du imperative Nimm! The subject du is omitted.'},
    {target:'Imperativ → Aussagesatz',source:'Ruf bitte deine Mutter an!',answer:'Du rufst bitte deine Mutter an.',alts:['Du rufst bitte deine Mutter an'],why:'A statement adds the subject du and uses the finite form rufst in position 2. The separable prefix an remains at the end.'}
  ];
  function renderTransform(){
    const t=TRANSFORMS[transformIndex%TRANSFORMS.length];const feedback=transformFeedback?`<div class="quiz-feedback ${transformFeedback.correct?'correct':'incorrect'}"><strong>${transformFeedback.correct?'✓ Good transformation':'Model answer and rule'}</strong><p>${transformFeedback.correct?'Your answer matches an accepted form. ':`Model answer: ${escapeHtml(t.answer)} `}${escapeHtml(t.why)}</p>${!transformFeedback.correct?`<button class="btn small" style="margin-top:10px" data-action="transform-self-check">I understand now ✓</button>`:''}</div>`:'';
    return `<div class="page-heading"><div><div class="eyebrow">INTERACTIVE WORD-ORDER WORKSHOP</div><h1>Sentence transformation lab<span class="text-accent">.</span></h1><p>Do not just memorise an answer. Work out what the task asks, identify the finite verb, and rebuild the sentence.</p></div><div class="title-actions"><span class="tag gold">CHALLENGE ${String((transformIndex%TRANSFORMS.length)+1).padStart(2,'0')} / ${TRANSFORMS.length}</span></div></div><div class="trans-lab"><section class="panel transform-card"><div class="transform-target">${escapeHtml(t.target)}</div><div class="quiz-context">STARTING SENTENCE / PROMPT</div><div class="transform-source">${escapeHtml(t.source)}</div><div class="transform-helper">Write the transformed sentence below. Punctuation and capitalisation are normalised; grammar is not guessed.</div><input class="answer-input" id="transform-answer" type="text" placeholder="Type your German answer…" ${transformFeedback?'disabled':''} autocomplete="off"/><div class="quiz-actions" style="margin-top:13px"><span class="quiz-hint">${state.transformTried} attempts · ${state.transformCorrect} self-checked correct</span>${transformFeedback?`<button class="btn primary" data-action="transform-next">Next challenge →</button>`:`<button class="btn primary" data-action="transform-check">Check transformation →</button>`}</div>${feedback}</section><aside class="panel transform-side"><h3>Three-step transformation method</h3><ul><li>Identify the target: question, statement or command.</li><li>Mark the finite verb and subject.</li><li>Check where the prefix, modal infinitive, object and time phrase belong.</li></ul><div class="divider"></div><h3>Quick formula</h3><p><strong class="text-accent">W-Frage:</strong> W-word + verb + subject …</p><p><strong class="text-accent">Yes/no:</strong> verb + subject …?</p><p><strong class="text-accent">Statement:</strong> verb in position 2.</p><p><strong class="text-accent">Modal:</strong> modal … infinitive last.</p><div class="divider"></div><button class="btn" style="width:100%" data-action="transform-random">↻ Random challenge</button></aside></div>`;
  }
  function checkTransform(){const t=TRANSFORMS[transformIndex%TRANSFORMS.length];const val=$('#transform-answer')?.value||'';if(!val.trim()){toast('Write an answer first.');return;}const accepted=[t.answer,...(t.alts||[])].map(norm);const correct=accepted.includes(norm(val));transformFeedback={correct,value:val};state.transformTried++;if(correct)state.transformCorrect++;state.todayAnswered=(state.todayAnswered||0)+1;touchStudy(`Sentence lab · ${correct?'correct transformation':'reviewed a transformation'}`);renderPage();}
  function nextTransform(){transformIndex=(transformIndex+1+Math.floor(Math.random()*(TRANSFORMS.length-1)))%TRANSFORMS.length;transformFeedback=null;renderPage();}

  function renderPracticeSetup(){return `<div class="page-heading"><div><div class="eyebrow">BUILD A PRACTICE SESSION</div><h1>Practice centre<span class="text-accent">.</span></h1><p>Choose a focus and a session length. Questions are automatically marked and weak answers go into your mistake notebook.</p></div><div class="title-actions"><span class="tag gold">${allQuestions().length} AVAILABLE ITEMS</span></div></div><div class="practice-layout"><section class="panel practice-controls"><h2>Session settings</h2><p class="muted" style="font-size:10px">Tune the quiz to your current goal.</p><label class="field-label" for="practice-topic">Focus area</label><select class="select" id="practice-topic"><option value="all">Mixed grammar + vocabulary</option>${TOPICS.map(t=>`<option value="${t.id}">${t.name}</option>`).join('')}<option value="vocabulary">Vocabulary only</option></select><label class="field-label" for="practice-mode">Question mode</label><select class="select" id="practice-mode"><option value="standard">Standard exam practice</option><option value="meaning">German → English meaning</option><option value="english-de">English → German</option><option value="article">Article challenge</option><option value="plural">Plural challenge</option><option value="context">Vocabulary in context</option><option value="fill">Fill the missing word</option></select><label class="field-label" for="practice-count">Number of questions</label><select class="select" id="practice-count"><option value="5">5 · Quick warm-up</option><option value="10" selected>10 · Focus session</option><option value="20">20 · Exam practice</option><option value="30">30 · Deep revision</option><option value="50">50 · Long challenge</option></select><button class="btn primary" data-action="start-practice">Start practice →</button><button class="btn" data-action="start-daily">✦ Daily challenge (5)</button><div class="divider"></div><div class="notice"><strong>Automatic scoring:</strong> Selected-answer questions are marked objectively. For sentence transformations, the separate lab shows the model answer instead of guessing at an unrestricted typed response.</div></section><div><section class="panel practice-intro"><div class="eyebrow">YOUR A1 WORKOUT</div><h2>Understand it. Retrieve it. Use it.</h2><p>Move between grammar rules and vocabulary so that articles, pronouns, verb position and meaning become usable skills rather than isolated facts.</p><div class="hero-actions"><button class="btn" data-page="lessons">▤ Review grammar</button><button class="btn" data-page="vocabulary">Aa Study vocabulary</button><button class="btn" data-page="transform">⇄ Transform a sentence</button></div><div class="practice-modes"><div class="mode-chip"><strong>Grammar bank</strong><span>${GRAMMAR_Q.length}+ curated questions across all 12 topics.</span></div><div class="mode-chip"><strong>Vocabulary bank</strong><span>Every one of the 295 supplied entries can be quizzed.</span></div><div class="mode-chip"><strong>Review loop</strong><span>Incorrect answers are saved with the explanation.</span></div></div></section><section class="panel" style="margin-top:14px"><div class="panel-head"><div><h2>Recommended next step</h2><p>Based on saved progress</p></div></div>${recommendNext()}</section></div></div>`;}
  function recommendNext(){
    if(state.mistakes.length)return `<div class="activity-item"><div class="activity-icon">↺</div><div><strong>Review ${state.mistakes.length} saved mistake${state.mistakes.length===1?'':'s'}</strong><small>Revisit the rule and then retry the question.</small></div><button class="btn small" data-page="mistakes">Review →</button></div>`;
    const next=TOPICS.find(t=>!state.completedTopics.includes(t.id))||TOPICS[0];return `<div class="activity-item"><div class="activity-icon">▤</div><div><strong>${next.name}</strong><small>${next.desc}</small></div><button class="btn small" data-action="open-lesson" data-topic="${next.id}">Open →</button></div>`;
  }

  function renderFlashcards(){
    if(!flashOrder.length)flashOrder=shuffle(VOCABULARY.map(v=>v.id));const v=vocabById.get(flashOrder[flashIndex%flashOrder.length]||1)||VOCABULARY[0];
    return `<div class="page-heading"><div><div class="eyebrow">ACTIVE RECALL · VOCABULARY</div><h1>Flashcards<span class="text-accent">.</span></h1><p>Try to recall the meaning before revealing it. Mark words learned or save difficult words for revision.</p></div><div class="title-actions"><button class="btn" data-page="vocabulary">Browse all words</button></div></div><div class="flashcard-wrap"><button class="flashcard" data-action="flip-flashcard" aria-label="Flip flashcard"><span class="fc-label">${flashBack?'ANSWER':'GERMAN WORD'} · CARD ${flashIndex+1} / ${flashOrder.length}</span>${flashBack?`<h2>${escapeHtml(v.meaning)}</h2><p>${escapeHtml(v.term)}${v.plural?` · plural: ${escapeHtml(v.plural)}`:''}</p><div class="fc-example"><strong>${escapeHtml(v.example)}</strong><br><span class="muted">${escapeHtml(v.translation)}</span></div>`:`<h2>${escapeHtml(v.term)}</h2><p>${v.article?`Article: ${escapeHtml(v.article)} · `:''}${escapeHtml(v.category)}</p><div class="fc-example">Think of the English meaning, article or plural before you reveal the answer.</div>`}<p class="muted" style="font-size:9px;margin-top:17px">Click card or “Reveal / hide answer”</p></button><div class="flashcard-controls"><button class="btn" data-action="flash-prev">← Previous</button><button class="btn primary" data-action="flip-flashcard">${flashBack?'Hide answer':'Reveal answer'}</button><button class="btn" data-action="flash-next">Next →</button></div><div class="flashcard-controls"><button class="btn small ${state.learnedWords.includes(v.id)?'primary':''}" data-action="learn-word" data-id="${v.id}">${state.learnedWords.includes(v.id)?'✓ Learned':'Mark learned'}</button><button class="btn small ${state.starredWords.includes(v.id)?'primary':''}" data-action="star-word" data-id="${v.id}">${state.starredWords.includes(v.id)?'★ Saved for revision':'☆ Save for revision'}</button><button class="btn small" data-action="shuffle-flashcards">Shuffle deck ↻</button></div><div class="flashcard-progress">${state.learnedWords.length}/295 words marked learned · ${state.starredWords.length} in revision list</div></div>`;
  }

  function renderQuickRevision(){
    return `<div class="page-heading"><div><div class="eyebrow">EXAM-DAY REFERENCE SHEETS</div><h1>Quick revision<span class="text-accent">.</span></h1><p>Compact reference tables for a final pass through the rules. Use the full lessons if a shortcut feels unclear.</p></div><div class="title-actions"><button class="btn primary" data-action="start-daily">Daily challenge →</button></div></div><div class="quick-grid">
      ${quickCard('Sentence word order','Finite verb in position 2',['Ich lerne heute Deutsch.','Heute lerne ich Deutsch.','Ich muss heute lernen.','Ich stehe um sieben Uhr auf.'],'Position 2 means second sentence element. Prefixes split at the end; modal infinitives stay together at the end.')}
      ${quickCard('Question formation','Know what information is requested',['W-word + verb + subject …?','Verb + subject + …?','Wo wohnst du?','Wohnst du in Berlin?'],'Wer / wen / wem differ by case. In a yes/no question, the finite verb starts the sentence.')}
      ${quickCard('Imperative','Commands vary by person',['du: Lern! / Nimm! / Lies!','ihr: Lernt! / Nehmt! / Lest!','Sie: Lernen Sie!','Steh früh auf!'],'The informal subject is normally omitted. With a separable verb, the prefix goes at the end.')}
      ${quickCard('Modal verbs','Modal conjugated + infinitive at end',['können: kann / kannst / kann','müssen: muss / musst / muss','dürfen: darf / darfst / darf','Ich muss morgen aufstehen.'],'Also revise wollen, sollen, mögen and möchten. After a modal, use the full infinitive: anrufen, aufmachen, einkaufen.')}
      ${quickCard('Separable verbs','Statements split; modal infinitives do not',['Ich rufe dich an.','Wann rufst du an?','Ruf mich an!','Ich muss dich anrufen.'],'Common prefixes in this course include auf-, an-, ein-, aus-, mit-, ab-, zurück- and fern-.')}
      ${quickCard('Personal pronouns','Three cases, different forms',['ich → mich → mir','du → dich → dir','er → ihn → ihm','sie → sie → ihr · es → es → ihm','wir → uns → uns · ihr → euch → euch','sie → sie → ihnen · Sie → Sie → Ihnen'],'Sehen, besuchen, haben and anrufen commonly take accusative. Helfen, danken and gefallen take dative.')}
      ${quickCard('Possessive determiners','Ending matches the noun and case',['mein Bruder · meine Schwester','meinen Bruder (Akk. masc.)','mein Buch · meine Eltern','meinem Bruder · meiner Schwester (Dat.)'],'Owner picks the base; noun gender, number and case pick the ending. Remember euer → eure / euren and formal Ihr / Ihre.')}
      ${quickCard('Nominativ · Akkusativ · Dativ','Identify the job of each noun phrase',['Der Mann kauft einen Apfel.','Der Mann gibt dem Kind einen Apfel.','Nom.: der Mann','Akk.: einen Apfel · Dat.: dem Kind'],'Nominativ = subject; Akkusativ = direct object; Dativ = recipient or a case required by a verb/preposition. Movement alone does not determine case.')}
      ${quickCard('Articles by case','Masculine shows the clearest change',['Nom.: der / ein · die / eine · das / ein','Akk.: den / einen · die / eine · das / ein','Dat.: dem / einem · der / einer · dem / einem','Plural Dat.: den + often -n'],'Mit, zu, von and bei take dative. Durch takes accusative. Learn the case required by the word/preposition, not an English shortcut.')}
      ${quickCard('Ordinal numbers','Numbers and dates',['1 erste · 2 zweite · 3 dritte','4 vierte · 5 fünfte · 8 achte','20 zwanzigste · 21 einundzwanzigste','am fünften Mai · am achtzehnten Oktober'],'For a date, am + ordinal generally takes -en. “Heute ist der dritte Oktober” uses a different form from “am dritten Oktober”.')}
      </div><div class="section-row"><div><h2>Need more practice?</h2><p>Turn the reference sheet into a test rather than only rereading it.</p></div><button class="btn primary" data-page="practice">Open practice centre →</button></div>`;
  }
  function quickCard(title,sub,lines,explain){return `<section class="panel quick-card"><h3>${title}</h3><p>${sub}</p><table class="data-table"><tbody>${lines.map(x=>`<tr><td>${escapeHtml(x)}</td></tr>`).join('')}</tbody></table><p style="margin-top:10px">${escapeHtml(explain)}</p></section>`;}

  function renderMistakes(){
    const rows=state.mistakes.map((m,i)=>`<div class="mistake-row"><div><strong>${i+1}. ${escapeHtml(m.question.prompt)}</strong><small class="text-red">Your answer: ${escapeHtml(m.picked||'No answer')}</small><small class="mistake-answer">Correct: ${escapeHtml(m.correct)}</small><small>${escapeHtml(m.explanation)}</small><small>Saved on ${escapeHtml(m.date||'')}</small></div><button class="btn small" data-action="practice-one-mistake" data-id="${escapeHtml(m.id)}">Try again ↻</button></div>`).join('');
    return `<div class="page-heading"><div><div class="eyebrow">LEARN FROM EVERY ERROR</div><h1>Mistake notebook<span class="text-accent">.</span></h1><p>Incorrect answers are saved with the question, your answer, the correct answer and a short explanation. Items are stored locally.</p></div><div class="title-actions">${state.mistakes.length?`<button class="btn primary" data-action="practice-all-mistakes">Practise mistakes again →</button><button class="btn danger" data-action="clear-mistakes">Clear notebook</button>`:''}</div></div>${state.mistakes.length?`<section class="panel"><div class="panel-head"><div><h2>${state.mistakes.length} saved item${state.mistakes.length===1?'':'s'}</h2><p>Repeat the rule in your own words before retrying.</p></div><span class="tag red">REVIEW</span></div>${rows}</section>`:`<div class="empty-state"><div style="font-size:28px">✓</div><h3>Your notebook is clear</h3><p>Try a quiz. If an answer is incorrect, it will be saved here for another attempt.</p><button class="btn primary" data-page="practice">Start a practice session</button></div>`}`;
  }
  function renderMock(){const last=state.scores.find(s=>s.mock);return `<div class="page-heading"><div><div class="eyebrow">CLASSROOM REVISION · NOT AN OFFICIAL GOETHE EXAM</div><h1>Mock examination<span class="text-accent">.</span></h1><p>A custom A1 grammar and vocabulary test covering word order, sentence transformations, modal and separable verbs, pronouns, cases, ordinals and course vocabulary.</p></div><div class="title-actions"><span class="tag gold">2 VERSIONS</span></div></div><section class="mock-banner"><div><div class="eyebrow">EXAM SIMULATION</div><h2>Can you apply the rules under pressure?</h2><p>Each version draws a different mix of questions from the course bank. Answers and explanations stay hidden while you take the test, then a results report shows your score and weak topics.</p><label class="custom-check"><input type="checkbox" id="mock-timed" checked /> Enable 20-minute timer</label><div style="display:flex;gap:9px;flex-wrap:wrap;margin-top:17px"><button class="btn primary" data-action="start-mock" data-version="A">Start Version A →</button><button class="btn" data-action="start-mock" data-version="B">Start Version B →</button></div></div><div class="mock-facts"><div class="mock-fact"><b>30</b><span>questions per version</span></div><div class="mock-fact"><b>12</b><span>grammar topics</span></div><div class="mock-fact"><b>20m</b><span>optional timer</span></div></div></section><div class="mock-versions"><section class="panel mock-version"><span class="tag blue">VERSION A</span><h3>Balanced A1 revision</h3><p>Mixed grammar, cases, word order, date forms and vocabulary meanings. The question order changes on each attempt.</p><button class="btn" data-action="start-mock" data-version="A">Begin Version A</button></section><section class="panel mock-version"><span class="tag gold">VERSION B</span><h3>Fresh question mix</h3><p>A second randomised version using the same syllabus but a different set of questions, useful for retesting weak areas.</p><button class="btn" data-action="start-mock" data-version="B">Begin Version B</button></section></div><section class="panel"><div class="panel-head"><div><h2>Latest mock-test result</h2><p>Based on your saved test history.</p></div></div>${last?`<div class="result-grid"><div class="result-stat"><strong>${last.percent}%</strong><span>Latest score</span></div><div class="result-stat"><strong>${last.score}/${last.total}</strong><span>Correct answers</span></div><div class="result-stat"><strong>${escapeHtml(last.date)}</strong><span>Test date</span></div></div>`:`<div class="empty-activity">No mock tests completed yet. Start Version A or B to get your baseline.</div>`}</section><p class="muted" style="font-size:9px;margin-top:14px">This is a custom classroom revision tool, not an official Goethe-Institut examination or score certificate. Results are saved only in this browser unless you export your progress.</p>`;}

  function handleAction(btn){
    const action=btn.dataset.action;const id=Number(btn.dataset.id||0);const topic=btn.dataset.topic;const mode=btn.dataset.mode;
    switch(action){
      case 'go-quick':activateNav('quick');break;
      case 'continue-learning':selectedLesson=state.lastTopic||TOPICS.find(t=>!state.completedTopics.includes(t.id))?.id||'aussage';activateNav('lessons');break;
      case 'open-lesson':selectedLesson=topic||'aussage';state.lastTopic=selectedLesson;saveState();activateNav('lessons');break;
      case 'complete-topic':
        if(!state.completedTopics.includes(topic))state.completedTopics.push(topic);state.lastTopic=topic;touchStudy(`Completed lesson: ${LESSONS[topic].title}`);toast('Lesson marked complete. Keep practising to lock it in.');renderPage();break;
      case 'start-topic-quiz':beginQuiz({topic:topic||selectedLesson,count:10,mode:'standard',title:`${(TOPICS.find(t=>t.id===topic)||TOPICS[0]).name} quiz`});break;
      case 'prev-topic':case 'next-topic':{const ix=TOPICS.findIndex(t=>t.id===(topic||selectedLesson));const j=action==='prev-topic'?(ix-1+TOPICS.length)%TOPICS.length:(ix+1)%TOPICS.length;selectedLesson=TOPICS[j].id;state.lastTopic=selectedLesson;saveState();renderPage();break;}
      case 'start-practice':{const t=$('#practice-topic')?.value||'all';const m=$('#practice-mode')?.value||'standard';const c=Number($('#practice-count')?.value||10);beginQuiz({topic:t,count:c,mode:m,title:`${t==='all'?'Mixed A1':t==='vocabulary'?'Vocabulary':(TOPICS.find(x=>x.id===t)?.name||t)} practice`});break;}
      case 'start-daily':beginQuiz({topic:'all',count:5,mode:'standard',title:'Daily mixed challenge'});break;
      case 'start-random-practice':beginQuiz({topic:'all',count:10,mode:'standard',title:'Random mixed practice'});break;
      case 'start-vocab-quiz':beginQuiz({topic:'vocabulary',count:10,mode:mode||'meaning',title:`Vocabulary ${mode==='article'?'article':mode==='plural'?'plural':mode==='english-de'?'translation':'review'} quiz`});break;
      case 'toggle-vocab-translation':vocabReveal=!vocabReveal;renderPage();break;
      case 'clear-vocab-filter':vocabSearch='';vocabCategory='all';vocabKind='all';vocabSort='course';vocabPage=1;renderPage();break;
      case 'vocab-prev':vocabPage=Math.max(1,vocabPage-1);renderPage();break;
      case 'vocab-next':vocabPage++;renderPage();break;
      case 'learn-word':{
        const ix=state.learnedWords.indexOf(id);if(ix>=0){state.learnedWords.splice(ix,1);toast('Removed from learned words.');}else{state.learnedWords.push(id);touchStudy(`Learned vocabulary: ${vocabById.get(id)?.word||'word'}`);toast('Word marked learned.');}saveState();renderPage();break;}
      case 'star-word':{
        const ix=state.starredWords.indexOf(id);if(ix>=0){state.starredWords.splice(ix,1);toast('Removed from revision list.');}else{state.starredWords.push(id);touchStudy(`Saved vocabulary for revision: ${vocabById.get(id)?.word||'word'}`);toast('Added to your revision list.');}saveState();renderPage();break;}
      case 'review-word':{
        const ix=state.reviewWords.indexOf(id);if(ix>=0){state.reviewWords.splice(ix,1);toast('Removed from the review list.');}else{state.reviewWords.push(id);if(!state.starredWords.includes(id))state.starredWords.push(id);touchStudy(`Added vocabulary to review: ${vocabById.get(id)?.word||'word'}`);toast('Added to your revision list.');}saveState();renderPage();break;}
      case 'go-flashcards':flashOrder=shuffle(VOCABULARY.map(v=>v.id));flashIndex=0;flashBack=false;activateNav('flashcards');break;
      case 'flip-flashcard':flashBack=!flashBack;renderPage();break;
      case 'flash-prev':flashIndex=(flashIndex-1+flashOrder.length)%flashOrder.length;flashBack=false;renderPage();break;
      case 'flash-next':flashIndex=(flashIndex+1)%flashOrder.length;flashBack=false;renderPage();break;
      case 'shuffle-flashcards':flashOrder=shuffle(VOCABULARY.map(v=>v.id));flashIndex=0;flashBack=false;toast('Flashcard deck shuffled.');renderPage();break;
      case 'transform-check':checkTransform();break;
      case 'transform-next':nextTransform();break;
      case 'transform-random':transformIndex=Math.floor(Math.random()*TRANSFORMS.length);transformFeedback=null;renderPage();break;
      case 'transform-self-check':transformFeedback={correct:true,value:'self-checked'};state.transformCorrect++;touchStudy('Reviewed a sentence transformation');renderPage();break;
      case 'quiz-submit':submitQuizAnswer();break;
      case 'quiz-next':nextQuizQuestion();break;
      case 'exit-quiz':{if(activeQuiz?.mock&&!window.confirm('Exit this test? Answers will not be scored until you finish. Exit now?'))break;const ret=activeQuiz?.returnPage||'practice';if(quizTimer){clearInterval(quizTimer);quizTimer=null;}activeQuiz=null;currentPage=ret;activateNav(ret);toast('Session exited.');break;}
      case 'mock-jump':if(activeQuiz?.mock){activeQuiz.index=Number(btn.dataset.index||0);activeQuiz.selected=activeQuiz.answers[activeQuiz.index]||null;renderPage();}break;
      case 'start-mock':{const v=btn.dataset.version||'A';const timed=$('#mock-timed')?.checked??true;beginQuiz({topic:'all',count:30,mode:'standard',title:`Mock Examination — Version ${v}`,mock:true,timed});break;}
      case 'retake-last':if(lastQuizData){if(lastQuizData.mock)beginQuiz({topic:'all',count:lastQuizData.count,mode:'standard',title:lastQuizData.title+' · Retake',mock:true,timed:lastQuizData.timed});else beginQuiz({topic:lastQuizData.topic||'all',count:lastQuizData.count,mode:lastQuizData.mode||'standard',title:lastQuizData.title+' · Retake'});}else activateNav('practice');break;
      case 'practice-mistakes-from-results':case 'practice-all-mistakes':{
        const qs=state.mistakes.map(m=>m.question).filter(Boolean);if(!qs.length){toast('No saved mistakes to practise.');break;}beginQuiz({questions:qs,count:qs.length,title:'Mistake notebook review'});break;}
      case 'practice-one-mistake':{const m=state.mistakes.find(x=>x.id===btn.dataset.id);if(m)beginQuiz({questions:[m.question],count:1,title:'Single mistake review'});break;}
      case 'clear-mistakes':if(window.confirm('Clear all saved mistakes from this browser?')){state.mistakes=[];saveState();renderPage();toast('Mistake notebook cleared.');}break;
      default:break;
    }
  }
  let lastQuizData=null;
  // Preserve enough session settings for a proper retake button.
  const _finishQuiz = finishQuiz;
  finishQuiz = function(timeExpired=false){
    if(activeQuiz)lastQuizData={mock:activeQuiz.mock,timed:activeQuiz.timed,count:activeQuiz.questions.length,title:activeQuiz.title,topic:activeQuiz.topic,mode:activeQuiz.mode||'standard',questions:activeQuiz.questions};
    _finishQuiz(timeExpired);
  };

  document.addEventListener('click',e=>{
    const pageBtn=e.target.closest('[data-page]');
    if(pageBtn){if(activeQuiz&&pageBtn.dataset.page){toast('Finish or exit the active quiz before changing sections.');return;}activateNav(pageBtn.dataset.page);return;}
    const actionBtn=e.target.closest('[data-action]');if(actionBtn&&!actionBtn.disabled){handleAction(actionBtn);}
  });
  document.addEventListener('change',e=>{
    if(e.target.matches('input[name="quiz-option"]')){if(activeQuiz)activeQuiz.selected=e.target.value;$$('.answer-option').forEach(el=>el.classList.toggle('selected',!!$('input',el)?.checked));}
    if(e.target.id==='daily-target'){state.dailyTarget=Number(e.target.value)||10;saveState();renderPage();toast('Daily target updated.');}
    if(e.target.id==='vocab-category'){vocabCategory=e.target.value;vocabPage=1;renderPage();}
    if(e.target.id==='vocab-kind'){vocabKind=e.target.value;vocabPage=1;renderPage();}
    if(e.target.id==='vocab-sort'){vocabSort=e.target.value;vocabPage=1;renderPage();}
  });
  let vocabSearchTimer;
  document.addEventListener('input',e=>{
    if(e.target.id==='vocab-search'){
      clearTimeout(vocabSearchTimer);const val=e.target.value;const start=e.target.selectionStart;
      vocabSearchTimer=setTimeout(()=>{vocabSearch=val;vocabPage=1;const old=$('#vocab-search');const focused=document.activeElement===e.target;renderPage();if(focused&&$('#vocab-search')){const now=$('#vocab-search');now.focus();now.setSelectionRange(Math.min(start,val.length),Math.min(start,val.length));}},160);
    }
  });
  document.addEventListener('keydown',e=>{
    if(e.key==='Enter'&&e.target.id==='global-search'){
      const q=e.target.value.trim();if(!q)return;const l=TOPICS.find(t=>(t.name+' '+t.desc).toLocaleLowerCase().includes(q.toLocaleLowerCase()));
      const v=VOCABULARY.some(x=>(x.term+' '+x.meaning).toLocaleLowerCase().includes(q.toLocaleLowerCase()));
      if(l&&!v){selectedLesson=l.id;activateNav('lessons');}else{vocabSearch=q;vocabCategory='all';vocabKind='all';vocabPage=1;activateNav('vocabulary');}
    }
    if(e.key==='Enter'&&e.target.id==='transform-answer'&&!transformFeedback){e.preventDefault();checkTransform();}
    if(e.key==='Escape'&&$('#sidebar').classList.contains('open'))$('#sidebar').classList.remove('open');
  });
  $('#theme-toggle').addEventListener('click',()=>setTheme(document.body.dataset.theme==='dark'?'light':'dark'));
  $('#top-theme-toggle').addEventListener('click',()=>setTheme(document.body.dataset.theme==='dark'?'light':'dark'));
  $('#mobile-menu').addEventListener('click',()=>$('#sidebar').classList.toggle('open'));

  // Keep the practice page and results flow responsive to a timer ending or keyboard navigation.
  const oldBeginQuiz=beginQuiz;
  beginQuiz=function(opts={}){const from=currentPage;oldBeginQuiz(opts);if(activeQuiz){activeQuiz.returnPage=from;activeQuiz.mode=opts.mode||'standard';}};
  // Use the selected answer currently shown if the student checks and immediately presses a button.
  const originalRenderQuiz=renderQuiz;
  renderQuiz=function(root){originalRenderQuiz(root);const q=activeQuiz?.questions[activeQuiz.index];if(q&&activeQuiz.selected){const radio=$$('input[name="quiz-option"]',root).find(x=>x.value===activeQuiz.selected);if(radio){radio.checked=true;radio.closest('.answer-option')?.classList.add('selected');}}};

  // Initial state.
  setTheme(state.theme||'dark');
  updateNavCounts();
  flashOrder=shuffle(VOCABULARY.map(v=>v.id));
  renderPage();
})();
