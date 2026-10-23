export interface PracticeQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  hint?: string;
}

export interface SectionComparisonRow {
  word: string;
  type?: string;
  meaning: string;
  example: string;
}

export interface StudySection {
  id: string;
  title: string;
  emoji: string;
  shortTag: string;
  analogyTitle: string;
  analogyDescription: string[];
  color: {
    bg: string;
    border: string;
    badge: string;
    accent: string;
    light: string;
  };
  table?: {
    headers: string[];
    rows: SectionComparisonRow[];
  };
  keyTakeaways: string[];
  practiceQuestions: PracticeQuestion[];
}

export const STUDY_SECTIONS: StudySection[] = [
  {
    id: 'job-work-career',
    title: '1. Job vs. Work vs. Career',
    emoji: '🌳',
    shortTag: 'Vocab & Roles',
    analogyTitle: '💡 The Friendly Analogy: "The Tree"',
    analogyDescription: [
      '🪵 Work is the wood: Any effort or energy you use. Doing chores, cleaning dishes, or writing homework is work. It does not always mean getting paid.',
      '🌿 Job is a single branch: A specific position you get hired for and paid to do (e.g., teacher, pilot, shopkeeper).',
      '🌳 Career is the entire growing tree: The long journey of learning, working, and growing in a field over your whole lifetime.'
    ],
    color: {
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
      badge: 'bg-emerald-100 text-emerald-800',
      accent: 'emerald',
      light: 'emerald-500'
    },
    table: {
      headers: ['Word', 'Grammar Type', 'Meaning', 'Grade 4 Example'],
      rows: [
        {
          word: 'Work',
          type: 'Uncountable',
          meaning: 'General physical or mental effort.',
          example: '"I have a lot of work to do at home today."'
        },
        {
          word: 'Job',
          type: 'Countable',
          meaning: 'A specific role or trade you do to earn money.',
          example: '"Ledamo has a job as a shopkeeper."'
        },
        {
          word: 'Career',
          type: 'Countable',
          meaning: 'Your long-term path or profession over many years.',
          example: '"She wants a successful career in medicine as a doctor."'
        }
      ]
    },
    keyTakeaways: [
      'Remember: You can have multiple jobs over your life, but they all build one big career!',
      'Chores at home = Work (unpaid effort).',
      'Being a pilot or teacher = Job (hired, paid).',
      '30 years of teaching, becoming a principal = Career (lifetime journey).'
    ],
    practiceQuestions: [
      {
        id: 'jwc-1',
        question: 'Helping my parents wash the dishes after dinner is hard ____________.',
        options: ['work', 'job', 'career'],
        correctAnswer: 'work',
        hint: 'Is washing dishes an unpaid chore, or a formal hired role with a monthly paycheck?',
        explanation: 'work → Reason: Washing dishes is an unpaid task/effort, not a formal hired position.'
      },
      {
        id: 'jwc-2',
        question: 'My uncle flies airplanes; his ____________ is being a pilot.',
        options: ['work', 'job', 'career'],
        correctAnswer: 'job',
        hint: 'A pilot is a specific role someone is hired and paid to perform.',
        explanation: 'job → Reason: A pilot is a specific paid role you do.'
      },
      {
        id: 'jwc-3',
        question: 'Aster studied for many years because she wanted a great ____________ as an engineer.',
        options: ['work', 'job', 'career'],
        correctAnswer: 'career',
        hint: 'Look for words about studying for many years and lifelong professional growth.',
        explanation: 'career → Reason: It talks about her life-long journey of studying and professional progress.'
      }
    ]
  },
  {
    id: 'articles',
    title: '2. Articles: A, An, and The',
    emoji: '🔦',
    shortTag: 'Grammar',
    analogyTitle: '💡 The Friendly Analogy: "The Spotlight & The Bumper Car"',
    analogyDescription: [
      '🎟️ A and An (The "Any-One" Ticket): Use them when speaking about one general thing that isn’t special or unique yet.',
      '🚗 The Bumper Car Rule (A vs. An): Vowels (a, e, i, o, u) make smooth sounds. When two vowels bump into each other, it sounds strange (e.g., "a apple"). The letter "n" acts like a soft cushion to prevent bumping: an apple, an umbrella.',
      '🔦 The (The Spotlight): Use it when you are pointing directly at one specific thing, when there is only one in the world, or when you mention something for the second time.'
    ],
    color: {
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      badge: 'bg-amber-100 text-amber-800',
      accent: 'amber',
      light: 'amber-500'
    },
    keyTakeaways: [
      'Singular & General + Consonant sound → Use A (a dog, a cat, a book).',
      'Singular & General + Vowel sound (a, e, i, o, u) → Use AN (an orange, an egg, an umbrella).',
      'Specific, Unique, or Mentioned 2nd time → Use THE (the sun, the capital, the red pencil).'
    ],
    practiceQuestions: [
      {
        id: 'art-1',
        question: 'She ate _______ orange during the break.',
        options: ['a', 'an', 'the'],
        correctAnswer: 'an',
        hint: 'Listen to the starting sound of "orange". Does it begin with a vowel sound (/o/)?',
        explanation: 'an → Reason: "Orange" begins with the vowel sound /o/, so it needs the "n" bumper cushion.'
      },
      {
        id: 'art-2',
        question: 'Addis Ababa is _______ capital city of Ethiopia.',
        options: ['a', 'an', 'the'],
        correctAnswer: 'the',
        hint: 'Can a country have multiple capital cities, or is there only ONE specific capital city?',
        explanation: 'the → Reason: Ethiopia has only one capital city; it is unique and specific.'
      },
      {
        id: 'art-3',
        question: 'I bought _______ notebook yesterday. _______ notebook is blue.',
        options: ['a / The', 'an / A', 'the / A', 'the / An'],
        correctAnswer: 'a / The',
        hint: '1st mention is any notebook. 2nd mention refers to the exact one we already know about!',
        explanation: 'a / The → Reason: The first time we mention the notebook, it is general (a). The second time, we know which one we mean (the).'
      },
      {
        id: 'art-4',
        question: 'He wants to be _______ doctor when he grows up.',
        options: ['a', 'an', 'the'],
        correctAnswer: 'a',
        hint: '"Doctor" begins with a /d/ consonant sound and refers to a general profession.',
        explanation: 'a → Reason: "Doctor" starts with a consonant sound /d/ and refers to a general profession.'
      }
    ]
  },
  {
    id: 'simple-present',
    title: '3. Simple Present Tense',
    emoji: '⏰',
    shortTag: 'Tenses',
    analogyTitle: '💡 The Friendly Analogy: "The Everyday Clock"',
    analogyDescription: [
      '⏰ Use the simple present tense for things that happen on a schedule, everyday habits, routines, or facts that are always true.',
      '🦸 The "Super-S" Rule: When the subject is He, She, It, or one person/thing (singular), the verb must wear a Super-S cape! (walks, plays, rises).',
      '👥 Plural & I/You: I / You / We / They do NOT need the cape → walk, play, go.',
      '🧲 Do / Does Rule: Do / Don\'t for I, You, We, They. Does / Doesn\'t for He, She, It. Remember: Once "does" steals the \'S\', the main verb goes back to normal!'
    ],
    color: {
      bg: 'bg-sky-50',
      border: 'border-sky-200',
      badge: 'bg-sky-100 text-sky-800',
      accent: 'sky',
      light: 'sky-500'
    },
    keyTakeaways: [
      'He / She / It + Verb-S (e.g., She teaches, He plays, It rises).',
      'I / You / We / They + Base Verb (e.g., I teach, They play, We rise).',
      'Questions & Negatives: Does he walk? (NOT: Does he walks). Does took the S!'
    ],
    practiceQuestions: [
      {
        id: 'sp-1',
        question: 'Kuma and Bekele _________ (wake) up early in the morning.',
        options: ['wake', 'wakes', 'is waking', 'waked'],
        correctAnswer: 'wake',
        hint: 'Count the people: Kuma AND Bekele = two people (They). Do "They" take the Super-S cape?',
        explanation: 'wake → Reason: "Kuma and Bekele" are two people (plural = They), so the verb does not take an -s.'
      },
      {
        id: 'sp-2',
        question: 'She _________ (teach) English at our school.',
        options: ['teaches', 'teach', 'is teach', 'teaching'],
        correctAnswer: 'teaches',
        hint: '"She" is singular. What cape does the verb wear? (Remember verbs ending in -ch take -es)',
        explanation: 'teaches → Reason: "She" is singular, so add -es to teach.'
      },
      {
        id: 'sp-3',
        question: 'The sun _________ (rise) in the east.',
        options: ['rises', 'rise', 'is rising', 'rose'],
        correctAnswer: 'rises',
        hint: 'The sun is singular ("It") and this is a universal scientific fact.',
        explanation: 'rises → Reason: "The sun" is singular (It) and this is a general truth/fact.'
      },
      {
        id: 'sp-4',
        question: '_________ (Do / Does) Dolango feel sick today?',
        options: ['Does', 'Do'],
        correctAnswer: 'Does',
        hint: 'Dolango is one boy ("He"). Which helper verb carries the S?',
        explanation: 'Does → Reason: "Dolango" is one boy (He), so we use Does.'
      },
      {
        id: 'sp-5',
        question: 'He _________ (do not / does not) play football on Sundays.',
        options: ['does not', 'do not'],
        correctAnswer: 'does not',
        hint: 'Third-person singular ("He") pairs with does / does not.',
        explanation: 'does not → Reason: "He" takes does not (or doesn\'t).'
      }
    ]
  },
  {
    id: 'present-continuous',
    title: '4. Present Continuous Tense',
    emoji: '📹',
    shortTag: 'Tenses',
    analogyTitle: '💡 The Friendly Analogy: "The Live Video Camera"',
    analogyDescription: [
      '📹 Use this tense for an action happening right now, at this exact moment.',
      '🍔 The 3-Part Burger Formula: You cannot forget any part!',
      '• Top Bun: Subject (I / He / She / They / The dog)',
      '• Burger Patty: am / is / are (helping verb)',
      '• Bottom Bun: Verb-ing (reading, running, cooking)'
    ],
    color: {
      bg: 'bg-rose-50',
      border: 'border-rose-200',
      badge: 'bg-rose-100 text-rose-800',
      accent: 'rose',
      light: 'rose-500'
    },
    keyTakeaways: [
      'I → am + verb-ing (I am reading)',
      'He / She / It (one person) → is + verb-ing (He is cooking)',
      'We / You / They (more than one) → are + verb-ing (They are running)',
      'Spelling Watch: run → running (double the n), write → writing (drop the e)!'
    ],
    practiceQuestions: [
      {
        id: 'pc-1',
        question: 'Look! A dog ____________________ (sleep) under the tree.',
        options: ['is sleeping', 'are sleeping', 'am sleeping', 'sleeps'],
        correctAnswer: 'is sleeping',
        hint: '"A dog" is one animal (It). Pair "is" with sleep + ing!',
        explanation: 'is sleeping → Reason: "A dog" is one animal (It), so we use is + sleep + -ing.'
      },
      {
        id: 'pc-2',
        question: 'The students ____________________ (run) to their classroom right now.',
        options: ['are running', 'is running', 'are runing', 'run'],
        correctAnswer: 'are running',
        hint: '"The students" are plural (They). Also notice the spelling: run doubles the n!',
        explanation: 'are running → Reason: "The students" are plural (They), so we use are + run + -ing (double the n → running).'
      },
      {
        id: 'pc-3',
        question: 'I ____________________ (write) an English exercise in my book.',
        options: ['am writing', 'is writing', 'are writing', 'am writeing'],
        correctAnswer: 'am writing',
        hint: '"I" pairs with "am". Remember to drop the silent "e" in write!',
        explanation: 'am writing → Reason: "I" always pairs with am + write + -ing (drop the e → writing).'
      }
    ]
  },
  {
    id: 'quantifiers',
    title: '5. Quantifiers: Many, Much, Some, Any, All, Both',
    emoji: '⚖️',
    shortTag: 'Grammar',
    analogyTitle: '💡 The Friendly Analogy: "Count-it vs. Scoop-it"',
    analogyDescription: [
      '🖐️ Count-it (Countable): Things you can count one by one with your fingers (pencils, chairs, dogs, apples).',
      '🥣 Scoop-it (Uncountable): Things you cannot count individually; you have to measure or scoop them (water, soup, milk, sand, money).'
    ],
    color: {
      bg: 'bg-indigo-50',
      border: 'border-indigo-200',
      badge: 'bg-indigo-100 text-indigo-800',
      accent: 'indigo',
      light: 'indigo-500'
    },
    table: {
      headers: ['Quantifier', 'When to Use It', 'Example'],
      rows: [
        {
          word: 'Many',
          meaning: 'With Count-it nouns (plurals you can count: 1, 2, 3...)',
          example: '"There are many desks in the room."'
        },
        {
          word: 'Much',
          meaning: 'With Scoop-it nouns (uncountable liquids, powders, grains...)',
          example: '"There is not much water left in the bottle."'
        },
        {
          word: 'Some',
          meaning: 'Friendly statements (positive / affirmative sentences)',
          example: '"I have some bread for breakfast."'
        },
        {
          word: 'Any',
          meaning: 'Questions (?) and Negative statements with "not" or "n\'t"',
          example: '"Do you have any pencils? I don\'t have any."'
        },
        {
          word: 'Both',
          meaning: 'Strictly two (2) people or things.',
          example: '"Both the boy and the girl are studying."'
        },
        {
          word: 'All',
          meaning: 'Three (3) or more people or things.',
          example: '"All the students passed the test."'
        }
      ]
    },
    keyTakeaways: [
      'Many desks (countable) vs. Much water (scoop-it).',
      'Use SOME for happy positive statements ("I have some milk").',
      'Use ANY for questions and "not" sentences ("I don\'t have any milk").',
      'Both = 2 only! All = 3 or more!'
    ],
    practiceQuestions: [
      {
        id: 'qt-1',
        question: 'How ____________ (many / much) books are inside your backpack?',
        options: ['many', 'much'],
        correctAnswer: 'many',
        hint: 'Can you count books one by one on your fingers? (1 book, 2 books, 3 books...)',
        explanation: 'many → Reason: Books can be counted one by one (1 book, 2 books).'
      },
      {
        id: 'qt-2',
        question: 'There isn\'t ____________ (some / any) milk in the cup.',
        options: ['any', 'some'],
        correctAnswer: 'any',
        hint: 'Notice the contraction "isn\'t" which means "is not". In negative sentences, which quantifier do we use?',
        explanation: 'any → Reason: The sentence contains a negative word (isn\'t = is not).'
      },
      {
        id: 'qt-3',
        question: 'She has two brothers, and ____________ (both / all) of them go to school.',
        options: ['both', 'all'],
        correctAnswer: 'both',
        hint: 'Check the exact number: "two brothers". Is that 2, or 3+?',
        explanation: 'both → Reason: There are strictly two brothers.'
      },
      {
        id: 'qt-4',
        question: 'We have ____________ (some / any) delicious mangoes on the table.',
        options: ['some', 'any'],
        correctAnswer: 'some',
        hint: 'Is this a happy positive statement, or a question / negative sentence?',
        explanation: 'some → Reason: This is a positive, affirmative sentence.'
      },
      {
        id: 'qt-5',
        question: 'There are five apples on the plate; he ate ____________ (both / all) of them.',
        options: ['all', 'both'],
        correctAnswer: 'all',
        hint: 'There are five apples (more than two!). Which word applies to 3 or more?',
        explanation: 'all → Reason: There are five apples (more than two).'
      }
    ]
  },
  {
    id: 'punctuation',
    title: '6. Punctuation Marks: The Road Signs of Reading',
    emoji: '🚦',
    shortTag: 'Reading & Writing',
    analogyTitle: '💡 The Friendly Analogy: "The Road Signs of Reading"',
    analogyDescription: [
      'Punctuation marks show your voice how to move when reading, just like traffic signs tell cars when to stop, slow down, or turn!',
      '🛑 Full Stop (.) → The Red Light: Stop completely. Placed at the end of a statement.',
      '🚗 Comma (,) → The Speed Bump: Take a quick breath; separates items in a list.',
      '❓ Question Mark (?) → The Detective: Raise your voice; asks for information.',
      '🎉 Exclamation Point (!) → The Party Horn: Shows excitement, surprise, joy, or an urgent order.',
      '📎 Apostrophe (\') → The Glue Stick: Shows possession (Halima\'s bag) or glues two words in a contraction (don\'t, isn\'t).'
    ],
    color: {
      bg: 'bg-amber-50',
      border: 'border-orange-200',
      badge: 'bg-orange-100 text-orange-800',
      accent: 'orange',
      light: 'orange-500'
    },
    keyTakeaways: [
      'Full Stop (.) ends a complete thought or statement.',
      'Comma (,) gives a pause between items in a series.',
      'Question Mark (?) signals asking words (Who, What, Where, When, Can, Is).',
      'Exclamation Point (!) shows great excitement or sudden command ("Stop that!").',
      'Apostrophe (\') glues owners to objects (father\'s) or letters together (can\'t).'
    ],
    practiceQuestions: [
      {
        id: 'pm-1',
        question: 'Can you go to the market with me ___',
        options: ['?', '.', '!', ','],
        correctAnswer: '?',
        hint: 'Starts with the helping verb "Can" and asks someone for an answer.',
        explanation: '? (Question Mark) → Reason: It begins with the helping verb Can and asks a question.'
      },
      {
        id: 'pm-2',
        question: 'This is my father___s jacket.',
        options: ['\'', ',', '.', '!'],
        correctAnswer: '\'',
        hint: 'Whose jacket is it? It belongs to the father (possession). Which glue stick is needed?',
        explanation: '\' (Apostrophe) → Reason: Shows that the jacket belongs to my father (father\'s).'
      },
      {
        id: 'pm-3',
        question: 'No, stop that ___',
        options: ['!', '.', '?', ','],
        correctAnswer: '!',
        hint: 'Expresses an urgent, strong command or sudden shout.',
        explanation: '! (Exclamation Point) → Reason: Expresses a sharp, urgent command or strong feeling.'
      },
      {
        id: 'pm-4',
        question: 'She bought a pen ___ a ruler ___ and an eraser.',
        options: [', and ,', '. and .', '? and ?', '! and !'],
        correctAnswer: ', and ,',
        hint: 'Separating items in a shopping list: a pen [pause] a ruler [pause] and an eraser.',
        explanation: ', and , (Commas) → Reason: Separates items in a series (a pen, a ruler, and an eraser).'
      },
      {
        id: 'pm-5',
        question: 'Tigist is a dentist ___',
        options: ['.', '?', '!', ','],
        correctAnswer: '.',
        hint: 'It is a normal telling sentence (statement).',
        explanation: '. (Full Stop) → Reason: It is a regular telling sentence (statement).'
      }
    ]
  }
];

export interface ExamMultipleChoiceQuestion {
  id: string;
  number: number;
  prompt: string;
  options: { label: string; text: string }[];
  correctLabel: string;
  explanation: string;
  concept: string;
}

export const MASTER_EXAM_PART_A: ExamMultipleChoiceQuestion[] = [
  {
    id: 'exam-a1',
    number: 1,
    prompt: 'Aster has a wonderful _________ as an architect building schools.',
    options: [
      { label: 'A', text: 'work' },
      { label: 'B', text: 'career' },
      { label: 'C', text: 'jobbed' },
      { label: 'D', text: 'work place' }
    ],
    correctLabel: 'B',
    explanation: 'B (career) → An architect designing buildings over years describes a professional career.',
    concept: 'Job vs. Work vs. Career'
  },
  {
    id: 'exam-a2',
    number: 2,
    prompt: 'Look at the sky! The airplane is flying above _________ clouds.',
    options: [
      { label: 'A', text: 'a' },
      { label: 'B', text: 'an' },
      { label: 'C', text: 'the' },
      { label: 'D', text: 'any' }
    ],
    correctLabel: 'C',
    explanation: 'C (the) → We are pointing to specific clouds currently visible in the sky.',
    concept: 'Articles: A, An, and The'
  },
  {
    id: 'exam-a3',
    number: 3,
    prompt: 'Selamawit _________ tourists around Addis Ababa every summer.',
    options: [
      { label: 'A', text: 'guide' },
      { label: 'B', text: 'guides' },
      { label: 'C', text: 'is guide' },
      { label: 'D', text: 'guiding' }
    ],
    correctLabel: 'B',
    explanation: 'B (guides) → "Selamawit" is one person (She), and this is a repeated routine, so the verb needs the Super-S cape (-s).',
    concept: 'Simple Present Tense'
  },
  {
    id: 'exam-a4',
    number: 4,
    prompt: 'Be quiet, please! The baby _________ in the bedroom right now.',
    options: [
      { label: 'A', text: 'sleeps' },
      { label: 'B', text: 'sleep' },
      { label: 'C', text: 'are sleeping' },
      { label: 'D', text: 'is sleeping' }
    ],
    correctLabel: 'D',
    explanation: 'D (is sleeping) → "Right now" signals present continuous; "baby" is singular → is + verb-ing.',
    concept: 'Present Continuous Tense'
  },
  {
    id: 'exam-a5',
    number: 5,
    prompt: 'I don\'t have _________ tea in my cup.',
    options: [
      { label: 'A', text: 'much' },
      { label: 'B', text: 'many' },
      { label: 'C', text: 'some' },
      { label: 'D', text: 'both' }
    ],
    correctLabel: 'A',
    explanation: 'A (much) → "Tea" is an uncountable liquid (scoop-it), and the sentence is negative (don\'t).',
    concept: 'Quantifiers: Many vs. Much'
  }
];

export interface ExamPartBData {
  originalRaw: string;
  expectedPunctuated: string;
  rules: {
    rule: string;
    details: string;
    pointValue: number;
  }[];
}

export const MASTER_EXAM_PART_B: ExamPartBData = {
  originalRaw: 'hi nasise how are you i am so happy to see you did you bring your brothers cap',
  expectedPunctuated: 'Hi, Nasise! How are you? I am so happy to see you! Did you bring your brother\'s cap?',
  rules: [
    {
      rule: 'Capitalization of "Hi" and "Nasise"',
      details: 'Capital H for the start of the sentence, and capital N for Nasise because it is a person\'s proper name.',
      pointValue: 2
    },
    {
      rule: 'Comma after greeting',
      details: 'Comma (,) after "Hi" before addressing the person (Hi, Nasise!).',
      pointValue: 1
    },
    {
      rule: 'Question Marks (?) for questions',
      details: 'Question mark after "How are you?" and after "...brother\'s cap?" as both ask questions.',
      pointValue: 2
    },
    {
      rule: 'Exclamation Point (!) for strong feeling',
      details: 'Exclamation point after "I am so happy to see you!" to express joy and warmth.',
      pointValue: 1
    },
    {
      rule: 'Apostrophe of Possession in "brother\'s"',
      details: 'Apostrophe (\') in "brother\'s" shows that the cap belongs to the brother.',
      pointValue: 2
    },
    {
      rule: 'Capital "I"',
      details: 'The pronoun "I" and the start of sentences "How" and "Did" must be capitalized.',
      pointValue: 2
    }
  ]
};

export interface Flashcard {
  id: string;
  category: string;
  front: string;
  frontSub?: string;
  back: string;
  backNote?: string;
  color: string;
}

export const STUDY_FLASHCARDS: Flashcard[] = [
  {
    id: 'fc-1',
    category: 'Job vs Work vs Career',
    front: 'What is WORK in the Tree Analogy?',
    frontSub: 'Think about chores & energy',
    back: 'Work is the WOOD! 🪵',
    backNote: 'Any physical or mental effort (cleaning dishes, chores). It does NOT have to be paid!',
    color: 'emerald'
  },
  {
    id: 'fc-2',
    category: 'Job vs Work vs Career',
    front: 'What is a JOB in the Tree Analogy?',
    frontSub: 'Think about a specific position',
    back: 'A Job is a single BRANCH! 🌿',
    backNote: 'A specific role you get hired for and paid money to do (pilot, teacher, shopkeeper).',
    color: 'emerald'
  },
  {
    id: 'fc-3',
    category: 'Job vs Work vs Career',
    front: 'What is a CAREER in the Tree Analogy?',
    frontSub: 'Think about your whole life',
    back: 'Career is the ENTIRE GROWING TREE! 🌳',
    backNote: 'Your long-term journey of studying, working, and growing over your lifetime.',
    color: 'emerald'
  },
  {
    id: 'fc-4',
    category: 'Articles: A vs An',
    front: 'Why do we say "AN apple" instead of "a apple"?',
    frontSub: 'The Bumper Car Rule 🚗',
    back: 'Vowel collision prevention! 🛡️',
    backNote: 'When two vowel sounds bump, "n" acts like a soft bumper cushion: an apple, an orange!',
    color: 'amber'
  },
  {
    id: 'fc-5',
    category: 'Articles: The',
    front: 'When do you turn on THE Spotlight? 🔦',
    frontSub: 'Specific vs General',
    back: 'When it is unique, specific, or mentioned a 2nd time!',
    backNote: 'Example: "The sun", "The capital city", or "I saw a cat. THE cat was sleeping."',
    color: 'amber'
  },
  {
    id: 'fc-6',
    category: 'Simple Present',
    front: 'What is the Super-S Cape rule? 🦸',
    frontSub: 'Which subjects wear the cape?',
    back: 'He, She, It (and singular nouns)!',
    backNote: 'He walkS, She runS, It riseS. But I/You/We/They do NOT wear the cape!',
    color: 'sky'
  },
  {
    id: 'fc-7',
    category: 'Simple Present',
    front: 'What happens when "DOES" arrives? 🧲',
    frontSub: 'Questions & Negatives',
    back: 'Does steals the "S"! 🕵️‍♂️',
    backNote: 'The main verb returns to normal! Say: "Does he play?" (NOT: Does he plays).',
    color: 'sky'
  },
  {
    id: 'fc-8',
    category: 'Present Continuous',
    front: 'What is the 3-Part Burger Formula? 🍔',
    frontSub: 'Never forget a layer!',
    back: 'Subject + am/is/are + Verb-ing!',
    backNote: 'Top Bun: Subject | Patty: Helping verb (am/is/are) | Bottom Bun: Verb-ing.',
    color: 'rose'
  },
  {
    id: 'fc-9',
    category: 'Quantifiers',
    front: 'Many vs. Much: What is the rule? 🖐️ 🥣',
    frontSub: 'Count-it vs Scoop-it',
    back: 'Many = Count-it (pencils, desks)\nMuch = Scoop-it (water, milk, tea)!',
    backNote: 'Use MANY for plural items you can count with fingers; MUCH for uncountables.',
    color: 'indigo'
  },
  {
    id: 'fc-10',
    category: 'Quantifiers',
    front: 'Some vs. Any: How do you choose?',
    frontSub: 'Positive vs Negative / Questions',
    back: 'SOME for happy positive sentences 😊\nANY for questions (?) & negatives (not) 🚫',
    backNote: '"I have some apples" vs. "I don\'t have any apples" or "Do you have any apples?"',
    color: 'indigo'
  },
  {
    id: 'fc-11',
    category: 'Quantifiers',
    front: 'Both vs. All: What is the difference?',
    frontSub: 'Count the items!',
    back: 'Both = STRICTLY TWO (2) ✌️\nAll = THREE OR MORE (3+) 🖐️',
    backNote: '"Both brothers go to school" (2). "All five students passed" (3+).',
    color: 'indigo'
  },
  {
    id: 'fc-12',
    category: 'Punctuation Marks',
    front: 'What are the 2 jobs of the Apostrophe (\')? 📎',
    frontSub: 'The Glue Stick',
    back: '1. Possession (Halima\'s bag)\n2. Contraction (do not → don\'t)!',
    backNote: 'It glues an owner to a possession or glues two words together where letters dropped!',
    color: 'orange'
  }
];
