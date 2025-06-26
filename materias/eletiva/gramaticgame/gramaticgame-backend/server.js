// Certifique-se que esta linha está NO TOPO do arquivo
require('dotenv').config({ path: __dirname + '/.env' }); // Caminho absoluto
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');
const auth = require('./middleware/auth'); // Caminho correto

// Carregar variáveis de ambiente
dotenv.config({ path: './config/config.env' });

// Conectar ao MongoDB
connectDB();

// Rotas
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Middlewares
app.use(express.json());
app.use(cors({
    
  origin: 'http://localhost:3001',
  credentials: true,
}));


// Rotas
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);

// Manipulador de erros (DEVE ser o último middleware)
app.use(errorHandler);

const PORT = process.env.PORT || 3001; // Altere para 3001 ou outra porta

const server = app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    const newPort = Number(PORT) + 1;
    console.log(`Porta ${PORT} ocupada, tentando ${newPort}...`);
    app.listen(newPort);
  }
});

// Tratamento de erros não capturados
process.on('unhandledRejection', (err) => {
  console.error(`❌ Erro não tratado: ${err.message}`);
  server.close(() => process.exit(1));
});

