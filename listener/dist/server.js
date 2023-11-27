"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const { exec } = require('child_process');
const app = (0, express_1.default)();
const port = 5111;
app.use(body_parser_1.default.json());
const repo = 'mtthoas/projet-devops:main';
const containerName = 'listener';
function pullImage() {
    exec(`docker pull ${repo}`, (err, stdout, stderr) => {
        if (err) {
            return;
        }
        console.log(`Image ${repo} mise à jour`);
    });
}
function startContainer(containerName, image) {
    exec(`docker run -d --name ${containerName} mtthoas/projet-devops:main`, (runErr, runStdout, runStderr) => {
        // if (runErr) {
        //     console.error(`Erreur lors du démarrage du conteneur ${containerName}: ${runErr}`);
        //     return;
        // }
        console.log(`Conteneur ${containerName} démarré avec l'image mtthoas/projet-devops:main`);
    });
}
function stopAndRemoveContainer(containerName) {
    exec(`docker stop ${containerName}`, (stopErr, stopStdout, stopStderr) => {
        if (stopErr) {
            console.error(`Erreur lors de l'arrêt du conteneur ${containerName}: ${stopErr}`);
            return;
        }
        console.log(`Conteneur ${containerName} arrêté`);
        exec(`docker rm ${containerName}`, (rmErr, rmStdout, rmStderr) => {
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
    console.log("Listening...");
    stopAndRemoveContainer(containerName);
    pullImage();
    startContainer(containerName, repo);
}, 30000);
app.listen(port, () => {
    console.log(`Serveur listener démarré sur http://localhost:${port}`);
});
//# sourceMappingURL=server.js.map