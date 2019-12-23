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
        sh 'cp -r build /var/www/coderunner'
      }
    }
  }
}