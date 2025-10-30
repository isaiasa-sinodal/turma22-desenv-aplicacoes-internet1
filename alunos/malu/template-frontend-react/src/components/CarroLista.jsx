// src/components/CarroLista.jsx
export default function CarroLista({ carros, onEditar, onDeletar }) {
    if (carros.length === 0) return <p>Nenhum carro cadastrado.</p>;
  
    return (
      <ul>
        {carros.map((carro) => (
          <li key={carro.id}>
            {carro.marca} {carro.modelo} - {carro.ano} - {carro.cor}
            <button onClick={() => onEditar(carro)}>Editar</button>
            <button onClick={() => onDeletar(carro.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    );
  }
  