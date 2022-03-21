// TODO: SWIGGY
import React, { useState } from 'react';
import Modal from 'src/components/Modal';
import { Radio } from 'antd';
import { styled } from '@superset-ui/core';

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
`;

const Label = styled.label`
  width: 100%;
`;

const options = [
  { label: 'True Positive', value: 'True Positive' },
  { label: 'False Positive', value: 'False Positive' },
];

interface MessageModalProps {
  hide: () => void;
  isOpen: boolean;
  submit: (status: string, msg: string) => void;
  primaryId?: string;
}

export default function MessageModal(props: MessageModalProps) {
  const { hide, isOpen, submit, primaryId } = props;
  const [value, setValue] = useState('');
  const [message, setMessage] = useState('');

  const onHide = () => {
    hide();
    setValue('');
    setMessage('');
  };

  const onSubmit = () => {
    submit(value, message);
    setValue('');
    setMessage('');
  };

  return (
    <Modal
      onHide={onHide}
      onHandledPrimaryAction={onSubmit}
      primaryButtonName="Send"
      show={isOpen}
      title="Message"
    >
      <div>
        <h3 style={{ marginBottom: '10px' }}>Select appropriate option</h3>
        <Radio.Group
          options={options}
          onChange={e => setValue(e.target.value)}
          value={value}
        />
      </div>
      <Label htmlFor="message">Message</Label>
      <TextArea
        value={message}
        onChange={e => setMessage(e.target.value)}
        id="message"
      />
      <p style={{ marginTop: '30px', color: 'gray' }}>
        Primary key selected: <b>{primaryId || 'Not selected'}</b>
      </p>
    </Modal>
  );
}
