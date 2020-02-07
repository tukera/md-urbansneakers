# config valid only for current version of Capistrano

set :application,           'md-urbansneakers-app'
set :pty,                   true

set :repo_url,              "git@github.com:MenschDankeGmbH/md-urbansneakers.git"

set :branch,                ENV.fetch('BRANCH', 'master')

set :format,                :pretty
set :log_level,             :debug

set :ssh_options,           { :forward_agent => true, :port => 22, :paranoid => false }
set :keep_releases,         5

set :linked_dirs,           fetch(:linked_dirs, []).push(
    "wp-content/uploads",
)

set :linked_files,          fetch(:linked_files, []).push(
    "config/wp-config.php"
)

set :ec2_config,            'config/deploy/ec2.yml'
set :ec2_contact_point,     -> {
    return {
        'production': :public_ip, # private_ip
        'staging':    :public_ip
    }[fetch(:stage)]
}

set :fpm_roles,             :app

set :slack_url,             'https://hooks.slack.com/services/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'
set :slack_channel,         '#system-and-devops'

namespace :deploy do
    after  :finishing, 'deploy:cleanup'
end
