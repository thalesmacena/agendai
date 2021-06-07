/* eslint-disable no-param-reassign */
import useUser from '@/lib/useUser';
import { api } from '@/services/api';
import { useField } from '@unform/core';
import { useEffect, useRef, useState } from 'react';
import { ContainerAvatar } from './styles';

interface Props {
  name: string;
}

type InputProps = JSX.IntrinsicElements['input'] & Props;

const InputAvatar = ({ name }: InputProps) => {
  const { user } = useUser();

  const { defaultValue, registerField } = useField('avatar');

  const [file, setFile] = useState(defaultValue && defaultValue.id);
  const [preview, setPreview] = useState(defaultValue && defaultValue.url);

  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      registerField({
        name,
        ref: ref.current,
        path: 'dataset.file'
      });
    }
  }, [ref, registerField, name]);

  const handleChange = async (e) => {
    const data = new FormData();

    data.append('file', e.target.files[0]);

    const response = await api.post('files', data);

    const { id, url } = response.data;

    setFile(id);
    setPreview(url);
  };

  return (
    <ContainerAvatar>
      <label htmlFor="avatar">
        <img
          src={
            preview ||
            `https://ui-avatars.com/api/?name=${user.name}&background=random&size=50&format=svg`
          }
          alt=""
        />
        <input
          type="file"
          id="avatar"
          accept="image/*"
          data-file={file}
          onChange={handleChange}
          ref={ref}
        />
      </label>
    </ContainerAvatar>
  );
};

export default InputAvatar;
