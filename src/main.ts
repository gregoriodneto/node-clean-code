import { FileService } from "./services/FileService.ts";

async function main() {
    const fileName: string = 'registro.txt';
    const service: FileService = new FileService('mensagens');
    await service.saveMessage(fileName, 'Olá, mundo!');
    await service.saveMessage(fileName, 'Nova mensagem registrada.')
    await service.showContent(fileName);
}

main();