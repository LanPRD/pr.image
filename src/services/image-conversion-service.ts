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
  /**
   * Converte uma imagem JPG para PNG usando a API Canvas.
   * @param file Arquivo de imagem JPG.
   * @param quality Qualidade da conversão (0 a 1).
   * @returns Promise com a URL da imagem convertida ou erro.
   */
  static convertJpgToPng(
    file: File,
    quality: number = 0.95,
  ): Promise<ConversionResponse> {
    return new Promise((resolve, reject) => {
      if (
        !file.type.startsWith("image/jpeg") &&
        !file.type.startsWith("image/jpg")
      ) {
        reject({
          error: "O arquivo selecionado não é um JPG válido.",
          file,
          targetFormat: "png",
        });
        return;
      }

      const reader = new FileReader();

      reader.onload = function (e: ProgressEvent<FileReader>) {
        const result = e.target?.result;

        if (typeof result !== "string") {
          reject({
            error: "Falha ao ler o arquivo.",
            file,
            targetFormat: "png",
          });
          return;
        }

        const img = new Image();

        img.onload = function () {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");

          if (!ctx) {
            reject({
              error: "Não foi possível obter o contexto do Canvas.",
              file,
              targetFormat: "png",
            });
            return;
          }

          ctx.drawImage(img, 0, 0);

          console.log(quality, typeof quality);

          canvas.toBlob(
            (blob: Blob | null) => {
              if (blob) {
                const url = URL.createObjectURL(blob);

                resolve({
                  src: url,
                  file,
                  outputName: `${removeExtension(file.name)}.png`,
                  outputSize: blob.size,
                  outputWidth: canvas.width,
                  outputHeight: canvas.height,
                  targetFormat: "png",
                });
              } else {
                reject({
                  error: "Falha na conversão da imagem.",
                  file,
                  targetFormat: "png",
                });
              }
            },
            "image/png",
            quality,
          );
        };

        img.onerror = function () {
          reject({
            error: "Falha ao carregar a imagem.",
            file,
            targetFormat: "png",
          });
        };

        img.src = result;
      };

      reader.onerror = function () {
        reject({ error: "Erro ao ler o arquivo.", file, targetFormat: "png" });
      };

      reader.readAsDataURL(file);
    });
  }

  successResponse<T>(resolve: (value: T | PromiseLike<T>) => void) {}
}
