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
				sh 'echo true'
				//sh 'npm run test'
            }
        }
		
		stage('Build') {
			steps {
				sh 'rm -rf dist'
				sh 'npm run build'
			}
		}
		
		stage('Deploy') {
			steps {
				sh 'sudo docker container stop developer-bpi-container | true'
                sh 'sudo docker rm developer-bpi-container | true'
                sh 'sudo docker build -t developer-bpi .'
                sh 'sudo docker run --name=developer-bpi-container -p 8080:80 -d developer-bpi'
			}
		}
    }
}