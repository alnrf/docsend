import React, { useEffect, useState } from "react";

import { collection, getDocs, addDoc, query, where } from "firebase/firestore";

import { useForm } from "react-hook-form";
import { db, storage } from "../configs/firebase";
import { useNavigate } from "react-router";
import {
  getDocumentName,
  getUserType,
} from "../shared/helpers/DocumentsHelpers";
type FileUrls = {
  contratoSocialDocumentURL?: string;
  cpfDocumentURL?: string;
  rgCnhDocumentURL?: string;
  uploadedAt?: string;
};

type DocumentEntry = {
  cpfCnpj: string;
  files: FileUrls;
};

type DocumentGroup = {
  type: string;
  cpfCnpj: string;
  documents: FileUrls[];
};

export const MainDashboard = () => {
  const { register, handleSubmit, reset } = useForm();
  const usersCollection = collection(db, "users");
  const uploadsCollection = collection(db, "uploads");
  const navigate = useNavigate();
  const [files, setFiles] = useState<DocumentGroup[]>([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const querySnapshot = await getDocs(uploadsCollection);
        const groupedFiles: DocumentGroup[] = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const { cpfCnpj, type, uploadedAt, ...fileUrls } = data;

          if (uploadedAt && uploadedAt.seconds) {
            fileUrls.uploadedAt = new Date(
              uploadedAt.seconds * 1000
            ).toLocaleString();
          }

          let documentGroup = groupedFiles.find(
            (group) => group.type === type && group.cpfCnpj === cpfCnpj
          );

          if (!documentGroup) {
            documentGroup = {
              type,
              cpfCnpj,
              documents: [],
            };
            groupedFiles.push(documentGroup);
          }

          documentGroup.documents.push(fileUrls as FileUrls);
        });

        setFiles(groupedFiles);
      } catch (err) {
        console.error("Error fetching files:", err);
      }
    };

    fetchFiles();
  }, []);

  const onSubmit = async (data: any) => {
    try {
      await addDoc(usersCollection, data);
      reset();
      alert("usuário adicionado com sucesso!");
    } catch (err) {
      console.error("Erro ao adicionar usuário:", err);
      alert("Erro ao adicionar usuário");
    }
  };

  return (
    <div className="container">
      <button className="back_button" onClick={() => navigate("/")}>
        Voltar
      </button>
      <h2>Admin Dashboard</h2>

      <section>
        <h3>Arquivos</h3>
        <div className="filesContainer">
          {files.map((fileGroup, index) => (
            <div className="docContainer" key={`${fileGroup.type}-${index}`}>
              <div className="documentNumberRow">
                <strong>CPF/CNPJ:</strong> {fileGroup.cpfCnpj}
              </div>
              <div className="documentNumberRow">
                <strong>Perfil:</strong> {getUserType(fileGroup.type)}
              </div>
              <div>
                {fileGroup.documents.map((document, docIndex) => (
                  <div key={docIndex}>
                    {Object.entries(document).map(([key, url]) => (
                      <div key={key}>
                        <a
                          href={url as string}
                          target="_blank"
                          rel="noreferrer"
                          download={getDocumentName(key)}
                        >
                          Getnet
                          {getDocumentName(key)}
                        </a>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3>Adicionar Usuário</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>Nome:</label>
            <input
              {...register("name", { required: true })}
              placeholder="Informe um nome"
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="Informe um email"
            />
          </div>
          <div>
            <label>CPF:</label>
            <input
              {...register("cpfCnpj", { required: true })}
              placeholder="Somente números"
            />
          </div>
          <div>
            <label>Tipo:</label>
            <select {...register("type", { required: true })}>
              <option value="">Selecione</option>
              <option value="buyer">Comprador</option>
              <option value="seller_pf">Vendedor PF</option>
              <option value="seller_pj">Vendedor PJ</option>
            </select>
          </div>
          <button type="submit">Adicionar Usuário</button>
        </form>
      </section>
    </div>
  );
};
