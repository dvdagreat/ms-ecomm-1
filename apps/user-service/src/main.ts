import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ReflectionService } from '@grpc/reflection';
import { UserProtoFile } from '@app/protos';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'user',
        protoPath: `node_modules/@app/protos/${UserProtoFile}`,
        onLoadPackageDefinition: (pkg, server) => {
          new ReflectionService(pkg).addToServer(server);
        },
        loader: {
          keepCase: true,
          longs: String,
          enums: String,
          defaults: true,
          oneofs: true
        }
      }
    }
  );
  await app.listen();
}
bootstrap();
