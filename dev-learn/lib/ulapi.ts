import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

export async function utDeleteFile(url: string) {
    const fileName = url.split("/").pop() || "";
    return await utapi.deleteFiles(fileName);
}

export async function utDeleteFiles(urls: string[]) {
    const filesName = urls.map((url) => url.split("/").pop() || "");
    return await utapi.deleteFiles(filesName);
}
