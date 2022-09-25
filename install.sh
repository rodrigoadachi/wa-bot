#!/bin/bash
RED='\033[0;31m'
NC='\033[0m' # No Color

printf "Start setup ${RED}whatsapp-bot${NC}\n"

printf "${RED}Update Linux${NC}\n"
sudo apt update
sudo apt-get install build-essential -y
sudo apt-get install ca-certificates fonts-liberation libappindicator3-1 libasound2 libatk-bridge2.0-0 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgbm1 libgcc1 libglib2.0-0 libgtk-3-0 libnspr4 libnss3 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 lsb-release wget xdg-utils y

printf "Remove ${RED}Old Instalation${NC}\n"
sudo rm -R wa-bot

printf "Install ${RED}git${NC}\n"
sudo apt install git -y

printf "Install ${RED}curl${NC}\n"
sudo apt install curl -y
CURL='/usr/bin/curl'

printf "Install ${RED}nano${NC}\n"
sudo apt install nano -y

### baixando wa-bot
printf "Download ${RED}wa-bot${NC}\n"
git clone https://github.com/rodrigoadachi/wa-bot.git

### install nodejs
printf "Install ${RED}NodeJs${NC}\n"
$CURL -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
source ~/.bashrc
nvm install v16.17.1

### install yarn
printf "Install ${RED}Yarn${NC}\n"
$CURL -sL https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt update
sudo apt install yarn -y
echo 'export PATH="$PATH:$(yarn global bin)"' >> ~/.bash_profile


### install PM2
printf "Install ${RED}PM2${NC}\n"
yarn global add pm2
pm2 startup
pm2 save
pm2 install typescript

### install nodemon
printf "Install ${RED}nodemon${NC}\n"
yarn global add nodemon

### install ts-node
printf "Install ${RED}ts-node${NC}\n"
yarn global add ts-node ts-node-dev

### install python 3.10.4
printf "Install ${RED}Python${NC}\n"
sudo apt install software-properties-common -y
sudo add-apt-repository ppa:deadsnakes/ppa -y
sudo apt update
sudo apt install python3.10 -y

### update PATH
printf "Update ${RED}PATH${NC}\n"
export PATH="$PATH:$(yarn global bin)"

### install node-gyp
printf "Install ${RED}node-gyp${NC}\n"
yarn global add node-gyp

### install modules
printf "Install ${RED}modules${NC}\n"
cd wa-bot
yarn install
