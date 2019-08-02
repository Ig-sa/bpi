pipeline {
    agent { label 'NodeJS' }
    stages {

      stage('Dependencies') {
            steps {
				sh 'npm install --verbose'
				sh 'npm update --verbose'
            }
        }

        stage('Build') {
            steps {
				sh 'npm run build'
            }
        }

        stage('Test') {
            steps {
				sh 'npm run test'
            }
        }

    }
}