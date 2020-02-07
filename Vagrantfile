# -*- mode: ruby -*-

Vagrant.require_version '>= 1.9.5'
Vagrant.configure('2') do |config|
  config.vm.box              = "menschdanke#{ENV.fetch('VAGRANT_VENDOR', '')}/md-urbansneakers"

  unless ENV.fetch('VAGRANT_VENDOR', '')
    config.vm.box_version    = "~> 1.0"
  end

  config.vm.box_check_update = true
  config.vm.provider "virtualbox" do |vb|
   vb.customize ["modifyvm", :id, "--natdnshostresolver1", "on"]
   vb.customize ["modifyvm", :id, "--natdnsproxy1", "on"]
  end

  config.vm.define "md-urbansneakers#{ENV.fetch('VAGRANT_VENDOR', '')}" do |server|
    server.vm.network "private_network", ip: "192.168.40.10"
  end

  if Vagrant::Util::Platform.platform =~ /darwin/
    osx = <<SCRIPT
      # This is hack to make uid/gid consistent on MacOS
      # when you use NFS for synced folders. Because OSX maps them as 502/dialout,
      # so we have to run php fpm as ths user.
      PHP_VERSION=$(php -v | head -n 1 | awk '{ print $2 }' | cut -b 1-3)

      sed -i -e "s/user = ubuntu/user = 502/g" /etc/php/$PHP_VERSION/fpm/pool.d/www.conf
      sed -i -e "s/group = ubuntu/group = dialout/g" /etc/php/$PHP_VERSION/fpm/pool.d/www.conf

      service "php$PHP_VERSION-fpm" restart
SCRIPT

    config.vm.provision :shell, :run => 'always', inline: osx, privileged: true

    config.vm.synced_folder ".", "/var/www/md-urbansneakers", type: "nfs", mount_options: ['rw', 'vers=3', 'tcp', 'fsc', 'nolock']

    config.nfs.map_uid = Process.uid
    config.nfs.map_gid = Process.gid
  else
    config.vm.synced_folder ".", "/var/www/md-urbansneakers", type: "nfs", mount_options: ['rw', 'vers=3', 'tcp', 'fsc', 'nolock'], linux__nfs_options: ['rw', 'no_subtree_check', 'all_squash', 'async']
  end

  config.ssh.username           = "ubuntu"
  config.ssh.forward_agent      = true
  config.ssh.insert_key         = true

  config.vm.provision :shell, :run => "#{ENV.fetch('VAGRANT_PROVISION', 'always')}", inline: "/var/www/md-urbansneakers/bin/provision.sh", privileged: false

  if Vagrant.has_plugin?("vagrant-triggers")
    config.trigger.after :destroy do
      run "vagrant box prune --name menschdanke#{ENV.fetch('VAGRANT_VENDOR', '')}/md-urbansneakers"
    end
  end
end
