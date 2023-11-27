import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
const { exec } = require('child_process');

const app = express();
const port = 5111; 

app.use(bodyParser.json());
const repo = '';


function pullImage() {
    exec(`docker pull ${repo}`, (err: any, stdout: any, stderr: any) => {
        if(err) {
            return;
        }
        console.log(`Image ${repo} mise à jour`);
    });
}

// Pull de l'image toutes les 25 secondes, utile quand on a une adresse privée

setInterval(() => {
    console.log('Still here');
    pullImage()
    
}, 30000);


app.listen(port, () => {
    console.log(`Serveur listener démarré sur http://localhost:${port}`);
});