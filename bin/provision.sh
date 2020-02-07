#!/bin/bash

cd /var/www/md-urbansneakers

cp /home/ubuntu/.parameters.php /var/www/md-urbansneakers/config/wp-config.php

if [[ -f /home/ubuntu/.ready ]]; then
    exit 0;
fi

if [[ ! $(git config github.accesstoken) ]]; then
    echo "You didn't set a token for github." >&2
    echo "Please, follow instructions in the README.md file and execute:" >&2
    echo "$ git config github.accesstoken <TOKEN>" >&2
    exit 1
fi

echo "Executing bundle install"   && bundle install                                                 >> /home/ubuntu/.install 2>&1
echo "Executing composer install" && composer install --no-interaction --ansi                       >> /home/ubuntu/.install 2>&1
echo "Executing yarn install"     && cd app/ && yarn install --no-progress && cd ../                >> /home/ubuntu/.install 2>&1
echo "Executing yarn build"       && cd app/ && yarn build --no-progress && cd ../                  >> /home/ubuntu/.install 2>&1
echo "Executing export env"       && echo "export PATH=$PATH:/var/www/md-urbansneakers/vendor/bin"  >> /home/ubuntu/.bashrc 2>&1
echo "Enable Urbansneakers theme" && vendor/bin/wp theme activate Urbansneakers                     >> /home/ubuntu/.install 2>&1
echo "Activate wordpress plugins" && vendor/bin/wp plugin activate --all                            >> /home/ubuntu/.install 2>&1
echo "Done."

touch /home/ubuntu/.ready
