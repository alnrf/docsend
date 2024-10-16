export const RequiredDocuments = [
  {
    title: "RG / CNH",
    docType: "rgCnhDoc",
    roles: [
      { role: "buyer", order: 3 },
      { role: "seller_pf", order: 102 },
      {
        role: "seller_pj",
        observation: "Documentos dos sócios (ou procuradores, se for o caso)",
        order: 205,
      },
    ],
  },
  {
    title: "CPF",
    docType: "cpfDoc",
    roles: [
      {
        role: "buyer",
        observation:
          "Caso não conste o número no RG/CNH, emitir pelo site da receita",
        order: 3,
      },
      {
        role: "seller_pf",
        observation:
          "Caso não conste o número no RG/CNH, emitir pelo site da receita",
        order: 102,
      },
      {
        role: "seller_pj",
        observation: "Documentos dos sócios (ou procuradores, se for o caso)",
        order: 205,
      },
    ],
    auxiliaryLinkText: "Receita Federal",
    auxiliaryLink:
      "https://servicos.receita.fazenda.gov.br/Servicos/CPF/ImpressaoComprovante/ConsultaImpressao.asp",
  },
  {
    title: "Comprovante de Estado Civil",
    docType: "estadoCivilDoc",
    roles: [
      {
        role: "buyer",
        observation:
          "Certidão de Nascimento, Casamento/Divórcio, Pacto Antenupcial, Reg. Aux., etc",
        order: 5,
      },
      {
        role: "seller_pf",
        observation:
          "Certidão de Nascimento, Casamento/Divórcio, Pacto Antenupcial, Reg. Aux., etc",
        order: 103,
      },
    ],
    auxiliaryLinkText: "Registro Civil",
    auxiliaryLink: "www.registrocivil.org.br",
  },
  {
    title: "Comprovante de Renda",
    docType: "rendaDoc",
    roles: [
      {
        role: "buyer",
        observation:
          "Últimos 3 Holerites, Pro Labore mês anterior, D-IRPF 2023/2024, etc",
        order: 6,
      },
    ],
  },
  {
    title: "Comprovante de Endereço",
    docType: "enderecoDoc",
    roles: [
      { role: "buyer", observation: "Emitido nos últimos 60 dias", order: 7 },
      {
        role: "seller_pf",
        observation: "Emitido nos últimos 60 dias",
        order: 105,
      },
    ],
  },
  {
    title: "Declaração do Imposto de Renda",
    docType: "irpfDoc",
    roles: [
      {
        role: "buyer",
        observation:
          "Recibo de Entrega e Retificadoras se for o caso ou Comprovante de Isento",
        order: 8,
      },
    ],
    auxiliaryLinkText: "Receita Federal",
    auxiliaryLink: "https://www.restituicao.receita.fazenda.gov.br/#/",
  },
  {
    title: "Carteira de Trabalho + PIS",
    docType: "ctpsPisDoc",
    roles: [{ role: "buyer", order: 15 }],
    auxiliaryLinkText: "Inscrição PIS",
    auxiliaryLink:
      "https://cnisnet.inss.gov.br/cnisinternet/faces/pages/index.xhtml",
  },
  {
    title: "Extrato FGTS",
    docType: "fgtsDoc",
    roles: [{ role: "buyer", order: 16 }],
    auxiliaryLinkText: "Extrato FGTS",
    auxiliaryLink:
      "https://www.fgts.gov.br/Pages/sou-trabalhador/outros-servicos-sub-extrato.aspx",
  },
  {
    title: "Contrato Social",
    docType: "contratoSocialDoc",
    roles: [
      {
        role: "seller_pj",
        observation:
          "Consolidado ou Contrato e demais alterações, selo igual da Simplificada",
        order: 201,
      },
    ],
  },
];
