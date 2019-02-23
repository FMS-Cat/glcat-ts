FROM node:11.10.0

RUN apt-get update
RUN apt-get install -y xvfb libxi-dev libgl1-mesa-dev
RUN apt-get clean
RUN rm -rf /var/lib/apt/lists/*