# encoding: utf-8

set :fpm_roles, :web

namespace :deploy do
    namespace :php do
        desc 'Stop php7-fpm service'
        task :stop do
            on roles fetch(:fpm_roles) do
                within release_path do
                    execute :sudo, 'service', 'php7.0-fpm', 'stop', "; true"
                end
            end
        end

        desc 'Start php7-fpm service'
        task :start do
            on roles fetch(:fpm_roles) do
                within release_path do
                    execute :sudo, 'service', 'php7.0-fpm', 'start', "; true"
                end
            end
        end

        desc 'Restart php7-fpm service'
        task :restart do
            on roles fetch(:fpm_roles) do
                within release_path do
                    execute :sudo, 'service', 'php7.0-fpm', 'restart', "; true"
                end
            end
        end
    end
end

namespace :deploy do
    before :finishing, 'deploy:php:restart'
end
