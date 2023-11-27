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
const repo = 'mtthoas/zooland:master';
function pullImage() {
    exec(`docker pull ${repo}`, (err, stdout, stderr) => {
        if (err) {
            return;
        }
        console.log(`Image ${repo} mise à jour`);
    });
}
// Cas d'utilisation 2: Pull de l'image toutes les 25 secondes, utile quand on a une adresse privée
setInterval(() => {
    console.log('Je suis toujours vivant');
    pullImage();
}, 30000);
app.listen(port, () => {
    console.log(`Serveur listener démarré sur http://localhost:${port}`);
});
//# sourceMappingURL=server.js.map