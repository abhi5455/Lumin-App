import { createClient } from '@supabase/supabase-js';
import { pick, types, isCancel } from '@react-native-documents/picker';
import ReactNativeBlobUtil from 'react-native-blob-util';
import { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } from '@env';

export const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function uploadFileToSupabase(options = {}) {
    const { maxSizeMB = 50 } = options;

    try {
        // Pick any type of file
        const result = await pick({
            type: [types.allFiles],
            copyTo: 'cachesDirectory',
        });

        const file = result[0]; // pick returns an array
        console.log('Selected file:', file);

        // Validate file size
        const fileSizeMB = (file.size || 0) / (1024 * 1024);
        if (fileSizeMB > maxSizeMB) {
            throw new Error(`File size ${fileSizeMB.toFixed(2)}MB exceeds ${maxSizeMB}MB limit`);
        }

        // Get the cached file path
        const filePath = file.fileCopyUri || file.uri;
        const cleanPath = filePath.replace('file://', '');

        console.log('Reading file from:', cleanPath);

        // Read file as base64
        const base64Data = await ReactNativeBlobUtil.fs.readFile(cleanPath, 'base64');

        // Generate unique filename
        const originalName = file.name || 'file';
        const fileExt = originalName.split('.').pop() || 'file';
        const timestamp = Date.now();
        const randomStr = Math.random().toString(36).substring(2, 15);
        const uniqueFileName = `${timestamp}_${randomStr}.${fileExt}`;

        console.log('Uploading as:', uniqueFileName);

        // Convert base64 to Uint8Array
        const decode = atob(base64Data);
        const arrayBuffer = new ArrayBuffer(decode.length);
        const uint8Array = new Uint8Array(arrayBuffer);
        for (let i = 0; i < decode.length; i++) {
            uint8Array[i] = decode.charCodeAt(i);
        }

        // Upload to Supabase
        const { data, error } = await supabase.storage
            .from('resource_uploads')
            .upload(uniqueFileName, uint8Array, {
                contentType: file.type || 'application/octet-stream',
                cacheControl: '3600',
                upsert: false
            });

        if (error) {
            console.error('Supabase upload error:', error);
            throw error;
        }

        // Get public URL
        const { data: urlData } = supabase.storage
            .from('resource_uploads')
            .getPublicUrl(data.path);

        console.log('Upload successful!');

        return {
            url: urlData.publicUrl,
            fileName: originalName,
            fileType: file.type,
            fileSize: file.size,
            fileSizeMB: fileSizeMB.toFixed(2),
            path: data.path
        };

    } catch (error) {
        if (isCancel(error)) {
            throw new Error('File selection cancelled');
        }
        console.error('Upload error:', error);
        throw error;
    }
}

/**
 * Upload specific file types (images, videos, PDFs, etc.)
 * @param {string} fileType - Type of file to pick
 * @param {Object} options - Upload options
 */
async function uploadSpecificFileType(fileType = 'images', options = {}) {
    const { maxSizeMB = 5 } = options;

    // Map file types
    const typeMap = {
        images: types.images,
        video: types.video,
        audio: types.audio,
        pdf: types.pdf,
        zip: types.zip,
        csv: types.csv,
        doc: types.doc,
        docx: types.docx,
        xls: types.xls,
        xlsx: types.xlsx,
        ppt: types.ppt,
        pptx: types.pptx,
        plainText: types.plainText,
        allFiles: types.allFiles,
    };

    try {
        const result = await pick({
            type: [typeMap[fileType] || types.allFiles],
            copyTo: 'cachesDirectory',
        });

        const file = result[0];

        const fileSizeMB = (file.size || 0) / (1024 * 1024);
        if (fileSizeMB > maxSizeMB) {
            throw new Error(`File size ${fileSizeMB.toFixed(2)}MB exceeds ${maxSizeMB}MB limit`);
        }

        const filePath = file.fileCopyUri || file.uri;
        const cleanPath = filePath.replace('file://', '');
        const base64Data = await ReactNativeBlobUtil.fs.readFile(cleanPath, 'base64');

        const originalName = file.name || 'file';
        const fileExt = originalName.split('.').pop() || 'file';
        const timestamp = Date.now();
        const randomStr = Math.random().toString(36).substring(2, 15);
        const uniqueFileName = `${timestamp}_${randomStr}.${fileExt}`;

        const decode = atob(base64Data);
        const arrayBuffer = new ArrayBuffer(decode.length);
        const uint8Array = new Uint8Array(arrayBuffer);
        for (let i = 0; i < decode.length; i++) {
            uint8Array[i] = decode.charCodeAt(i);
        }

        const { data, error } = await supabase.storage
            .from('resource_uploads')
            .upload(uniqueFileName, uint8Array, {
                contentType: file.type || 'application/octet-stream',
                cacheControl: '3600',
                upsert: false
            });

        if (error) {
            throw error;
        }

        const { data: urlData } = supabase.storage
            .from('resource_uploads')
            .getPublicUrl(data.path);

        return {
            url: urlData.publicUrl,
            fileName: originalName,
            fileType: file.type,
            fileSize: file.size,
            fileSizeMB: fileSizeMB.toFixed(2),
            path: data.path
        };

    } catch (error) {
        if (isCancel(error)) {
            throw new Error('File selection cancelled');
        }
        throw error;
    }
}

/**
 * Upload multiple files at once
 * @param {Object} options - Upload options
 */
async function uploadMultipleFiles(options = {}) {
    const { maxSizeMB = 50 } = options;

    try {
        const results = await pick({
            type: [types.allFiles],
            allowMultiSelection: true,
            copyTo: 'cachesDirectory',
        });

        const uploads = [];

        for (const file of results) {
            const fileSizeMB = (file.size || 0) / (1024 * 1024);

            if (fileSizeMB > maxSizeMB) {
                console.warn(`Skipping ${file.name}: exceeds size limit`);
                continue;
            }

            const filePath = file.fileCopyUri || file.uri;
            const cleanPath = filePath.replace('file://', '');
            const base64Data = await ReactNativeBlobUtil.fs.readFile(cleanPath, 'base64');

            const originalName = file.name || 'file';
            const fileExt = originalName.split('.').pop() || 'file';
            const timestamp = Date.now();
            const randomStr = Math.random().toString(36).substring(2, 15);
            const uniqueFileName = `${timestamp}_${randomStr}.${fileExt}`;

            const decode = atob(base64Data);
            const arrayBuffer = new ArrayBuffer(decode.length);
            const uint8Array = new Uint8Array(arrayBuffer);
            for (let i = 0; i < decode.length; i++) {
                uint8Array[i] = decode.charCodeAt(i);
            }

            const { data, error } = await supabase.storage
                .from('resource_uploads')
                .upload(uniqueFileName, uint8Array, {
                    contentType: file.type || 'application/octet-stream',
                    cacheControl: '3600',
                    upsert: false
                });

            if (error) {
                console.error(`Failed to upload ${file.name}:`, error);
                continue;
            }

            const { data: urlData } = supabase.storage
                .from('resource_uploads')
                .getPublicUrl(data.path);

            uploads.push({
                url: urlData.publicUrl,
                fileName: originalName,
                fileType: file.type,
                fileSize: file.size,
                path: data.path
            });
        }

        return uploads;

    } catch (error) {
        if (isCancel(error)) {
            throw new Error('File selection cancelled');
        }
        throw error;
    }
}


async function uploadPickedFile(file: any) {
    const filePath = file.fileCopyUri || file.uri;
    const cleanPath = filePath.replace('file://', '');
    const base64Data = await ReactNativeBlobUtil.fs.readFile(cleanPath, 'base64');
    const arrayBuffer = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0));
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const {data, error} = await supabase.storage
        .from('resource_uploads')
        .upload(fileName, arrayBuffer, {
            contentType: file.type,
            upsert: false,
        });

    if (error) {
        throw error;
    }

    const {data: urlData} = supabase.storage
        .from('resource_uploads')
        .getPublicUrl(data.path);

    return {file_name: fileName, file_type: file.type, file_url: urlData.publicUrl}
}

async function handleMultipleFileUploads(files: any[]) {
    const uploadPromises = files.map(uploadPickedFile);
    try {
        const fileRecords = await Promise.all(uploadPromises);
        console.log('Uploaded files ', fileRecords);
        return fileRecords
    } catch (error) {
        console.error('Error uploading files:', error);
        throw new Error('An error occurred while uploading files.');
    }
}

async function handleFileUpload(options = {}) {
    try {
        const result = await uploadFileToSupabase(options);
        console.log('File uploaded successfully!', result);
        return result;
    } catch (error) {
        console.error('Upload failed:', error.message);
        throw error;
    }
}

export {
    uploadFileToSupabase,
    uploadSpecificFileType,
    uploadMultipleFiles,
    handleFileUpload,
    uploadPickedFile,
    handleMultipleFileUploads
};
