# 1. Use Ubuntu as the base image
FROM ubuntu:latest

# 2. Update and install required packages
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    python3-selenium \
    unzip \
    curl \
    wget \
    vim \
    iproute2 \
    tcpdump \
    iputils-ping \
    apt-transport-https \
    ca-certificates \
    gnupg

# 3. Install Node.js version 20.17.0
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs=20.17.0-1nodesource1

# 4. Install npm version 10.8.2
RUN npm install -g npm@10.8.2

# 5. Install Google Chrome version 128
RUN wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb \
    && apt install -y ./google-chrome-stable_current_amd64.deb \
    && rm google-chrome-stable_current_amd64.deb

# 6. Install ChromeDriver version 128
RUN wget https://storage.googleapis.com/chrome-for-testing-public/129.0.6668.58/linux64/chromedriver-linux64.zip \
    && unzip chromedriver-linux64.zip \
    && mv chromedriver-linux64/chromedriver /usr/local/bin/ \
    && chmod +x /usr/local/bin/chromedriver \
    && rm chromedriver-linux64.zip

# 7. Change to the mounted directory
WORKDIR /app

# 8. Expose port 5000
EXPOSE 5000

# 9. Run the setup script
CMD ["/bin/bash", "setup-container.sh", "/bin/bash"]
