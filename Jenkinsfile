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
				//sh 'npm run test'
            }
        }
		
		stage('Build') {
			steps {
				sh 'npm run build'
				sh 'cp dist/master-dashboard/* /home/deployments/bpi-master/'
			}
		}
		
		stage('Deploy') {
			steps {
				sh 'docker rm $(docker stop $(docker ps -a -q --filter ancestor=master-bpi --format="{{.ID}}"))'
				sh 'docker build -t master-bpi .'
				sh 'docker run -p 80:80 -d master-bpi'
			}
		}
    }
}