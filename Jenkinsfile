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
        sh 'npm run-script build'
      }
    }

    stage('deploy:prod') {
      when {
        branch 'release/*'
      }
      steps {
        sh 'cp -r ${WORKSPACE}/build/. /var/www/coderunner'
      }
    }
  }
}