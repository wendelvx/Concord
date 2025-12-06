# Frontend - Dockerfile
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar código da aplicação
COPY . .

# Construir a aplicação
RUN npm run build

# Stage de produção
FROM node:18-alpine

WORKDIR /app

# Instalar servidor HTTP simples
RUN npm install -g http-server

# Copiar build do estágio anterior
COPY --from=builder /app/dist ./dist

# Expor porta
EXPOSE 5173

# Comando para servir a aplicação
CMD ["http-server", "dist", "-p", "5173"]
