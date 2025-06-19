# Використовуємо офіційний Node.js образ
FROM node:18-alpine

# Створюємо робочу директорію всередині контейнера
WORKDIR /app

# Копіюємо файли залежностей
COPY package*.json ./

# Встановлюємо залежності
RUN npm install

# Копіюємо Prisma схему
COPY prisma ./prisma

# Генеруємо Prisma клієнт
RUN npx prisma generate

# Копіюємо увесь проєкт
COPY . .

# Збираємо NestJS-додаток
RUN npm run build

# Вказуємо команду запуску
CMD ["node", "dist/main"]
