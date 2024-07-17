export interface settingsNotificationType {
  avto: Avto;
  interest: Interest;
  langs: Langs;
  animals: Animals;
}

export interface Avto {
  title: string;
  values: string[];
}

export interface Interest {
  title: string;
  values: Values;
}

export interface Values {
  "8": string;
  "16": string;
  "22": string;
  "203": string;
  "687": string;
  "3515": string;
  "3689": string;
  "4030": string;
  "5661": string;
  "5891": string;
  "5892": string;
  "8787": string;
  "12218": string;
  "18950": string;
  "21475": string;
  "24182": string;
  "29205": string;
  "29943": string;
  "36184": string;
  "37234": string;
  "54584": string;
  "2000000459": string;
  "2000000460": string;
  "2000000462": string;
  "2000000463": string;
  "2000000464": string;
  "2000000480": string;
  "2000000546": string;
  "2000000805": string;
  "2000001185": string;
}

export interface Langs {
  title: string;
  values: string[];
}

export interface Animals {
  title: string;
  values: string[];
}
