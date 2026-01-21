pipeline{
    agent {label "dev" }

    stages{
        stage("Clone Code"){ steps{
            git url "https://github.com/Saroj-kr-tharu/Todo_Backend_Typescript", branch :"main"
         } }

        stage("scan file system"){ steps{ 
            sh 'trivy fs . -o result.json'
         } }

        stage("Inject environment"){ steps{
                sh "rm -rf environment"
                sh "mkdir -p environment"

                withCredentials( [
                    file(credentialsId: 'env-backend-todo-app', variable: 'BACKEND_ENV'),
                    file(credentialsId: 'env-frontend-todo-app', variable: 'FRONTEND_ENV')
                    file(credentialsId: 'env-frontend', variable: 'FRONTEND_ENV')
                ] ){
                    sh '''
                        cp $MYSQL_ENV environment/.env.mysql
                        cp $BACKEND_ENV environment/.env.backend
                        cp $FRONTEND_ENV environment/.env.fortend
                    '''
                }
         } }

        stage("docker build and push "){ 
            steps{
                echo "Docker Push Images to docker hub "
                sh " docker compose build "
                withCredentials(  [usernamePassword(
                        credentialsId: "dockerHubCreds",
                        passwordVariable:"dockerHubPass" ,
                        usernameVariable:"dockerHubUser" )]
                    ){
                        sh "docker login -u ${env.dockerHubUser} -p ${env.dockerHubPass}"
                        sh "docker compose push"
                     }
            } 
         }
        stage("docker run "){ steps{
             sh "docker compose up  -d "
         } }
    }

   post{
        success{ 
            script{ 
                emailext from: 'sarojc11345@gmail.com',
                to: 'sarojc11345@gmail.com',
                body: 'Build success for ExpenseTracker CICD App',
                subject: 'Build success for ExpenseTracker CICD App'
             } 
            }
        failure{ 
            script{   
                emailext from: 'sarojc11345@gmail.com',
                to: 'sarojc11345@gmail.com',
                body: 'Build Failed for ExpenseTracker CICD App',
                subject: 'Build Failed for ExpenseTracker CICD App' 
            } }
    }
}