import { Promise } from 'PromiseV2';

const Files = Java.type("java.nio.file.Files");
const File = Java.type("java.io.File");
const StandardCopyOption = Java.type("java.nio.file.StandardCopyOption");

export default class FileUtilities {
    /**
     * Downloads a file from a URL and saves it to a file.
     * @param {string} url The URL to download from.
     * @param {string} destination The file to save to.
     * @param {number} connectTimeout The connection timeout in milliseconds.
     * @param {number} readTimeout The read timeout in milliseconds.
     * @returns {Promise} The file that was downloaded.
     */
    static urlToFile(url, destination, connectTimeout, readTimeout) {
        return new Promise((resolve, reject) => {
            new Thread(() => {
                const file = new java.io.File(destination);
                const connection = new java.net.URL(url).openConnection();
                connection.setConnectTimeout(connectTimeout);
                connection.setReadTimeout(readTimeout);
                const inputStream = connection.getInputStream();
                const outputStream = new java.io.FileOutputStream(file);
                const buffer = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, 4096);
                let length;
                while ((length = inputStream.read(buffer)) > 0) {
                    outputStream.write(buffer, 0, length);
                }
                outputStream.close();
                inputStream.close();
                resolve(file);
            }).start();
        });
    }

    static copyDirectory(target, destination, replace) {
        new Thread(() => {
          const d = new File(destination);
          d.getParentFile().mkdirs();
          const p = new File(target).toPath();
          const q = new File(destination).toPath();
          Files.walk(p).forEach(file => {
            const f = q.resolve(p.relativize(file));
            if (replace === true) {
              Files.copy(file, f, StandardCopyOption.REPLACE_EXISTING);
            } else {
              Files.copy(file, f);
            }
          });
        }).start();
      }
}