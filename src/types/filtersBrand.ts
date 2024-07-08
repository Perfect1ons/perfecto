export interface IFiltersBrand {
  brand: string[];
  variant_day: string[];
  filter: Filter;
  nalsklad: number;
  price: Price;
}

export interface Price {
  price_min: number;
  price_max: number;
}

export interface Filter {
  "11": N11;
  "12": N12;
  "13": N13;
  "14": N14;
  "15": N15;
  "16": N16;
  "17": N17;
  "18": N18;
  "19": N19;
  "21": N21;
  "47": N47;
}

export interface N11 {
  id_type: number;
  type_name: string;
  type_desc: string;
  filter: Filter2;
}

export interface Filter2 {
  "43": N43;
  "48": N48;
  "49": N49;
  "52": N52;
  "53": N53;
}

export interface N43 {
  id_filter: number;
  name: string;
  kol: number;
}

export interface N48 {
  id_filter: number;
  name: string;
  kol: number;
}

export interface N49 {
  id_filter: number;
  name: string;
  kol: number;
}

export interface N52 {
  id_filter: number;
  name: string;
  kol: number;
}

export interface N53 {
  id_filter: number;
  name: string;
  kol: number;
}

export interface N12 {
  id_type: number;
  type_name: string;
  type_desc: string;
  filter: Filter3;
}

export interface Filter3 {
  "54": N54;
  "55": N55;
  "56": N56;
  "57": N57;
  "58": N58;
  "64": N64;
  "65": N65;
  "67": N67;
}

export interface N54 {
  id_filter: number;
  name: string;
  kol: number;
}

export interface N55 {
  id_filter: number;
  name: string;
  kol: number;
}

export interface N56 {
  id_filter: number;
  name: string;
  kol: number;
}

export interface N57 {
  id_filter: number;
  name: string;
  kol: number;
}

export interface N58 {
  id_filter: number;
  name: string;
  kol: number;
}

export interface N64 {
  id_filter: number;
  name: string;
  kol: number;
}

export interface N65 {
  id_filter: number;
  name: string;
  kol: number;
}

export interface N67 {
  id_filter: number;
  name: string;
  kol: number;
}

export interface N13 {
  id_type: number;
  type_name: string;
  type_desc: string;
  filter: Filter4;
}

export interface Filter4 {
  "69": N69;
  "71": N71;
  "72": N72;
  "73": N73;
  "74": N74;
  "75": N75;
  "76": N76;
  "77": N77;
  "208": N208;
  "209": N209;
  "214": N214;
}

export interface N69 {
  id_filter: number;
  name: string;
  kol: number;
}

export interface N71 {
  id_filter: number;
  name: string;
  kol: number;
}

export interface N72 {
  id_filter: number;
  name: string;
  kol: number;
}

export interface N73 {
  id_filter: number;
  name: string;
  kol: number;
}

export interface N74 {
  id_filter: number;
  name: string;
  kol: number;
}

export interface N75 {
  id_filter: number;
  name: string;
  kol: number;
}

export interface N76 {
  id_filter: number;
  name: string;
  kol: number;
}

export interface N77 {
  id_filter: number;
  name: string;
  kol: number;
}

export interface N208 {
  id_filter: number;
  name: string;
  kol: number;
}

export interface N209 {
  id_filter: number;
  name: string;
  kol: number;
}

export interface N214 {
  id_filter: number;
  name: string;
  kol: number;
}

export interface N14 {
  id_type: number;
  type_name: string;
  type_desc: string;
  filter: Filter5;
}

export interface Filter5 {
  "79": N79;
  "80": N80;
  "82": N82;
  "83": N83;
  "84": N84;
  "85": N85;
  "86": N86;
  "87": N87;
  "121": N121;
  "128": N128;
  "217": N217;
  "218": N218;
  "219": N219;
}

export interface N79 {
  id_filter: number;
  name: string;
  kol: number;
}

export interface N80 {
  id_filter: number;
  name: string;
  kol: number;
}

export interface N82 {
  id_filter: number;
  name: string;
  kol: number;
}

export interface N83 {
  id_filter: number;
  name: string;
  kol: number;
}

export interface N84 {
  id_filter: number;
  name: string;
  kol: number;
}

export interface N85 {
  id_filter: number;
  name: string;
  kol: number;
}

export interface N86 {
  id_filter: number;
  name: string;
  kol: number;
}

export interface N87 {
  id_filter: number;
  name: string;
  kol: number;
}

export interface N121 {
  id_filter: number;
  name: string;
  kol: number;
}

export interface N128 {
  id_filter: number;
  name: string;
  kol: number;
}

export interface N217 {
  id_filter: number;
  name: string;
  kol: number;
}

export interface N218 {
  id_filter: number;
  name: string;
  kol: number;
}

export interface N219 {
  id_filter: number;
  name: string;
  kol: number;
}

export interface N15 {
  id_type: number;
  type_name: string;
  type_desc: string;
  filter: Filter6;
}

export interface Filter6 {
  "89": N89;
  "90": N90;
  "94": N94;
  "95": N95;
  "96": N96;
  "97": N97;
  "99": N99;
  "126": N126;
  "127": N127;
  "210": N210;
  "215": N215;
  "220": N220;
  "222": N222;
  "277": N277;
  "278": N278;
}

export interface N89 {
  id_filter: number;
  name: string;
  kol: number;
}

export interface N90 {
  id_filter: number;
  name: string;
  kol: number;
}

export interface N94 {
  id_filter: number;
  name: string;
  kol: number;
}

export interface N95 {
  id_filter: number;
  name: string;
  kol: number;
}

export interface N96 {
  id_filter: number;
  name: string;
  kol: number;
}

export interface N97 {
  id_filter: number;
  name: string;
  kol: number;
}

export interface N99 {
  id_filter: number;
  name: string;
  kol: number;
}

export interface N126 {
  id_filter: number;
  name: string;
  kol: number;
}

export interface N127 {
  id_filter: number;
  name: string;
  kol: number;
}

export interface N210 {
  id_filter: number;
  name: string;
  kol: number;
}

export interface N215 {
  id_filter: number;
  name: string;
  kol: number;
}

export interface N220 {
  id_filter: number;
  name: string;
  kol: number;
}

export interface N222 {
  id_filter: number;
  name: string;
  kol: number;
}

export interface N277 {
  id_filter: number;
  name: string;
  kol: number;
}

export interface N278 {
  id_filter: number;
  name: string;
  kol: number;
}

export interface N16 {
  id_type: number;
  type_name: string;
  type_desc: string;
  filter: Filter7;
}

export interface Filter7 {
  "100": N100;
  "207": N207;
  "216": N216;
  "221": N221;
}

export interface N100 {
  id_filter: number;
  name: string;
  kol: number;
}

export interface N207 {
  id_filter: number;
  name: string;
  kol: number;
}

export interface N216 {
  id_filter: number;
  name: string;
  kol: number;
}

export interface N221 {
  id_filter: number;
  name: string;
  kol: number;
}

export interface N17 {
  id_type: number;
  type_name: string;
  type_desc: string;
  filter: Filter8;
}

export interface Filter8 {
  "103": N103;
  "104": N104;
  "105": N105;
  "107": N107;
}

export interface N103 {
  id_filter: number;
  name: string;
  kol: number;
}

export interface N104 {
  id_filter: number;
  name: string;
  kol: number;
}

export interface N105 {
  id_filter: number;
  name: string;
  kol: number;
}

export interface N107 {
  id_filter: number;
  name: string;
  kol: number;
}

export interface N18 {
  id_type: number;
  type_name: string;
  type_desc: string;
  filter: Filter9;
}

export interface Filter9 {
  "106": N106;
  "108": N108;
  "109": N109;
  "110": N110;
  "111": N111;
}

export interface N106 {
  id_filter: number;
  name: string;
  kol: number;
}

export interface N108 {
  id_filter: number;
  name: string;
  kol: number;
}

export interface N109 {
  id_filter: number;
  name: string;
  kol: number;
}

export interface N110 {
  id_filter: number;
  name: string;
  kol: number;
}

export interface N111 {
  id_filter: number;
  name: string;
  kol: number;
}

export interface N19 {
  id_type: number;
  type_name: string;
  type_desc: string;
  filter: Filter10;
}

export interface Filter10 {
  "115": N115;
  "116": N116;
  "120": N120;
}

export interface N115 {
  id_filter: number;
  name: string;
  kol: number;
}

export interface N116 {
  id_filter: number;
  name: string;
  kol: number;
}

export interface N120 {
  id_filter: number;
  name: string;
  kol: number;
}

export interface N21 {
  id_type: number;
  type_name: string;
  type_desc: string;
  filter: Filter11;
}

export interface Filter11 {
  "129": N129;
  "130": N130;
}

export interface N129 {
  id_filter: number;
  name: string;
  kol: number;
}

export interface N130 {
  id_filter: number;
  name: string;
  kol: number;
}

export interface N47 {
  id_type: number;
  type_name: string;
  type_desc: string;
  filter: Filter12;
}

export interface Filter12 {
  "212": N212;
  "213": N213;
}

export interface N212 {
  id_filter: number;
  name: string;
  kol: number;
}

export interface N213 {
  id_filter: number;
  name: string;
  kol: number;
}
