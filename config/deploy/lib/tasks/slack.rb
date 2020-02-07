# encoding: utf-8

namespace :load do
    task :defaults do
        set :slack_username,    'Capistrano'
        set :slack_emoji,       ':rocket:'
        set :slack_fields,      ['branch', 'stage', 'status']
        set :slack_user,        -> {
            username = nil

            if ENV['CAPISTRANO_USER'] != nil and !ENV['CAPISTRANO_USER'].empty?
                username = ENV['CAPISTRANO_USER']
            else
                username = %x( git config --get user.name )
            end

            if username == nil or username.empty?
                username = local_user
            end

            return username.strip
        }
    end
end
