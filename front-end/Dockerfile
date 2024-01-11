FROM node:18-alpine AS builder
WORKDIR /app

COPY . .
RUN npm install
RUN npm install -g @angular/cli
RUN ng build
EXPOSE 4200
CMD ["ng", "serve"]

FROM nginx:stable-alpine


WORKDIR /usr/share/nginx/html

COPY --from=builder /app/dist/learning-angular/browser ./

# Add custom nginx configuration
# criar um arquivo de config pro nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]