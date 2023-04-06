<img src="https://raw.githubusercontent.com/fdorantesm/nestjs-polly/main/static/nestjs-polly.jpg" align="center">

<br>
<br>
<br>

---

<br>

## NestJS Polly Module

### Installation

```bash
yarn add nestjs-polly
```

```bash
npm i nestjs-polly
```

---

<br>

### Configuration

<br>

Entry module:

```ts
@Module({
  imports: [
    PollyModule.register({
      region: polly.region,
      credentials: {
        accessKeyId: polly.accessKeyId,
        secretAccessKey: polly.secretAccessKey,
      }
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

<br>

Entry module:

```ts
@Module({
  imports: [
    PollyModule.registerAsync({
    imports: [ConfigModule.forFeature(pollyConfig)],
    inject: [ConfigService],
    async useFactory(config: ConfigService) {
        const pollyConfig = config.get<PollyConfig>('polly');
        return {
          region: polly.region,
          credentials: {
            accessKeyId: polly.accessKeyId,
            secretAccessKey: polly.secretAccessKey,
          },
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

---

<br>

### Usage

<br>

Inject polly client into a service:
```ts
@Injectable()
export class AppService {
  constructor(@InjectPolly() private readonly polly: PollyClient) {}

  getHello() {
    return this.polly.send(
      new SynthesizeSpeechCommand({
        TextType: 'text',
        Text: `This is a test of nest and polly module.`,
        OutputFormat: 'mp3',
        VoiceId: 'Ivy',
        LanguageCode: 'en-US',
        Engine: 'neural',
      }),
    );
  }
}
```

In the controller...
```ts
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(@Res() res: Response) {
    const audio = await this.appService.getHelloPolly();
    const file = await audio.AudioStream.transformToByteArray();
    res.header('Content-Type', audio.ContentType);
    res.send(Buffer.from(file.buffer));
  }
}
```

### Result:

[Audio](https://raw.githubusercontent.com/fdorantesm/nestjs-polly/main/static/test.mp3)

---

<br>

<br>

<div align="center">
    <a href="https://github.com/fdorantesm" target="_blank">
        <img src=https://img.shields.io/badge/github-%2324292e.svg?&style=for-the-badge&logo=github&logoColor=white alt=github style="margin-bottom: 5px;" />
    </a>
    <a href="https://twitter.com/fdorantesm" target="_blank">
        <img src=https://img.shields.io/badge/twitter-%2300acee.svg?&style=for-the-badge&logo=twitter&logoColor=white alt=twitter style="margin-bottom: 5px;" />
    </a>
    <a href="https://linkedin.com/in/fdorantesm" target="_blank">
        <img src=https://img.shields.io/badge/linkedin-%231E77B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white alt=linkedin style="margin-bottom: 5px;" />
    </a>
    <a href="https://www.youtube.com/user/FernandoDorantes" target="_blank">
        <img src=https://img.shields.io/badge/youtube-%23EE4831.svg?&style=for-the-badge&logo=youtube&logoColor=white alt=youtube style="margin-bottom: 5px;" />
    </a>
    <a href="https://stackoverflow.com/users/6484286" target="_blank">
        <img src=https://img.shields.io/badge/stackoverflow-%23F28032.svg?&style=for-the-badge&logo=stackoverflow&logoColor=white alt=stackoverflow style="margin-bottom: 5px;" />
    </a>
    <a href="https://codepen.com/fdorantesm" target="_blank">
        <img src=https://img.shields.io/badge/codepen-%23131417.svg?&style=for-the-badge&logo=codepen&logoColor=white alt=codepen style="margin-bottom: 5px;" />
    </a>
</div>

<br/>  

<div align="center">
    <a href="https://paypal.me/fdorantesm" target="_blank" style="display: inline-block;">
        <img src="https://img.shields.io/badge/Donate-PayPal-blue.svg?style=flat-square&logo=paypal" align="center" />
    </a>
</div>  

