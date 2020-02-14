FROM mongo:3.6.4
EXPOSE 27017 27017
COPY mongo_scripts/mongo_initialize.sh /run.sh
COPY mongo_scripts/set_mongodb_password.sh /set_mongodb_password.sh
RUN chmod +x /run.sh
RUN chmod +x /set_mongodb_password.sh
CMD ["/run.sh"]