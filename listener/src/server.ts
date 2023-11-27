import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
const { exec } = require('child_process');

const app = express();
const port = 5111; 

app.use(bodyParser.json());
const repo = 'mtthoas/projet-devops:main';
const containerName = 'listener';


function pullImage() {
    
    exec(`docker pull ${repo}`, (err: any, stdout: any, stderr: any) => {
        if(err) {
            return;
        }
        console.log(`Image ${repo} mise à jour`);
    });
}

function startContainer(containerName: string, image: string) {
    exec(`docker run -d --name ${containerName} mtthoas/projet-devops:main`, (runErr: any, runStdout: any, runStderr: any) => {
        // if (runErr) {
        //     console.error(`Erreur lors du démarrage du conteneur ${containerName}: ${runErr}`);
        //     return;
        // }
        console.log(`Conteneur ${containerName} démarré avec l'image mtthoas/projet-devops:main`);
    });
}


function stopAndRemoveContainer(containerName: string) {

    exec(`docker stop ${containerName}`, (stopErr: any, stopStdout: any, stopStderr: any) => {
        if (stopErr) {
            console.error(`Erreur lors de l'arrêt du conteneur ${containerName}: ${stopErr}`);
            return;
        }
        console.log(`Conteneur ${containerName} arrêté`);

        exec(`docker rm ${containerName}`, (rmErr: any, rmStdout: any, rmStderr: any) => {
            if (rmErr) {
                console.error(`Erreur lors de la suppression du conteneur ${containerName}: ${rmErr}`);
                return;
            }
            console.log(`Conteneur ${containerName} supprimé`);
        });
    });
}


// Pull de l'image toutes les 25 secondes, utile quand on a une adresse privée

setInterval(() => {
    console.log("Listening...")
    stopAndRemoveContainer(containerName);
    pullImage();
    startContainer(containerName, repo);
    
}, 30000);


app.listen(port, () => {
    console.log(`Serveur listener démarré sur http://localhost:${port}`);
});