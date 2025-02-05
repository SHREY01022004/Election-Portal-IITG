export const BASEURL = process.env.REACT_APP_BASEURL;
export const BASEAPIURL = process.env.REACT_APP_BASEAPIURL;
export const ELECTIONAPI = process.env.REACT_APP_ELECTIONSAPI;
//export const VALIDAPIURL = process.env.REACT_APP_VALIDAPIURL;
export const IS_PROD = process.env.REACT_APP_ENV === "production";

export const posIdtoNotaId = {
  vicepresident: -1,
  hab: -2,
  welfare: -3,
  swc: -4,
  technical: -5,
  sports: -6,
  sail: -7,
  ug: -8,
  cultural: -9,
  pg: -10,
  girl: -12,
};
export const getNextPage = {
  vicepresident: "sports",
  hab: "sail",
  welfare: "technical",
  swc: "cultural",
  technical: "hab",
  sports: "welfare",
  sail: "swc",
  cultural: "ug",
  ug: "pg",
  pg: "girl",
};

export const candidateIdToName = {
  "-1": "NOTA",
  "-2": "NOTA",
  "-3": "NOTA",
  "-4": "NOTA",
  "-5": "NOTA",
  "-6": "NOTA",
  "-7": "NOTA",
  "-8": "NOTA",
  "-9": "NOTA",
  "-10": "NOTA",
  "-12": "NOTA",
  17: "PRANAV NAIR",
  35: "KHUSHI S KARNANI",
  44: "ALAN SAM JACOB",
  45: "DHRUV GARG",
  49: "ANAKSHI NASKAR",
  50: "SHILPA KRISHNAN",
  56: "RAJPALI PRAKHAR JITENDRA",
  61: "SAKET GUPTA",
  67: "YASHIKA",
  69: "ANUSHKA VASHISTHA",
  70: "ABHIJEET SINGH KUSHWAHA",
  73: "PRASAD JENA",
  75: "ANKIT SARAF",
  76: "ABHINAB SHARMA",
  79: "SAJAN KUMAR DANSENA",
  80: "PRAYAG SAHU",
  81: "PANKAJ SHARMA",
  83: "KETHIREDDY BHASKAR RAO",
  84: "AYUSH RAJ",
  85: "SARTHAK SAXENA",
  91: "SHEKHAR CHAUHAN",
  93: "ARYAN MESHRAM",
  96: "PALAK KOTHARI",
  97: "ANSHUL KUMAR",
  98: "IMRAN HUSSAIN",
  100: "ANANTHU M S",
  101: "KARTAVYA PANTHI",
  102: "GAURAV GANDHI",
  103: "GAVINOLLA PRANAV KUMAR REDDY",
  104: "GUTHIKONDA SRINIDHI REDDY",
  105: "AYUSH TYAGI",
  106: "KUNAL PANT",
  107: "ISHU",
  108: "ADARSH KUMAR A SAHU",
  109: "UTTAM MEENA",
  110: "NEETU KUMARI",
  111: "MD SAHIL",
  112: "UTSAV GUPTA",
  113: "Rahul Aggarwal",
  118: "DURGANALA SRIJANYA",
  121: "JATOTHU VAMSHI",
  124: "BANAVATHU SAMPATH KUMAR NAIK",
  125: "NIHARIKA SINGH",
  127: "SIDDHARTH MALVIYA",
  131: "VEDANT JOSHI",
  134: "CHARUL SHAHAREY",
  136: "SARNAIK VISHWANIL VISHWANATH",
  139: "PRAKHAR SHUKLA",
  141: "RAJESH MUHAL",
};
export const pos2idMap = {
  vicepresident: "1",
  hab: "2",
  welfare: "3",
  swc: "4",
  technical: "5",
  sports: "6",
  sail: "7",
  ug: "8",
  cultural: "9",
  pg: "10",
  girl: "11",
};

export const url2Post = {
  vicepresident: "Vice President",
  hab: "HAB",
  welfare: "Welfare Board",
  swc: "SWC",
  technical: "Technical Board",
  sports: "Sports Board",
  sail: "SAIL",
  ug: "UG Senator",
  cultural: "Cultural Board",
  pg: "PG Senator",
  girl: "Girl Senator",
};

export const posts = [
  {
    title: "Executives",
    subposts: [
      {
        title: "Vice President",
        path: "vicepresident",
      },
      {
        title: "Sports",
        path: "sports",
      },
      {
        title: "Welfare",
        path: "welfare",
      },
      {
        title: "Technical",
        path: "technical",
      },
      {
        title: "HAB",
        path: "hab",
      },
      {
        title: "Sail",
        path: "sail",
      },
      {
        title: "SWC",
        path: "swc",
      },
      {
        title: "Cultural",
        path: "cultural",
      },
    ],
  },
  {
    title: "Senate",
    subposts: [
      {
        title: "UG Senator",
        path: "ug",
      },
      {
        title: "PG Senator",
        path: "pg",
      },
      {
        title: "Girl Senator",
        path: "girl",
      },
    ],
  },
];

export const publicKey = process.env.REACT_APP_CONTRACT_PUBLIC_KEY;
export const privateKey = process.env.REACT_APP_CONTRACT_PRIVATE_KEY;
export const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

export const notBlockChainKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAk9+Z5hv9MQjpXsPl/cv+
nWYJ3Z5+VIjT7Fx8cb+JnbP7Qq1Z6wGssTcCw7LmYxzPJyiuhTlL7+crJOuNDPuq
v4pYfIffEAMVaMYb5PMz9e1jipOt9q6zLgkOWU6Ih4m+RE9WYuSraIgSBLZcjSL8
fPAbCWvsJYQv/EchXcYDRNOvXFhoO9p4Qj4eMhmtXHkOds4D6E6/s9sUXr77c8vb
qOVZnQnuMR6XxzIof0lITHniLu/XFE8JB3plg11+gegq/2rptlpyTpL4GpCM4ICm
jUx6lO6KRaxjc9Qc5185oiaZgAMk3rPiWzuIqXFBwtm85vECHY0m8pkANDf5L/vv
YQIDAQAB
-----END PUBLIC KEY-----`
