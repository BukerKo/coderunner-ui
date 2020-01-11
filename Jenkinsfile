pipeline {
  agent any

  environment {
    KEY_LOCATION = '~/Coderunner.pem'
    CODERUNNER_PATH = '/var/www/coderunner'
    AWS_DNS = 'ubuntu@ec2-18-222-208-138.us-east-2.compute.amazonaws.com'
  }

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
        sh 'ssh -i ${KEY_LOCATION} ${AWS_DNS} sudo chmod -R 777 ${CODERUNNER_PATH}'
        sh 'rsync -cav0 -e "ssh -i ${KEY_LOCATION}" ${WORKSPACE}/build/ ${AWS_DNS}:${CODERUNNER_PATH}'
        sh 'ssh -i ${KEY_LOCATION} ${AWS_DNS} sudo chmod -R 755 ${CODERUNNER_PATH}'
       }
    }
  }

    post {
      success {
        telegramSend 'coderunner-ui build status: success'
      }
      failure {
        telegramSend 'coderunner-ui build status: failure'
      }
    }
}