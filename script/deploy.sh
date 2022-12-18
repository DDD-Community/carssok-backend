cd /home/ec2-user/app
cp -r ./dist ./carssork
cp -r ./node_modules ./carssork
rm -rf ./dist *.yml ./script ./node_modules

cd carssork
cp .env ./dist

/home/ec2-user/link/node17.9/bin/pm2 restart main