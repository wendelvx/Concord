# MiniCord - Docker Setup Guide

## 📋 Visão Geral

MiniCord é uma aplicação tipo Discord desenvolvida com Node.js, React e MySQL. Este guia explica como executar o projeto usando Docker e Docker Compose.

## 🏗️ Arquitetura

```
┌─────────────────────────────────────────────┐
│         Docker Compose Network              │
├─────────────────────────────────────────────┤
│                                             │
│  ┌──────────────┐  ┌──────────────┐       │
│  │   Frontend   │  │   Backend    │       │
│  │   (React)    │  │  (Node.js)   │       │
│  │   :5173      │  │   :3001      │       │
│  └──────────────┘  └──────────────┘       │
│       Port 5173         Port 3001          │
│                              │             │
│                         ┌────▼────┐       │
│                         │  MySQL  │       │
│                         │ :3306   │       │
│                         └─────────┘       │
│                         Port 3306         │
└─────────────────────────────────────────────┘
```

## 📦 Serviços

### 1. **Frontend** (React + Vite)
- **Porta**: 5173
- **Tecnologias**: React 19, Vite, Tailwind CSS, Socket.IO Client
- **Build**: Multi-stage build para otimização
- **Arquivo**: `frontend/Dockerfile`

### 2. **Backend** (Node.js + Express)
- **Porta**: 3001
- **Tecnologias**: Express, Socket.IO, JWT, Multer
- **Dependências**: MySQL2, bcryptjs, cors
- **Arquivo**: `Dockerfile`

### 3. **Database** (MySQL 8.0)
- **Porta**: 3306
- **Usuário**: `minicord_user`
- **Senha**: `minicord_password`
- **Database**: `minicord_db`
- **Inicialização**: Carrega `database.sql` automaticamente

## 🚀 Como Iniciar o Projeto

### Pré-requisitos
- Docker: https://www.docker.com/products/docker-desktop
- Docker Compose (incluído no Docker Desktop)

### Passos para Iniciar

#### 1. Clone o repositório
```bash
git clone <seu-repositorio>
cd minicord
```

#### 2. Inicie os contêineres
```bash
docker-compose up --build
```

Esse comando irá:
- Construir as imagens Docker
- Criar e iniciar os contêineres
- Inicializar o banco de dados
- Exibir logs em tempo real

**Output esperado:**
```
minicord_db      | MySQL Server started
minicord_backend | Conectado ao MySQL com sucesso!
minicord_backend | SERVIDOR RODANDO NA PORTA 3001
minicord_frontend | ✓ built in 2.34s
```

#### 3. Acesse a aplicação
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001
- **MySQL**: localhost:3306

### 🛑 Para o Projeto

```bash
docker-compose down
```

Para remover também os volumes (dados do banco):
```bash
docker-compose down -v
```

## 🔧 Variáveis de Ambiente

### Backend (`.env.docker`)
```env
PORT=3001
DB_HOST=db                    # Nome do serviço MySQL
DB_USER=minicord_user
DB_PASS=minicord_password
DB_NAME=minicord_db
DB_PORT=3306
```

### Frontend (`.env`)
```env
VITE_API_URL=http://localhost:3001
```

## 📝 Comandos Úteis

### Ver logs de um serviço específico
```bash
# Todos os serviços
docker-compose logs -f

# Apenas backend
docker-compose logs -f backend

# Apenas frontend
docker-compose logs -f frontend

# Apenas banco de dados
docker-compose logs -f db
```

### Executar comandos dentro de um contêiner
```bash
# Acessar terminal do backend
docker-compose exec backend sh

# Acessar terminal do frontend
docker-compose exec frontend sh

# Acessar MySQL CLI
docker-compose exec db mysql -u minicord_user -p minicord_db
# Senha: minicord_password
```

### Reconstruir contêineres
```bash
docker-compose up --build
```

### Executar apenas um serviço
```bash
# Apenas banco de dados e backend
docker-compose up db backend

# Apenas frontend
docker-compose up frontend
```

## 🌐 Conectividade entre Serviços

Dentro do Docker Compose, os serviços se comunicam pelo nome:

- **Backend conecta ao MySQL**: `mysql://minicord_user:minicord_password@db:3306/minicord_db`
- **Frontend conecta ao Backend**: `http://backend:3001` (dentro da rede Docker)
- **Host conecta aos serviços**: `localhost:5173`, `localhost:3001`, `localhost:3306`

## 💾 Persistência de Dados

- **MySQL**: Dados armazenados em volume `mysql_data`
- **Uploads**: Arquivos salvos em `./uploads` (montado no backend)

Para limpar dados:
```bash
docker-compose down -v
```

## 🔍 Troubleshooting

### Erro: "db connection refused"
- O MySQL pode estar demorando para iniciar
- Use o `healthcheck` para aguardar
- Verifique: `docker-compose exec db mysqladmin ping`

### Erro: "port 3001 already in use"
- Mude a porta no `docker-compose.yml`:
```yaml
ports:
  - "3002:3001"  # Mapeie para outra porta
```

### Erro: "Cannot find module"
- Reconstrua as imagens:
```bash
docker-compose down
docker-compose up --build
```

### Frontend não consegue conectar no Backend
- Verifique se `VITE_API_URL` está correto em `frontend/.env`
- Confirme que backend está rodando: `docker-compose logs backend`

## 📂 Estrutura de Arquivos Docker

```
minicord/
├── Dockerfile              # Backend
├── docker-compose.yml      # Orquestração
├── .dockerignore
├── .env.docker            # Variáveis de ambiente
├── database.sql           # Script de inicialização MySQL
├── frontend/
│   ├── Dockerfile         # Frontend
│   └── .dockerignore
├── src/                   # Código backend
├── uploads/               # Volume de uploads
└── README.md
```

## 🚀 Deployment em Produção

Para usar em produção:

1. **Altere o CORS** em `server.js`:
```javascript
cors: {
    origin: "https://seu-dominio.com",  // Seu domínio
    methods: ["GET", "POST"]
}
```

2. **Use variáveis de ambiente seguras**:
```bash
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up
```

3. **Use um reverse proxy** (Nginx/Caddy):
```nginx
server {
    listen 80;
    server_name seu-dominio.com;
    
    location / {
        proxy_pass http://frontend:5173;
    }
    
    location /api {
        proxy_pass http://backend:3001;
    }
}
```

## 📚 Recursos Adicionais

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Node.js Docker Best Practices](https://docs.docker.com/language/nodejs/build-images/)

## ✅ Checklist de Inicialização

- [ ] Docker Desktop instalado
- [ ] Repositório clonado
- [ ] `.env.docker` configurado
- [ ] Executar `docker-compose up --build`
- [ ] Frontend acessível em `localhost:5173`
- [ ] Backend respondendo em `localhost:3001`
- [ ] MySQL conectado e inicializado

## 📞 Suporte

Se tiver problemas:
1. Verifique os logs: `docker-compose logs -f`
2. Limpe volumes: `docker-compose down -v`
3. Reconstrua: `docker-compose up --build`

---

**Desenvolvido com ❤️ para MiniCord**
