export function bankName(code: string): string {
    return banks.find((bank) => bank.code === code).name;
}

const banks = [
    {
        code: "654",
        name: "Banco A.J.Renner",
    },
    {
        code: "246",
        name: "Banco ABC Brasil",
    },
    {
        code: "075",
        name: "Banco CR2",
    },
    {
        code: "121",
        name: "Banco Agiplan",
    },
    {
        code: "025",
        name: "Banco Alfa",
    },
    {
        code: "641",
        name: "Banco Alvorada",
    },
    {
        code: "065",
        name: "Banco Patagon",
    },
    {
        code: "213",
        name: "Banco Arbi",
    },
    {
        code: "024",
        name: "Banco BANDEPE",
    },
    {
        code: "107",
        name: "Banco BBM",
    },
    {
        code: "096",
        name: "Banco BM&FBOVESPA",
    },
    {
        code: "318",
        name: "Banco BMG",
    },
    {
        code: "752",
        name: "Banco BNP Paribas Brasil",
    },
    {
        code: "248",
        name: "Banco Boavista Interatlântico",
    },
    {
        code: "218",
        name: "Banco Bonsucesso",
    },
    {
        code: "069",
        name: "Banco BPN Brasil",
    },
    {
        code: "063",
        name: "Ibibank - Banco Múltiplo",
    },
    {
        code: "036",
        name: "Banco Bradesco BBI",
    },
    {
        code: "122",
        name: "Banco Bradesco BERJ",
    },
    {
        code: "204",
        name: "Banco Bradesco Cartões",
    },
    {
        code: "394",
        name: "Banco Bradesco Financiamentos",
    },
    {
        code: "237",
        name: "Banco Bradesco",
    },
    {
        code: "208",
        name: "Banco BTG Pactual",
    },
    {
        code: "263",
        name: "Banco Cacique",
    },
    {
        code: "473",
        name: "Banco Financial Português",
    },
    {
        code: "412",
        name: "Banco Capital",
    },
    {
        code: "040",
        name: "Banco Cargill",
    },
    {
        code: "266",
        name: "Banco Cédula",
    },
    {
        code: "739",
        name: "Banco Cetelem",
    },
    {
        code: "233",
        name: "Banco Cifra",
    },
    {
        code: "745",
        name: "Banco Citibank",
    },
    {
        code: "241",
        name: "Banco Clássico",
    },
    {
        code: "095",
        name: "Banco Confidence de Câmbio",
    },
    {
        code: "756",
        name: "BANCOOB",
    },
    {
        code: "748",
        name: "Banco Cooperativo Sicredi",
    },
    {
        code: "222",
        name: "Banco Credit Agricole Brasil",
    },
    {
        code: "505",
        name: "Banco Credit Suisse (Brasil)",
    },
    {
        code: "003",
        name: "Banco da Amazônia",
    },
    {
        code: "083",
        name: "Banco da China Brasil",
    },
    {
        code: "707",
        name: "Banco Daycoval",
    },
    {
        code: "300",
        name: "Banco de La Nacion Argentina",
    },
    {
        code: "495",
        name: "Banco de La Provincia de Buenos Aires",
    },
    {
        code: "494",
        name: "Banco de La Republica Oriental del Uruguay",
    },
    {
        code: "456",
        name: "Banco de Tokyo-Mitsubishi UFJ Brasil",
    },
    {
        code: "001",
        name: "Banco do Brasil",
    },
    {
        code: "047",
        name: "Banco do Estado de Sergipe",
    },
    {
        code: "037",
        name: "Banco do Estado do Pará",
    },
    {
        code: "041",
        name: "Banco do Estado do Rio Grande do Sul",
    },
    {
        code: "004",
        name: "Banco do Nordeste do Brasil",
    },
    {
        code: "265",
        name: "Banco Fator",
    },
    {
        code: "224",
        name: "Banco Fibra",
    },
    {
        code: "626",
        name: "Banco Ficsa",
    },
    {
        code: "094",
        name: "Banco Finaxis",
    },
    {
        code: "612",
        name: "Banco Guanabara",
    },
    {
        code: "012",
        name: "Banco INBURSA de Investimentos",
    },
    {
        code: "258",
        name: "Banco Induscred",
    },
    {
        code: "604",
        name: "Banco Industrial do Brasil",
    },
    {
        code: "653",
        name: "Banco Indusval",
    },
    {
        code: "630",
        name: "Banco Intercap",
    },
    {
        code: "077",
        name: "Banco Intermedium",
    },
    {
        code: "249",
        name: "Banco Investcred",
    },
    {
        code: "184",
        name: "Banco Itaú BBA",
    },
    {
        code: "029",
        name: "Banco Itaú BMG Consignado",
    },
    {
        code: "479",
        name: "Banco ItauBank",
    },
    {
        code: "074",
        name: "Banco J. Safra",
    },
    {
        code: "376",
        name: "Banco J. P. Morgan",
    },
    {
        code: "217",
        name: "Banco John Deere",
    },
    {
        code: "076",
        name: "Banco KDB",
    },
    {
        code: "757",
        name: "Banco KEB HANA do Brasil",
    },
    {
        code: "600",
        name: "Banco Luso Brasileiro",
    },
    {
        code: "243",
        name: "Banco Máxima",
    },
    {
        code: "720",
        name: "Banco Maxinvest",
    },
    {
        code: "389",
        name: "Banco Mercantil do Brasil",
    },
    {
        code: "370",
        name: "Banco Europeu para a America Latina (BEAL)",
    },
    {
        code: "746",
        name: "Banco Modal",
    },
    {
        code: "066",
        name: "Banco Morgan Stanley",
    },
    {
        code: "007",
        name: "BNDES",
    },
    {
        code: "735",
        name: "Banco Neon",
    },
    {
        code: "169",
        name: "Banco Olé Bonsucesso Consignado",
    },
    {
        code: "079",
        name: "Banco Original do Agronegócio",
    },
    {
        code: "212",
        name: "Banco Original",
    },
    {
        code: "712",
        name: "Banco Ourinvest",
    },
    {
        code: "623",
        name: "Banco PAN",
    },
    {
        code: "611",
        name: "Banco Paulista",
    },
    {
        code: "613",
        name: "Banco Pecúnia",
    },
    {
        code: "643",
        name: "Banco Pine",
    },
    {
        code: "658",
        name: "Banco Porto Real",
    },
    {
        code: "747",
        name: "Banco Rabobank International Brasil",
    },
    {
        code: "633",
        name: "Banco Rendimento",
    },
    {
        code: "741",
        name: "Banco Ribeirão Preto",
    },
    {
        code: "120",
        name: "Banco Rodobens",
    },
    {
        code: "422",
        name: "Banco Safra",
    },
    {
        code: "033",
        name: "Banco Santander  (Brasil) ",
    },
    {
        code: "743",
        name: "Banco Semear",
    },
    {
        code: "637",
        name: "Banco Sofisa",
    },
    {
        code: "464",
        name: "Banco Sumitomo Mitsui Brasileiro",
    },
    {
        code: "082",
        name: "Banco Topázio",
    },
    {
        code: "634",
        name: "Banco Triângulo",
    },
    {
        code: "018",
        name: "Banco Tricury",
    },
    {
        code: "655",
        name: "Banco Votorantim",
    },
    {
        code: "610",
        name: "Banco VR",
    },
    {
        code: "119",
        name: "Banco Western Union do Brasil",
    },
    {
        code: "124",
        name: "Banco Woori Bank do Brasil",
    },
    {
        code: "021",
        name: "BANESTES",
    },
    {
        code: "719",
        name: "Banif-Banco Internacional do Funchal (Brasil",
    },
    {
        code: "755",
        name: "Banco Merrill Lynch",
    },
    {
        code: "081",
        name: "BBN Banco Brasileiro de Negócios",
    },
    {
        code: "496",
        name: "Banco Uno - E Brasil",
    },
    {
        code: "250",
        name: "BCV - Banco de Crédito e Varejo",
    },
    {
        code: "144",
        name: "BEXS Banco de Câmbio",
    },
    {
        code: "017",
        name: "BNY Mellon Banco",
    },
    {
        code: "126",
        name: "BR Partners Banco de Investimento",
    },
    {
        code: "070",
        name: "BRB - Banco de Brasília",
    },
    {
        code: "737",
        name: "Banco Theca",
    },
    {
        code: "225",
        name: "Banco Brascan ",
    },
    {
        code: "211",
        name: "Banco Sistema",
    },
    {
        code: "104",
        name: "Caixa Econômica Federal",
    },
    {
        code: "320",
        name: "China Construction Bank (Brasil) Banco Múltiplo",
    },
    {
        code: "477",
        name: "Citibank N.A.",
    },
    {
        code: "163",
        name: "Commerzbank Brasil - Banco Múltiplo",
    },
    {
        code: "487",
        name: "Deutsche Bank - Banco Alemão",
    },
    {
        code: "725",
        name: "Finansinos - Crédito, Financ. e Investimento",
    },
    {
        code: "064",
        name: "Goldman Sachs do Brasil Banco Múltiplo",
    },
    {
        code: "135",
        name: "Gradual Corretora de Câmbio,Títulos e Valores Mobiliários",
    },
    {
        code: "078",
        name: "Haitong Banco de Investimento do Brasil",
    },
    {
        code: "062",
        name: "Hipercard Banco Múltiplo",
    },
    {
        code: "132",
        name: "ICBC do Brasil Banco Múltiplo",
    },
    {
        code: "492",
        name: "ING Bank N.V.",
    },
    {
        code: "139",
        name: "Intesa Sanpaolo Brasil - Banco Múltiplo",
    },
    {
        code: "346",
        name: "Banco Francês e Brasileiro",
    },
    {
        code: "341",
        name: "Itaú Unibanco",
    },
    {
        code: "488",
        name: "JPMorgan Chase Bank, National Association",
    },
    {
        code: "128",
        name: "MS Bank Banco de Câmbio",
    },
    {
        code: "014",
        name: "Natixis Brasil Banco Múltiplo",
    },
    {
        code: "753",
        name: "Novo Banco Continental - Banco Múltiplo",
    },
    {
        code: "254",
        name: "Paraná Banco",
    },
    {
        code: "751",
        name: "Scotiabank Brasil Banco Múltiplo",
    },
    {
        code: "129",
        name: "UBS Brasil Banco de Investimento",
    },
];
