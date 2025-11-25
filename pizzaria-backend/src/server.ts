import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Carrega .env antes de qualquer import
dotenv.config(); 

// Importa as rotas SEM extensão .js
import clientesRoutes from './routes/clientesRoutes';
import produtosRoutes from './routes/produtosRoutes';
import pedidosRoutes from './routes/pedidosRoutes';
import proprietarioRoutes from './routes/propietarioRoutes'; 

const app = express();
const PORT = process.env.PORT || 4000; 

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// --- Registro das Rotas ---
app.use('/clientes', clientesRoutes);    
app.use('/login', clientesRoutes);       // Login Cliente
app.use('/produtos', produtosRoutes);    
app.use('/pedidos', pedidosRoutes);      
app.use('/login', proprietarioRoutes);   // Login Proprietário

app.get('/', (req, res) => {
    res.send('API da Pizzaria (V2 - Novo Design) está no ar! 🚀');
});

app.listen(PORT, () => {
    console.log(`🔥 Servidor backend rodando em http://localhost:${PORT}`);
});