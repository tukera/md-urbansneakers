pipeline {
  agent any

  environment {
    ATLAS_TOKEN        = credentials('vagrant')
    VAGRANT_PROVISION  = "never"

    GIT_COMMIT_SHORT = sh(returnStdout: true, script: 'git rev-parse HEAD | cut -c -7').trim()
    GIT_COMMIT       = sh(returnStdout: true, script: 'git rev-parse HEAD').trim()
    GIT_BRANCH       = "${BRANCH_NAME}"
    GIT_TOKEN        = credentials('github')
  }

  stages {
    stage('Initialization') {
      steps {
        wrap([$class: 'AnsiColorBuildWrapper', 'colorMapName': 'xterm']) {
          script {
            try {
              ['app/node_modules/'].each {
                def isRequired = sh(returnStdout: true, script: "(test -d ${it}/ && (ls -l ${it}/ | wc -l)) || echo 0").toInteger()
                if (isRequired == 0) {
                  step([$class: 'CopyArtifact',
                    filter: "${it}",
                    flatten: false,
                    optional: true,
                    projectName: "MenschDankeGmbH/md-urbansneakers/master"
                  ])
                }
              }

              // TODO: Find a way how to preserve executable bit
              //       when we restore files from artifacts storage
              sh(returnStdout: false, script: "chmod +x app/node_modules/.bin/* || true")

              sh(returnStdout: true,  script: "git config github.accesstoken ${GIT_TOKEN}")

              sh(returnStdout: false, script: 'vagrant version')
              sh(returnStdout: false, script: 'vagrant plugin list')
              sh(returnStdout: false, script: 'vagrant plugin install vagrant-triggers')
              sh(returnStdout: false, script: 'vagrant box update')
              sh(returnStdout: false, script: 'vagrant destroy -f')
              sh(returnStdout: false, script: 'vagrant up')
            } catch (err) {
              sh(returnStdout: false, script: 'vagrant destroy -f')

              currentBuild.result = 'FAILURE'

              error('VM initialization failed')
            }
          }
        }
      }
    }

    stage('Running tests') {
      steps {
        wrap([$class: 'AnsiColorBuildWrapper', 'colorMapName': 'xterm']) {
          script {
            try {
              sh(returnStdout: false, script: 'vagrant ssh -c "cd /var/www/md-urbansneakers/app/ && yarn install --no-progress --pure-lockfile"')
              sh(returnStdout: false, script: 'vagrant ssh -c "cd /var/www/md-urbansneakers/app/ && yarn lint"')
            } catch (err) {
              sh(returnStdout: false, script: 'vagrant destroy -f')

              currentBuild.result = 'FAILURE'

              error('Tests suite failed')
            }
          }
        }
      }
    }

    stage('Tear-down') {
      steps {
        wrap([$class: 'AnsiColorBuildWrapper', 'colorMapName': 'xterm']) {
          script {
            try {
              sh(returnStdout: false, script: 'vagrant destroy -f')
            } catch (err) {
              currentBuild.result = 'FAILURE'

              error('Tear-down failed')
            }
          }
        }

        step([$class: 'ArtifactArchiver',
          artifacts: "app/node_modules/",
          allowEmptyArchive: true,
          defaultExcludes: false,
          fingerprint: false,
          onlyIfSuccessful: true
        ])
      }
    }
  }
}
