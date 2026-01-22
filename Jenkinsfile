pipeline{
    agent {label "dev" }

    stages{
        stage("Clone Code"){ steps{
            git url : "https://github.com/Saroj-kr-tharu/Todo_Backend_Typescript", branch :"main"

            
         } }

        stage("scan file system"){ steps{ 
            sh 'trivy fs . -o result.json'
         } }

        stage("Inject environment"){ steps{
                sh "rm -rf environment"
                sh "mkdir -p environment"

                

                withCredentials( [
                    file(credentialsId: 'backend-todo-env', variable: 'BACKEND_ENV'),
                    file(credentialsId: 'environment-todo', variable: 'FRONTEND_ENV'),
                    file(credentialsId: 'mysql-todo-env', variable: 'MYSQL_ENV')
                ] ){
                    sh '''
                        cp $MYSQL_ENV environment/.env.mysql
                        cp $BACKEND_ENV environment/.env.backend

                        rm -rf fortend/src/environment
                        mkdir -p fortend/src/environment
                        cp $FRONTEND_ENV fortend/src/environment/environment.ts
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
             sh "docker compose u  -d "
         } }
    }

  
    post {

    success {
        script {
            buildUserVars()   // <-- THIS is the fix
            emailext(
                mimeType: 'text/html',
                attachmentsPattern: 'result.json',
                from: 'sarojc11345@gmail.com',
                to: 'sarojc11345@gmail.com',
                subject: '✅ Build Success – Todo App',
                body: """
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;font-family:Arial,Helvetica,sans-serif;background:#f4f6f8;">
<table width="100%" cellpadding="0" cellspacing="0">
<tr><td align="center" style="padding:30px;">
<table width="600" style="background:#fff;border-radius:10px;
box-shadow:0 4px 12px rgba(0,0,0,.1);">

<tr><td style="background:#22c55e;color:#fff;padding:20px;text-align:center;">
<h2>🎉 Build Successful</h2></td></tr>

<tr><td style="padding:25px;">
<table width="100%" style="font-size:14px;">
<tr><td><b>Project</b></td><td>${env.JOB_NAME}</td></tr>
<tr><td><b>Build</b></td><td>#${env.BUILD_NUMBER}</td></tr>
<tr><td><b>Status</b></td><td style="color:#22c55e;"><b>${currentBuild.currentResult}</b></td></tr>
<tr><td><b>Triggered By</b></td><td>${env.BUILD_USER ?: 'System / Webhook'}</td></tr>
</table>

<div style="text-align:center;margin-top:20px;">
<a href="${env.BUILD_URL}" style="background:#22c55e;color:#fff;
padding:12px 20px;border-radius:6px;text-decoration:none;">
View Build
</a>
</div>
</td></tr>

<tr><td style="background:#f1f5f9;text-align:center;padding:12px;font-size:12px;">
Jenkins CI/CD • Todo App
</td></tr>

</table>
</td></tr>
</table>
</body>
</html>
"""
            )
        }
    }

    failure {
        script {
            buildUserVars()
            emailext(
                mimeType: 'text/html',
                attachmentsPattern: 'result.json',
                from: 'sarojc11345@gmail.com',
                to: 'sarojc11345@gmail.com',
                subject: '❌ Build Failed – Todo App',
                body: """
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;font-family:Arial,Helvetica,sans-serif;background:#f4f6f8;">
<table width="100%" cellpadding="0" cellspacing="0">
<tr><td align="center" style="padding:30px;">
<table width="600" style="background:#fff;border-radius:10px;
box-shadow:0 4px 12px rgba(0,0,0,.1);">

<tr><td style="background:#ef4444;color:#fff;padding:20px;text-align:center;">
<h2>🚨 Build Failed</h2></td></tr>

<tr><td style="padding:25px;">
<table width="100%" style="font-size:14px;">
<tr><td><b>Project</b></td><td>${env.JOB_NAME}</td></tr>
<tr><td><b>Build</b></td><td>#${env.BUILD_NUMBER}</td></tr>
<tr><td><b>Status</b></td><td style="color:#ef4444;"><b>${currentBuild.currentResult}</b></td></tr>
<tr><td><b>Triggered By</b></td><td>${env.BUILD_USER ?: 'System / Webhook'}</td></tr>
</table>

<div style="text-align:center;margin-top:20px;">
<a href="${env.BUILD_URL}" style="background:#ef4444;color:#fff;
padding:12px 20px;border-radius:6px;text-decoration:none;">
View Logs
</a>
</div>
</td></tr>

<tr><td style="background:#f1f5f9;text-align:center;padding:12px;font-size:12px;">
Jenkins CI/CD • Todo App
</td></tr>

</table>
</td></tr>
</table>
</body>
</html>
"""
            )
        }
    }
}



}