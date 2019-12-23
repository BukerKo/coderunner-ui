pipeline {
  agent any
  stages {
    stage('npm:install') {
      steps {
        sh 'npm install'
      }
    }

    stage('npm:build') {
      steps {
        sh 'npm build'
      }
    }

    stage('deploy:prod') {
      when {
        branch 'release/*'
      }
      steps {
        cp -r /var/www/coderunner/build /var/www/tmp
        rm -rf /var/www/coderunner/build
        cp -r /var/www/tmp/* /var/www/coderunner
        rm -rf /var/www/tmp
      }
    }
  }
}