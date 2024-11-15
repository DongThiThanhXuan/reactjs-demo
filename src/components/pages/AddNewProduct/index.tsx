import { FormEvent, useState } from "react";
import { Button, Col, Form, Image, Input, InputNumber, message, Row, Select, Space, Upload, UploadFile } from 'antd';
import TextArea from "antd/es/input/TextArea";
import { addNewProduct } from "@/services/product";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";

export default function AddNewProductComponents() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [unitPrice, setUnitPrice] = useState('');
    const [brand, setBrand] = useState('');
    const [unitsInStock, setUnitsInStock] = useState('');
    const [category, setCategory] = useState('');
    const [productImage, setProductImage] = useState<File | null>(null); // Lưu hình ảnh vào state
    const [fileList, setFileList] = useState<UploadFile[]>([]); // Khai báo đúng kiểu dữ liệu cho fileList
    const [previewOpen, setPreviewOpen] = useState(false); // Mở cửa sổ preview
    const [previewImage, setPreviewImage] = useState(''); // Hình ảnh preview

    // Hàm xử lý thay đổi file khi upload
    const handleChange = ({ fileList }: { fileList: UploadFile[] }) => {
        setFileList(fileList.map(file => ({
            ...file,
            status: 'done', // Cập nhật trạng thái file thành 'done' khi upload xong để hình ảnh ko bị viền màu đỏ
        }))); // Cập nhật danh sách file
        if (fileList.length > 0 && fileList[0].originFileObj) {
            // Kiểm tra xem file đầu tiên có tồn tại và originFileObj không phải là undefined
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

    // Hàm để antd ko tự động gửi action post
    const handleBeforeUpload = (file: any) => {
        return false;
    };
    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );

    function submitHandler(event: FormEvent<HTMLFormElement>): void {
        if (!productImage) {
            message.error('Please upload an image!');
            return;
        }
        event.preventDefault();
        const formData = new FormData();
        const config = {
            headers: { 'content-type': 'multipart/form-data' },
        };
        formData.append('name', name);
        formData.append('description', description);
        formData.append('unitPrice', unitPrice);
        formData.append('brand', brand);
        formData.append('unitsInStock', unitsInStock);
        formData.append('productCategory', category);
        formData.append('productImage', productImage);

        addNewProduct(formData, config)
            .then(response => {
                console.log(response)
            })
            .catch(error => console.log(error))
        formData.delete('name');
        formData.delete('description');
        formData.delete('unitPrice');
        formData.delete('brand');
        formData.delete('unitsInStock');
        formData.delete('productCategory');
        formData.delete('productImage');
        // setFileList([]);
        // setProductImage(null);
        // reset({
        //     name: '',
        //     description: '',
        //     unitPrice: 0.00,
        //     brand: '',
        //     unitsInStock: 0,
        //     productCategory: ''
        // });

    }

    return (
        <>
            <Row gutter={[16, 16]}>
                <Col md={6} lg={6}></Col>
                <Col xs={24} sm={24} md={12} lg={12}>
                    <form onSubmit={submitHandler}>
                        <Space direction="vertical" size={10} style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                            <Row gutter={[16, 16]}>
                                <Col xs={24} sm={24} md={6} lg={6}>
                                    <Form.Item >
                                        <div className="ant-form-item-label">Product Name</div>
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={18} lg={18}>
                                    <Form.Item>
                                        <Input
                                            id="product-form-title"
                                            value={name}
                                            onChange={(event) => setName(event.target.value)}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={[16, 16]}>
                                <Col xs={24} sm={24} md={6} lg={6}>
                                    <Form.Item >
                                        <div className="ant-form-item-label">Product Unit Price</div>
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={18} lg={18}>
                                    <Form.Item>
                                        <Input
                                            id="product-form-price"
                                            min={0}
                                            value={unitPrice}
                                            onChange={(event) => setUnitPrice(event.target.value)}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={[16, 16]}>
                                <Col xs={24} sm={24} md={6} lg={6}>
                                    <Form.Item >
                                        <div className="ant-form-item-label">Product brand</div>
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={18} lg={18}>
                                    <Form.Item>
                                        <Input
                                            id="product-form-brand"
                                            value={brand}
                                            onChange={(event) => setBrand(event.target.value)}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={[16, 16]}>
                                <Col xs={24} sm={24} md={6} lg={6}>
                                    <Form.Item >
                                        <div className="ant-form-item-label">Units In Stock</div>
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={18} lg={18}>
                                    <Form.Item>
                                        <Input
                                            id="product-form-title"
                                            min={0}
                                            value={unitsInStock}
                                            onChange={(event) => setUnitsInStock(event.target.value)}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={[16, 16]}>
                                <Col xs={24} sm={24} md={6} lg={6}>
                                    <Form.Item >
                                        <div className="ant-form-item-label">Product Category</div>
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={18} lg={18}>
                                    <Form.Item>
                                        <Select
                                            id="product-form-brand"
                                            value={category}
                                            style={{ width: '100%' }}
                                            onChange={(value) => setCategory(value)}
                                            options={[
                                                { value: 'COMIC', label: 'COMIC' },
                                                { value: 'FICTION', label: 'FICTION' },
                                                { value: 'PROGRAMMING', label: 'PROGRAMMING' },
                                                { value: 'ROMANTIC', label: 'ROMANTIC' },
                                            ]}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={[16, 16]}>
                                <Col xs={24} sm={24} md={6} lg={6}>
                                    <Form.Item >
                                        <div className="ant-form-item-label">Product Image</div>
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={18} lg={18}>
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
                                </Col>
                            </Row>
                            <Row gutter={[16, 16]}>
                                <Col xs={24} sm={24} md={6} lg={6}>
                                    <Form.Item >
                                        <div className="ant-form-item-label">Product description</div>
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={18} lg={18}>
                                    <TextArea rows={5}
                                        id="product-form-desc"
                                        value={description}
                                        onChange={(event) => setDescription(event.target.value)}
                                    />
                                </Col>
                            </Row>
                            <Row gutter={[16, 16]}>
                                <Col xs={24} sm={12} md={3} lg={3}>
                                    <Form.Item >
                                        <Button
                                            htmlType="submit"


                                        >Add Product</Button>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Space>
                    </form>

                </Col>
                <Col md={6} lg={6}></Col>

            </Row>
        </>
    );
}