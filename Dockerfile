FROM ubuntu:22.04
ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update && apt-get install -y \
    mysql-client \           
    mongodb-mongosh \        
    redis-tools \            
    curl \                   
    net-tools \              
    && apt-get clean && rm -rf /var/lib/apt/lists/*
CMD ["bash"]

