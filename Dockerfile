# Stage 1: Build the application
FROM maven:3-openjdk-17 AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# Stage 2: Copy the JAR to a slim image
FROM openjdk:17.0.1-jdk-slim
WORKDIR /app
# Ensure the JAR file exists by pointing to the correct path
COPY --from=build /app/event-web/target/ROOT.jar /app/ROOT.jar
EXPOSE 5555

# Run the application
ENTRYPOINT ["java", "-jar", "/app/ROOT.jar"]
