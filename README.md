# Urbansneakers

React based website for https://urbansneakers.io/

## Installation

### VirtualBox & Vagrant

- Install [VirtualBox](https://www.virtualbox.org/wiki/Downloads) >= 5.1.14
- Install [Vagrant](https://www.vagrantup.com/downloads.html) >= 1.9.6

#### Windows 10

- Enable virtualization in your BIOS settings

### Setup

Then we need to generate OAuth2 [access token](https://github.com/settings/tokens/new), fill
description field and tick `repo` permission. Replace `<TOKEN>` placeholder below with that value.

For Windows platform you have to add these settings to the `.git/config`:

```
[github]
    accesstoken = <TOKEN>
```

Run these commands locally on your host machine:

- `$ export VAGRANT_SERVER_URL=https://app.vagrantup.com`
- `$ echo "export VAGRANT_SERVER_URL=https://app.vagrantup.com" >> ~/.bashrc`
- `$ git clone git@github.com:MenschDankeGmbH/md-urbansneakers.git`
- `$ cd md-urbansneakers/`
- `$ git config github.accesstoken <TOKEN>`
- `$ vagrant plugin install vagrant-triggers`
- `$ vagrant login`
- `$ vagrant up`

On first run, you have to see `Done.` message when you execute `$ vagrant up`. If you don't see it, then something went
wrong. Install logs you can find inside your VM at `/home/ubuntu/.install` file.

To update your box when update is available, execute these commands:

- `$ vagrant box update`
- `$ vagrant destroy -f`
- `$ vagrant up`

### hosts

```
192.168.40.10 md-urbansneakers.local
192.168.40.10 img.md-urbansneakers.local
```

## Dependencies

### Composer

Run `composer install` to install the composer dependencies.

### Yarn

Run `yarn install` under `app` directory to install the node dependencies.

## Debuging

Run `yarn start` under `app` directory and open http://md-urbansneakers.local:4000. (Ignore 3xxx ports that suggests yarn)

## Compiling assets for wordpress theme

Run `yarn build` under `app` directory and open http://md-urbansneakers.local, you should see the latest build.

## Vagrant Share

Your are also able to share your VM with others outside of your network. Therefore you need to register on [Atlas (VagrantCloud)](https://atlas.hashicorp.com/tutorials) and run `vagrant share`. You will get an outside accessible link which you can send to others.

## Suggested Tools
- [WebStorm](https://www.jetbrains.com/webstorm/) - The Most Intelligent PHP IDE
- [Vagrant](https://www.vagrantup.com/) - Development environments made easy
- [TortoiseGit](https://code.google.com/p/tortoisegit/) - Interface to Git Version Control
- [Putty](http://www.chiark.greenend.org.uk/~sgtatham/putty/download.html) - SSH Client
