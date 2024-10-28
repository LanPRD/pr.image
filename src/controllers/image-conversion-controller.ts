import { ImageConversionService } from "@/services/image-conversion-service";

export class ImageConversionController {
  static async start(file: File, quality: string) {
    console.log(file.type);

    if (!file.type.startsWith("image/jpeg") && !file.type.startsWith("image/jpg")) {
      alert("Please select a JPG image.");
      return;
    }

    try {
      const qualityConverted = parseInt(quality, 10) / 100;

      console.info("QUALITY CONVERTED:", qualityConverted, quality);

      const response = await ImageConversionService.convertJpgToPng(file, qualityConverted);

      console.info("RESPONSE:", response);

      return response;
    } catch (error) {
      console.error("Erro na conversão da imagem:", error);
      alert("Failed to convert the image.");
    }
  }
}
