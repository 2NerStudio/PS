// Certifique-se que esta linha está NO TOPO do arquivo
require('dotenv').config({ path: __dirname + '/config/config.env' }); // Caminho absoluto corrigido

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');
const morgan = require('morgan');

// Carregar variáveis de ambiente
dotenv.config({ path: './config/config.env' });

// Conectar ao MongoDB
connectDB();

// Importar rotas
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const gameRoutes = require('./routes/gameRoutes');

const app = express();

// Middlewares
app.use(express.json());

// Configuração detalhada do CORS
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

// Logging em desenvolvimento
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Servir arquivos estáticos em produção
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));
  });
}

// Rotas API
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/questions', gameRoutes);

// Rota de saúde da API
app.get('/api/v1/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API está funcionando corretamente',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
});

// Manipulador de erros (DEVE ser o último middleware)
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Servidor rodando em ${process.env.NODE_ENV} na porta ${PORT}`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    const newPort = Number(PORT) + 1;
    console.log(`Porta ${PORT} ocupada, tentando ${newPort}...`);
    server.listen(newPort);
  } else {
    console.error('Erro ao iniciar o servidor:', err);
  }
});

// Tratamento de erros não capturados
process.on('unhandledRejection', (err) => {
  console.error(`❌ Erro não tratado: ${err.message}`);
  server.close(() => process.exit(1));
});

// Tratamento de sinais de encerramento
process.on('SIGTERM', () => {
  console.log('👋 SIGTERM RECEBIDO. Encerrando servidor graciosamente');
  server.close(() => {
    console.log('💥 Servidor encerrado');
  });
});