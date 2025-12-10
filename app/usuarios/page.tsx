"use client";

import { useState } from "react";

export default function UsersPage() {
  const [users, setUsers] = useState([
    { usuario: "juan_op", correo: "juan@example.com", tipo: "operador" }
  ]);

  const [showCreate, setShowCreate] = useState(false);
  const [editUser, setEditUser] = useState(null);

  const [newUser, setNewUser] = useState({
    usuario: "",
    correo: "",
    contraseña: "",
    tipo: ""
  });

  // ESTADOS PARA FILTROS
  const [searchUser, setSearchUser] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [filterType, setFilterType] = useState("");

  // FILTROS APLICADOS
  const filteredUsers = users.filter((u) =>
    u.usuario.toLowerCase().includes(searchUser.toLowerCase()) &&
    u.correo.toLowerCase().includes(searchEmail.toLowerCase()) &&
    (filterType === "" || u.tipo === filterType)
  );

  const createUser = () => {
    if (!newUser.usuario || !newUser.correo || !newUser.contraseña || !newUser.tipo) {
      alert("Todos los campos son obligatorios");
      return;
    }

    setUsers([...users, newUser]);
    setNewUser({ usuario: "", correo: "", contraseña: "", tipo: "" });
    setShowCreate(false);
  };

  const saveEdit = () => {
    const updated = users.map((u) =>
      u.usuario === editUser.usuario ? editUser : u
    );
    setUsers(updated);
    setEditUser(null);
  };

  const deleteUser = (usuario) => {
    if (confirm("¿Seguro que deseas eliminar este usuario?")) {
      setUsers(users.filter((u) => u.usuario !== usuario));
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-purple-200 to-pink-200 min-h-screen">
      <div className="bg-white rounded-2xl shadow-xl p-6 max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold text-purple-700">Usuarios</h2>

          <button
            onClick={() => setShowCreate(true)}
            className="px-4 py-2 bg-pink-500 text-white rounded-xl hover:bg-pink-600"
          >
            Crear Usuario
          </button>
        </div>

        {/* FILTROS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <input
            className="p-2 rounded-lg shadow"
            placeholder="Buscar por usuario"
            value={searchUser}
            onChange={(e) => setSearchUser(e.target.value)}
          />

          <input
            className="p-2 rounded-lg shadow"
            placeholder="Buscar por correo"
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
          />

          <select
            className="p-2 rounded-lg shadow"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="">Filtrar por tipo</option>
            <option>admin</option>
            <option>operador</option>
            <option>reportes</option>
            <option>psicología</option>
            <option>jurídico</option>
            <option>trabajo social</option>
           
          </select>
        </div>

        {/* TABLA SIN BORDES */}
        <table className="w-full text-center">
          <thead className="bg-purple-100 rounded-xl">
            <tr>
              <th className="p-2">Usuario</th>
              <th className="p-2">Correo</th>
              <th className="p-2">Tipo</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((u, i) => (
              <tr key={i} className="hover:bg-purple-50 transition">
                <td className="p-3">{u.usuario}</td>
                <td className="p-3">{u.correo}</td>
                <td className="p-3">{u.tipo}</td>

                <td className="p-3 space-x-2">
                  <button
                    onClick={() => setEditUser({ ...u })}
                    className="px-3 py-1 bg-yellow-400 rounded-lg hover:bg-yellow-500"
                  >
                    Editar
                  </button>

                  <button
                    onClick={() => deleteUser(u.usuario)}
                    className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}

            {filteredUsers.length === 0 && (
              <tr>
                <td className="p-4 text-gray-500" colSpan="4">
                  No hay resultados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL CREAR USUARIO */}
      {showCreate && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-purple-50 rounded-2xl p-6 w-96 shadow-xl">
            <h2 className="text-xl font-bold text-purple-700 mb-4">Crear Usuario</h2>

            <input
              placeholder="Usuario"
              className="w-full p-2 shadow rounded-lg mb-2"
              value={newUser.usuario}
              onChange={(e) => setNewUser({ ...newUser, usuario: e.target.value })}
            />

            <input
              placeholder="Correo"
              className="w-full p-2 shadow rounded-lg mb-2"
              value={newUser.correo}
              onChange={(e) => setNewUser({ ...newUser, correo: e.target.value })}
            />

            <input
              placeholder="Contraseña"
              type="password"
              className="w-full p-2 shadow rounded-lg mb-2"
              value={newUser.contraseña}
              onChange={(e) => setNewUser({ ...newUser, contraseña: e.target.value })}
            />

            <select
              className="w-full p-2 shadow rounded-lg mb-2"
              value={newUser.tipo}
              onChange={(e) => setNewUser({ ...newUser, tipo: e.target.value })}
            >
              <option value="">Seleccione tipo</option>
              <option>admin</option>
              <option>operador</option>
              <option>reportes</option>
              <option>psicología</option>
              <option>jurídico</option>
              <option>trabajo social</option>
            
            </select>

            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => setShowCreate(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
              >
                Cancelar
              </button>

              <button
                onClick={createUser}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL EDITAR */}
      {editUser && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-pink-50 rounded-2xl p-6 w-96 shadow-xl">
            <h2 className="text-xl font-bold text-pink-700 mb-4">Editar Usuario</h2>

            <input
              className="w-full p-2 shadow rounded-lg mb-2"
              value={editUser.correo}
              onChange={(e) => setEditUser({ ...editUser, correo: e.target.value })}
            />

            <input
              type="password"
              placeholder="Nueva contraseña"
              className="w-full p-2 shadow rounded-lg mb-2"
              onChange={(e) => setEditUser({ ...editUser, contraseña: e.target.value })}
            />

            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => setEditUser(null)}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
              >
                Cancelar
              </button>

              <button
                onClick={saveEdit}
                className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600"
              >
                Guardar Cambios
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
