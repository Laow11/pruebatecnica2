import express from "express";
import cors from "cors";

// configuracion del servidor.
const app = express();
// Parsear json
app.use(express.json());
// Permitir que el navegador no bloquee la petición.
app.use(cors());

// generar numero random entre 1 y 100
let targetNumber = Math.floor(Math.random() * 100) + 1;

/* console.log(targetNumber + " numero random"); */

//variable donde guardo los intentos.
let remainingAttempts = 10;

app.post("/number", (req, res) => {
  const number = req.body.number;

  /*   console.log(number + " numero input"); */

  // descontar intentos cada vez que se ejecute la función.
  remainingAttempts--;

  // Try && catch para capturar el error si falla algo.
  try {
    if (remainingAttempts === 0) {
      // recargo los intentos a 10.
      remainingAttempts = 10;
      // genero un numero aleatorio para reiniciar el juego.
      targetNumber = Math.floor(Math.random() * 100) + 1;
      res.status(200).json({
        message: `Perdiste, te quedaste sin intentos. El número correcto era ${targetNumber}.`,
      });
    } else if (number > targetNumber) {
      res.status(200).json({
        message: `El número es menor al que estoy pensando, te quedan ${remainingAttempts} intentos.`,
      });
    } else if (number < targetNumber) {
      res.status(200).json({
        message: `El número es mayor al que estoy pensando, te quedan ${remainingAttempts} intentos.`,
      });
    } else {
      // recargo los intentos a 10.
      remainingAttempts = 10;
      // genero un numero aleatorio para reiniciar el juego.
      targetNumber = Math.floor(Math.random() * 100) + 1;
      res.status(200).json({
        message: `Muy bien, adivinaste el número!.`,
      });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

app.get("/restart", (req, res) => {
  remainingAttempts = 10;
  targetNumber = Math.floor(Math.random() * 100) + 1;
  res.json(console.log("juego reseteado"));
});

// servidor
app.listen(3001, () => {
  console.log("Servidor funcionando en puerto", 3001);
});
