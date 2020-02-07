# Simple Role Syntax
# ==================
# Supports bulk-adding hosts to roles, the primary server in each group
# is considered to be the first unless any hosts have the primary
# property set.  Don't declare `role :all`, it's a meta role.

set :ec2_project_tag, 'Kind'
set :ec2_roles_tag,   'Roles'
set :ec2_stages_tag,  'Stage'
set :ec2_region,      %w{eu-west-1}

ec2_role :app, user: 'ubuntu'
ec2_role :web, user: 'ubuntu'
ec2_role :db,  user: 'ubuntu'

# Custom Options
# ==================

set :default_env,               {
    API_URL:    "http://md-urbansneakers-01.menschdanke.io/wp-json",
}

set :composer_install_flags,    '--no-interaction --optimize-autoloader --prefer-dist'

set :deploy_to,                 '/var/www/md-urbansneakers'
