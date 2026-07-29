FROM eclipse-temurin:17-jdk

WORKDIR /app

COPY . .

RUN mvn clean package -DskipTests

EXPOSE 8081

CMD ["java", "-jar", "target/taskflow-api-1.0.0-SNAPSHOT.jar"]