import { removeExtension } from "@/utils/file";

export interface ConversionResponse {
  src?: string;
  error?: string;
  file: File;
  outputName?: string;
  outputSize?: number;
  outputWidth?: number;
  outputHeight?: number;
  targetFormat: string;
}

export class ImageConversionService {
  static convertJpgToPng(file: File, quality: number): Promise<ConversionResponse> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = async function (e: ProgressEvent<FileReader>) {
        if (!e.target?.result) {
          reject({ error: "Falha ao carregar dados da imagem", file, targetFormat: "png" });
          return;
        }

        try {
          // Cria um ImageBitmap para carregar a imagem
          const imgBitmap = await createImageBitmap(new Blob([e.target.result], { type: file.type }));

          // Cria um canvas HTML padrão
          const canvas = document.createElement("canvas");
          canvas.width = imgBitmap.width;
          canvas.height = imgBitmap.height;
          const ctx = canvas.getContext("2d");

          if (!ctx) {
            reject({ error: "Não foi possível obter o contexto 2D do canvas", file, targetFormat: "png" });
            return;
          }

          // Desenha o ImageBitmap no canvas
          ctx.drawImage(imgBitmap, 0, 0);

          // Converte o conteúdo do canvas para um Blob PNG
          canvas.toBlob(
            blob => {
              if (!blob) {
                reject({ error: "Falha na conversão da imagem", file, targetFormat: "png" });
                return;
              }

              const url = URL.createObjectURL(blob);

              resolve({
                src: url,
                file,
                outputName: `${removeExtension(file.name)}.png`,
                outputSize: blob.size,
                outputWidth: canvas.width,
                outputHeight: canvas.height,
                targetFormat: "png"
              });
            },
            "image/png",
            quality
          );
        } catch (error) {
          reject({ error: "Erro durante a conversão da imagem", file, targetFormat: "png" });
        }
      };

      reader.onerror = function () {
        reject({ error: "Erro ao ler o arquivo", file, targetFormat: "png" });
      };

      reader.readAsArrayBuffer(file); // Lê o arquivo como ArrayBuffer
    });
  }
}
