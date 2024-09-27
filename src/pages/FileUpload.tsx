import React, { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { db, storage } from "../configs/firebase";

export const FileUpload = () => {
  const location = useLocation();
  const user = location.state?.user;
  const { register, handleSubmit, reset } = useForm();
  const [file, setFile] = useState<any>(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  const onSubmit = async (data: any) => {
    if (!file) {
      setMessage("Selecione um arquivo para carregar");
      return;
    }

    try {
      const fileRef = ref(storage, `files/${user?.cpf}/${file?.name}`);
      await uploadBytes(fileRef, file);
      const fileURL = await getDownloadURL(fileRef);

      // Save file metadata to Firestore
      const uploadsCollection = collection(db, "uploads");
      await addDoc(uploadsCollection, {
        cpf: user.cpf,
        endereco: data.endereco,
        fileName: file.name,
        fileURL,
        uploadedAt: new Date(),
      });

      setMessage("Arquivo carregado com sucesso!");
      reset();
      setFile(null);
    } catch (err) {
      console.error("Erro ao carregar arquivo:", err);
      setMessage("Erro ao carregar arquivo");
    }
  };

  if (!user) {
    return <div>Faça login antes de carregar arquivos.</div>;
  }

  return (
    <div className="container">
      <h2>Upload File</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Endereço:</label>
          <input {...register("endereco", { required: true })} />
        </div>
        {/* Add other fields as necessary */}
        <div>
          <label>File:</label>
          <input type="file" onChange={handleFileChange} required />
        </div>
        {message && <p>{message}</p>}
        <button type="submit">Carregar</button>
      </form>
    </div>
  );
};
