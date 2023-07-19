import { DockerComposeEnvironment } from 'testcontainers';

export = async () => {
  const composeFilePath = "./";
  const composeFile = "docker-compose-test.yml";
  (global as any).environment = await new DockerComposeEnvironment(composeFilePath, composeFile).up();
}