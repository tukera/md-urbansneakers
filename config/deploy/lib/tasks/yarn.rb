# encoding: utf-8

set :fpm_roles, :web

namespace :deploy do
    namespace :yarn do
        desc 'Runs yarn install'
        task :install do
            on roles fetch(:fpm_roles) do
                within "#{fetch(:release_path)}/app" do
                    execute :yarn, 'install', '--no-progress'
                end
            end
        end

        desc 'Runs yarn build'
        task :build do
            on roles fetch(:fpm_roles) do
                within "#{fetch(:release_path)}/app" do
                    execute :yarn, 'build', '--no-progress'
                end
            end
        end
    end
end

namespace :deploy do
    before 'deploy:updated', 'deploy:yarn:install'
    before 'deploy:updated', 'deploy:yarn:build'

    before 'deploy:reverted', 'deploy:yarn:install'
    before 'deploy:reverted', 'deploy:yarn:build'
end
