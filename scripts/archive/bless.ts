function bless() {
  const profanity = [
    "arse",
    "arses",
    "asshole",
    "assholes",
    "bastard",
    "bastards",
    "bitch",
    "bitches",
    "bitchier",
    "bitchiest",
    "bitching",
    "bollocks",
    "bullocks",
    "bugger",
    "clit",
    "cunt",
    "cunts",
    "damn",
    "damns",
    "effing",
    "frigger",
    "fuck",
    "fucks",
    "fucker",
    "fuckers",
    "fucking",
    "goddamn",
    "goddamned",
    "godsdamn",
    "horseshit",
    "motherfucker",
    "nigga",
    "niggas",
    "nigger",
    "niggers",
    "shit",
    "shits",
    "shitting",
    "shittier",
    "shittiest",
    "shitass",
    "slut",
    "slutty",
    "sluts",
    "sluttier",
    "sluttiest",
    "twat",
    "twats",
  ];

  const words: string[] = JSON.parse(Deno.readTextFileSync("./english.json"));

  const noProfanity = words.filter((word) => !profanity.includes(word));

  Deno.writeTextFileSync(
    "./english-no-profanity.json",
    JSON.stringify(noProfanity)
  );
}

bless();
