pipeline {
  agent any
  stages {
    stage('install') {
      steps {
        sh 'npm install'
      }
    }

    stage('build') {
      steps {
        sh 'npm build'
      }
    }

    stage('') {
      steps {
        waitUntil()
      }
    }

  }
}