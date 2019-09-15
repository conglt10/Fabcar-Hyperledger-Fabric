## Hyperledger Fabric Samples

Please visit the [installation instructions](http://hyperledger-fabric.readthedocs.io/en/latest/install.html)

to ensure you have the correct prerequisites installed. Please use the version of the documentation that matches the version of the software you intend to use to ensure alignment.

## Download Binaries and Docker Images

The installation instructions will utilize `scripts/bootstrap.sh` (available in the fabric repository)

script to download all of the requisite Hyperledger Fabric binaries and docker images, and tag the images with the 'latest' tag. Optionally, specify a version for fabric, fabric-ca and thirdparty images. If versions are not passed, the latest available versions will be downloaded.

The script will also clone fabric-samples repository using the version tag that is aligned with the Fabric version.

**Step 1**: You can also download the script and execute locally:

```bash

# Fetch bootstrap.sh from fabric repository using

curl -sS https://raw.githubusercontent.com/hyperledger/fabric/master/scripts/bootstrap.sh -o ./scripts/bootstrap.sh

# Change file mode to executable

chmod +x ./scripts/bootstrap.sh

# Download binaries and docker images

./scripts/bootstrap.sh [version] [ca version] [thirdparty_version]

```

**Step 2**:

```bash
cd fabcar
./startFabric.sh
```

**Step 3**:

```bash
cd fabcar/javscript
node enrollAdmin.js
node registerAdmin.js
node query.js
```

**Step 4**: Run API server:

```bash
yarn
node app.js
```

**Step 5**: Run front-end with ReactJS

```bash
cd client
yarn
yarn start
```

### Turn off network and delete docker image

```bash
cd /fabric-samples/first-network
./byfn.sh down
docker rm $(docker ps -aq)
docker rmi $(docker images dev-* -q)
```

### Continuous Integration

Please have a look at [Continuous Integration Process](docs/fabric-samples-ci.md)

## License <a name="license"></a>

Hyperledger Project source code files are made available under the Apache

License, Version 2.0 (Apache-2.0), located in the [LICENSE](LICENSE) file.

Hyperledger Project documentation files are made available under the Creative

Commons Attribution 4.0 International License (CC-BY-4.0), available at http://creativecommons.org/licenses/by/4.0/.
