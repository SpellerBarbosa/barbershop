import type { IError } from "./types";

export default function clearMessage(mensagem: Ref<string>) {
  setTimeout(() => {
    mensagem.value = "";
  }, 3500);
}
