import { Promise } from 'PromiseV2';

const URL = Java.type('java.net.URL');
const Channels = Java.type('java.nio.channels.Channels');
const FileOutputStream = Java.type('java.io.FileOutputStream');
const Long = Java.type('java.lang.Long');
const File = Java.type('java.io.File');
const ZipInputStream = Java.type('java.util.zip.ZipInputStream');
const FileInputStream = Java.type('java.io.FileInputStream');
const BufferedOutputStream = Java.type('java.io.BufferedOutputStream');
const Files = Java.type('java.nio.file.Files');
const PrintStream = Java.type('java.io.PrintStream');


export default class FileUtilities {
  static urlToFile(url, destination, connecttimeout, readtimeout) {
    new Thread(() => {
      const d = new File(destination);
      d.getParentFile().mkdirs();
      const connection = new URL(url).openConnection();
      connection.setDoOutput(true);
      connection.setConnectTimeout(connecttimeout);
      connection.setReadTimeout(readtimeout);
      const IS = connection.getInputStream();
      const FilePS = new PrintStream(destination);
      let buf = new Packages.java.lang.reflect.Array.newInstance(Byte.TYPE, 65536);
      let len;
      while ((len = IS.read(buf)) > 0) {
        FilePS.write(buf, 0, len);
      }
      IS.close();
      FilePS.close();
    }).start();
    return FileLib.read(destination);
  }

  static downloadFolderURL(url, zipDir, folderDir) {
    let website = new URL(url);
    let rbc = Channels.newChannel(website.openStream());
    let fos = new FileOutputStream(zipDir);
    fos.getChannel().transferFrom(rbc, 0, Long.MAX_VALUE);
    fos.close();

    let zip = new File(zipDir);
    let folder = new File(folderDir);
    folder.mkdirs();
    //unzip the file
    this.unzip(zip, folder);
    this.moveFolder(new File(folderDir + File.separator + 'Hysentials-main'), new File(folderDir));
    zip.delete();
    this.deleteFolder(new File(folderDir + File.separator + 'Hysentials-main'));
  }

  static unzip(zipDir, folderDir) {
    let dest = new File(folderDir);
    dest.mkdirs();
    let zipIn = new ZipInputStream(new FileInputStream(zipDir));
    let entry = zipIn.getNextEntry();

    while (entry != null) {
      let filePath = folderDir + File.separator + entry.getName();
      if (!entry.isDirectory()) {
        // if the entry is a file, extracts it
        this.extractFile(zipIn, filePath);
      } else {
        // if the entry is a directory, make the directory
        let dir = new File(filePath);
        dir.mkdirs();
      }
      zipIn.closeEntry();
      entry = zipIn.getNextEntry();
    }
    zipIn.close();
  }

  static extractFile(zipIn, filePath) {
    let bos = new BufferedOutputStream(new FileOutputStream(filePath))
    let bytesIn = new byte[4096];
    let read = 0;
    while ((read = zipIn.read(bytesIn)) != -1) {
      bos.write(bytesIn, 0, read);
    }
    bos.close();
  }

  static moveFolder(source, dest) {
    if (source.isDirectory()) {
      if (!dest.exists()) {
        dest.mkdir();
      }

      let files = source.list();

      for (let file of files) {
        let srcFile = new File(source, file);
        let destFile = new File(dest, file)
        this.moveFolder(srcFile, destFile);
      }
    } else {
      Files.move(source.toPath(), dest.toPath(), StandardCopyOption.REPLACE_EXISTING);
    }
  }
  static deleteFolder(folder) {
    let files = folder.listFiles();
    if (files != null) {
      for (let file of files) {
        if (file.isDirectory()) {
          this.deleteFolder(file);
        } else {
          file.delete();
        }
      }
    }
  }
}