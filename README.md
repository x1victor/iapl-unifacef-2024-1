# Comando para criação do projeto back-end
npx @aka-demy/create-express-app

Resposta para as perguntas:
* Project name: back-end
* Language: JavaScript
* Template engine: None
* Package manager: npm

# Instalação do Prisma
npm install prisma --save-dev

# Inicialização do Prisma
npx prisma init

# Executando uma migration
npx prisma migrate dev --name create-users

# Exibindo os dados com Prisma Studio
npx prisma studio