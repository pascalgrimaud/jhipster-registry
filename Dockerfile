#FROM openjdk:8
FROM openjdk:8-jdk-alpine

# Add jhipster-registry source
ADD . /code/

# Add OpenSSH, package the application and delete all lib
#RUN apt-get update && apt-get install openssh && \
RUN \
    cd /code/ && \
    rm -Rf target && \
    chmod +x /code/mvnw && \
    sleep 1 && \
    ./mvnw com.github.eirslett:frontend-maven-plugin:install-node-and-yarn -DnodeVersion=v6.10.2 -DyarnVersion=v0.23.2 && \
    ls -al /code/ /code/node/ /code/node/yarn/ /code/node/yarn/dist/ /code/node/yarn/dist/bin/ && \
    sleep 1 && \
    chmod +x /code/node/yarn/dist/bin/* && \
    sleep 1 && \
    ./mvnw com.github.eirslett:frontend-maven-plugin:yarn && \
    ./mvnw package -Pprod && \
    mv /code/target/*.war /jhipster-registry.war && \
    rm -Rf /code/ /root/.m2/wrapper/ /root/.m2/repository/ /root/.cache /root/.config /root/.local /var/cache/apk/*

ENV SPRING_OUTPUT_ANSI_ENABLED=ALWAYS \
    SPRING_PROFILES_ACTIVE=prod,native \
    GIT_URI=https://github.com/jhipster/jhipster-registry/ \
    GIT_SEARCH_PATHS=central-config

EXPOSE 8761
CMD ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/jhipster-registry.war","--spring.cloud.config.server.git.uri=${GIT_URI}","--spring.cloud.config.server.git.search-paths=${GIT_SEARCH_PATHS}"]
