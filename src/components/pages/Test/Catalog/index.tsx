import { getImageByFileName } from "@/services/file";
import { IProductResponse } from "@/services/product/type";
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { Avatar, List, Space } from 'antd';
import React, { useEffect, useState } from "react";
interface CatalogProps {
    products: IProductResponse[];
}
const IconText = ({ icon, text }: { icon: React.ComponentType; text: string }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);
export default function Catalog({ products }: { products: IProductResponse[] }) {
    const [images, setImages] = useState<{ [key: string]: string }>({});
    // Lấy hình ảnh cho mỗi sản phẩm
    useEffect(() => {
        // Lấy hình ảnh cho mỗi sản phẩm
        products.forEach((product) => {
            // Sử dụng hàm từ service để lấy ảnh
            getImageByFileName(product.productImage)
                .then((imageUrl) => {
                    setImages((prevImages) => ({
                        ...prevImages,
                        [product.id]: imageUrl, // Lưu ảnh vào state theo ID sản phẩm
                    }));
                })
                .catch((error) => {
                    console.error('Error fetching image:', error);
                });
        });
    }, [products]);
    return (
        <List
            itemLayout="vertical"
            size="large"
            pagination={{
                onChange: (page) => {
                    console.log(page);
                },
                pageSize: 3,
            }}
            dataSource={products}
            footer={
                <div>
                    <b>ant design</b> footer part
                </div>
            }
            renderItem={(item) => (
                <List.Item
                    key={item.id}
                    extra={
                        <img
                            width={272}
                            alt="logo"
                            src={images[item.id]}
                        />
                    }
                >
                    <List.Item.Meta
                        title={<a href={item.name}>{item.name}</a>}
                        description={item.category}
                    />
                    {item.description}

                </List.Item>
            )}
        />
    )
}