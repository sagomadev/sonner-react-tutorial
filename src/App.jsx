import { Toaster, toast } from "sonner";
import { BiCheck } from "react-icons/bi";

function simulatePromise() {
  return new Promise((resolve, reject) => {
    setTimeout(Math.round(Math.random() * 100) > 40 ? resolve : reject, 2000);
  });
}

async function fetchUserData() {
  const res = await fetch(
    `https://reqres.in/api/users/${Math.round(Math.random() * 10)}`
  );
  return await res.json();
}

const MyToast = ({ title, description }) => (
  <div>
    <h1>{title}</h1>
    <p>{description}</p>
  </div>
);

function App() {
  return (
    <main>
      <h1>Ejemplos de Toast:</h1>
      <ul>
        <li onClick={() => toast("Mi toast básico")}>Básico</li>
        <li
          onClick={() =>
            toast("Mi toast", {
              description: "Con una descripcion y un icono",
              icon: <BiCheck />,
            })
          }
        >
          Descripción e Icono
        </li>
        <li onClick={() => toast.success("Mi success toast")}>Toast Success</li>
        <li onClick={() => toast.error("Mi error toast")}>Toast Error</li>
        <li
          onClick={() =>
            toast("Mi toast con boton", {
              action: {
                label: "Aceptar",
                onClick: () => console.log("Aceptar"),
              },
            })
          }
        >
          Toast con Boton adicional
        </li>
        <li
          onClick={() => {
            toast.promise(simulatePromise, {
              error: "Algo salio mal",
              success: "Todo correcto",
              loading: "Cargando...",
            });
          }}
        >
          Toast con Promesas
        </li>
        <li
          onClick={() => {
            toast.promise(fetchUserData, {
              error: "Algo salio mal",
              success: ({ data }) =>
                `Bienvenido ${data.first_name} ${data.last_name}`,
              loading: "Cargando...",
            });
          }}
        >
          Toast con Promesas y fn en la resolucion
        </li>
        <li
          onClick={() => {
            toast(
              <MyToast
                title={"Toast Con JSX"}
                description={"Descripcion del toast pesonalizable"}
              />
            );
          }}
        >
          Toast con jsx
        </li>
      </ul>
      <Toaster />
    </main>
  );
}

export default App;
