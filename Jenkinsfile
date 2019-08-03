pipeline {
    agent { label 'NodeJS' }
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
		
		timeout(time: 900, unit: 'SECONDS') {
			stage('Build') {
				steps {
					sh 'npm run build'
				}
			}
		}
    }
}