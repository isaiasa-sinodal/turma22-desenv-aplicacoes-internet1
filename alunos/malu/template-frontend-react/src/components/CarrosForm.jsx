import { useState, useEffect } from "react";

export default function CarroForm({ onSalvar, carroEditando }) {
  const [carro, setCarro] = useState({
    marca: "Toyota",
    modelo: "Corolla",
    ano: "2020",
    cor: "Prata"
  });

  useEffect(() => {
    if (carroEditando) {
      setCarro(carroEditando);
    }
  }, [carroEditando]);

  function handleChange(e) {
    const { name, value } = e.target;
    setCarro({ ...carro, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSalvar(carro);
    setCarro({ marca: "", modelo: "", ano: "", cor: "" });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="marca"
        placeholder="Marca"
        value={carro.marca}
        onChange={handleChange}
      />
      <input
        name="modelo"
        placeholder="Modelo"
        value={carro.modelo}
        onChange={handleChange}
      />
      <input
        name="ano"
        placeholder="Ano"
        type="number"
        value={carro.ano}
        onChange={handleChange}
      />
      <input
        name="cor"
        placeholder="Cor"
        value={carro.cor}
        onChange={handleChange}
      />
      <button type="submit">{carroEditando ? "Atualizar" : "Salvar"}</button>
    </form>
  );
}