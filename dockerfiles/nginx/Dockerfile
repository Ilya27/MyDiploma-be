FROM nginx:latest
ARG API_DNS
ARG STATIC_DNS
ENV api_dnss=$API_DNS
ENV static_dnss=$STATIC_DNS
ENV dollar="$"
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /newnginx.conf
RUN envsubst < "/newnginx.conf" > "/etc/nginx/conf.d/nginx.conf"

RUN cat /etc/nginx/conf.d/nginx.conf
#RUN mkdir -p /usr/share/nginx/html/static && touch /usr/share/nginx/html/static/index.html
EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]