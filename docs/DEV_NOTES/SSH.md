# SSH

## Permissions

sudo chmod -R 600 ~/.ssh/_ sudo chmod -R 644 ~/.ssh/_.pub sudo chmod -R 644
~/.ssh/config

## Check permissions

sudo ls -l ~/.ssh

## SSH WITHOUT ALIAS

ssh -p 2222 -i ~/.ssh/id_rsa_server_bluehost gilliap8@69.195.124.248 -v

## SSH WITH ALIAS

ssh bluehost -v

## COPY directory to server

```shell
scp -r <target_path> <host>:~/<dest_path>

# example
scp -r ./docs/* bluehost:~/public_html/docs-snailicide
```

## Connect to server and do something and exit

```shell
# example :  trace public_html on remote
ssh bluehost 'bash -c "cd ~/public_html  && ls -l && exit "' -v

# CLEAN snailicide docs on remote
ssh bluehost 'bash -c "cd ~/public_html/docs-snailicide && ls -l && rm -rf *.html *.md *.tgz scripts styles && ls -l  && exit "'

# List plugins on server
ssh bluehost 'bash -c "cd ~/public_html/pyromancy.org && wp plugin list "'

# TRACE PHP INFO
ssh bluehost 'bash -c "cd ~/public_html/pyromancy.org && php -r \"phpinfo();\""'
```
