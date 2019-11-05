# Minikube wrapper action

This action installs a VM-free Kubernetes cluster using Minikube.

## Inputs

### `minikube-version`

**Required** Version of Minikube you wish to use. Default `"1.4.0"`.

### `k8s-version`

**Required** Version of Kubernetes you wish to use with Minikube. Default `"1.14.6"`.

## Example usage

```yaml
name: "Minikube workflow"
on: [push]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@master
    - uses: CodingNagger/minikube-setup-action@v1.0.1
    # install your containers / kubectl apply ...
    - name: Check pods
      run: |
        kubectl get pods
```