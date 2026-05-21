# Stage 1: Build the application and skip tests
FROM eclipse-temurin:21-jdk-jammy AS build
WORKDIR /app

# Copy the source code and build tools
COPY . .

# Ensure the Maven wrapper has execution permissions
RUN chmod +x mvnw

# Package the application into a JAR file while completely skipping tests
RUN ./mvnw clean package -DskipTests

# Stage 2: Create the lightweight runtime container
FROM eclipse-temurin:21-jre-jammy
WORKDIR /app

# Copy only the compiled JAR file from the build stage
COPY --from=build /app/target/*.jar app.jar

# Expose the port
EXPOSE 8080

# Run the pre-compiled JAR directly (super fast startup time!)
CMD ["java", "-jar", "app.jar"]