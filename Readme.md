### Instalation
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
source ~/.bashrc
nvm install v16.17.0
nvm use 16.17.0
nvm alias default 16.17.0
curl -s -L https://raw.githubusercontent.com/rodrigoadachi/wa-bot/main/install.sh | bash
cd wa-bot
cp default.env .env
nano .env
yarn dev