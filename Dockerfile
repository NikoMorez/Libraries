FROM openjdk:21
EXPOSE 8080
ADD backend/target/libraries.jar libraries.jar
ENTRYPOINT ["java","-jar", "libraries.jar"]
