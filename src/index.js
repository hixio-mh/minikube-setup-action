const core = require('@actions/core');

try {
    const minikubeVersion = core.getInput('minikube-version');
    const kubernetesVersion = core.getInput('k8s-version');

    const { spawnSync } = require('child_process');

    console.log(`Downloading Minikube...`);
    var lastCommandRunning = spawnSync('curl', ['-LO', `https://storage.googleapis.com/minikube/releases/latest/minikube_${minikubeVersion}.deb`]);

    console.log(`Installing Minikube...`);
    lastCommandRunning = spawnSync('sudo', ['dpkg', '-i', `${minikubeVersion}.deb`]);

    console.log(`Starting Minikube cluster...`);
    lastCommandRunning = spawnSync('sudo', 
        ['-E', 'minikube', 'start', '--vm-driver=none', '--kubernetes-version', `v${kubernetesVersion}`, '--extra-config', 'kubeadm.ignore-preflight-errors=SystemVerification'], 
        { env: { CHANGE_MINIKUBE_NONE_USER: 'true' }} );

    console.log('Show Minikube cluster info...');
    lastCommandRunning = spawnSync('kubectl', ['cluster-info']);
} catch (error) {
    if (!!lastCommandRunning) {
        console.log( `stdout: ${lastCommandRunning.stdout.toString()}` );
        console.log( `stderr: ${lastCommandRunning.stderr.toString()}` );
    }
    core.setFailed(error.message);
}