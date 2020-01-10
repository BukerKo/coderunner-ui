pipeline {
  agent any
  stages {
    stage('npm:install') {
      steps {
        sh 'npm ci'
      }
    }

    stage('npm:build') {
      steps {
        sh 'npm run-script build'
      }
    }

    stage('deploy:prod') {
      when {
        branch 'master'
      }
      steps {
        sh 'cp -r ${WORKSPACE}/build/. /var/www/coderunner'
      }
    }
  }
}