/* eslint-disable no-restricted-imports */
// TODO: SWIGGY
import React, { useState } from 'react';
import { Button, Popover, Radio } from 'antd';
import { DislikeFilled, LikeFilled } from '@ant-design/icons';
import { styled } from '@superset-ui/core';
import { Feedback } from './Styles';

const options = [
  { label: 'True Positive', value: 'True Positive' },
  { label: 'False Positive', value: 'False Positive' },
];

const defaultVisibility = {
  truePositive: false,
  falsePositive: false,
};

const TextArea = styled.textarea`
  width: 100%;
  resize: none;
`;

interface FeedbackBarProps {
  id: string;
  sendData: (data: { label: string; comment: string }) => void;
  selectionText: string;
}

const FeedbackBar = (props: FeedbackBarProps) => {
  const { id, sendData, selectionText } = props;
  const [feedbackData, setFeedbackData] = useState({
    label: '',
    comment: '',
  });
  const [visible, setVisible] = useState(defaultVisibility);

  const handleChange = (name: string) => (e: any) => {
    const { value } = e.target;
    setFeedbackData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleVisibleChange = (name: string) => (visible: boolean) => {
    if (id) {
      setVisible(prev => ({
        ...prev,
        [name]: visible,
      }));
    }
  };

  const content = (
    <>
      <div>
        <Radio.Group
          options={options}
          value={feedbackData.label}
          onChange={handleChange('label')}
        />
      </div>
      <p>Message</p>
      <TextArea
        value={feedbackData.comment}
        onChange={handleChange('comment')}
      />
      <Button
        type="primary"
        block
        onClick={() => {
          sendData(feedbackData);
          setVisible(defaultVisibility);
        }}
      >
        Submit
      </Button>
    </>
  );

  return (
    <Feedback style={{ backgroundColor: id ? '#d0d1d4' : '#e5e6ec' }}>
      <p>
        <span style={{ fontWeight: 'bold' }}>{selectionText}</span>{' '}
        <span className="primary-id">{id || 'None'}</span>
      </p>
      <div>
        <Popover
          placement="bottomRight"
          title="Feedback"
          content={content}
          trigger="click"
          visible={visible.truePositive}
          onVisibleChange={handleVisibleChange('truePositive')}
        >
          <LikeFilled
            style={{
              marginRight: '8px',
              fontSize: '18px',
              cursor: id ? 'pointer' : 'not-allowed',
              opacity: id ? 1 : 0.5,
              color: 'green',
            }}
            onClick={() =>
              !!id && setFeedbackData({ label: 'True Positive', comment: '' })
            }
          />
        </Popover>
        <Popover
          placement="bottomRight"
          title="Feedback"
          content={content}
          trigger="click"
          visible={visible.falsePositive}
          onVisibleChange={handleVisibleChange('falsePositive')}
        >
          <DislikeFilled
            style={{
              marginRight: '8px',
              fontSize: '18px',
              cursor: id ? 'pointer' : 'not-allowed',
              opacity: id ? 1 : 0.5,
              color: 'red',
            }}
            onClick={() =>
              !!id && setFeedbackData({ label: 'False Positive', comment: '' })
            }
          />
        </Popover>
      </div>
    </Feedback>
  );
};

export default FeedbackBar;
