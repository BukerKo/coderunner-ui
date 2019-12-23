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
        sh 'cp -r /var/www/coderunner/build /var/www/tmp'
        sh 'rm -rf /var/www/coderunner/build'
        sh 'cp -r /var/www/tmp/* /var/www/coderunner'
        sh 'rm -rf /var/www/tmp'
      }
    }
  }
}