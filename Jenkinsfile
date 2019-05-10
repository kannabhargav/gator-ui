pipeline {
    options {
        timestamps()
    }
    parameters {
        string(name: 'BUILD_VERSION', defaultValue: '', description: 'The build version to deploy (optional)')
        choice(name: 'DEPLOY_TO', choices: 'CI', description: 'The deployment stage to trigger')
    }
    agent {
        label 'aws && build && linux && ubuntu'
    }
    triggers {
        pollSCM('H/5 * * * *')
    }
    stages {
        stage('Clean') {
            agent {
                label 'aws && build && linux'
            }
            steps {
                cleanWs()
            }
        }
        stage('Build Version') {
            when {
                expression {
                    return !params.BUILD_VERSION
                }
            }
            steps{
                script {
                    def packageJSON = readJSON file: 'package.json'
                    def packageJSONVersion = packageJSON.version

                    currentBuild.displayName = packageJSONVersion
                    env.BUILD_VERSION = packageJSONVersion
                }
            }
        }
        stage('Build - Windows') {
            agent {
                label 'build && hedwig'
            }
            when {
                expression {
                    return params.DEPLOY_TO == 'CI' && params.BUILD_VERSION == ''
                }
            }
          steps {
                nodejs(configId: 'kw-npmrc', nodeJSInstallationName: 'Windows Node.js') {
                    // Checkout source code
                    checkout scm

                    // Generate local service build distribution
                    bat "npm i --quiet --cache=npm-cache"

                    bat """
                    npm run build \
                    --npmCache=npm-cache
                    """
                    bat "echo %cd% && dir"
                    
                    // push build to Artifactory
                  
            
                   
           // dir("$WORKSAPACE"){

            pwd(); 
                  
                  withAWS(region:'us-east-1',credentials:'aws-ci') {


                // Upload files from working directory 'dist' in your project workspace
                s3Upload(bucket:"test-a-gator-api", workingDir:'./dist', includePathPattern:'**');
                  
                  
                  
           //       }
                  
                 //   withCredentials([string(credentialsId: 'ARTIFACTORY_USER', variable: 'ARTIFACTORY_USER'),
               //                 string(credentialsId: 'ARTIFACTORY_TOKEN', variable: 'ARTIFACTORY_TOKEN')]) {
             //           bat "7z a -ttar -so gator-ui${BUILD_VERSION}.tar dist | 7z a -si gator-ui${BUILD_VERSION}.tar.gz"
             //           bat "c:/curl/bin/curl -u${ARTIFACTORY_USER}:${ARTIFACTORY_TOKEN} -T gator-ui${BUILD_VERSION}.tar.gz https://builds.aws.labshare.org/artifactory/labshare/gator-api/gator-ui${BUILD_VERSION}.tar.gz"
                    }
                }
            }
}
}
}     
