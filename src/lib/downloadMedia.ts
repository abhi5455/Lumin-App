import { Platform, Alert } from 'react-native';
import ReactNativeBlobUtil from 'react-native-blob-util';

export const downloadFile = async (url, fileName, setDownloading, setProgress) => {
    try {
        setDownloading(true);
        setProgress(0);

        const { config, fs } = ReactNativeBlobUtil;
        const downloadPath = fs.dirs.DownloadDir + '/' + fileName;

        const task = config({
            fileCache: true,
            addAndroidDownloads: {
                useDownloadManager: true,
                notification: true,
                path: downloadPath,
                description: 'Downloading file',
            },
        }).fetch('GET', url);

        task.progress((received, total) => {
            setProgress(Math.floor((received / total) * 100));
        });

        const res = await task;

        const savedPath = res.path();

        Alert.alert(
            'Download Complete',
            `File saved as:\n${fileName}\n\nLocation:\n${savedPath}`
        );
    } catch (err) {
        console.error(err);
        Alert.alert('Download Failed', err.message);
    } finally {
        setDownloading(false);
    }
};
