pipeline {
    agent any
    stages {

      stage('Dependencies') {
            steps {
                nodejs(nodeJSInstallationName: 'NodeJS LTS') {
                    sh 'npm install --verbose'
                    sh 'npm update --verbose'
                }
            }
        }

        stage('Build') {
            steps {
                nodejs(nodeJSInstallationName: 'NodeJS LTS') {
                    sh 'npm run build'
                }
            }
        }

        stage('Test') {
            steps {
                nodejs(nodeJSInstallationName: 'NodeJS LTS') {
                    sh 'npm run test'
                }
            }
        }

    }
}