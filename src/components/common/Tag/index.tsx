// Project: 7612770651107e1659371833c56a9b25e733c4615968bb7c5582cdc92aa6249b
import React from 'react';
import { CloseCircleOutlined } from '@ant-design/icons';
import { Tag } from 'antd';

interface CustomTagProps {
    title: string;
}
const CustomTags: React.FC<CustomTagProps & Record<string, any>> = (props) => {
    const { title, onClose } = props;
    return (
        <div className='custom-tags'>
            <Tag closeIcon={<CloseCircleOutlined />} onClose={onClose}>
                <span className='w-200 text-title'>{title}</span>
            </Tag>
        </div>
    );
};

export default CustomTags;
