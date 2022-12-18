cd /home/ec2-user/app
cp -r ./dist ./carssork
cp -r ./node_modules ./carssork
rm -rf ./dist *.yml ./script ./node_modules

cd carssork
cp .env ./carssork

~/.nvm/versions/node/v17.9.1/bin/pm2 restart main