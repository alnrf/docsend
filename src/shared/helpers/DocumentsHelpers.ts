export const getDocumentName = (document: string) => {
  switch (document) {
    case "cpfDocumentURL":
      return "CPF";
    case "rgCnhDocumentURL":
      return "RG/CNH";

    case "contratoSocialDocumentURL":
      return "Contrato Social";
    case "cnpjDocumentURL":
      return "Cartão CNPJ";
    case "enderecoDocumentURL":
      return "Comprovante de Endereço";
    case "certCasamentoDocumentURL":
      return "Comprovante Estado Civil";
    case "cartTrabalhoDocumentURL":
      return "Carteira de Trabalho + PIS";
    case "compRendaDocumentURL":
      return "Comprovante de Renda";
    case "fgtsDocumentURL":
      return "Extrato FGTS";
    case "irpfDocumentURL":
      return "Declaração IRPF";

    default:
      break;
  }
};

export const getUserType = (type: string) => {
    switch (type) {
   
      case "buyer":
        return "Comprador";
      case "seller_pf":
        return "Vendedor PF";
      case "seller_pj":
        return "Vendedor PJ";
  
      default:
        break;
    }
  };
  