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
				sh 'sudo docker ps -q --filter ancestor="developer-bpi" | xargs -r sudo docker stop'
				sh 'sudo docker build -t developer-bpi .'
				sh 'sudo docker run -p 8080:80 -d developer-bpi'
			}
		}
    }
}