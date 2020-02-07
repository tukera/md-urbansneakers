set :stage_config_path, 'config/deploy/stages'
set :deploy_config_path, 'config/deploy/deploy.rb'

# Load DSL and set up stages
require 'capistrano/setup'

# Load misc modules
require 'net/ssh/proxy/command'

# Include default deployment tasks
require 'capistrano/deploy'
require 'capistrano/composer'
require 'capistrano/slackify'
require "capistrano/scm/git"

require "cap-ec2/capistrano"

install_plugin Capistrano::SCM::Git

# Include additional plugins
load 'config/deploy/lib/tasks/yarn.rb'
load 'config/deploy/lib/tasks/slack.rb'
load 'config/deploy/lib/tasks/php7-fpm.rb'

load 'config/deploy/deploy.rb'
