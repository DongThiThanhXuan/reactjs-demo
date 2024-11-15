// Project: 7612770651107e1659371833c56a9b25e733c4615968bb7c5582cdc92aa6249b
import React, { useEffect, useRef, useState } from 'react';
import { Input } from 'antd';
import CustomTag from '@/components/common/Tag';
import i18n from '@/i18n/i18n';

interface InputTagsProps {
    inputWidth?: string | number;
    onChange?: (data: any) => void;
    value?: string[];
    isEdit?: boolean;
    isInField?: boolean;
    placeholder?: string;
}
const InputTags: React.FC<InputTagsProps> = ({
    inputWidth,
    onChange,
    value,
    isEdit = false,
    isInField = false,
    placeholder = i18n.t('tag.placeholder-input'),
}) => {
    const inputRef = useRef<HTMLDivElement>(null);
    const [inputValue, setInputValue] = useState<string>('');
    const [tags, setTags] = useState<string[]>(value || []);
    const handleInputChange = (e: { target: { value: React.SetStateAction<string> } }) => {
        setInputValue(e.target.value);
    };
    const handleInputKeyPress = (e: { key: string }) => {
        if (e.key === 'Enter' && inputValue.trim() !== '' && !tags.includes(inputValue.trim())) {
            setTags([...tags, inputValue.trim()]);

            setInputValue('');
        }
    };

    const handleRemoveTag = (tagToRemove: string) => {
        const updatedTags = tags.filter((tag) => tag !== tagToRemove);
        setTags(updatedTags);
    };
    useEffect(() => {
        onChange?.(tags);
    }, [tags]);
    useEffect(() => {
        setTags(value || []);
    }, [value]);
    //TODO confirm type
    const handleOutsideClick = (e: any) => {
        if (inputRef.current && !inputRef.current.contains(e.target) && inputValue != '' && !tags.includes(inputValue.trim())) {
            setTags([...tags, inputValue.trim()]);
            setInputValue('');
        }
    };
    useEffect(() => {
        document.addEventListener('click', handleOutsideClick);
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [inputValue, tags]);
    // if (!isEdit && isInField) return <div className='tag-container flex-left'>{value?.map((tag) => <CustomTag title={tag} key={tag} />)}</div>;
    return (
        <div ref={inputRef}>
            <Input
                placeholder={placeholder}
                style={{ width: inputWidth }}
                className={`f-12 w-${inputWidth}`}
                value={inputValue}
                onChange={handleInputChange}
                onKeyPress={handleInputKeyPress}
                maxLength={30}
            />
            <div className={`tag-container flex-left w-${inputWidth}`}>
                {tags.map((tag) => (
                    <div key={tag} className='tag-element '>
                        <CustomTag title={tag} onClose={() => handleRemoveTag(tag)} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InputTags;
