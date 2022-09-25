#!/bin/bash
RED='\033[0;31m'
NC='\033[0m' # No Color

printf "Start setup ${RED}whatsapp-bot${NC}\n"

printf "${RED}Update Linux${NC}\n"
sudo apt update
sudo apt-get install build-essential -y
sudo apt-get install ca-certificates fonts-liberation libappindicator3-1 libasound2 libatk-bridge2.0-0 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgbm1 libgcc1 libglib2.0-0 libgtk-3-0 libnspr4 libnss3 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 lsb-release wget xdg-utils y
sudo apt-get install chromium-browser
sudo apt-get install gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 li-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 li libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget libgbm-dev

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
nvm install v16.17.0

### install yarn
printf "Install ${RED}Yarn${NC}\n"
$CURL -sL https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt update
sudo apt install yarn -y
echo 'export PATH="$PATH:$(yarn global bin)"' >> ~/.bash_profile

### install python 3.10.4
printf "Install ${RED}Python${NC}\n"
sudo apt install software-properties-common -y
sudo add-apt-repository ppa:deadsnakes/ppa -y
sudo apt update
sudo apt install python3.10 -y

### install PM2
printf "Install ${RED}PM2${NC}\n"
yarn global add pm2
pm2 startup
pm2 save
pm2 install typescript

### install nodemon@2.0.19
printf "Install ${RED}nodemon@2.0.19${NC}\n"
yarn global add nodemon@2.0.19

### install ts-node@10.9.1
printf "Install ${RED}ts-node@10.9.1${NC}\n"
yarn global add ts-node@10.9.1

### install ts-node-dev@2.0.0
printf "Install ${RED}ts-node-dev@2.0.0${NC}\n"
yarn global add ts-node-dev@2.0.0

### install typescript@4.7.4
printf "Install ${RED}typescript@4.7.4${NC}\n"
yarn global add typescript@4.7.4


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
