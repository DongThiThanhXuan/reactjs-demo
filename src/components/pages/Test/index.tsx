import React, { useState } from 'react';
import { Upload, Button, message, Image } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { UploadFile } from 'antd/es/upload/interface';

const UploadImage: React.FC = () => {
    const [productImage, setProductImage] = useState<File | null>(null); // Lưu hình ảnh vào state
    const [fileList, setFileList] = useState<UploadFile[]>([]); // Khai báo đúng kiểu dữ liệu cho fileList
    const [previewOpen, setPreviewOpen] = useState(false); // Mở cửa sổ preview
    const [previewImage, setPreviewImage] = useState(''); // Hình ảnh preview

    // Hàm xử lý thay đổi file khi upload
    const handleChange = ({ fileList }: { fileList: UploadFile[] }) => {
        setFileList(fileList.map(file => ({
            ...file,
            status: 'done', // Cập nhật trạng thái file thành 'done' khi upload xong
        }))); // Cập nhật danh sách file
        if (fileList.length > 0 && fileList[0].originFileObj) {
            setProductImage(fileList[0].originFileObj);
        } else {
            setProductImage(null); // Nếu không có file nào, reset state
        }
    };

    // Hàm xử lý preview hình ảnh
    const handlePreview = async (file: any) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };

    // Hàm chuyển đổi hình ảnh file sang base64 để preview
    const getBase64 = (file: File): Promise<string> =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });

    // Hàm kiểm tra file trước khi upload (chỉ cho phép JPG/PNG/GIF)
    const handleBeforeUpload = (file: any) => {
        const isImage = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif';
        if (!isImage) {
            message.error('You can only upload JPG/PNG/GIF file!');
            return false; // Dừng việc upload nếu không phải là ảnh hợp lệ
        }
        return true; // Cho phép upload nếu đúng loại
    };

    // Hàm submit để gửi file lên server
    const handleSubmit = async () => {
        if (!productImage) {
            message.error('Please upload an image!');
            return;
        }

        const formData = new FormData();
        formData.append('image', productImage);

        try {
            // const response = await axios.post('/upload', formData, {
            //     headers: {
            //         'Content-Type': 'multipart/form-data',
            //     },
            // });

            message.success('Image uploaded successfully!');
            // console.log(response.data); // Kiểm tra phản hồi từ server
        } catch (error) {
            message.error('Upload failed!');
            console.error(error);
        }
    };

    // Nút upload, chỉ hiển thị nếu chưa có hình ảnh
    const uploadButton = (
        <Button style={{ border: 0, background: 'none' }}>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </Button>
    );

    return (
        <div>
            <Upload
                listType="picture-circle"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                beforeUpload={handleBeforeUpload}
                showUploadList={{ showRemoveIcon: true }} // Hiển thị nút xóa hình
                maxCount={1} // Chỉ cho phép upload 1 hình
                accept="image/png, image/jpeg, image/gif" // Chỉ cho phép chọn file ảnh PNG, JPG, GIF
            >
                {uploadButton} {/* Chỉ hiển thị nút upload nếu chưa có hình ảnh */}
            </Upload>

            {previewImage && (
                <Image
                    wrapperStyle={{ display: 'none' }}
                    preview={{
                        visible: previewOpen,
                        onVisibleChange: (visible) => setPreviewOpen(visible),
                        afterOpenChange: (visible) => !visible && setPreviewImage(''),
                    }}
                    src={previewImage}
                />
            )}

            {/* Nút Submit, chỉ kích hoạt nếu có hình ảnh */}
            <Button
                type="primary"
                onClick={handleSubmit}
                disabled={!productImage}
                style={{ marginTop: 20 }}
            >
                Submit
            </Button>
        </div>
    );
};

export default UploadImage;
