FROM nginx:1.20-alpine

RUN apk add --update nodejs

WORKDIR /app

COPY ./packages/gpt-gateway-admin/nginx.conf /etc/nginx/conf.d/default.conf
COPY ./dist/packages/gpt-gateway-admin .

RUN chmod +x scripts/entrypoint.sh
ENTRYPOINT [ "/app/scripts/entrypoint.sh" ]

CMD ["nginx", "-g", "daemon off;"]