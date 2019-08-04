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
				sh 'sudo docker container stop master-bpi-container | true'
				sh 'sudo docker rm master-bpi-container | true'
				sh 'sudo docker build -t master-bpi .'
				sh 'sudo docker run --name=master-bpi-container -p 80:80 -d master-bpi'
			}
		}
    }
}