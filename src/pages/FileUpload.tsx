import React, { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { db, storage } from "../configs/firebase";
import { RequiredDocuments } from "../shared/miscelaneous/documents";

type Role = "buyer" | "seller_pf" | "seller_pj";

interface DocumentRole {
  role: Role;
  order: number;
  observation?: string;
}

interface RequiredDocument {
  title: string;
  docType: string;
  roles: DocumentRole[];
  auxiliaryLinkText?: string;
  auxiliaryLink?: string;
}

export const FileUpload = () => {
  const location = useLocation();
  const user = location.state?.user;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [cpfFile, setCpfFile] = useState<any>(null);
  const [cnpjFile, setCnpjFile] = useState<any>(null);
  const [rgCnhFile, setRGCnhFile] = useState<any>(null);
  const [enderecoFile, setEnderecoFile] = useState<any>(null);
  const [mariageFile, setMariageFile] = useState<any>(null);
  const [socialContractFile, setSocialContractFile] = useState<any>(null);
  const [profitFile, setProfitFile] = useState<any>(null);
  const [ctpsFile, setCtpsFile] = useState<any>(null);
  const [irpfFile, setIRPFFile] = useState<any>(null);
  const [fgtsFile, setFgtsFile] = useState<any>(null);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const emptyFiles =
    !!cpfFile ||
    !!cnpjFile ||
    !!rgCnhFile ||
    !!enderecoFile ||
    !!mariageFile ||
    !!socialContractFile ||
    !!profitFile ||
    !!ctpsFile ||
    !!irpfFile ||
    !!fgtsFile;

  const allowedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "application/pdf",
  ];

  const formattedString = allowedTypes
    .map((type) => type.split("/")[1].toUpperCase())
    .join(", ");

  const validateFileType = (file: any) => {
    return allowedTypes.includes(file.type);
  };

  const handleFileChange = (file: File, docType: string) => {
    if (file && validateFileType(file)) {
      switch (docType) {
        case "cpfDoc":
          setCpfFile(file);
          break;
        case "rgCnhDoc":
          setRGCnhFile(file);
          break;
        case "cnpjDoc":
          setCnpjFile(file);
          break;
        case "enderecoDoc":
          setEnderecoFile(file);
          break;
        case "estadoCivilDoc":
          setMariageFile(file);
          break;
        case "contratoSocialDoc":
          setSocialContractFile(file);
          break;
        case "rendaDoc":
          setProfitFile(file);
          break;
        case "ctpsPisDoc":
          setCtpsFile(file);
          break;
        case "irpfDoc":
          setIRPFFile(file);
          break;
        case "fgtsDoc":
          setFgtsFile(file);
          break;
        default:
          break;
      }
    } else {
      alert(
        "Formato de arquivo inválido. Somente JPG, JPEG, PNG ou PDF são permitidos."
      );
    }
  };

  const onSubmit = async () => {
    setUploading(true);
    setMessage("");

    try {
      const timestamp = Date.now();
      const uploadData: any = {
        cpfCnpj: user.cpfCnpj,
        uploadedAt: new Date(),
        type: user.type,
      };

      if (user.type === "buyer") {
        if (irpfFile) {
          const irpfRef = ref(
            storage,
            `files/${user?.cpf}/irpf_${timestamp}_${irpfFile?.name}`
          );
          const irpfSnapshot = await uploadBytes(irpfRef, irpfFile);
          const irpfURL = await getDownloadURL(irpfSnapshot.ref);
          uploadData.irpfDocumentURL = irpfURL;
        }

        if (fgtsFile) {
          const fgtsRef = ref(
            storage,
            `files/${user?.cpf}/fgts_${timestamp}_${fgtsFile?.name}`
          );
          const fgtsSnapshot = await uploadBytes(fgtsRef, fgtsFile);
          const fgtsURL = await getDownloadURL(fgtsSnapshot.ref);
          uploadData.fgtsDocumentURL = fgtsURL;
        }
        if (profitFile) {
          const compRendaRef = ref(
            storage,
            `files/${user?.cpf}/comp_renda_${timestamp}_${profitFile?.name}`
          );
          const compRendaSnapshot = await uploadBytes(compRendaRef, profitFile);
          const compRendaURL = await getDownloadURL(compRendaSnapshot.ref);
          uploadData.compRendaDocumentURL = compRendaURL;
        }
        if (ctpsFile) {
          const ctpsRef = ref(
            storage,
            `files/${user?.cpf}/ctps_${timestamp}_${ctpsFile?.name}`
          );
          const ctpsSnapshot = await uploadBytes(ctpsRef, ctpsFile);
          const ctpsURL = await getDownloadURL(ctpsSnapshot.ref);
          uploadData.cartTrabalhoDocumentURL = ctpsURL;
        }
      } else if (user.type === "buyer" || user.type === "seller_pf") {
        if (mariageFile) {
          const certCasamentoRef = ref(
            storage,
            `files/${user?.cpf}/cert_casamento_${timestamp}_${mariageFile?.name}`
          );
          const certCasamentoSnapshot = await uploadBytes(
            certCasamentoRef,
            mariageFile
          );
          const certCasamentoURL = await getDownloadURL(
            certCasamentoSnapshot.ref
          );
          uploadData.certCasamentoDocumentURL = certCasamentoURL;
        }

        if (enderecoFile) {
          const enderecoRef = ref(
            storage,
            `files/${user?.cpfCnpj}/endereco_${timestamp}_${enderecoFile?.name}`
          );
          const enderecoSnapshot = await uploadBytes(enderecoRef, enderecoFile);
          const enderecoURL = await getDownloadURL(enderecoSnapshot.ref);
          uploadData.enderecoDocumentURL = enderecoURL;
        }
      } else if (user.type === "seller_pj") {
        if (cnpjFile) {
          const cnpjRef = ref(
            storage,
            `files/${user?.cpf}/cnpj_${timestamp}_${cnpjFile?.name}`
          );
          const cnpjSnapshot = await uploadBytes(cnpjRef, cnpjFile);
          const cnpjURL = await getDownloadURL(cnpjSnapshot.ref);
          uploadData.cnpjDocumentURL = cnpjURL;
        }

        if (socialContractFile) {
          const contratoSocialRef = ref(
            storage,
            `files/${user?.cpf}/contrato_social_${timestamp}_${socialContractFile?.name}`
          );
          const contratoSocialSnapshot = await uploadBytes(
            contratoSocialRef,
            socialContractFile
          );
          const contratoSocialURL = await getDownloadURL(
            contratoSocialSnapshot.ref
          );
          uploadData.contratoSocialDocumentURL = contratoSocialURL;
        }
      }

      if (rgCnhFile) {
        const rgCnhRef = ref(
          storage,
          `files/${user?.cpf}/rg_cnh_${timestamp}_${rgCnhFile?.name}`
        );
        const rgCnhSnapshot = await uploadBytes(rgCnhRef, rgCnhFile);
        const rgCnhURL = await getDownloadURL(rgCnhSnapshot.ref);
        uploadData.rgCnhDocumentURL = rgCnhURL;
      }

      if (cpfFile) {
        const cpfRef = ref(
          storage,
          `files/${user?.cpfCnpj}/cpf_${timestamp}_${cpfFile?.name}`
        );
        const cpfSnapshot = await uploadBytes(cpfRef, cpfFile);
        const cpfURL = await getDownloadURL(cpfSnapshot.ref);
        uploadData.cpfDocumentURL = cpfURL;
      }

      const uploadsCollection = collection(db, "uploads");
      await addDoc(uploadsCollection, uploadData);

      setMessage("Arquivos carregados com sucesso!");
      reset();
      setCpfFile(null);
      setRGCnhFile(null);
      setCnpjFile(null);
      setEnderecoFile(null);
      setMariageFile(null);
      setSocialContractFile(null);
      setProfitFile(null);
      setCtpsFile(null);
      setIRPFFile(null);
      setFgtsFile(null);
    } catch (err) {
      console.error("Erro ao carregar arquivo:", err);
      setMessage("Erro ao carregar arquivo");
    } finally {
      setUploading(false);
    }
  };

  if (!user) {
    return <div>Faça login antes de carregar arquivos.</div>;
  }

  function filterByRole(role: Role): RequiredDocument[] {
    return RequiredDocuments.map((document) => {
      const filteredRoles = document.roles.filter((r) => r.role === role);
      if (filteredRoles.length > 0) {
        return { ...document, roles: filteredRoles };
      }
      return null;
    }).filter((doc) => doc !== null) as RequiredDocument[];
  }

  const filteredDOcuments = filterByRole(user.type);

  return (
    <div className="container">
      <button className="back_button" onClick={() => navigate("/")}>
        Voltar
      </button>
      <h2>Envio de Arquivos</h2>
      {user.type === "buyer" && <h2>Comprador</h2>}
      {user.type === "seller_pf" && <h2>Vendedor PF</h2>}
      {user.type === "seller_pj" && <h2>Vendedor PJ</h2>}
      <form onSubmit={handleSubmit(onSubmit)}>
        {filteredDOcuments.map((item: any) => (
          <div className="inputcontainer" key={item?.docType}>
            <label>{`${item?.title}:`}</label>
            {item?.roles[0]?.observation && (
              <span>{item?.roles[0]?.observation}</span>
            )}
            <div className="containerRow">
              <input
                type="file"
                onChange={(e: any) => {
                  console.log(e.target.files[0]);
                  handleFileChange(e.target.files[0], item?.docType);
                }}
                required
                accept={allowedTypes.toString()}
              />
              {item?.auxiliaryLinkText && (
                <span>
                  <a href={item?.auxiliaryLink} target="_blank">
                    {item?.auxiliaryLinkText}
                  </a>
                </span>
              )}
            </div>
            <span>{`Formatos aceitos: ${formattedString}`}</span>
          </div>
        ))}
        {message && <p>{message}</p>}
        <button type="submit" disabled={uploading}>
          {uploading ? "Carregando..." : "Carregar"}
        </button>
      </form>
    </div>
  );
};
