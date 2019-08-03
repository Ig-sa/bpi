pipeline {
    agent { label 'NodeJS' }
	options {
		timeout(time: 15, unit: 'MINUTES') 
	}
	
    stages {

		stage('Dependencies') {
            steps {
				sh 'npm install --verbose'
				sh 'npm update --verbose'
            }
        }

		stage('Test') {
            steps {
				sh 'npm run test'
            }
        }
		
		stage('Build') {
			steps {
				sh 'npm run build'
			}
		}
    }
}