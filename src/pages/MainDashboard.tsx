import React, { useEffect, useState } from "react";

import { collection, getDocs, addDoc, query, where } from "firebase/firestore";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { useForm } from "react-hook-form";
import { db, storage } from "../configs/firebase";

export const MainDashboard = () => {
  const [files, setFiles] = useState([]);
  const { register, handleSubmit, reset } = useForm();
  const usersCollection = collection(db, "users");
  const storageRef = ref(storage, "files/"); // Assuming all files are under 'files/'

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const list = await listAll(storageRef);
        const filePromises = list.items.map(async (itemRef) => {
          const url = await getDownloadURL(itemRef);
          return { name: itemRef.name, url };
        });
        const files: any = await Promise.all(filePromises);
        setFiles(files);
      } catch (err) {
        console.error("Erro ao recuperar arquivos:", err);
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
      <h2>Admin Dashboard</h2>

      <section>
        <h3>Arquivos</h3>
        <ul>
          {files.map((file: any) => (
            <li key={file?.url}>
              <a href={file?.url} target="_blank" rel="noopener noreferrer">
                {file?.name}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3>Adicionar Usuário</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>Nome:</label>
            <input {...register("name", { required: true })} />
          </div>
          <div>
            <label>Email:</label>
            <input type="email" {...register("email", { required: true })} />
          </div>
          <div>
            <label>CPF:</label>
            <input {...register("cpf", { required: true })} />
          </div>
          <div>
            <label>Tipo:</label>
            <select {...register("type", { required: true })}>
              <option value="buyer">Comprador</option>
              <option value="seller">Vendedor</option>
              {/* Add other types if necessary */}
            </select>
          </div>
          <button type="submit">Adicionar Usuário</button>
        </form>
      </section>
    </div>
  );
};